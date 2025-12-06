import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { VideoLinks } from '~/shared/utilities/vedio_link_api';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from 'react';
import { useEffect } from 'react';

export default () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        setData(VideoLinks);
    }, []);
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            controller={{ control: Swiper }}
            pagination={{ clickable: true }}>
            {data?.map((el) => (
                <SwiperSlide key={el.id}>
                    <div className="modal-vedio-tutorial_container-carousel">
                        <iframe
                            width="100%"
                            height="300px"
                            src={`${el.vedioUrl}`}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                            allowfullscreen></iframe>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
