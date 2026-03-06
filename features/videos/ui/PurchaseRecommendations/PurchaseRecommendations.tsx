import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPurchaseRecommendations, Video } from '~/features/videos';
import VideoCard from '../VideoCard/VideoCard';
import VideoSkeleton from '../VideoCard/VideoSkeleton';
import styles from './PurchaseRecommendations.module.scss';

interface Props {
    slug: string;
}

const PurchaseRecommendations: React.FC<Props> = ({ slug }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const { data: rawRecommendations, isLoading } = useQuery({
        queryKey: ['video-purchase-recommendations', slug],
        queryFn: () => fetchPurchaseRecommendations(slug),
        enabled: isVisible && !!slug,
    });

    const displayedVideos: Video[] = useMemo(() => {
        const rawData = rawRecommendations?.results || rawRecommendations || [];
        if (!Array.isArray(rawData)) return [];

        return rawData.map((item: any) => ({
            ...item,
            view_count: item.views_count ?? item.view_count ?? 0,
            poster: item.poster_url ?? item.poster ?? null,
            seller_name: item.seller?.first_name
                ? `${item.seller.first_name} ${item.seller.last_name || ''}`.trim()
                : (item.seller_name || 'Soff.uz'),
            seller_image: item.seller?.image_url ?? item.seller_image ?? null,
            category: item.category || { id: 0, name: 'Video', slug: 'video' }
        }));
    }, [rawRecommendations]);

    if (isVisible && !isLoading && displayedVideos.length === 0) return null;

    return (
        <div ref={containerRef} className={styles.container}>
            <h3 className={styles.title}>O'quvchilar shuningdek sotib olishdi</h3>

            <div className={styles.list}>
                {isLoading || !isVisible ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className={styles.skeletonWrapper}>
                            <VideoSkeleton variant="horizontal" />
                        </div>
                    ))
                ) : (
                    displayedVideos.slice(0, 6).map((video) => (
                        <VideoCard
                            key={video.slug}
                            video={video}
                            variant="horizontal"
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default React.memo(PurchaseRecommendations);
