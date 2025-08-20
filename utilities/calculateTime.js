import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

// O'zbekcha tarjima
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

// 1. Ro'yxatdan o'tkazamiz
dayjs.locale(uzLocale, null, true);

// 2. Faollashtiramiz
dayjs.locale('uz');

export function getTimeAgo(dateString) { 
  return dayjs(dateString, 'YYYY-MM-DD HH:mm').fromNow()
}

export const getDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY')
};

export const getStatus = (timestamp) => {
  if (!timestamp || !dayjs(timestamp).isValid()) {
    return "Noto‘g‘ri sana";
  }

  const diffMinutes = dayjs().diff(dayjs(timestamp), "minute");

  if (diffMinutes < 5) {
    return "Online";
  }

  return dayjs(new Date(timestamp)).format('YYYY-MM-DD HH:mm')
}

export function getRemainingDays(createdAt, deliveryDay) {

  const endDate = dayjs(createdAt).add(Number(deliveryDay), "day"); // tugash sanasi
  const today = dayjs(); // bugungi sana

  const diff = endDate.diff(today, "day"); // qolgan kunlar

  if (diff < 0) {
    return 'Muddat tugagan'; // muddat o‘tgan
  }

  return `${diff} kun`; // qolgan kun
}