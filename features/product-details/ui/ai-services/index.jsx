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
 * The short version, above a product's title: one line and one link to the same page.
 * `dark` is for the video lesson hero; `lead` replaces the wording before the product name.
 */
export const AiServicesCta = ({ dark = false, lead = "Shunga o'xshash ishni" }) => (
    <a href={SERVICES_URL} className={`${styles.topCta} ${dark ? styles.topCtaDark : ''}`}>
        <span className={styles.topMark} aria-hidden>
            <TbSparkles />
        </span>
        <span className={styles.topText}>
            {lead} <strong>Soff AI</strong> bilan o'zingiz yarating
        </span>
        <span className={styles.topTextShort}>
            <strong>Soff AI</strong> bilan yarating
        </span>
        <span className={styles.topLink}>
            AI xizmatlar
            <TbArrowRight aria-hidden />
        </span>
    </a>
);

export default AiServices;
