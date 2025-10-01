const tg = window?.Telegram?.WebApp;

export function useTelegram() {
    if (tg) {
        tg?.expand?.();
    }

    return {
        tg,
        queryId: tg?.initDataUnsafe?.query_id,
        tgId: tg?.initDataUnsafe?.user?.id,
    };
}
