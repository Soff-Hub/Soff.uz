import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import DesignDevelopmentProducts from '~/components/elements/products/DesignDevelopmentProducts';
import { baseURL } from '~/repositories/api';
import SwiperPages from '~/components/details-components/swiper/swiper-page';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';

export default function DesignDevelopmentSwipper () {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`https://api.soff.uz/api/v1/customer/products?direction=design`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.results);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className='container'>
            {Array.isArray(product) && product.length > 0 && (
                <div className='categoryHighlightsSwipper'>
                    <h3 className='SwipperTitle'>Dizayn shablonlar</h3>

                    {product ? (
                        <Swiper_Pages type='design'>
                            {product.map((item, index) => (
                                <div>
                                    <RedesignProduct
                                        product={item}
                                        key={index}
                                    />
                                </div>
                            ))}
                        </Swiper_Pages>
                    ) : null}
                </div>
            )}
        </div>
    );
}
