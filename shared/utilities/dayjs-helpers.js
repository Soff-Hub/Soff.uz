import React from 'react';
import dayjs from './dayjs-locale-uz';
import { setDayjsLocale } from './dayjs-locale-uz';

/**
 * Get time ago with automatic locale support
 * @param {string} dateString - ISO date string
 * @param {string} locale - Current locale (uz, en, ru)
 */
export function getTimeAgo(dateString, locale = 'uz') {
    setDayjsLocale(locale);
    return dayjs(dateString, 'YYYY-MM-DD HH:mm').fromNow();
}

/**
 * Get formatted date
 * @param {string|Date} date - Date to format
 * @param {string} locale - Current locale (uz, en, ru)
 */
export const getDate = (date, locale = 'uz') => {
    setDayjsLocale(locale);
    return dayjs(date).format('DD/MM/YYYY');
};

/**
 * Get formatted date and time
 * @param {string|Date} date - Date to format
 * @param {string} locale - Current locale (uz, en, ru)
 */
export const getDateTime = (date, locale = 'uz') => {
    setDayjsLocale(locale);
    return dayjs(date).format('YYYY-MM-DD HH:mm');
};

/**
 * Get user status with translations
 * @param {string} timestamp - ISO timestamp
 * @param {Function} t - i18n translation function
 * @param {string} locale - Current locale (uz, en, ru)
 */
export const getStatus = (timestamp, t, locale = 'uz') => {
    setDayjsLocale(locale);

    if (!timestamp || !dayjs(timestamp).isValid()) {
        return t('common.unknownTime');
    }

    const now = dayjs();
    const diffMinutes = now.diff(dayjs(timestamp), 'minute');
    const diffHours = now.diff(dayjs(timestamp), 'hour');

    // 5 minutes ago
    if (diffMinutes < 5) {
        return <span style={{ color: '#02a214' }}>Online</span>;
    }

    // Less than 1 hour
    if (diffMinutes < 60) {
        return t('common.minutesAgo', { count: diffMinutes });
    }

    // Less than 24 hours
    if (diffHours < 24) {
        const minutes = diffMinutes % 60;
        return t('common.hoursMinutesAgo', { hours: diffHours, minutes });
    }

    // More than 24 hours
    return dayjs(timestamp).format(t('common.dateTimeFormat'));
};

/**
 * Get remaining days with translations
 * @param {string} createdAt - Creation timestamp
 * @param {number} deliveryDay - Delivery days
 * @param {Function} t - i18n translation function
 * @param {string} locale - Current locale (uz, en, ru)
 */
export function getRemainingDays(createdAt, deliveryDay, t, locale = 'uz') {
    setDayjsLocale(locale);

    const endDate = dayjs(createdAt).add(Number(deliveryDay), 'day');
    const today = dayjs();
    const diff = endDate.diff(today, 'day');

    if (diff < 0) {
        return t('common.deadlinePassed');
    }

    return t('common.daysRemaining', { count: diff });
}
