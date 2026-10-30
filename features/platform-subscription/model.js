import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { fetchMySubscription, fetchSoffxPlans, fetchTiers } from './api';

export const SUBSCRIPTION_PAGE_URL = '/subscription';
export const MY_SUBSCRIPTION_URL = '/account/subscription';
export const BILLING_URL = '/account/billing';

// Catalogue size used in subscription copy; non-breaking space keeps "2 mln+" on one line.
export const CATALOGUE_SIZE = '2\u00a0mln+';

export const TIERS_QUERY_KEY = ['platform-sub-tiers'];
export const MY_SUBSCRIPTION_QUERY_KEY = ['platform-sub-my'];
export const SOFFX_PLANS_QUERY_KEY = ['soffx-plans'];

export const SOFFX_PLAN_LABELS = {
    pro: 'Soff AI Pro',
    ultra: 'Soff AI Max',
};

// What SoffX AI can do — mirrors the tools on the home page (widgets/home/ai-tools).
export const SOFFX_URL = '/labs';
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

export const useSoffxPlans = () =>
    useQuery({
        queryKey: SOFFX_PLANS_QUERY_KEY,
        queryFn: fetchSoffxPlans,
        staleTime: 10 * 60 * 1000,
        retry: 1,
    });

// The monthly SoffX plan a tier includes (its `soffx_plan` is SoffX's `plan_type`).
export const getSoffxPlanFor = (tier, plans) =>
    plans?.find(
        (plan) => plan.plan_type === tier?.soffx_plan && plan.duration_days >= 28 && plan.duration_days <= 31
    ) || null;

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

// File price the tier caps are compared with: the seller's price, without the service fee
// the buy block adds on top (a 30 000 file shows as 33 000 but fits a 30 000 cap).
const getProductPrice = (product) => product?.discount_price ?? product?.price ?? 0;

const fitsTier = (product, tier) =>
    tier.max_document_price == null || getProductPrice(product) <= tier.max_document_price;

// Cheapest tier that includes the product. `platform_sub_tiers` narrows the choice when the
// response has it; the price cap always applies, so a stale or missing list can't offer a
// tier whose cap is below the file's price.
export const getCheapestTierFor = (product, tiers) => {
    if (!tiers?.length) return null;
    const codes = Array.isArray(product?.platform_sub_tiers) ? product.platform_sub_tiers : null;
    return (
        [...tiers]
            .sort((a, b) => a.price - b.price)
            .find((tier) => (!codes || codes.includes(tier.code)) && fitsTier(product, tier)) || null
    );
};

// Whether the product's tiers include the user's tier. Lists and detail pages send
// `platform_sub_tiers`; older responses without it fall back to the period's price cap.
const isInMyTier = (product, subscription) => {
    if (Array.isArray(product.platform_sub_tiers)) {
        return product.platform_sub_tiers.includes(getMyTierCode(subscription));
    }
    const cap = subscription.current_period?.max_document_price;
    return cap == null || getProductPrice(product) <= cap;
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
    const tier = getCheapestTierFor(product, tiers);
    if (tier) return tier.title;
    const code = product?.platform_sub_tiers?.[0];
    return code ? code.charAt(0).toUpperCase() + code.slice(1) : null;
};

// Whether the user's subscription can claim this product right now, so buying it is pointless.
// Mirrors the backend claim checks we know about: status, tier and the monthly limit.
// The claim endpoint still has the final say (daily limit, admin changes).
export const canClaimWithSubscription = (subscription, product) => {
    if (getSubscriptionStatus(product, subscription) !== 'mine') return false;
    const period = subscription.current_period;
    return Boolean(period) && period.downloads_left > 0;
};

// Renew now is offered once 10% or less of the period's downloads are left (the backend
// rule), while the subscription hasn't expired. The endpoint still has the final say.
export const hasRenewablePeriod = (subscription) => {
    const period = subscription?.current_period;
    if (!period || !period.download_limit) return false;
    return !(subscription.ends_at && dayjs(subscription.ends_at).isBefore(dayjs()));
};

// Most downloads that may be left for renew now to open, e.g. 3 of 30, 0 below a limit of 10.
export const getRenewNowThreshold = (period) => Math.floor((period?.download_limit || 0) / 10);

export const canRenewNow = (subscription) =>
    hasRenewablePeriod(subscription) &&
    subscription.current_period.downloads_left <= getRenewNowThreshold(subscription.current_period);

export const useIsCoveredBySubscription = (product, purchased = false) => {
    const { subscription } = useMySubscription();
    return !purchased && canClaimWithSubscription(subscription, product);
};
