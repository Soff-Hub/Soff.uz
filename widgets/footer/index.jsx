import React from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import { useTranslation } from 'react-i18next';

const getFooterMenu = (t) => ({
    soff: {
        logoImg: '/static/img/soff.svg',
        title: t('digitalMarketplace'),
        path: '#',
    },
    services: {
        title: t('contact'),
        links: [
            { name: t('purchaseAndModeration'), link: '' },
            { name: '+998 (91) 008 67 89', link: 'tel:+998910086789' },
            { name: '@soff_moderator', link: 'https://t.me/soff_moderator' },
            { name: t('technicalIssues'), link: 'tel:+998910086789' },
            { name: '@hr_soffhub', link: 'https://t.me/hr_soffhub' },
        ],
    },
    social: {
        title: t('socialNetworks'),
        items: [
            {
                name: 'Telegram',
                icon: '/static/svg/telegram_.svg',
                url: 'https://t.me/+y5GpvEz48_hkMzli',
            },
            {
                name: 'YouTube',
                icon: '/static/img/you_tube.png',
                url: 'https://www.youtube.com/@soffuz',
            },
            {
                name: 'Instagram',
                icon: '/static/img/insta.png',
                url: 'https://www.instagram.com/soff.uz.market/',
            },
        ],
    },
});

const getProducts = (t) => [
    {
        key: '1',

        icon: (
            <Image
                src={'/static/svg/book-saved.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
        link: '/scientific-resources/all?slug=all',
        label: t('scientificWorks'),
    },
    {
        key: '2',
        icon: (
            <Image
                src={'/static/svg/3dcube.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
        link: '/3d-models-and-interior-designs/all?slug=all',
        label: t('design3D'),
    },
    {
        key: '3',
        link: '/design-developments/all?slug=all',
        label: t('designTemplates'),
        icon: (
            <Image
                src={'/static/svg/image.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
    },
    {
        key: '4',
        icon: (
            <Image
                src={'/static/svg/chart.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
        link: '/templates/all?slug=all',
        label: t('templatesForVariousFields'),
    },
    {
        key: '5',
        icon: (
            <Image
                src={'/static/svg/video-square.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
        link: '/video-lessons/all?slug=all',
        label: t('videoLessons'),
    },
    {
        key: '6',
        icon: (
            <Image
                src={'/static/svg/monitor.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
        link: '/websites/all?slug=all',
        label: t('programmingServices'),
    },
];

const getMainPages = (t) => [
    { key: '1', link: '/', label: t('homePage') },
    { key: '2', link: '/search-page', label: t('search') },
    { key: '3', link: '/orders', label: t('allServices') },
    { key: '4', link: '/order/create', label: t('createNewOrder') },
    {
        key: '5',
        link: '/scientific-resources/all?slug=all',
        label: t('products'),
    },
    { key: '6', link: 'https://seller.soff.uz', label: t('forFreelancers') },
    { key: '7', link: '/affiliate_program', label: t('affiliateProgram') },
    { key: '4', link: '/freelancers', label: t('freelancers') },
    { key: '8', link: '/soffia', label: t('soffiaBot') },
    { key: '9', link: '/page/oferta', label: t('termsOfUse') },
    { key: '10', link: '/page/video-list', label: t('videoTutorials') },
];

const getAboutUsPages = (t) => [
    { key: '1', link: '/page/about-us', label: t('aboutUs') },
    { key: '3', link: '/page/faq', label: t('faq') },
    { key: '4', link: '/page/form', label: t('requestsAndSuggestions') },
    { key: '5', link: '/page/oferta', label: t('offer') },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { data: directions } = useGetDirectionsQuery();
    const { t } = useTranslation('footer');

    const footerMenu = getFooterMenu(t);
    const products = getProducts(t);
    const mainPages = getMainPages(t);
    const aboutUsPages = getAboutUsPages(t);

    return (
        <footer className={styles.mainblock}>
            <div className={'container'}>
                <div className={styles.footerContent}>
                    <div className={styles.footerLogoSection}>
                        <img
                            src={`/static/img/soff_green.png`}
                            alt="soff logo"
                            className={styles.footerLogo}
                        />
                        <a
                            href={footerMenu.soff.path}
                            className={`${styles.footerMainTitle} ${styles.footerSubtitle}`}>
                            {t('readyProductsAndServices')}
                        </a>

                        <div className={styles.socialIconsContainer}>
                            {footerMenu.social.items.map((item, index) => (
                                <div
                                    key={item.url}
                                    className={`${styles.socialIcon} ${
                                        index === 1
                                            ? styles.socialIconLarge
                                            : ''
                                    }`}>
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer">
                                        <img src={item.icon} alt={item.name} />
                                    </a>
                                </div>
                            ))}
                        </div>
                        {/* Xizmatlar (Aloqa) */}
                        <div className={styles.sectionMargin}>
                            <h5 className={styles.sectionTitle}>
                                {footerMenu.services.title}
                            </h5>
                            <ul>
                                {footerMenu.services.links.map((link, i) =>
                                    link.link ? (
                                        <li key={link.link + i}>
                                            <Link href={link.link}>
                                                <a
                                                    target="_blank"
                                                    className={styles.linkText}
                                                    aria-label={link.name}
                                                    rel="noopener noreferrer">
                                                    {link.name}
                                                </a>
                                            </Link>
                                        </li>
                                    ) : (
                                        <li key={i} className={styles.linkText}>
                                            {link.name}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.footerLinksSection}>
                        <div>
                            <h5 className={styles.sectionTitle}>
                                {t('readyProducts')}
                            </h5>
                            <ul>
                                {products.map((link) => (
                                    <li key={link.key}>
                                        <Link href={link.link}>
                                            <a
                                                className={styles.linkText}
                                                aria-label={link.label}
                                                rel="noopener noreferrer">
                                                {link.label}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5 className={styles.sectionTitle}>
                                {t('serviceTypes')}
                            </h5>
                            <ul>
                                {directions?.map((link) => (
                                    <li key={link.value}>
                                        <Link
                                            href={`/orders?direction=${link.value}`}>
                                            <a
                                                className={styles.linkText}
                                                aria-label={link.label}
                                                rel="noopener noreferrer">
                                                {link.label}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5 className={styles.sectionTitle}>
                                {t('mainPages')}
                            </h5>
                            <ul>
                                {mainPages.map((link) => (
                                    <li key={link.key}>
                                        <Link href={link.link}>
                                            <a
                                                className={styles.linkText}
                                                aria-label={link.label}
                                                rel="noopener noreferrer">
                                                {link.label}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5 className={styles.sectionTitle}>
                                {t('aboutUs')}
                            </h5>
                            <ul>
                                {aboutUsPages.map((link) => (
                                    <li key={link.value}>
                                        <Link href={`${link.link}`}>
                                            <a
                                                className={styles.linkText}
                                                aria-label={link.label}
                                                rel="noopener noreferrer">
                                                {link.label}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <Link href="/page/oferta">
                        <a>
                            © {currentYear} Soff.uz — {t('allRightsReserved')}{' '}
                        </a>
                    </Link>

                    <div className={styles.footerLinks}>
                        <Link href="/page/privacy-policy">
                            <a aria-label={t('privacyPolicy')}>
                                {t('privacyPolicy')}
                            </a>
                        </Link>
                        <div className={styles.divider}></div>
                        <Link href="/page/user-agreement">
                            <a aria-label={t('userAgreement')}>
                                {t('userAgreement')}
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
