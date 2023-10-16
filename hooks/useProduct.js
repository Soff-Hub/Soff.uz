import React from 'react';
import LazyLoad from 'react-lazyload';
import { formatCurrency } from '~/utilities/product-helper';
import Link from 'next/link';

export default function useProduct() {
    return {
        thumbnailImage: (payload) => {
            return (
                <>
                    <LazyLoad>
                        {payload?.poster_url ? (
                            <div style={{ overflow: 'hidden' }} className='responsive-image-card'>
                                <div
                                    style={{
                                        backgroundImage: `url(${payload?.poster_url})`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                    }}
                                    className="products-image1 m-0"></div>
                            </div>
                        ) : (
                            <div
                                style={{
                                    backgroundImage: `url(/static/img/docCopy.jpg)`,
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
                        {formatCurrency(payload.sale_price)}
                        <span> so'm</span>
                        <del className="ml-2">
                            {formatCurrency(payload.price)}
                            <span> so'm</span>
                        </del>
                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        {formatCurrency(payload.price)}
                        <span> so'm</span>
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
