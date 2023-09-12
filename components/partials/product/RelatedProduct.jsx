import React, { Component, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';
import Product from '~/components/elements/products/Product';
import { carouselStandard } from '~/utilities/carousel-helpers';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import ProductRepository from '~/repositories/ProductRepository';

const RelatedProduct = ({ collectionSlug, boxed, layout, pid }) => {
    // console.log('kk' , pid);
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getProducts(parentID) {
        if (parentID) {
            setLoading(true);
            const responseData = await ProductRepository.getFilderProduct(null , null , parentID, null, null, null, null, null);

            if (responseData) {
                setProductItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        }
    }

    useEffect(() => {
        if (pid) {
            getProducts(pid);
        }
    }, [collectionSlug, pid]);

    const carouselFullwidth = {
        dots: false,
        infinite: productItems && productItems.length > 7 ? true : false,
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
    if (!loading) {
        if (productItems) {
            if ((layout = 'fullwidth')) {
                carouselView = (
                    <div className='d-flex align-content-center  flex-wrap carosusel-cards'>
                        {productItems?.length > 0 &&
                            productItems?.map((item, i) => (
                               
                                  <div className='detail-card'>  <Product product={item} key={i} /></div>
                            ))}
                    </div>
                );

            } else {
                carouselView = (
                    <>
                      {productItems?.length > 0 &&
                            productItems?.map((item, i) => (
                                <Slider
                                    {...carouselFullwidth}
                                    className="ps-carousel"
                                    arrows={true}
                                    >
                                    <Product product={item} key={i} />
                                </Slider>
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
            {productItems?.length > 0 ? (
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
