import Link from 'next/link';
import { FloatButton } from 'antd';
import {
    CustomerServiceOutlined,
    QuestionCircleOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import styles from './style.module.scss';
import useResponsive from '~/shared/utilities/useResponsive';
import { useRouter } from 'next/router';
import { useState, useMemo, useEffect, useRef } from 'react';
import VideoModal from '~/widgets/home/youtube-vid/VideoModal';
import { MdOndemandVideo } from 'react-icons/md';

const disabledLocations = [
    '/chat',
    '/order/',
    '/auth',
    'shopping-cart',
    'search-page',
];

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (urlOrId) => {
    if (!urlOrId) return null;

    if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
        return urlOrId;
    }

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

const VIDEO_URL = 'https://www.youtube.com/watch?v=oJre9mbRE2U';

export function TelegramLink({ videoUrl }) {
    const { isMobile, isTablet } = useResponsive();
    const router = useRouter();
    const location = router.pathname;
    const asPath = router.asPath;
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isGroupOpen, setIsGroupOpen] = useState(false);
    // Check both pathname (for route pattern) and asPath (for actual URL)
    const isProductPage =
        location.includes('/product/') || asPath.includes('/product/');

    // Use provided videoUrl or default constant
    const finalVideoUrl = videoUrl || VIDEO_URL;

    // Extract video ID from URL
    const extractedVideoId = useMemo(
        () => getYouTubeVideoId(finalVideoUrl),
        [finalVideoUrl]
    );

    const handleVideoClick = () => {
        if (extractedVideoId) {
            setIsVideoModalOpen(true);
        }
    };

    const handleCloseVideoModal = () => {
        setIsVideoModalOpen(false);
    };

    // Click outside handler for closing the group
    const groupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isGroupOpen &&
                groupRef.current &&
                !groupRef.current.contains(event.target)
            ) {
                setIsGroupOpen(false);
            }
        };

        if (isGroupOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isGroupOpen]);

    if (
        disabledLocations.some(
            (path) => location === path || location.includes(path)
        )
    ) {
        return null;
    }

    // Use FloatButton.Group for product pages with speed dial
    if (isProductPage && isMobile) {
        return (
            <>
                <div ref={groupRef} className={styles.floatButtonGroup}>
                    <FloatButton
                        type="primary"
                        icon={
                            isGroupOpen ? (
                                <CloseOutlined />
                            ) : (
                                <QuestionCircleOutlined />
                            )
                        }
                        onClick={() => setIsGroupOpen(!isGroupOpen)}
                        style={{
                            right: 16,
                            bottom: 90,
                        }}
                    />
                    <div
                        className={`${styles.customButtonsContainer} ${
                            !isGroupOpen ? styles.closing : ''
                        }`}
                        style={{
                            pointerEvents: isGroupOpen ? 'auto' : 'none',
                        }}>
                        <div
                            className={styles.customFloatButton}
                            onClick={() => {
                                handleVideoClick();
                                setIsGroupOpen(false);
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleVideoClick();
                                    setIsGroupOpen(false);
                                }
                            }}>
                            <div className={styles.iconCircle}>
                                <MdOndemandVideo />
                            </div>
                            <span className={styles.buttonText}>
                                Xarid qilish
                            </span>
                        </div>
                        <a
                            href="https://t.me/+y5GpvEz48_hkMzli"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.customFloatButton}
                            onClick={() => setIsGroupOpen(false)}>
                            <div className={styles.iconCircle}>
                                <i
                                    className="fa-regular fa-paper-plane"
                                    style={{ fontSize: '16px' }}
                                />
                            </div>
                            <span className={styles.buttonText}>Telegram</span>
                        </a>
                    </div>
                </div>

                <VideoModal
                    isOpen={isVideoModalOpen}
                    onClose={handleCloseVideoModal}
                    videoId={extractedVideoId || undefined}
                />
            </>
        );
    }

    // Default single button for non-product pages or desktop
    return (
        <div
            className={styles.telegramWrapper}
            style={{
                bottom: isTablet ? '60px' : isMobile ? '70px' : '20px',
            }}>
            <Link href="https://t.me/+y5GpvEz48_hkMzli" passHref>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram kanalimizga qo'shilish"
                    className={styles.telegramBtn}>
                    <i
                        className="fa-regular fa-paper-plane"
                        aria-hidden="true"
                    />
                </a>
            </Link>
        </div>
    );
}
