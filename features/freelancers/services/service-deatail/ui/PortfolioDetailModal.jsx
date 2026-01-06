import React, { useMemo } from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import { getYouTubeEmbed } from '~/shared/utilities/youtube-helpers';
import useResponsive from '~/shared/utilities/useResponsive';
import styles from './styles/detail.module.scss';

const PortfolioDetailModal = ({ open, onClose, portfolio }) => {
    const { isMobile } = useResponsive();

    const galleryImages = useMemo(
        () => portfolio?.portfolio_images || [],
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
            width={'90%'}
            centered
            className={styles.modal}>
            <div className={styles.wrapper}>
                <div className={styles.infoBox}>
                    <Descriptions
                        title="Portfolio Ma'lumotlari"
                        bordered
                        size="small"
                        column={1}>
                        <Descriptions.Item label="Kategoriya">
                            <Tag color="blue">{portfolio?.category?.title}</Tag>
                        </Descriptions.Item>
                        {!isMobile && (
                            <Descriptions.Item label="Tavsif">
                                {portfolio?.description}
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                    {isMobile && (
                        <div className="border rounded-3 p-2 mt-3">
                            <h4 className="my-2">Tavsif</h4>
                            <p>{portfolio?.description}</p>
                        </div>
                    )}
                </div>
                <div className={styles.galleryBox}>
                    {galleryImages.length > 0 ? (
                        galleryImages.map((img, idx) => (
                            <img
                                key={idx}
                                src={img?.image || '/static/img/orqafon1.avif'}
                                alt={`Image ${idx + 1}`}
                                className={styles.image}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center mt-4">
                            Rasm topilmadi.
                        </p>
                    )}
                    {galleryVideos.length > 0 ? (
                        galleryVideos.map((video, index) => (
                            <div
                                key={index}
                                className="video-wrapper"
                                style={{
                                    width: '100%',
                                }}>
                                <iframe
                                    src={`${getYouTubeEmbed(
                                        video.video_url
                                    )}?modestbranding=1&rel=0&controls=1&showinfo=0`}
                                    style={{
                                        height: '500px',
                                        width: '100%',
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

export default PortfolioDetailModal;
