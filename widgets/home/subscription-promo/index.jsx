import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { TbCircleCheck, TbDownload, TbFiles, TbSparkles } from 'react-icons/tb';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { SUBSCRIPTION_PAGE_URL, useTiers } from '~/features/platform-subscription';
import styles from './style.module.scss';

// Catalogue size shown in the pitch, like Envato's "29+ million assets".
// Hardcoded like the home platform stats; update it when the catalogue grows.
const CATALOGUE_SIZE = '2\u00a0mln+'; // non-breaking space keeps "2 mln+" on one line

const FEATURED_TIER_CODE = 'pro';
const SOFFX_PLAN_TITLES = { pro: 'Pro', ultra: 'Max' };

// "SoffX AI" with the X picked out in the AI accent colour.
const SoffX = () => (
    <span className={styles.soffx}>
        Soff<span className={styles.soffxMark}>x</span> AI
    </span>
);

// The card features the Pro tier ("Ommabop"); falls back to the cheapest tier if
// there is no Pro. The cheapest price is kept for the "other plans" link.
const getOffer = (tiers) => {
    if (!tiers?.length) return null;
    const sorted = [...tiers].sort((a, b) => a.price - b.price);
    const featured = sorted.find((tier) => tier.code === FEATURED_TIER_CODE) || sorted[0];
    return { tier: featured, isFeatured: featured.code === FEATURED_TIER_CODE, minPrice: sorted[0].price };
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
                        <span className={styles.accent}>{CATALOGUE_SIZE} tayyor fayllar</span>
                        <br />
                        va <SoffX /> bir obunada
                    </h2>
                </div>
                <div className={styles.bannerArt} aria-hidden />
            </div>

            <div className={styles.card}>
                <div className={styles.priceBlock}>
                    {offer ? (
                        <>
                            <div className={styles.tierRow}>
                                <span className={styles.tierName}>{offer.tier.title} ta'rifi</span>
                                {offer.isFeatured && <span className={styles.popular}>Ommabop</span>}
                            </div>
                            <p className={styles.price}>
                                {addPeriodToThousands(offer.tier.price)} <span>so'm/oy</span>
                            </p>
                        </>
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
                            {offer ? `oyiga ${offer.tier.monthly_limit} tagacha yuklab olish` : 'yuklab olish'}
                        </span>
                    </li>
                    {offer && (
                        <li>
                            <TbFiles aria-hidden />
                            {offer.tier.max_document_price == null
                                ? 'Barcha fayllar, narxidan qat\'i nazar'
                                : `${addPeriodToThousands(offer.tier.max_document_price)} so'mgacha bo'lgan fayllar`}
                        </li>
                    )}
                    {(!offer || offer.tier.soffx_plan !== 'none') && (
                        <li>
                            <TbSparkles aria-hidden />
                            <span>
                                <SoffX />
                                {offer && SOFFX_PLAN_TITLES[offer.tier.soffx_plan]
                                    ? ` ${SOFFX_PLAN_TITLES[offer.tier.soffx_plan]}`
                                    : ''}
                                : matndan <strong>video</strong>, rasm, taqdimot va referat yaratish
                            </span>
                        </li>
                    )}
                    <li>
                        <TbCircleCheck aria-hidden />
                        Istalgan vaqtda bekor qilish
                    </li>
                </ul>

                <Link href={SUBSCRIPTION_PAGE_URL}>
                    <a className={styles.cta}>
                        {offer?.isFeatured ? `${offer.tier.title} obunani olish` : "Obuna bo'lib yuklab olish"}
                    </a>
                </Link>
                {offer && offer.minPrice < offer.tier.price && (
                    <Link href={SUBSCRIPTION_PAGE_URL}>
                        <a className={styles.otherPlans}>
                            Boshqa ta'riflar — {addPeriodToThousands(offer.minPrice)} so'mdan
                        </a>
                    </Link>
                )}
            </div>
        </section>
    );
};

export default SubscriptionPromo;
