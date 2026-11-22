import React from 'react';
import { Playlist } from '../../model/types';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import PlaylistSkeleton from '../PlaylistCard/PlaylistSkeleton';
import styles from './PlaylistGrid.module.scss';

interface Props {
    title?: string;
    playlists: Playlist[];
    loading?: boolean;
    onPlaylistClick?: (slug: string) => void;
}

const PlaylistGrid: React.FC<Props> = ({ 
    title, 
    playlists, 
    loading = false, 
    onPlaylistClick 
}) => {
    if (loading && playlists.length === 0) {
        return (
            <div className={styles.gridSection}>
                {title && <h2 className={styles.title}>{title}</h2>}
                <div className={styles.gridContainer}>
                    {[...Array(8)].map((_, idx) => (
                        <div key={idx} className={styles.gridItem}>
                            <PlaylistSkeleton />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!loading && playlists.length === 0) {
        return null;
    }

    return (
        <div className={styles.gridSection}>
            {title && <h2 className={styles.title}>{title}</h2>}
            <div className={styles.gridContainer}>
                {playlists.map((playlist) => (
                    <div key={playlist.id} className={styles.gridItem}>
                        <PlaylistCard 
                            playlist={playlist} 
                            onClick={onPlaylistClick} 
                        />
                    </div>
                ))}
                {loading && (
                    [...Array(4)].map((_, idx) => (
                        <div key={`loading-${idx}`} className={styles.gridItem}>
                            <PlaylistSkeleton />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PlaylistGrid;
