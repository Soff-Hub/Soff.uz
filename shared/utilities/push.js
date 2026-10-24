// Web Push (VAPID) subscription helpers. The `api` instance attaches the
// user's Bearer token itself, so these only work for a logged-in user.
import { api } from '~/repositories/api';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const SW_URL = '/sw.js';

export const isPushSupported = () =>
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window;

export const getPushPermission = () =>
    isPushSupported() ? Notification.permission : 'unsupported';

// iPhone/iPad only allow push for a site added to the Home Screen (iOS 16.4+)
export const isIosOutsidePwa = () => {
    if (typeof window === 'undefined') return false;
    const isIos =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isStandalone =
        window.navigator.standalone === true ||
        window.matchMedia?.('(display-mode: standalone)').matches;
    return isIos && !isStandalone;
};

function urlBase64ToUint8Array(base64) {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    const raw = atob((base64 + padding).replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from([...raw].map((ch) => ch.charCodeAt(0)));
}

/**
 * Subscribes this browser and sends the subscription to the backend.
 * With `silent: true` it never shows the browser prompt — it only re-links an
 * existing permission to the current user (used after login). Without it, call
 * this from a click handler: Safari ignores permission requests made outside one.
 */
export async function subscribeToPush({ silent = false } = {}) {
    if (!isPushSupported() || !VAPID_PUBLIC_KEY) return null;

    try {
        const permission = silent
            ? Notification.permission
            : await Notification.requestPermission();
        if (permission !== 'granted') return null;

        const registration = await navigator.serviceWorker.register(SW_URL);
        await navigator.serviceWorker.ready;

        const subscription =
            (await registration.pushManager.getSubscription()) ||
            (await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
            }));

        await api.post('push/subscribe/', subscription.toJSON());
        return subscription;
    } catch (error) {
        console.warn('Push subscription failed:', error);
        return null;
    }
}

// Call before the logout request, while the token is still valid, so the next
// user on this browser doesn't get the previous user's notifications.
export async function unsubscribeFromPush() {
    if (!isPushSupported()) return;

    try {
        const registration = await navigator.serviceWorker.getRegistration(SW_URL);
        const subscription = await registration?.pushManager.getSubscription();
        if (!subscription) return;

        await api
            .post('push/unsubscribe/', { endpoint: subscription.endpoint })
            .catch(() => {});
        await subscription.unsubscribe();
    } catch (error) {
        console.warn('Push unsubscribe failed:', error);
    }
}
