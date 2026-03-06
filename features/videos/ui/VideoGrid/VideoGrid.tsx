import React from 'react';
import VideoCard from '../VideoCard/VideoCard';
import VideoSkeleton from '../VideoCard/VideoSkeleton';
import { Video } from '../../model/types';
import styles from './VideoGrid.module.scss';

interface VideoGridProps {
    title?: string;
    videos: Video[];
    onVideoClick?: (slug: string) => void;
    loading?: boolean;
    skeletonCount?: number;
}

const VideoGrid: React.FC<VideoGridProps> = ({
    title,
    videos,
    onVideoClick,
    loading = false,
    skeletonCount = 8
}) => {
    if (!loading && (!videos || videos.length === 0)) return null;

    return (
        <section className={styles.gridSection}>
            {title && (
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                </div>
            )}

            <div className={styles.gridContainer}>
                {loading ? (
                    [...Array(skeletonCount)].map((_, idx) => (
                        <div key={`skeleton-${idx}`} className={styles.gridItem}>
                            <VideoSkeleton />
                        </div>
                    ))
                ) : (
                    videos.map((video) => (
                        <div key={video.slug} className={styles.gridItem}>
                            <VideoCard
                                video={video}
                                onClick={onVideoClick}
                            />
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default VideoGrid;
