import React from 'react';
import Link from 'next/link';
import { MdCheckCircleOutline, MdOutlineWorkspacePremium } from 'react-icons/md';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { SUBSCRIPTION_PAGE_URL, useTiers } from '../model';
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
 * variant 'subscribe': the user has no subscription.
 * variant 'upgrade':   the file is only in a higher tier than the user's.
 */
const SubscriptionOffer = ({ product, variant = 'subscribe', myTierTitle, className = '' }) => {
    const tier = useOfferTier(product);
    const isUpgrade = variant === 'upgrade';

    const title = isUpgrade
        ? `Bu fayl ${tier?.title || 'yuqori'} obunada`
        : 'Obuna bilan oling';

    const benefits = tier
        ? [
              isUpgrade && myTierTitle
                  ? `${myTierTitle} ta'rifingizga kirmaydi`
                  : 'Shu fayl ham obunaga kiradi',
              `Oyiga ${tier.monthly_limit} tagacha fayl`,
              tier.max_document_price == null
                  ? 'Barcha fayllar'
                  : `${addPeriodToThousands(tier.max_document_price)} so'mgacha bo'lgan fayllar`,
              'Istalgan vaqtda bekor qilish',
          ]
        : [];

    return (
        <section className={`${styles.offer} ${className}`} aria-label={title}>
            <div className={styles.divider}>
                <span>yoki</span>
            </div>

            <div className={styles.head}>
                <MdOutlineWorkspacePremium className={styles.icon} aria-hidden />
                <div>
                    <h3 className={styles.title}>{title}</h3>
                    {tier && (
                        <p className={styles.price}>
                            {tier.title} ta'rifi — <strong>oyiga {addPeriodToThousands(tier.price)} so'm</strong>
                        </p>
                    )}
                </div>
            </div>

            {benefits.length > 0 && (
                <ul className={styles.benefits}>
                    {benefits.map((text) => (
                        <li key={text}>
                            <MdCheckCircleOutline aria-hidden />
                            {text}
                        </li>
                    ))}
                </ul>
            )}

            <Link href={SUBSCRIPTION_PAGE_URL}>
                <a className={styles.cta}>{isUpgrade ? "Ta'rifni oshirish" : "Obuna bo'lish"}</a>
            </Link>
        </section>
    );
};

export default SubscriptionOffer;
