import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';
import { soffxLogin } from './api';
import { SOFFX_URL } from './model';

// SoffX's own sign-in page, which spends the token; never intercepted.
const SOFFX_LOGIN_PATH = `${SOFFX_URL}/auth/soffuz`;

const readAccess = () => {
    try {
        return JSON.parse(safeLocalStorage.getItem('user') || 'null')?.access || null;
    } catch {
        return null;
    }
};

const isLoggedIn = () => Boolean(readAccess());

// Same id SoffX ties its session to (SoffAIGenFrontend soffuz-bridge.ts `accountIdOf`).
const accountIdOf = (access) => {
    try {
        const { user_id: userId, sub } = jwtDecode(access);
        const id = userId ?? sub;
        if (id != null) return String(id);
    } catch {
        /* fall through */
    }
    return access;
};

// SoffX already signed in at /labs as this Soff.uz user: nothing to exchange.
const hasSoffxSession = () => {
    const access = readAccess();
    if (!access || !safeLocalStorage.getItem('soff.refresh_token')) return false;
    try {
        const link = JSON.parse(safeLocalStorage.getItem('soff.soffuz_link') || 'null');
        return link?.accountId === accountIdOf(access);
    } catch {
        return false;
    }
};

// The backend's login link points at soffx.com; its single-use token is spent on
// /labs instead, where SoffX runs inside Soff.uz (like /studio).
const toLabsLoginUrl = (url) => {
    const token = new URL(url).searchParams.get('token');
    if (!token) throw new Error('No token in the SoffX login link');
    return `${SOFFX_LOGIN_PATH}?token=${encodeURIComponent(token)}`;
};

/**
 * Opens SoffX at `target` (a /labs path), signed in as the Soff.uz user.
 * Signed out of Soff.uz, or no SoffX account to give: SoffX opens as a guest.
 */
export const openSoffx = async (target = SOFFX_URL) => {
    if (!isLoggedIn() || hasSoffxSession()) {
        window.location.assign(target);
        return;
    }
    // SoffX's own path: its router adds /labs back.
    const redirect = target.slice(SOFFX_URL.length) || '/';
    try {
        // A `redirect` the backend turns down still gets the user signed in, at SoffX's home.
        const { url } = await soffxLogin(redirect).catch(() => soffxLogin());
        window.location.assign(toLabsLoginUrl(url));
    } catch {
        window.location.assign(target);
    }
};

/**
 * Every link into /labs, wherever it is on the page, signs into SoffX on the
 * way — the header, home page cards, footer, search. Plain clicks only: a new
 * tab or a modified click keeps the browser's own behaviour.
 */
export const SoffxLinkListener = () => {
    useEffect(() => {
        const onClick = (event) => {
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const anchor = event.target.closest?.('a[href]');
            if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return;

            const url = new URL(anchor.href, window.location.href);
            if (url.origin !== window.location.origin) return;
            const isLabs = url.pathname === SOFFX_URL || url.pathname.startsWith(`${SOFFX_URL}/`);
            if (!isLabs || url.pathname.startsWith(SOFFX_LOGIN_PATH)) return;
            if (!isLoggedIn() || hasSoffxSession()) return;

            // Ahead of next/link, which would otherwise route there itself.
            event.preventDefault();
            event.stopPropagation();
            openSoffx(`${url.pathname}${url.search}${url.hash}`);
        };

        // Capture phase: runs before React's handlers on the page.
        document.addEventListener('click', onClick, true);
        return () => document.removeEventListener('click', onClick, true);
    }, []);

    return null;
};
