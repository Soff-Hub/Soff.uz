import React from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import useResponsive from '~/shared/utilities/useResponsive';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const footerMenu = {
    soff: {
        logoImg: '/static/img/soff.svg',
        title: 'Raqamli xizmatlar bozori!',
        path: '#',
    },
    services: {
        title: 'Aloqa',
        links: [
            { name: 'Sotib olish va moderatsiya bo‘yicha', link: '' },
            { name: '+998 (91) 008 67 89', link: 'tel:+998910086789' },
            { name: '@soff_moderator', link: 'https://t.me/soff_moderator' },
            { name: 'Texnik muammolar uchun', link: 'tel:+998910086789' },
            { name: '@hr_soffhub', link: 'https://t.me/hr_soffhub' },
        ],
    },
    social: {
        title: 'Ijtimoiy tarmoqlarimiz',
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
};

const products = [
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
        label: 'Ilmiy ishlar',
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
        label: '3D Dizayn va Vizualizatsiya',
    },
    {
        key: '3',
        link: '/design-developments/all?slug=all',
        label: 'Dizayn shablonlari',
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
        label: 'Turli sohalar uchun shablonlar',
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
        link: '/video-lessons',
        label: 'Video darsliklar',
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
        label: 'Dasturlash xizmatlari',
    },
];

const mainPages = [
    { key: '1', link: '/', label: 'Bosh sahifa' },
    { key: '2', link: '/search-page', label: 'Qidiruv' },
    { key: '3', link: '/orders', label: 'Barcha xizmatlar' },
    { key: '4', link: '/order/create', label: 'Yangi buyurtma yaratish' },
    {
        key: '5',
        link: '/scientific-resources/all?slug=all',
        label: 'Mahsulotlar',
    },
    { key: '6', link: 'https://seller.soff.uz', label: 'Frilanserlar uchun' },
    { key: '7', link: '/affiliate_program', label: 'Hamkorlikda ishlash' },
    { key: '4', link: '/freelancers', label: 'Frilanserlar' },
    { key: '8', link: '/soffia', label: 'Soffia Bot' },
    { key: '9', link: '/page/oferta', label: 'Foydalanish shartlari' },
    { key: '10', link: '/page/video-list', label: "Video qo'llanmalar" },
];

const aboutUsPages = [
    { key: '1', link: '/page/about-us', label: 'Biz haqimizda' },
    { key: '3', link: '/page/faq', label: 'Savollar (FAQ)' },
    { key: '4', link: '/page/form', label: 'Talab va takliflar uchun' },
    { key: '5', link: '/page/oferta', label: 'Oferta' },
];

const FooterCollapse = ({ title, children, defaultOpen = false }) => {
    const { isMobile } = useResponsive();

    if (!isMobile) {
        return (
            <div className={styles.sectionMargin}>
                <h5 className={styles.sectionTitle}>{title}</h5>
                {children}
            </div>
        );
    }

    return (
        <Collapse
            ghost
            expandIconPosition="end"
            className={styles.mobileCollapse}
            defaultActiveKey={defaultOpen ? ['1'] : []}
        >
            <Panel
                header={
                    <h5 className={styles.sectionTitle} style={{ margin: 0, fontSize: '18px' }}>
                        {title}
                    </h5>
                }
                key="1"
            >
                {children}
            </Panel>
        </Collapse>
    );
};

export default function Footer() {
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    const { data: directions } = useGetDirectionsQuery();

    const isCheckoutMode = ['/account/checkout', '/account/shopping-cart'].includes(router.pathname);

    if (isCheckoutMode) {
        return null;
    }

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
                            Tayyor mahsulotlar va xizmatlar bir joyda
                        </a>

                        <div className={styles.socialIconsContainer}>
                            {footerMenu.social.items.map((item, index) => (
                                <div
                                    key={item.url}
                                    className={`${styles.socialIcon} ${index === 1
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
                        <FooterCollapse title={footerMenu.services.title} defaultOpen={true}>
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
                        </FooterCollapse>
                    </div>
                    <div className={styles.footerLinksSection}>
                        <FooterCollapse title="Tayyor mahsulotlar">
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
                        </FooterCollapse>
                        <FooterCollapse title="Xizmat turlari">
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
                        </FooterCollapse>
                        <FooterCollapse title="Asosiy sahifalar">
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
                        </FooterCollapse>
                        <FooterCollapse title="Biz haqimizda">
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
                        </FooterCollapse>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <Link href="/page/oferta">
                        <a>
                            © {currentYear} Soff.uz — Barcha huquqlar
                            himoyalangan.{' '}
                        </a>
                    </Link>

                    <div className={styles.footerLinks}>
                        <Link href="/page/privacy-policy">
                            <a aria-label="Maxfiylik siyosati">
                                Maxfiylik siyosati
                            </a>
                        </Link>
                        <div className={styles.divider}></div>
                        <Link href="/page/user-agreement">
                            <a aria-label="Foydalanish shartnomasi">
                                Foydalanish shartnomasi
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
