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
    ShoppingCartOutlined,
    DeleteOutlined
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

const CommentList = dynamic(() => import('~/features/comments/ui/commentList'), { ssr: false });
const CommentFormWrapper = dynamic(() => import('~/features/comments/ui/commentWrapper'), { ssr: false });

interface Props {
    video: VideoDetail;
}

const VideoDetails: React.FC<Props> = ({ video }) => {
    const router = useRouter();
    const { cartItems, setCartOneItem, removeCartOneItem } = useCart();
    const { wishlist, addSavedItem, removeSavedItem } = useWishlist();
    const isLoggedIn = useSelector((state: any) => !!state.auth.user?.access);

    const [showVideo, setShowVideo] = useState(false);
    const [authModal, setAuthModal] = useState(false);

    const isAddedToCart = cartItems?.some((item: any) => Number(item.id) === Number(video.id));
    const isAddedToWishlist = wishlist?.some((item: any) => Number(item.id) === Number(video.id));
    const hasAccess = !!video.document.file_url;
    const isFree = video.price === 0;

    const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const formattedPrice = isFree ? 'Bepul' : `${formatNumber(video.price)} UZS`;

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
            setShowVideo(true);
        } else {
            setCartOneItem(video.id);
            if (isLoggedIn) {
                router.push(`/account/checkout?id=${video.id}`);
            } else {
                setAuthModal(true);
            }
        }
    };

    const handlePreviewClick = () => {
        if (hasAccess) {
            setShowVideo(true);
        } else {
            message.info('To\'liq videoni ko\'rish uchun mahsulotni sotib oling');
        }
    };

    return (
        <div className={styles.detailPage}>
            {/* 1. Hero Section */}
            <section
                className={styles.hero}
                style={{ backgroundImage: `url(${video.poster_url})` }}
            >
                <div className="container">
                    <div className={styles.heroWrapper}>
                        <div className={styles.heroContent}>
                            <div className={styles.breadcrumb}>
                                <Link href="/video-lessons">
                                    <a>Video darslar</a>
                                </Link>
                                <span>/</span>
                                <Link href={`/video-lessons/category/${video.category.slug}`}>
                                    <a>{categoryName}</a>
                                </Link>
                            </div>

                            <h1 className={styles.title}>{video.title}</h1>

                            <div className={styles.meta}>
                                <div className={styles.viewCount} suppressHydrationWarning>
                                    <EyeOutlined /> {formatNumber(video.view_count)} marta ko'rilgan
                                </div>
                                {video.sold_count > 0 && (
                                    <div className={styles.soldCount} suppressHydrationWarning>
                                        <ShoppingCartOutlined /> {formatNumber(video.sold_count)} marta sotib olingan
                                    </div>
                                )}
                            </div>

                            <div className={styles.authorInfo}>
                                <span>Muallif: </span>
                                <Link href={`/seller/${video.seller.id}`}>
                                    <a className={styles.authorName}>
                                        {video.seller.first_name} {video.seller.last_name}
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className={styles.heroPlayBtn} onClick={handlePreviewClick}>
                            <div className={styles.playIconWrapper}>
                                <PlayCircleFilled />
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
                                        <span className={styles.label}>Tasdiqlangan darslar</span>
                                        <span className={styles.value}>{video.seller.total_approved_documents}</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <span className={styles.label}>Sotilgan darslar</span>
                                        <span className={styles.value}>{video.seller.total_sold_documents}</span>
                                    </div>
                                </div>
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
                                        <span>Kursni ko'rish</span>
                                    </div>
                                </div>

                                <div className={styles.priceInfo}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className={styles.price} suppressHydrationWarning>{formattedPrice}</span>
                                        <button
                                            className={`${styles.wishlistBtn} ${isAddedToWishlist ? styles.active : ''}`}
                                            onClick={handleAddToWishlist}
                                        >
                                            {isAddedToWishlist ? <HeartFilled /> : <HeartOutlined />}
                                        </button>
                                    </div>

                                    <div className={styles.buttons}>
                                        <button
                                            className={styles.btnPrimary}
                                            onClick={handleStartOrBuy}
                                        >
                                            {hasAccess ? (isFree ? "Darsni boshlash" : "Kursni ko'rish") : (isFree ? "Darsni boshlash" : "Hozir sotib olish")}
                                        </button>
                                        {!hasAccess && !isFree && (
                                            <button
                                                className={`${styles.btnSecondary} ${isAddedToCart ? styles.inCart : ''}`}
                                                onClick={handleAddToCart}
                                            >
                                                {isAddedToCart ? <DeleteOutlined /> : <ShoppingCartOutlined />}
                                                {isAddedToCart ? "Savatdan olish" : "Savatga qo'shish"}
                                            </button>
                                        )}
                                    </div>

                                    <div className={styles.featuresList}>
                                        <h4 className={styles.listTitle}>Kurs o'z ichiga oladi:</h4>

                                        <div className={styles.featureItem} suppressHydrationWarning>
                                            <PlaySquareOutlined />
                                            <span>{video.document.content_duration} video darslar</span>
                                        </div>

                                        <div className={styles.featureItem}>
                                            <ClockCircleOutlined />
                                            <span>Umrbod foydalanish imkoniyati</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                <div className="mt-5" style={{ marginBottom: '32px' }}>
                    <CommentFormWrapper
                        id={video.id}
                        slug={video.slug}
                    />
                    <CommentList slug={video.slug} id={video.id} />
                </div>

                {/* Related Sections - Lazy Loaded */}
                <div className="py-5">
                    <SellerMoreVideos
                        sellerId={video.seller.id}
                        currentVideoId={video.id}
                    />
                    <PurchaseRecommendations slug={video.slug} />
                    <SimilarVideos slug={video.slug} />
                </div>
            </div>

            {/* Video Preview Modal (Ant Design) */}
            <Modal
                open={showVideo}
                onCancel={() => setShowVideo(false)}
                footer={null}
                centered
                width={700}
                className={styles.previewModal}
                wrapClassName={styles.previewModalWrapper}
                bodyStyle={{ padding: 0, backgroundColor: '#1c1d1f', overflow: 'hidden' }}
                destroyOnClose
                closeIcon={<CloseOutlined style={{ color: '#fff', fontSize: '18px' }} />}
            >
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <p className={styles.previewLabel}>Kurs preview</p>
                        <h2 className={styles.previewTitle}>{video.title}</h2>
                    </div>

                    <div className={styles.videoWrapper}>
                        <video
                            controls
                            autoPlay
                            src={video.document.file_url || video.document.short_content_url}
                            controlsList="nodownload"
                            poster={video.poster_url}
                        >
                            Sizning brauzeringiz video qo'llab-quvvatlamaydi.
                        </video>
                    </div>

                    <div className={styles.sampleSection}>
                        <h3 className={styles.sampleTitle}>Bepul darslar:</h3>
                        <div className={`${styles.sampleItem} ${styles.active}`}>
                            <div className={styles.sampleThumbnail}>
                                <img src={video.poster_url} alt={video.title} />
                                <div className={styles.samplePlayOverlay}>
                                    <PlayCircleFilled />
                                </div>
                            </div>
                            <div className={styles.sampleInfo}>
                                <p className={styles.sampleName}>{video.title}</p>
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
