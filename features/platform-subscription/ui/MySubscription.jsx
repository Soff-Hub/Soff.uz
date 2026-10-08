import React, { useState } from 'react';
import Link from 'next/link';
import { Alert, Button, Modal, Progress, Skeleton, Tabs, Tag, message } from 'antd';
import { HiArrowRight, HiSparkles } from 'react-icons/hi2';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import {
    cancelSubscription,
    getErrorMessage,
    resumeSubscription,
    soffxLogin,
} from '../api';
import {
    SOFFX_PLAN_LABELS,
    STATUS_META,
    SUBSCRIPTION_PAGE_URL,
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
    const { tier, current_period: period, status } = subscription;
    const statusMeta = STATUS_META[status] || { label: status, color: 'default' };
    const banner = STATUS_BANNERS[status];
    const limit = period?.download_limit || 0;
    const left = Math.max(0, period?.downloads_left ?? limit - (period?.downloads_used || 0));
    // The bar starts full and shrinks as files are claimed.
    const leftPercent = limit ? Math.min(100, Math.round((left / limit) * 100)) : 0;

    const run = async (key, request, successText) => {
        setAction(key);
        try {
            await request();
            await refreshMySubscription();
            message.success(successText);
        } catch (err) {
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

    return (
        <div className={styles.card}>
            {banner && <Alert className={styles.banner} type={banner.type} message={banner.text} showIcon />}

            <div className={styles.header}>
                <div className={styles.titleRow}>
                    <h2>{tier?.title}</h2>
                    <Tag color={statusMeta.color}>{statusMeta.label}</Tag>
                    {SOFFX_PLAN_LABELS[subscription.soffx?.plan] && (
                        <span className={styles.aiBadge}>
                            <HiSparkles /> {SOFFX_PLAN_LABELS[subscription.soffx.plan]}
                        </span>
                    )}
                </div>
                <Link href={SUBSCRIPTION_PAGE_URL}>
                    <a className={styles.link}>
                        Ta'rifni o'zgartirish <HiArrowRight />
                    </a>
                </Link>
            </div>

            {/* Billing facts on one line instead of a stacked list. */}
            <p className={styles.meta}>
                <span>
                    {subscription.auto_renew
                        ? `Keyingi to'lov: ${formatDate(subscription.ends_at)}`
                        : `${formatDate(subscription.ends_at)} gacha amal qiladi`}
                </span>
                {subscription.card_last4 && <span>Karta •••• {subscription.card_last4}</span>}
                {subscription.scheduled_tier && (
                    <span>
                        Keyingi oydan: <strong>{subscription.scheduled_tier.title}</strong>
                    </span>
                )}
            </p>

            {period && (
                <div className={styles.usage}>
                    <div className={styles.usageRow}>
                        <span>Bu oy qoldi</span>
                        <span className={left === 0 ? styles.leftEmpty : styles.usageValue}>
                            {left} ta
                        </span>
                    </div>
                    <Progress
                        percent={leftPercent}
                        showInfo={false}
                        size="small"
                        strokeColor={left === 0 ? '#d9363e' : '#00a44f'}
                    />
                    <p className={styles.hint}>
                        {period.daily_limit > 0 && `Kuniga ${period.daily_limit} tagacha · `}
                        {period.max_document_price == null
                            ? 'Barcha fayllar'
                            : `${addPeriodToThousands(period.max_document_price)} so'mgacha bo'lgan fayllar`}
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
                    <Button
                        size="small"
                        type="text"
                        className={styles.cancelBtn}
                        loading={action === 'cancel'}
                        onClick={handleCancel}>
                        Obunani bekor qilish
                    </Button>
                )}
            </div>
        </div>
    );
};

// Keeps the page readable on wide screens instead of stretching edge to edge.
const Frame = ({ children }) => (
    <div className="container">
        <div className={styles.frame}>{children}</div>
    </div>
);

const MySubscription = () => (
    <Frame>
        <MySubscriptionContent />
    </Frame>
);

const MySubscriptionContent = () => {
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
