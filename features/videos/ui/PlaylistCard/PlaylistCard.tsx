import React from 'react';
import Image from 'next/image';
import { Playlist } from '~/features/videos/model/types';
import styles from './PlaylistCard.module.scss';
import { EyeOutlined, PlaySquareOutlined, UserOutlined } from '@ant-design/icons';

interface Props {
    playlist: Playlist;
    onClick?: (slug: string) => void;
}

const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const PlaylistCard: React.FC<Props> = ({ playlist, onClick }) => {
    const isFree = playlist.price === 0;
    
    const thumbnail = playlist.poster_url || `https://picsum.photos/seed/${playlist.slug}/640/360`;
    const sellerName = `${playlist.seller.first_name} ${playlist.seller.last_name}`;
    const sellerAvatar = playlist.seller.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(sellerName)}&background=random`;

    return (
        <div
            className={styles.playlistCard}
            onClick={() => onClick?.(playlist.slug)}
        >
            <div className={styles.thumbnailWrapper}>
                <Image
                    src={thumbnail}
                    alt={playlist.title}
                    width={640}
                    height={360}
                    loading="lazy"
                    className={styles.thumbnail}
                    unoptimized={thumbnail.includes('test-soffuz.s3.amazonaws.com') || thumbnail.includes('cloudfront.net')}
                />

                <div className={styles.videoCountBadge}>
                    <PlaySquareOutlined />
                    <span>{playlist.video_count} ta dars</span>
                </div>

                <div className={`${styles.priceBadge} ${isFree ? styles.freeBadge : styles.paidBadge}`}>
                    {isFree ? 'Bepul' : `${formatPrice(playlist.price)} UZS`}
                </div>

                <div className={styles.overlay}>
                    <div className={styles.playButton}>
                        <PlaySquareOutlined />
                        <span>Kursga o'tish</span>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{playlist.title}</h3>
                
                <div className={styles.footer}>
                    <div className={styles.sellerInfo}>
                        {playlist.seller.image_url ? (
                            <img src={sellerAvatar} alt={sellerName} className={styles.avatar} />
                        ) : (
                            <div className={styles.avatarPlaceholder}>
                                <UserOutlined />
                            </div>
                        )}
                        <span className={styles.sellerName}>{sellerName}</span>
                    </div>
                    
                    <div className={styles.views}>
                        <EyeOutlined />
                        <span>{playlist.views_count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(PlaylistCard);
