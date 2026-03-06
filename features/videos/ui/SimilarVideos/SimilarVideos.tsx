import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSimilarVideos, Video } from '~/features/videos';
import VideoCard from '../VideoCard/VideoCard';
import VideoSkeleton from '../VideoCard/VideoSkeleton';
import styles from './SimilarVideos.module.scss';

interface Props {
    slug: string;
}

const SimilarVideos: React.FC<Props> = ({ slug }) => {
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

    const { data: rawSimilarVideos, isLoading } = useQuery({
        queryKey: ['similar-videos', slug],
        queryFn: () => fetchSimilarVideos(slug),
        enabled: isVisible && !!slug,
    });

    const displayedVideos: Video[] = useMemo(() => {
        const rawData = rawSimilarVideos?.results || rawSimilarVideos || [];
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
    }, [rawSimilarVideos]);

    if (isVisible && !isLoading && displayedVideos.length === 0) return null;

    return (
        <div ref={containerRef} className={styles.container}>
            <h3 className={styles.title}>O'xshash mahsulotlar</h3>

            <div className={styles.grid}>
                {isLoading || !isVisible ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <VideoSkeleton key={i} />
                    ))
                ) : (
                    displayedVideos.slice(0, 8).map((video) => (
                        <VideoCard key={video.slug} video={video} />
                    ))
                )}
            </div>
        </div>
    );
};

export default React.memo(SimilarVideos);
