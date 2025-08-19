import React from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './styles/detail.module.scss';

const PortfolioDetailModal = ({ open, onClose, portfolio }) => {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            title={<span className={styles.title}>{portfolio?.title}</span>}
            width={900}
            centered
            className={styles.modal}
        >
            <div className={styles.wrapper}>
                <div className={styles.carouselBox}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                    >
                        {portfolio?.portfolio_images?.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <img className={styles.image} src={img?.image} alt={`Slide ${idx}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

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
            </div>
        </Modal>
    );
};

export default PortfolioDetailModal;
