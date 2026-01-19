import React, { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { Modal, Descriptions, Tag } from 'antd';
import { getYouTubeEmbed } from '~/shared/utilities/youtube-helpers';
import useResponsive from '~/shared/utilities/useResponsive';
import styles from './portfolio-modal.module.scss';
import { useDisableWindowScroll } from '~/shared/hooks/useDisableWindowScroll';

type PortfolioModalProps = {
    open: boolean;
    onClose: () => void;
    portfolio: any;
};

function PortfolioModal({ open, onClose, portfolio }: PortfolioModalProps) {
    const { t } = useTranslation('modals');
    const { isMobile } = useResponsive();

    const galleryImages = useMemo(
        () =>
            portfolio?.portfolio_images?.map((img: any) => {
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

    useDisableWindowScroll(open);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            styles={{
                content: {
                    marginBlock: isMobile ? '20px' : '40px',
                },
            }}
            title={<span className={styles.title}>{portfolio?.title}</span>}
            width={isMobile ? '100%' : '80%'}
            centered
            destroyOnHidden>
            <div>
                <Descriptions
                    title={t('portfolio.info')}
                    bordered
                    size="small"
                    column={1}
                    className={styles.descriptions}>
                    <Descriptions.Item label={t('portfolio.category')}>
                        <Tag color="blue">
                            {portfolio?.category?.title ||
                                t('portfolio.unknown')}
                        </Tag>
                    </Descriptions.Item>

                    {!isMobile && (
                        <Descriptions.Item
                            label={t('portfolio.description')}
                            style={{
                                whiteSpace: 'pre-wrap',
                            }}>
                            {portfolio?.description ||
                                t('portfolio.descriptionNotAvailable')}
                        </Descriptions.Item>
                    )}
                </Descriptions>
                {isMobile && (
                    <div className={styles.mobile}>
                        <h4 className={styles.mobileTitle}>
                            {t('portfolio.description')}
                        </h4>
                        <p className={styles.mobileDescr}>
                            {portfolio?.description}
                        </p>
                    </div>
                )}
                <div className={styles.galleryBox}>
                    {galleryImages.length > 0 ? (
                        galleryImages.map((img: any, idx: number) => (
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
                            {t('portfolio.imageNotFound')}
                        </p>
                    )}
                    {galleryVideos.length > 0 ? (
                        galleryVideos.map((video: any, index: number) => (
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
                            {t('portfolio.videoNotFound')}
                        </p>
                    )}
                </div>
            </div>
        </Modal>
    );
}

export default PortfolioModal;
