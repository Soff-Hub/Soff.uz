import React, { useRef, useState, useEffect } from 'react';
import styles from './style.module.scss';
import menuItemStyle from './menuItem.module.scss';
import Link from 'next/link';
import { useFGet } from '~/shared/hooks/useFApi';
import { NAVBAR_MENU_CATEGORIES } from '~/shared/api/end-points';
import { IoIosArrowBack } from 'react-icons/io';
import { Popover, Button } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperController from './swiperController';
import { useSelector } from 'react-redux';
import { FiExternalLink } from 'react-icons/fi';
import { useTranslation } from 'next-i18next';
import { HeaderDirectionsLoader } from '../header/HeaderLoader';

const NavbarMenu = () => {
    const { data, isLoading } = useFGet('navbar-items', NAVBAR_MENU_CATEGORIES);
    const [isEnd, setIsEnd] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);
    const [swiperController, setSwiperController] = useState(null);
    const swiperRef = useRef(null);

    const getMethods = (swiperClass) => {
        setSwiperController(swiperClass);
    };

    const setEnding = (status) => {
        setIsEnd(status);
    };
    const setBeginning = (status) => {
        setIsBeginning(status);
    };

    const updateSwiperState = (swiper) => {
        if (swiper) {
            setIsEnd(swiper.isEnd);
            setIsBeginning(swiper.isBeginning);
        }
    };

    const handleSwiperInit = (swiper) => {
        updateSwiperState(swiper);
    };

    const handleSlideChange = (swiper) => {
        updateSwiperState(swiper);
    };

    useEffect(() => {
        if (swiperRef.current?.swiper) {
            const swiper = swiperRef.current.swiper;

            // Set initial state
            updateSwiperState(swiper);

            swiper.on('slideChange', () => updateSwiperState(swiper));
            swiper.on('reachEnd', () => setIsEnd(true));
            swiper.on('reachBeginning', () => setIsBeginning(true));
            swiper.on('fromEdge', () => {
                updateSwiperState(swiper);
            });

            return () => {
                swiper.off('slideChange');
                swiper.off('reachEnd');
                swiper.off('reachBeginning');
                swiper.off('fromEdge');
            };
        }
    }, [data]);

    if (isLoading) {
        return <HeaderDirectionsLoader />;
    }

    return (
        <nav className={styles.navSectionBlock}>
            <div className="container">
                <div className={styles.navbarWrapper}>
                    <Button
                        aria-label="previous"
                        size="large"
                        shape="circle"
                        onClick={() => swiperController?.slidePrev()}
                        color="primary"
                        style={{
                            display: isBeginning ? 'none' : 'flex',
                        }}
                        className={styles.swipe_btn}
                        disabled={isBeginning}>
                        <IoIosArrowBack />
                    </Button>
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={20}
                        navigation={false}
                        grabCursor={true}
                        freeMode={true}
                        slidesPerView={'auto'}
                        onSwiper={handleSwiperInit}
                        onSlideChange={handleSlideChange}
                        className={`categorySwiper ${
                            !isEnd && 'categorySwiperEnding'
                        } ${!isBeginning && 'categorySwiperBeginning'}`}>
                        {data.map((item) => (
                            <SwiperSlide key={item.direction}>
                                <MenuItem
                                    products={item.freelance_categories}
                                    templates={item.soff_categories}
                                    label={item.direction}
                                />
                            </SwiperSlide>
                        ))}

                        <SwiperController
                            getMethods={getMethods}
                            setEnding={setEnding}
                            setBeginning={setBeginning}
                        />
                    </Swiper>
                    <Button
                        aria-label="next"
                        size="large"
                        color="primary"
                        shape="circle"
                        style={{
                            display: isEnd ? 'none' : 'flex',
                        }}
                        className={styles.swipeNext}
                        onClick={() => swiperController?.slideNext()}
                        disabled={isEnd}>
                        <IoIosArrowBack />
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default NavbarMenu;

const templateLink = {
    scientific_work: 'scientific-resources',
    three_d: '3d-models-and-interior-designs',
    web: 'websites',
    dizayn: 'design-developments',
    document: 'templates',
};

const MenuItem = ({ products, templates, label }) => {
    const { directions } = useSelector((state) => state.profile);
    const { t } = useTranslation('header');
    const option = directions.reduce((acc, item) => {
        acc[item.value] = item.label;
        return acc;
    }, {});

    let readyTemplates = null;
    if (templates?.length) {
        readyTemplates = (
            <div className="templates">
                <Link href={`/${templateLink[label]}/all`}>
                    <a className="section-label">
                        {t('readyProducts')}{' '}
                        <FiExternalLink
                            fontSize={14}
                            style={{
                                marginBottom: '3px',
                            }}
                        />
                    </a>
                </Link>

                <ul className="details-list">
                    {templates.map((item) => (
                        <Link
                            key={item.id}
                            href={`/${templateLink[label]}/${item.slug}?slug=${item.slug}&search=&parentCategory=${item.slug}&title=${item.title}`}>
                            <a className="detail-item">{item.title}</a>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    }

    let readyProducts = null;
    if (products?.length) {
        readyProducts = (
            <div className="orders">
                <Link href={`/orders?direction=${label}`}>
                    <a className="section-label">
                        {t('createOrder')}{' '}
                        <FiExternalLink
                            fontSize={14}
                            style={{
                                marginBottom: '3px',
                            }}
                        />
                    </a>
                </Link>

                <ul className="details-list">
                    {products.map((item) => (
                        <Link
                            key={item.id}
                            href={`/orders?direction=${label}&category_id=${item.id}&title=${item.title}`}>
                            <a className="detail-item">{item.title}</a>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <Popover
            title={''}
            overlayClassName="navbar-menu-popover"
            placement="bottomLeft"
            content={
                <div className="dropdown-content">
                    {readyTemplates}
                    {readyProducts}
                </div>
            }>
            <div className={menuItemStyle.menuItem}>
                <button type="button" className={menuItemStyle.label}>
                    {option[label]}
                </button>
            </div>
        </Popover>
    );
};
