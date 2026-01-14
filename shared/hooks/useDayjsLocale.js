import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setDayjsLocale } from '~/shared/utilities/dayjs-locale-uz';

/**
 * Hook to automatically sync dayjs locale with Next.js router locale
 * Use this in _app.jsx to ensure dayjs locale matches the current language
 */
export function useDayjsLocale() {
    const router = useRouter();
    const { locale = 'uz' } = router;

    useEffect(() => {
        setDayjsLocale(locale);
    }, [locale]);
}
