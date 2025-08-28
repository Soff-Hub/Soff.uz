import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function SwiperPages({ children, type }) {
    const count = {
        file: 5,
        '3d': 3,
        template: 4,
        website: 4,
        design: 4,
        video: 4,
    };

    if (!count[type]) return null;

    const childrenArray = React.Children.toArray(children);
    const desiredCount = count[type];
    const paddedChildren = [...childrenArray];

    // Agar yetarli bo‘lmasa, bo‘sh divlar bilan to‘ldiramiz
    while (paddedChildren.length < desiredCount) {
        paddedChildren.push(
            <div style={{ visibility: 'hidden', height: '100%' }} />
        );
    }

    const breakpoints = {
        320: { slidesPerView: 1.5 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: desiredCount },
    };

    return (
        <div className="swiper-wrapper" style={{ position: 'relative' }}>
            <Swiper
                slidesPerView={desiredCount}
                spaceBetween={10}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={breakpoints}>
                {paddedChildren.map((child, index) => (
                    <SwiperSlide key={index} style={{ height: '100%' }}>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="swiper-navigation mt-4">
                <div className="swiper-button-prev">
                    <i className="fa-solid fa-chevron-left fa-2x"></i>
                </div>
                <div className="swiper-button-next">
                    <i className="fa-solid fa-chevron-right fa-2x"></i>
                </div>
            </div>
        </div>
    );
}
