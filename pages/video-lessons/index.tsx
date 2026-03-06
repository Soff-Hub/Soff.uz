import React from 'react';
import { useRouter } from 'next/router';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    fetchCategories,
    fetchVideos,
    CategorySlider,
    VideoSlider,
    VideoGrid,
} from '~/features/videos';
import { Spin } from 'antd';

const VideoLessonsPage: React.FC = () => {
    const router = useRouter();

    const handleVideoClick = (slug: string) => {
        router.push(`/video-lessons/${slug}`);
    };

    const handleSeeAll = (categorySlug: string) => {
        router.push(`/video-lessons/category/${categorySlug}`);
    };

    // 1. Fetch Categories
    const { data: categories, isLoading: isCatsLoading } = useQuery({
        queryKey: ['categories', 'video'],
        queryFn: () => fetchCategories('video'),
    });

    // 2. Fetch Popular Videos
    const { data: popularData, isLoading: isPopularLoading } = useQuery({
        queryKey: ['videos', 'popular'],
        queryFn: () => fetchVideos({ order_by_views: '-view_count', page_size: 15 }),
    });

    // 3. Infinite Query for All Videos
    const {
        data: infiniteData,
        fetchNextPage,
        hasNextPage,
        isLoading: isAllLoading
    } = useInfiniteQuery({
        queryKey: ['videos', 'all-infinite'],
        queryFn: ({ pageParam = 1 }) => fetchVideos({ page: pageParam, page_size: 12 }),
        getNextPageParam: (lastPage, allPages) => {
            const currentTotal = allPages.reduce((acc, page) => acc + page.results.length, 0);
            return currentTotal < lastPage.count ? allPages.length + 1 : undefined;
        },
    });

    const allVideos = infiniteData?.pages.flatMap((page) => page.results) || [];

    return (
        // @ts-ignore
        <PageContainer withFooter={true}>
            <Meta
                title="Video Darsliklar | Soff.uz"
                description="Bu sahifa har qanday sohada bilim olishni istaganlar uchun. Bu yerda zamonaviy kasblar, an’anaviy fanlar, shaxsiy rivojlanish va ta’limga oid turli video darsliklarni topish mumkin."
                image="https://soff.uz/static/img/video-darsliklar-2.png"
            />

            <div className="container py-3">
                {/* Popular Videos Section */}
                <VideoSlider
                    title="Eng ommabop"
                    videos={popularData?.results || []}
                    loading={isPopularLoading}
                    onVideoClick={handleVideoClick}
                    variant="horizontal"
                />

                {/* Top Categories Sections - Lazy loaded via CategorySlider */}
                {isCatsLoading ? (
                    // Show some skeletons for categories if loading
                    [...Array(3)].map((_, i) => (
                        <VideoSlider key={i} title="..." loading={true} />
                    ))
                ) : (
                    categories?.slice(0, 10).map((category) => (
                        <CategorySlider
                            key={category.id}
                            category={category}
                            onSeeAll={handleSeeAll}
                            onVideoClick={handleVideoClick}
                        />
                    ))
                )}

                {/* All Videos Grid Section with Infinite Scroll */}
                <div className="mt-5">
                    <InfiniteScroll
                        dataLength={allVideos.length}
                        next={fetchNextPage}
                        hasMore={!!hasNextPage}
                        loader={
                            <div className="d-flex justify-content-center py-4">
                                <Spin size="large" />
                            </div>
                        }
                    >
                        <VideoGrid
                            title="Barchasi"
                            videos={allVideos}
                            loading={isAllLoading && allVideos.length === 0}
                            onVideoClick={handleVideoClick}
                        />
                    </InfiniteScroll>
                </div>
            </div>
        </PageContainer>
    );
};

export default VideoLessonsPage;
