import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ImageLightBox from "~/components/details-components/details-actions/image-lightbox";

const ServiceImgCorusel = ({ images = [] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="slider_swiper_wrapper_container">
            {images?.length > 0 && (
                <div
                    className="imageLigthbox"
                    style={{ position: "absolute", top: "10px", right: "10px", zIndex: "999" }}
                >
                    <ImageLightBox gallery={images.map(img => ({ image_url: img.image }))} />
                </div>
            )}

            <i ref={prevRef} className="fa-solid fa-chevron-left image_prev_left"></i>

            <Swiper
                modules={[Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                loop={true}
                slidesPerView={1}
                className="swiper-container product-short-view"
            >
                {images.map((item) => (
                    <SwiperSlide key={item.id} className="w-100">
                        <div className="image-wrapper">
                            <img
                                src={item.image}
                                alt="Product"
                                className="swiper-image rounded-3"
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
                {images.map((item) => (
                    <SwiperSlide key={item.id} className="thumb-slide">
                        <Image
                            src={item.image}
                            alt="Thumbnail"
                            width={75}
                            height={44}
                            className="rounded img-thumbnail"
                            objectFit="cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ServiceImgCorusel;
