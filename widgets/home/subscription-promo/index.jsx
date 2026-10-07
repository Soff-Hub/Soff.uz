import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { TbCircleCheck, TbDownload, TbFiles, TbSparkles } from 'react-icons/tb';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { SUBSCRIPTION_PAGE_URL, useTiers } from '~/features/platform-subscription';
import styles from './style.module.scss';

const SOFFX_LABELS = { pro: 'Pro', ultra: 'Max' };

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
                    <p className={styles.lead}>Talabalar va o'qituvchilar uchun</p>
                    <h2 id="subscription-promo-title" className={styles.title}>
                        Bitta obuna — <span className={styles.accent}>minglab</span> tayyor fayllar
                    </h2>
                    <p className={styles.sub}>
                        Referat, kurs ishi, taqdimot va shablonlarni har safar alohida sotib olmang.
                    </p>
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
                        {offer ? `Oyiga ${offer.limitText} tagacha fayl yuklab olish` : 'Har oy yangi fayllar yuklab olish'}
                    </li>
                    <li>
                        <TbFiles aria-hidden />
                        Referat, kurs ishi, taqdimot va boshqalar
                    </li>
                    {offer?.aiTiers.length > 0 && (
                        <li>
                            <TbSparkles aria-hidden />
                            SoffX AI — {offer.aiTiers.join(' va ')} ta'riflarda
                        </li>
                    )}
                    <li>
                        <TbCircleCheck aria-hidden />
                        Istalgan vaqtda bekor qilish
                    </li>
                </ul>

                <Link href={SUBSCRIPTION_PAGE_URL}>
                    <a className={styles.cta}>Obuna bo'lish</a>
                </Link>
                <p className={styles.signIn}>
                    Akkauntingiz bormi?{' '}
                    <Link href="/auth/login">
                        <a>Kirish</a>
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default SubscriptionPromo;
