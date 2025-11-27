import Image from 'next/image';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';

function FileImagesScroll({ product }) {
    const containerRef = useRef(null);
    const [isScrolledDown, setIsScrolledDown] = useState(false);

    useLayoutEffect(() => {
        const scrollContainer = containerRef.current;

        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
            scrollContainer.scrollTo({ top: 0 });

            const handleScroll = () => {
                if (scrollContainer.scrollTop) {
                    setIsScrolledDown(true);
                } else {
                    setIsScrolledDown(false);
                }
            };

            scrollContainer.addEventListener('scroll', handleScroll);

            return () => {
                scrollContainer.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    const onClickDown = () => {
        const scrollContainer = containerRef.current;
        if (scrollContainer) {
            setIsScrolledDown(true);
            scrollContainer.scrollBy({ top: 100, behavior: 'smooth' });
        }
    };

    return (
        <>
            <style>{`
                @keyframes pulseCornerLeft {
                    0%, 100% {
                        opacity: 0.6;
                        transform: rotate(45deg) translateY(0);
                    }
                    50% {
                        opacity: 1;
                        transform: rotate(45deg) translateY(4px);
                    }
                }
                @keyframes pulseCornerRight {
                    0%, 100% {
                        opacity: 0.6;
                        transform: rotate(-45deg) translateY(0);
                    }
                    50% {
                        opacity: 1;
                        transform: rotate(-45deg) translateY(4px);
                    }
                }
            `}</style>
            <div className="ps-product__thumbnail_seller product-short-view">
                <figure className="figuree">
                    <div
                        className="ps-wrapper_seller product-poster "
                        ref={containerRef}>
                        {product?.document?.images?.length > 0 ? (
                            product?.document?.images?.map(
                                (item, i) =>
                                    (item?.image_url ||
                                        item?.thumbUrl ||
                                        item?.url) && (
                                        <Image
                                            key={i}
                                            src={
                                                item?.image_url ||
                                                item?.thumbUrl ||
                                                item?.url ||
                                                'https://placehold.co/600x400'
                                            }
                                            width={785}
                                            height={614}
                                            alt={'sellerImage'}
                                            className={` seller_image_conatiner`}
                                            objectFit="contain"
                                            style={{
                                                flexShrink: 0,
                                                objectFit: 'contain',
                                            }}
                                        />
                                    )
                            )
                        ) : (
                            <Image
                                src={'https://placehold.co/600x400'}
                                width={1000}
                                height={614}
                                alt={'sellerImage'}
                                className={` seller_image_conatiner`}
                                objectFit="contain"
                            />
                        )}
                        <div
                            onClick={onClickDown}
                            style={{
                                position: 'sticky',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                width: '100%',
                                height: '80px',
                                background:
                                    'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(80 80 80) 100%)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: isScrolledDown ? 0 : 1,
                                transform: isScrolledDown
                                    ? 'translateY(100%)'
                                    : 'translateY(0)',
                                pointerEvents: isScrolledDown ? 'none' : 'auto',
                            }}>
                            {/* Left corner chevron indicator */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '16px',
                                    left: '16px',
                                    opacity: isScrolledDown ? 0 : 1,
                                    transition: 'opacity 0.3s ease',
                                    pointerEvents: 'none',
                                }}>
                                <i
                                    className="fa-solid fa-chevron-down"
                                    style={{
                                        fontSize: '20px',
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        animation:
                                            'pulseCornerLeft 2s ease-in-out infinite',
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                                        display: 'block',
                                    }}></i>
                            </div>
                            {/* Right corner chevron indicator */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '16px',
                                    right: '16px',
                                    opacity: isScrolledDown ? 0 : 1,
                                    transition: 'opacity 0.3s ease',
                                    pointerEvents: 'none',
                                }}>
                                <i
                                    className="fa-solid fa-chevron-down"
                                    style={{
                                        fontSize: '20px',
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        animation:
                                            'pulseCornerRight 2s ease-in-out infinite',
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                                        display: 'block',
                                    }}></i>
                            </div>
                        </div>
                    </div>
                    <div className="views">
                        {' '}
                        <i className="fa-solid fa-eye"></i>{' '}
                        <span>{product?.view_count}</span>
                    </div>

                    <div
                        className="title_support"
                        style={{ paddingTop: '50px' }}>
                        <InfoCircleOutlined
                            className="fs-2 "
                            style={{ cursor: 'pointer' }}
                        />
                        <span>Mualliflik huquqi buzilgan holatda</span>
                        <Link href={`/report/${product.slug}`}>
                            <a>
                                <strong
                                    className="text-success"
                                    style={{ cursor: 'pointer' }}>
                                    shikoyat qiling!
                                </strong>
                            </a>
                        </Link>
                    </div>
                </figure>
            </div>
        </>
    );
}

export default FileImagesScroll;
