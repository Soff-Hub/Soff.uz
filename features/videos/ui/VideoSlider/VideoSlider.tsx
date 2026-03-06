import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { RightOutlined } from '@ant-design/icons';
import { Video } from '~/features/videos/model/types';
import VideoCard from '../VideoCard/VideoCard';
import styles from './VideoSlider.module.scss';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Props {
    title: string;
    videos: Video[];
    onSeeAll?: () => void;
    onVideoClick?: (slug: string) => void;
    slidesPerView?: number | 'auto';
    spaceBetween?: number;
    autoplay?: boolean;
    variant?: 'vertical' | 'horizontal';
}

const VideoSlider: React.FC<Props> = ({
    title,
    videos = [],
    onSeeAll,
    onVideoClick,
    slidesPerView = 4,
    spaceBetween = 20,
    autoplay = false,
    variant = 'vertical',
}) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!videos || videos.length === 0) return null;

    // Use CSS Grid for a stable skeleton that exactly matches the 5-column or 4-column layout
    if (!mounted) {
        return (
            <section className={styles.sliderSection}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: variant === 'horizontal' ? 'repeat(4, 1fr)' : 'repeat(5, 1fr)',
                    gap: spaceBetween + 'px',
                    overflow: 'hidden'
                }}>
                    {videos.slice(0, variant === 'horizontal' ? 4 : 5).map(v => (
                        <div key={v.slug} style={{ width: '100%' }}>
                            <VideoCard video={v} variant={variant} />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

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

            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={spaceBetween}
                slidesPerView={variant === 'horizontal' ? 1.1 : 1.2}
                pagination={{ clickable: true }}
                navigation={{ enabled: true }}
                autoplay={autoplay ? { delay: 5000, disableOnInteraction: false } : false}
                breakpoints={
                    variant === 'horizontal'
                        ? {
                            320: { slidesPerView: 1.1, spaceBetween: 10 },
                            640: { slidesPerView: 2.2, spaceBetween: 15 },
                            1024: { slidesPerView: 3, spaceBetween: 15 },
                            1280: { slidesPerView: 4, spaceBetween: 20 },
                        }
                        : {
                            320: { slidesPerView: 1.2, spaceBetween: 10 },
                            480: { slidesPerView: 2.2, spaceBetween: 12 },
                            768: { slidesPerView: 3.2, spaceBetween: 15 },
                            1024: { slidesPerView: 4, spaceBetween: 15 },
                            1280: { slidesPerView: 5, spaceBetween: 20 },
                            1440: { slidesPerView: 6, spaceBetween: 20 },
                        }
                }
            >
                {videos.map((video) => (
                    <SwiperSlide key={video.slug}>
                        <VideoCard video={video} onClick={onVideoClick} variant={variant} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default VideoSlider;
