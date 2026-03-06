import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Category } from '../../model/types';
import styles from './CategoryFilters.module.scss';
import 'swiper/css';

interface CategoryFiltersProps {
    subCategories: Category[];
    currentFilter: string;
    onSubCategoryClick: (slug: string) => void;
    onPriceFilterChange: (filter: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
    subCategories,
    currentFilter,
    onSubCategoryClick,
    onPriceFilterChange,
}) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const hasMore = subCategories?.length > 10;
    const visibleSubCategories = isExpanded ? subCategories : subCategories?.slice(0, 10);

    return (
        <div className={styles.categoryFilters}>
            {/* Desktop View: Grid/Flex with Show More */}
            <div className={styles.desktopFilters}>
                <button
                    className={`${styles.filterBtn} ${currentFilter === 'all' ? styles.active : ''}`}
                    onClick={() => onPriceFilterChange('all')}
                >
                    Barchasi
                </button>

                {visibleSubCategories?.map((sub) => (
                    <button
                        key={sub.id}
                        className={styles.filterBtn}
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
                            className={`${styles.filterBtn} ${currentFilter === 'all' ? styles.active : ''}`}
                            onClick={() => onPriceFilterChange('all')}
                        >
                            Barchasi
                        </button>
                    </SwiperSlide>

                    {subCategories?.map((sub) => (
                        <SwiperSlide key={sub.id} className={styles.swiperSlide}>
                            <button
                                className={styles.filterBtn}
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
