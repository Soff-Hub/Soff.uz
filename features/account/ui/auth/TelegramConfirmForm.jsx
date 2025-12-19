import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { baseUrlAuth } from '~/repositories/Repository';
import { login } from '~/store/auth/slice';

export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(
        2,
        '0'
    )}`;
};

const isReturnUrlEmpty = (returnUrl) => {
    return (
        !returnUrl ||
        returnUrl === 'undefined' ||
        returnUrl === 'null' ||
        returnUrl.trim() === '/' ||
        returnUrl.trim() === ''
    );
};

export default function TelegramConfigmForm({ isModal, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(120);
    const [start, setStart] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async ({ code }) => {
        setLoading(true);
        const data = {
            code,
        };

        try {
            const utm_source = localStorage.getItem('utm_source');
            const resp = await Axios.post(
                baseUrlAuth +
                    `auth/telegram-verify/${
                        utm_source ? `?utm_source=${utm_source}` : ''
                    }`,
                data
            );
            dispatch(
                login({
                    user: { ...resp.data, role: 'customer' },
                    data: {},
                })
            );
            if (resp.data?.role === 'seller') {
                localStorage.setItem('is_seller', '1');
            }

            if (isModal) {
                message.success(
                    "Siz tizimdan muvaffaqqiyatli ro'yxatdan o'tdingiz"
                );
                onSuccess();
                return;
            }

            const decodedUrl = decodeURIComponent(
                router?.query?.returnUrl || ''
            );

            if (router?.query?.returnUrl && !isReturnUrlEmpty(decodedUrl)) {
                router.push(decodedUrl);
            } else if (router?.query?.id) {
                router.push(`/account/checkout?id=${router?.query?.id}`);
            } else if (router?.query?.deal) {
                router.push(`/account/all-orders`);
            } else {
                router.push('/account/sellerproducts');
            }
            message.success(
                "Siz tizimdan muvaffaqqiyatli ro'yxatdan o'tdingiz"
            );
        } catch (err) {
            setLoading(false);
            message.error(err?.response?.data?.msg);
        }
    };

    const getRecode = async () => {
        setLoading(true);
        setSecondsRemaining(120);

        const interval = setInterval(() => {
            setSecondsRemaining((prevSeconds) => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);
        setLoading(false);
    };

    const handleStart = () => {
        setStart(true);
        getRecode();
    };

    return (
        <div style={{ backgroundColor: '#f1f1f1', padding: '50px 20px' }}>
            <div className="container p-0">
                <div className="ps-form--account">
                    <Form onFinish={handleSubmit}>
                        <p className="text-center fs-2 mb-4">
                            <span>Kirish uchun </span>
                            <a
                                onClick={handleStart}
                                href="https://t.me/soff_auth_bot?start=new_code"
                                target="_blank"
                                className="text-success">
                                @soff_auth_bot
                            </a>{' '}
                            <span>orqali tasdiqlash kodini oling</span>
                        </p>
                        <Form.Item
                            name="code"
                            className="mb-4 d-flex justify-content-center"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ilitmos kodni kiriting',
                                },
                            ]}>
                            <Input.OTP
                                size="large"
                                length={4}
                                type="number"
                                style={{ maxWidth: '200px' }}
                                className="mx-auto"
                            />
                        </Form.Item>

                        {start ? (
                            <div>
                                {secondsRemaining === 0 ? (
                                    <a
                                        onClick={getRecode}
                                        href="tg://resolve?domain=soff_uz_bot"
                                        className="text-danger text-center d-block">
                                        Qayta kod olish
                                    </a>
                                ) : (
                                    <p className="text-xs cursor-pointer text-center mb-4">
                                        Qayta kod olish uchun{' '}
                                        {formatTime(secondsRemaining)}
                                    </p>
                                )}
                            </div>
                        ) : (
                            ''
                        )}

                        <div className="form-group submit mt-3">
                            {loading ? (
                                <button
                                    disabled={true}
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    <BeatLoader color="#fff" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth text-white">
                                    Tasdiqlash
                                </button>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
