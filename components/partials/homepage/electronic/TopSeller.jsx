import React from 'react';
import Slider from 'react-slick';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function TopSellers() {
    var settings = {
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        // infinite: true,
    };
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={6}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={{
                dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper">
            <SwiperSlide>
                <div
                    className="top-seller-image"
                    style={{
                        backgroundImage: `url(/static/uploads/5ba79ea8093645c480eebe7b5083e483.jpg)`,
                        height: '100%',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        objectFit: 'contain',
                    }}>
                    <div className="top-seller-image_back">
                        <div className="top-seller-image_name">Sotuvchi 48</div>
                    </div>
                    <div className='top-seller-image_desc' >
                        <p>230 ta mahsulot</p>
                        <p>45 000 so'm foyda</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/static/uploads/5ba79ea8093645c480eebe7b5083e483.jpg"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img src="/static/img/vedio-rasm-2.png" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/static/uploads/019276ce1e444623833b0c1808da707c.jpg"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/static/uploads/019276ce1e444623833b0c1808da707c.jpg"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/static/uploads/019276ce1e444623833b0c1808da707c.jpg"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/static/uploads/019276ce1e444623833b0c1808da707c.jpg"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/static/uploads/019276ce1e444623833b0c1808da707c.jpg"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/static/uploads/019276ce1e444623833b0c1808da707c.jpg"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/static/uploads/019276ce1e444623833b0c1808da707c.jpg"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/static/uploads/019276ce1e444623833b0c1808da707c.jpg"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="/static/uploads/019276ce1e444623833b0c1808da707c.jpg"
                    alt=""
                />
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            ...
        </Swiper>
    );
}

export default TopSellers;
