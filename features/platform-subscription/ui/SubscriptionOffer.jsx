import React, { useState } from 'react';
import Link from 'next/link';
import { MdCheckCircleOutline, MdExpandMore, MdOutlineWorkspacePremium } from 'react-icons/md';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { SUBSCRIPTION_PAGE_URL, useTiers } from '../model';
import ChangeTierModal from './ChangeTierModal';
import styles from './SubscriptionOffer.module.scss';

// Cheapest tier that includes the product; the cheapest tier overall when the
// response has no `platform_sub_tiers` yet.
const useOfferTier = (product) => {
    const { data: tiers } = useTiers();
    if (!tiers?.length) return null;
    const code = product?.platform_sub_tiers?.[0];
    const sorted = [...tiers].sort((a, b) => a.price - b.price);
    return (code && sorted.find((tier) => tier.code === code)) || sorted[0];
};

/**
 * Subscription offer on the detail page buy block, shown under the buy buttons.
 * variant 'subscribe': the file is in the subscription and the user has none.
 * variant 'upgrade':   the file is only in a higher tier than the user's.
 * variant 'promo':     the file isn't in the subscription (or is already bought); a general
 *                      pitch for the subscription that doesn't promise this file.
 */
const SubscriptionOffer = ({ product, variant = 'subscribe', myTierTitle, className = '' }) => {
    const { data: tiers } = useTiers();
    const isPromo = variant === 'promo';
    // Promo isn't about this file, so it starts from the cheapest tier.
    const tier = useOfferTier(isPromo ? null : product);
    const isUpgrade = variant === 'upgrade';
    const [expanded, setExpanded] = useState(false);
    const [changeOpen, setChangeOpen] = useState(false);

    // Only the upgrade case needs a note: it explains why the user's own tier isn't enough.
    const upgradeNote = isUpgrade
        ? `Bu fayl ${tier?.title || 'yuqori'} obunasida${myTierTitle ? ` — ${myTierTitle} ta'rifingizga kirmaydi` : ''}`
        : null;

    const priceBenefit = tier
        ? tier.max_document_price == null
            ? 'Narxidan qat\'i nazar barcha fayllar'
            : `${addPeriodToThousands(tier.max_document_price)} so'mgacha bo'lgan barcha fayllar`
        : null;
    const limitBenefit = tier ? `Oyiga ${tier.monthly_limit} ta fayl yuklab olish` : null;

    // Promo: the range across all tiers, since no single file decides the tier.
    const limits = (tiers ?? []).map((item) => item.monthly_limit).filter(Boolean);
    const promoBenefits = limits.length
        ? [
              Math.min(...limits) === Math.max(...limits)
                  ? `Oyiga ${Math.max(...limits)} ta fayl yuklab olish`
                  : `Oyiga ${Math.min(...limits)} tadan ${Math.max(...limits)} tagacha fayl`,
              "Turli sotuvchilarning minglab fayllari bitta obunada",
              "Pro va Max'da SoffX AI: video, rasm, taqdimot va ilmiy ishlar yaratish",
              'Olingan fayl doim sizda qoladi',
              'Istalgan vaqtda bekor qilish',
          ]
        : [];

    // Upgrade: lead with the price cap, since that is what unlocks this file.
    const benefits = isPromo
        ? promoBenefits
        : tier
        ? isUpgrade
            ? [priceBenefit, limitBenefit, 'Istalgan vaqtda bekor qilish']
            : [limitBenefit, priceBenefit, 'Istalgan vaqtda bekor qilish']
        : [];

    return (
        <section className={`${styles.offer} ${className}`} aria-label="Obuna taklifi">
            <div className={styles.divider}>
                <span>
                    {isPromo ? 'Soff obunasi' : isUpgrade ? "yoki ta'rifni oshiring" : 'yoki obuna bilan oling'}
                </span>
            </div>

            <div className={styles.box}>
                {upgradeNote && (
                    <p className={`${styles.status} ${styles.statusUpgrade}`}>
                        <MdOutlineWorkspacePremium aria-hidden />
                        {upgradeNote}
                    </p>
                )}

                {isPromo ? (
                    tier ? (
                        <h3 className={styles.title}>
                            Har oy fayllarni obuna bilan oling
                            <span className={styles.price}>
                                {addPeriodToThousands(tier.price)} so'mdan<small>/oy</small>
                            </span>
                        </h3>
                    ) : (
                        <span className={styles.titlePlaceholder} />
                    )
                ) : tier ? (
                    <h3 className={styles.title}>
                        {tier.title} obunasi
                        <span className={styles.price}>
                            {addPeriodToThousands(tier.price)} so'm<small>/oy</small>
                        </span>
                    </h3>
                ) : (
                    <span className={styles.titlePlaceholder} />
                )}

                {/* Only the strongest benefit by default, to keep the buy block short. */}
                {benefits.length > 0 && (
                    <ul className={styles.benefits} id="subscription-offer-benefits">
                        {(expanded ? benefits : benefits.slice(0, 1)).map((text) => (
                            <li key={text}>
                                <MdCheckCircleOutline aria-hidden />
                                {text}
                            </li>
                        ))}
                    </ul>
                )}
                {benefits.length > 1 && (
                    <button
                        type="button"
                        className={styles.more}
                        aria-expanded={expanded}
                        aria-controls="subscription-offer-benefits"
                        onClick={() => setExpanded((value) => !value)}>
                        {expanded ? 'Yopish' : `Yana ${benefits.length - 1} ta afzallik`}
                        <MdExpandMore aria-hidden className={expanded ? styles.moreOpen : ''} />
                    </button>
                )}

                {/* Upgrade switches in place; a new subscriber still picks a plan on the pricing page. */}
                {isUpgrade && tier ? (
                    <button type="button" className={styles.cta} onClick={() => setChangeOpen(true)}>
                        {tier.title}'ga o'tish
                    </button>
                ) : (
                    <Link href={SUBSCRIPTION_PAGE_URL}>
                        <a className={styles.cta}>{isPromo ? "Ta'riflarni ko'rish" : "Obuna bo'lib yuklab olish"}</a>
                    </Link>
                )}
            </div>

            {isUpgrade && <ChangeTierModal tier={tier} open={changeOpen} onClose={() => setChangeOpen(false)} />}
        </section>
    );
};

export default SubscriptionOffer;
