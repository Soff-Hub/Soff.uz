import { v4 as uuidv4 } from 'uuid';

export function getOrCreateDeviceId() {
    if (typeof window === 'undefined') return null; // SSR safety

    const key = 'device_id';
    let id = localStorage.getItem(key);

    if (!id) {
        id = uuidv4();
        localStorage.setItem(key, id);
    }

    return id;
}
