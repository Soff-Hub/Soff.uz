import React, { useEffect, useState } from 'react'
import { Form, Input } from 'antd';
import { BeatLoader } from 'react-spinners';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { baseUrlAuth } from '~/repositories/Repository';
import { useDispatch } from 'react-redux';
import { login } from '~/store/auth/action';

export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
};


export default function CodeVerifyForm() {
    const [loading, setLoading] = useState(false)
    const [secondsRemaining, setSecondsRemaining] = useState(120);

    const router = useRouter()
    const dispatch = useDispatch()

    const handleSubmit = async ({ code }) => {
        setLoading(true)

        const data = {
            user: router?.query?.user,
            code
        }

        try {
            const resp = await Axios.post(baseUrlAuth + 'auth/new-verify/', data)

            dispatch(login({
                user: resp.data, data: {
                    role: 'customer',
                    email: ''
                }
            }));
            // if (id) {
            //     router.push(`/account/checkout-one?id=${id}`);
            // } else if (deal) {
            //     router.push(
            //         `/account/all-orders`
            //     );
            // }

            // else {
            //     if (user?.role === 'seller' || user.role === 'admin') {
            //         router.push('/account/dashbord');
            //     } else {
            //         router.push('/account/sellerproducts');
            //     }
            // }
            router.push('/account/sellerproducts');
        } catch (err) {
            console.log('err ', err);
        }
        setLoading(false)
    }

    const onChange = (text) => {
        return Number(text)
    };
    const sharedProps = {
        onChange,
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsRemaining(prevSeconds => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);
    }, []);


    return (
        <div style={{ backgroundColor: '#f1f1f1', padding: "50px 20px" }}>
            <div className="container p-0">
                <div className="ps-form--account">
                    <Form onFinish={handleSubmit}>
                        <p className='text-center fs-2 mb-4'>Telefon raqamingizga yuborilgan sms kodni kiriting</p>

                        <Form.Item
                            name="code"
                            className="mb-4 d-flex justify-content-center"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ilitmos kodni kiriting',
                                }
                            ]}
                        >
                            <Input.OTP
                                size='large'
                                length={4}
                                {...sharedProps}
                            />
                        </Form.Item>

                        {secondsRemaining === 0 ? <p className="text-xs cursor-pointer text-center mb-4" style={{ color: 'red' }}>
                            Qayta kod yuborish
                        </p> : <p className="text-xs cursor-pointer text-center mb-4">
                            Qayta kod olish uchun {formatTime(secondsRemaining)}
                        </p>}


                        <div className="form-group submit mt-3">
                            {loading ? <button
                                disabled={true}
                                type="submit"
                                className="ps-btn ps-btn--fullwidth">
                                <BeatLoader color="#fff" />
                            </button> : (
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    Tasdiqlash
                                </button>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
