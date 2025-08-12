import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "../styles/detail.module.scss";

const ImageCarousel = ({ images }) => {
    return (
        <div className={styles.carouselWrapper}>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop
                className={styles.carousel}
            >
                {/* {images.map((src, index) => ( */}
                    <SwiperSlide  className={styles.slide}>
                        <img src={images} alt={`Slide}`} />
                    </SwiperSlide>
                {/* ))} */}
            </Swiper>
        </div>
    );
};

export default ImageCarousel;
