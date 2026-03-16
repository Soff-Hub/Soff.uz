import React from 'react';
import styles from './PlaylistCard.module.scss';

const PlaylistSkeleton: React.FC = () => {
    return (
        <div className={`${styles.playlistCard} ${styles.skeleton}`}>
            <div className={styles.thumbnailWrapper}>
                <div className={styles.skeletonImage} />
            </div>
            <div className={styles.content}>
                <div className={styles.skeletonTitle} />
                <div className={styles.footer}>
                    <div className={styles.skeletonAvatar} />
                    <div className={styles.skeletonText} />
                </div>
            </div>
        </div>
    );
};

export default PlaylistSkeleton;
