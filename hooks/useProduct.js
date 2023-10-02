import React from 'react';
import LazyLoad from 'react-lazyload';
import { baseUrl } from '~/repositories/Repository';
import { formatCurrency } from '~/utilities/product-helper';
import Link from 'next/link';

function getImageURL(source, size) {
    let image, imageURL;

    if (source) {
        if (size && size === 'large') {
            if (source.formats.large) {
                image = source.formats.large.url;
            } else {
                image = source.url;
            }
        } else if (size && size === 'medium') {
            if (source.formats.medium) {
                image = source.formats.medium.url;
            } else {
                image = source.url;
            }
        } else if (size && size === 'thumbnail') {
            if (source.formats.thumbnail) {
                image = source.formats.source.url;
            } else {
                image = source.url;
            }
        } else if (size && size === 'small') {
            if (source.formats.small !== undefined) {
                image = source.formats.small.url;
            } else {
                image = source.url;
            }
        } else {
            image = source.poster_url;
        }
        imageURL = `${baseUrl}${image}`;
    } else {
        imageURL = `/static/img/undefined-product-thumbnail.jpg`;
    }
    return imageURL;
}

export default function useProduct() {
    return {
        thumbnailImage: (payload) => {
            if (payload) {
                if (payload?.poster_url !== '') {
                    return (
                        <>
                            <LazyLoad>
                                {payload?.poster_url ? (
                                   <div style={{overflow:'hidden'}}>
                                     <div
                                        style={{
                                            backgroundImage: `url(${payload.poster_url})`,
                                            backgroundSize:'contain',
                                            backgroundRepeat:'no-repeat',
                                            backgroundPosition: 'center'
                                        }}
                                        className="products-image1"></div>
                                   </div>
                                ) : (
                                  
                                    <div
                                    style={{
                                        backgroundImage: `url(/static/img/docCopy.jpg)`,
                                        backgroundSize:'contain',
                                        backgroundRepeat:'no-repeat',

                                    }}
                                    className='placholder-hujjat products-image1'
                                    ></div>
                                )}
                            </LazyLoad>
                        </>
                    );
                }
            }
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
