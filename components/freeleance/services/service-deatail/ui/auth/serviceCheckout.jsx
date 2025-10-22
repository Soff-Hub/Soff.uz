import React, { useEffect, useState } from 'react';
import { Modal, Tabs } from 'antd';
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/router';
import useCreateOrder from './api/createOrder';
import { useVerifyCode } from './api/verifyCode';
import { useCountdown } from '~/shared/hooks/useCountDown';
import { useQueryClient } from '@tanstack/react-query';
import { message as AlertMessage } from 'antd';

const ServiceCheckout = ({
    document,
    order_id,
    files,
    description,
    onClose,
    onSuccess,
}) => {
    const [numberCardVal, SetNumberCardVal] = useState(null);
    const [message, setMessage] = useState(false);
    const [cardDate, setCardDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(120);
    const [code, setCode] = useState(null);
    const [resData, setResData] = useState(null);
    const [resDataCode, setResDataCode] = useState(null);
    const [buttonOk, setButtonOk] = useState(false);
    const [tab, setTab] = useState(false);
    const [type, setType] = useState('card');
    const createOrder = useCreateOrder();
    const [formattedCardNumber, setFormattedCardNumber] = useState('');
    const [numberDate, setNumberDate] = useState('');
    const { push } = useRouter();
    const queryClient = useQueryClient();
    const router = useRouter();
    // sms uchun vaqt orqaga sanash
    const { display, left, reset } = useCountdown(120);

    const verifyCode = useVerifyCode();

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

    async function handleClickCardPostsclick(e) {
        e.preventDefault();
        setMessage(true);

        createOrder.mutate(
            {
                service_id: document,
                payment_type: type,
                order_id,
                order_requirement_description: description,
                order_requirement_file: files?.[0]?.originFileObj,
            },
            {
                onSuccess: data => {
                    setMessage(true);
                    // window.open(data?.url, '_blank');
                    router.push(data.url);
                },
                onError: err => {
                    AlertMessage.error(err.response.data.detail);
                    setMessage(false);
                },
            }
        );
    }

    // 📌 Oddiy karta raqami orqali to'lov
    async function handleClickCardPosts(e) {
        e.preventDefault();
        setMessage(true);

        const payload = {
            service_id: document,
            payment_type: type,
            card_number: formattedCardNumber.replace(/\s/g, ''),
            expire_date: numberDate.replace('/', ''),
            order_requirement_description: description,
            order_requirement_file: files?.[0]?.originFileObj,
        };

        if (order_id) payload.order_id = order_id;
        createOrder.mutate(payload, {
            onSuccess: data => {
                setMessage(false);
                setOpen(true);
                setResData(data);
                reset();
            },
            onError: err => {
                console.error('❌ Click payment error:', err);
                setMessage(false);
                setResData({
                    detail: err?.response?.data?.detail || "Noma'lum xato",
                });
            },
        });
    }

    // 📌 SMS kodi tasdiqlash
    async function handleSubmitCode() {
        setButtonOk(true);
        verifyCode.mutate(
            {
                transaction_id: resData?.transaction_id,
                code,
            },
            {
                onSuccess: async data => {
                    await queryClient.invalidateQueries({
                        queryKey: ['orders'],
                    });
                    setResDataCode(data);
                    setOpen(false);
                    if (onSuccess) onSuccess();
                    if (!order_id) push('/order/my-orders?tab=2');
                    if (onClose) onClose();
                },
                onError: error => {
                    const errorMessage = error?.response?.data || {
                        detail: "Noma'lum xato",
                    };
                    setResDataCode(errorMessage);
                },
            }
        );
        setButtonOk(false);
    }

    useEffect(() => {
        if (resData?.status === 201) {
            setTime(120); // 2 daqiqa

            const timerID = setInterval(() => {
                setTime(prev => {
                    if (prev <= 1) {
                        clearInterval(timerID);
                        setResData(null);
                        setOpen(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timerID);
        }
    }, [resData]);

    function handleCancale() {
        setOpen(false);
        setResData(null);
    }

    const handleCardNumberChange = e => {
        const inputValue = e.target.value.replace(/\D/g, '');
        let formattedValue = '';

        if (inputValue.length <= 16) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += inputValue[i];
            }
        }

        numberTyper(inputValue);
        setFormattedCardNumber(formattedValue);
    };

    const handleCardNumberDate = e => {
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

    const onChange = key => {
        setTab(key);
        if (key === '1') {
            setType('card');
        } else if (key === '2') {
            setType('click');
        }
    };

    //     const items = [
    //         {
    //             key: '1',
    //             label: (
    //                 <div className="click" height={80} width={'auto'}>
    //                     <img
    //                         src="/static/img/uzcard_humo.png"
    //                         alt=""
    //                         height={80}
    //                         width={'auto'}
    //                     />
    //                 </div>
    //             ),
    //             children: (
    //                 <div className="row mx-auto m-0">
    //     <div className="px-4 mx-md-auto rounded click-b">
    //         <div>
    //             <form
    //                 onSubmit={handleClickCardPosts}
    //                 className="pb-3 d-flex align-items-end row gap-3 bg-white"
    //                 style={{
    //                     display: 'flex',
    //                     flexWrap: 'nowrap',
    //                     alignItems: 'flex-end'
    //                 }}>
    //                 <div className="col-xl-7 col-lg-7 col-md-7 col-sm-6 click-form-item my-2"
    //                      style={{ flex: '1 1 auto', minWidth: '200px' }}>
    //                     <p className="cardNumber">Karta raqam</p>
    //                     <label
    //                         htmlFor="ccn"
    //                         className="m-0"
    //                         style={{ position: 'relative' }}>
    //                         <i
    //                             className="fa-regular fa-credit-card i"
    //                             style={{
    //                                 position: 'absolute',
    //                                 left: '15px',
    //                                 top: '50%',
    //                                 transform: 'translateY(-50%)',
    //                                 zIndex: 10,
    //                                 color: '#6c757d',
    //                             }}></i>
    //                         <input
    //                             required
    //                             type="tel"
    //                             className="form-control rounded-3 card__number"
    //                             inputMode="numeric"
    //                             maxLength="19"
    //                             placeholder="0000 0000 0000 0000"
    //                             value={formattedCardNumber}
    //                             onChange={handleCardNumberChange}
    //                             style={{
    //                                 paddingLeft: '45px',
    //                                 height: '50px',
    //                                 width: '100%'
    //                             }}
    //                         />
    //                     </label>
    //                 </div>
    //                 <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 click-form-item my-2"
    //                      style={{ flex: '0 0 auto', minWidth: '150px' }}>
    //                     <label
    //                         className="m-0"
    //                         style={{ position: 'relative' }}>
    //                         <i
    //                             className="fa-regular fa-calendar-days"
    //                             style={{
    //                                 position: 'absolute',
    //                                 left: '15px',
    //                                 top: '50%',
    //                                 transform: 'translateY(-50%)',
    //                                 zIndex: 10,
    //                                 color: '#6c757d',
    //                             }}></i>
    //                         <input
    //                             required
    //                             className="form-control rounded-3 card__number"
    //                             inputMode="numeric"
    //                             maxLength="5"
    //                             placeholder="MM/YY"
    //                             value={numberDate}
    //                             onChange={handleCardNumberDate}
    //                             style={{
    //                                 paddingLeft: '45px',
    //                                 height: '50px',
    //                                 width: '100%'
    //                             }}
    //                         />
    //                     </label>
    //                 </div>

    //                 <div className="col-12 p-0" style={{ flex: '0 0 100%' }}>
    //                     {resData?.detail && (
    //                         <p
    //                             style={{
    //                                 color: 'red',
    //                                 marginBottom: '0px',
    //                             }}>
    //                             {resData.detail}
    //                         </p>
    //                     )}
    //                     {!message ? (
    //                         <button
    //                             type="submit"
    //                             className="ps-btn w-100 btn_color">
    //                             Davom etish
    //                         </button>
    //                     ) : (
    //                         <button className="ps-btn w-100">
    //                             <BeatLoader color="#fff" />
    //                         </button>
    //                     )}
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    // </div>
    //             ),
    //         },
    //         {
    //             key: '2',
    //             label: (
    //                 <div className="click" height={80} width={'auto'}>
    //                     <img src="/static/img/click.png" alt="" />
    //                 </div>
    //             ),
    //             children: (
    //                 <div className="row mx-auto m-0">
    //                     <div className="px-4 rounded click-b">
    //                         <form
    //                             onSubmit={handleClickCardPostsclick}
    //                             className="pt-3 pb-3 d-flex row gap-3">
    //                             <div className="col-12 p-0 px-4 my-3">
    //                                 {!message ? (
    //                                     <button
    //                                         type="submit"
    //                                         className="ps-btn w-100 btn_color">
    //                                         Davom etish
    //                                     </button>
    //                                 ) : (
    //                                     <button className="ps-btn w-100">
    //                                         <BeatLoader color="#fff" />
    //                                     </button>
    //                                 )}
    //                             </div>
    //                         </form>
    //                     </div>
    //                 </div>
    //             ),
    //         },
    //     ];

    const items = [
        {
            key: '1',
            label: (
                <div className="click" height={80} width={'auto'}>
                    <img
                        src="/static/img/uzcard_humo.png"
                        alt=""
                        height={80}
                        width={'auto'}
                    />
                </div>
            ),
            children: (
                <div className="row mx-auto m-0">
                    <div className="px-4 mx-md-auto rounded click-b">
                        <div>
                            <form
                                onSubmit={handleClickCardPosts}
                                className="pb-3 bg-white">
                                <div className="row g-3 align-items-end">
                                    <div className="col-xl-8 col-lg-7 col-md-7 col-12">
                                        <p
                                            className="cardNumber mb-2"
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                color: '#333',
                                                marginBottom: '8px',
                                            }}>
                                            Karta raqam
                                        </p>
                                        <label className="position-relative w-100">
                                            <i className="fa-regular fa-credit-card position-absolute top-50 translate-middle-y ms-3 text-secondary"></i>
                                            <input
                                                required
                                                type="tel"
                                                className="form-control rounded-3 card__number ps-5"
                                                inputMode="numeric"
                                                maxLength="19"
                                                placeholder="0000 0000 0000 0000"
                                                value={formattedCardNumber}
                                                onChange={
                                                    handleCardNumberChange
                                                }
                                                style={{
                                                    height: '50px',
                                                    fontSize: '16px',
                                                }}
                                            />
                                        </label>
                                    </div>

                                    <div className="col-xl-4 col-lg-5 col-md-5 col-12">
                                        <label className="position-relative w-100">
                                            <i className="fa-regular fa-calendar-days position-absolute top-50 translate-middle-y ms-3 text-secondary"></i>
                                            <input
                                                required
                                                className="form-control rounded-3 card__number ps-5"
                                                inputMode="numeric"
                                                maxLength="5"
                                                placeholder="MM/YY"
                                                value={numberDate}
                                                onChange={handleCardNumberDate}
                                                style={{
                                                    height: '50px',
                                                    fontSize: '16px',
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    {resData?.detail && (
                                        <p className="text-danger mb-2">
                                            {resData.detail}
                                        </p>
                                    )}
                                    {!message ? (
                                        <button
                                            type="submit"
                                            className="ps-btn w-100 btn_color"
                                            style={{
                                                height: '50px',
                                                fontSize: '16px',
                                            }}>
                                            Davom etish
                                        </button>
                                    ) : (
                                        <button
                                            className="ps-btn w-100"
                                            style={{ height: '50px' }}>
                                            <BeatLoader color="#fff" />
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className="click" height={80} width={'auto'}>
                    <img src="/static/img/click.png" alt="" />
                </div>
            ),
            children: (
                <div className="row mx-auto m-0">
                    <div className="px-4 rounded click-b">
                        <form
                            onSubmit={handleClickCardPostsclick}
                            className="pt-3 pb-3 d-flex row gap-3">
                            <div className="col-12 p-0 px-4 my-3">
                                {!message ? (
                                    <button
                                        type="submit"
                                        className="ps-btn w-100 btn_color">
                                        Davom etish
                                    </button>
                                ) : (
                                    <button className="ps-btn w-100">
                                        <BeatLoader color="#fff" />
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <Tabs
            className="bg-white checkoutstep-1"
            items={items}
            onChange={onChange}
        />
    );
};

export default ServiceCheckout;
