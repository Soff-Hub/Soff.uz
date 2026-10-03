import React, { useState } from 'react';
import Link from 'next/link';
import { Alert, Button, Modal, Progress, Skeleton, Tabs, Tag, message } from 'antd';
import { HiSparkles } from 'react-icons/hi2';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import {
    cancelSubscription,
    getErrorCode,
    getErrorMessage,
    refundSubscription,
    resumeSubscription,
    soffxLogin,
} from '../api';
import {
    SOFFX_PLAN_LABELS,
    STATUS_META,
    SUBSCRIPTION_PAGE_URL,
    canRequestRefund,
    formatDate,
    useMySubscription,
    useRefreshMySubscription,
} from '../model';
import ClaimsList from './ClaimsList';
import styles from './MySubscription.module.scss';

const STATUS_BANNERS = {
    past_due: { type: 'error', text: "To'lov o'tmadi, kartangizni tekshiring" },
    cancelled: { type: 'warning', text: "Avtomatik yangilanish o'chirilgan" },
};

const REFUND_HIDE_CODES = ['window_passed', 'has_claims', 'already_settled'];

const SoffxAction = ({ soffx }) => {
    const [loading, setLoading] = useState(false);

    if (!soffx) return null;
    if (soffx.status === 'pending') return <p className={styles.muted}>SoffX AI tayyorlanmoqda…</p>;
    if (soffx.status !== 'success') return null;

    const handleLogin = async () => {
        setLoading(true);
        try {
            const { url } = await soffxLogin();
            window.location = url;
        } catch (err) {
            message.error(getErrorMessage(err));
            setLoading(false);
        }
    };

    return (
        <Button className={styles.soffxBtn} icon={<HiSparkles />} loading={loading} onClick={handleLogin}>
            SoffX AI ga o'tish
        </Button>
    );
};

const SubscriptionOverview = ({ subscription }) => {
    const refreshMySubscription = useRefreshMySubscription();
    const [action, setAction] = useState(null);
    const [refundHidden, setRefundHidden] = useState(false);
    const { tier, current_period: period, status } = subscription;
    const statusMeta = STATUS_META[status] || { label: status, color: 'default' };
    const banner = STATUS_BANNERS[status];
    const usedPercent = period?.download_limit
        ? Math.min(100, Math.round((period.downloads_used / period.download_limit) * 100))
        : 0;

    const run = async (key, request, successText) => {
        setAction(key);
        try {
            await request();
            await refreshMySubscription();
            message.success(successText);
        } catch (err) {
            if (key === 'refund' && REFUND_HIDE_CODES.includes(getErrorCode(err))) setRefundHidden(true);
            message.error(getErrorMessage(err));
        } finally {
            setAction(null);
        }
    };

    const handleCancel = () =>
        Modal.confirm({
            centered: true,
            title: 'Obunani bekor qilasizmi?',
            content: `Avtomatik yangilanish o'chiriladi. Obuna ${formatDate(subscription.ends_at)} gacha amal qiladi va shu sanagacha fayllarni olishingiz mumkin.`,
            okText: 'Bekor qilish',
            okButtonProps: { danger: true },
            cancelText: 'Ortga',
            onOk: () => run('cancel', cancelSubscription, "Avtomatik yangilanish o'chirildi"),
        });

    const handleRefund = () =>
        Modal.confirm({
            centered: true,
            title: 'Pulni qaytarish',
            content: "To'langan summa to'liq qaytariladi va obuna yopiladi. Davom etasizmi?",
            okText: 'Qaytarish',
            okButtonProps: { danger: true },
            cancelText: 'Ortga',
            onOk: () => run('refund', refundSubscription, "Pul qaytarish so'rovi qabul qilindi"),
        });

    return (
        <div className={styles.card}>
            {banner && <Alert className={styles.banner} type={banner.type} message={banner.text} showIcon />}

            <div className={styles.header}>
                <div>
                    <div className={styles.titleRow}>
                        <h2>{tier?.title}</h2>
                        <Tag color={statusMeta.color}>{statusMeta.label}</Tag>
                    </div>
                    <p className={styles.muted}>
                        {subscription.auto_renew
                            ? `Keyingi to'lov: ${formatDate(subscription.ends_at)}`
                            : `Obuna ${formatDate(subscription.ends_at)} gacha amal qiladi`}
                    </p>
                    {subscription.card_last4 && <p className={styles.muted}>Karta: **** {subscription.card_last4}</p>}
                    {subscription.scheduled_tier && (
                        <p className={styles.muted}>
                            Keyingi oydan: <strong>{subscription.scheduled_tier.title}</strong>
                        </p>
                    )}
                    {SOFFX_PLAN_LABELS[subscription.soffx?.plan] && (
                        <span className={styles.aiBadge}>
                            <HiSparkles /> {SOFFX_PLAN_LABELS[subscription.soffx.plan]}
                        </span>
                    )}
                </div>
                <Link href={SUBSCRIPTION_PAGE_URL}>
                    <a className={styles.link}>Ta'rifni o'zgartirish</a>
                </Link>
            </div>

            {period && (
                <div className={styles.usage}>
                    <div className={styles.usageRow}>
                        <span>
                            Bu oy olingan: {period.downloads_used} / {period.download_limit}
                        </span>
                        <strong>Qoldi: {period.downloads_left}</strong>
                    </div>
                    <Progress percent={usedPercent} showInfo={false} strokeColor="#00a44f" />
                    <p className={styles.muted}>
                        {period.daily_limit > 0 && `Kuniga ${period.daily_limit} tagacha. `}
                        {period.max_document_price == null
                            ? 'Barcha fayllar'
                            : `Narxi ${addPeriodToThousands(period.max_document_price)} so'mgacha bo'lgan fayllar`}
                    </p>
                </div>
            )}

            <div className={styles.actions}>
                <SoffxAction soffx={subscription.soffx} />
                {status === 'cancelled' ? (
                    <Button
                        type="primary"
                        className={styles.primaryBtn}
                        loading={action === 'resume'}
                        onClick={() => run('resume', resumeSubscription, 'Avtomatik yangilanish yoqildi')}>
                        Qayta yoqish
                    </Button>
                ) : (
                    <Button loading={action === 'cancel'} onClick={handleCancel}>
                        Bekor qilish
                    </Button>
                )}
                {!refundHidden && canRequestRefund(subscription) && (
                    <Button danger loading={action === 'refund'} onClick={handleRefund}>
                        Pulni qaytarish
                    </Button>
                )}
            </div>
        </div>
    );
};

const MySubscription = () => {
    const { subscription, isLoading } = useMySubscription();

    if (isLoading) {
        return (
            <div className={styles.card}>
                <Skeleton active paragraph={{ rows: 5 }} />
            </div>
        );
    }

    if (!subscription) {
        return (
            <div className={`${styles.card} ${styles.empty}`}>
                <h2>Sizda obuna yo'q</h2>
                <p className={styles.muted}>
                    Obuna bilan har oy turli sotuvchilarning fayllarini oling. Olingan fayl doim sizda qoladi.
                </p>
                <Link href={SUBSCRIPTION_PAGE_URL}>
                    <a className={styles.ctaLink}>Ta'riflarni ko'rish</a>
                </Link>
            </div>
        );
    }

    return (
        <Tabs
            className={styles.tabs}
            items={[
                { key: 'overview', label: 'Mening obunam', children: <SubscriptionOverview subscription={subscription} /> },
                { key: 'claims', label: 'Obuna orqali olingan fayllar', children: <ClaimsList /> },
            ]}
        />
    );
};

export default MySubscription;
