import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import {
    fetchVideos,
    fetchCategories,
    Video,
    Category,
    VideoGrid,
    CategoryFilters
} from '~/features/videos';
import { Pagination, Select } from 'antd';
import styles from './CategoryPage.module.scss';

interface Props {
    videos: Video[];
    totalCount: number;
    category: Category | null;
    subCategories: Category[];
    currentPage: number;
    pageSize: number;
    currentSort: string;
    currentFilter: string;
}

const CategoryPage: React.FC<Props> = ({
    videos,
    totalCount,
    category,
    subCategories,
    currentPage,
    pageSize,
    currentSort,
    currentFilter
}) => {
    const router = useRouter();
    const { slug } = router.query;

    const handleVideoClick = (videoSlug: string) => {
        router.push(`/product/${videoSlug}`);
    };

    const handlePageChange = (page: number) => {
        const { slug: _slug, ...rest } = router.query;
        router.push({
            pathname: `/video-lessons/category/${slug}`,
            query: { ...rest, page },
        });
    };

    const handleSortChange = (value: string) => {
        const { slug: _slug, ...rest } = router.query;
        router.push({
            pathname: `/video-lessons/category/${slug}`,
            query: { ...rest, sort: value, page: 1 },
        });
    };

    const handleSubCategoryClick = (subSlug: string) => {
        router.push(`/video-lessons/category/${subSlug}`);
    };

    const handlePriceFilterChange = (filter: string) => {
        const { slug: _slug, ...rest } = router.query;
        const newFilter = currentFilter === filter ? 'all' : filter;
        router.push({
            pathname: `/video-lessons/category/${slug}`,
            query: { ...rest, filter: newFilter, page: 1 },
        });
    };

    const categoryTitle = category
        ? (category.name.split('|').pop()?.trim() || category.name)
        : 'Video darslar';

    return (
        // @ts-ignore
        <PageContainer withFooter={true}>
            <Meta
                title={`${categoryTitle} - Video Darsliklar | Soff.uz`}
                description="Professional video darsliklar va kurslar."
            />

            <div className="container py-5">
                <header className={styles.header}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>{categoryTitle}</h1>
                    </div>

                    <div className={styles.filterBar}>
                        <div className={styles.filtersWrapper}>
                            <CategoryFilters
                                subCategories={subCategories}
                                currentFilter={currentFilter}
                                onSubCategoryClick={handleSubCategoryClick}
                                onPriceFilterChange={handlePriceFilterChange}
                            />
                        </div>

                        <div className={styles.sortSection}>
                            <Select
                                value={currentSort}
                                style={{ width: 160 }}
                                onChange={handleSortChange}
                                className={styles.sortSelect}
                                options={[
                                    { value: '-view_count', label: 'Eng ommabop' },
                                    { value: '-created_at', label: 'Yangilari' },
                                    { value: 'price', label: 'Arzonlari' },
                                    { value: '-price', label: 'Qimmatlari' },
                                ]}
                            />
                        </div>
                    </div>
                </header>

                {videos.length > 0 ? (
                    <VideoGrid videos={videos} onVideoClick={handleVideoClick} />
                ) : (
                    <div className={styles.emptyState}>
                        <h3>Hozircha videolar mavjud emas</h3>
                        <p>Tez orada yangi darsliklar qo'shiladi.</p>
                    </div>
                )}

                {totalCount > pageSize && (
                    <div className={styles.paginationWrapper}>
                        <Pagination
                            current={currentPage}
                            total={totalCount}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </div>
                )}
            </div>
        </PageContainer>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.params?.slug as string;
    const page = Number(context.query.page) || 1;
    const sort = (context.query.sort as string) || '-view_count';
    const filter = (context.query.filter as string) || 'all';
    const pageSize = 12;

    try {
        // Fetch current category and its subcategories
        const allMainCategories = await fetchCategories();
        const currentCategory = allMainCategories.find(c => c.slug === slug) || null;

        // Fetch sub-categories of the current slug
        const subCategories = await fetchCategories('video', slug);

        const videoParams: any = {
            category: slug,
            page: page,
            page_size: pageSize,
            order_by_views: sort === '-view_count' ? '-view_count' : undefined,
        };

        if (sort === '-created_at') videoParams.ordering = '-created_at';
        if (sort === 'price') videoParams.ordering = 'price';
        if (sort === '-price') videoParams.ordering = '-price';

        if (filter === 'free') videoParams.is_free = true;
        if (filter === 'paid') videoParams.is_free = false;

        const response = await fetchVideos(videoParams);

        return {
            props: {
                videos: response.results || [],
                totalCount: response.count || 0,
                category: currentCategory,
                subCategories: subCategories || [],
                currentPage: page,
                pageSize: pageSize,
                currentSort: sort,
                currentFilter: filter
            }
        };
    } catch (error) {
        console.error('Error in CategoryPage getServerSideProps:', error);
        return {
            props: {
                videos: [],
                totalCount: 0,
                category: null,
                subCategories: [],
                currentPage: 1,
                pageSize: 12,
                currentSort: '-view_count',
                currentFilter: 'all'
            }
        };
    }
};

export default CategoryPage;
