import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';

// Lotincha oy va hafta kunlari
const uzLocale = {
    name: 'uz-latn',
    weekdays:
        'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split(
            '_'
        ),
    months: 'yanvar_fevral_mart_aprel_may_iyun_iyul_avgust_sentabr_oktabr_noyabr_dekabr'.split(
        '_'
    ),
    weekStart: 1,
    weekdaysShort: 'Yak_Du_Se_Ch_Pa_Ju_Sh'.split('_'),
    monthsShort: 'yan_fev_mar_apr_may_iyun_iyul_avg_sep_okt_noy_dek'.split('_'),
    weekdaysMin: 'Ya_Du_Se_Ch_Pa_Ju_Sh'.split('_'),
    formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm',
    },
    relativeTime: {
        future: '%s ichida',
        past: '%s oldin',
        s: 'bir necha soniya',
        m: 'bir daqiqa',
        mm: '%d daqiqa',
        h: 'bir soat',
        hh: '%d soat',
        d: 'bir kun',
        dd: '%d kun',
        M: 'bir oy',
        MM: '%d oy',
        y: 'bir yil',
        yy: '%d yil',
    },
    ordinal: (n) => `${n}-chi`,
};

// Register the custom Uzbek locale
dayjs.locale(uzLocale, undefined, true);

// Map Next.js locale to dayjs locale
const dayjsLocaleMap = {
    uz: 'uz-latn',
    en: 'en',
    ru: 'ru',
};

/**
 * Set dayjs locale based on Next.js locale
 * @param {string} nextLocale - Next.js locale (uz, en, ru)
 */
export function setDayjsLocale(nextLocale = 'uz') {
    const dayjsLocale = dayjsLocaleMap[nextLocale] || 'uz-latn';
    dayjs.locale(dayjsLocale);
}

// Initialize with default locale
setDayjsLocale('uz');

// Extend dayjs with UTC and timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

// Set default timezone to Asia/Tashkent
dayjs.tz.setDefault('Asia/Tashkent');

// Legacy functions - kept for backward compatibility
// For new code, use functions from dayjs-helpers.js with i18n support
export function getTimeAgo(dateString) {
    return dayjs(dateString, 'YYYY-MM-DD HH:mm').fromNow();
}

export const getDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
};

export const getDateTime = (date) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm');
};

// Note: getStatus and getRemainingDays are moved to dayjs-helpers.js
// with i18n support. These are kept for backward compatibility only.
// Please migrate to use the i18n-aware versions from dayjs-helpers.js

export default dayjs;
