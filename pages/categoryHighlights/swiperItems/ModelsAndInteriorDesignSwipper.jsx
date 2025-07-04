import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { baseURL } from '~/repositories/api';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';

export default function ModelsAndInteriorDesignSwipper () {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`${baseURL}customer/products?direction=3d`)
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
                    <h3 className='SwipperTitle'>
                        3D moddellar va Interier dizaynlar{' '}
                    </h3>

                    {product ? (
                        <Swiper_Pages type='3d'>
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
