import { FloatButton } from 'antd';
import { QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import useResponsive from '~/shared/utilities/useResponsive';
import { useRouter } from 'next/router';
import { useState, useMemo, useEffect, useRef } from 'react';
import VideoModal from '~/shared/ui/video-modal';
import { MdOndemandVideo } from 'react-icons/md';
import { getYouTubeVideoId } from '~/shared/utilities/youtube-helpers';
import { FaHeadset } from 'react-icons/fa';
import { MODERATOR_ID } from '~/shared/constants';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { FaRegPaperPlane } from 'react-icons/fa6';

const disabledLocations = ['/chat', '/auth', 'shopping-cart', 'search-page'];

const VIDEO_URL_BUY_PRODUCT = 'https://www.youtube.com/watch?v=oJre9mbRE2U';
const VIDEO_URL_ORDER_CREATE =
    'https://youtu.be/qy38WGhOq3Q?si=0y_oSKS1WRiSJ4G5';

export function TelegramLink({ videoUrl }) {
    const { t } = useTranslation('common');
    const { isMobile, isTablet } = useResponsive();
    const router = useRouter();
    const user = useSelector((state) => state.auth.user);
    const axios = axiosInstance(user?.access);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isGroupOpen, setIsGroupOpen] = useState(false);
    const { mutateAsync: createChat } = useMutation({
        mutationFn: async (id) => {
            const formData = new FormData();
            formData.append('participant_id', String(id));

            const { data } = await axios.post('chats/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        },
    });
    const isLoggedIn = !!user;
    const location = router.pathname;
    const asPath = router.asPath;

    const isProductPage =
        location.includes('/product/') || asPath.includes('/product/');
    const isOrderCreatePage = location.includes('/order/create');

    const finalVideoUrl = isProductPage
        ? VIDEO_URL_BUY_PRODUCT
        : isOrderCreatePage
          ? VIDEO_URL_ORDER_CREATE
          : videoUrl;

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

    const handleSupportClick = async () => {
        if (!isLoggedIn) return;
        try {
            setIsGroupOpen(false);
            const data = await createChat(MODERATOR_ID);
            router.push(
                `/chat?chatId=${data?.chat_id}&opponent_id=${MODERATOR_ID}`
            );
        } catch (error) {
            console.error(t('telegramLink.errorCreatingSupportChat'), error);
        }
    };

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

    return (
        <>
            <div ref={groupRef} className={styles.floatButtonGroup}>
                <FloatButton
                    className={styles.floatButton}
                    type="primary"
                    aria-label="Yordam va savollar"
                    icon={
                        isGroupOpen ? (
                            <CloseOutlined fontSize={25} />
                        ) : (
                            <FaRegPaperPlane />
                        )
                    }
                    onClick={() => setIsGroupOpen(!isGroupOpen)}
                    style={{
                        bottom: isTablet ? '60px' : isMobile ? '70px' : '20px',
                    }}
                />

                <div
                    className={`${styles.customButtonsContainer} ${
                        !isGroupOpen ? styles.closing : ''
                    }`}
                    style={{
                        pointerEvents: isGroupOpen ? 'auto' : 'none',
                        zIndex: isGroupOpen ? 1 : -1,
                    }}>
                    {(isOrderCreatePage || isProductPage) && (
                        <div
                            className={styles.customFloatButton}
                            onClick={() => {
                                handleVideoClick();
                                setIsGroupOpen(false);
                            }}
                            role="button"
                            aria-label="Video ko'rsatma"
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
                                {isOrderCreatePage
                                    ? t('telegramLink.howToPlaceOrder')
                                    : t('telegramLink.howToPurchase')}
                            </span>
                        </div>
                    )}
                    <div
                        className={`${styles.customFloatButton} ${
                            !isLoggedIn ? styles.disabled : ''
                        }`}
                        onClick={handleSupportClick}
                        role="button"
                        aria-label="Support bilan suhbat"
                        tabIndex={0}
                        style={{
                            opacity: !isLoggedIn || !isGroupOpen ? 0.5 : 1,
                            cursor:
                                !isLoggedIn || !isGroupOpen
                                    ? 'not-allowed'
                                    : 'pointer',
                            pointerEvents:
                                !isLoggedIn || !isGroupOpen ? 'none' : 'auto',
                        }}
                        onKeyPress={(e) => {
                            if (
                                (e.key === 'Enter' || e.key === ' ') &&
                                isLoggedIn
                            ) {
                                handleSupportClick();
                            }
                        }}>
                        <div className={styles.iconCircle}>
                            <FaHeadset />
                        </div>
                        <span className={styles.buttonText}>
                            {t('telegramLink.chatWithSupport')}
                        </span>
                    </div>
                    <a
                        href="https://t.me/+M1nwGXAYMzhhNDAy"
                        target="_blank"
                        aria-label="Telegram kanaliga o\'tish"
                        rel="noopener noreferrer"
                        className={styles.customFloatButton}
                        onClick={() => setIsGroupOpen(false)}>
                        <div className={styles.iconCircle}>
                            <FaRegPaperPlane />
                        </div>
                        <span className={styles.buttonText}>
                            {t('telegramLink.telegram')}
                        </span>
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
