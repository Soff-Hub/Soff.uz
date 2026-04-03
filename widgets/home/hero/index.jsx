import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { useFGet } from '~/shared/hooks/useFApi';
import { NAVBAR_MENU_CATEGORIES } from '~/shared/api/end-points';
import {
    TbSchool,
    TbPalette,
    TbCode,
    TbBox,
    TbTool,
    TbSpeakerphone,
    TbVideo,
    TbBriefcase,
    TbChevronRight
} from 'react-icons/tb';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import CategorySection from './CategorySection';

const directionIcons = {
    scientific_work: <TbSchool size={22} strokeWidth={1.5} />,
    dizayn: <TbPalette size={22} strokeWidth={1.5} />,
    web: <TbCode size={22} strokeWidth={1.5} />,
    three_d: <TbBox size={22} strokeWidth={1.5} />,
    marketing: <TbSpeakerphone size={22} strokeWidth={1.5} />,
    video: <TbVideo size={22} strokeWidth={1.5} />,
    audio_video: <TbVideo size={22} strokeWidth={1.5} />,
    business: <TbBriefcase size={22} strokeWidth={1.5} />,
};

const directionLabels = {
    scientific_work: 'Ilmiy va Akademik xizmatlar',
    science_resources: 'Ilmiy va Akademik xizmatlar',
    dizayn: 'Dizayn',
    web: 'Dasturlash xizmatlari',
    it_development: 'Dasturlash xizmatlari',
    three_d: '3D Dizayn va Vizualizatsiya',
    '3d_design': '3D Dizayn va Vizualizatsiya',
    marketing: 'Marketing va SMM',
    marketing_smm: 'Marketing va SMM',
    video: 'Audio va Video',
    audio_video: 'Audio va Video',
    business: 'Biznes',
};

const slides = [
    {
        img: '/static/img/HomePage/hero/hero_1.jpg',
        link: '/scientific-resources/all',
        target: '_self'
    },
    {
        img: '/static/img/HomePage/hero/hero_3.jpg',
        link: '/orders',
        target: '_self'
    },
    {
        img: '/static/img/HomePage/hero/hero_4.png',
        link: '/video-lessons',
        target: '_self'
    },
    {
        img: '/static/img/HomePage/hero/hero_2.jpg',
        link: 'https://soffia.uz/uz/dashboard',
        target: '_blank'
    },
    {
        img: '/static/img/HomePage/hero/hero_5.png',
        link: 'https://seller.soff.uz',
        target: '_blank'
    }
]

const formatDirectionLabel = (key) => {
    if (directionLabels[key]) return directionLabels[key];
    return key?.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = useRef(null);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, []);

    useEffect(() => {
        slideInterval.current = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(slideInterval.current);
    }, [nextSlide]);

    const closeTimeout = useRef(null);

    const handleMenuLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setHoveredCategory(null);
        }, 150); // Small delay to bridge the gap
    };

    const handleMenuEnter = (item) => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setHoveredCategory(item);
    };

    const handlePopupEnter = () => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };

    useEffect(() => {
        return () => {
            if (closeTimeout.current) clearTimeout(closeTimeout.current);
        };
    }, []);

    return (
        <div className={styles.heroMainBlock}>
            {/* Top Section: Sidebar + Banner */}
            <div className={styles.heroTopLayout}>
                {/* Left Sidebar (Desktop Only via CSS) */}
                <aside
                    className={styles.sidebarContainer}
                    onMouseLeave={handleMenuLeave}
                >
                    {categoriesData?.map((item) => (
                        <Link
                            key={item.direction}
                            href={
                                item.soff_categories?.length > 0
                                    ? `/${templateLink[item.direction]}/all`
                                    : `/orders?direction=${item.direction}`
                            }
                        >
                            <a
                                className={`${styles.menuItem} ${hoveredCategory?.direction === item.direction ? styles.active : ''}`}
                                onMouseEnter={() => handleMenuEnter(item)}
                            >
                                <div className={styles.iconBox}>
                                    {directionIcons[item.direction] || <MdSettings />}
                                </div>
                                <span className={styles.itemText}>
                                    {formatDirectionLabel(item.direction)}
                                </span>
                                <TbChevronRight className={styles.arrow} />
                            </a>
                        </Link>
                    ))}

                </aside>

                {/* Mega Menu Popover (Direct child of heroTopLayout for absolute positioning) */}
                {hoveredCategory && (
                    <div
                        className={styles.megaMenu}
                        onMouseEnter={handlePopupEnter}
                        onMouseLeave={handleMenuLeave}
                    >
                        {/* Mahsulotlar Section */}
                        {hoveredCategory.soff_categories?.length > 0 && (
                            <div className={styles.popoverSection}>
                                <div className={styles.sectionHeader}>
                                    <div className={styles.iconBox}>
                                        <TbBox size={22} strokeWidth={1.5} />
                                    </div>
                                    <div className={styles.headerInfo}>
                                        <h3>MAHSULOTLAR</h3>
                                        <p>Tayyor yuklangan mahsulotlar</p>
                                    </div>
                                </div>
                                <div className={styles.linksGrid}>
                                    {hoveredCategory.soff_categories?.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/${hoveredCategory.direction === 'scientific_work' ? 'category' : (templateLink[hoveredCategory.direction] || 'templates')}/${cat.slug}?slug=${cat.slug}&parentCategory=${cat.slug}&title=${cat.title}`}
                                        >
                                            <a className={styles.menuLink}>{cat.title}</a>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Xizmatlar Section */}
                        {hoveredCategory.freelance_categories?.length > 0 && (
                            <div className={styles.popoverSection}>
                                <div className={styles.sectionHeader}>
                                    <div className={styles.iconBox}>
                                        <TbTool size={22} strokeWidth={1.5} />
                                    </div>
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
                        )}
                    </div>
                )}

                {/* Right Column: Banner + Categories Grid Stack */}
                <div className={styles.heroRightColumn}>
                    <section className={styles.heroBanner}>
                        {/* Custom Image Carousel */}
                        <div className={styles.carouselContainer}>
                            {slides.map((slide, index) => (
                                <div
                                    key={index}
                                    className={`${styles.slide} ${currentSlide === index ? styles.active : ''}`}
                                >
                                    <Link href={slide.link}>
                                        <a
                                            target={slide.target}
                                            rel={slide.target === '_blank' ? 'noopener noreferrer' : undefined}
                                            style={{ display: 'block', width: '100%', height: '100%' }}
                                        >
                                            <img
                                                src={slide.img}
                                                alt={`Soff.uz Banner ${index + 1}`}
                                                loading={index === 0 ? "eager" : "lazy"}
                                            />
                                        </a>
                                    </Link>
                                </div>
                            ))}

                            <button
                                className={`${styles.navButton} ${styles.prev}`}
                                onClick={(e) => { e.preventDefault(); prevSlide(); }}
                            >
                                <MdChevronLeft />
                            </button>
                            <button
                                className={`${styles.navButton} ${styles.next}`}
                                onClick={(e) => { e.preventDefault(); nextSlide(); }}
                            >
                                <MdChevronRight />
                            </button>

                            <div className={styles.dotsContainer}>
                                {slides.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
                                        onClick={() => setCurrentSlide(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Middle Section: Popular Categories Grid */}
                    <CategorySection />
                </div>
            </div>

            {/* Bottom Stats Section */}
        </div>
    );
};

export default Hero;
