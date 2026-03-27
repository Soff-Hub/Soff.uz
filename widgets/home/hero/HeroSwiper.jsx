import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import styles from './style.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroSwiper = ({ images = [] }) => {
    if (!images.length) return null;

    return (
        <div className={styles.swiperWrapper}>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                loop={images.length > 1}
                className={styles.mySwiper}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.bannerImageSlide}>
                            <Image 
                                src={img}
                                alt={`Soff.uz Banner ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                                priority={index === 0}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSwiper;
