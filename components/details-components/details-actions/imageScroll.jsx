import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ImageLightBox from "./image-lightbox";

const ImageCarousel = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);



    return (
        <div className="slider_swiper_container">
            {images?.length > 0 && <div style={{ position: "absolute", top: "10px", right: "10px" }}>
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
                className="w-100"
                style={{
                    height: "100%",
                    overflow: "hidden",
                    overflowY: "auto",
                }}
            >
                {images?.map((item) => (
                    <SwiperSlide key={item.id} s>
                        <img
                            src={item?.image_url || item?.thumbUrl}
                            alt="Product"
                            className="rounded"
                        />
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
        </div>
    );
};

export default ImageCarousel;
