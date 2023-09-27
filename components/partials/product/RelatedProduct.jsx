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

    // Views
    let carouselView;
    if (loading) {
        if (relatedProduct) {
            if ((layout = 'fullwidth')) {
                carouselView = (
                    <div className='d-flex align-content-center row  '>
                        {relatedProduct?.length > 0 &&
                            relatedProduct?.map((item, i) => (
                               
                                  <div className='home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6 '>  <Product product={item} key={i} /></div>
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
