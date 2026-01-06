import React, { memo, useMemo } from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import useResponsive from '~/shared/utilities/useResponsive';
import { getYouTubeEmbed } from '~/shared/utilities/youtube-helpers';
import styles from './style.module.scss';

const PortfolioModal = ({ open, onClose, portfolio }) => {
    const { isMobile } = useResponsive();

    const galleryImages = useMemo(
        () =>
            portfolio?.portfolio_images?.map((img) => {
                const baseImageUrl = img?.image || '/static/img/orqafon1.avif';
                const imageUrl = baseImageUrl.startsWith('http')
                    ? baseImageUrl
                    : `https://freelance.soff.uz/media${baseImageUrl}`;
                return { ...img, image: imageUrl };
            }) || [],
        [portfolio?.portfolio_images]
    );

    const galleryVideos = useMemo(
        () => portfolio?.videos || [],
        [portfolio?.videos]
    );

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            title={<span className={styles.title}>{portfolio?.title}</span>}
            width={isMobile ? '100%' : '80%'}
            centered
            destroyOnHidden
            bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <div>
                <Descriptions
                    title="Portfolio Ma'lumotlari"
                    bordered
                    size="small"
                    column={1}
                    className={styles.descriptions}>
                    <Descriptions.Item label="Kategoriya">
                        <Tag color="blue">
                            {portfolio?.category?.title || 'Noma’lum'}
                        </Tag>
                    </Descriptions.Item>

                    {!isMobile && (
                        <Descriptions.Item
                            label="Tavsif"
                            style={{
                                whiteSpace: 'pre-wrap',
                            }}>
                            {portfolio?.description || 'Tavsif mavjud emas'}
                        </Descriptions.Item>
                    )}
                </Descriptions>
                {isMobile && (
                    <div className={styles.mobile}>
                        <h4 className={styles.mobileTitle}>Tavsif</h4>
                        <p className={styles.mobileDescr}>
                            {portfolio?.description}
                        </p>
                    </div>
                )}
                <div className={styles.galleryBox}>
                    {galleryImages.length > 0 ? (
                        galleryImages.map((img, idx) => (
                            <div key={idx} className={styles.imageWrapper}>
                                <img
                                    src={
                                        img?.image ||
                                        '/static/img/orqafon1.avif'
                                    }
                                    alt={`Image ${idx + 1}`}
                                    className={styles.image}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center mt-4">
                            Rasm topilmadi.
                        </p>
                    )}
                    {galleryVideos.length > 0 ? (
                        galleryVideos.map((video, index) => (
                            <div className="video-wrapper" key={index}>
                                <iframe
                                    src={`${getYouTubeEmbed(
                                        video.video_url
                                    )}?modestbranding=1&rel=0&controls=1&showinfo=0`}
                                    style={{
                                        height: '500px',
                                    }}
                                    title={`video-${index}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center mt-4">
                            Video topilmadi.
                        </p>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default memo(PortfolioModal);
