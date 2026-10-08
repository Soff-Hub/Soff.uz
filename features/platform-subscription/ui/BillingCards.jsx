import React, { useEffect, useState } from 'react';
import { Alert, Button, Input, Modal, Skeleton, Tooltip, message } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaRegCreditCard } from 'react-icons/fa6';
import { MdAdd, MdCheckCircle, MdDeleteOutline } from 'react-icons/md';
import { addCard, deleteCard, fetchCards, getErrorMessage, setSubscriptionCard, verifyCard } from '../api';
import { formatDate, useMySubscription, useRefreshMySubscription } from '../model';
import styles from './BillingCards.module.scss';

export const CARDS_QUERY_KEY = ['platform-sub-cards'];
const CODE_TTL_SECONDS = 5 * 60;

// The cards/ row shape isn't documented yet, so read the likely field names.
const getLast4 = (card) => {
    const raw = card.card_last4 || card.last4 || card.masked_number || card.number || card.card_number || '';
    return String(raw).replace(/\D/g, '').slice(-4);
};
const getExpiry = (card) => {
    const raw = String(card.expire_date || card.expire || card.expiry || '').replace(/\D/g, '');
    return raw.length === 4 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : null;
};
const getCardId = (card) => card.id ?? card.card_id;

const formatCardNumber = (digits) => digits.replace(/(\d{4})(?=\d)/g, '$1 ');
const formatExpiry = (digits) => (digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
const formatTimer = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

// Two steps, like the checkout: card number + expiry → SMS code from the card's bank.
export const AddCardModal = ({ open, onClose, onAdded, title = "Karta qo'shish", description }) => {
    const [step, setStep] = useState('card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [code, setCode] = useState('');
    const [pending, setPending] = useState(null);
    const [secondsLeft, setSecondsLeft] = useState(CODE_TTL_SECONDS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!open) return;
        setStep('card');
        setCardNumber('');
        setExpiry('');
        setCode('');
        setPending(null);
        setError(null);
    }, [open]);

    useEffect(() => {
        if (step !== 'code') return undefined;
        setSecondsLeft(CODE_TTL_SECONDS);
        const timerId = setInterval(() => setSecondsLeft((prev) => Math.max(prev - 1, 0)), 1000);
        return () => clearInterval(timerId);
    }, [step, pending]);

    useEffect(() => {
        if (step === 'code' && secondsLeft === 0) {
            setStep('card');
            setCode('');
            setError("Kod muddati tugadi. Qaytadan urinib ko'ring.");
        }
    }, [step, secondsLeft]);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (loading) return;
        if (cardNumber.length !== 16) return setError("Karta raqamini to'liq kiriting");
        if (expiry.length !== 4) return setError('Amal qilish muddatini kiriting (MM/YY)');
        setLoading(true);
        setError(null);
        try {
            const data = await addCard({ card_number: cardNumber, expire_date: expiry });
            setPending(data);
            setStep('code');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (loading || !code) return;
        setLoading(true);
        setError(null);
        try {
            // cards/ answers {request_id, phone_number, msg}; verify/ needs that request_id.
            await verifyCard({ request_id: pending?.request_id, code });
            message.success("Karta qo'shildi");
            onAdded();
            onClose();
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onCancel={loading ? undefined : onClose} footer={null} centered width={400} destroyOnClose>
            <div className={styles.modal}>
                <h3>{title}</h3>
                {description && step === 'card' && <p className={styles.hint}>{description}</p>}
                {step === 'card' ? (
                    <form onSubmit={handleAdd}>
                        <label className={styles.field}>
                            <span>Karta raqami</span>
                            <Input
                                size="large"
                                inputMode="numeric"
                                placeholder="8600 0000 0000 0000"
                                value={formatCardNumber(cardNumber)}
                                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                                autoFocus
                            />
                        </label>
                        <label className={styles.field}>
                            <span>Amal qilish muddati</span>
                            <Input
                                size="large"
                                inputMode="numeric"
                                placeholder="MM/YY"
                                value={formatExpiry(expiry)}
                                onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            />
                        </label>
                        {error && <p className={styles.error}>{error}</p>}
                        <Button type="primary" size="large" block htmlType="submit" loading={loading} className={styles.submit}>
                            Davom etish
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify}>
                        <p className={styles.hint}>
                            Kod <strong>{pending?.phone_number || 'kartangizga ulangan'}</strong> raqamiga yuborildi
                        </p>
                        <label className={styles.field}>
                            <span>SMS kod</span>
                            <Input
                                size="large"
                                inputMode="numeric"
                                placeholder="12345"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                autoFocus
                            />
                        </label>
                        <p className={styles.timer}>Kod amal qiladi: {formatTimer(secondsLeft)}</p>
                        {error && <p className={styles.error}>{error}</p>}
                        <Button type="primary" size="large" block htmlType="submit" loading={loading} className={styles.submit}>
                            Tasdiqlash
                        </Button>
                        <button type="button" className={styles.back} disabled={loading} onClick={() => setStep('card')}>
                            Boshqa karta
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
};

/**
 * Saved cards in the profile ("To'lov ma'lumotlari"). The card the subscription is charged
 * from (`my/` → `card_id`) is marked; deleting it asks the user to add another card for the next payment.
 */
const BillingCards = () => {
    const queryClient = useQueryClient();
    const { subscription, isLoggedIn } = useMySubscription();
    const refreshMySubscription = useRefreshMySubscription();
    const [addOpen, setAddOpen] = useState(false);
    const [busyId, setBusyId] = useState(null);

    const { data: cards = [], isLoading, isError } = useQuery({
        queryKey: CARDS_QUERY_KEY,
        queryFn: fetchCards,
        enabled: isLoggedIn,
    });

    const subscriptionCardId = subscription?.card_id;
    const refresh = () => {
        queryClient.invalidateQueries({ queryKey: CARDS_QUERY_KEY });
        refreshMySubscription();
    };

    const run = async (id, request, successText) => {
        setBusyId(id);
        try {
            await request();
            message.success(successText);
            refresh();
        } catch (err) {
            message.error(getErrorMessage(err));
        } finally {
            setBusyId(null);
        }
    };

    const handleDelete = (card, isSubscriptionCard) =>
        Modal.confirm({
            centered: true,
            title: "Kartani o'chirasizmi?",
            content: isSubscriptionCard ? (
                <div className={styles.deleteWarning}>
                    <p>
                        •••• {getLast4(card)} kartasidan obuna to'lovi yechiladi.
                    </p>
                    <Alert
                        type="warning"
                        showIcon
                        message={`Obuna ${formatDate(subscription?.ends_at)} da tugagach, avtomatik yangilanmaydi va faol bo'lmaydi.`}
                        description="Obunani davom ettirish uchun boshqa karta qo'shing va uni obuna uchun tanlang."
                    />
                </div>
            ) : (
                `•••• ${getLast4(card)} kartasi saqlangan kartalardan o'chiriladi.`
            ),
            okText: "O'chirish",
            okButtonProps: { danger: true },
            cancelText: 'Ortga',
            onOk: () => removeCard(getCardId(card)),
        });

    // DELETE cards/<id>/. If the backend can't delete it (no such card / route), do nothing.
    const removeCard = async (id) => {
        setBusyId(id);
        try {
            await deleteCard(id);
            queryClient.setQueryData(CARDS_QUERY_KEY, (prev) =>
                Array.isArray(prev) ? prev.filter((card) => getCardId(card) !== id) : prev
            );
            message.success("Karta o'chirildi");
            refresh();
        } catch (err) {
            const status = err?.response?.status;
            if (status !== 404 && status !== 405) message.error(getErrorMessage(err));
        } finally {
            setBusyId(null);
        }
    };

    if (!isLoggedIn) return null;

    return (
        <div className={styles.billing} id="billing">
            {isLoading ? (
                <Skeleton active paragraph={{ rows: 2 }} />
            ) : isError ? (
                <p className={styles.muted}>Kartalarni yuklab bo'lmadi.</p>
            ) : cards.length === 0 ? (
                <p className={styles.muted}>Saqlangan karta yo'q. Obuna uchun to'lov shu yerdagi kartadan yechiladi.</p>
            ) : (
                <ul className={styles.list}>
                    {cards.map((card) => {
                        const id = getCardId(card);
                        const isSubscriptionCard = subscriptionCardId != null && id === subscriptionCardId;
                        const expiry = getExpiry(card);
                        return (
                            <li key={id} className={`${styles.card} ${isSubscriptionCard ? styles.cardActive : ''}`}>
                                <span className={styles.cardIcon}>
                                    <FaRegCreditCard />
                                </span>
                                <div className={styles.cardInfo}>
                                    <strong>•••• {getLast4(card) || '----'}</strong>
                                    <span>
                                        {expiry && `${expiry} gacha`}
                                        {isSubscriptionCard && (
                                            <span className={styles.badge}>
                                                <MdCheckCircle aria-hidden /> Obuna to'lovi uchun
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <div className={styles.cardActions}>
                                    {subscription && !isSubscriptionCard && (
                                        <Button
                                            size="small"
                                            loading={busyId === id}
                                            onClick={() =>
                                                run(id, () => setSubscriptionCard(id), "Obuna to'lovi shu kartadan yechiladi")
                                            }>
                                            Obuna uchun tanlash
                                        </Button>
                                    )}
                                    <Tooltip title="Kartani o'chirish">
                                        <Button
                                            size="small"
                                            type="text"
                                            danger
                                            icon={<MdDeleteOutline />}
                                            aria-label="Kartani o'chirish"
                                            loading={busyId === id}
                                            onClick={() => handleDelete(card, isSubscriptionCard)}
                                        />
                                    </Tooltip>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            <button type="button" className={styles.add} onClick={() => setAddOpen(true)}>
                <MdAdd aria-hidden /> Karta qo'shish
            </button>

            <AddCardModal open={addOpen} onClose={() => setAddOpen(false)} onAdded={refresh} />
        </div>
    );
};

export default BillingCards;
