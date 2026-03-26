import React from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { 
    MdPalette, 
    MdCode, 
    MdTrendingUp, 
    MdSchool, 
    MdVideocam, 
    MdBusinessCenter 
} from 'react-icons/md';

const popularCategories = [
    {
        title: 'Dizayn',
        count: '12,400+',
        href: '/orders?direction=dizayn',
        icon: <MdPalette />
    },
    {
        title: 'Dasturlash',
        count: '8,200+',
        href: '/orders?direction=web',
        icon: <MdCode />
    },
    {
        title: 'Marketing',
        count: '5,800+',
        href: '/orders?direction=marketing',
        icon: <MdTrendingUp />
    },
    {
        title: 'Ta’lim',
        count: '3,900+',
        href: '/orders?direction=scientific_work',
        icon: <MdSchool />
    },
    {
        title: 'Video & Audio',
        count: '2,800+',
        href: '/orders?direction=video',
        icon: <MdVideocam />
    },
    {
        title: 'Biznes',
        count: '4,300+',
        href: '/orders?direction=business',
        icon: <MdBusinessCenter />
    }
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
