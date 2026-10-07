import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { TbCircleCheck, TbDownload, TbSparkles } from 'react-icons/tb';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { SUBSCRIPTION_PAGE_URL, useTiers } from '~/features/platform-subscription';
import styles from './style.module.scss';

const SOFFX_LABELS = { pro: 'Pro', ultra: 'Max' };

// Catalogue size shown in the pitch, like Envato's "29+ million assets".
// Hardcoded like the home platform stats; update it when the catalogue grows.
const CATALOGUE_SIZE = '2\u00a0mln+'; // non-breaking space keeps "2 mln+" on one line

const getOffer = (tiers) => {
    if (!tiers?.length) return null;
    const limits = tiers.map((tier) => tier.monthly_limit);
    const minLimit = Math.min(...limits);
    const maxLimit = Math.max(...limits);
    const aiTiers = tiers
        .filter((tier) => tier.soffx_plan && tier.soffx_plan !== 'none')
        .map((tier) => tier.title || SOFFX_LABELS[tier.soffx_plan]);
    return {
        price: Math.min(...tiers.map((tier) => tier.price)),
        limitText: minLimit === maxLimit ? `${maxLimit}` : `${minLimit}–${maxLimit}`,
        aiTiers,
    };
};

/**
 * Guest-only subscription pitch above the home hero (Envato style: banner + plan card).
 * SSR renders it for everyone; html[data-auth] (set in _document before paint)
 * hides it for logged-in visitors without a flash.
 */
const SubscriptionPromo = () => {
    const { isLoggedIn, status } = useSelector((state) => state.auth);
    const { data: tiers } = useTiers();
    const offer = getOffer(tiers);

    // Keep the pre-paint flag in sync once auth is resolved (expired token, login, logout).
    useEffect(() => {
        if (status === 'idle') return;
        document.documentElement.toggleAttribute('data-auth', Boolean(isLoggedIn));
    }, [isLoggedIn, status]);

    if (isLoggedIn) return null;

    return (
        <section className={styles.promo} aria-labelledby="subscription-promo-title">
            <div className={styles.banner}>
                <div className={styles.bannerText}>
                    <h2 id="subscription-promo-title" className={styles.title}>
                        <span className={styles.accent}>{CATALOGUE_SIZE} tayyor fayl</span>
                        <br />
                        va Soffia AI bir obunada
                    </h2>
                </div>
                <div className={styles.bannerArt} aria-hidden />
            </div>

            <div className={styles.card}>
                <div className={styles.priceBlock}>
                    <span className={styles.from}>Boshlab</span>
                    {offer ? (
                        <p className={styles.price}>
                            {addPeriodToThousands(offer.price)} so'm<span>/oy</span>
                        </p>
                    ) : (
                        <span className={styles.pricePlaceholder} />
                    )}
                </div>

                <ul className={styles.benefits}>
                    <li>
                        <TbDownload aria-hidden />
                        {/* Wrapped in a span: the <li> is a flex row, so bare text and
                            <strong> would otherwise become separate columns. */}
                        <span>
                            <strong>{CATALOGUE_SIZE}</strong> tayyor fayldan{' '}
                            {offer ? (
                                <>
                                    oyiga <span className={styles.nowrap}>{offer.limitText}</span> tagacha yuklab olish
                                </>
                            ) : (
                                'yuklab olish'
                            )}
                        </span>
                    </li>
                    <li>
                        <TbSparkles aria-hidden />
                        {offer?.aiTiers.length > 0
                            ? `Soffia AI: taqdimot, referat va rasm yaratish (${offer.aiTiers.join(', ')})`
                            : 'Soffia AI: taqdimot, referat va rasm yaratish'}
                    </li>
                    <li>
                        <TbCircleCheck aria-hidden />
                        Istalgan vaqtda bekor qilish
                    </li>
                </ul>

                <Link href={SUBSCRIPTION_PAGE_URL}>
                    <a className={styles.cta}>Obuna bo'lib yuklab olish</a>
                </Link>
            </div>
        </section>
    );
};

export default SubscriptionPromo;
