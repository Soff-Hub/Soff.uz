import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// Lotincha oy va hafta kunlari
const locale = {
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
    weekdaysMin: 'Ya_Du_Se_Ch_Pa_Ju_Sh'.split('_'), // This is the missing property!
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

// Register the locale
dayjs.locale(locale, undefined, true);

// IMPORTANT: Explicitly set it as active locale
dayjs.locale('uz-latn');

// Extend dayjs with UTC and timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

// Set default timezone to Asia/Tashkent
dayjs.tz.setDefault('Asia/Tashkent');

export function getTimeAgo(dateString) {
    return dayjs(dateString, 'YYYY-MM-DD HH:mm').fromNow();
}

export const getDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
};
export const getDateTime = (date) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm');
};

export const getStatus = (timestamp) => {
    if (!timestamp || !dayjs(timestamp).isValid()) {
        return 'Noma’lum vaqt';
    }

    const now = dayjs();
    const diffMinutes = now.diff(dayjs(timestamp), 'minute');
    const diffHours = now.diff(dayjs(timestamp), 'hour');
    const diffDays = now.diff(dayjs(timestamp), 'day');

    // 5 minut ichida
    if (diffMinutes < 5) {
        return <span style={{ color: '#02a214' }}>Online</span>;
    }

    // 1 soatdan kam
    if (diffMinutes < 60) {
        return `${diffMinutes} daqiqa oldin `;
    }

    // 24 soatdan kam
    if (diffHours < 24) {
        const minutes = diffMinutes % 60;
        return `${diffHours} soat ${minutes} daqiqa oldin `;
    }

    // 1 kundan katta
    return dayjs(timestamp).format('DD.MM.YYYY HH:mm [da online edi]');
};

export function getRemainingDays(createdAt, deliveryDay) {
    const endDate = dayjs(createdAt).add(Number(deliveryDay), 'day'); // tugash sanasi
    const today = dayjs(); // bugungi sana

    const diff = endDate.diff(today, 'day'); // qolgan kunlar

    if (diff < 0) {
        return 'Muddat tugagan'; // muddat o‘tgan
    }

    return `${diff} kun`; // qolgan kun
}

export default dayjs;
