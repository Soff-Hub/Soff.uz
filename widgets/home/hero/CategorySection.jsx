import React from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import {
    TbPalette,
    TbCode,
    TbSchool,
    TbVideo,
    TbBox,
    TbLayout
} from 'react-icons/tb';

const popularCategories = [
    {
        title: 'Ilmiy ish',
        count: '1.5mln +',
        href: '/scientific-resources',
        icon: <TbSchool />
    },
    {
        title: 'Soff studio',
        count: '1K +',
        href: '/studio',
        icon: <TbVideo />
    },
    {
        title: '3D Modellar',
        count: '500+',
        href: '/3d-models-and-interior-designs',
        icon: <TbBox />
    },
    {
        title: 'Dizayn shablonlari',
        count: '1.5K +',
        href: '/design-developments',
        icon: <TbPalette />
    },
    {
        title: 'Veb saytlar',
        count: '500+',
        href: '/websites',
        icon: <TbCode />
    },
    {
        title: 'Shablonlar',
        count: '2k+',
        href: '/templates',
        icon: <TbLayout />
    },

];

const CategorySection = () => {
    return (
        <section className={styles.popularCategories}>
            <div className={styles.gridHeader}>
                <h2>Mashhur kategoriyalar</h2>
            </div>
            <div className={styles.categoryGrid}>
                {popularCategories.map((cat, idx) => (
                    <Link key={idx} href={cat.href}>
                        <a className={styles.categoryCard}>
                            <div className={styles.cardIcon}>
                                {cat.icon}
                            </div>
                            <div className={styles.cardInfo}>
                                <span className={styles.cardTitle}>{cat.title}</span>
                                <span className={styles.cardCount}>{cat.count}</span>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
