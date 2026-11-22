import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Category } from '../../model/types';
import styles from './CategoryFilters.module.scss';
import 'swiper/css';

interface CategoryFiltersProps {
    subCategories: Category[];
    currentFilter: string;
    activeSubCategory?: string;
    onSubCategoryClick: (slug: string) => void;
    onPriceFilterChange: (filter: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
    subCategories,
    currentFilter,
    activeSubCategory,
    onSubCategoryClick,
    onPriceFilterChange,
}) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const hasMore = subCategories?.length > 10;
    const visibleSubCategories = isExpanded ? subCategories : subCategories?.slice(0, 10);

    const isAllActive = currentFilter === 'all' && !activeSubCategory;

    return (
        <div className={styles.categoryFilters}>
            {/* Desktop View: Grid/Flex with Show More */}
            <div className={styles.desktopFilters}>
                <button
                    className={`${styles.filterBtn} ${isAllActive ? styles.active : ''}`}
                    onClick={() => onPriceFilterChange('all')}
                >
                    Barchasi
                </button>

                {visibleSubCategories?.map((sub) => (
                    <button
                        key={sub.id}
                        className={`${styles.filterBtn} ${activeSubCategory === sub.slug ? styles.active : ''}`}
                        onClick={() => onSubCategoryClick(sub.slug)}
                    >
                        {sub.name.split('|').pop()?.trim() || sub.name}
                    </button>
                ))}

                {hasMore && (
                    <button
                        className={styles.moreBtn}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? "Yopish" : `Barchasini ko'rsatish (${subCategories.length})`}
                    </button>
                )}
            </div>

            {/* Mobile View: Horizontal Scroll (Swiper) */}
            <div className={styles.mobileFilters}>
                <Swiper
                    spaceBetween={8}
                    slidesPerView="auto"
                    freeMode={true}
                    className={styles.swiper}
                >
                    <SwiperSlide className={styles.swiperSlide}>
                        <button
                            className={`${styles.filterBtn} ${isAllActive ? styles.active : ''}`}
                            onClick={() => onPriceFilterChange('all')}
                        >
                            Barchasi
                        </button>
                    </SwiperSlide>

                    {subCategories?.map((sub) => (
                        <SwiperSlide key={sub.id} className={styles.swiperSlide}>
                            <button
                                className={`${styles.filterBtn} ${activeSubCategory === sub.slug ? styles.active : ''}`}
                                onClick={() => onSubCategoryClick(sub.slug)}
                            >
                                {sub.name.split('|').pop()?.trim() || sub.name}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default CategoryFilters;
