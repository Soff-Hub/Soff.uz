import React, { useRef, useState, useEffect } from 'react';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Playlist } from '~/features/videos/model/types';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import PlaylistSkeleton from '../PlaylistCard/PlaylistSkeleton';
import styles from './PlaylistSlider.module.scss';

interface Props {
    title: string;
    playlists?: Playlist[];
    onSeeAll?: () => void;
    onPlaylistClick?: (slug: string) => void;
    loading?: boolean;
}

const PlaylistSlider: React.FC<Props> = ({
    title,
    playlists = [],
    onSeeAll,
    onPlaylistClick,
    loading = false,
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
            checkScroll();
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            container?.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [playlists, loading]);

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

    if (!loading && (!playlists || playlists.length === 0)) return null;

    return (
        <section className={styles.sliderSection}>
            <div
                className={`${styles.header} ${onSeeAll ? styles.clickable : ''}`}
                onClick={onSeeAll}
            >
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>{title}</h2>
                </div>
                {onSeeAll && (
                    <div className={styles.seeAll}>
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
                    >
                        <LeftOutlined />
                    </button>
                )}

                <div className={styles.scrollInnerWrapper}>
                    <div
                        className={styles.scrollContainer}
                        ref={scrollContainerRef}
                    >
                        {loading ? (
                            [...Array(6)].map((_, idx) => (
                                <div className={styles.slide} key={`skeleton-${idx}`}>
                                    <PlaylistSkeleton />
                                </div>
                            ))
                        ) : (
                            playlists.map((playlist) => (
                                <div className={styles.slide} key={playlist.slug}>
                                    <PlaylistCard playlist={playlist} onClick={onPlaylistClick} />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {showRightArrow && (playlists.length > 4 || loading) && (
                    <button
                        className={`${styles.navButton} ${styles.nextButton}`}
                        onClick={() => scroll('right')}
                    >
                        <RightOutlined />
                    </button>
                )}
            </div>
        </section>
    );
};

export default PlaylistSlider;
