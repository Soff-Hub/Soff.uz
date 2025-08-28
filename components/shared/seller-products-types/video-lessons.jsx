import React from 'react';
import VideoLessonsProducts from '~/components/elements/products/VideoLessonsProducts';
import ServiceIsUnavailable from '../seller-profile/ServiceIsUnavailable';
import ProductCard from '~/components/freeleance/home/ui/ProductCard';

export default function VideoLessons(product) {
    const data = product?.data?.video;

    return (
        <div className="sellerpage">
            {product && (
                <>
                    {data?.length > 0 ? (
                        <div className="sellerpageTitleBox">
                            <p className="sellerpageTitle">Video darsliklar</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="10"
                                viewBox="0 0 8 10"
                                fill="none">
                                <path
                                    d="M1.875 1.5L6.12488 4.63195L2 8.5"
                                    stroke="#312F30"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    ) : (
                        <ServiceIsUnavailable />
                    )}

                    <div className="SellerProductsCardWrapper">
                        {data?.map((item, index) => (
                            <div className="" key={index}>
                                <ProductCard product={item} />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* {product?.length < 8 && (
                <div className="showMoreBox">
                    <p className="showMore">Yana ko’rsatish</p>
                </div>
            )} */}
        </div>
    );
}
