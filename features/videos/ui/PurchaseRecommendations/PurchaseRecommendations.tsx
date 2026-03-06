import React, { useEffect, useRef, useState } from 'react';
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

    const { data: recommendations, isLoading } = useQuery({
        queryKey: ['video-purchase-recommendations', slug],
        queryFn: () => fetchPurchaseRecommendations(slug),
        enabled: isVisible && !!slug,
    });

    const displayedVideos: Video[] = recommendations?.results || recommendations || [];

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
