import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Axios from 'axios';
import { message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ProtfolioModal = ({ data, onClose }) => {
    const images = Array.isArray(data?.cover_image)
        ? data.cover_image
        : [data?.cover_image];

    const queryClient = useQueryClient()
    
    const deleteMutation = useMutation({
        mutationFn: (id) => Axios.delete(`http://176.96.241.219:8005/api/v1/categories/portfolio-delete/${id}`),
        onSuccess: () => {
            message.success("Portfolio muvaffaqiyatli o'chirildi!")
            queryClient.invalidateQueries(['portfolios'])
            onClose(false)
        },
        onError: () => {
            message.error("Portfolioni o'chirib bo'lmadi!")
        }
    })

    const handleDelete = () => {
        if (data?.id) deleteMutation.mutate(data?.id)
    }

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="container py-3">
            {/* Swiper karusel */}
            <div className="mx-auto position-relative" style={{ maxWidth: '600px' }}>
                <i
                    ref={prevRef}
                    className="fa-solid fa-chevron-left"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '-25px',
                        zIndex: 10,
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: '#1890ff',
                    }}
                ></i>

                <i
                    ref={nextRef}
                    className="fa-solid fa-chevron-right"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '-25px',
                        zIndex: 10,
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: '#1890ff',
                    }}
                ></i>

                <Swiper
                    modules={[Navigation, Thumbs]}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    loop={true}
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={`slide-${index}`}
                                className="img-fluid rounded"
                                style={{
                                    width: '100%',
                                    height: '350px',
                                    objectFit: 'cover',
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Info qismi */}
            <div className="text-center mt-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h3 className="fw-semibold">{data?.title}</h3>

                <div className="d-flex justify-content-center gap-3 text-muted small mt-2">
                    <p className="mb-0">{data?.category?.title}</p>
                    {data?.sub_category?.title && (
                        <p className="mb-0">{data?.sub_category?.title}</p>
                    )}
                </div>

                {data?.description && (
                    <p className="mt-3" style={{ fontSize: '15px' }}>
                        {data.description}
                    </p>
                )}

                <button disabled={deleteMutation.isLoading} onClick={handleDelete} className='btn btn-danger btn-lg'>{deleteMutation.isLoading ? "O'chirilmoqda" : "Portfolioni o'chirish"}</button>
            </div>
        </div>
    );
};

export default ProtfolioModal;
