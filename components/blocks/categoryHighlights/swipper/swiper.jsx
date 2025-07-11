import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function Swiper_Pages ({ children, type }, titleText) {
    // Har bir Swiper uchun unikal ID generatsiyasi
    const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), []);

    const count = {
        file: 5,
        '3d': 3,
        template: 5,
        website: 5,
        design: 4,
        video: 4,
    };

    if (!count[type]) return null;

    const childrenArray = React.Children.toArray(children);
    const desiredCount = count[type];
    const paddedChildren = [...childrenArray];

    while (paddedChildren.length < desiredCount) {
        paddedChildren.push(
            <div style={{ visibility: 'hidden', height: '100%' }} />
        );
    }

    const breakpoints = {
        320: { slidesPerView: 2 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: desiredCount },
    };

    const nextBtnClass = `swiper-button-next-${uniqueId}`;
    const prevBtnClass = `swiper-button-prev-${uniqueId}`;

    return (
        <div className='swiper-wrapper' style={{ position: 'relative' }}>
            <Swiper
                slidesPerView={desiredCount}
                spaceBetween={30}
                loop={true}
                navigation={{
                    nextEl: `.${nextBtnClass}`,
                    prevEl: `.${prevBtnClass}`,
                }}
                modules={[Navigation]}
                className='mySwiper'
                breakpoints={breakpoints}>
                {paddedChildren.map((child, index) => (
                    <SwiperSlide key={index} style={{ height: '100%' }}>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className='Swiper_Pages_swiper-navigation'>
                <div className={prevBtnClass}>
                    <i className='fa-solid fa-chevron-left fa-2x swipperICon'></i>
                </div>
                <div className={nextBtnClass}>
                    <i className='fa-solid fa-chevron-right fa-2x swipperICon'></i>
                </div>
            </div>
        </div>
    );
}
