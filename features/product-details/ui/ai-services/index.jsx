import React from 'react';
import { TbArrowRight, TbFileText, TbPhoto, TbPresentation, TbSchool, TbSparkles, TbVideo } from 'react-icons/tb';
import styles from './style.module.scss';

// SoffX AI's catalogue, in another app under /labs: plain links, a full page load.
const SERVICES_URL = '/labs/services';

const SERVICES = [
    { label: 'Taqdimot', icon: TbPresentation },
    { label: 'Referat', icon: TbFileText },
    { label: 'Kurs ishi', icon: TbSchool },
    { label: 'AI rasm', icon: TbPhoto },
    { label: 'AI video', icon: TbVideo },
];

/**
 * Under any product's details: the same kind of work, made with Soff AI instead of bought.
 * Everything goes to the SoffX services page, where each service opens its studio.
 */
const AiServices = () => (
    <section className={styles.section} aria-labelledby="product-ai-services-title">
        <div className={styles.lead}>
            <span className={styles.mark} aria-hidden>
                <TbSparkles />
            </span>
            <div>
                <h3 id="product-ai-services-title" className={styles.title}>
                    Kerakli ishni AI bilan o'zingiz yarating
                </h3>
                <p className={styles.text}>Taqdimot, referat, kurs ishi, rasm va video — Soff AI'da bir necha daqiqada.</p>
            </div>
        </div>

        <ul className={styles.chips}>
            {SERVICES.map(({ label, icon: Icon }) => (
                <li key={label}>
                    <a href={SERVICES_URL} className={styles.chip}>
                        <Icon aria-hidden />
                        {label}
                    </a>
                </li>
            ))}
        </ul>

        <a href={SERVICES_URL} className={styles.cta}>
            AI xizmatlarni ko'rish
            <TbArrowRight aria-hidden />
        </a>
    </section>
);

/**
 * Banner above a product's title: prompts creating with AI in 2 minutes.
 * Styled to match the 2-minute creation dark banner with gold accents.
 */
export const AiServicesCta = ({
    dark = false,
    title = 'AI yordamida 2 daqiqada yarating',
    subtitle,
    lead,
    ctaText = 'Boshlash',
}) => {
    const computedSubtitle =
        subtitle ||
        (lead && !lead.includes('tayyorlang')
            ? `Kerakli ${lead.toLowerCase()} Soffia AI yordamida tayyorlang — tez, qulay va samarali.`
            : 'Kerakli hujjatni Soffia AI yordamida tayyorlang — tez, qulay va samarali.');

    return (
        <a
            href={SERVICES_URL}
            className={`${styles.topBanner} ${dark ? styles.topBannerDark : ''}`}
            aria-label={title}
        >
            <div className={styles.topBannerLeft}>
                <span className={styles.topBannerIcon} aria-hidden>
                    <TbSparkles />
                </span>
                <div className={styles.topBannerText}>
                    <h3 className={styles.topBannerTitle}>{title}</h3>
                    <p className={styles.topBannerSubtitle}>{computedSubtitle}</p>
                </div>
            </div>
            <div className={styles.topBannerButton}>
                <span>{ctaText}</span>
                <TbArrowRight aria-hidden />
            </div>
        </a>
    );
};

export default AiServices;
