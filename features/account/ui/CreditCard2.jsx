import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Tabs, Alert, Input } from 'antd';
import PostRepository from '~/repositories/PostRepository';
import { BeatLoader } from 'react-spinners';
import Router from 'next/router';
import useCart from '~/shared/hooks/useCart';
import ProductRepository from '~/repositories/ProductRepository';
import { calculateAmount } from '~/shared/utilities/ecomerce-helpers';
import { addPeriodToThousands } from './price-formatter';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { FaRegCreditCard } from 'react-icons/fa6';
import { FaRegCalendarDays } from 'react-icons/fa6';

import { IoShieldCheckmarkOutline } from 'react-icons/io5';

export const SecurePaymentAlert = ({ style, bordered = true, ...rest }) =>
    bordered ? (
        <Alert
            message="To‘lov jarayoni ishonchli, shifrlangan va xavfsiz tarzda amalga oshiriladi."
            type="success"
            showIcon
            style={{
                lineHeight: 'normal',
                color: 'green',
                marginTop: '10px',
                ...style,
            }}
            icon={<IoShieldCheckmarkOutline fontSize={25} />}
            {...rest}
        />
    ) : (
        <div style={style} {...rest}>
            <IoShieldCheckmarkOutline
                style={{
                    color: 'green',
                    fontSize: '20px',
                    marginRight: '5px',
                    marginBottom: '4px',
                }}
            />
            <span style={{ color: 'green', fontSize: '13px' }}>
                To‘lov jarayoni ishonchli, shifrlangan va xavfsiz tarzda amalga
                oshiriladi.
            </span>
        </div>
    );

const FormSubmitButton = ({ hisob, message, className, ...rest }) => (
    <div className={`w-100 ${className}`} {...rest}>
        <button
            type="submit"
            className="ps-btn w-100"
            style={{
                color: 'white',
            }}>
            {message ? `To'lash (${hisob} so'm)` : <BeatLoader color="#fff" />}
        </button>
        <button
            type="submit"
            className="ps-btn ps-btn--fullwidth w-100 sticky_color_btn"
            style={{
                color: 'white',
            }}>
            {message ? `To'lash (${hisob} so'm)` : <BeatLoader color="#fff" />}
        </button>
    </div>
);

