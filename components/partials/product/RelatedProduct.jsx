import React, { Component, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';
import Product from '~/components/elements/products/Product';
import { carouselStandard } from '~/utilities/carousel-helpers';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import ProductRepository from '~/repositories/ProductRepository';

const RelatedProduct = ({ collectionSlug, boxed, layout, pid , data}) => {
    // console.log('kk' , pid);
    const [relatedProduct, setRelatedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data) {
            setRelatedProduct(data)
        }
    }, [collectionSlug, pid]);

    const carouselFullwidth = {
        dots: false,
        infinite: relatedProduct && relatedProduct.length > 7 ? true : false,
        speed: 750,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        lazyload: true,
        responsive: [
            {
                breakpoint: 1750,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                    dots: true,
                    arrows: false,
                },
            },

            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };
    // Views
    let carouselView;
    if (loading) {
        if (relatedProduct) {
            if ((layout = 'fullwidth')) {
                carouselView = (
                    <div className='d-flex align-content-center row   carosusel-cards'>
                        {relatedProduct?.length > 0 &&
                            relatedProduct?.map((item, i) => (
                               
                                  <div className='detail-card '>  <Product product={item} key={i} /></div>
                            ))}
                    </div>
                );

            } else {
                carouselView = (
                    <>
                      {relatedProduct?.length > 0 &&
                            relatedProduct?.map((item, i) => (
                                <div className='detail-card '>  <Product product={item} key={i} /></div>
                            ))}
                    </>
                );
            }
        } else {
            carouselView = <p>Hujjat topilmadi</p>;
        }
    } else {
        carouselView = <p>Loading...</p>;
    }

    return (
        <>
            {relatedProduct?.length > 0 ? (
                <div
                    className={`ps-section--default ps-related-products ${
                        boxed === true ? 'boxed' : ''
                    }`}>
                    <div className="ps-section__header">
                        <h3>O'xshash hujjatlar</h3>
                    </div>
                    <div className="ps-section__content">{carouselView}</div>
                </div>
            ) : (
                <></>
            )}
        </>

    );
};

export default RelatedProduct;
