import React, { useState } from 'react';
import { MdArrowForward, MdRefresh } from 'react-icons/md';
import { canRenewNow, formatDate, useTiers } from '../model';
import ChangeTierModal from './ChangeTierModal';
import RenewNowModal from './RenewNowModal';
import styles from './SubscriptionLimitReached.module.scss';

// Cheapest tier with a bigger monthly limit than the current one, or null on the top tier.
const useNextTier = (subscription) => {
    const { data: tiers } = useTiers();
    const limit = subscription?.current_period?.download_limit ?? subscription?.tier?.monthly_limit ?? 0;
    return (
        [...(tiers || [])]
            .filter((tier) => tier.monthly_limit > limit)
            .sort((a, b) => a.price - b.price)[0] || null
    );
};

/**
 * Shown on the detail page when the subscription's monthly downloads are used up.
 * The buy buttons above stay the way to get the file now; renewing restarts the
 * current tier with a full limit, and the next tier is offered beside it.
 */
const SubscriptionLimitReached = ({ subscription, className = '' }) => {
    const nextTier = useNextTier(subscription);
    const [changeOpen, setChangeOpen] = useState(false);
    const [renewOpen, setRenewOpen] = useState(false);
    const period = subscription?.current_period;
    const limit = period?.download_limit ?? 0;
    const used = period?.downloads_used ?? limit;

    return (
        <section className={`${styles.card} ${className}`} aria-labelledby="sub-limit-title">
            <div className={styles.row}>
                <h3 id="sub-limit-title" className={styles.title}>
                    Obuna limiti tugadi
                </h3>
                <span className={styles.count}>
                    {used}/{limit}
                </span>
            </div>
            {period?.ends_at && (
                <p className={styles.text}>Yangi limit {formatDate(period.ends_at)} da ochiladi</p>
            )}

            {canRenewNow(subscription) && (
                <>
                    <button type="button" className={styles.cta} onClick={() => setRenewOpen(true)}>
                        <MdRefresh aria-hidden />
                        Hozir yangilash
                    </button>
                    <RenewNowModal subscription={subscription} open={renewOpen} onClose={() => setRenewOpen(false)} />
                </>
            )}

            {nextTier && (
                <>
                    <button type="button" className={`${styles.cta} ${styles.ctaSecondary}`} onClick={() => setChangeOpen(true)}>
                        {nextTier.title}'ga o'tish
                        <MdArrowForward aria-hidden />
                    </button>
                    <ChangeTierModal tier={nextTier} open={changeOpen} onClose={() => setChangeOpen(false)} />
                </>
            )}
        </section>
    );
};

export default SubscriptionLimitReached;
