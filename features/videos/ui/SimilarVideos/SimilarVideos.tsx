import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { fetchSimilarVideos, Video, mapToVideo } from '~/features/videos';
import VideoCard from '../VideoCard/VideoCard';
import VideoSkeleton from '../VideoCard/VideoSkeleton';
import styles from './SimilarVideos.module.scss';

interface Props {
    slug: string;
}

const SimilarVideos: React.FC<Props> = ({ slug }) => {
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

    const { data: rawSimilarVideos, isLoading } = useQuery({
        queryKey: ['similar-videos', slug],
        queryFn: () => fetchSimilarVideos(slug),
        enabled: isVisible && !!slug,
    });

    const displayedVideos: Video[] = useMemo(() => {
        const rawData = rawSimilarVideos?.results || rawSimilarVideos || [];
        if (!Array.isArray(rawData)) return [];

        return rawData.map((item: any) => mapToVideo(item));
    }, [rawSimilarVideos]);

    const handleVideoClick = (clickedSlug: string) => {
        if (!clickedSlug) return;
        router.push(`/product/${clickedSlug}`);
    };

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
                        <VideoCard
                            key={video.slug}
                            video={video}
                            onClick={handleVideoClick}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default React.memo(SimilarVideos);
