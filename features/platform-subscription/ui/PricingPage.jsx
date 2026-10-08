import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Skeleton, message } from 'antd';
import { FaCheck } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import AuthModal from '~/features/auth/ui/auth-modal';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { changeTier, getErrorMessage } from '../api';
import {
    MY_SUBSCRIPTION_URL,
    SOFFX_PLAN_LABELS,
    useMySubscription,
    useRefreshMySubscription,
    useTiers,
} from '../model';
import ChangeTierModal from './ChangeTierModal';
import CheckoutModal from './CheckoutModal';
import styles from './PricingPage.module.scss';

const TierFeatures = ({ tier }) => (
    <ul className={styles.features}>
        <li>
            <FaCheck /> Oyiga {tier.monthly_limit} ta fayl
        </li>
        {tier.daily_limit > 0 && (
            <li>
                <FaCheck /> Kuniga {tier.daily_limit} ta
            </li>
        )}
        <li>
            <FaCheck />
            {tier.max_document_price == null
                ? 'Barcha fayllar'
                : `${addPeriodToThousands(tier.max_document_price)} so'mgacha bo'lgan fayllar`}
        </li>
        <li>
            <FaCheck /> Olingan fayl doim sizda qoladi
        </li>
    </ul>
);

const PricingPage = () => {
    const { data: tiers = [], isLoading, isError, refetch } = useTiers();
    const { subscription, isLoggedIn, isLoading: isSubLoading } = useMySubscription();
    const refreshMySubscription = useRefreshMySubscription();
    const [checkoutTier, setCheckoutTier] = useState(null);
    const [authTier, setAuthTier] = useState(null);
    const [changingTier, setChangingTier] = useState(null);
    const [targetTier, setTargetTier] = useState(null);

    const currentTierId = subscription?.tier?.id;
    const scheduledTierId = subscription?.scheduled_tier?.id;

    const handleSubscribe = (tier) => {
        if (!isLoggedIn) {
            setAuthTier(tier);
            return;
        }
        setCheckoutTier(tier);
    };

    const submitChangeTier = async (tier, successText) => {
        setChangingTier(tier.id);
        try {
            await changeTier(tier.id);
            await refreshMySubscription();
            message.success(successText);
        } catch (err) {
            message.error(getErrorMessage(err));
        } finally {
            setChangingTier(null);
        }
    };

    // Sending the current tier clears the scheduled change.
    const handleCancelChange = () =>
        submitChangeTier(subscription.tier, "Ta'rif o'zgarishi bekor qilindi");

    const renderAction = (tier) => {
        if (isLoggedIn && isSubLoading) return <Button size="large" block loading />;

        if (!subscription) {
            return (
                <Button type="primary" size="large" block className={styles.primaryBtn} onClick={() => handleSubscribe(tier)}>
                    Obuna bo'lish
                </Button>
            );
        }

        if (tier.id === currentTierId) {
            return (
                <Link href={MY_SUBSCRIPTION_URL}>
                    <a className={styles.currentLink}>Obunani boshqarish</a>
                </Link>
            );
        }

        if (tier.id === scheduledTierId) {
            return (
                <Button size="large" block loading={changingTier === currentTierId} onClick={handleCancelChange}>
                    O'tishni bekor qilish
                </Button>
            );
        }

        // Any other tier opens the modal: it offers "Hozir o'tish" (upgrade/) for a higher
        // tier and "Keyingi oydan" (change-tier/) for both.
        return (
            <Button size="large" block onClick={() => setTargetTier(tier)}>
                {tier.price > (subscription.tier?.price || 0) ? `${tier.title}'ga o'tish` : "Keyingi oydan o'tish"}
            </Button>
        );
    };

    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <h1>Obuna</h1>
                <p>
                    Bitta oylik obuna — butun sayt bo'ylab. Har oy belgilangan miqdordagi fayllarni oling, olingan
                    fayl esa doim sizda qoladi.
                </p>
            </div>

            {isError && (
                <div className={styles.error}>
                    <p>Ta'riflarni yuklab bo'lmadi.</p>
                    <Button onClick={() => refetch()}>Qayta urinish</Button>
                </div>
            )}

            <div className={styles.grid}>
                {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                          <div className={styles.card} key={i}>
                              <Skeleton active paragraph={{ rows: 6 }} />
                          </div>
                      ))
                    : tiers.map((tier) => {
                          const isCurrent = tier.id === currentTierId;
                          const isScheduled = tier.id === scheduledTierId;
                          return (
                              <div className={`${styles.card} ${isCurrent ? styles.cardCurrent : ''}`} key={tier.id}>
                                  <div className={styles.cardHead}>
                                      <h2>{tier.title}</h2>
                                      {isCurrent && <span className={styles.currentBadge}>Joriy ta'rif</span>}
                                      {isScheduled && <span className={styles.scheduledBadge}>Keyingi oydan</span>}
                                  </div>
                                  {tier.description && <p className={styles.description}>{tier.description}</p>}
                                  <div className={styles.price}>
                                      <strong>{addPeriodToThousands(tier.price)}</strong> so'm / oy
                                  </div>
                                  {SOFFX_PLAN_LABELS[tier.soffx_plan] && (
                                      <div className={styles.aiBadge}>
                                          <HiSparkles /> {SOFFX_PLAN_LABELS[tier.soffx_plan]}
                                      </div>
                                  )}
                                  <TierFeatures tier={tier} />
                                  <div className={styles.action}>{renderAction(tier)}</div>
                              </div>
                          );
                      })}
            </div>

            <ChangeTierModal tier={targetTier} open={Boolean(targetTier)} onClose={() => setTargetTier(null)} />

            <CheckoutModal open={Boolean(checkoutTier)} tier={checkoutTier} onClose={() => setCheckoutTier(null)} />

            <AuthModal
                open={Boolean(authTier)}
                onClose={() => setAuthTier(null)}
                onGoogleSuccessNavigateTo="/subscription"
                onSuccess={() => {
                    setCheckoutTier(authTier);
                    setAuthTier(null);
                }}
            />
        </div>
    );
};

export default PricingPage;
