import { NextRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Locale } from '../types/lang';

const defaultLocale = 'uz';
const VALID_LOCALES = ['uz', 'en', 'ru'];

export const setLocaleCookie = (locale: Locale) => {
    if (typeof document === 'undefined') return;
    if (!VALID_LOCALES.includes(locale)) return;

    Cookies.set('user_locale', locale, {
        path: '/',
        expires: 365,
        sameSite: 'Lax',
    });
};

const getLocaleCookie = () => {
    if (typeof document === 'undefined') return null;
    return Cookies.get('user_locale') || null;
};

const runDefaultUserLocale = (router: NextRouter) => {
    setLocaleCookie(defaultLocale);
    router.push(`/${defaultLocale}${router.asPath}`, undefined, {
        locale: defaultLocale,
        shallow: false,
    });
};

export async function defineUserLocale(router: NextRouter) {
    const routerLocale = router.locale;
    const savedLocale = getLocaleCookie();

    console.log({ routerLocale, savedLocale });

    // PRIORITY 1: If URL has locale defined, sync it with localStorage
    if (routerLocale && VALID_LOCALES.includes(routerLocale)) {
        console.log('1 running');
        if (savedLocale !== routerLocale) {
            setLocaleCookie(routerLocale);
        }
        return;
    }

    // PRIORITY 2: If URL doesn't have locale but localStorage has value, use it
    if (savedLocale && VALID_LOCALES.includes(savedLocale)) {
        console.log('2 running');
        router.push(`/${savedLocale}${router.asPath}`, undefined, {
            locale: savedLocale,
            shallow: false,
        });
        return;
    }

    // PRIORITY 3: If neither URL nor localStorage has value, ask for geolocation
    if (!navigator.geolocation) {
        runDefaultUserLocale(router);
        return;
    }

    const success = async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        let detectedLocale = defaultLocale;

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
                {
                    headers: {
                        'User-Agent': 'Soff.uz',
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                const countryCode = data.address?.country_code;

                if (countryCode && countryCode.toLowerCase() !== 'uz') {
                    detectedLocale = 'ru';
                }
            }
        } catch (error) {
            runDefaultUserLocale(router);
            return;
        }
        setLocaleCookie(detectedLocale);
        router.push(`/${detectedLocale}${router.asPath}`, undefined, {
            locale: detectedLocale,
            shallow: false,
        });
    };

    const error = (_err: GeolocationPositionError) => {
        console.log('ignored geolocation error:', _err);
        runDefaultUserLocale(router);
        return;
    };

    navigator.geolocation.getCurrentPosition(success, error);
}
