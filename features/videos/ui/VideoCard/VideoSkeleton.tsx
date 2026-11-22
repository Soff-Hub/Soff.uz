import React from 'react';
import styles from './VideoCard.module.scss';

interface Props {
    variant?: 'vertical' | 'horizontal';
}

const VideoSkeleton: React.FC<Props> = ({ variant = 'vertical' }) => {
    return (
        <div className={`${styles.videoCard} ${styles.skeleton} ${variant === 'horizontal' ? styles.horizontal : ''}`}>
            <div className={styles.thumbnailWrapper}>
                <div className={styles.skeletonImage} />
            </div>

            <div className={styles.content}>
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonMeta}>
                    <div className={styles.skeletonAvatar} />
                    <div className={styles.skeletonText} />
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.skeletonPrice} />
            </div>
        </div>
    );
};

export default React.memo(VideoSkeleton);
