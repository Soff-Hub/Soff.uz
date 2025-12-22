import React, { useState, useMemo } from 'react';
import { FaPlay } from 'react-icons/fa';
import styles from '~/shared/styles/playButton.module.scss';
import VideoModal from '~/shared/ui/video-modal';
import { getYouTubeVideoId } from '~/shared/utilities/extract-video-id';

type YoutubeVidProps = {
    videoId?: string;
    text?: string;
};

function YoutubeVid({ videoId }: YoutubeVidProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const extractedVideoId = useMemo(
        () => getYouTubeVideoId(videoId),
        [videoId]
    );

    const handleClick = () => {
        if (extractedVideoId) {
            setIsModalOpen(true);
        } else {
            console.warn(
                'YoutubeVid: No videoId provided. Please pass a videoId prop.',
                { videoId, extractedVideoId }
            );
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <button onClick={handleClick} className={styles.animatedButton}>
                <div className={styles.rotatingRing}>
                    <svg className={styles.svgRing} viewBox="0 0 128 128">
                        <defs>
                            <path
                                id="circlePath"
                                d="M 64, 64 m -58, 0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
                            />
                        </defs>
                    </svg>
                </div>

                <div className={styles.pulsingBackground} />

                <div className={styles.mainButton}>
                    <div className={styles.playIconWrapper}>
                        <FaPlay className={styles.playIcon} />
                    </div>
                </div>

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
