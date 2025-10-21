import { useRouter } from 'next/router';

export function useSafeBack() {
    const router = useRouter();

    const safeBack = (e, defaultPath = '/') => {
        if (typeof window !== 'undefined') {
            e?.preventDefault();
            // If there's history, go back; otherwise go to default path
            if (window.history.length > 1) {
                router.back();
            } else {
                router.push(defaultPath);
            }
        }
    };

    return safeBack;
}
