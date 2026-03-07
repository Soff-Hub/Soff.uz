import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { fetchPurchaseRecommendations, Video, mapToVideo } from '~/features/videos';
import VideoCard from '../VideoCard/VideoCard';
import VideoSkeleton from '../VideoCard/VideoSkeleton';
import styles from './PurchaseRecommendations.module.scss';

interface Props {
    slug: string;
}

const PurchaseRecommendations: React.FC<Props> = ({ slug }) => {
    const router = useRouter();
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

        return rawData.map((item: any) => mapToVideo(item));
    }, [rawRecommendations]);

    const handleVideoClick = (clickedSlug: string) => {
        if (!clickedSlug) return;
        router.push(`/video-lessons/${clickedSlug}`);
    };

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
                            onClick={handleVideoClick}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default React.memo(PurchaseRecommendations);
