import React, { useState } from 'react'
import { Form, Switch, Modal } from 'antd';
import { formatCurrency } from '~/shared/utilities/product-helper';
import { formatCreditCardNumber, formatExpiryDate } from '~/shared/utilities/ecomerce-helpers';
import { useRouter } from 'next/router';
import axios from 'axios';
import { baseUrlCustomer } from '~/reositoriy-admin/Repository';


export default function SellerDonateForm() {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(5000)
    const [description, setDescription] = useState(null)
    const [code, setCode] = useState(null)
    const [order, setOrder] = useState(null)
    const [paymentMethod, setPaymentMenthod] = useState('by_card')
    const [cardData, setCardData] = useState({
        number: '',
        expired_date: ''
    })
    const [paymentStep, setPaymentStep] = useState('card') // card | sms | re-sms
    const [timer, setTimer] = useState('02:00')
    const [reSend, setReSend] = useState(false)
    const [loading, setLoading] = useState(false);

    const { query, push } = useRouter()


    function reverseCountdown(minutes, seconds) {
        if (typeof minutes !== 'number' || typeof seconds !== 'number' || minutes < 0 || seconds < 0) {
            return "Faqat non-negativ sonlar kiritilishi kerak";
        }

        var totalSeconds = minutes * 60 + seconds;

        var interval = setInterval(function () {
            var mins = Math.floor(totalSeconds / 60);
            var secs = totalSeconds % 60;

            // Formatni to'g'ri chiqarish
            var formattedMins = mins < 10 ? "0" + mins : mins;
            var formattedSecs = secs < 10 ? "0" + secs : secs;

            setTimer(formattedMins + ":" + formattedSecs);

            totalSeconds--;

            if (totalSeconds < 0) {
                clearInterval(interval);
                setPaymentStep("re-sms");
            }

            if (reSend) {
                clearInterval(interval);
            }


        }, 1000);
    }


    const handleSubmit = async (e) => {
        e?.preventDefault?.()
        setLoading(true)

        if ((paymentStep === 'card' || paymentStep === 're-sms') && paymentMethod === 'by_card') {
            setReSend(false)
            setPaymentStep('sms')

            const cfg = {
                card_number: cardData.number.split(' ').join(''),
                expire_date: cardData.expired_date.replace('/', ''),
                amount,
                description,
                sponsor_info: name,
                user: Number(query.pid),
                provider: 'by_card'
            }

            try {
                const resp = await axios.post(`${baseUrlCustomer}donate/`, cfg)

                const modal = Modal.success({
                    centered: true,
                    title: 'Muvaffaqiyatli!',
                    content: resp.data?.msg,
                });

                setOrder(resp.data?.order)
                reverseCountdown(1, 59)

            } catch (err) {
                const modal = Modal.error({
                    centered: true,
                    title: 'Xatolik!',
                    content: err.response.data?.msg,
                });

                setPaymentStep('card')
            }

            setLoading(false)

            return
        }

        if (paymentStep === 'sms' && paymentMethod === 'by_card') {
            const cfg = {
                code,
                order,
            }

            try {
                const resp = await axios.post(`${baseUrlCustomer}verify/`, cfg)

                const modal = Modal.success({
                    centered: true,
                    title: 'Muvaffaqiyatli!',
                    content: resp.data?.msg,
                });

                push('/')

            } catch (err) {
                if (err.response.data?.status?.[0] === "False") {
                    const modal = Modal.error({
                        centered: true,
                        title: 'Xatolik!',
                        content: err.response.data?.msg,
                    });
                } else {
                    setReSend(true)
                    const modal = Modal.error({
                        centered: true,
                        title: 'Xatolik!',
                        content: err.response.data?.msg || "Qaytadan urinib ko'ring",
                    });
                    setPaymentStep('card')
                }
            }

            setLoading(false)

            return
        }

        if (paymentMethod === 'click' || paymentMethod === 'payme') {
            const cfg = {
                amount,
                description,
                sponsor_info: name,
                user: Number(query.pid),
                provider: paymentMethod
            }

            try {
                const resp = await axios.post(`${baseUrlCustomer}donate/`, cfg)

                window.location.href = resp.data.url
            } catch (err) {
                const modal = Modal.error({
                    centered: true,
                    title: 'Xatolik!',
                    content: err.response.data?.msg,
                });

            }

            setLoading(false)
            return
        }
    }

    const onChange = (checked) => {
        if (checked) {
            setName('Anonim')
        } else {
            setName('')
        }
    };

    return (
        <div className="container" id='products'>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="ps-tab active" id="register">
                    <form className="ps-form__content" onSubmit={handleSubmit}>
                        <h3>Qo'llab quvvatlash</h3>
                        <div className='d-flex align-items-center gap-3'>
                            <div className="form-group flex-grow-1">
                                <p>Ism yoki nikneym *</p>
                                {name === 'Anonim' ? (
                                    <input
                                        className="form-control"
                                        type={'text'}
                                        placeholder="Ism yoki nikneym"
                                        value={"Anonim"}
                                    />
                                ) : (
                                    <input
                                        className="form-control"
                                        type={'text'}
                                        placeholder="Ism yoki nikneym"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                )}
                            </div>
                            <div className="form-group">
                                <p>Anonim</p>
                                <Form.Item style={{ display: 'flex', alignItems: 'center' }}>
                                    <Switch onChange={onChange} style={name === "Anonim" ? { backgroundColor: '#00A44F' } : {}} />
                                </Form.Item>
                            </div>
                        </div>

                        <div className='d-flex align-items-center gap-3'>
                            <div className="form-group flex-grow-1">
                                <p>Summa (so'm)</p>
                                <input
                                    required
                                    className="form-control"
                                    type={'number'}
                                    placeholder="Ism yoki nikneym"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='amount-list d-flex gap-4 flex-wrap'>
                            {
                                [5000, 10000, 20000, 50000, 100000, 250000].map(el => (
                                    <div
                                        key={el}
                                        className='amount-item py-1 px-4'
                                        style={{
                                            backgroundColor: Number(amount) === el ? '#00A44F' : '#f1f1f1',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            color: Number(amount) !== el ? '#00A44F' : '#f1f1f1',
                                        }}
                                        onClick={() => setAmount(el)}
                                    >
                                        {formatCurrency(el)}
                                    </div>
                                ))
                            }
                        </div>

                        <div className='d-flex align-items-center gap-3 mt-4'>
                            <div className="form-group flex-grow-1">
                                <p>Xabar matnini yuboring</p>
                                <textarea
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="form-control"
                                    placeholder="Xabar matnini yuboring"
                                />
                            </div>
                        </div>

                        <div className='amount-list d-flex gap-4 flex-wrap mb-4'>
                            {
                                [
                                    {
                                        name: 'by_card',
                                        img: '/static/img/payment-method/by_card.png'
                                    },
                                    {
                                        name: 'click',
                                        img: '/static/img/payment-method/click-logo.png'
                                    },
                                    {
                                        name: 'payme',
                                        img: '/static/img/payment-method/payme-logo.png'
                                    },
                                ].map((el, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
                                            cursor: 'pointer',
                                            backgroundColor: el.name === paymentMethod ? '#00A44F' : '#f1f1f1',
                                            transition: 'all 0.3s ease',
                                            width: '100px',
                                            // border: '1px solid #00A44F'
                                        }}
                                        onClick={() => (setPaymentStep('card'), setPaymentMenthod(el.name))}
                                    >
                                        <img src={el.img} alt="" />
                                    </div>
                                ))
                            }
                        </div>

                        {paymentMethod === 'by_card' && paymentStep === 'card' && (
                            <div className='d-flex align-items-center gap-3 mt-2' style={{ maxWidth: '300px' }}>
                                <div className="form-group flex-grow-1">
                                    <p>Karta raqami</p>
                                    <input
                                        className="form-control"
                                        placeholder="Karta raqamini kiriting"
                                        maxLength={19}
                                        onChange={(e) => setCardData((c) => ({ ...c, number: formatCreditCardNumber(e.target.value) }))}
                                        value={cardData.number}
                                    />
                                    <p>Kartaning amal qilish muddati</p>
                                    <input
                                        className="form-control"
                                        placeholder="mm/yy"
                                        maxLength={6}
                                        onChange={(e) => setCardData((c) => ({ ...c, expired_date: formatExpiryDate(e.target.value) }))}
                                        value={cardData.expired_date}
                                    />
                                </div>
                            </div>
                        )}


                        {paymentMethod === 'by_card' && (paymentStep === 'sms' || paymentStep === 're-sms') && (
                            <div className='d-flex align-items-center gap-3' style={{ maxWidth: '300px' }}>
                                <div className="form-group flex-grow-1">
                                    <p>Raqamingizga yuborilgan sms kodni kiriting</p>
                                    <input
                                        className="form-control"
                                        placeholder="Kod"
                                        maxLength={6}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                    {paymentStep === 're-sms' ? <p className='text-danger' style={{ cursor: 'pointer' }} onClick={handleSubmit}>Qayta kod yuborish</p> : <p>{timer} qayta kod olish uchun</p>}
                                </div>
                            </div>
                        )}


                        <button
                            type={loading ? 'button' : 'submit'}
                            style={{ maxWidth: '300px', gap: '5px' }}
                            className={`text-white ps-btn w-100 mt-3 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 donate-color-btn confirm-btn`}
                        >
                            {' '}
                            {
                                loading ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"
                                    width="20" height="20" style={{ shapeRendering: 'auto', display: 'block', background: 'transparent' }}
                                >
                                    <g>
                                        <circle cx="50" cy="50" r="41" stroke-width="8" stroke="#d23232"
                                            stroke-dasharray="64.40264939859075 64.40264939859075" fill="none" stroke-linecap="round">
                                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
                                                keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                                        </circle>
                                        <g></g>
                                    </g>
                                </svg> : <i className="fa-solid fa-gift"></i>
                            }
                            {' '}
                            <span>Davom etish</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