const CreditCard2 = ({ document, type }) => {
    const { user } = useSelector(state => state.auth);
    const ecomerce = useSelector(state => state.ecomerce.cartDataItems);
    const { affiliateId } = useSelector(state => state.affiliate);
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
    const [tab, setTab] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const affiliate_code = affiliateId;
    const numberTyper = value => {
        SetNumberCardVal(value);
        if (!value == 0) {
            let numberPlaceholder = '';
            for (let i = 0; i < 16; i++) {
                if (i > 0 && i % 4 === 0) {
                    numberPlaceholder += ' ';
                }
                numberPlaceholder += value[i] || '●';
            }
        }
    };
    let amount = calculateAmount(ecomerce);
    async function getPercentage() {
        const responseData = await ProductRepository.getOrderPercentage();
        if (responseData) {
            setPercentage(Number(responseData?.data?.percentage));
        }
    }

    useEffect(() => {
        getPercentage();
    }, []);

    const hisob = addPeriodToThousands(
        amount + Math.floor(amount * percentage)
    );

    async function handleClickCardPostsclick(e) {
        e.preventDefault();
        setMessage(false);
        const ItemsData = await PostRepository.postClickCardNumber(
            document,
            'click',
            `${type || 'document'}`,
            user?.access,
            affiliate_code
        );
        if (ItemsData?.status === 201) {
            setMessage(true);
            // localStorage.removeItem('cart');
            Router.push(ItemsData?.data?.url);
        } else {
            setMessage(true);
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli emas',
                content: ItemsData?.data?.msg,
            });
            modal.update;
        }
    }

    async function handleClickCardPostsPayme(e) {
        e.preventDefault();
        setMessage(false);
        const ItemsData = await PostRepository.postClickCardNumber(
            document,
            'payme',
            `${type || 'document'}`,
            user?.access,
            affiliate_code
        );
        if (ItemsData?.status === 201) {
            // localStorage.removeItem('cart');
            setMessage(true);
            Router.push(ItemsData?.data?.url);
        } else {
            setMessage(true);
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli emas',
                content: ItemsData?.data?.msg,
            });
            modal.update;
        }
    }

    async function handleClickCardPosts(e) {
        e.preventDefault();
        setMessage(false);
        const ItemsData = await PostRepository.postClickCard(
            document,
            numberCardVal,
            cardDate,
            `${type || 'document'}`,
            user?.access,
            affiliate_code
        );
        if (ItemsData?.status === 201) {
            localStorage.removeItem('cart');
            setMessage(true);
            setOpen(true);
            setCart(ItemsData.data.cart);
            setResData(ItemsData);
        } else {
            setMessage(true);
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli emas',
                content: ItemsData?.data?.expire_date
                    ? ' Karta amal qilish muddatini kiriting'
                    : ItemsData?.data?.card_number
                    ? "Karta raqamini to'g'ri kiriting"
                    : ItemsData?.data?.msg,
            });
            modal.update;
        }
    }

    async function handleSubmitCode() {
        setButtonOk(true);
        const dataNews = await PostRepository.postClickCode(
            cart,
            code,
            user?.access
        );
        if (dataNews) {
            setResDataCode(dataNews);
            setButtonOk(false);
        }
        if (
            dataNews?.status !== 200 &&
            dataNews?.data?.msg?.[0] !== 'Parol xato'
        ) {
            setOpen(false);
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: `${dataNews?.data?.msg}`,
            });

            startTimeout(() => {
                setResData(null);
            }, 2000);
        }
        if (dataNews?.status === 200) {
            setOpen(false);
            localStorage.removeItem('cart');
            const modal = Modal.success({
                centered: true,
                title: 'Muffaqiyatli!',
                content: `${dataNews?.data?.msg} `,
            });

            if (user?.role === 'seller' || user?.role === 'customer') {
                Router.push('/account/sellerproducts');
            } else {
                Router.push('/');
            }
            if (document?.length > 1) {
                removeAll();
            }
        }
    }

    useEffect(() => {
        if (resData?.status === 201) {
            setTime(120);
            const timerID = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 0) {
                        clearInterval(timerID);
                        setResData(null);
                        setOpen(false);
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);

            return () => clearInterval(timerID);
        }
    }, [resData]);

    function handleCancale() {
        setOpen(false);
        setResData(null);
    }

    const formattedTime = new Date(time * 1000).toISOString().substr(14, 5);

    const [formattedCardNumber, setFormattedCardNumber] = useState('');
    const [numberDate, setNumberDate] = useState('');

    const handleCardNumberChange = e => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Raqam va probilni olib tashlash
        let formattedValue = '';

        if (inputValue.length <= 16) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' '; // Raqamlarni probil bilan ajratish
                }
                formattedValue += inputValue[i];
            }
        }

        numberTyper(inputValue);
        setFormattedCardNumber(formattedValue);
    };

    const handleCardNumberDate = e => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Raqam va probilni olib tashlash
        let formattedValue = '';

        if (inputValue.length <= 4) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 2 === 0) {
                    formattedValue += '/'; // Raqamlarni probil bilan ajratish
                }
                formattedValue += inputValue[i];
            }
        }
        setCardDate(inputValue);
        setNumberDate(formattedValue);
    };

    const onChange = key => {
        setTab(key);
    };

    const items = [
        {
            key: '1',
            label: (
                <div className="click ">
                    <img
                        src="/static/img/uzcard_humo.png"
                        alt="uzcard_humo_payment_card"
                    />
                </div>
            ),
            children: (
                <div className="w-100 px-4">
                    <form
                        onSubmit={handleClickCardPosts}
                        style={{ marginInline: '1px' }}
                        className="pb-3 d-flex align-items-end justify-content-between row gap-4 bg-white">
                        <div className="col-xl-7 p-0 my-2" style={{ flex: 1 }}>
                            <p className="cardNumber">Karta raqam</p>
                            <label htmlFor="ccn" style={{ width: '100%' }}>
                                <Input
                                    required
                                    prefix={
                                        <FaRegCreditCard
                                            style={{
                                                width: '45px',
                                                fontSize: '20px',
                                            }}
                                        />
                                    }
                                    style={{
                                        height: '50px',
                                    }}
                                    id="ccn"
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9\s]{13,19}"
                                    autoComplete="cc-number"
                                    maxLength="19"
                                    placeholder="0000 0000 0000 0000"
                                    value={formattedCardNumber}
                                    onChange={handleCardNumberChange}
                                />
                            </label>
                        </div>
                        <div className="col-xl-4 p-0 click-form-item my-2">
                            <label className="m-0">
                                <Input
                                    required
                                    prefix={
                                        <FaRegCalendarDays
                                            style={{
                                                width: '45px',
                                                fontSize: '20px',
                                            }}
                                        />
                                    }
                                    id="ccn"
                                    inputMode="numeric"
                                    style={{
                                        height: '50px',
                                    }}
                                    autoComplete="cc-number"
                                    maxLength="5"
                                    placeholder="MM/YY"
                                    value={numberDate}
                                    onChange={handleCardNumberDate}
                                />
                            </label>
                        </div>
                        <FormSubmitButton
                            hisob={hisob}
                            message={message}
                            className={'col-12 p-0'}
                        />
                    </form>
                    <SecurePaymentAlert bordered={false} />

                    <Modal
                        width={500}
                        title={'Kodni kiriting!'}
                        centered
                        open={open}
                        onOk={handleSubmitCode}
                        onCancel={handleCancale}
                        maskClosable={false}
                        destroyOnClose
                        okButtonProps={{
                            style: { backgroundColor: 'green', color: 'white' },
                        }}
                        okText={
                            buttonOk ? (
                                <BeatLoader color="#fff" />
                            ) : (
                                "To'lov qilish"
                            )
                        }
                        cancelText="Orqaga">
                        <>
                            <p>
                                Kod quyidagi raqamga yuborildi:
                                {resData?.data?.phone_number}
                            </p>
                            <input
                                onChange={e => setCode(e.target.value)}
                                type="tel"
                                placeholder="000000"
                                maxLength={6}
                                className="form-control text-center rounded-3 fs-3"
                            />
                            <strong className="text-danger">
                                {formattedTime}
                            </strong>
                            <p className="text-danger">
                                {resDataCode?.data?.msg?.[0] == 'Parol xato' &&
                                    resDataCode?.data?.msg}
                            </p>
                        </>
                    </Modal>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className="click">
                    <img src="/static/img/click.png" alt="click_payment" />
                </div>
            ),
            children: (
                <div className="w-100 px-4">
                    <form
                        onSubmit={handleClickCardPostsclick}
                        className="pt-4 pb-3 d-flex align-items-end justify-content-between">
                        <FormSubmitButton hisob={hisob} message={message} />
                    </form>
                    <SecurePaymentAlert bordered={false} />
                </div>
            ),
        },

        {
            key: '3',
            label: (
                <div className="click">
                    <img
                        src="/static/img/soff/paymee-r.png"
                        alt="payme_payment"
                    />
                </div>
            ),
            children: (
                <div className="w-100 px-4">
                    <form
                        onSubmit={handleClickCardPostsPayme}
                        className="pt-4 pb-3 d-flex align-items-end justify-content-between">
                        <FormSubmitButton hisob={hisob} message={message} />
                    </form>
                    <SecurePaymentAlert bordered={false} />
                </div>
            ),
        },
    ];

    return (
        <Tabs
            className="bg-white  checkoutstep-1"
            centered
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
        />
    );
};

export default CreditCard2;
