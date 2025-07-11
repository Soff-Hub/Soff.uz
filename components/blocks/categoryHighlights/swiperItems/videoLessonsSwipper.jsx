import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { baseURL } from '~/repositories/api';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';
import DesignDevelopmentProducts from '~/components/elements/products/DesignDevelopmentProducts';

export default function VideoLessonsSwipper () {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`${baseURL}customer/products?direction=video`)
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
                        <a className='SwipperTitle' href='/video-lessons/all'>
                            Video ishlanmalar
                        </a>
                    </div>
                    {product ? (
                        <Swiper_Pages type='video'>
                            {product.map((item, index) => (
                                <div>
                                    <DesignDevelopmentProducts
                                        key={index}
                                        product={item}
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
