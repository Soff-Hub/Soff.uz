import React from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin } from 'antd';

import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { fetchPlaylists, PlaylistGrid } from '~/features/videos';

const PlaylistsPage: React.FC = () => {
    const router = useRouter();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['playlists', 'all-infinite'],
        queryFn: ({ pageParam = 1 }) => fetchPlaylists({ page: pageParam, page_size: 12 }),
        getNextPageParam: (lastPage, allPages) => {
            const currentTotal = allPages.reduce((acc, page) => acc + page.results.length, 0);
            return currentTotal < lastPage.count ? allPages.length + 1 : undefined;
        },
    });

    const allPlaylists = data?.pages.flatMap((page) => page.results) || [];

    const handlePlaylistClick = (slug: string) => {
        router.push(`/product/${slug}`);
    };

    return (
        <>
            <Meta
                title="Barcha Playlistlar | Soff.uz"
                description="Mutaxassislar tomonidan tayyorlangan maxsus darsliklar to'plami. Barcha playlistlarni bu yerda ko'rishingiz mumkin."
            />

            {/* @ts-ignore */}
            <PageContainer withFooter={true}>
                <div className="container py-4">
                    <Breadcrumb className="mb-4">
                        <Breadcrumb.Item>
                            <Link href="/">Bosh sahifa</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link href="/video-lessons/all">Video darsliklar</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Playlistlar</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="mb-5">
                        <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
                            Barcha Playlistlar
                        </h1>
                        <p style={{ color: '#8c8c8c', marginTop: '8px', fontSize: '16px' }}>
                            Sifatli bilim olish uchun maxsus tanlangan darsliklar to'plami
                        </p>
                    </div>

                    <InfiniteScroll
                        dataLength={allPlaylists.length}
                        next={fetchNextPage}
                        hasMore={!!hasNextPage}
                        loader={
                            <div className="d-flex justify-content-center py-5">
                                <Spin size="large" />
                            </div>
                        }
                    >
                        <PlaylistGrid
                            playlists={allPlaylists}
                            loading={isLoading && allPlaylists.length === 0}
                            onPlaylistClick={handlePlaylistClick}
                        />
                    </InfiniteScroll>
                </div>
            </PageContainer>
        </>
    );
};

export default PlaylistsPage;
