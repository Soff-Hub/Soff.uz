import React, { useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
    PlayCircleFilled,
    ClockCircleOutlined,
    PlaySquareOutlined,
    GlobalOutlined,
    SafetyCertificateOutlined,
    MobileOutlined,
    HistoryOutlined,
    RightOutlined,
    SettingOutlined,
    CheckOutlined,
    CloseOutlined,
    LockOutlined
} from '@ant-design/icons';
import { Collapse, message, Spin, Modal, Dropdown, Menu } from 'antd';
import * as cookie from 'cookie';
import Hls from 'hls.js';

import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { baseUrl } from '~/repositories/Repository';
import { PlaylistDetail, PlaylistGroup } from '~/features/videos/model/types';
import useCart from '~/shared/hooks/useCart';
import AuthModal from '~/features/auth/ui/auth-modal';

import styles from './PlaylistDetail.module.scss';

const { Panel } = Collapse;

interface Props {
    playlist: PlaylistDetail;
}

const PlaylistDetailSkeleton = () => (
    <div className="container py-5 text-center">
        <Spin size="large" />
    </div>
);

const PlaylistDetailPage: React.FC<Props> = ({ playlist }) => {
    const router = useRouter();
    const { 
        playlistCartItems, 
        setPlaylistCartOneItem, 
        removePlaylistCartOneItem 
    } = useCart();
    const token = useSelector((state: any) => state.auth.user?.access);
    const isLoggedIn = !!token;

    const [authModal, setAuthModal] = useState(false);

    // Playlist Cart state
    const isAddedToCart = useMemo(() => {
        return playlistCartItems?.some((item: any) => Number(item.id) === Number(playlist?.id));
    }, [playlistCartItems, playlist?.id]);

    // Video Player State
    const [showVideo, setShowVideo] = useState(false);
    const [activeVideo, setActiveVideo] = useState<any>(null);
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
    const [qualityLevels, setQualityLevels] = useState<any[]>([]);
    const [currentQuality, setCurrentQuality] = useState<number>(-1);
    const [activeHeight, setActiveHeight] = useState<number | null>(null);
    const [limitReached, setLimitReached] = useState(false);
    const hlsRef = React.useRef<Hls | null>(null);

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const totalLessons = useMemo(() => {
        return playlist?.playlist_groups?.reduce((acc, group) => acc + group.videos.length, 0) || 0;
    }, [playlist]);

    const allPlaylistVideos = useMemo(() => {
        return playlist?.playlist_groups?.flatMap(group => group.videos) || [];
    }, [playlist]);

    const handleLessonActions = (video: any) => {
        setActiveVideo(video);
        setLimitReached(false);
        setShowVideo(true);
    };

    const handleBuyNow = () => {
        if (!isLoggedIn) {
            setAuthModal(true);
            return;
        }

        const playlistWithSlug = { 
            ...playlist, 
            slug: playlist.slug || (router.query.slug as string) 
        };

        if (!isAddedToCart) {
            setPlaylistCartOneItem(playlistWithSlug);
        }
        router.push(`/account/checkout?id=${playlist.id}&type=playlist`);
    };

    const handleAddToCart = () => {
        // Ensure slug is present even if SSR injection failed or data was stale
        const playlistWithSlug = { 
            ...playlist, 
            slug: playlist.slug || (router.query.slug as string) 
        };

        if (isAddedToCart) {
            removePlaylistCartOneItem(playlist.id);
            message.success('Savatdan olib tashlandi');
        } else {
            setPlaylistCartOneItem(playlistWithSlug);
            message.success('Savatga qo\'shildi');
        }
    };

    // Video Player Effect
    React.useEffect(() => {
        if (!showVideo || !videoElement || !activeVideo) return;

        // Determination of URL: file_url for owners/free, short_content_url for preview
        const hasFullAccess = !!activeVideo.document.file_url || playlist.is_purchased_playlist;
        const videoSrc = hasFullAccess 
            ? activeVideo.document.file_url || activeVideo.document.short_content_url
            : activeVideo.document.short_content_url;

        if (!videoSrc) return;

        if (hlsRef.current) {
            hlsRef.current.destroy();
            hlsRef.current = null;
        }

        if (Hls.isSupported()) {
            const hls = new Hls({
                xhrSetup: (xhr, url) => {
                    let finalUrl = url;
                    if (url.includes('/video-key/')) {
                        const base = process.env.NEXT_PUBLIC_BASE_URL || '';
                        const match = url.match(/\/api\/v1\/.*/);
                        if (match) finalUrl = `${base}${match[0]}`;
                    }
                    xhr.open('GET', finalUrl);
                    if (finalUrl.includes('/video-key/') && token) {
                        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                    }
                }
            });

            hls.loadSource(videoSrc);
            hls.attachMedia(videoElement);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setQualityLevels(hls.levels);
                videoElement.play().catch(console.error);
            });

            hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
                const level = hls.levels[data.level];
                if (level) setActiveHeight(level.height);
            });

            hlsRef.current = hls;
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            videoElement.src = videoSrc;
            videoElement.play().catch(console.error);
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [showVideo, videoElement, activeVideo, token, playlist.is_purchased_playlist]);

    if (!playlist) return <PlaylistDetailSkeleton />;

    return (
        <>
            <Meta
                title={`${playlist?.title || 'Playlist'} | Soff.uz`}
                description={playlist?.description?.replace(/<[^>]*>/g, '')?.slice(0, 160)}
                image={playlist?.image}
            />
            <PageContainer>
                <div className={styles.playlistDetail}>
                    {/* Hero Section */}
                    <section
                        className={styles.hero}
                        style={{
                            backgroundImage: `linear-gradient(rgba(28, 29, 31, 0.9), rgba(28, 29, 31, 0.95)), url(${playlist.image})`
                        }}
                    >
                        <div className="container">
                            <div className={styles.heroWrapper}>
                                <div className={styles.heroContent}>
                                    <h1 className={styles.title}>{playlist.title}</h1>
                                    <p className={styles.description}>
                                        {playlist.description.slice(0, 200)}...
                                    </p>
                                    <div className="d-flex align-items-center gap-3 mt-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <PlaySquareOutlined style={{ color: '#2ecc71' }} />
                                            <span>{totalLessons} ta dars</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <ClockCircleOutlined style={{ color: '#2ecc71' }} />
                                            <span>Oxirgi yangilanish: Fevral 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="container">
                        <div className={styles.mainSection}>
                            <div className={styles.contentGrid}>
                                {/* Left Side: Course Content */}
                                <div className={styles.infoColumn}>
                                    <div className="mb-5">
                                        <h2 className={styles.sectionTitle}>Kurs mazmuni</h2>
                                        <div className={styles.accordion}>
                                            <Collapse
                                                ghost
                                                expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} />}
                                                defaultActiveKey={['0']}
                                            >
                                                {playlist.playlist_groups.map((group, groupIdx) => (
                                                    <Panel
                                                        header={
                                                            <div className="w-100 d-flex justify-content-between align-items-center pr-3">
                                                                <span style={{ fontWeight: 700 }}>{group.title}</span>
                                                                <span style={{ fontSize: '14px', color: '#6a6f73' }}>
                                                                    {group.videos.length} ta dars
                                                                </span>
                                                            </div>
                                                        }
                                                        key={groupIdx}
                                                    >
                                                        <div className={styles.groupContent}>
                                                            {group.videos.map((video, videoIdx) => (
                                                                <div
                                                                    key={videoIdx}
                                                                    className={`${styles.lessonItem} ${activeVideo?.id === video.id ? styles.active : ''}`}
                                                                    onClick={() => handleLessonActions(video)}
                                                                >
                                                                    <div className={styles.lessonInfo}>
                                                                        <PlayCircleFilled className={styles.playIcon} />
                                                                        <span className={styles.lessonTitle}>{video.title}</span>
                                                                    </div>
                                                                    <div className={styles.lessonMeta}>
                                                                        {video.document.content_duration}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <h2 className={styles.sectionTitle}>Tavsif</h2>
                                        <div
                                            className="description-content"
                                            dangerouslySetInnerHTML={{ __html: playlist.description }}
                                            style={{ lineHeight: '1.6', fontSize: '16px' }}
                                        />
                                    </div>
                                </div>

                                {/* Right Side: Sidebar */}
                                <aside className={styles.sidebarColumn}>
                                    <div className={styles.sidebarCard}>
                                        <div 
                                            className={styles.imageWrapper}
                                            onClick={() => {
                                                const firstVideo = allPlaylistVideos?.[0];
                                                if (firstVideo) handleLessonActions(firstVideo);
                                            }}
                                        >
                                            <img src={playlist.image} alt={playlist.title} />
                                            <div className={styles.overlay}>
                                                <PlayCircleFilled />
                                            </div>
                                        </div>

                                        <div className={styles.cardBody}>
                                            <div className={styles.priceSection}>
                                                {playlist.is_purchased_playlist ? (
                                                    <span className={styles.price}>Sizning kursingiz</span>
                                                ) : (
                                                    <span className={styles.price}>{formatPrice(playlist.price)} UZS</span>
                                                )}
                                            </div>

                                            {playlist.is_purchased_playlist ? (
                                                <button
                                                    className={styles.btnBuy}
                                                    onClick={() => {
                                                        const firstVideo = playlist.playlist_groups?.[0]?.videos?.[0];
                                                        if (firstVideo) router.push(`/product/${firstVideo.slug}`);
                                                    }}
                                                >
                                                    Darsni boshlash
                                                </button>
                                            ) : (
                                                <>
                                                    <button className={styles.btnBuy} onClick={handleBuyNow}>
                                                        Hozir sotib olish
                                                    </button>
                                                    <button 
                                                        className={`${styles.btnCart} ${isAddedToCart ? styles.inCart : ''}`} 
                                                        onClick={handleAddToCart}
                                                    >
                                                        {isAddedToCart ? "Savatdan olish" : "Savatga qo'shish"}
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        <div className={styles.cardFooter}>
                                            <h4>Bu kurs o'z ichiga oladi:</h4>
                                            <ul>
                                                <li><PlaySquareOutlined /> {totalLessons} ta video darsliklar</li>
                                                <li><HistoryOutlined /> Umrbod foydalanish imkoniyati</li>
                                                <li><MobileOutlined /> Mobil va TV orqali ko'rish</li>
                                            </ul>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>

            <Modal
                open={showVideo}
                onCancel={() => {
                    setShowVideo(false);
                    setLimitReached(false);
                }}
                footer={null}
                centered
                width={850}
                className={styles.previewModal}
                bodyStyle={{ padding: 0, backgroundColor: '#1c1d1f', overflow: 'hidden' }}
                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
                destroyOnClose
                closeIcon={<CloseOutlined style={{ color: '#fff', fontSize: '18px' }} />}
            >
                <div className={styles.modalContent}>
                    
                    <div className={styles.modalHeader}>
                        <p className={styles.previewLabel}>Playlist darslari</p>
                        <h2 className={styles.previewTitle}>{activeVideo?.title}</h2>
                    </div>

                    <div className={styles.playerSection}>
                        <video
                            ref={setVideoElement}
                            controls
                            autoPlay
                            controlsList="nodownload"
                            poster={activeVideo?.poster_url}
                             onEnded={() => {
                                // Simply end the preview
                            }}
                        >
                            Brauzeringiz videoni qo'llab-quvvatlamaydi.
                        </video>

                        {/* Quality Selector - Only for purchased content */}
                        {(playlist.is_purchased_playlist || activeVideo?.document?.file_url) && qualityLevels.length > 0 && (
                            <div className={styles.qualityOverlay}>
                                <Dropdown
                                    overlay={
                                        <Menu theme="dark" className={styles.qualityMenu}>
                                            <Menu.Item 
                                                key="auto" 
                                                onClick={() => {
                                                    if (hlsRef.current) hlsRef.current.currentLevel = -1;
                                                    setCurrentQuality(-1);
                                                }}
                                                className={currentQuality === -1 ? styles.activeItem : ''}
                                            >
                                                Auto {currentQuality === -1 && activeHeight ? `(${activeHeight}p)` : ''}
                                                {currentQuality === -1 && <CheckOutlined className={styles.checkIcon} />}
                                            </Menu.Item>
                                            {qualityLevels.map((lvl, idx) => (
                                                <Menu.Item 
                                                    key={idx}
                                                    onClick={() => {
                                                        if (hlsRef.current) hlsRef.current.currentLevel = idx;
                                                        setCurrentQuality(idx);
                                                        setActiveHeight(lvl.height);
                                                    }}
                                                    className={currentQuality === idx ? styles.activeItem : ''}
                                                >
                                                    {lvl.height}p
                                                    {currentQuality === idx && <CheckOutlined className={styles.checkIcon} />}
                                                </Menu.Item>
                                            ))}
                                        </Menu>
                                    }
                                    trigger={['click']}
                                    placement="topRight"
                                >
                                    <div className={styles.qualityBtn}>
                                        <SettingOutlined />
                                        <span>
                                            {currentQuality === -1 ? (activeHeight ? `${activeHeight}p` : 'Auto') : `${qualityLevels[currentQuality]?.height}p`}
                                        </span>
                                    </div>
                                </Dropdown>
                            </div>
                        )}
                    </div>

                    <div className={styles.playlistDrawer}>
                        <h3 className={styles.drawerTitle}>Playlist darslari:</h3>
                        <div className={styles.drawerList}>
                            {allPlaylistVideos.map((video, idx) => (
                                <div 
                                    key={idx}
                                    className={`${styles.drawerItem} ${activeVideo?.id === video.id ? styles.active : ''}`}
                                    onClick={() => handleLessonActions(video)}
                                >
                                    <div className={styles.drawerThumb}>
                                        <img src={video.poster_url} alt={video.title} />
                                        <div className={styles.playIconOverlay}><PlayCircleFilled /></div>
                                    </div>
                                    <div className={styles.drawerInfo}>
                                        <p className={styles.drawerName}>{video.title}</p>
                                        <span className={styles.drawerMeta}>{video.document.content_duration}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
            <AuthModal
                open={authModal}
                onClose={() => setAuthModal(false)}
                slug={playlist.id.toString()}
                onGoogleSuccessNavigateTo={`/account/checkout?id=${playlist.id}&type=playlist`}
                onSuccess={() => {
                    setAuthModal(false);
                    handleBuyNow();
                }}
            />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const slug = params?.slug as string;
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    const headers: Record<string, string> = {
        'Accept': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${baseUrl}customer/playlist/${slug}/`, {
            headers,
        });

        if (!response.ok) {
            return { notFound: true };
        }

        const playlist = await response.json();

        return {
            props: {
                playlist: { ...playlist, slug },
            },
        };
    } catch (error) {
        console.error('Error fetching playlist detail:', error);
        return { notFound: true };
    }
};

export default PlaylistDetailPage;