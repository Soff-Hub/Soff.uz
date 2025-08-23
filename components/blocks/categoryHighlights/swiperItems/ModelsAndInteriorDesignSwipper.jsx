import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';
import ModelAndDesignProduct from '~/components/elements/products/ModelAndDesignProduct';
import { baseURL } from '~/repositories/api';

export default function ModelsAndInteriorDesignSwipper () {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`${baseURL}customer/last-added?direction=3d&limit=4`)
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
                    <div className='row px-3'>
                        {product ? (
                            product?.slice(0, 4).map((item, index) => (
                                    <div className='col-6 col-sm-6 col-md-6 col-lg-3 p-2 mb-4'>
                                        <ModelAndDesignProduct
                                            product={item}
                                            key={index}
                                        />
                                    </div>
                                ))
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}
