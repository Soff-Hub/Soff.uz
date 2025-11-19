import Router, { useRouter } from 'next/router';
import React from 'react';
// import useAuth from '~/shared/hooks/useAuth';

export default function GoogleBox({
    // loading,
    // params,
    isModal,
    onGoogleSuccessNavigateTo,
    openTelegram,
    // setCode,
}) {
    // const { registerGoogleUser } = useAuth();
    const router = useRouter();

    const handleGoogleClick = async () => {
        // Build the OAuth URL with proper query parameters
        const utm_source = localStorage.getItem('utm_source');
        const baseUrl = 'https://api.soff.uz/auth/social/login/customer';
        const params = new URLSearchParams();

        if (onGoogleSuccessNavigateTo) {
            localStorage.setItem(
                'google_redirect_url',
                onGoogleSuccessNavigateTo
            );
        }

        // Add existing query parameters
        Object.keys(router.query).forEach(key => {
            if (router.query[key]) {
                params.append(key, router.query[key]);
            }
        });

        if (utm_source) {
            params.append('utm_source', utm_source);
        }

        // Add return URL for modals
        if (isModal) {
            params.append('returnUrl', encodeURIComponent(router.asPath));
            // onSuccess();
        }

        const fullUrl = params.toString()
            ? `${baseUrl}?${params.toString()}`
            : baseUrl;
        // Use window.location for external redirects - this works reliably on iOS 18
        window.location.href = fullUrl;
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
            <div
                onClick={handleTelegramClick}
                style={{
                    border: '1px solid #24A1DE',
                    borderRadius: '10px',
                    cursor: 'pointer',
                }}
                className="py-3 px-3 d-flex align-items-center gap-2 w-100 justify-content-center">
                <img src="/static/img/telegram.png" alt="" height={20} />
                <span>Telegram orqali kirish</span>
            </div>

            <div
                onClick={handleGoogleClick}
                style={{
                    border: '1px solid #DB4437',
                    borderRadius: '10px',
                    cursor: 'pointer',
                }}
                className="py-3 px-3 d-flex align-items-center gap-2 w-100 justify-content-center">
                <img src="/static/img/google.png" alt="" height={20} />
                <span>Google orqali kirish</span>
            </div>
        </div>
    );
}
