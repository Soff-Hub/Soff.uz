import Link from 'next/link';
import React from 'react';
import styles from '../../landingStyles/landingStyles.module.scss';
import { Dropdown, Space } from 'antd';

const items = [
    {
        key: '1',
        label: (
            <a href={'https://t.me/soff_uz'} className="fs-3" target="_blank">
                Soff Hamjamiyati
                <p className="menu__item__description font-weight-lighter">
                    Telegram kanallarimizda yangiliklar va imkoniyatlarni
                    kuzatib boring.
                </p>
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a href={'/page/video-list'} className="fs-3">
                Qo'llanmalar
                <p className="menu__item__description font-weight-lighter">
                    Foydalanish bo‘yicha foydali qo‘llanmalar va maslahatlar.
                </p>
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a href={'/page/oferta'} className="fs-3">
                Oferta
                <p className="menu__item__description font-weight-lighter">
                    Xizmatlardan foydalanish shartlari va qoidalari.
                </p>
            </a>
        ),
    },
    {
        key: '4',
        label: (
            <a href={'/page/faq'} className="fs-3">
                Ko'p beriladigan savollar
                <p className="menu__item__description font-weight-lighter">
                    Eng ko‘p so‘raladigan savollarga javoblar.
                </p>
            </a>
        ),
    },
    {
        key: '5',
        label: (
            <a href="tel:+998910086789" className="fs-3">
                Yordam
                <p className="menu__item__description font-weight-lighter">
                    +998 (91) 008 67 89
                </p>
            </a>
        ),
    },
];
const MenuCategoriesDropdown = () => {
    return (
        <div className="menu--product-categories">
            <a
                className={styles.navLink}
                href={'https://seller.soff.uz/'}
                target="_blank">
                Freelance bo'lish
            </a>
        </div>
    );
};

export default MenuCategoriesDropdown;
