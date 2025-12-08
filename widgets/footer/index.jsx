import React from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useGetDirectionsQuery } from '~/store/profile/slice';

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
        link: '/video-lessons/all?slug=all',
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
    // { key: '4', link: '/freelance', label: 'Frilanserlar' },
    { key: '8', link: '/soffia', label: 'Soffia Bot' },
    { key: '9', link: '/page/oferta', label: 'Foydalanish shartlari' },
    { key: '10', link: '/page/video-list', lable: "Video qo'llanmalar" },
];

const aboutUsPages = [
    { key: '1', link: '/page/about-us', label: 'Biz haqimizda' },
    { key: '3', link: '/page/faq', label: 'Savollar (FAQ)' },
    { key: '4', link: '/page/form', label: 'Talab va takliflar uchun' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { data: directions } = useGetDirectionsQuery();

    return (
        <footer className={styles.mainblock}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerLogoSection}>
                        <img
                            src={`/static/img/soff_green.png`}
                            alt="soff logo"
                            style={{ width: '200px', height: 'auto' }}
                        />
                        <a
                            href={footerMenu.soff.path}
                            className={styles.footerMainTitle}
                            style={{
                                fontSize: '20px',
                                marginTop: '24px',
                                marginBottom: 0,
                            }}>
                            Tayyor mahsulotlar va xizmatlar bir joyda
                        </a>

                        <div
                            style={{
                                display: 'flex',
                                gap: '16px',
                                alignItems: 'center',
                                marginTop: '16px',
                            }}>
                            {footerMenu.social.items.map((item, index) => (
                                <div
                                    key={item.url}
                                    style={{
                                        width: index === 1 ? '42px' : '40px',
                                    }}
                                    className={styles.socialIcon}>
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
                        <div className="mt-5">
                            <h5 className="fw-semibold fs-2 text-white">
                                {footerMenu.services.title}
                            </h5>
                            <ul>
                                {footerMenu.services.links.map((link, i) =>
                                    link.link ? (
                                        <li key={link.link + i}>
                                            <Link href={link.link}>
                                                <a
                                                    target="_blank"
                                                    className="fs-4"
                                                    rel="noopener noreferrer">
                                                    {link.name}
                                                </a>
                                            </Link>
                                        </li>
                                    ) : (
                                        <li key={i} className="fs-4">
                                            {link.name}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.footerLinksSection}>
                        <div>
                            <h5 className="fw-semibold fs-2 text-white">
                                Tayyor mahsulotlar
                            </h5>
                            <ul>
                                {products.map((link) => (
                                    <li key={link.key}>
                                        <Link href={link.link}>
                                            <a
                                                className="fs-4"
                                                rel="noopener noreferrer">
                                                {link.label}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5 className="fw-semibold fs-2 text-white">
                                Xizmat turlari
                            </h5>
                            <ul>
                                {directions?.map((link) => (
                                    <li key={link.value}>
                                        <Link
                                            href={`/orders?direction=${link.value}`}>
                                            <a
                                                className="fs-4"
                                                rel="noopener noreferrer">
                                                {link.label}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5 className="fw-semibold fs-2 text-white">
                                Asosiy sahifalar
                            </h5>
                            <ul>
                                {mainPages.map((link) => (
                                    <li key={link.key}>
                                        <Link href={link.link}>
                                            <a
                                                className="fs-4"
                                                rel="noopener noreferrer">
                                                {link.label}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5 className="fw-semibold fs-2 text-white">
                                Biz haqimizda
                            </h5>
                            <ul>
                                {aboutUsPages.map((link) => (
                                    <li key={link.value}>
                                        <Link href={`${link.link}`}>
                                            <a
                                                className="fs-4"
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
                <div className="d-flex gap-4 justify-content-between mt-5 border-top pt-4 flex-wrap">
                    <span>
                        © {currentYear} Soff.uz — Barcha huquqlar himoyalangan.
                    </span>

                    <Link href="/page/oferta">
                        <a>® Terms | Privacy</a>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
