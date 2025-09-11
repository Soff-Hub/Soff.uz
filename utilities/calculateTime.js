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
export const getDateTime = (date) => {
  return dayjs(date).format('DD/MM/YYYY HH:mm')
};

export const getStatus = (timestamp) => {
  if (!timestamp || !dayjs(timestamp).isValid()) {
    return "Noma’lum vaqt";
  }

  const now = dayjs();
  const diffMinutes = now.diff(dayjs(timestamp), "minute");
  const diffHours = now.diff(dayjs(timestamp), "hour");
  const diffDays = now.diff(dayjs(timestamp), "day");

  // 5 minut ichida
  if (diffMinutes < 5) {
    return <span style={{ color: "#02a214" }}>Online</span>;
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
  return dayjs(timestamp).format("DD.MM.YYYY HH:mm [da online edi]");
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