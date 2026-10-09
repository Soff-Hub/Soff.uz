import React from 'react';
import Link from 'next/link';
import { HiSparkles } from 'react-icons/hi2';
import { MdWorkspacePremium } from 'react-icons/md';
import { MY_SUBSCRIPTION_URL, SOFFX_PLAN_LABELS, STATUS_META, formatDate, getTierTheme } from '../model';
import { SoffxMark } from './SoffxBadge';
import styles from './SubscriptionMenuCard.module.scss';

// Statuses where the user can still claim files.
export const isSubscriptionUsable = (subscription) => ['active', 'cancelled'].includes(subscription?.status);

// Compact subscription summary for the header account dropdown.
const SubscriptionMenuCard = ({ subscription }) => {
    if (!subscription) return null;

    const { tier, current_period: period, status } = subscription;
    const statusMeta = STATUS_META[status] || { label: status };
    const limit = period?.download_limit || 0;
    const left = Math.max(0, period?.downloads_left ?? limit - (period?.downloads_used || 0));
    // The bar starts full and shrinks as files are claimed.
    const leftPercent = limit ? Math.min(100, Math.round((left / limit) * 100)) : 0;
    const level = leftPercent <= 10 ? styles.empty : leftPercent <= 30 ? styles.low : '';
    const aiLabel = SOFFX_PLAN_LABELS[subscription.soffx?.plan];

    return (
        <Link href={MY_SUBSCRIPTION_URL}>
            <a className={`${styles.card} ${styles[getTierTheme(tier)] || ''} ${styles[status] || ''}`}>
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
                    <div className={`${styles.usage} ${level}`}>
                        <div className={styles.usageRow}>
                            <span>Bu oy qoldi</span>
                            <strong className={styles.usageValue}>{left} ta</strong>
                        </div>
                        <div className={styles.track}>
                            <div className={styles.bar} style={{ width: `${leftPercent}%` }} />
                        </div>
                        {period.daily_limit > 0 && (
                            <div className={styles.chips}>
                                <span className={styles.chip}>Kuniga {period.daily_limit} ta</span>
                            </div>
                        )}
                    </div>
                )}

                {aiLabel && (
                    <span className={styles.ai}>
                        <HiSparkles /> <SoffxMark plan={subscription.soffx.plan} />
                    </span>
                )}
            </a>
        </Link>
    );
};

export default SubscriptionMenuCard;
