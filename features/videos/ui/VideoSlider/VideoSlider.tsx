import React, { useRef, useState, useEffect } from 'react';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Video } from '~/features/videos/model/types';
import VideoCard from '../VideoCard/VideoCard';
import styles from './VideoSlider.module.scss';

interface Props {
    title: string;
    videos: Video[];
    onSeeAll?: () => void;
    onVideoClick?: (slug: string) => void;
    variant?: 'vertical' | 'horizontal';
}

const VideoSlider: React.FC<Props> = ({
    title,
    videos = [],
    onSeeAll,
    onVideoClick,
    variant = 'vertical',
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            // Initial check
            checkScroll();
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            container?.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [videos]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { clientWidth } = scrollContainerRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (!videos || videos.length === 0) return null;

    return (
        <section className={`${styles.sliderSection} ${variant === 'horizontal' ? styles.horizontalSlider : ''}`}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {onSeeAll && (
                    <div className={styles.seeAll} onClick={onSeeAll}>
                        <span>Barchasini ko'rish</span>
                        <RightOutlined />
                    </div>
                )}
            </div>

            <div className={styles.sliderWrapper}>
                {showLeftArrow && (
                    <button
                        className={`${styles.navButton} ${styles.prevButton}`}
                        onClick={() => scroll('left')}
                        aria-label="Previous"
                    >
                        <LeftOutlined />
                    </button>
                )}

                <div
                    className={styles.scrollContainer}
                    ref={scrollContainerRef}
                >
                    {videos.map((video) => (
                        <div className={styles.slide} key={video.slug}>
                            <VideoCard video={video} onClick={onVideoClick} variant={variant} />
                        </div>
                    ))}
                </div>

                {showRightArrow && videos.length > 5 && (
                    <button
                        className={`${styles.navButton} ${styles.nextButton}`}
                        onClick={() => scroll('right')}
                        aria-label="Next"
                    >
                        <RightOutlined />
                    </button>
                )}
            </div>
        </section>
    );
};

export default VideoSlider;
