import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { BeatLoader } from 'react-spinners';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { baseUrlAuth } from '~/repositories/Repository';
import { useDispatch } from 'react-redux';
import { login } from '~/store/auth/slice';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { isReturnUrlEmpty } from '~/shared/utilities/return-url';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';

export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(
        2,
        '0'
    )}`;
};

// Helper function to validate slug
const isValidSlug = (slug) => {
    return (
        slug &&
        typeof slug === 'string' &&
        slug.trim().length > 0 &&
        slug !== 'undefined' &&
        slug !== 'null'
    );
};

export default function CodeVerifyForm({ authCode, onClose, slug, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const { startInterval, clearAll } = useTimeManager();
    const [secondsRemaining, setSecondsRemaining] = useState(120);
    const [msg, setMsg] = useState(null);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        setMsg(safeLocalStorage.getItem('msg'));

        startTimer();
    }, []);

    const startTimer = () => {
        clearAll();

        startInterval(() => {
            setSecondsRemaining((prev) => {
                if (prev > 0) return prev - 1;
                clearAll();
                return 0;
            });
        }, 1000);
    };

    const handleSubmit = async ({ code }) => {
        setLoading(true);
        const data = { user: router?.query?.user || authCode, code };

        try {
            const resp = await Axios.post(baseUrlAuth + 'auth/verify/', data);
            dispatch(
                login({
                    user: { ...resp.data, role: 'customer' },
                    data: JSON.parse(safeLocalStorage.getItem('data')),
                })
            );
            if (resp.data?.role === 'seller') {
                safeLocalStorage.setItem('is_seller', '1');
            }

            if (typeof onClose === 'function') {
                onClose();
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
            } else if (authCode && isValidSlug(slug)) {
                router.push(`/service/${slug}?paymodal=open`);
            } else if (authCode && !isValidSlug(slug)) {
                console.error(
                    'Invalid slug for service navigation after auth:',
                    slug
                );
                if (typeof onSuccess === 'function') {
                    onSuccess();
                } else {
                    router.push('/account/sellerproducts');
                }
            } else if (typeof onSuccess === 'function') {
                onSuccess();
            } else if (authCode) {
            } else {
                router.push('/account/sellerproducts');
            }
        } catch (err) {
            setLoading(false);
            Modal.error({
                centered: true,
                title: 'Xatolik',
                content: err?.response?.data?.msg,
            });
        }
    };

    const getRecode = async () => {
        setLoading(true);
        const data = JSON.parse(safeLocalStorage.getItem('data'));

        try {
            await Axios.post(baseUrlAuth + 'auth/get-new-code/', {
                ...data,
                user: router?.query?.user,
            });
            Modal.success({
                centered: true,
                title: 'Yuborildi',
                content: 'Tasdiqlash kodi qayta yuborildi',
            });

            setSecondsRemaining(120);
            startTimer(); // Yangi kod yuborilganda timerni qayta ishga tushiramiz
        } catch (err) {
            Modal.error({
                centered: true,
                title: 'Xatolik',
                content: err?.response?.data?.msg,
            });
        }
        setLoading(false);
    };

    return (
        <div style={{ backgroundColor: '#f1f1f1', padding: '50px 20px' }}>
            <div className="container p-0">
                <div className="ps-form--account">
                    <Form onFinish={handleSubmit}>
                        <p className="text-center fs-2 mb-4">{msg}</p>

                        <Form.Item
                            name="code"
                            className="mb-4 d-flex justify-content-center"
                            rules={[
                                {
                                    required: true,
                                    message: 'Iltimos, kodni kiriting',
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

                        {secondsRemaining === 0 ? (
                            <button
                                type="button"
                                className="text-xs text-center mb-4 w-100 bg-transparent border-0 p-0"
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={getRecode}>
                                Qayta kod yuborish
                            </button>
                        ) : (
                            <p className="text-xs text-center mb-4">
                                Qayta kod olish uchun{' '}
                                {formatTime(secondsRemaining)}
                            </p>
                        )}

                        <div className="form-group submit mt-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="ps-btn text-white fw-normal ps-btn--fullwidth">
                                {loading ? (
                                    <BeatLoader color="#fff" />
                                ) : (
                                    'Tekshirish'
                                )}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
