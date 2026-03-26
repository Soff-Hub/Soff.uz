import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './style.module.scss';
import { useFGet } from '~/shared/hooks/useFApi';
import { NAVBAR_MENU_CATEGORIES } from '~/shared/api/end-points';
import {
    MdSchool,
    MdPalette,
    MdCode,
    MdLayers,
    MdTrendingUp,
    MdVideocam,
    MdBusinessCenter,
    MdChevronRight,
    MdSettings,
    MdWork
} from 'react-icons/md';
import CategorySection from './CategorySection';

const directionIcons = {
    scientific_work: <MdSchool />,
    dizayn: <MdPalette />,
    web: <MdCode />,
    three_d: <MdLayers />,
    marketing: <MdTrendingUp />,
    video: <MdVideocam />,
    business: <MdBusinessCenter />,
};

const directionLabels = {
    scientific_work: 'Ilmiy va Akademik xizmatlar',
    dizayn: 'Dizayn',
    web: 'Dasturlash xizmatlari',
    three_d: '3D Dizayn va Vizualizatsiya',
    marketing: 'Marketing va SMM',
    video: 'Audio va Video',
    business: 'Biznes',
};

const templateLink = {
    scientific_work: 'scientific-resources',
    three_d: '3d-models-and-interior-designs',
    web: 'websites',
    dizayn: 'design-developments',
    document: 'templates',
};

const Hero = () => {
    const { data: categoriesData } = useFGet('navbar-items', NAVBAR_MENU_CATEGORIES);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    return (
        <div className={styles.heroMainBlock}>
            {/* Top Section: Sidebar + Banner */}
            <div className={styles.heroTopLayout}>
                {/* Left Sidebar (Desktop Only via CSS) */}
                <aside
                    className={styles.sidebarContainer}
                    onMouseLeave={() => setHoveredCategory(null)}
                >
                    {categoriesData?.map((item) => (
                        <div
                            key={item.direction}
                            className={`${styles.menuItem} ${hoveredCategory?.direction === item.direction ? styles.active : ''}`}
                            onMouseEnter={() => setHoveredCategory(item)}
                        >
                            <div className={styles.iconBox}>
                                {directionIcons[item.direction] || <MdSettings />}
                            </div>
                            <span className={styles.itemText}>
                                {directionLabels[item.direction] || item.direction}
                            </span>
                            <MdChevronRight className={styles.arrow} />
                        </div>
                    ))}

                    {/* Mega Menu Popover */}
                    {hoveredCategory && (
                        <div className={styles.megaMenu}>
                            {/* Mahsulotlar Section */}
                            <div className={styles.popoverSection}>
                                <div className={styles.sectionHeader}>
                                    <MdWork className={styles.sectionIcon} />
                                    <div className={styles.headerInfo}>
                                        <h3>MAHSULOTLAR</h3>
                                        <p>Tayyor yuklangan mahsulotlar</p>
                                    </div>
                                </div>
                                <div className={styles.linksGrid}>
                                    {hoveredCategory.soff_categories?.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/${templateLink[hoveredCategory.direction] || 'templates'}/${cat.slug}?slug=${cat.slug}&search=&parentCategory=${cat.slug}&title=${cat.title}`}
                                        >
                                            <a className={styles.menuLink}>{cat.title}</a>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Xizmatlar Section */}
                            <div className={styles.popoverSection}>
                                <div className={styles.sectionHeader}>
                                    <MdSettings className={styles.sectionIcon} />
                                    <div className={styles.headerInfo}>
                                        <h3>XIZMATLAR</h3>
                                        <p>Xizmatni tanlang – buyurtma bering</p>
                                    </div>
                                </div>
                                <div className={styles.linksGrid}>
                                    {hoveredCategory.freelance_categories?.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/orders?direction=${hoveredCategory.direction}&category_id=${cat.id}&title=${cat.title}`}
                                        >
                                            <a className={styles.menuLink}>{cat.title}</a>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </aside>

                {/* Right Column: Banner + Categories Grid Stack */}
                <div className={styles.heroRightColumn}>
                    <section className={styles.heroBanner}>
                        <div className={styles.bannerContent}>
                            <h1>Onlayn mutaxassislarni osongina toping</h1>
                            <p className={styles.subtitle}>
                                Tasdiqlangan mutaxassislardan loyihalaringiz uchun foydalaning
                            </p>
                            <Link href="/orders">
                                <button className={styles.ctaButton}>
                                    Mutaxassis yollash
                                </button>
                            </Link>
                        </div>
                        {/* Hero Graphic Injection */}
                        <img
                            src="/static/img/HomePage/hero/hero.png"
                            alt="Soff.uz Hero"
                            className={styles.heroImage}
                        />
                    </section>

                    {/* Middle Section: Popular Categories Grid */}
                    <CategorySection />
                </div>
            </div>

            {/* Bottom Stats Section */}
            <section className={styles.platformStats}>
                <span className={styles.statsLabel}>Minglab kreatorlar ishongan platforma</span>
                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <span className={styles.val}>12,000+</span>
                        <span className={styles.name}>Faol kreatorlar</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.val}>85,000+</span>
                        <span className={styles.name}>Raqamli mahsulotlar</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.val}>$2.4M+</span>
                        <span className={styles.name}>Kreatorlarga to'langan</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.val}>4.9/5</span>
                        <span className={styles.name}>O'rtacha reyting</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
