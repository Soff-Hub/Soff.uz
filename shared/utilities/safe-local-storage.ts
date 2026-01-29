const createSafeStorage = () => {
    const memoryStorage: Record<string, string> = {};

    const getStorage = (): Storage | null => {
        if (typeof window === 'undefined') return null;

        try {
            const test = '__safe_storage_test__';
            window.localStorage.setItem(test, test);
            window.localStorage.removeItem(test);
            return window.localStorage;
        } catch {
            return null;
        }
    };

    return {
        getItem: (key: string): string | null => {
            const storage = getStorage();
            if (storage) {
                try {
                    return storage.getItem(key);
                } catch {
                    console.warn(
                        'Error getting item from localStorage, falling back to memory storage.'
                    );
                }
            }
            return memoryStorage[key] || null;
        },

        setItem: (key: string, value: string): void => {
            const storage = getStorage();
            if (storage) {
                try {
                    storage.setItem(key, value);
                    return;
                } catch {
                    // Fall through to memory storage
                    console.warn(
                        'Error setting item in localStorage, falling back to memory storage.'
                    );
                }
            }
            memoryStorage[key] = String(value);
        },

        removeItem: (key: string): void => {
            const storage = getStorage();
            if (storage) {
                try {
                    storage.removeItem(key);
                    return;
                } catch {
                    // Fall through to memory storage
                    console.warn(
                        'Error removing item from localStorage, falling back to memory storage.'
                    );
                }
            }
            delete memoryStorage[key];
        },

        clear: (): void => {
            const storage = getStorage();
            if (storage) {
                try {
                    storage.clear();
                    return;
                } catch {
                    // Fall through to memory storage
                    console.warn(
                        'Error clearing localStorage, falling back to memory storage.'
                    );
                }
            }
            Object.keys(memoryStorage).forEach(
                (key) => delete memoryStorage[key]
            );
        },

        key: (index: number): string | null => {
            const storage = getStorage();
            if (storage) {
                try {
                    return storage.key(index);
                } catch {
                    // Fall through to memory storage
                    console.warn(
                        'Error accessing localStorage key by index, falling back to memory storage.'
                    );
                }
            }
            const keys = Object.keys(memoryStorage);
            return keys[index] || null;
        },

        get length(): number {
            const storage = getStorage();
            if (storage) {
                try {
                    return storage.length;
                } catch {
                    // Fall through to memory storage
                    console.warn(
                        'Error accessing localStorage length, falling back to memory storage.'
                    );
                }
            }
            return Object.keys(memoryStorage).length;
        },
    };
};

export const safeLocalStorage = createSafeStorage();
