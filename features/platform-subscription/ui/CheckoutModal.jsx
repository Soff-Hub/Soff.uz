import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import { MdClose, MdLocalOffer } from 'react-icons/md';
import { BeatLoader } from 'react-spinners';
import { FaRegCreditCard, FaRegCalendarDays, FaClock } from 'react-icons/fa6';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import {
    fetchMySubscription,
    getErrorCode,
    getErrorMessage,
    quotePromo,
    subscribe,
    verifySubscription,
} from '../api';
import { MY_SUBSCRIPTION_URL, useSetMySubscription } from '../model';
import ClickTrust from '~/shared/components/click-trust/ClickTrust';
import SubscriptionSuccess from './SubscriptionSuccess';
import styles from './CheckoutModal.module.scss';

const CODE_TTL_SECONDS = 5 * 60;
const CONFLICT_REFETCH_DELAY = 2500;

const formatCardNumber = (digits) => digits.replace(/(\d{4})(?=\d)/g, '$1 ');
const formatExpiry = (digits) => (digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
const formatTimer = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// subscribe/ and verify/ return promo errors as plain `msg` without a `code`; they all start with "Promokod".
const isPromoMessage = (msg) => /promokod/i.test(msg || '');

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
    const [promoInput, setPromoInput] = useState('');
    const [quote, setQuote] = useState(null);
    const [promoError, setPromoError] = useState(null);
    const [promoErrorCode, setPromoErrorCode] = useState(null);
    const [promoLoading, setPromoLoading] = useState(false);
    // Ignores quote responses that arrive after the code, the tier or the modal changed.
    const quoteRequestRef = useRef(0);

    const resetPromo = () => {
        quoteRequestRef.current += 1;
        setPromoInput('');
        setQuote(null);
        setPromoError(null);
        setPromoErrorCode(null);
        setPromoLoading(false);
    };

    // Also runs on close, so a reopened modal never re-quotes the previous code.
    useEffect(() => {
        resetPromo();
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

    // The backend computes the discount; the quote is only shown, never recalculated here.
    async function applyPromo(value = promoInput) {
        const promoCode = value.trim();
        if (!promoCode || !tier) return null;
        const requestId = ++quoteRequestRef.current;
        setPromoLoading(true);
        setPromoError(null);
        setPromoErrorCode(null);
        try {
            const data = await quotePromo({ tier: tier.id, promo_code: promoCode });
            if (requestId !== quoteRequestRef.current) return null;
            setQuote(data);
            return data;
        } catch (err) {
            if (requestId !== quoteRequestRef.current) return null;
            setQuote(null);
            setPromoError(getErrorMessage(err, "Promokodni tekshirib bo'lmadi"));
            setPromoErrorCode(getErrorCode(err) || null);
            return null;
        } finally {
            if (requestId === quoteRequestRef.current) setPromoLoading(false);
        }
    }

    // The discount depends on the tier: quote the applied code again when it changes.
    useEffect(() => {
        if (open && tier && quote?.promo_code) applyPromo(quote.promo_code);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tier?.id]);

    const handlePromoChange = (e) => {
        quoteRequestRef.current += 1;
        setPromoInput(e.target.value);
        setQuote(null);
        setPromoError(null);
        setPromoErrorCode(null);
        setPromoLoading(false);
    };

    const handlePromoBlur = () => {
        if (promoInput.trim() && !quote && !promoError && !promoLoading) applyPromo();
    };

    const handlePromoKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        // Enter applies the code instead of submitting the card form.
        e.preventDefault();
        if (!promoLoading) applyPromo();
    };

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
        if (promoLoading) return;
        // A typed code that wasn't checked yet: quote it first so the user sees the price before paying.
        if (promoInput.trim() && !quote) {
            setError(null);
            await applyPromo();
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await subscribe({
                tier: tier.id,
                card_number: cardNumber,
                expire_date: expiry,
                ...(quote?.promo_code ? { promo_code: quote.promo_code } : {}),
            });
            setPending(data);
            setCode('');
            setStep(STEP_CODE);
        } catch (err) {
            const message = getErrorMessage(err);
            if (quote && isPromoMessage(message)) {
                setQuote(null);
                setPromoError(message);
            } else {
                setError(message);
            }
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
                const message = getErrorMessage(err);
                if (quote && isPromoMessage(message)) {
                    // The code stopped being valid after subscribe (e.g. the limit was reached):
                    // back to the card step to subscribe again.
                    setQuote(null);
                    setPromoError(message);
                    setCode('');
                    setStep(STEP_CARD);
                } else {
                    setError(message);
                }
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

    const discount = quote?.discount > 0 ? quote.discount : 0;

    const renderSummary = () =>
        discount ? (
            <div className={styles.summary}>
                <div className={styles.summaryRow}>
                    <span>{tier?.title}</span>
                    <s className={styles.listPrice}>{addPeriodToThousands(quote.list_price)} so'm</s>
                </div>
                <div className={styles.summaryRow}>
                    <span>Chegirma ({quote.promo_code})</span>
                    <span>−{addPeriodToThousands(discount)} so'm</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                    <span>To'lov</span>
                    <strong>{addPeriodToThousands(quote.amount)} so'm</strong>
                </div>
                <p className={styles.summaryNote}>
                    Chegirma faqat birinchi oy uchun. Keyingi oylar —{' '}
                    {addPeriodToThousands(quote.list_price)} so'm.
                </p>
            </div>
        ) : (
            <div className={styles.summary}>
                <div className={styles.summaryRow}>
                    <span>{tier?.title}</span>
                    <strong>{addPeriodToThousands(tier?.price || 0)} so'm / oy</strong>
                </div>
            </div>
        );

    const renderPromo = () => (
        <div className={styles.formGroup}>
            <label className={styles.inputLabel} htmlFor="checkout-promo">
                Promokod
            </label>
            <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><MdLocalOffer /></span>
                <input
                    id="checkout-promo"
                    className={`${styles.input} ${styles.promoInput}`}
                    type="text"
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    placeholder="Mavjud bo'lsa kiriting"
                    value={promoInput}
                    readOnly={Boolean(quote)}
                    onChange={handlePromoChange}
                    onBlur={handlePromoBlur}
                    onKeyDown={handlePromoKeyDown}
                />
                {quote ? (
                    <button type="button" className={styles.promoAction} onClick={resetPromo}>
                        Olib tashlash
                    </button>
                ) : (
                    promoInput.trim() &&
                    promoErrorCode !== 'exhausted' && (
                        <button
                            type="button"
                            className={styles.promoAction}
                            disabled={promoLoading}
                            // Keeps the input from blurring, so the click doesn't quote twice.
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => applyPromo()}>
                            {promoLoading ? <BeatLoader color="#00a44f" size={6} /> : "Qo'llash"}
                        </button>
                    )
                )}
            </div>
            {promoError && <p className={styles.promoError}>{promoError}</p>}
        </div>
    );

    const renderCardStep = () => (
        <form onSubmit={handleSubscribe}>
            {renderSummary()}
            {renderPromo()}
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
            <ClickTrust />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitBtn} disabled={loading || promoLoading}>
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
        <SubscriptionSuccess
            subscription={result}
            fallbackTier={tier}
            promoCode={quote?.promo_code}
            onContinue={goToMySubscription}
        />
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
