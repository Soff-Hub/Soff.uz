import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// Hand-made O'zbekcha tarjima
const uzLocale = {
  name: 'uz',
  relativeTime: {
    future: '%s ichida',
    past: '%s oldin',
    s: 'bir necha soniya',
    m: '1 daqiqa',
    mm: '%d daqiqa',
    h: '1 soat',
    hh: '%d soat',
    d: '1 kun',
    dd: '%d kun',
    M: '1 oy',
    MM: '%d oy',
    y: '1 yil',
    yy: '%d yil',
  },
};

dayjs.locale(uzLocale, null, true); // override 'uz'

export function getTimeAgo(dateString) {
  return dayjs(dateString, 'YYYY-MM-DD HH:mm').fromNow();
}