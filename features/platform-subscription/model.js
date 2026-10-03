import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { fetchMySubscription, fetchTiers } from './api';

export const SUBSCRIPTION_PAGE_URL = '/subscription';
export const MY_SUBSCRIPTION_URL = '/account/subscription';

export const TIERS_QUERY_KEY = ['platform-sub-tiers'];
export const MY_SUBSCRIPTION_QUERY_KEY = ['platform-sub-my'];

export const SOFFX_PLAN_LABELS = {
    pro: 'SoffX AI Pro',
    ultra: 'SoffX AI Max',
};

export const STATUS_META = {
    active: { label: 'Faol', color: 'green' },
    cancelled: { label: 'Bekor qilingan', color: 'orange' },
    past_due: { label: "To'lov o'tmadi", color: 'red' },
};

export const REFUND_WINDOW_DAYS = 3;

export const formatDate = (value) => (value ? dayjs(value).format('DD.MM.YYYY') : '—');

export const useTiers = () =>
    useQuery({
        queryKey: TIERS_QUERY_KEY,
        queryFn: fetchTiers,
        staleTime: 10 * 60 * 1000,
    });

export const useIsLoggedIn = () => Boolean(useSelector((state) => state.auth.user?.access));

// The current user's subscription, or null. Never fetched for guests.
export const useMySubscription = () => {
    const isLoggedIn = useIsLoggedIn();
    const query = useQuery({
        queryKey: MY_SUBSCRIPTION_QUERY_KEY,
        queryFn: fetchMySubscription,
        enabled: isLoggedIn,
        staleTime: 60 * 1000,
    });
    return { ...query, subscription: isLoggedIn ? query.data || null : null, isLoggedIn };
};

export const useRefreshMySubscription = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: MY_SUBSCRIPTION_QUERY_KEY });
};

export const useSetMySubscription = () => {
    const queryClient = useQueryClient();
    return (subscription) => queryClient.setQueryData(MY_SUBSCRIPTION_QUERY_KEY, subscription);
};

// The backend checks the refund rule again; this only decides whether to show the button.
export const canRequestRefund = (subscription) => {
    const period = subscription?.current_period;
    if (!period || period.downloads_used !== 0) return false;
    const paidAt = period.starts_at || subscription.started_at;
    return Boolean(paidAt) && dayjs().diff(dayjs(paidAt), 'day', true) < REFUND_WINDOW_DAYS;
};
