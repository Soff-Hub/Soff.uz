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
import { useTranslation } from 'next-i18next';

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
    const { locale } = router;
    const dispatch = useDispatch();
    const { t } = useTranslation('modals');

    useEffect(() => {
        setMsg(localStorage.getItem('msg'));

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
                    data: JSON.parse(localStorage.getItem('data')),
                })
            );
            if (resp.data?.role === 'seller') {
                localStorage.setItem('is_seller', '1');
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
                title: t('codeVerify.errorTitle'),
                content: err?.response?.data?.msg,
            });
        }
    };

    const getRecode = async () => {
        setLoading(true);
        const data = JSON.parse(localStorage.getItem('data'));

        try {
            await Axios.post(
                baseUrlAuth + 'auth/get-new-code/',
                {
                    ...data,
                    user: router?.query?.user,
                },
                {
                    headers: {
                        'Accept-Language': locale,
                    },
                }
            );
            Modal.success({
                centered: true,
                title: t('codeVerify.resendSuccessTitle'),
                content: t('codeVerify.resendSuccessMessage'),
            });

            setSecondsRemaining(120);
            startTimer(); // Yangi kod yuborilganda timerni qayta ishga tushiramiz
        } catch (err) {
            Modal.error({
                centered: true,
                title: t('codeVerify.errorTitle'),
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
                                    message: t('codeVerify.codeRequired'),
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
                            <p
                                className="text-xs text-center mb-4"
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={getRecode}>
                                {t('codeVerify.resendNow')}
                            </p>
                        ) : (
                            <p className="text-xs text-center mb-4">
                                {t('codeVerify.resendInPrefix')}
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
                                    t('codeVerify.submit')
                                )}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
