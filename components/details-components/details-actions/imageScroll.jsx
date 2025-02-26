import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ImageLightBox from "./image-lightbox";
import { InfoCircleOutlined } from '@ant-design/icons'

const ImageCarousel = ({ images, views }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);


    return (
        <div className="slider_swiper_container" >
            {images?.length > 0 && <div style={{ position: "absolute", top: "70px", right: "70px", zIndex: "999" }}>
                <ImageLightBox gallery={images} /></div>}
            <i ref={prevRef} className="fa-solid fa-chevron-left image_prev_left"></i>
            <Swiper
                modules={[Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                slidesPerView={1}
                className="swiper-container"
            >
                {images?.map((item) => (
                    <SwiperSlide key={item.id} className="swiper-slide">
                        <div className="image-wrapper">
                            <img
                                src={item?.image_url || item?.thumbUrl}
                                alt="Product"
                                className="swiper-image"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <i ref={nextRef} className="fa-solid fa-chevron-right image_prev_rigth"></i>

            <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={8}
                slidesPerView={8}
                freeMode
                watchSlidesProgress
                className="w-100 m-0"
                style={{ minHeight: "45px" }}
            >
                {images?.map((item) => (
                    <SwiperSlide key={item.id} className="thumb-slide">
                        <Image src={item?.image_url || item?.thumbUrl} alt="Thumbnail" width={75} height={44} className="rounded img-thumbnail" />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="views">
                {' '}
                <i className="fa-solid fa-eye"></i> <span>{views || 0}</span>
            </div>
            <div className='title_support'>
                <InfoCircleOutlined className='fs-2 ' style={{ cursor: "pointer", }} />
                <span>Mualliflik huquqi buzilgan holatda</span>
                <strong className='text-success' style={{ cursor: "pointer" }}>shikoyat qiling!</strong>

            </div>
        </div>
    );
};

export default ImageCarousel;
