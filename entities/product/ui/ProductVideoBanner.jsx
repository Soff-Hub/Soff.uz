import React, { useState, useMemo } from 'react';
import { FaPlay, FaQuestionCircle } from 'react-icons/fa';
import VideoModal from '~/widgets/home/youtube-vid/VideoModal';
import { useContentViewport } from '~/shared/hooks/useContentViewport';
import styles from './ProductVideoBanner.module.scss';
import buttonStyles from '~/widgets/home/youtube-vid/youtube-vid.module.scss';

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (urlOrId) => {
    if (!urlOrId) return null;

    // If it's already just an ID
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

function ProductVideoBanner({
    videoUrl = 'https://www.youtube.com/watch?v=oJre9mbRE2U',
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { headerHeight } = useContentViewport();

    // Extract video ID from URL
    const extractedVideoId = useMemo(
        () => getYouTubeVideoId(videoUrl),
        [videoUrl]
    );

    const handleClick = () => {
        if (extractedVideoId) {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Desktop Banner */}
            <div
                className={styles.banner}
                onClick={handleClick}
                style={{ top: `${headerHeight}px` }}>
                <div className={styles.bannerContent}>
                    <div className={styles.iconWrapper}>
                        <FaQuestionCircle className={styles.questionIcon} />
                    </div>
                    <div className={styles.textContent}>
                        <h3 className={styles.title}>
                            SOFF'da xarid qilishni bilmayapsizmi?
                        </h3>
                        <p className={styles.subtitle}>
                            Taxminan 1 daqiqalik video: mahsulotni qanday sotib
                            olishni ko'rsatadi.
                        </p>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClick();
                            }}
                            className={buttonStyles.animatedButton}
                            style={{
                                margin: 0,
                                width: '60px',
                                height: '60px',
                            }}>
                            {/* Pulsing background circle */}
                            <div className={buttonStyles.pulsingBackground} />

                            {/* Main button circle */}
                            <div
                                className={buttonStyles.mainButton}
                                style={{ inset: '6px' }}>
                                {/* Play icon */}
                                <div className={buttonStyles.playIconWrapper}>
                                    <FaPlay
                                        className={buttonStyles.playIcon}
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Decorative rings */}
                            <div className={buttonStyles.decorativeRing} />
                        </button>
                    </div>
                </div>
            </div>

            <VideoModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                videoId={extractedVideoId || undefined}
            />
        </>
    );
}

export default ProductVideoBanner;
