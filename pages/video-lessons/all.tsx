import React from 'react';
import { useRouter } from 'next/router';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    fetchVideos,
    fetchPlaylists,
    CategorySlider,
    VideoSlider,
    PlaylistSlider,
    VideoGrid,
    VideoSearch,
} from '~/features/videos';
import { Spin } from 'antd';

const VIDEO_CATEGORIES = [
    { id: 3811, slug: "smm-va-kontent-yaratuvchilik", name: "SMM va kontent yaratuvchilik" },
    { id: 4071, slug: "it-va-dasturlash", name: "IT va Dasturlash" },
    { id: 4074, slug: "dizayn-va-media", name: "Dizayn va Media" },
    { id: 4075, slug: "muhandislik", name: "Muhandislik" },
    { id: 4077, slug: "biznes-va-marketing", name: "Biznes va Marketing" },
    { id: 4080, slug: "tillar", name: "Tillar" },
    { id: 4081, slug: "fanlar-va-talim", name: "Fanlar va Ta'lim" },
    { id: 4082, slug: "sogliq-va-hayot", name: "Sog'liq va Hayot" },
    { id: 3799, slug: "dasturlash-305", name: "Dasturlash" },
];

const VideoLessonsPage: React.FC = () => {
    const router = useRouter();

    const [search, setSearch] = React.useState('');

    const handleVideoClick = (slug: string) => {
        router.push(`/product/${slug}`);
    };

    const handleSeeAll = (categorySlug: string) => {
        router.push(`/video-lessons/category/${categorySlug}`);
    };

    const handleSearch = React.useCallback((value: string) => {
        setSearch(value);
    }, []);

    const handlePlaylistClick = (slug: string) => {
        router.push(`/video-lessons/playlists/${slug}`);
    };

    const handleSeeAllPlaylists = () => {
        router.push(`/video-lessons/playlists`);
    };

    // Static Categories
    const categories = VIDEO_CATEGORIES;

    // 2. Fetch Popular Videos
    const { data: popularData, isLoading: isPopularLoading } = useQuery({
        queryKey: ['videos', 'popular'],
        queryFn: () => fetchVideos({ order_by_views: '-view_count', page_size: 15 }),
        enabled: !search, // Skip popular videos if searching
    });

    // Fetch Playlists
    const { data: playlistsData, isLoading: isPlaylistsLoading } = useQuery({
        queryKey: ['playlists'],
        queryFn: () => fetchPlaylists({ page_size: 10 }),
        enabled: !search,
    });

    // 3. Infinite Query for All Videos
    const {
        data: infiniteData,
        fetchNextPage,
        hasNextPage,
        isLoading: isAllLoading,
        isFetching: isAllFetching
    } = useInfiniteQuery({
        queryKey: ['videos', 'all-infinite', search],
        queryFn: ({ pageParam = 1 }) => fetchVideos({ page: pageParam, page_size: 12, search }),
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
                <div className="container py-4">
                    {/* Search Section */}
                    <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>
                            {search ? `Qidiruv natijalari: "${search}"` : 'Video darsliklar'}
                        </h1>
                        <VideoSearch onSearch={handleSearch} initialValue={search} />
                    </div>

                    {!search && (
                        <>
                            {/* Popular Videos Section */}
                            <VideoSlider
                                title="Eng ommabop"
                                videos={popularData?.results || []}
                                loading={isPopularLoading}
                                onVideoClick={handleVideoClick}
                                variant="horizontal"
                            />

                            {/* Playlists Section */}
                            <PlaylistSlider
                                onSeeAll={handleSeeAllPlaylists}
                                title="Videolar to'plami"
                                playlists={playlistsData?.results || []}
                                loading={isPlaylistsLoading}
                                onPlaylistClick={handlePlaylistClick}
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
                        </>
                    )}

                    {/* All Videos Grid Section with Infinite Scroll */}
                    <div className={!search ? "mt-5" : ""}>
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
                                title={search ? "" : "Barchasi"}
                                videos={allVideos}
                                loading={isAllLoading && allVideos.length === 0}
                                onVideoClick={handleVideoClick}
                            />
                        </InfiniteScroll>

                        {!isAllLoading && search && allVideos.length === 0 && (
                            <div className="text-center py-5">
                                <h3 className="text-muted">Hech narsa topilmadi</h3>
                                <p>Boshqa so'zlar bilan qidirib ko'ring yoki filtrlarni tekshiring.</p>
                            </div>
                        )}
                    </div>
                </div>
            </PageContainer>
        </>
    );
};

export default VideoLessonsPage;
