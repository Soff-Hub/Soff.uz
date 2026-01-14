import { NextRouter } from 'next/router';

const defaultLocale = 'uz';
const runDefaultUserLocale = (router: NextRouter) => {
    localStorage.setItem('user_locale', defaultLocale);
    router.push(`/${defaultLocale}${router.asPath}`, undefined, {
        locale: defaultLocale,
        shallow: false,
    });
};

export async function defineUserLocale(router: NextRouter) {
    const validLocales = ['uz', 'en', 'ru'];
    const pathHasLocale = /^\/(uz|en|ru)(\/|$)/.test(router.asPath);
    const savedLocale = localStorage.getItem('user_locale');

    // PRIORITY 1: If URL has locale defined, sync it with localStorage
    if (pathHasLocale) {
        const urlLocale = router.asPath.match(/^\/(uz|en|ru)/)?.[1];
        if (urlLocale && validLocales.includes(urlLocale)) {
            if (savedLocale !== urlLocale) {
                localStorage.setItem('user_locale', urlLocale);
            }
            return;
        }
    }

    // PRIORITY 2: If URL doesn't have locale but localStorage has value, use it
    if (savedLocale && validLocales.includes(savedLocale)) {
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
    if (!pathHasLocale && !savedLocale) {
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

            localStorage.setItem('user_locale', detectedLocale);
            router.push(`/${detectedLocale}${router.asPath}`, undefined, {
                locale: detectedLocale,
                shallow: false,
            });
        };

        const error = (_err: GeolocationPositionError) => {
            runDefaultUserLocale(router);
            return;
        };

        navigator.geolocation.getCurrentPosition(success, error);
    }
}
