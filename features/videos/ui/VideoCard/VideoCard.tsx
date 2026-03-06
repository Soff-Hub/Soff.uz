import React from 'react';
import Image from 'next/image';
import { Video } from '~/features/videos/model/types';
import styles from './VideoCard.module.scss';
import { StarFilled, EyeOutlined, ClockCircleOutlined, FireOutlined, CaretRightFilled } from '@ant-design/icons';

interface Props {
    video: Video;
    onClick?: (slug: string) => void;
    variant?: 'vertical' | 'horizontal';
}

const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const VideoCard: React.FC<Props> = ({ video, onClick, variant = 'vertical' }) => {
    const isFree = video.price === 0;
    const hasDiscount = video.discount_price > 0 && video.discount_price < video.price;

    // Use poster from API or fallback
    const thumbnail = video.poster || `https://picsum.photos/seed/${video.slug}/640/360`;
    const sellerAvatar = video.seller_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(video.seller_name)}&background=random`;

    // Numeric constants for UI stability
    const rating = video.stars?.toFixed(1) || '4.5';
    const totalReviews = video.reviews_count || 120;
    const duration = video.duration || '12h 20m';

    return (
        <div
            className={`${styles.videoCard} ${variant === 'horizontal' ? styles.horizontal : ''}`}
            onClick={() => onClick?.(video.slug)}
        >
            <div className={styles.thumbnailWrapper}>
                <Image
                    src={thumbnail}
                    alt={video.title}
                    width={variant === 'horizontal' ? 240 : 640}
                    height={variant === 'horizontal' ? 180 : 360}
                    loading="lazy"
                    className={styles.thumbnail}
                    unoptimized={thumbnail.includes('cloudfront.net')} // Cloudfront might need unoptimized or proper configuration
                />

                {/* Status Badges */}
                <div className={`${styles.badge} ${isFree ? styles.freeBadge : styles.paidBadge}`}>
                    {isFree ? 'Bepul' : 'Pullik'}
                </div>

                {video.view_count > 100 && (
                    <div className={styles.trendingBadge}>
                        <FireOutlined />
                        <span>Xit savdo</span>
                    </div>
                )}

                <div className={styles.duration}>
                    <ClockCircleOutlined />
                    <span>{duration}</span>
                </div>
                <div className={styles.playOverlay}>
                    <div className={styles.playIconCircle}>
                        <CaretRightFilled className={styles.playIconTriangle} />
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{video.title}</h3>

                <div className={styles.sellerInfo}>
                    <img src={sellerAvatar} alt={video.seller_name} className={styles.avatar} />
                    <span className={styles.name}>{video.seller_name}</span>
                </div>

                <div className={styles.meta}>
                    <div className={styles.rating}>
                        <StarFilled />
                        <span className={styles.score}>{rating}</span>
                        <span className={styles.count}>({totalReviews})</span>
                    </div>
                    {variant === 'vertical' && (
                        <div className={styles.views}>
                            <EyeOutlined />
                            <span>{video.view_count}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.priceWrapper}>
                    {isFree ? (
                        <span className={`${styles.price} ${styles.freePrice}`}>Bepul</span>
                    ) : (
                        <div className={styles.priceContainer}>
                            {hasDiscount && (
                                <span className={styles.oldPrice}>{formatPrice(video.price)}</span>
                            )}
                            <span className={styles.price}>
                                {formatPrice(hasDiscount ? video.discount_price : video.price)} UZS
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
