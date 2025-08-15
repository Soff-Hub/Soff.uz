import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Tabs } from 'antd';
import { BeatLoader } from 'react-spinners';
import Router, { useRouter } from 'next/router';
import useCart from '~/hooks/useCart';
import useCreateOrder from './api/createOrder';
import { useVerifyCode } from './api/verifyCode';

const ServiceCheckout = ({ document, order_id }) => {
    const [numberCardVal, SetNumberCardVal] = useState(null);
    const [message, setMessage] = useState(true);
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
    const { push } = useRouter()

    const verifyCode = useVerifyCode()

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
        setMessage(false);

        createOrder.mutate(
            {
                service_id: document,
                payment_type: type,
            },
            {
                onSuccess: (data) => {
                    console.log("✅ Click payment success:", data);
                    setMessage(true);
                },
                onError: (err) => {
                    console.error("❌ Click payment error:", err);
                    setMessage(true);
                }
            }
        );
    }

    // 📌 Oddiy karta raqami orqali to'lov
    async function handleClickCardPosts(e) {
        e.preventDefault();
        setMessage(false);

        const payload = {
            service_id: document,
            payment_type: type,
            card_number: formattedCardNumber.replace(/\s/g, ""),
            expire_date: numberDate.replace("/", "")
        }

        if(order_id)payload.order_id = order_id

        createOrder.mutate(
            payload,
            {
                onSuccess: (data) => {
                    console.log("✅ Click payment success:", data);
                    setMessage(true);
                    setOpen(true)
                    setResData(data)
                },
                onError: (err) => {
                    console.error("❌ Click payment error:", err);
                    setMessage(true);
                }
            }
        );
    }


    // 📌 SMS kodi tasdiqlash
    async function handleSubmitCode() {
        setButtonOk(true);
        verifyCode.mutate(
            {
                transaction_id: resData?.transaction_id,    
                code
            },
            {
                onSuccess: (data) => {
                    setResDataCode(data);
                    if(!order_id) push("/order/my-orders")
                },
                onError: (error) => {
                    // Agar backend detail yuborsa
                    const errorMessage = error?.response?.data || { detail: "Noma'lum xato" };
                    setResDataCode(errorMessage);
                }
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

    const formattedTime = `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`;




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

    const items = [
        {
            key: '1',
            label: (
                <div className='click'>
                    <img src='/static/img/uzcard_humo.png' alt='' />
                </div>
            ),
            children: (
                <div className='row mx-auto m-0'>
                    <div className='px-4 mx-md-auto rounded click-b'>
                        <div>
                            <form onSubmit={handleClickCardPosts} className='pb-3 d-flex align-items-end justify-content-between row gap-3 bg-white'>
                                <div className='col-xl-7 col-lg-12 p-0 col-md-7 col-sm-6 click-form-item my-2'>
                                    <p className='cardNumber'>Karta raqam</p>
                                    <label htmlFor='ccn' className='m-0'>
                                        <i className='fa-regular fa-credit-card i'></i>
                                        <input
                                            required
                                            type='tel'
                                            className='form-control rounded-3 card__number'
                                            inputMode='numeric'
                                            maxLength='19'
                                            placeholder='0000 0000 0000 0000'
                                            value={formattedCardNumber}
                                            onChange={handleCardNumberChange}
                                        />
                                    </label>
                                </div>
                                <div className='col-xl-4 col-lg-6 p-0 col-md-4 col-sm-6 click-form-item my-2'>
                                    <label className='m-0'>
                                        <i className='fa-regular fa-calendar-days'></i>
                                        <input
                                            required
                                            className='form-control rounded-3 card__number'
                                            inputMode='numeric'
                                            maxLength='5'
                                            placeholder='MM/YY'
                                            value={numberDate}
                                            onChange={handleCardNumberDate}
                                        />
                                    </label>
                                </div>
                                <div className='col-12 p-0'>
                                    {message ? (
                                        <button type='submit' className='ps-btn w-100 btn_color'>Davom etish</button>
                                    ) : (
                                        <button className='ps-btn w-100'>
                                            <BeatLoader color='#fff' />
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    <Modal
                        width={500}
                        title='Kodni kiriting!'
                        centered
                        open={open}
                        onOk={handleSubmitCode}
                        onCancel={handleCancale}
                        okButtonProps={{
                            style: { backgroundColor: 'green', color: 'white' },
                        }}
                        okText={buttonOk ? <BeatLoader color='#fff' /> : "To'lov qilish"}
                        cancelText='Orqaga'
                    >
                        <>
                            <p>Kod quyidagi raqamga yuborildi: {resData?.phone_number}</p>
                            <input
                                onChange={e => setCode(e.target.value)}
                                type='tel'
                                placeholder='000000'
                                maxLength={6}
                                className='form-control text-center rounded-3 fs-3'
                            />
                            <strong className='text-danger'>{formattedTime}</strong>
                            {resDataCode?.detail && (
                                <p className='text-danger'>{resDataCode.detail}</p>
                            )}
                        </>
                    </Modal>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className='click'>
                    <img src='/static/img/click.png' alt='' />
                </div>
            ),
            children: (
                <div className='row mx-auto m-0'>
                    <div className='px-4 rounded click-b'>
                        <form onSubmit={handleClickCardPostsclick} className='pt-3 pb-3 d-flex row gap-3'>
                            <div className='col-12 p-0 px-4 my-3'>
                                {message ? (
                                    <button type='submit' className='ps-btn w-100 btn_color'>Davom etish</button>
                                ) : (
                                    <button className='ps-btn w-100'>
                                        <BeatLoader color='#fff' />
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
            className='bg-white checkoutstep-1'
            defaultActiveKey='1'
            items={items}
            onChange={onChange}
        />
    );
};

export default ServiceCheckout;
