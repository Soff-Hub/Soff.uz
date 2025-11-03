export function getOrCreateDeviceId() {
    if (typeof window === 'undefined') return null; // SSR safety

    const key = 'device_id';
    let id = localStorage.getItem(key);

    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(key, id);
    }

    return id;
}
