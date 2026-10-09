import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import { MdAllInclusive, MdAutoAwesome, MdBolt, MdDownload, MdEventRepeat, MdInfoOutline } from 'react-icons/md';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { changeTier, getErrorMessage, upgradeNow } from '../api';
import {
    SOFFX_PLAN_LABELS,
    formatDate,
    useMySubscription,
    useRefreshMySubscription,
    useSetMySubscription,
} from '../model';
import styles from './ChangeTierModal.module.scss';

const MODE_NOW = 'now';
const MODE_NEXT = 'next';

/**
 * Tier switch without leaving the page.
 * - Upgrade (more expensive tier): "Hozir o'tish" (`upgrade/`, charged from the saved card
 *   and active right away) or "Keyingi oydan" (`change-tier/`).
 * - Downgrade: only "Keyingi oydan" — `change-tier/` schedules it from the next renewal.
 */
const ChangeTierModal = ({ tier, open, onClose }) => {
    const { subscription } = useMySubscription();
    const refreshMySubscription = useRefreshMySubscription();
    const setMySubscription = useSetMySubscription();
    const [loading, setLoading] = useState(false);

    const isUpgrade = Boolean(tier) && tier.price > (subscription?.tier?.price || 0);
    // Without auto-renew there is no next payment, so a scheduled tier would never start.
    const canSchedule = subscription?.status !== 'cancelled' && subscription?.auto_renew !== false;
    const [mode, setMode] = useState(MODE_NOW);

    useEffect(() => {
        if (open) setMode(isUpgrade ? MODE_NOW : MODE_NEXT);
    }, [open, isUpgrade]);

    if (!tier) return null;

    const startsAt = subscription?.ends_at ? formatDate(subscription.ends_at) : null;
    const alreadyScheduled = subscription?.scheduled_tier?.id === tier.id;
    const aiLabel = SOFFX_PLAN_LABELS[tier.soffx_plan];
    const card = subscription?.card_last4 ? `•••• ${subscription.card_last4}` : null;
    const isNow = isUpgrade && mode === MODE_NOW;

    const submitNow = async () => {
        const data = await upgradeNow(tier.id);
        // The response may carry the updated subscription; my/ is re-fetched either way.
        const updated = data?.subscription ?? (data?.tier ? data : null);
        if (updated) setMySubscription(updated);
        await refreshMySubscription();
        message.success(data?.msg || `${tier.title} ta'rifi faollashdi`);
    };

    const submitNext = async () => {
        await changeTier(tier.id);
        await refreshMySubscription();
        message.success(
            startsAt ? `${tier.title} ta'rifi ${startsAt} dan faollashadi` : `${tier.title} ta'rifi keyingi oydan faollashadi`
        );
    };

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await (isNow ? submitNow() : submitNext());
            onClose();
        } catch (err) {
            // A double-submit returns 409: the first request is still going through.
            if (err?.response?.status === 409) {
                await refreshMySubscription();
                onClose();
            } else {
                message.error(getErrorMessage(err));
            }
        } finally {
            setLoading(false);
        }
    };

    const confirmLabel = loading
        ? 'Yuborilmoqda…'
        : isNow
          ? `Hozir ${tier.title}'ga o'tish`
          : `Keyingi oydan ${tier.title}'ga o'tish`;
    const nextBlocked = !isNow && (alreadyScheduled || !canSchedule);

    return (
        <Modal open={open} onCancel={loading ? undefined : onClose} footer={null} centered width={440}>
            <div className={styles.body}>
                <p className={styles.eyebrow}>{isUpgrade ? "Ta'rifni oshirish" : "Ta'rifni o'zgartirish"}</p>
                <div className={styles.head}>
                    <h3 className={styles.title}>{tier.title}</h3>
                    <p className={styles.price}>
                        {addPeriodToThousands(tier.price)} so'm<span>/oy</span>
                    </p>
                </div>
                {subscription?.tier?.title && (
                    <p className={styles.from}>
                        Hozirgi ta'rif: <strong>{subscription.tier.title}</strong>
                    </p>
                )}

                <ul className={styles.features}>
                    <li>
                        <MdDownload aria-hidden />
                        Oyiga {tier.monthly_limit} ta fayl
                    </li>
                    <li>
                        <MdAllInclusive aria-hidden />
                        {tier.max_document_price == null
                            ? "Narxidan qat'i nazar barcha fayllar"
                            : `${addPeriodToThousands(tier.max_document_price)} so'mgacha bo'lgan fayllar`}
                    </li>
                    {aiLabel && (
                        <li>
                            <MdAutoAwesome aria-hidden />
                            <span>
                                {aiLabel} — video, rasm, taqdimot va ilmiy ishlar yaratish
                            </span>
                        </li>
                    )}
                </ul>

                {isUpgrade && (
                    <div className={styles.modes} role="radiogroup" aria-label="Qachon o'tish">
                        <button
                            type="button"
                            role="radio"
                            aria-checked={mode === MODE_NOW}
                            className={`${styles.mode} ${mode === MODE_NOW ? styles.modeActive : ''}`}
                            disabled={loading}
                            onClick={() => setMode(MODE_NOW)}>
                            <MdBolt aria-hidden />
                            <span>
                                <strong>Hozir o'tish</strong>
                                <small>Darhol faollashadi</small>
                            </span>
                        </button>
                        <button
                            type="button"
                            role="radio"
                            aria-checked={mode === MODE_NEXT}
                            className={`${styles.mode} ${mode === MODE_NEXT ? styles.modeActive : ''}`}
                            disabled={loading}
                            onClick={() => setMode(MODE_NEXT)}>
                            <MdEventRepeat aria-hidden />
                            <span>
                                <strong>Keyingi oydan</strong>
                                <small>{startsAt ? `${startsAt} dan` : "Keyingi to'lovdan"}</small>
                            </span>
                        </button>
                    </div>
                )}

                <p className={styles.notice}>
                    <MdInfoOutline aria-hidden />
                    {isNow ? (
                        <span>
                            {tier.title} hoziroq faollashadi va yangi limitlar darhol ishlaydi. To'lov
                            {card ? (
                                <>
                                    {' '}
                                    <strong>{card}</strong> kartangizdan
                                </>
                            ) : (
                                ' saqlangan kartangizdan'
                            )}{' '}
                            yechiladi.
                        </span>
                    ) : canSchedule ? (
                        <span>
                            {tier.title} keyingi to'lovdan
                            {startsAt && (
                                <>
                                    {' '}— <strong>{startsAt}</strong> dan
                                </>
                            )}{' '}
                            boshlab faollashadi. Ungacha hozirgi ta'rifingiz ishlaydi.
                        </span>
                    ) : (
                        <span>
                            Avtomatik yangilanish o'chirilgan. Keyingi oydan o'tish uchun avval uni qayta yoqing.
                        </span>
                    )}
                </p>

                {nextBlocked && alreadyScheduled ? (
                    <p className={styles.scheduled}>{tier.title} ta'rifiga o'tish allaqachon rejalashtirilgan.</p>
                ) : (
                    <button
                        type="button"
                        className={styles.confirm}
                        disabled={loading || nextBlocked}
                        onClick={handleConfirm}>
                        {confirmLabel}
                    </button>
                )}
                <button type="button" className={styles.cancel} disabled={loading} onClick={onClose}>
                    Bekor qilish
                </button>
            </div>
        </Modal>
    );
};

export default ChangeTierModal;
