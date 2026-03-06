import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchVideos } from '../../api';
import { Category } from '../../model/types';
import VideoSlider from '../VideoSlider/VideoSlider';

interface Props {
    category: Category;
    onVideoClick: (slug: string) => void;
    onSeeAll: (slug: string) => void;
}

const CategorySlider: React.FC<Props> = ({ category, onVideoClick, onSeeAll }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const { data: response, isLoading } = useQuery({
        queryKey: ['videos', 'category', category.slug],
        queryFn: () => fetchVideos({ category: category.slug, page_size: 10 }),
        // Only fetch if category has a name and slug AND is in view
        enabled: !!category.slug && isInView,
        staleTime: 5 * 60 * 1000, // 5 minutes cache
    });

    const videos = response?.results || [];

    // Hide if no videos and not loading (and we have already tried to fetch)
    if (isInView && !isLoading && videos.length === 0) return null;

    return (
        <div ref={containerRef} style={{ minHeight: '300px' }}>
            <VideoSlider
                title={category.name.split('|').pop()?.trim() || category.name}
                videos={videos}
                loading={isLoading || !isInView}
                onSeeAll={() => onSeeAll(category.slug)}
                onVideoClick={onVideoClick}
            />
        </div>
    );
};

export default CategorySlider;
