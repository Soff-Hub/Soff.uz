import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Modal } from 'antd';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { fetchVideoBySlug, VideoDetail } from '~/features/videos';

import {
    PlayCircleFilled,
    GlobalOutlined,
    EyeOutlined,
    FireOutlined,
    PlaySquareOutlined,
    ClockCircleOutlined,
    SafetyCertificateOutlined,
    ArrowLeftOutlined,
    CloseOutlined
} from '@ant-design/icons';
import styles from './VideoDetail.module.scss';
import Link from 'next/link';

interface Props {
    video: VideoDetail;
}

const VideoDetailPage: React.FC<Props> = ({ video }) => {
    const [showVideo, setShowVideo] = useState(false);
    const formattedPrice = video.price === 0
        ? 'Bepul'
        : `${video.price.toLocaleString('uz-UZ')} UZS`;

    const isFree = video.price === 0;

    return (
        <PageContainer withFooter={true}>
            <Meta
                title={`${video.title} | Soff.uz`}
                description={video.description.replace(/<[^>]*>?/gm, '').slice(0, 160)}
                image={video.poster_url}
            />

            <div className={styles.detailPage}>
                {/* 1. Hero Section */}
                <section
                    className={styles.hero}
                    style={{ backgroundImage: `url(${video.poster_url})` }}
                >
                    <div className="container">
                        <div className={styles.heroContent}>
                            <div className={styles.breadcrumb}>
                                <Link href="/video-lessons">Video darslar</Link>
                                <span>/</span>
                                <Link href={`/video-lessons/category/${video.category.slug}`}>{video.category.name.split('|').pop()?.trim()}</Link>
                            </div>

                            <h1 className={styles.title}>{video.title}</h1>

                            <div className={styles.meta}>
                                <div className={styles.viewCount}>
                                    <EyeOutlined /> {video.view_count} marta ko'rilgan
                                </div>
                                <div className={styles.language}>
                                    <GlobalOutlined /> O'zbek tili
                                </div>
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
                                        onClick={() => setShowVideo(true)}
                                    >
                                        <img src={video.poster_url} alt={video.title} className={styles.poster} />
                                        <div className={styles.playOverlay}>
                                            <PlayCircleFilled />
                                            <span>Kursni ko'rish</span>
                                        </div>
                                    </div>

                                    <div className={styles.priceInfo}>
                                        <span className={styles.price}>{formattedPrice}</span>

                                        <div className={styles.buttons}>
                                            <button className={styles.btnPrimary}>
                                                {isFree ? "Darsni boshlash" : "Hozir sotib olish"}
                                            </button>
                                            {!isFree && (
                                                <button className={styles.btnSecondary}>
                                                    Savatga qo'shish
                                                </button>
                                            )}
                                        </div>

                                        <p className={styles.guaranteeText}>30 kunlik pul qaytarish kafolati</p>

                                        <div className={styles.featuresList}>
                                            <h4 className={styles.listTitle}>Kurs o'z ichiga oladi:</h4>

                                            <div className={styles.featureItem}>
                                                <PlaySquareOutlined />
                                                <span>{video.document.content_duration} video darslar</span>
                                            </div>

                                            <div className={styles.featureItem}>
                                                <ClockCircleOutlined />
                                                <span>Umrbod foydalanish imkoniyati</span>
                                            </div>

                                            <div className={styles.featureItem}>
                                                <SafetyCertificateOutlined />
                                                <span>Tugatganlik haqida sertifikat</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>

                {/* Back Button for mobile */}
                <div className="container pb-5">
                    <Link href="/video-lessons">
                        <a className="d-inline-flex align-items-center gap-2 text-muted">
                            <ArrowLeftOutlined /> Orqaga qaytish
                        </a>
                    </Link>
                </div>

                {/* Video Preview Modal (Ant Design) */}
                <Modal
                    open={showVideo}
                    onCancel={() => setShowVideo(false)}
                    footer={null}
                    centered
                    width={1000}
                    bodyStyle={{ padding: 0, backgroundColor: '#000', overflow: 'hidden' }}
                    destroyOnClose
                    closeIcon={<CloseOutlined style={{ color: '#fff', fontSize: '20px' }} />}
                >
                    <div className={styles.aspectRatioWrapper}>
                        <video
                            controls
                            autoPlay
                            src={video.document.file_url || video.document.short_content_url}
                            controlsList="nodownload"
                            style={{ width: '100%', display: 'block' }}
                        >
                            Sizning brauzeringiz video qo'llab-quvvatlamaydi.
                        </video>
                    </div>
                </Modal>
            </div>
        </PageContainer>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    const slug = params?.slug as string;

    if (!slug) {
        return { notFound: true };
    }

    try {
        const video = await fetchVideoBySlug(slug);

        if (!video) {
            return { notFound: true };
        }

        return {
            props: {
                video,
            },
        };
    } catch (error: any) {
        console.error('Error fetching video detail for SSR:', error);

        // Handle 404 specifically if axios error
        if (error.response?.status === 404) {
            return { notFound: true };
        }

        return {
            notFound: true,
        };
    }
};

export default React.memo(VideoDetailPage);
