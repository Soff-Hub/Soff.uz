import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { MdAllInclusive, MdAutoAwesome, MdDownload, MdInfoOutline } from 'react-icons/md';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { changeTier, getErrorMessage } from '../api';
import { SOFFX_PLAN_LABELS, formatDate, useMySubscription, useRefreshMySubscription } from '../model';
import styles from './ChangeTierModal.module.scss';

/**
 * One-step tier switch from the detail page, instead of sending the user to the
 * pricing page. The backend schedules the new tier from the next renewal
 * (`change-tier/` → `scheduled_tier`), so the modal says so plainly.
 */
const ChangeTierModal = ({ tier, open, onClose }) => {
    const { subscription } = useMySubscription();
    const refreshMySubscription = useRefreshMySubscription();
    const [loading, setLoading] = useState(false);

    if (!tier) return null;

    const startsAt = subscription?.ends_at ? formatDate(subscription.ends_at) : null;
    const alreadyScheduled = subscription?.scheduled_tier?.id === tier.id;
    const aiLabel = SOFFX_PLAN_LABELS[tier.soffx_plan];

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await changeTier(tier.id);
            await refreshMySubscription();
            message.success(
                startsAt ? `${tier.title} ta'rifi ${startsAt} dan faollashadi` : `${tier.title} ta'rifi keyingi oydan faollashadi`
            );
            onClose();
        } catch (err) {
            message.error(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onCancel={loading ? undefined : onClose} footer={null} centered width={420}>
            <div className={styles.body}>
                <p className={styles.eyebrow}>Ta'rifni o'zgartirish</p>
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
                            {aiLabel}
                        </li>
                    )}
                </ul>

                <p className={styles.notice}>
                    <MdInfoOutline aria-hidden />
                    <span>
                        {tier.title} keyingi to'lovdan
                        {startsAt && (
                            <>
                                {' '}— <strong>{startsAt}</strong> dan
                            </>
                        )}{' '}
                        boshlab faollashadi. Ungacha hozirgi ta'rifingiz ishlaydi.
                    </span>
                </p>

                {alreadyScheduled ? (
                    <p className={styles.scheduled}>
                        {tier.title} ta'rifiga o'tish allaqachon rejalashtirilgan.
                    </p>
                ) : (
                    <button type="button" className={styles.confirm} disabled={loading} onClick={handleConfirm}>
                        {loading ? 'Yuborilmoqda…' : `${tier.title}'ga o'tish`}
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
