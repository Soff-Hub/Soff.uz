import React, { useState, useMemo } from 'react';
import { FaPlay, FaQuestionCircle } from 'react-icons/fa';
import VideoModal from '~/shared/ui/video-modal';
import { useViewportContext } from '~/shared/hooks/useViewportContext';
import { getYouTubeVideoId } from '~/shared/utilities/extract-video-id';
import styles from './ProductVideoBanner.module.scss';
import buttonStyles from '~/shared/styles/playButton.module.scss';

type ProductVideoBannerProps = {
    videoUrl?: string;
    title: string;
    subtitle: string;
};

function ProductVideoBanner({
    videoUrl,
    title,
    subtitle,
}: ProductVideoBannerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { headerHeight } = useViewportContext();

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
            <div
                className={styles.banner}
                onClick={handleClick}
                style={{ top: `${headerHeight}px` }}>
                <div className={styles.bannerContent}>
                    <div className={styles.iconWrapper}>
                        <FaQuestionCircle className={styles.questionIcon} />
                    </div>
                    <div className={styles.textContent}>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.subtitle}>{subtitle}</p>
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
                            <div className={buttonStyles.pulsingBackground} />

                            <div
                                className={buttonStyles.mainButton}
                                style={{ inset: '6px' }}>
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
