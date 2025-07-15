import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // faqat kerakli modullar

import 'swiper/css';
import 'swiper/css/navigation'; // 🔁 BU MUHIM
import 'swiper/css/pagination';
const ProtfolioModal = ({ data, setOpenModal }) => {
    const images = Array.isArray(data?.cover_image)
        ? data.cover_image
        : [data?.cover_image];
    console.log('data=>>>>', data);
    const swiperRef = useRef(null);

    return (
        <div className='ProtfolioModal_wrap'>
            <div className='closeICon' onClick={() => setOpenModal(false)}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    x='0px'
                    y='0px'
                    width='25'
                    height='25'
                    viewBox='0 0 48 48'>
                    <path
                        fill='#F44336'
                        d='M21.5 4.5H26.501V43.5H21.5z'
                        transform='rotate(45.001 24 24)'></path>
                    <path
                        fill='#F44336'
                        d='M21.5 4.5H26.5V43.501H21.5z'
                        transform='rotate(135.008 24 24)'></path>
                </svg>
            </div>
            <div
                style={{ maxWidth: '600px', margin: '0 auto' }}
                className='ProtfolioModal_wrap_swipper'>
                {images?.length > 1 && (
                    <div className='ProtfolioModal_wrap_swipper_btn'>
                        <button
                            className='border-1 rounded-5 align-i'
                            onClick={() =>
                                swiperRef?.current?.swiper?.slidePrev()
                            }>
                            <i class='fa-solid fa-arrow-left'></i>
                        </button>
                        <button
                            className='border-1 rounded-5 align-i'
                            onClick={() =>
                                swiperRef?.current?.swiper?.slideNext()
                            }>
                            <i class='fa-solid fa-arrow-right'></i>{' '}
                        </button>
                    </div>
                )}
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination]} // Autoplay yo‘q!
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}>
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={`slide-${index}`}
                                className='ProtfolioModal_wrap_swipper_image'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className=' ProtfolioModal_wrap_info'>
                <h3>{data?.title}</h3>
                <div className='d-flex gap-2 align-items-center'>
                    <p>{data?.category?.title}</p>
                    <p>{data?.sub_category?.title}</p>
                </div>
                {data?.description && <p>{data?.description}</p>}
            </div>
        </div>
    );
};

export default ProtfolioModal;
