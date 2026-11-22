import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, Modal, Skeleton, message } from 'antd';
import { FaRegCreditCard } from 'react-icons/fa6';
import { MdDownload, MdEventRepeat, MdInfoOutline } from 'react-icons/md';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { fetchCards, fetchRenewNowQuote, getErrorCode, getErrorMessage, renewNow } from '../api';
import { formatDate, useRefreshMySubscription, useSetMySubscription } from '../model';
import { AddCardModal, CARDS_QUERY_KEY, getCardId, getLast4 } from './BillingCards';
import styles from './ChangeTierModal.module.scss';
import ownStyles from './RenewNowModal.module.scss';

const RENEW_QUOTE_QUERY_KEY = ['platform-sub-renew-now'];

/**
 * Renew now (`renew-now/`): the current period closes and a full one starts today, for
 * when the monthly limit ran out early. GET quotes the charge, POST charges the card.
 */
const RenewNowModal = ({ subscription, open, onClose }) => {
    const queryClient = useQueryClient();
    const refreshMySubscription = useRefreshMySubscription();
    const setMySubscription = useSetMySubscription();
    const [loading, setLoading] = useState(false);
    const [addCardOpen, setAddCardOpen] = useState(false);
    const [cardId, setCardId] = useState(null);

    const quoteQuery = useQuery({
        queryKey: RENEW_QUOTE_QUERY_KEY,
        queryFn: () => fetchRenewNowQuote(),
        enabled: open,
        staleTime: 0,
        retry: false,
    });
    const cardsQuery = useQuery({ queryKey: CARDS_QUERY_KEY, queryFn: fetchCards, enabled: open });

    const cards = cardsQuery.data || [];
    const quote = quoteQuery.data;
    const tier = quote?.tier || subscription?.tier;

    // Start from the subscription's own card each time the modal opens.
    useEffect(() => {
        if (open) setCardId(subscription?.card_id ?? null);
    }, [open, subscription?.card_id]);

    if (!tier) return null;

    const selectedCard = cards.find((card) => getCardId(card) === cardId);
    const last4 = selectedCard ? getLast4(selectedCard) : subscription.card_last4;
    const amount = quote?.amount ?? tier.price;

    const finish = () => {
        queryClient.removeQueries({ queryKey: RENEW_QUOTE_QUERY_KEY });
        onClose();
    };

    const submit = async (card = cardId) => {
        setLoading(true);
        try {
            const data = await renewNow(card ? { card } : {});
            // The response is the whole subscription with the new period.
            if (data?.current_period) setMySubscription(data);
            await refreshMySubscription();
            message.success(`${tier.title} ta'rifi yangilandi — limit ${data?.current_period?.download_limit ?? tier.monthly_limit} ta`);
            finish();
        } catch (err) {
            const code = getErrorCode(err);
            if (code === 'no_card') {
                setAddCardOpen(true);
            } else if (code === 'locked') {
                message.warning(getErrorMessage(err, "To'lov bajarilmoqda, birozdan so'ng qayta urinib ko'ring"));
            } else if (code === 'downloads_left' || code === 'no_subscription') {
                // The state changed since the button was shown.
                message.error(getErrorMessage(err));
                await refreshMySubscription();
                finish();
            } else {
                // payment_failed included: never retried on its own, the user picks another card or retries.
                message.error(getErrorMessage(err));
            }
        } finally {
            setLoading(false);
        }
    };

    // A freshly added card is not known by id, so the backend falls back to the saved one.
    const handleCardAdded = () => {
        queryClient.invalidateQueries({ queryKey: CARDS_QUERY_KEY });
        submit(null);
    };

    const quoteError = quoteQuery.isError ? getErrorMessage(quoteQuery.error) : null;

    return (
        <>
            <Modal open={open} onCancel={loading ? undefined : finish} footer={null} centered width={440}>
                <div className={styles.body}>
                    <p className={styles.eyebrow}>Ta'rifni hozir yangilash</p>
                    <div className={styles.head}>
                        <h3 className={styles.title}>{tier.title}</h3>
                        <p className={styles.price}>{addPeriodToThousands(amount)} so'm</p>
                    </div>

                    {quoteQuery.isLoading ? (
                        <Skeleton active title={false} paragraph={{ rows: 3 }} className={ownStyles.skeleton} />
                    ) : quoteError ? (
                        <Alert className={ownStyles.alert} type="warning" showIcon message={quoteError} />
                    ) : (
                        <>
                            <ul className={styles.features}>
                                <li>
                                    <MdDownload aria-hidden />
                                    Limit {tier.monthly_limit} ta faylga tiklanadi
                                </li>
                                {quote?.new_ends_at && (
                                    <li>
                                        <MdEventRepeat aria-hidden />
                                        <span>
                                            Yangi muddat: <strong>{formatDate(quote.new_ends_at)}</strong> gacha
                                        </span>
                                    </li>
                                )}
                            </ul>

                            {cards.length > 1 && (
                                <div className={ownStyles.cards} role="radiogroup" aria-label="To'lov kartasi">
                                    {cards.map((card) => {
                                        const id = getCardId(card);
                                        const active = id === cardId;
                                        return (
                                            <button
                                                key={id}
                                                type="button"
                                                role="radio"
                                                aria-checked={active}
                                                className={`${styles.mode} ${active ? styles.modeActive : ''}`}
                                                disabled={loading}
                                                onClick={() => setCardId(id)}>
                                                <FaRegCreditCard aria-hidden />
                                                <span>
                                                    <strong>•••• {getLast4(card) || '----'}</strong>
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            <p className={styles.notice}>
                                <MdInfoOutline aria-hidden />
                                <span>
                                    Joriy davr hoziroq yakunlanadi
                                    {quote?.days_lost > 0 && (
                                        <>
                                            {' '}— qolgan <strong>{quote.days_lost} kun</strong>
                                            {quote.downloads_left > 0 && (
                                                <>
                                                    {' '}va <strong>{quote.downloads_left} ta yuklab olish</strong>
                                                </>
                                            )}{' '}
                                            bekor bo'ladi
                                        </>
                                    )}
                                    . To'lov
                                    {last4 ? (
                                        <>
                                            {' '}
                                            <strong>•••• {last4}</strong> kartangizdan
                                        </>
                                    ) : (
                                        ' saqlangan kartangizdan'
                                    )}{' '}
                                    yechiladi.
                                    {subscription.auto_renew === false && ' Avtomatik yangilanish qayta yoqiladi.'}
                                </span>
                            </p>
                        </>
                    )}

                    <button
                        type="button"
                        className={styles.confirm}
                        disabled={loading || !quote}
                        onClick={() => submit()}>
                        {loading ? 'Yuborilmoqda…' : `${addPeriodToThousands(amount)} so'm to'lab yangilash`}
                    </button>
                    <button type="button" className={styles.cancel} disabled={loading} onClick={finish}>
                        Bekor qilish
                    </button>
                </div>
            </Modal>

            <AddCardModal
                open={addCardOpen}
                onClose={() => setAddCardOpen(false)}
                onAdded={handleCardAdded}
                title="Karta qo'shing"
                description="Ta'rifni yangilash uchun saqlangan karta kerak. Karta qo'shilgach, to'lov yechiladi."
            />
        </>
    );
};

export default RenewNowModal;
