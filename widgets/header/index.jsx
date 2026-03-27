import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { Badge, Select } from 'antd';
import {
    MdMenu,
    MdSearch,
    MdOutlineShoppingCart,
    MdOutlineModeComment,
    MdPersonOutline,
    MdKeyboardArrowDown,
    MdKeyboardArrowRight,
    MdEditNote,
    MdTrendingUp,
    MdLayers,
    MdAutoAwesome,
    MdGroup,
    MdStorefront
} from 'react-icons/md';
import { FaRegHeart, FaClock, FaPercent } from 'react-icons/fa';

import ProductRepository from '~/repositories/ProductRepository';
import { useCountTimeBack } from '~/shared/hooks/useCountDown';
import { useMounted } from '~/shared/hooks/useMounted';

import { initLocalCart } from '~/store/ecomerce/slice';
import { initSearchHistory } from '~/store/search/slice';
import useResponsive from '~/shared/utilities/useResponsive';
import { useFGet } from '~/shared/hooks/useFApi';
import { NAVBAR_MENU_CATEGORIES } from '~/shared/api/end-points';
import useSearch from '~/shared/hooks/useSearch';
import HeaderUserDropdown from './HeaderActions/HeaderUserDropdown';
import { highlightMatch } from '~/shared/utilities/utils';

import styles from './header.module.scss';
import { FaDownload } from 'react-icons/fa6';
import {
    TbDownload,    // Tayyor mahsulotlar (qutichaga tushayotgan strelka)
    TbBriefcase,   // Frilanserlik xizmatlari (portfel)
    TbSparkles,    // AI xizmatlari (yulduzchalar)
    TbVideo,       // Ijodkorlar (kamera)
    TbUpload       // Sotuvchi bo'lish (qutichadan chiqayotgan strelka)
} from "react-icons/tb";

const { Option } = Select;

const categoryTitles = {
    audio_video: 'Audio va Video',
    marketing: 'Marketing va SMM',
    marketing_smm: 'Marketing va SMM', // Include existing if any
    business: 'Biznes',
    three_d: '3D Dizayn va Vizualizatsiya',
    '3d_design': '3D Dizayn va Vizualizatsiya',
    web: 'Veb Dasturlash',
    it_development: 'Veb Dasturlash',
    dizayn: 'Dizayn',
    scientific_work: 'Ilmiy va Akademik xizmatlar',
    science_resources: 'Ilmiy va Akademik xizmatlar',
};

const templateLink = {
    scientific_work: 'scientific-resources',
    three_d: '3d-models-and-interior-designs',
    web: 'websites',
    dizayn: 'design-developments',
    document: 'templates',
};

