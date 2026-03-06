import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, Popover, Spin } from 'antd';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import { fetchCategories } from '../../api';
import { Category } from '../../model/types';
import styles from './VideoNavbar.module.scss';
import 'swiper/css';

const VideoNavbar = () => {
    const swiperRef = useRef<any>(null);
    const [isEnd, setIsEnd] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['video-categories'],
        queryFn: () => fetchCategories('video'),
    });

    const updateSwiperState = (swiper: any) => {
        setIsEnd(swiper.isEnd);
        setIsBeginning(swiper.isBeginning);
    };

    if (isLoading) {
        return (
            <div className={styles.loaderWrapper}>
                <Spin size="small" />
            </div>
        );
    }

    return (
        <nav className={styles.videoNavbar}>
            <div className="container">
                <div className={styles.navbarWrapper}>
                    <Button
                        aria-label="previous"
                        size="large"
                        shape="circle"
                        onClick={() => swiperRef.current?.swiper?.slidePrev()}
                        className={`${styles.swipeBtn} ${isBeginning ? styles.hidden : ''}`}
                    >
                        <IoIosArrowBack />
                    </Button>

                    <Swiper
                        ref={swiperRef}
                        spaceBetween={20}
                        slidesPerView="auto"
                        freeMode={true}
                        onSwiper={updateSwiperState}
                        onSlideChange={updateSwiperState}
                        className={styles.categorySwiper}
                    >
                        {categories.map((category) => (
                            <SwiperSlide key={category.id} className={styles.swiperSlide}>
                                <VideoMenuItem category={category} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Button
                        aria-label="next"
                        size="large"
                        shape="circle"
                        onClick={() => swiperRef.current?.swiper?.slideNext()}
                        className={`${styles.swipeBtn} ${styles.swipeNext} ${isEnd ? styles.hidden : ''}`}
                    >
                        <IoIosArrowBack />
                    </Button>
                </div>
            </div>
        </nav>
    );
};

interface VideoMenuItemProps {
    category: Category;
}

const VideoMenuItem: React.FC<VideoMenuItemProps> = ({ category }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: subCategories = [], isLoading } = useQuery({
        queryKey: ['video-subcategories', category.slug],
        queryFn: () => fetchCategories('video', category.slug),
        enabled: isOpen,
    });

    const hasSubCategories = subCategories.length > 0;

    const content = (
        <div className={styles.dropdownContent}>
            {isLoading ? (
                <div className={styles.popoverLoader}>
                    <Spin size="small" />
                </div>
            ) : (
                <ul className={styles.subCategoryList}>
                    {subCategories.map((sub) => (
                        <li key={sub.id} className={styles.subCategoryItem}>
                            <Link href={`/video-lessons/category/${sub.slug}`}>
                                <a>{sub.name.split('|').pop()?.trim() || sub.name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    const menuLink = (
        <div className={styles.menuItem}>
            <Link href={`/video-lessons/category/${category.slug}`}>
                <a className={styles.label}>
                    {category.name.split('|').pop()?.trim() || category.name}
                </a>
            </Link>
        </div>
    );

    // Only show popover if we are loading or have subcategories
    if (!isLoading && !hasSubCategories && isOpen) {
        // This is a bit of a hack since we only know after fetch, 
        // but for a senior engineer, we might want to pre-fetch or have a 'has_children' flag in the parent category.
        // For now, if it's open and we know there's nothing, we just return the link.
    }

    return (
        <Popover
            content={hasSubCategories || isLoading ? content : null}
            placement="bottomLeft"
            trigger="hover"
            onOpenChange={(open) => setIsOpen(open)}
            overlayClassName={styles.popoverOverlay}
            open={(hasSubCategories || isLoading) && isOpen}
        >
            {menuLink}
        </Popover>
    );
};

export default VideoNavbar;
