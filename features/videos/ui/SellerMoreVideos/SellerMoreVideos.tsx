import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSellerProducts } from '~/features/user-profile/api/useSellerProducts';
import { VideoCard, mapToVideo, Video } from '~/features/videos';
import VideoSkeleton from '../VideoCard/VideoSkeleton';
import styles from './SellerMoreVideos.module.scss';

interface Props {
    sellerId: number;
    currentVideoId: number;
}

const SellerMoreVideos: React.FC<Props> = ({ sellerId, currentVideoId }) => {
    const router = useRouter();

    // Fetch seller products: page=1, type='video' (mapping 'video' to 'file' logic if needed, but user said type='video')
    // According to hook: (id, page = 1, type = 'file', search = '')
    const { data, isLoading } = useSellerProducts(sellerId, 1, 'video');

    const displayedVideos: Video[] = useMemo(() => {
        const rawData = data?.results || data || [];
        if (!Array.isArray(rawData)) return [];

        // Map and filter out current video
        return rawData
            .map((item: any) => mapToVideo(item))
            .filter((v: Video) => Number(v.id) !== Number(currentVideoId));
    }, [data, currentVideoId]);

    const handleVideoClick = (clickedSlug: string) => {
        if (!clickedSlug) return;
        router.push(`/product/${clickedSlug}`);
    };

    if (!isLoading && displayedVideos.length === 0) return null;

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Muallifning boshqa darslari</h3>

            <div className={styles.grid}>
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className={styles.skeletonWrapper}>
                            <VideoSkeleton />
                        </div>
                    ))
                ) : (
                    displayedVideos.map((video, index) => (
                        <div
                            key={video.slug}
                            className={`${styles.gridItem} ${index >= 5 ? styles.mobileOnly : ''}`}
                        >
                            <VideoCard
                                video={video}
                                onClick={handleVideoClick}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default React.memo(SellerMoreVideos);
