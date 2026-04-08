import Router, { useRouter } from 'next/router';
import React from 'react';
import { signIn } from 'next-auth/react';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';

export default function GoogleBox({
    isModal,
    onGoogleSuccessNavigateTo,
    openTelegram,
}) {
    const router = useRouter();

    const handleGoogleClick = async () => {
        // Build callbackUrl
        const callbackUrl = onGoogleSuccessNavigateTo || router.asPath;
        
        // Save UTM source if exists for backend sync later
        const utm_source = safeLocalStorage.getItem('utm_source');
        if (utm_source) {
            // You can also pass custom params to signIn if your provider is configured to handle them,
            // or rely on cookies/localstorage that the callback can read.
        }

        // Trigger NextAuth Google SignIn
        signIn('google', { callbackUrl });
    };

    const handleTelegramClick = async () => {
        if (isModal) {
            openTelegram();
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

            <button
                type="button"
                onClick={handleGoogleClick}
                style={{
                    border: '1px solid #DB4437',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: 'transparent',
                    width: '100%',
                }}
                className="py-3 px-3 d-flex align-items-center gap-2 justify-content-center">
                <img src="/static/img/google.png" alt="" height={20} />
                <span>Google orqali kirish</span>
            </button>
        </div>
    );
}
