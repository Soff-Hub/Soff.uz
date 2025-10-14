import React, { memo, useMemo } from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import Image from 'next/image';
import styles from './style.module.scss';
import useResponsive from '~/shared/utilities/useResponsive';

const PortfolioModal = ({ open, onClose, portfolio }) => {
    const { isMobile } = useResponsive();

    const galleryImages = useMemo(
        () => portfolio?.portfolio_images || [],
        [portfolio?.portfolio_images]
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
            bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
        >
            <div >
                <Descriptions
                    title="Portfolio Ma'lumotlari"
                    bordered
                    size="small"
                    column={1}
                    className={styles.descriptions}
                >
                    <Descriptions.Item label="Kategoriya">
                        <Tag color="blue">{portfolio?.category?.title || 'Noma’lum'}</Tag>
                    </Descriptions.Item>

                    {!isMobile && (
                        <Descriptions.Item label="Tavsif">
                            {portfolio?.description || 'Tavsif mavjud emas'}
                        </Descriptions.Item>
                    )}
                </Descriptions>
                {isMobile &&
                    <div className={styles.mobile}>
                        <h4 className={styles.mobileTitle}>Tavsif</h4>
                        <p className={styles.mobileDescr}>{portfolio?.description}</p>
                    </div>
                }
                <div className={styles.galleryBox}>
                    {galleryImages.length > 0 ? (
                        galleryImages.map((img, idx) => (
                            <div key={idx} className={styles.imageWrapper}>
                                <img
                                    src={img?.image || '/static/img/orqafon1.avif'}
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
                </div>
            </div>
        </Modal>
    );
};

export default memo(PortfolioModal);



