import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';

export function useCountdown(secondsStart = 120) {
    const [left, setLeft] = useState(secondsStart);
    useEffect(() => {
        if (left <= 0) return;
        const id = setInterval(() => setLeft(s => s - 1), 1000);
        return () => clearInterval(id);
    }, [left]);
    const reset = useCallback(() => setLeft(secondsStart), [secondsStart]);
    const fmt = s => {
        const m = Math.floor(s / 60),
            ss = String(s % 60).padStart(2, '0');
        return `${String(m).padStart(2, '0')}:${ss}`;
    };
    return { left, display: fmt(left), reset };
}

// Hook: Buyurtma qabul qilingan vaqtdan topshirish muddatigacha qolgan vaqtni hisoblaydi
export const useCountOrderTime = (acceptedDate, deliveryDays) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Agar acceptedDate yoki deliveryDays mavjud bo'lmasa, hisoblashni to'xtatamiz
        if (!acceptedDate || !deliveryDays) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        // Topshirish muddatini hisoblash (acceptedDate + deliveryDays)
        const deadline = dayjs(acceptedDate).add(deliveryDays, 'day');

        // Har soniya yangilanish uchun interval
        const interval = setInterval(() => {
            const now = dayjs();
            const diff = deadline.diff(now); // Qolgan vaqt (millisekundlarda)

            if (diff <= 0) {
                // Agar vaqt tugagan bo'lsa, intervalni to'xtatamiz
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(interval);
                return;
            }

            // Millisekundlarni kun, soat, daqiqa va soniyalarga aylantirish
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000); // Har soniya yangilash

        // Komponent o'chirilganda intervalni tozalash
        return () => clearInterval(interval);
    }, [acceptedDate, deliveryDays]);

    return timeLeft;
};

export const useCountTimeBack = deadline_date => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        if (!deadline_date) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const deadline = dayjs(deadline_date);

        const updateTime = () => {
            const now = dayjs();
            const diff = deadline.diff(now);

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        // Boshlang‘ich chaqirish
        updateTime();

        // Har 1 sekundda yangilash
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [deadline_date]);

    return timeLeft;
};
