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
    RightOutlined
} from '@ant-design/icons';
import { Collapse, message, Spin } from 'antd';
import * as cookie from 'cookie';

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
    const { cartItems, setCartOneItem } = useCart();
    const token = useSelector((state: any) => state.auth.user?.access);
    const isLoggedIn = !!token;

    const [authModal, setAuthModal] = useState(false);

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const totalLessons = useMemo(() => {
        return playlist?.playlist_groups?.reduce((acc, group) => acc + group.videos.length, 0) || 0;
    }, [playlist]);

    const handleBuyNow = () => {
        if (!isLoggedIn) {
            setAuthModal(true);
            return;
        }
        setCartOneItem(playlist.id);
        router.push(`/account/checkout?id=${playlist.id}&type=playlist`);
    };

    const handleAddToCart = () => {
        setCartOneItem(playlist.id);
        message.success('Savatga qo\'shildi');
    };

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
                                                                    className={styles.lessonItem}
                                                                    onClick={() => router.push(`/product/${video.slug}`)}
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
                                        <div className={styles.imageWrapper}>
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
                                                    <button className={styles.btnCart} onClick={handleAddToCart}>
                                                        Savatga qo'shish
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
                playlist,
            },
        };
    } catch (error) {
        console.error('Error fetching playlist detail:', error);
        return { notFound: true };
    }
};

export default PlaylistDetailPage;