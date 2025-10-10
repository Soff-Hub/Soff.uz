import { useEffect, useState } from 'react';

export function useTelegram() {
    const [telegramData, setTelegramData] = useState({
        tg: null,
        queryId: null,
        tgId: null,
    });

    useEffect(() => {
        // Only run on client side
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg?.expand();

            setTelegramData({
                tg,
                queryId: tg?.initDataUnsafe?.query_id,
                tgId: tg?.initDataUnsafe?.user?.id,
            });
        }
    }, []);

    return telegramData;
}
