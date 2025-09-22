import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from '../styles/detail.module.scss';

const ImageCarousel = ({ images }) => {
    if (!images) return null; // rasm bo'lmasa carouselni ko'rsatmaslik

    return (
        <div className={styles.carouselWrapper}>
            <img
                className={styles.imageItem}
                src={images || '/static/img/not-found.png'}
                alt="Slide"
            />
            {/* <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop={false} // hozir bitta rasm, loop kerak emas
                className={styles.carousel}>
                <SwiperSlide className={styles.slide}></SwiperSlide>
                Agar kelajakda bir nechta rasm keladigan bo'lsa:
                {images.map((src, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            loading="lazy"
                        />
                    </SwiperSlide>
                ))}
            </Swiper> */}
        </div>
    );
};

export default ImageCarousel;
