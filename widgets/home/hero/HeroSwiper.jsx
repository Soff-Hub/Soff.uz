import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import styles from './style.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const HeroSwiper = ({ images = [] }) => {
    if (!images.length) return null;

    return (
        <div className={styles.swiperWrapper}>
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={images.length > 1}
                className={styles.mySwiper}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className={styles.bannerImageSlide}
                            style={{ 
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: '100%',
                                minHeight: '320px'
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSwiper;
