import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Modal, message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { claimDocument, getErrorCode, getErrorMessage } from '../api';
import {
    MY_SUBSCRIPTION_QUERY_KEY,
    SUBSCRIPTION_PAGE_URL,
    getSubscriptionStatus,
    useMySubscription,
} from '../model';
import SubscriptionOffer from './SubscriptionOffer';
import SubscriptionLimitReached from './SubscriptionLimitReached';
import ClaimSuccessModal from './ClaimSuccessModal';
import styles from './SubscriptionClaim.module.scss';

/**
 * Subscription part of the detail page buy block (guide §4).
 * Renders nothing when the document is purchased or not in the subscription.
 */
const ClaimBody = ({ product, purchased, className = '', onSuccess }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { subscription, isLoggedIn, isLoading } = useMySubscription();
    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(false);
    const status = getSubscriptionStatus(product, subscription);

    if (isLoggedIn && isLoading) return null;
    if (hidden) return null;

    // Every product page pitches the subscription to users without one (active or cancelled).
    const hasUsableSubscription = ['active', 'cancelled'].includes(subscription?.status);
    if (purchased || status === 'none') {
        return hasUsableSubscription ? null : (
            <SubscriptionOffer product={product} variant="promo" className={className} />
        );
    }

    if (status === 'subscribe') {
        return <SubscriptionOffer product={product} className={className} />;
    }

    // Only a more expensive tier includes this file: the user buys it or upgrades.
    if (status === 'higher') {
        return (
            <SubscriptionOffer
                product={product}
                variant="upgrade"
                myTierTitle={subscription.tier?.title}
                className={className}
            />
        );
    }

    const downloadsLeft = subscription.current_period?.downloads_left;

    // Monthly limit used up: the user buys the file instead, so only point to an upgrade.
    if (downloadsLeft === 0) {
        return <SubscriptionLimitReached subscription={subscription} className={className} />;
    }

    const goToPricing = () => router.push(SUBSCRIPTION_PAGE_URL);

    const suggestUpgrade = (title, content) =>
        Modal.confirm({
            centered: true,
            title,
            content,
            okText: "Ta'riflarni ko'rish",
            cancelText: 'Yopish',
            onOk: goToPricing,
        });

    const updateDownloadsLeft = (left) => {
        if (left == null) return;
        queryClient.setQueryData(MY_SUBSCRIPTION_QUERY_KEY, (prev) =>
            prev?.current_period
                ? {
                      ...prev,
                      current_period: {
                          ...prev.current_period,
                          downloads_left: left,
                          downloads_used: prev.current_period.download_limit - left,
                      },
                  }
                : prev
        );
    };

    const handleError = (err) => {
        const code = getErrorCode(err);
        const msg = getErrorMessage(err);
        switch (code) {
            case 'no_subscription':
                goToPricing();
                break;
            case 'not_in_subscription':
                message.warning('Bu fayl obunaga kirmaydi');
                setHidden(true);
                break;
            case 'own_document':
                message.info(msg);
                setHidden(true);
                break;
            case 'tier_too_low':
                suggestUpgrade("Ta'rifingiz bu fayl uchun yetarli emas", msg);
                break;
            case 'monthly_limit':
                suggestUpgrade('Bu oy limiti tugadi', "Ko'proq fayl olish uchun ta'rifni oshiring.");
                break;
            case 'daily_limit':
                message.warning('Ertaga yana olishingiz mumkin');
                break;
            default:
                message.error(msg);
        }
    };

    const handleClaim = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const data = await claimDocument(product.id);
            updateDownloadsLeft(data.downloads_left);
            queryClient.invalidateQueries({ queryKey: ['platform-sub-claims'] });
            // Reload the SSR props: the detail now returns the files for the claimed document.
            await router.replace(router.asPath, undefined, { scroll: false });
            if (data.file_url) {
                onSuccess({ ...data, title: product.title });
            } else {
                message.success(data.claimed ? 'Fayl obuna orqali olindi' : 'Bu fayl allaqachon sizda');
            }
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            type="primary"
            size="large"
            block
            loading={loading}
            disabled={loading}
            icon={<MdOutlineWorkspacePremium size={22} />}
            className={`${styles.claimBtn} ${className}`}
            onClick={handleClaim}>
            Obuna orqali olish{downloadsLeft != null ? ` (qoldi: ${downloadsLeft})` : ''}
        </Button>
    );
};

// The success modal lives outside ClaimBody: after a claim the page reloads with the
// file purchased, ClaimBody renders nothing, and the modal must stay open.
const SubscriptionClaim = (props) => {
    const [result, setResult] = useState(null);
    return (
        <>
            <ClaimBody {...props} onSuccess={setResult} />
            <ClaimSuccessModal result={result} onClose={() => setResult(null)} />
        </>
    );
};

// Whether the claim button is the primary action, so the buy button can step back.
export const useIsClaimPrimary = (product, purchased) => {
    const { subscription } = useMySubscription();
    const left = subscription?.current_period?.downloads_left;
    return Boolean(!purchased && getSubscriptionStatus(product, subscription) === 'mine' && left !== 0);
};

export default SubscriptionClaim;
