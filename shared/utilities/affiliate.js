import { safeLocalStorage } from './safe-local-storage';

const KEY = 'soff_affiliate';
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

// Kept in localStorage so the code survives reloads, new tabs and the Google/Telegram login redirect.
export function saveAffiliate(code) {
    safeLocalStorage.setItem(KEY, JSON.stringify({ code, savedAt: Date.now() }));
}

export function loadAffiliate() {
    try {
        const raw = safeLocalStorage.getItem(KEY);
        if (!raw) return null;
        const { code, savedAt } = JSON.parse(raw);
        if (!code || Date.now() - savedAt > TTL_MS) {
            safeLocalStorage.removeItem(KEY);
            return null;
        }
        return code;
    } catch {
        return null;
    }
}
