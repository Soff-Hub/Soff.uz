import React from 'react';
import { useRouter } from 'next/router';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    fetchVideos,
    CategorySlider,
    VideoSlider,
    VideoGrid,
} from '~/features/videos';
import { Spin } from 'antd';

const VIDEO_CATEGORIES = [
    { id: 3217, slug: "video", name: "Video materiallar" },
    { id: 3804, slug: "matematika-437", name: "Matematika" },
    { id: 3808, slug: "moliyaviy-savodxonlik", name: "Moliyaviy savodxonlik" },
    { id: 3802, slug: "ingliz-tili-994", name: "Ingliz tili" },
    { id: 3803, slug: "rus-tili", name: "Rus tili" },
    { id: 3810, slug: "foto-video-montaj", name: "Foto & Video montaj" },
    { id: 3799, slug: "dasturlash-305", name: "Dasturlash" },
    { id: 3807, slug: "shaxsiy-rivojlanish", name: "Shaxsiy rivojlanish" },
    { id: 3806, slug: "biznes-va-tadbirkorlik", name: "Biznes va tadbirkorlik" },
    { id: 3811, slug: "smm-va-kontent-yaratuvchilik", name: "SMM va kontent yaratuvchilik" },
    { id: 3800, slug: "grafik-dizayn", name: "Grafik dizayn" },
    { id: 3801, slug: "uiux-dizayn", name: "UI/UX dizayn" },
    { id: 3805, slug: "marketing", name: "Marketing" },
    { id: 3809, slug: "psixologiya-744", name: "Psixologiya" },
];

const VideoLessonsPage: React.FC = () => {
    const router = useRouter();

    const handleVideoClick = (slug: string) => {
        router.push(`/product/${slug}`);
    };

    const handleSeeAll = (categorySlug: string) => {
        router.push(`/video-lessons/category/${categorySlug}`);
    };

    // Static Categories
    const categories = VIDEO_CATEGORIES;

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
        <>
            <Meta
                title="Video Darsliklar: Zamonaviy Kasblarni Onlayn O'rganing | Soff.uz"
                description="Professional video darsliklar va onlayn kurslar. Dasturlash, dizayn, marketing va boshqa zamonaviy sohalarni Soff.uz bilan o'rganing. Mutaxassislar tomonidan tayyorlangan sifatli ta'lim kontenti."
                image="https://soff.uz/static/img/video-darsliklar-2.png"
                keywords={[
                    { name: "video darsliklar" },
                    { name: "onlayn kurslar" },
                    { name: "masofaviy ta'lim" },
                    { name: "dasturlash darslari" },
                    { name: "dizayn darsliklari" },
                    { name: "biznes kurslar" },
                    { name: "professional ta'lim" },
                    { name: "uzbek tilidagi kurslar" },
                    { name: "Soff.uz tutorials" }
                ]}
            >
                {/* Structured Data for SEO Boost */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ItemList",
                            "name": "Soff.uz Video Darsliklar",
                            "description": "Professional video darsliklar va onlayn kurslar to'plami.",
                            "url": "https://soff.uz/video-lessons",
                            "numberOfItems": categories?.length || 0,
                            "itemListElement": categories?.slice(0, 10).map((cat, index) => ({
                                "@type": "ListItem",
                                "position": index + 1,
                                "name": cat.name.split('|').pop()?.trim() || cat.name,
                                "url": `https://soff.uz/video-lessons/category/${cat.slug}`
                            }))
                        })
                    }}
                />
            </Meta>

            {/* @ts-ignore */}
            <PageContainer withFooter={true}>
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
                    {
                        categories?.slice(0, 100).map((category) => (
                            <CategorySlider
                                key={category.id}
                                category={category}
                                onSeeAll={handleSeeAll}
                                onVideoClick={handleVideoClick}
                            />
                        ))
                    }

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
        </>
    );
};

export default VideoLessonsPage;
