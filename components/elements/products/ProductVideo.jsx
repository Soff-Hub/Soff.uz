import React, { useState } from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import ModuleProductVideoActions from './modules/ModuleProductVideoActions';


const ProductVideo = ({ product }) => {
    const { title } = useProduct();
    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;

    }


    return (
        <div className="" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px", borderRadius: '15px' }}>
            <div
                style={{
                    margin: '0 auto',
                }}>
                <Link href="/product/[pid]" as={`/product/${product.slug}`} >
                    <a
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            height: '200px',
                            objectFit: 'cover'
                        }}>
                        <video

                            className="border w-100"
                            controls={true}
                            preload="none"
                            src={product?.document?.short_content_url}
                            poster={product?.poster_url}
                            style={{
                                borderTopRightRadius: '12px',
                                borderTopLeftRadius: '12px',
                                background: 'unset'
                            }}
                        >
                        </video>
                    </a>
                </Link>

            </div>
            <div className=" py-3">
                <div className="" style={{ display: 'flex', padding: '0 10px', justifyContent: 'space-between', gap: '10px' }}>
                    <h4 className='text-truncate fw-bold'>{title(product)}</h4>
                </div>
                <div className="ps-product__content card-narx-box" style={{ padding: '0 10px' }}>
                    {
                        product?.seller && 
                    <p className='mr-auto m-0'>{`${product?.seller?.first_name} ${product?.seller?.last_name}`}</p>
                    }
                    <div className="d-flex justify-content-between align-items-center">
                        {+product.discount_price === 0 ? (
                            <p className="free-audio-price">Bepul</p>
                        ) : product.discount === 0 ? (
                            <p className='m-0 fw-bold'>
                                {addPeriodToThousands(product.discount_price)} so'm
                            </p>
                        ) : (
                            <>
                                <del>
                                    {addPeriodToThousands(product.price)} so'm
                                </del>
                                <p className='m-0 fw-bold'>
                                    {addPeriodToThousands(product.discount_price)}
                                    so'm
                                </p>
                            </>
                        )}
                        <ModuleProductVideoActions product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductVideo;