const formatCategoryTitle = (key) => {
    if (categoryTitles[key]) return categoryTitles[key];
    return key?.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const Header = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isMobile } = useResponsive();
    const isMounted = useMounted();

    // Redux selectors
    const { cartDataItems, wishlist } = useSelector((state) => state.ecomerce);
    const { isLoggedIn } = useSelector((state) => state.auth);

    // State
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const megaMenuRef = useRef(null);
    const searchRef = useRef(null);

    const [promotion, setPromotion] = useState({
        discount_percent: 0,
        expires_at: null,
    });
    const timeLeft = useCountTimeBack(promotion.expires_at || null);

    useEffect(() => {
        const fetchPromotion = async () => {
            try {
                const res = await ProductRepository.getActivePromotion();
                if (res) setPromotion(res);
            } catch (err) {
                console.error('Promotion fetch failed', err);
            }
        };

        if (isMounted && isLoggedIn) {
            fetchPromotion();
        } else if (isMounted && !isLoggedIn) {
            setPromotion({ discount_percent: 0, expires_at: null });
        }
    }, [isMounted, isLoggedIn]);

    // Fetch Categories for Mega Menu
    const { data: categoriesData } = useFGet('navbar-items', NAVBAR_MENU_CATEGORIES);

    // Search Logic
    const {
        search,
        setSearch,
        type,
        setType,
        handleSearch,
        handleNavigateOption,
        options,
        isLoading: searchLoading
    } = useSearch();

    useEffect(() => {
        dispatch(initLocalCart());
        dispatch(initSearchHistory());
    }, [dispatch]);

    // Initialize Mega Menu with first category
    useEffect(() => {
        if (categoriesData?.length > 0 && !hoveredCategory) {
            setHoveredCategory(categoriesData[0].direction);
        }
    }, [categoriesData, hoveredCategory]);

    // Handle Click Outside for Mega Menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
                setMegaMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const activeCategoryData = categoriesData?.find(cat => cat.direction === hoveredCategory);

    const isExpiring = promotion.expires_at && (timeLeft.minutes > 0 || timeLeft.seconds > 0);

    const renderPromoBanner = () => {
        if (!isMounted || !isLoggedIn || promotion.discount_percent <= 0) return null;

        return (
            <div className={styles.promotionBanner}>
                <div className={styles.mainInfo}>
                    <div className={styles.iconWrapper}>
                        <FaPercent size={12} className="text-white" />
                    </div>
                    <span className={styles.text}>
                        MAXSUS TAKLIF: {promotion.discount_percent}% CHEGIRMA BILAN SOTIB OLING!
                    </span>
                </div>

                {isExpiring && (
                    <div className={styles.countdown}>
                        <FaClock size={12} className="text-white/80" />
                        <span className={styles.time}>
                            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                    </div>
                )}

                {!isMobile && (
                    <Link href="/account/shopping-cart">
                        <a className={styles.cartLink}>
                            Savatga o'tish
                        </a>
                    </Link>
                )}
            </div>
        );
    };

    return (
        <header className={styles.headerMainBlock}>
            {renderPromoBanner()}
            <div className="container">
                {/* PART 1: TOP ROW */}
                <div className={styles.topRow}>
                    {/* Logo */}
                    <Link href="/">
                        <a className={styles.logoArea}>
                            <Image
                                src="/static/img/soff/logo-dark.png"
                                alt="Soff.uz"
                                width={120}
                                height={32}
                                priority
                            />
                        </a>
                    </Link>

                    {/* Catalog Button & Mega Menu */}
                    <div className={styles.catalogArea} ref={megaMenuRef}>
                        <button
                            className={styles.catalogBtn}
                            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                        >
                            <MdMenu className={styles.icon} />
                            <span>Katalog</span>
                            <MdKeyboardArrowDown className={styles.icon} />
                        </button>

                        {megaMenuOpen && (
                            <div className={styles.megaMenu}>
                                <div className={styles.megaSidebar}>
                                    {categoriesData?.map((category) => (
                                        <div
                                            key={category.id}
                                            className={`${styles.sidebarItem} ${hoveredCategory === category.direction ? styles.active : ''}`}
                                            onMouseEnter={() => setHoveredCategory(category.direction)}
                                        >
                                            <span>{formatCategoryTitle(category.direction)}</span>
                                            <MdKeyboardArrowRight />
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.megaContent}>
                                    {activeCategoryData ? (
                                        <>
                                            {/* MAHSULOTLAR */}
                                            {activeCategoryData.soff_categories?.length > 0 && (
                                                <div className={styles.section}>
                                                    <div className={styles.sectionHeader}>
                                                        <div className={styles.iconBox}><MdLayers /></div>
                                                        <div>
                                                            <h3>MAHSULOTLAR</h3>
                                                            <small>Tayyor yuklangan mahsulotlar</small>
                                                        </div>
                                                    </div>
                                                    <div className={styles.linksGrid}>
                                                        {activeCategoryData.soff_categories?.map(cat => (
                                                            <Link
                                                                key={cat.id}
                                                                href={`/${templateLink[activeCategoryData.direction] || 'templates'}/${cat.slug}?slug=${cat.slug}&search=&parentCategory=${cat.slug}&title=${cat.title}`}
                                                            >
                                                                <a className={styles.menuLink}>{cat.title}</a>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* XIZMATLAR */}
                                            {activeCategoryData.freelance_categories?.length > 0 && (
                                                <div className={styles.section}>
                                                    <div className={styles.sectionHeader}>
                                                        <div className={styles.iconBox}><MdEditNote /></div>
                                                        <div>
                                                            <h3>XIZMATLAR</h3>
                                                            <small>Xizmatni tanlang - buyurtma bering</small>
                                                        </div>
                                                    </div>
                                                    <div className={styles.linksGrid}>
                                                        {activeCategoryData.freelance_categories?.map(cat => (
                                                            <Link
                                                                key={cat.id}
                                                                href={`/orders?direction=${activeCategoryData.direction}&category_id=${cat.id}&title=${cat.title}`}
                                                            >
                                                                <a className={styles.menuLink}>{cat.title}</a>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="p-4 text-center text-muted">
                                            Kategoriyani tanlang
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Global Search Bar */}
                    <div className={styles.searchContainer}>
                        <div className={styles.searchArea}>
                            <Select
                                value={type}
                                onChange={setType}
                                className={styles.typeSelect}
                                bordered={false}
                            >
                                <Option value="mahsulotlar">Barchasi</Option>
                                <Option value="xizmatlar">Xizmatlar</Option>
                                <Option value="mutaxassislar">Mutaxassislar</Option>
                            </Select>
                            <input
                                ref={searchRef}
                                type="text"
                                className={styles.searchInput}
                                placeholder="Qidiring..."
                                value={search}
                                onFocus={() => setIsDropdownOpen(true)}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button
                                className={styles.searchBtn}
                                onClick={handleSearch}
                                disabled={searchLoading}
                            >
                                <MdSearch className={styles.icon} />
                            </button>
                        </div>

                        {/* Backdrop Focus Effect */}
                        {isDropdownOpen && search.length > 0 && (
                            <div className={styles.backdrop} onClick={() => setIsDropdownOpen(false)} />
                        )}

                        {/* Search Suggestions Dropdown */}
                        {isDropdownOpen && search.length > 0 && (
                            <div className={styles.suggestionsDropdown}>
                                {searchLoading ? (
                                    <div className={styles.loadingState}>
                                        <div className={styles.spinner}></div>
                                        <span>Yuklanmoqda...</span>
                                    </div>
                                ) : options?.length > 0 ? (
                                    <div className={styles.suggestionsList}>
                                        {options.map((option) => (
                                            <div
                                                key={option.key}
                                                className={styles.suggestionItem}
                                                onClick={() => {
                                                    handleNavigateOption(option.value, option);
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                <div className={styles.suggestionLeft}>
                                                    {option.sourceType === 'specialist' ? (
                                                        <div className={styles.avatarWrapper}>
                                                            {option.avatar ? (
                                                                <img src={option.avatar} alt={option.value} className={styles.specialistAvatar} />
                                                            ) : (
                                                                <div className={styles.avatarFallback}>
                                                                    <MdPersonOutline />
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <MdSearch className={styles.searchIcon} />
                                                    )}

                                                    <div className={styles.suggestionTextWrapper}>
                                                        <span className={styles.suggestionText}>
                                                            {highlightMatch(option.value, search)}
                                                        </span>
                                                        {option.subtitle && (
                                                            <span className={styles.suggestionSubtitle}>
                                                                {option.subtitle}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={`
                                                    ${styles.typeBadge} 
                                                    ${option.sourceType === 'specialist' ? styles.specialist :
                                                        type === 'mahsulotlar' ? styles.product : styles.service}
                                                `}>
                                                    {option.sourceType === 'specialist' ? 'Mutaxassis' :
                                                        type === 'mahsulotlar' ? 'Mahsulot' : 'Xizmat'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={styles.emptyState}>
                                        Hech narsa topilmadi
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.actionsArea}>
                        <Link href="/order/create">
                            <button className={styles.orderBtn}>
                                <MdEditNote size={20} />
                                <span>Buyurtma berish</span>
                            </button>
                        </Link>

                        <Link href="/account/wishlist">
                            <a className={styles.iconBtn}>
                                <Badge count={isMounted ? wishlist?.length : 0} size="small" offset={[2, 0]}>
                                    <FaRegHeart size={24} />
                                </Badge>
                            </a>
                        </Link>

                        <Link href="/account/shopping-cart">
                            <a className={styles.iconBtn}>
                                <Badge count={isMounted ? cartDataItems?.length : 0} size="small" offset={[2, 0]}>
                                    <MdOutlineShoppingCart size={24} />
                                </Badge>
                            </a>
                        </Link>

                        {isMounted && isLoggedIn && (
                            <Link href="/chat">
                                <a className={styles.iconBtn}>
                                    <MdOutlineModeComment size={24} />
                                </a>
                            </Link>
                        )}

                        {isMounted && isLoggedIn ? (
                            <HeaderUserDropdown />
                        ) : (
                            <Link href="/auth/login">
                                <button className={styles.loginBtn}>
                                    <MdPersonOutline className={styles.icon} />
                                    <span>Kirish</span>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* PART 2: BOTTOM SUB-NAV ROW */}
            <div className={styles.subRow}>
                <div className="container d-flex justify-content-start gap-1">
                    <Link href="/scientific-resources/all">
                        <a className={styles.navLink}>
                            <TbDownload className={styles.icon} />
                            Tayyor mahsulotlar
                        </a>
                    </Link>
                    <Link href="/orders">
                        <a className={styles.navLink}>
                            <TbBriefcase className={styles.icon} />
                            Frilanserlik xizmatlari
                        </a>
                    </Link>
                    <a
                        href="https://soffia.uz/uz/dashboard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.navLink}
                    >
                        <TbSparkles className={styles.icon} />
                        AI xizmatlari
                    </a>
                    <Link href="/freelancers">
                        <a className={styles.navLink}>
                            <TbVideo className={styles.icon} />
                            Ijodkorlar
                        </a>
                    </Link>
                    <a
                        href="https://seller.soff.uz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.navLink}
                    >
                        <TbUpload className={styles.icon} />
                        Sotuvchi bo'lish
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
