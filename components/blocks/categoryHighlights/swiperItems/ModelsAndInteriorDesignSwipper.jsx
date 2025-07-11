import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';
import ModelAndDesignProduct from '~/components/elements/products/ModelAndDesignProduct';

export default function ModelsAndInteriorDesignSwipper () {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`https://api.soff.uz/api/v1/customer/products?direction=3d`)
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
        <div className=' categoryHighlightsSwippercontainer'>
            {Array.isArray(product) && product.length > 0 && (
                <div className='categoryHighlightsSwipper'>
                    <div className='SwipperTitlewrap'>
                        <a
                            className='SwipperTitle'
                            href='/3d-models-and-interior-designs/all'>
                            3D moddellar va Interier dizaynlar
                        </a>
                    </div>
                    {product ? (
                        <Swiper_Pages type='3d'>
                            {product?.map((item, index) => (
                                <div>
                                    <ModelAndDesignProduct
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
