import React from 'react';
import { Modal, Descriptions, Tag } from 'antd';

import styles from './styles/detail.module.scss';
import useResponsive from '~/utilities/useResponsive';

const PortfolioDetailModal = ({ open, onClose, portfolio }) => {
    const {isMobile} = useResponsive()
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            title={<span className={styles.title}>{portfolio?.title}</span>}
            width={"90%"}
            centered
            className={styles.modal}
        >

            <div className={styles.wrapper}>
                <div className={styles.infoBox}>
                    <Descriptions
                        title="Portfolio Ma'lumotlari"
                        bordered
                        size="small"
                        column={1}
                    >
                        <Descriptions.Item label="Kategoriya">
                            <Tag color="blue">{portfolio?.category?.title}</Tag>
                        </Descriptions.Item>
                        {!isMobile &&
                            <Descriptions.Item label="Tavsif">
                                {portfolio?.description}
                            </Descriptions.Item>
                        }
                    </Descriptions>
                    {isMobile &&
                        <div className='border rounded-3 p-2 mt-3'>
                            <h4 className="my-2">Tavsif</h4>
                            <p>{portfolio?.description}</p>
                        </div>
                    }
                </div>
                <div className={styles.galleryBox}>
                    {portfolio?.portfolio_images?.map((img, idx) => (
                        <img
                            key={idx}
                            className={styles.newImage}
                            src={img?.image}
                            alt={`Image ${idx}`}
                        />
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default PortfolioDetailModal;
