import React from 'react';
import Link from 'next/link';
import { HiSparkles } from 'react-icons/hi2';
import { MdWorkspacePremium } from 'react-icons/md';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { MY_SUBSCRIPTION_URL, SOFFX_PLAN_LABELS, STATUS_META, formatDate } from '../model';
import styles from './SubscriptionMenuCard.module.scss';

// Statuses where the user can still claim files.
export const isSubscriptionUsable = (subscription) => ['active', 'cancelled'].includes(subscription?.status);

// Compact subscription summary for the header account dropdown.
const SubscriptionMenuCard = ({ subscription }) => {
    if (!subscription) return null;

    const { tier, current_period: period, status } = subscription;
    const statusMeta = STATUS_META[status] || { label: status };
    const limit = period?.download_limit || 0;
    const used = period?.downloads_used || 0;
    const usedPercent = limit ? Math.min(100, Math.round((used / limit) * 100)) : 0;
    const aiLabel = SOFFX_PLAN_LABELS[subscription.soffx?.plan];

    return (
        <Link href={MY_SUBSCRIPTION_URL}>
            <a className={`${styles.card} ${styles[status] || ''}`}>
                <div className={styles.head}>
                    <span className={styles.crown}>
                        <MdWorkspacePremium />
                    </span>
                    <div className={styles.titleBox}>
                        <span className={styles.title}>{tier?.title}</span>
                        <span className={styles.subtitle}>
                            {status === 'active' && subscription.auto_renew
                                ? `Yangilanadi: ${formatDate(subscription.ends_at)}`
                                : `${formatDate(subscription.ends_at)} gacha`}
                        </span>
                    </div>
                    <span className={styles.status}>{statusMeta.label}</span>
                </div>

                {period && (
                    <div className={styles.usage}>
                        <div className={styles.usageRow}>
                            <span>Bu oy olingan</span>
                            <span className={styles.usageValue}>
                                <strong>{used}</strong> / {limit}
                            </span>
                        </div>
                        <div className={styles.track}>
                            <div className={styles.bar} style={{ width: `${usedPercent}%` }} />
                        </div>
                        <div className={styles.chips}>
                            <span className={styles.chip}>Qoldi: {period.downloads_left}</span>
                            {period.daily_limit > 0 && <span className={styles.chip}>Kuniga {period.daily_limit} ta</span>}
                            <span className={styles.chip}>
                                {period.max_document_price == null
                                    ? 'Barcha fayllar'
                                    : `${addPeriodToThousands(period.max_document_price)} so'mgacha`}
                            </span>
                        </div>
                    </div>
                )}

                {aiLabel && (
                    <span className={styles.ai}>
                        <HiSparkles /> {aiLabel}
                    </span>
                )}
            </a>
        </Link>
    );
};

export default SubscriptionMenuCard;
