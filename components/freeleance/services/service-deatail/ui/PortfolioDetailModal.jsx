import React from 'react';
import { Modal, Descriptions, Tag } from 'antd';

import styles from '../styles/detail.module.scss';

const PortfolioDetailModal = ({ open, onClose, portfolio }) => {
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
                {/* Gallery o‘rniga oddiy mapping */}
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
                        <Descriptions.Item label="Tavsif">
                            {portfolio?.description}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <div className={styles.galleryBox}>
                    {portfolio?.portfolio_images?.map((img, idx) => (
                        <img
                            key={idx}
                            className={styles.image}
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
