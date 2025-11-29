import React, { useState, useMemo } from 'react';
import { FaPlay } from 'react-icons/fa';
import styles from './youtube-vid.module.scss';
import VideoModal from './VideoModal';

// Helper function to extract YouTube video ID from URL or return the ID if already provided
const getYouTubeVideoId = (urlOrId) => {
    if (!urlOrId) return null;

    // If it's already just an ID (no special characters except alphanumeric, dash, underscore)
    if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
        return urlOrId;
    }

    // Try to extract from various YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
        const match = urlOrId.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
};

function YoutubeVid({
    videoId = 'dQw4w9WgXcQ',
    text = 'SHOWREEL • SHOWREEL • SHOWREEL • SHOWREEL • SHOWREEL •',
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Extract video ID from URL or use provided ID
    const extractedVideoId = useMemo(
        () => getYouTubeVideoId(videoId),
        [videoId]
    );

    // Ensure text repeats for smooth circular animation
    const repeatedText = text.trim() + ' ';

    const handleClick = () => {
        if (extractedVideoId) {
            setIsModalOpen(true);
        } else {
            console.warn(
                'YoutubeVid: No videoId provided. Please pass a videoId prop.',
                { videoId, extractedVideoId }
            );
            // Still open modal for testing, but show a message
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <button onClick={handleClick} className={styles.animatedButton}>
                {/* Outer rotating ring with text */}
                <div className={styles.rotatingRing}>
                    <svg className={styles.svgRing} viewBox="0 0 128 128">
                        <defs>
                            <path
                                id="circlePath"
                                d="M 64, 64 m -58, 0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
                            />
                        </defs>
                        <text className={styles.rotatingText}>
                            <textPath href="#circlePath" startOffset="0">
                                {repeatedText}
                            </textPath>
                        </text>
                    </svg>
                </div>

                {/* Pulsing background circle */}
                <div className={styles.pulsingBackground} />

                {/* Main button circle */}
                <div className={styles.mainButton}>
                    {/* Play icon */}
                    <div className={styles.playIconWrapper}>
                        <FaPlay className={styles.playIcon} />
                    </div>
                </div>

                {/* Decorative rings */}
                <div className={styles.decorativeRing} />
            </button>

            <VideoModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                videoId={extractedVideoId || undefined}
            />
        </div>
    );
}

export default YoutubeVid;
