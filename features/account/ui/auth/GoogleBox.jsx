import Router, { useRouter } from 'next/router';
import React from 'react';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';
import { GoogleLogin } from '@react-oauth/google';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '~/store/auth/slice';
import { baseUrlAuth } from '~/repositories/Repository';

export default function GoogleBox({
    isModal,
    onGoogleSuccessNavigateTo,
    openTelegram,
    params,
}) {
    const router = useRouter();
    const dispatch = useDispatch();

    const buildGoogleLoginUrl = () => {
        const queryParams = new URLSearchParams();
        const utmSource = safeLocalStorage.getItem('utm_source');
        const affiliateId = router.query?.id;

        if (affiliateId) {
            queryParams.set('id', String(affiliateId));
        }

        if (utmSource) {
            queryParams.set(
                'utm_source',
                utmSource.replace(/[^a-zA-Z0-9_-]/g, '')
            );
        }

        if (params) {
            const legacyParams = new URLSearchParams(
                String(params).replace(/^\?/, '')
            );
            legacyParams.forEach((value, key) => {
                if (value) queryParams.set(key, value);
            });
        }

        const queryString = queryParams.toString();
        return `${baseUrlAuth}auth/new-google-login/customer${
            queryString ? `?${queryString}` : ''
        }`;
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const idToken = credentialResponse?.credential;

        if (!idToken) {
            Modal.error({
                centered: true,
                title: 'Google orqali kirishda xatolik',
                content: 'Google ID token olinmadi. Qayta urinib ko‘ring.',
            });
            return;
        }

        try {
            const response = await fetch(buildGoogleLoginUrl(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_token: idToken }),
            });
            const data = await response.json();

            if (!response.ok || !data?.success || !data?.access) {
                throw new Error(
                    data?.msg || 'Google orqali kirishda xatolik yuz berdi.'
                );
            }

            dispatch(
                login({
                    user: data,
                    data: {
                        phone_or_email: 'google',
                        role: data.role || 'customer',
                    },
                })
            );

            const redirectUrl =
                onGoogleSuccessNavigateTo ||
                safeLocalStorage.getItem('google_redirect_url') ||
                (isModal ? router.asPath : '/');

            safeLocalStorage.removeItem('google_redirect_url');

            Router.push(redirectUrl);
        } catch (error) {
            Modal.error({
                centered: true,
                title: 'Google orqali kirishda xatolik',
                content:
                    error?.message ||
                    'Tarmoqda xatolik yuz berdi. Qayta urinib ko‘ring.',
            });
        }
    };

    const handleTelegramClick = async () => {
        if (isModal) {
            openTelegram();
            // Router.push({
            //     query: {
            //         ...Router.query,
            //         returnUrl: encodeURIComponent(router.asPath),
            //     },
            //     pathname: '/auth/telegram',
            // });
            // onSuccess();
        } else {
            Router.push({
                query: {
                    ...Router.query,
                },
                pathname: '/auth/telegram',
            });
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center gap-4 mt-2 ">
            <button
                type="button"
                onClick={handleTelegramClick}
                style={{
                    border: '1px solid #24A1DE',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: 'transparent',
                    width: '100%',
                }}
                className="py-3 px-3 d-flex align-items-center gap-2 justify-content-center">
                <img src="/static/img/telegram.png" alt="" height={20} />
                <span>Telegram orqali kirish</span>
            </button>

            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '52px',
                }}>
                <button
                    type="button"
                    tabIndex={-1}
                    style={{
                        border: '1px solid #DB4437',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        background: 'transparent',
                        width: '100%',
                        height: '100%',
                    }}
                    className=" px-3 d-flex align-items-center gap-2 justify-content-center">
                    <img src="/static/img/google.png" alt="" height={20} />
                    <span>Google orqali kirish</span>
                </button>
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 2,
                        overflow: 'hidden',
                        opacity: 0.01,
                    }}>
                <GoogleLogin
                    width="100%"
                    text="signin_with"
                    locale="uz"
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        Modal.error({
                            centered: true,
                            title: 'Google orqali kirishda xatolik',
                            content:
                                'Google oynasi muvaffaqiyatli yakunlanmadi. Qayta urinib ko‘ring.',
                        });
                    }}
                />
                </div>
            </div>
        </div>
    );
}
