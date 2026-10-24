import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FaRegBell } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';
import {
    getPushPermission,
    isIosOutsidePwa,
    subscribeToPush,
} from '~/shared/utilities/push';
import styles from './style.module.scss';

const DISMISS_KEY = 'push_prompt_dismissed_at';
const DISMISS_DAYS = 7;
// Our own banner, never the browser prompt on page load — Chrome hides the
// permission request for sites that ask right away.
const SHOW_DELAY_MS = 15000;
const NOTIFICATION_PAGE = '/account/notification';
const HIDDEN_ON = ['/auth', '/oauth', '/chat', '/account/checkout', '/account/shopping-cart'];

const wasDismissedRecently = () => {
    const dismissedAt = Number(safeLocalStorage.getItem(DISMISS_KEY));
    return dismissedAt > 0 && Date.now() - dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000;
};

/**
 * Logged-in users only: re-links an already granted push permission to the
 * current user, and otherwise offers to turn notifications on.
 * On iPhone outside the Home Screen app it explains how to add the site instead.
 */
const PushPrompt = () => {
    const router = useRouter();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const [variant, setVariant] = useState(null); // 'push' | 'ios' | null
    const [loading, setLoading] = useState(false);

    // Silent re-subscribe after login: no prompt, only when already granted
    useEffect(() => {
        if (isLoggedIn && getPushPermission() === 'granted') {
            subscribeToPush({ silent: true });
        }
    }, [isLoggedIn, user?.id]);

    useEffect(() => {
        setVariant(null);
        if (!isLoggedIn || wasDismissedRecently()) return;
        if (HIDDEN_ON.some((path) => router.pathname.startsWith(path))) return;

        let next = null;
        if (getPushPermission() === 'default') next = 'push';
        else if (getPushPermission() === 'unsupported' && isIosOutsidePwa()) next = 'ios';
        if (!next) return;

        const delay = router.pathname === NOTIFICATION_PAGE ? 0 : SHOW_DELAY_MS;
        const timer = setTimeout(() => setVariant(next), delay);
        return () => clearTimeout(timer);
    }, [isLoggedIn, router.pathname]);

    if (!variant) return null;

    const dismiss = () => {
        safeLocalStorage.setItem(DISMISS_KEY, String(Date.now()));
        setVariant(null);
    };

    const enable = async () => {
        setLoading(true);
        await subscribeToPush();
        setLoading(false);
        // Granted or denied, the browser remembers it — the banner is no longer needed
        if (getPushPermission() !== 'default') setVariant(null);
    };

    return (
        <div className={styles.prompt} role="dialog" aria-labelledby="push-prompt-title">
            <div className={styles.icon} aria-hidden>
                <FaRegBell />
            </div>
            <div className={styles.body}>
                <p id="push-prompt-title" className={styles.title}>
                    Bildirishnomalarni yoqing
                </p>
                {variant === 'push' ? (
                    <p className={styles.text}>
                        Yangi xabar va buyurtmalardan sayt yopiq bo'lsa ham
                        xabardor bo'ling.
                    </p>
                ) : (
                    <p className={styles.text}>
                        iPhone'da bildirishnoma olish uchun: <b>Ulashish</b> →{' '}
                        <b>Bosh ekranga qo'shish</b>, so'ng saytni bosh ekrandan
                        oching.
                    </p>
                )}
                <div className={styles.actions}>
                    {variant === 'push' ? (
                        <>
                            <button
                                type="button"
                                className={styles.primary}
                                onClick={enable}
                                disabled={loading}>
                                Yoqish
                            </button>
                            <button type="button" className={styles.secondary} onClick={dismiss}>
                                Keyinroq
                            </button>
                        </>
                    ) : (
                        <button type="button" className={styles.primary} onClick={dismiss}>
                            Tushunarli
                        </button>
                    )}
                </div>
            </div>
            <button
                type="button"
                className={styles.close}
                onClick={dismiss}
                aria-label="Yopish">
                <IoClose />
            </button>
        </div>
    );
};

export default PushPrompt;
