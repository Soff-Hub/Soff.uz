import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ImageLightBox from "./image-lightbox";
import { InfoCircleOutlined } from '@ant-design/icons'
import DemoButton from "~/components/form/demoBtn";

const ImageCarousel = ({ images, views, demo_link }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);


    return (
        <div className="slider_swiper_container" >
            {images?.length > 0 && <div className="imageLigthbox" style={{ position: "absolute", top: "70px", right: "70px", zIndex: "999" }}>
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
                className="swiper-container product-short-view"
            >
                {images?.map((item) => (
                    <SwiperSlide key={item.id} className="w-100">
                        <div className="image-wrapper">
                            <img
                                src={item?.image_url || item?.thumbUrl}
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
                {images?.map((item) => (
                    <SwiperSlide key={item.id} className="thumb-slide">
                        <Image objectFit={"contain"} src={item?.image_url || item?.thumbUrl} alt="Thumbnail" width={75} height={44} className="rounded img-thumbnail" />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="views">
                {' '}
                <i className="fa-solid fa-eye"></i> <span>{views || 0}</span>
            </div>
      
            
            <div className='d-flex align-items-center gap-5 mt-2 flex-wrap justify-content-center'>
                { demo_link &&
                    <DemoButton demo_link={demo_link}/> 
                }
                <div className="d-flex gap-2 align-items-center flex-wrap">
                    <InfoCircleOutlined className='fs-2 ' style={{ cursor: "pointer", }} />
                    <span>Mualliflik huquqi buzilgan holatda</span>
                    <strong className='text-success' style={{ cursor: "pointer" }}>shikoyat qiling!</strong>    
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;
