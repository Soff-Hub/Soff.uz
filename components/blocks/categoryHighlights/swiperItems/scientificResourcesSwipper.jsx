import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { baseURL } from '~/repositories/api';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';
import DesignDevelopmentProducts from '~/components/elements/products/DesignDevelopmentProducts';

export default function ScientificResourcesSwipper () {
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`${baseURL}customer/products?direction=file`)
            .then(res => res.json())
            .then(data => {
                setProduct(data?.results);
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
                            href='/scientific-resources/all'>
                            Ilmiy ishlar{' '}
                        </a>
                    </div>
                    {product ? (
                        <Swiper_Pages categoryName type='file'>
                            {product?.map((item, index) => (
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
