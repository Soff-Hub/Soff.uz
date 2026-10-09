import React, { useState } from 'react';
import { message } from 'antd';
import { MdArrowDownward, MdArrowUpward, MdCheck } from 'react-icons/md';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { changeTier, getErrorMessage } from '../api';
import { SOFFX_PLAN_LABELS, formatDate, getTierTheme, useRefreshMySubscription, useTiers } from '../model';
import ChangeTierModal from './ChangeTierModal';
import SoffxBadge from './SoffxBadge';
import styles from './TierSwitcher.module.scss';

/**
 * Tier switch inside "Mening obunam". `change-tier/` schedules the new tier from the
 * next renewal (`scheduled_tier`); sending the current tier clears the change.
 */
const TierSwitcher = ({ subscription }) => {
    const { data: tiers = [] } = useTiers();
    const refreshMySubscription = useRefreshMySubscription();
    const [target, setTarget] = useState(null);
    const [clearing, setClearing] = useState(false);

    const current = subscription.tier;
    const scheduledId = subscription.scheduled_tier?.id;
    const others = tiers.filter((tier) => tier.id !== current?.id).sort((a, b) => a.price - b.price);

    if (!others.length) return null;

    const handleClear = async () => {
        setClearing(true);
        try {
            await changeTier(current.id);
            await refreshMySubscription();
            message.success("Ta'rif o'zgarishi bekor qilindi");
        } catch (err) {
            message.error(getErrorMessage(err));
        } finally {
            setClearing(false);
        }
    };

    return (
        <section className={styles.switcher} aria-label="Ta'rifni o'zgartirish">
            <div className={styles.head}>
                <h3>Ta'rifni o'zgartirish</h3>
                <p>
                    {`Yuqori ta'rifga hoziroq yoki keyingi oydan, arzonroq ta'rifga keyingi to'lovdan (${formatDate(
                        subscription.ends_at
                    )}) o'tishingiz mumkin.`}
                </p>
            </div>

            <div className={styles.grid}>
                {others.map((tier) => {
                    const isScheduled = tier.id === scheduledId;
                    const isUpgrade = tier.price > (current?.price || 0);
                    const aiLabel = SOFFX_PLAN_LABELS[tier.soffx_plan];
                    return (
                        <div
                            key={tier.id}
                            className={`${styles.option} ${styles[getTierTheme(tier)] || ''} ${
                                isScheduled ? styles.scheduled : ''
                            }`}>
                            <div className={styles.optionHead}>
                                <span className={styles.title}>{tier.title}</span>
                                <span className={isUpgrade ? styles.up : styles.down}>
                                    {isUpgrade ? <MdArrowUpward aria-hidden /> : <MdArrowDownward aria-hidden />}
                                    {isUpgrade ? 'Yuqori' : 'Arzonroq'}
                                </span>
                            </div>
                            <p className={styles.price}>
                                {addPeriodToThousands(tier.price)} so'm<span>/oy</span>
                            </p>
                            <ul className={styles.features}>
                                <li>Oyiga {tier.monthly_limit} ta fayl</li>
                                <li>
                                    {tier.max_document_price == null
                                        ? 'Barcha fayllar'
                                        : `${addPeriodToThousands(tier.max_document_price)} so'mgacha`}
                                </li>
                                {aiLabel && (
                                    <li className={styles.ai}>
                                        <SoffxBadge plan={tier.soffx_plan} />
                                    </li>
                                )}
                            </ul>

                            {isScheduled ? (
                                <div className={styles.scheduledRow}>
                                    <span className={styles.scheduledLabel}>
                                        <MdCheck aria-hidden /> {formatDate(subscription.ends_at)} dan
                                    </span>
                                    <button
                                        type="button"
                                        className={styles.clear}
                                        disabled={clearing}
                                        onClick={handleClear}>
                                        {clearing ? '…' : 'Bekor qilish'}
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className={styles.action}
                                    onClick={() => setTarget(tier)}>
                                    {isUpgrade ? `${tier.title}'ga o'tish` : "Keyingi oydan o'tish"}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            <ChangeTierModal tier={target} open={Boolean(target)} onClose={() => setTarget(null)} />
        </section>
    );
};

export default TierSwitcher;
