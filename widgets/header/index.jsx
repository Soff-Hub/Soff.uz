import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { Badge, Select, Modal } from 'antd';
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
import MobileCatalog from './MobileCatalog';
import FastDowloadSection from '~/shared/components/fast-dowload/FastDowloadSection';
import {
    fetchFastDownloadProduct,
    fetchProductDowload
} from '~/shared/components/fast-dowload/FastDowloadApi';

import styles from './header.module.scss';
import { FaDownload } from 'react-icons/fa6';
import {
    TbDownload,    // Tayyor mahsulotlar (qutichaga tushayotgan strelka)
    TbBriefcase,   // Frilanserlik xizmatlari (portfel)
    TbSparkles,    // AI xizmatlari (yulduzchalar)
    TbVideo,       // Ijodkorlar (kamera)
    TbUpload,      // Sotuvchi bo'lish (qutichadan chiqayotgan strelka)
    TbSchool,
    TbPalette,
    TbCode,
    TbBox,
    TbTool,
    TbSpeakerphone
} from "react-icons/tb";

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
    const isCheckoutMode = ['/account/checkout', '/account/shopping-cart'].includes(router.pathname);

    // Redux selectors
    const { cartDataItems, wishlist } = useSelector((state) => state.ecomerce);
    const { isLoggedIn } = useSelector((state) => state.auth);

    // State
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [promotionModalVisible, setPromotionModalVisible] = useState(false);
    const [downloadProduct, setDownloadProduct] = useState(null);
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
                if (res && res.discount_percent > 0) {
                    setPromotion(res);
                }
            } catch (err) {
                console.error('Promotion fetch failed', err);
            }
        };

        if (isMounted && isLoggedIn) {
            fetchPromotion();
        }
    }, [isMounted, isLoggedIn]);

    // Fetch Downloadable Product (Yandex Style)
    useEffect(() => {
        const fetchDownload = async () => {
            try {
                const data = await fetchFastDownloadProduct();
                if (data && data.id) {
                    setDownloadProduct(data);
                }
            } catch (err) {
                console.error('Fast Download fetch failed', err);
            }
        };
        if (isMounted && isLoggedIn) fetchDownload();
    }, [isMounted, isLoggedIn]);

    // Show Promotion Modal logic (FORCED FOR TESTING)
    useEffect(() => {
        if (isMounted && (promotion.discount_percent > 0)) {
            setPromotionModalVisible(true);
        }
    }, [isMounted, promotion.discount_percent]);

    const handleQuickDownload = async (product) => {
        try {
            await fetchProductDowload(product.id);
            window.open(product.url, '_blank');
        } catch (err) {
            console.error('Download trigger failed', err);
        }
    };

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
                    <p className={styles.text}>
                        Keyingi xarid uchun <span>{promotion.discount_percent} % chegirma</span>
                        {isExpiring && (
                            <>
                                <span className={styles.divider}>|</span>
                                <span className={styles.timerLabel}>qolgan vaqt :</span>
                                <span className={styles.countdown}>
                                    {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                                </span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <header className={styles.headerMainBlock}>

            {renderPromoBanner()}
            <div className="container">
                {/* PART 1: TOP ROW */}
                <div className={styles.topRow}>
                    <div className={styles.leftSide}>
                        {/* Mobile Hamburger (Only visible via CSS media query) */}
                        <button
                            className={styles.mobileHamburger}
                            onClick={() => setMobileCatalogOpen(true)}
                        >
                            <MdMenu />
                        </button>

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
                    </div>

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
                                <div className="container" style={{ display: 'flex', minHeight: 'inherit' }}>
                                    <div className={`${styles.megaSidebar}`}>
                                        {categoriesData?.map((category) => (
                                            <Link key={category.id} href={`/orders?direction=${category.direction}`}>
                                                <a
                                                    className={`${styles.sidebarItem} ${hoveredCategory === category.direction ? styles.active : ''}`}
                                                    onMouseEnter={() => setHoveredCategory(category.direction)}
                                                    onClick={() => setMegaMenuOpen(false)}
                                                >
                                                    <div className={styles.sidebarItemContent}>
                                                        <span className={styles.sidebarIconBox}>
                                                            {directionIcons[category.direction] || <MdLayers size={22} />}
                                                        </span>
                                                        <span className={styles.itemText}>{formatCategoryTitle(category.direction)}</span>
                                                    </div>
                                                    <MdKeyboardArrowRight className={styles.arrow} />
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className={styles.megaContent}>
                                        {activeCategoryData ? (
                                            <>
                                                {/* MAHSULOTLAR */}
                                                {activeCategoryData.soff_categories?.length > 0 && (
                                                    <div className={styles.section}>
                                                        <div className={styles.sectionHeader}>
                                                            <div className={styles.iconBox}><TbBox size={22} strokeWidth={1.5} /></div>
                                                            <div>
                                                                <h3>MAHSULOTLAR</h3>
                                                                <p>Tayyor yuklangan mahsulotlar</p>
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
                                                            <div className={styles.iconBox}><TbTool size={22} strokeWidth={1.5} /></div>
                                                            <div>
                                                                <h3>XIZMATLAR</h3>
                                                                <p>Xizmatni tanlang - buyurtma bering</p>
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
                            </div>
                        )}
                    </div>

                    {/* Global Search Bar */}
                    <div className={styles.searchContainer}>
                        <div className={styles.searchArea}>
                            {!isMobile && (
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
                            )}
                            <input
                                ref={searchRef}
                                type="text"
                                className={styles.searchInput}
                                placeholder="Qidiring..."
                                value={search}
                                onFocus={() => {
                                    setIsDropdownOpen(true);
                                    setIsFocused(true);
                                }}
                                onBlur={() => setIsFocused(false)}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button
                                className={styles.searchBtn}
                                onClick={handleSearch}
                            >
                                <MdSearch className={styles.icon} />
                            </button>
                        </div>

                        {/* Backdrop Focus Effect */}
                        {(isFocused || (isDropdownOpen && search.length > 0)) && (
                            <div className={styles.backdrop} onClick={() => {
                                setIsDropdownOpen(false);
                                setIsFocused(false);
                            }} />
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
                                                {!isMobile && (
                                                    <div className={`
                                                        ${styles.typeBadge} 
                                                        ${option.sourceType === 'specialist' ? styles.specialist :
                                                            type === 'mahsulotlar' ? styles.product : styles.service}
                                                    `}>
                                                        {option.sourceType === 'specialist' ? 'Mutaxassis' :
                                                            type === 'mahsulotlar' ? 'Mahsulot' : 'Xizmat'}
                                                    </div>
                                                )}
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
                                    {!isMobile && <MdPersonOutline className={styles.icon} />}
                                    <span>Kirish</span>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Catalog */}
            <MobileCatalog
                isOpen={mobileCatalogOpen}
                onClose={() => setMobileCatalogOpen(false)}
                categoriesData={categoriesData}
            />

            {!megaMenuOpen && !isCheckoutMode && (
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
                        {/* <Link href="/freelancers">
                            <a className={styles.navLink}>
                                <TbVideo className={styles.icon} />
                                Ijodkorlar
                            </a>
                        </Link> */}
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
            )}

            {!megaMenuOpen && !isCheckoutMode && <FastDowloadSection />}

            <Modal
                open={promotionModalVisible}
                onCancel={() => setPromotionModalVisible(false)}
                footer={null}
                centered
                width={downloadProduct ? 600 : 500}
                className={styles.promotionModal}
            >
                <div className={styles.promoModalContent}>
                    {downloadProduct ? (
                        <div className={styles.yandexModalBody}>
                            <div className={styles.productFlex}>
                                <div className={styles.imageBox}>
                                    <img src={downloadProduct.poster} alt={downloadProduct.title} />
                                    <div className={styles.statusBadge}>TAYYOR</div>
                                </div>
                                <div className={styles.infoBox}>
                                    <span className={styles.contextLabel}>SOTIB OLINGAN MAHSULOT</span>
                                    <h3>{downloadProduct.title}</h3>

                                    <div className={styles.actionGroup}>
                                        <button
                                            className={styles.downloadBtn}
                                            onClick={() => handleQuickDownload(downloadProduct)}
                                        >
                                            <FaDownload /> Yuklab olish
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {promotion.discount_percent > 0 && (
                                <div className={styles.promoFooterDetailed}>
                                    <div className={styles.footerInfoMain}>
                                        <div className={styles.promotionText}>
                                            Keyingi xarid uchun <span>{promotion.discount_percent}%</span> chegirmadan foydalaning!
                                        </div>

                                        {isExpiring && (
                                            <div className={styles.modalTimerCompact}>
                                                <FaClock />
                                                <span>
                                                    {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <Link href="/scientific-resources/all">
                                        <a
                                            className={styles.footerBuyBtnCompact}
                                            onClick={() => setPromotionModalVisible(false)}
                                        >
                                            Yana sotib olish
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className={styles.promoIcon}>
                                <FaPercent />
                            </div>
                            <h2>MAXSUS TAKLIF!</h2>
                            <p className={styles.discountText}>
                                Siz uchun <span>{promotion.discount_percent}%</span> CHEGIRMA!
                            </p>

                            {isExpiring && (
                                <div className={styles.modalMainTimer}>
                                    <FaClock />
                                    <span>
                                        Tugashiga: {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                                    </span>
                                </div>
                            )}

                            <p className={styles.subText}>
                                Sotib oling yana va tejab qoling.
                            </p>
                            <div className={styles.modalActions}>
                                <Link href="/scientific-resources/all">
                                    <a
                                        className={styles.buyMoreBtnHighlighted}
                                        onClick={() => setPromotionModalVisible(false)}
                                    >
                                        Sotib oling yana
                                    </a>
                                </Link>
                                <button
                                    className={styles.closeModalBtn}
                                    onClick={() => setPromotionModalVisible(false)}
                                >
                                    Yopish
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </header>
    );
};

export default Header;
