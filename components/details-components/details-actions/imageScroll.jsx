import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ImageLightBox from './image-lightbox';
import { InfoCircleOutlined } from '@ant-design/icons';
import DemoButton from '~/components/form/demoBtn';
import Link from 'next/link';
import Image from 'next/image';

const getYouTubeEmbed = (url) => {
    if (!url) return null;
    try {
        const videoId =
            url.split('v=')[1]?.split('&')[0] ||
            url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    } catch {
        return null;
    }
};

function getYouTubeThumbnail(url) {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const id = match ? match[1] : null;
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

const ImageCarousel = ({
    images,
    views,
    demo_link,
    isProduct = true,
    slug,
}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showLeftGradient, setShowLeftGradient] = useState(false);
    const [showRightGradient, setShowRightGradient] = useState(true);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    // Fix navigation initialization and track active slide
    useEffect(() => {
        if (mainSwiper?.params && prevRef.current && nextRef.current) {
            mainSwiper.params.navigation.prevEl = prevRef.current;
            mainSwiper.params.navigation.nextEl = nextRef.current;
            mainSwiper.navigation.init();
            mainSwiper.navigation.update();

            // Track active slide changes and auto-scroll thumbnails
            mainSwiper.on('slideChange', () => {
                const newActiveIndex = mainSwiper.activeIndex;
                setActiveIndex(newActiveIndex);

                // Auto-scroll thumbnail swiper to keep active thumbnail visible
                if (thumbsSwiper) {
                    const slidesPerView =
                        thumbsSwiper.params.slidesPerView || 3;
                    const targetSlide = Math.max(
                        0,
                        newActiveIndex - Math.floor(slidesPerView / 2)
                    );
                    thumbsSwiper.slideTo(targetSlide, 300);
                }
            });

            // Also handle manual navigation (arrow clicks)
            mainSwiper.on('slideChangeTransitionEnd', () => {
                const newActiveIndex = mainSwiper.activeIndex;
                setActiveIndex(newActiveIndex);

                if (thumbsSwiper) {
                    const slidesPerView =
                        thumbsSwiper.params.slidesPerView || 3;
                    const targetSlide = Math.max(
                        0,
                        newActiveIndex - Math.floor(slidesPerView / 2)
                    );
                    thumbsSwiper.slideTo(targetSlide, 300);
                }
            });
        }
    }, [mainSwiper, thumbsSwiper]);

    // Handle thumbnail swiper progress to show/hide gradients
    const handleThumbProgress = (swiper) => {
        const progress = swiper.progress;
        const isBeginning = swiper.isBeginning;
        const isEnd = swiper.isEnd;

        setShowLeftGradient(!isBeginning);
        setShowRightGradient(!isEnd);
    };

    return (
        <div className="overflow-hidden w-100">
            <div
                className="slider_swiper_container position-relative product-short-view"
                style={{ maxWidth: '100%', overflow: 'hidden' }}>
                {images?.length > 0 && (
                    <div
                        className="imageLigthbox"
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            zIndex: '999',
                        }}>
                        <ImageLightBox gallery={images} />
                    </div>
                )}

                {images?.length > 1 && (
                    <i
                        ref={prevRef}
                        role="button"
                        tabIndex={0}
                        aria-label="Oldingi rasm"
                        className="fa-solid fa-chevron-left image_prev_left"
                        style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: '10',
                            cursor: 'pointer',
                            fontSize: '20px',
                            color: '#fff',
                            background: 'rgba(0,0,0,0.5)',
                            borderRadius: '50%',
                            padding: '10px',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}></i>
                )}

                <Swiper
                    modules={[Navigation, Thumbs]}
                    onSwiper={setMainSwiper}
                    thumbs={{
                        swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed
                                ? thumbsSwiper
                                : null,
                    }}
                    navigation={false}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    spaceBetween={0}
                    loop={false}
                    centeredSlides={false}
                    allowTouchMove={true}
                    watchOverflow={true}
                    resistanceRatio={0}
                    className="main-swiper"
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                    wrapperProps={{
                        style: {
                            width: '100%',
                            transform: 'none !important',
                        },
                    }}>
                    {images?.map((item, index) => (
                        <SwiperSlide
                            key={`${item.id}-${index}`}
                            style={{
                                width: '100%',
                                flexShrink: 0,
                                minWidth: '100%',
                                maxWidth: '100%',
                                flex: '0 0 100%',
                            }}>
                            {item?.type === 'video' ? (
                                <div className="video-wrapper">
                                    <iframe
                                        src={`${getYouTubeEmbed(
                                            item.video_url
                                        )}?modestbranding=1&rel=0&controls=1&showinfo=0`}
                                        style={{
                                            height: '450px',
                                        }}
                                        title={`video-${index}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                                </div>
                            ) : (
                                <div
                                    className="image-wrapper"
                                    style={{
                                        width: '100%',
                                        height: '450px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        backgroundColor: '#f5f5f5',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            position: 'relative',
                                        }}>
                                        <Image
                                            src={
                                                item?.image_url ||
                                                item?.thumbUrl ||
                                                '/static/img/no-document.png'
                                            }
                                            alt="Product"
                                            layout="fill"
                                            objectFit="contain"
                                            className="swiper-image rounded-3"
                                            style={{
                                                userSelect: 'none',
                                            }}
                                            priority={index === 0}
                                            loading={
                                                index === 0 ? 'eager' : 'lazy'
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {images?.length > 1 && (
                    <i
                        ref={nextRef}
                        role="button"
                        tabIndex={0}
                        aria-label="Keyingi rasm"
                        className="fa-solid fa-chevron-right image_prev_rigth"
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: '10',
                            cursor: 'pointer',
                            fontSize: '20px',
                            color: '#fff',
                            background: 'rgba(0,0,0,0.5)',
                            borderRadius: '50%',
                            padding: '10px',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}></i>
                )}

                {images?.length > 1 && (
                    <div className="position-relative">
                        {/* Left Gradient Indicator */}
                        {showLeftGradient && (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: '30px',
                                    background:
                                        'linear-gradient(to right, rgba(255,255,255,0.9), transparent)',
                                    zIndex: 5,
                                    pointerEvents: 'none',
                                }}
                            />
                        )}

                        {/* Right Gradient Indicator */}
                        {showRightGradient && images?.length > 7 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: '30px',
                                    background:
                                        'linear-gradient(to left, rgba(255,255,255,0.9), transparent)',
                                    zIndex: 5,
                                    pointerEvents: 'none',
                                }}
                            />
                        )}

                        <Swiper
                            modules={[Thumbs]}
                            onSwiper={setThumbsSwiper}
                            spaceBetween={8}
                            slidesPerView="auto"
                            freeMode={true}
                            watchSlidesProgress={true}
                            centeredSlides={false}
                            allowTouchMove={true}
                            className="thumbs-swiper mt-2"
                            style={{
                                width: '100%',
                                height: '60px',
                                overflow: 'hidden',
                                paddingLeft: '5px',
                                paddingRight: '5px',
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 3,
                                    spaceBetween: 6,
                                },
                                480: {
                                    slidesPerView: 4,
                                    spaceBetween: 8,
                                },
                                768: {
                                    slidesPerView: 5,
                                    spaceBetween: 8,
                                },
                                1024: {
                                    slidesPerView: 6,
                                    spaceBetween: 10,
                                },
                                1200: {
                                    slidesPerView: 7,
                                    spaceBetween: 12,
                                },
                            }}
                            onProgress={handleThumbProgress}
                            onSlideChange={handleThumbProgress}
                            onReachBeginning={() => setShowLeftGradient(false)}
                            onReachEnd={() => setShowRightGradient(false)}>
                            {images?.map((item, index) => (
                                <SwiperSlide
                                    key={`thumb-${item.id}-${index}`}
                                    style={{
                                        width: '75px',
                                        height: '60px',
                                        flexShrink: 0,
                                    }}>
                                    <div
                                        className={`thumbnail-wrapper ${
                                            activeIndex === index
                                                ? 'active'
                                                : ''
                                        }`}
                                        style={{
                                            width: '75px',
                                            height: '50px',
                                            border:
                                                activeIndex === index
                                                    ? '3px solid #28a745'
                                                    : '2px solid #e9ecef',
                                            borderRadius: '8px',
                                            padding: '2px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            overflow: 'hidden',
                                            boxShadow:
                                                activeIndex === index
                                                    ? '0 0 10px rgba(40, 167, 69, 0.3)'
                                                    : 'none',
                                            position: 'relative',
                                        }}
                                        onClick={() => {
                                            if (mainSwiper) {
                                                mainSwiper.slideTo(index);
                                                setActiveIndex(index);
                                                // Auto-scroll thumbnail swiper to show active thumbnail
                                                if (thumbsSwiper) {
                                                    const slidesPerView =
                                                        thumbsSwiper.params
                                                            .slidesPerView;
                                                    const targetSlide =
                                                        Math.max(
                                                            0,
                                                            index -
                                                                Math.floor(
                                                                    slidesPerView /
                                                                        2
                                                                )
                                                        );
                                                    thumbsSwiper.slideTo(
                                                        targetSlide
                                                    );
                                                }
                                            }
                                        }}>
                                        <Image
                                            src={
                                                item?.image_url ||
                                                item?.thumbUrl ||
                                                getYouTubeThumbnail(
                                                    item?.video_url
                                                ) ||
                                                '/static/img/no-document.png'
                                            }
                                            alt="Thumbnail"
                                            layout="fill"
                                            quality={20}
                                            objectFit="cover"
                                            className="rounded"
                                            style={{
                                                cursor: 'pointer',
                                                userSelect: 'none',
                                            }}
                                            loading="lazy"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
                {isProduct && (
                    <>
                        <div className="views mt-2">
                            <i className="fa-solid fa-eye"></i>{' '}
                            <span>{views || 0}</span>
                        </div>

                        <div className="d-flex align-items-center gap-5 mt-2 flex-wrap justify-content-center">
                            {demo_link && <DemoButton demo_link={demo_link} />}
                            <div className="d-flex gap-2 align-items-center flex-wrap">
                                <InfoCircleOutlined
                                    className="fs-2 "
                                    style={{ cursor: 'pointer' }}
                                />
                                <span>Mualliflik huquqi buzilgan holatda</span>
                                <Link href={`/report/${slug}`}>
                                    <a>
                                        <strong
                                            className="text-success"
                                            style={{ cursor: 'pointer' }}>
                                            shikoyat qiling!
                                        </strong>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageCarousel;
