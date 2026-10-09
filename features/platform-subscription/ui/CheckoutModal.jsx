import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import { MdClose } from 'react-icons/md';
import { BeatLoader } from 'react-spinners';
import { FaRegCreditCard, FaRegCalendarDays, FaClock } from 'react-icons/fa6';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { fetchMySubscription, getErrorMessage, subscribe, verifySubscription } from '../api';
import { MY_SUBSCRIPTION_URL, useSetMySubscription } from '../model';
import SubscriptionSuccess from './SubscriptionSuccess';
import styles from './CheckoutModal.module.scss';

const CODE_TTL_SECONDS = 5 * 60;
const CONFLICT_REFETCH_DELAY = 2500;

const formatCardNumber = (digits) => digits.replace(/(\d{4})(?=\d)/g, '$1 ');
const formatExpiry = (digits) => (digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
const formatTimer = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const STEP_CARD = 'card';
const STEP_CODE = 'code';
const STEP_DONE = 'done';

const CheckoutModal = ({ open, tier, onClose }) => {
    const setMySubscription = useSetMySubscription();
    const router = useRouter();
    const [step, setStep] = useState(STEP_CARD);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [code, setCode] = useState('');
    const [pending, setPending] = useState(null);
    const [secondsLeft, setSecondsLeft] = useState(CODE_TTL_SECONDS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (!open) return;
        setStep(STEP_CARD);
        setCode('');
        setPending(null);
        setError(null);
        setResult(null);
    }, [open]);

    useEffect(() => {
        if (step !== STEP_CODE) return;
        setSecondsLeft(CODE_TTL_SECONDS);
        const timerId = setInterval(() => setSecondsLeft((prev) => Math.max(prev - 1, 0)), 1000);
        return () => clearInterval(timerId);
    }, [step, pending?.subscription]);

    // The SMS code expires after 5 minutes: the user has to start again from the card form.
    useEffect(() => {
        if (step === STEP_CODE && secondsLeft === 0) {
            setStep(STEP_CARD);
            setCode('');
            setError("Kod muddati tugadi. Iltimos, qaytadan urinib ko'ring.");
        }
    }, [step, secondsLeft]);

    const finish = (subscription) => {
        setMySubscription(subscription);
        setResult(subscription);
        setStep(STEP_DONE);
    };

    async function handleSubscribe(e) {
        e.preventDefault();
        if (loading) return;
        if (cardNumber.length !== 16) {
            setError("Karta raqamini to'liq kiriting");
            return;
        }
        if (expiry.length !== 4) {
            setError('Amal qilish muddatini kiriting (MM/YY)');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await subscribe({ tier: tier.id, card_number: cardNumber, expire_date: expiry });
            setPending(data);
            setCode('');
            setStep(STEP_CODE);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }

    async function handleVerify(e) {
        e.preventDefault();
        if (loading || !code) return;
        setLoading(true);
        setError(null);
        try {
            const subscription = await verifySubscription({ subscription: pending.subscription, code });
            finish(subscription);
        } catch (err) {
            if (err?.response?.status === 409) {
                // The first request is still being processed: don't resend, check the result instead.
                await wait(CONFLICT_REFETCH_DELAY);
                const subscription = await fetchMySubscription().catch(() => null);
                if (subscription) {
                    finish(subscription);
                } else {
                    setError("To'lov tekshirilmoqda. Birozdan so'ng sahifani yangilang.");
                }
            } else {
                setError(getErrorMessage(err));
            }
        } finally {
            setLoading(false);
        }
    }

    // After a successful payment every way out leads to the subscription page.
    const goToMySubscription = () => {
        onClose();
        router.push(MY_SUBSCRIPTION_URL);
    };

    const handleClose = () => {
        if (loading) return;
        if (step === STEP_DONE) {
            goToMySubscription();
            return;
        }
        onClose();
    };

    const renderCardStep = () => (
        <form onSubmit={handleSubscribe}>
            <div className={styles.summary}>
                <span>{tier?.title}</span>
                <strong>{addPeriodToThousands(tier?.price || 0)} so'm / oy</strong>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Karta raqami</label>
                <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}><FaRegCreditCard /></span>
                    <input
                        required
                        autoFocus
                        className={styles.input}
                        type="tel"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="0000 0000 0000 0000"
                        value={formatCardNumber(cardNumber)}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                    />
                </div>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Amal qilish muddati</label>
                <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}><FaRegCalendarDays /></span>
                    <input
                        required
                        className={styles.input}
                        type="tel"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        value={formatExpiry(expiry)}
                        onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    />
                </div>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? <BeatLoader color="#fff" size={8} /> : 'Davom etish'}
            </button>
            <p className={styles.note}>
                Har oy kartangizdan avtomatik yechiladi. Istalgan vaqtda bekor qilishingiz mumkin.
            </p>
        </form>
    );

    const renderCodeStep = () => (
        <form onSubmit={handleVerify}>
            <h3 className={styles.title}>SMS kodni kiriting</h3>
            <p className={styles.subtitle}>
                Kod <strong>{pending?.phone_number}</strong> raqamiga yuborildi
            </p>
            <input
                autoFocus
                className={styles.codeInput}
                type="tel"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="______"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
            <div className={styles.timer}>
                <FaClock /> {formatTimer(secondsLeft)}
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitBtn} disabled={loading || code.length < 4}>
                {loading ? <BeatLoader color="#fff" size={8} /> : 'Tasdiqlash'}
            </button>
            <button
                type="button"
                className={styles.linkBtn}
                disabled={loading}
                onClick={() => {
                    setStep(STEP_CARD);
                    setError(null);
                }}>
                Kartani o'zgartirish
            </button>
        </form>
    );

    const renderDoneStep = () => (
        <SubscriptionSuccess subscription={result} fallbackTier={tier} onContinue={goToMySubscription} />
    );

    return (
        <Modal
            open={open}
            centered
            footer={null}
            onCancel={handleClose}
            maskClosable={false}
            destroyOnClose
            className={step === STEP_DONE ? styles.doneModal : undefined}
            closeIcon={step === STEP_DONE ? <MdClose className={styles.doneClose} /> : undefined}
            // The celebration step draws its own edge-to-edge header.
            styles={step === STEP_DONE ? { content: { padding: 0, overflow: 'hidden', borderRadius: 18 } } : undefined}
            title={step === STEP_CARD ? 'Obunani rasmiylashtirish' : null}>
            {step === STEP_CARD && renderCardStep()}
            {step === STEP_CODE && renderCodeStep()}
            {step === STEP_DONE && renderDoneStep()}
        </Modal>
    );
};

export default CheckoutModal;
