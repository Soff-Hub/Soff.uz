import React from 'react';
import LazyLoad from 'react-lazyload';
import { formatCurrency } from '~/utilities/product-helper';
import Link from 'next/link';
import NextImageCard from '~/components/nextImagecard';

export default function useProduct() {
    return {
        thumbnailImage: (payload) => {
            return (
                <>
                    <LazyLoad>
                        {payload?.poster_url ? (
                            <div style={{ overflow: 'hidden' }} className='responsive-image-card text-center'>
                                {/* <div
                                    style={{
                                        backgroundImage: `url(${payload?.poster_url})`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                    }}
                                    className="products-image1 m-0"></div> */}
                                <NextImageCard url={payload?.poster_url} clasS='products-image1 m-0 ' width='70px' height='70px' />
                            </div>
                        ) : (
                            <div
                                style={{
                                    backgroundImage: `url(/static/img/docCopy.png)`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                }}
                                className="placholder-hujjat products-image1"></div>
                        )}
                    </LazyLoad>
                </>
            );
        },
        price: (payload) => {
            let view;
            if (payload.sale_price) {
                view = (
                    <p className="ps-product__price sale">
                        {payload.discount_price !== 0 ? <>
                            {formatCurrency(payload.sale_price)}
                            <span> so'm</span>
                            <del className="ml-2">
                                {formatCurrency(payload.price)}
                                <span> so'm</span>
                            </del>
                        </> : "Bepul mahsulot"}

                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        {payload.discount_price === 0 ? <>
                            Bepul mahsulot
                        </> : <>{formatCurrency(payload.price)} <span> so'm</span></>}

                    </p>
                );
            }
            return view;
        },

        title: (payload) => {
            let view = (
                <Link href="/product/[pid]" as={`/product/${payload.slug}`}>
                    <a className="ps-product__title ">{payload.title}</a>
                </Link>
            );
            return view;
        },
    };
}
