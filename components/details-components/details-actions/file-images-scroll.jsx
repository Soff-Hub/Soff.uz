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
        <div className="ps-product__thumbnail_seller">
            <figure className="figuree">
                <div
                    className="ps-wrapper_seller product-poster product-short-view"
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
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: '24px',
                            cqursor: 'pointer',
                            transition: '0.3s ease',
                            opacity: isScrolledDown ? 0 : 1,
                            transform: isScrolledDown
                                ? 'translateY(100%)'
                                : 'translateY(0)',
                        }}>
                        <i className="fa-solid fa-angles-down fa-bounce"></i>
                    </div>
                </div>
                <div className="views">
                    {' '}
                    <i className="fa-solid fa-eye"></i>{' '}
                    <span>{product?.view_count}</span>
                </div>

                <div className="title_support" style={{ paddingTop: '50px' }}>
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
    );
}

export default FileImagesScroll;
