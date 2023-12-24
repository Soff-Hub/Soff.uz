import Link from "next/link";
import React from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation]);
const HotTopic = () => {
  const data = [
    {
      title: "Dasturlash sohasiga endi kirganlar uchun",
      article: 38,
      img: "programmer_4.jpg",
    },
    {
      title: "Dasturchi bo'lishni oldiga aniq maqsad qo'yganlar uchun",
      article: 63,
      img: "programmer_2.jpg",
    },
    {
      title:
        "Intizomni saqlab dars qoidalariga to'liq amal qilgan o'quvchilar uchun",
      article: 78,
      img: "programmer_3.jpg",
    },
    {
      title:
        "Intizomni saqlab dars qoidalariga to'liq amal qilgan o'quvchilar uchun",
      article: 78,
      img: "programmer_3.jpg",
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <h5
            className="mb-15 color-white wow animate__animated animate__fadeInUp"
            data-wow-delay="0s"
          >
            KURSIMIZ KIMLARGA TO’G’RI KELADI
          </h5>
          {/* <p
            className="color-gray-500 mb-20 wow animate__animated animate__fadeInUp"
            data-wow-delay=".3s"
          >
           Ushbu kurs kimlar uchun foydali bo'ladi?...
          </p> */}
          <div className="box-buttons-slider position-relative wow animate__animated animate__zoomIn">
            <div className="swiper-button-prev swiper-button-prev-style-1" />
            <div className="swiper-button-next swiper-button-next-style-1" />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="box-swiper">
            <div className="swiper-container swiper-group-5">
              <Swiper
                slidesPerView={4}
                spaceBetween={10}
                loop={false}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation={{
                  prevEl: ".swiper-button-prev-style-1",
                  nextEl: ".swiper-button-next-style-1",
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  575: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  767: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  991: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1199: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1350: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
                className="swiper-wrapper"
              >
                {data.map((item, i) => (
                  <SwiperSlide className="swiper-slide" key={i}>
                    <div className="card-style-1">
                      <div className="card-image">
                        <img
                          style={{
                            minHeight: "200px",
                            objectFit: "cover",
                            height: "100%",
                          }}
                          src={`static/img/vedio-rasm-1.jpg`}
                          alt="Genz"
                        />
                        <div className="card-info">
                          <div className="info-bottom">
                            <h6 className="color-white">{item.title}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotTopic;
