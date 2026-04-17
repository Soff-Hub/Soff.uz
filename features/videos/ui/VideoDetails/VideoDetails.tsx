import React, { useState } from 'react';
import { Modal, message } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
    PlayCircleFilled,
    EyeOutlined,
    PlaySquareOutlined,
    ClockCircleOutlined,
    CloseOutlined,
    HeartOutlined,
    HeartFilled,
    LockOutlined
} from '@ant-design/icons';
import Link from 'next/link';

import useCart from '~/shared/hooks/useCart';
import useWishlist from '~/shared/hooks/useWishlist';
import AuthModal from '~/features/auth/ui/auth-modal';
import { VideoDetail } from '../../model/types';
import PurchaseRecommendations from '../PurchaseRecommendations/PurchaseRecommendations';
import SimilarVideos from '../SimilarVideos/SimilarVideos';
import SellerMoreVideos from '../SellerMoreVideos/SellerMoreVideos';

import styles from './VideoDetails.module.scss';
const PlyrPlayer = dynamic(() => import('../PlyrPlayer/PlyrPlayer'), { ssr: false });

const CommentList = dynamic(() => import('~/features/comments/ui/commentList'), { ssr: false });
const CommentFormWrapper = dynamic(() => import('~/features/comments/ui/commentWrapper'), { ssr: false });

interface Props {
    video: VideoDetail;
}

