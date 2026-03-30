import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Tabs } from 'antd';
import PostRepository from '~/repositories/PostRepository';
import { BeatLoader } from 'react-spinners';
import Router from 'next/router';
import useCart from '~/shared/hooks/useCart';
import ProductRepository from '~/repositories/ProductRepository';
import { calculateAmount } from '~/shared/utilities/ecomerce-helpers';
import { addPeriodToThousands } from './price-formatter';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { FaRegCreditCard, FaRegCalendarDays, FaShieldHalved } from 'react-icons/fa6';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';
import styles from './checkout.module.scss';
import { cn } from '~/shared/utilities/cn';

export const SecurePaymentAlert = () => (
    <div className={styles.secureAlert}>
        <FaShieldHalved />
        <span>To‘lov jarayoni ishonchli, shifrlangan va xavfsiz tarzda amalga oshiriladi.</span>
    </div>
);

const FormSubmitButton = ({ hisob, message, loading }) => (
    <button
        type="submit"
        className={styles.submitBtn}
        disabled={!message}
    >
        {message ? (
            <>To'lash ({hisob} so'm)</>
        ) : (
            <BeatLoader color="#fff" size={8} />
        )}
    </button>
);

const CreditCard2 = ({ document, type }) => {
    const { user } = useSelector((state) => state.auth);
    const { cartDataItems, playlistCartDataItems } = useSelector(
        (state) => state.ecomerce
    );
    const ecomerce = [...(cartDataItems || []), ...(playlistCartDataItems || [])];
    const { affiliateId } = useSelector((state) => state.affiliate);
    const { removeAll } = useCart();
    const { startTimeout } = useTimeManager();
    const [numberCardVal, SetNumberCardVal] = useState(null);
    const [message, setMessage] = useState(true);
    const [cardDate, setCardDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(120);
    const [code, setCode] = useState(null);
    const [resData, setResData] = useState(null);
    const [cart, setCart] = useState(0);
    const [resDataCode, setResDataCode] = useState(null);
    const [buttonOk, setButtonOk] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const inputRef = useRef(null);
    const cursorRef = useRef(null);
    const otpInputRef = useRef(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                otpInputRef.current?.focus();
            }, 100);
        }
    }, [open]);

    async function getPercentage() {
        const responseData = await ProductRepository.getOrderPercentage();
        if (responseData) {
            setPercentage(Number(responseData?.data?.percentage));
        }
    }

    useEffect(() => {
        getPercentage();
    }, []);

    const amount = calculateAmount(ecomerce);
    const taxAmount = Math.floor(amount * percentage);
    const finalTotal = amount + taxAmount;
    const hisobFormatted = addPeriodToThousands(finalTotal);

    const handleCardNumberChange = (e) => {
        const input = e.target;
        const value = input.value;
        const selectionStart = input.selectionStart;

        let digitsBeforeCursor = 0;
        for (let i = 0; i < selectionStart; i++) {
            if (/\d/.test(value[i])) {
                digitsBeforeCursor++;
            }
        }

        const inputValue = value.replace(/\D/g, '');
        let formattedValue = '';

        if (inputValue.length <= 16) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += inputValue[i];
            }
        }

        let newCursorPos = 0;
        let digitsSeen = 0;
        for (let i = 0; i < formattedValue.length; i++) {
            if (digitsSeen === digitsBeforeCursor) break;
            if (/\d/.test(formattedValue[i])) {
                digitsSeen++;
            }
            newCursorPos++;
        }

        cursorRef.current = newCursorPos;
        SetNumberCardVal(inputValue);
        setFormattedCardNumber(formattedValue);
    };

    const handleCardNumberDate = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        if (inputValue.length <= 4) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 2 === 0) {
                    formattedValue += '/';
                }
                formattedValue += inputValue[i];
            }
        }
        setCardDate(inputValue);
        setNumberDate(formattedValue);
    };

    const [formattedCardNumber, setFormattedCardNumber] = useState('');
    const [numberDate, setNumberDate] = useState('');

    useEffect(() => {
        if (inputRef.current && cursorRef.current !== null) {
            const input = inputRef.current;
            if (input.setSelectionRange) {
                input.setSelectionRange(cursorRef.current, cursorRef.current);
            }
        }
    }, [formattedCardNumber]);

    async function handleClickCardPostsclick(e) {
        e.preventDefault();
        setMessage(false);
        const purchaseType = (playlistCartDataItems?.length > 0 || type === 'playlist') ? 'playlist' : 'document';
        const ItemsData = await PostRepository.postClickCardNumber(document, 'click', purchaseType, user?.access, affiliateId);
        if (ItemsData?.status === 201) {
            setMessage(true);
            window.open(ItemsData?.data?.url, '_blank');
        } else {
            setMessage(true);
            Modal.error({ centered: true, title: 'Xatolik', content: ItemsData?.data?.msg });
        }
    }

    async function handleClickCardPostsPayme(e) {
        e.preventDefault();
        setMessage(false);
        const purchaseType = (playlistCartDataItems?.length > 0 || type === 'playlist') ? 'playlist' : 'document';
        const ItemsData = await PostRepository.postClickCardNumber(document, 'payme', purchaseType, user?.access, affiliateId);
        if (ItemsData?.status === 201) {
            setMessage(true);
            Router.push(ItemsData?.data?.url);
        } else {
            setMessage(true);
            Modal.error({ centered: true, title: 'Xatolik', content: ItemsData?.data?.msg });
        }
    }

    async function handleClickCardPosts(e) {
        e.preventDefault();
        setMessage(false);
        const purchaseType = (playlistCartDataItems?.length > 0 || type === 'playlist') ? 'playlist' : 'document';
        const ItemsData = await PostRepository.postClickCard(document, numberCardVal, cardDate, purchaseType, user?.access, affiliateId);
        if (ItemsData?.status === 201) {
            safeLocalStorage.removeItem('cart');
            setMessage(true);
            setOpen(true);
            setCart(ItemsData.data.cart);
            setResData(ItemsData);
        } else {
            setMessage(true);
            Modal.error({
                centered: true,
                title: 'Xatolik',
                content: ItemsData?.data?.expire_date
                    ? 'Muddatni kiriting'
                    : ItemsData?.data?.card_number
                        ? 'Karta raqami xato'
                        : ItemsData?.data?.msg,
            });
        }
    }

    async function handleSubmitCode() {
        setButtonOk(true);
        const dataNews = await PostRepository.postClickCode(cart, code, user?.access);
        setButtonOk(false);
        if (dataNews?.status === 200) {
            setOpen(false);
            safeLocalStorage.removeItem('cart');
            Modal.success({ centered: true, title: 'Muvaffaqiyatli!', content: dataNews?.data?.msg });
            if (user?.role === 'seller' || user?.role === 'customer') Router.push('/account/sellerproducts');
            else Router.push('/');
            if (document?.length > 1) removeAll();
        } else {
            setResDataCode(dataNews);
            if (dataNews?.data?.msg?.[0] !== 'Parol xato') {
                setOpen(false);
                Modal.error({ centered: true, title: 'Xatolik!', content: `${dataNews?.data?.msg}` });
                startTimeout(() => setResData(null), 2000);
            }
        }
    }

    useEffect(() => {
        if (resData?.status === 201) {
            setTime(120);
            const timerID = setInterval(() => {
                setTime((prev) => (prev <= 0 ? (clearInterval(timerID), setResData(null), setOpen(false), 0) : prev - 1));
            }, 1000);
            return () => clearInterval(timerID);
        }
    }, [resData]);

    const formattedTime = new Date(time * 1000).toISOString().substr(14, 5);

    const paymentItems = [
        {
            key: '1',
            label: (
                <div className={styles.paymentIconWrap}>
                    <img className={styles.iconUzcard} src="/static/img/uzcard_humo.png" alt="uzcard_humo" />
                </div>
            ),
            children: (
                <div className="pt-1">
                    <form onSubmit={handleClickCardPosts}>
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Karta raqami</label>
                            <div className={styles.customInputWrapper}>
                                <span className={styles.inputIcon}><FaRegCreditCard /></span>
                                <input
                                    ref={inputRef}
                                    required
                                    className={styles.customInput}
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength="19"
                                    placeholder="0000 0000 0000 0000"
                                    value={formattedCardNumber}
                                    onChange={handleCardNumberChange}
                                />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Amal qilish muddati</label>
                            <div className={styles.customInputWrapper}>
                                <span className={styles.inputIcon}><FaRegCalendarDays /></span>
                                <input
                                    required
                                    className={styles.customInput}
                                    inputMode="numeric"
                                    maxLength="5"
                                    placeholder="MM/YY"
                                    value={numberDate}
                                    onChange={handleCardNumberDate}
                                />
                            </div>
                        </div>
                        <FormSubmitButton hisob={hisobFormatted} message={message} />
                    </form>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className={styles.paymentIconWrap}>
                    <img className={styles.iconClick} src="/static/img/click.png" alt="click" />
                </div>
            ),
            children: (
                <div className="pt-4">
                    <form onSubmit={handleClickCardPostsclick}>
                        <FormSubmitButton hisob={hisobFormatted} message={message} />
                    </form>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div className={styles.paymentIconWrap}>
                    <img className={styles.iconPayme} src="/static/img/soff/paymee-r.png" alt="payme" />
                </div>
            ),
            children: (
                <div className="pt-4">
                    <form onSubmit={handleClickCardPostsPayme}>
                        <FormSubmitButton hisob={hisobFormatted} message={message} />
                    </form>
                </div>
            ),
        },
    ];

    return (
        <div className="checkout-step-content">
            <div className={styles.totalBanner}>
                <span className={styles.label}>Jami to'lov miqdori</span>
                <span className={styles.value}>{hisobFormatted} so'm</span>
            </div>

            <Tabs
                className={styles.paymentTabs}
                centered
                defaultActiveKey="1"
                items={paymentItems}
            />

            <SecurePaymentAlert />

            <Modal
                title="SMS kodni kiriting"
                centered
                open={open}
                onOk={handleSubmitCode}
                onCancel={() => (setOpen(false), setResData(null))}
                maskClosable={false}
                okText={buttonOk ? <BeatLoader color="#fff" size={6} /> : "Tasdiqlash"}
                cancelText="Bekor qilish"
                okButtonProps={{ disabled: buttonOk, style: { background: '#00a44f' } }}
            >
                <div className="text-center py-4">
                    <p className="text-gray-500 mb-6">
                        Kod quyidagi raqamga yuborildi:<br/>
                        <strong className="text-gray-900">{resData?.data?.phone_number}</strong>
                    </p>
                    <input
                        ref={otpInputRef}
                        value={code || ''}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full text-center text-2xl tracking-[12px] h-16 rounded-xl border border-gray-200 outline-none focus:border-green-500 transition-all font-bold"
                        maxLength={6}
                        placeholder="000000"
                    />
                    <div className="mt-4 font-bold text-red-500">{formattedTime}</div>
                    {resDataCode?.data?.msg?.[0] === 'Parol xato' && (
                        <p className="text-red-500 mt-2">Parol xato, qaytadan urinib ko'ring</p>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default CreditCard2;
