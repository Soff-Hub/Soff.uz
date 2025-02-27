import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function SwiperPages({ children }) {

    const breakpoints = {
        320: { slidesPerView: 1 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
    }
    return (
        <div className="swiper-wrapper">
            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={breakpoints}
            >
                {React.Children.map(children, (child, index) => (
                    <SwiperSlide key={index} style={{ height: "100%" }}>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigatsiya tugmalari Swiper tashqarisida */}
            <div className="swiper-navigation ">
                <div className="swiper-button-prev"><i className="fa-solid fa-chevron-left fa-2x"></i></div>
                <div className="swiper-button-next"><i className="fa-solid fa-chevron-right fa-2x"></i></div>
            </div>
        </div>
    );
}
