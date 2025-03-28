import Image from 'next/image';
import React, { useEffect, useRef } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'

function FileImagesScroll({ product, views }) {
    const containerRef = useRef(null);


    useEffect(() => {
        const scrollContainer = containerRef.current;
        if (scrollContainer) {
            // Scrollni eng pastga tushirish
            scrollContainer.scrollTop = scrollContainer.scrollHeight;

            // 1 soniyadan keyin avtomatik yuqoriga qaytarish
            setTimeout(() => {
                scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
            }, 1000);
        }
    }, [product?.document?.images]);


    return (
        <div
            className="ps-product__thumbnail_seller">
            <figure className='figuree'>
                <div className="ps-wrapper_seller" ref={containerRef} >
                    {product?.document?.images?.length > 0
                        ? product?.document?.images?.map((item, i) => (
                            (item?.image_url || item?.thumbUrl || item?.url) && <Image
                                key={i}
                                src={item?.image_url || item?.thumbUrl || item?.url || 'https://placehold.co/600x400'}
                                width={785}
                                height={614}
                                alt={"sellerImage"}
                                unoptimized
                                className={` seller_image_conatiner`}
                                objectFit="contain"
                                style={{ flexShrink: 0, objectFit: "contain" }}
                            />
                        ))
                        : <Image
                            src={'https://placehold.co/600x400'}
                            width={1000}
                            height={614}
                            alt={"sellerImage"}
                            unoptimized
                            className={` seller_image_conatiner`}
                            objectFit="contain"
                        />}
                </div>
                <div className="views">
                    {' '}
                    <i className="fa-solid fa-eye"></i> <span>{views || 0}</span>
                </div>
                <div className='title_support'>
                    <InfoCircleOutlined className='fs-2 ' style={{ cursor: "pointer", }} />
                    <span>Mualliflik huquqi buzilgan holatda</span>
                    <strong className='text-success' style={{ cursor: "pointer" }}>shikoyat qiling!</strong>

                </div>
            </figure>
        </div>
    )
}

export default FileImagesScroll