const VideoDetails: React.FC<Props> = ({ video }) => {
    console.log(video)
    const router = useRouter();
    const { cartItems, setCartOneItem, removeCartOneItem } = useCart();
    const { wishlist, addSavedItem, removeSavedItem } = useWishlist();
    const token = useSelector((state: any) => state.auth.user?.access);
    const isLoggedIn = !!token;

    const [showVideo, setShowVideo] = useState(false);
    const [authModal, setAuthModal] = useState(false);
    const [limitReached, setLimitReached] = useState(false);
    const [isPortrait, setIsPortrait] = useState(false);

    const isAddedToCart = cartItems?.some((item: any) => Number(item.id) === Number(video.id));
    const isAddedToWishlist = wishlist?.some((item: any) => Number(item.id) === Number(video.id));
    const hasAccess = !!video.document.file_url;
    const isFree = video.price === 0;

    const formatNumber = (num: number | undefined | null) => {
        if (num === undefined || num === null) return '0';
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const formattedPrice = isFree ? 'Bepul' : `${formatNumber(video.price)} UZS`;

    const formatDurationDisplay = (duration: string) => {
        if (!duration) return '';

        // If it comes as "8.37s"
        if (duration.toLowerCase().endsWith('s')) {
            const value = duration.slice(0, -1);
            return `${value} soniyalik`;
        }

        // If it comes as HH:MM:SS or MM:SS
        if (duration.includes(':')) {
            const parts = duration.split(':').map(Number);
            if (parts.length === 3) {
                const [h, m, s] = parts;
                let res = [];
                if (h > 0) res.push(`${h} soat`);
                if (m > 0) res.push(`${m} daqiqa`);
                if (s > 0) res.push(`${s} soniya`);
                return res.join(' ') + 'lik';
            }
            if (parts.length === 2) {
                const [m, s] = parts;
                let res = [];
                if (m > 0) res.push(`${m} daqiqa`);
                if (s > 0) res.push(`${s} soniya`);
                return res.join(' ') + 'lik';
            }
        }

        return duration;
    };

    const handleJoinOrBuy = () => {
        setCartOneItem(video.id);
        if (isLoggedIn) {
            router.push(`/account/checkout?id=${video.id}`);
        } else {
            setAuthModal(true);
        }
    };

    const categoryName = video.category.name.includes('|')
        ? video.category.name.split('|').pop()?.trim()
        : video.category.name;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isAddedToCart) {
            removeCartOneItem(video.id);
            message.success('Savatdan olib tashlandi');
        } else {
            setCartOneItem(video.id);
            message.success('Savatga qo\'shildi');
        }
    };

    const handleAddToWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isAddedToWishlist) {
            removeSavedItem(video.id);
        } else {
            addSavedItem(video.id);
        }
    };

    const handleStartOrBuy = (e: React.MouseEvent) => {
        e.preventDefault();
        if (hasAccess) {
            setLimitReached(false);
            setShowVideo(true);
        } else {
            handleJoinOrBuy();
        }
    };

    const handlePreviewClick = () => {
        setLimitReached(false);
        setShowVideo(true);
    };


    console.log(video)

    return (
        <div className={styles.detailPage}>
            {/* Mobile Preview Section - Top on mobile */}
            <div className={styles.mobilePreview} onClick={handlePreviewClick}>
                <img src={video.poster_url} alt={video.title} />
                <div className={styles.playOverlay}>
                    <PlayCircleFilled />
                    <span>Kursni ko'rish</span>
                </div>
            </div>

            {/* Mobile Breadcrumb - Only visible on mobile top */}
            <div className={`${styles.mobileBreadcrumb} container`}>
                <div className={styles.breadcrumb}>
                    <Link href="/video-lessons">
                        <a>Video darslar</a>
                    </Link>
                    <span>/</span>
                    <Link href={`/video-lessons/category/${video.category.slug}`}>
                        <a>{categoryName}</a>
                    </Link>
                </div>
            </div>

            {/* 1. Hero Section */}
            <section
                className={styles.hero}
                style={{
                    backgroundImage: `linear-gradient(rgba(28, 29, 31, 0.85), rgba(28, 29, 31, 0.95)), url(${video.poster_url})`
                }}
            >
                <div className="container">
                    <div className={styles.heroWrapper}>
                        <div className={styles.heroContent}>
                            <div className={`${styles.breadcrumb} ${styles.desktopOnly}`}>
                                <Link href="/video-lessons">
                                    <a>Video darslar</a>
                                </Link>
                                <span>/</span>
                                <Link href={`/video-lessons/category/${video.category.slug}`}>
                                    <a>{categoryName}</a>
                                </Link>
                            </div>

                            <h1 className={styles.title}>{video.title}</h1>
                            <p className={styles.shortDescription}>
                                {video?.description?.replace(/<[^>]*>/g, '').slice(0, 160)}...
                            </p>

                            {video.sold_count > 0 &&
                                <div className={styles.meta}>
                                    <div className={styles.soldCount} suppressHydrationWarning>
                                        {formatNumber(video.sold_count)} o'quvchi
                                    </div>
                                </div>
                            }

                            <div className={styles.authorInfo}>
                                <span>Muallif: </span>
                                <Link href={`/seller/${video.seller.id}`}>
                                    <a className={styles.authorName}>
                                        {video.seller.first_name} {video.seller.last_name}
                                    </a>
                                </Link>
                            </div>

                            <div className={styles.lastUpdate}>
                                <ClockCircleOutlined /> Oxirgi yangilanish: 2024-yil mart
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Main Content & Sidebar */}
            <div className="container py-4">
                <div className={styles.mainContent}>
                    <div className={styles.contentGrid}>
                        {/* Left Side: Info */}
                        <div className={styles.infoSection}>
                            <div className={styles.descriptionCard}>
                                <h2 className={styles.sectionTitle}>Tavsif</h2>
                                <div
                                    className={styles.description}
                                    dangerouslySetInnerHTML={{ __html: video.description }}
                                />
                            </div>

                            {/* Tags */}
                            {video.tag && video.tag.length > 0 && (
                                <div className={styles.tags}>
                                    {video.tag.map(tag => (
                                        <span key={tag.id} className={styles.tag}>
                                            #{tag.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Seller Info */}
                            <div className={styles.sellerCard}>
                                <h2 className={styles.sectionTitle}>Muallif</h2>
                                <Link href={`/seller/${video.seller.id}`}>
                                    <a className={styles.sellerHeader}>
                                        <img
                                            src={video.seller.image_url || `https://ui-avatars.com/api/?name=${video.seller.first_name}+${video.seller.last_name}&background=random`}
                                            alt={video.seller.first_name}
                                            className={styles.avatar}
                                        />
                                        <div>
                                            <h3 className={styles.name}>
                                                {video.seller.first_name} {video.seller.last_name}
                                            </h3>
                                            <p className={styles.sellerTitle}>Mentor / Mutaxassis</p>
                                        </div>
                                    </a>
                                </Link>
                                <div className={styles.sellerStats}>
                                    <div className={styles.statItem}>
                                        <span className={styles.value}>{video.seller.total_approved_documents}</span>
                                        <span className={styles.label}>Tasdiqlangan darslar</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <span className={styles.value}>{video.seller.total_sold_documents}</span>
                                        <span className={styles.label}>Sotilgan darslar</span>
                                    </div>
                                </div>
                            </div>

                            {/* Comments Section - Moved inside for better sticky behavior */}
                            <div className={styles.commentsSection}>
                                <CommentFormWrapper
                                    id={video.id}
                                    slug={video.slug}
                                />
                                <CommentList slug={video.slug} id={video.id} />
                            </div>

                            {/* Related Sections - Moved inside for better sticky behavior */}
                            <div className={styles.relatedSection}>
                                <SellerMoreVideos
                                    sellerId={video.seller.id}
                                    currentVideoId={video.id}
                                />
                                <PurchaseRecommendations slug={video.slug} />
                                <SimilarVideos slug={video.slug} />
                            </div>
                        </div>

                        {/* Right Side: Sidebar */}
                        <aside className={styles.sidebarWrapper}>
                            <div className={styles.stickyCard}>
                                <div
                                    className={styles.preview}
                                    onClick={handlePreviewClick}
                                >
                                    <img src={video.poster_url} alt={video.title} className={styles.poster} />
                                    <div className={styles.playOverlay}>
                                        <PlayCircleFilled />
                                        <span>Preview this course</span>
                                    </div>
                                </div>

                                <div className={styles.priceInfo}>
                                    <div className={styles.priceWrapper}>
                                        <span className={styles.currentPrice} suppressHydrationWarning>{formattedPrice}</span>
                                        {video.discount_price > 0 && video.discount_price !== video.price && (
                                            <span className={styles.oldPrice}>{formatNumber(video.discount_price)} UZS</span>
                                        )}
                                        {video.discount > 0 && <span className={styles.discountBadge}>{video.discount}% off</span>}
                                    </div>

                                    <div className={styles.buttons}>
                                        <button
                                            className={styles.btnPrimary}
                                            onClick={handleStartOrBuy}
                                        >
                                            {hasAccess ? (isFree ? "Darsni boshlash" : "Videoni ko'rish") : (isFree ? "Darsni boshlash" : "Hozir sotib olish")}
                                        </button>
                                        {!hasAccess && !isFree && (
                                            <div className={styles.secondaryActions}>
                                                <button
                                                    className={`${styles.btnSecondary} ${isAddedToCart ? styles.inCart : ''}`}
                                                    onClick={handleAddToCart}
                                                >
                                                    {isAddedToCart ? "Savatdan olish" : "Savatga qo'shish"}
                                                </button>
                                                <button
                                                    className={`${styles.wishlistBtn} ${isAddedToWishlist ? styles.active : ''}`}
                                                    onClick={handleAddToWishlist}
                                                >
                                                    {isAddedToWishlist ? <HeartFilled /> : <HeartOutlined />}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.featuresList}>
                                        <h4 className={styles.listTitle}>Kurs o'z ichiga oladi:</h4>

                                        {video.document.content_duration && (
                                            <div className={styles.featureItem} suppressHydrationWarning>
                                                <PlaySquareOutlined />
                                                <span>{formatDurationDisplay(video.document.content_duration)} video</span>
                                            </div>
                                        )}

                                        <div className={styles.featureItem}>
                                            <ClockCircleOutlined />
                                            <span>Umrbod foydalanish imkoniyati</span>
                                        </div>

                                        <div className={styles.featureItem}>
                                            <EyeOutlined />
                                            <span>{formatNumber(video.view_count)} marta ko'rilgan</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* Sticky Mobile Bottom Bar */}
                {!hasAccess && !isFree && (
                    <div className={styles.stickyMobileActions}>
                        <div className={styles.mobilePriceInfo}>
                            <span className={styles.mobilePrice}>{formattedPrice}</span>
                            {video.discount_price > 0 && (
                                <span className={styles.mobileOldPrice}>{formatNumber(video.discount_price)}</span>
                            )}
                        </div>
                        <button className={styles.mobileBuyBtn} onClick={handleStartOrBuy}>
                            Hozir sotib olish
                        </button>
                    </div>
                )}
            </div>

            {/* Video Preview Modal (Ant Design) */}
            <Modal
                open={showVideo}
                onCancel={() => {
                    setShowVideo(false);
                    setLimitReached(false);
                }}
                footer={null}
                centered
                width={800}
                className={styles.previewModal}
                wrapClassName={styles.previewModalWrapper}
                bodyStyle={{ padding: 0, backgroundColor: '#1c1d1f', overflow: 'hidden' }}
                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
                destroyOnClose
                closeIcon={<CloseOutlined style={{ color: '#fff', fontSize: '18px' }} />}
            >
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <p className={styles.previewLabel}>Kurs preview</p>
                        <h2 className={styles.previewTitle}>{video?.title?.replace(/_/g, ' ')}</h2>
                    </div>

                    <div
                        className={`${styles.videoWrapper} ${isPortrait ? styles.isPortrait : ''}`}
                        style={{ '--poster-url': `url(${video?.poster_url})` } as any}
                    >
                        {showVideo && (
                            <PlyrPlayer
                                key={video.id}
                                videoSrc={video?.document?.file_url || video?.document?.short_content_url}
                                token={token}
                                poster={video?.poster_url}
                                onPortraitStateChange={setIsPortrait}
                                isAccessRestricted={!hasAccess}
                                onBuyClick={handleJoinOrBuy}
                                actualDuration={video.document.content_duration}
                            />
                        )}
                    </div>

                    <div className={styles.sampleSection}>
                        <h3 className={styles.sampleTitle}>Bepul darslar:</h3>
                        <div className={`${styles.sampleItem} ${styles.active}`}>
                            <div className={styles.sampleThumbnail}>
                                <img src={video?.poster_url} alt={video?.title} />
                                <div className={styles.samplePlayOverlay}>
                                    <PlayCircleFilled />
                                </div>
                            </div>
                            <div className={styles.sampleInfo}>
                                <p className={styles.sampleName}>{video?.title?.replace(/_/g, ' ')}</p>
                            </div>
                            {video.document.content_duration && (
                                <div className={styles.sampleDuration}>
                                    {video.document.content_duration}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>

            <AuthModal
                open={authModal}
                onClose={() => setAuthModal(false)}
                slug={video.slug}
                onGoogleSuccessNavigateTo={`/account/checkout?id=${video.id}`}
                onSuccess={() => {
                    router.push(`/account/checkout?id=${video.id}`);
                }}
            />
        </div>
    );
};

export default React.memo(VideoDetails);
