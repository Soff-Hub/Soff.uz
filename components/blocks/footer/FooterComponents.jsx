import React from 'react';
import styles from './footer.module.scss';
const footerMenu = {
    soff: {
        logoImg: '/static/img/soff.svg',
        title: 'Raqamli xizmatlar bozori!',
        path: '#',
    },
    services: {
        links: [
            { name: 'Sotib olish va moderatsiya bo‘yicha', link: '' },
            { name: '+998 (99) 266 30 29', link: 'tel:+998992663029' },
            { name: '@soff_moderator', link: 'https://t.me/soff_moderator' },
            {
                name: 'Texnik muammolar uchun',
                link: 'tel:+998910086789 ',
            },
            { name: '@hr_soffhub', link: 'https://t.me/hr_soffhub' },
        ],
    },
    social: {
        title: 'Ijtimoiy tarmoqlarimiz',
        items: [
            {
                name: 'FaceBook',
                icon: '/static/img/faceb.png',
                username: '@soffuz',
                url: 'https://www.facebook.com/profile.php?id=61579052952962#',
            },
            {
                name: 'Instagram',
                icon: '/static/img/insta.png',
                username: 'soffuz_',
                url:
                    'https://www.instagram.com/soffuz_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
            },
        ],
    },
    contactTech: {
        title: 'Texnik muammolar uchun:',
        items: [
            {
                icon: 'fa-solid fa-phone-volume',
                contact: '+998 (91) 008 67 89',
                url: 'tel:+998910086789',
            },
            {
                icon: 'fa-solid fa-paper-plane',
                contact: '@hr_soffhub',
                url: 'https://t.me/hr_soffhub',
            },
        ],
    },
    contactModeration: {
        title: 'Sotib olish va moderatsiya bo‘yicha:',
        items: [
            {
                contact: 'Barcha xizmatlar',
                url: '/orders/?direction=scientific_work',
            },
            {
                contact: 'Buyurtma berish',
                url: '/orders',
            },
            {
                contact: 'Mahsulotlar',
                url: '/scientific-resources/all?slug=all',
            },
            {
                contact: 'Frilanserlar uchun',
                url: 'https://seller.soff.uz/',
            },
        ],
    },
};

export default function FooterComponents() {
    return (
        <div className={styles.mainblock}>
            <footer className="  bg-transparent container p-lg-0 d-flex  justify-content-between align-items-start flex-wrap ">
                <a
                    href={footerMenu.soff.path}
                    className={styles.footerMainTitle}>
                    Tayyor mahsulotlar va xizmatlar bir joyda
                </a>

                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 p-0 mb-5">
                    {footerMenu.contactModeration.items.map((item, i) => (
                        <a
                            target="_blank"
                            key={i}
                            href={item.url}
                            className="d-flex text-white align-items-center footer-link gap-3 footer-link fs-4 mb-3">
                            {item.contact}
                        </a>
                    ))}
                </div>

                {/* Xizmatlar bo‘limi */}
                <div className="col-xl-3 text-white col-lg-3 col-md-6 p-0 col-sm-12 col-12">
                    <h5 className="fw-semibold fs-2 text-white">Aloqa</h5>
                    {footerMenu.services.links.map((link, i) =>
                        link.link ? (
                            <a
                                href={link.link}
                                target="_blank"
                                key={i}
                                className="footer-link text-white d-block fs-4 mb-3">
                                {link.name}
                            </a>
                        ) : (
                            <p className=" text-white d-block fs-4 mb-3">
                                {link.name}
                            </p>
                        )
                    )}
                </div>
            </footer>
            <div className="d-flex gap-4 justify-content-between mt-5 border-top pt-5 flex-wrap container">
                <img
                    src="/static/img/soff_green.png"
                    alt="logo"
                    className={styles.footerLogo}
                />
                <div className="d-flex gap-4 align-items-center">
                    {footerMenu.social.items.map((item, i) => (
                        <a key={i} href={item.url} className=" ">
                            <img
                                src={item.icon}
                                style={{ width: '40px', height: '40px' }}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
