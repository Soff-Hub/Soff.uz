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

// What SoffX AI can do — mirrors the tools on the home page (widgets/home/ai-tools).
export const SOFFX_URL = 'https://soffx.com/app';
export const SOFFX_FEATURES = [
    { key: 'video', title: 'AI video', text: 'Matndan video yaratish' },
    { key: 'image', title: 'AI rasmlar', text: 'Yuqori sifatli rasmlar' },
    { key: 'presentation', title: 'Taqdimot', text: 'Slayd va taqdimotlar' },
    { key: 'coursework', title: 'Kurs ishi', text: 'Kurs ishi va amaliy ish' },
    { key: 'referat', title: 'Referat', text: 'Referat va maqolalar' },
    { key: 'diploma', title: 'Diplom ishi', text: 'Bitiruv va BMI ishlari' },
    { key: 'lesson', title: 'Dars ishlanmasi', text: 'Dars ishlanmasi yaratish' },
];
export const SOFFX_PLAN_NOTES = {
    pro: "Pro ta'rifiga kiradi",
    ultra: "Max ta'rifida — eng katta reja",
};

// Visual theme per tier, keyed by the SoffX plan it includes (none → Start, pro → Pro, ultra → Max).
const TIER_THEMES = { none: 'start', pro: 'pro', ultra: 'max' };
export const getTierTheme = (tier) => TIER_THEMES[tier?.soffx_plan] || tier?.code || 'start';

export const STATUS_META = {
    active: { label: 'Faol', color: 'green' },
    cancelled: { label: 'Bekor qilingan', color: 'orange' },
    past_due: { label: "To'lov o'tmadi", color: 'red' },
};

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

const isUsableStatus = (subscription) => ['active', 'cancelled'].includes(subscription?.status);

// Tier code the user can claim with right now, or null (no subscription, or payment failed).
export const getMyTierCode = (subscription) =>
    isUsableStatus(subscription) ? subscription.tier?.code || null : null;

// Whether the product's tiers include the user's tier. Lists and detail pages send
// `platform_sub_tiers`; older responses without it fall back to the period's price cap.
const isInMyTier = (product, subscription) => {
    if (Array.isArray(product.platform_sub_tiers)) {
        return product.platform_sub_tiers.includes(getMyTierCode(subscription));
    }
    const cap = subscription.current_period?.max_document_price;
    return cap == null || (product.price || 0) <= cap;
};

/**
 * Where the product stands against the user's subscription (list guide):
 * - 'none':      not in the subscription → normal buy flow
 * - 'mine':      included in the user's tier → claim it
 * - 'higher':    only in a more expensive tier → suggest an upgrade
 * - 'subscribe': in the subscription but the user has none → suggest subscribing
 */
export const getSubscriptionStatus = (product, subscription) => {
    if (!product?.in_platform_sub) return 'none';
    if (!getMyTierCode(subscription)) return 'subscribe';
    return isInMyTier(product, subscription) ? 'mine' : 'higher';
};

export const useSubscriptionStatus = (product) => {
    const { subscription } = useMySubscription();
    return getSubscriptionStatus(product, subscription);
};

// Cheapest tier that includes the product, e.g. "Pro" for ["pro", "max"].
export const useUpgradeTierTitle = (product) => {
    const { data: tiers } = useTiers();
    const code = product?.platform_sub_tiers?.[0];
    if (!code) return null;
    const tier = tiers?.find((item) => item.code === code);
    return tier?.title || code.charAt(0).toUpperCase() + code.slice(1);
};

// Whether the user's subscription can claim this product right now, so buying it is pointless.
// Mirrors the backend claim checks we know about: status, tier and the monthly limit.
// The claim endpoint still has the final say (daily limit, admin changes).
export const canClaimWithSubscription = (subscription, product) => {
    if (getSubscriptionStatus(product, subscription) !== 'mine') return false;
    const period = subscription.current_period;
    return Boolean(period) && period.downloads_left > 0;
};

export const useIsCoveredBySubscription = (product, purchased = false) => {
    const { subscription } = useMySubscription();
    return !purchased && canClaimWithSubscription(subscription, product);
};
