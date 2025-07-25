import React, { useEffect, useState } from 'react';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';
import { baseURL } from '~/repositories/api';

export default function TemplatesSwipper() {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`${baseURL}customer/last-added?direction=template&limit=6`)
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

        <div className='categoryHighlightsSwippercontainer '>
            {Array.isArray(product) && product.length > 0 && (
                <div className='categoryHighlightsSwipper'>
                    <div className='SwipperTitlewrap'>
                        <a
                            className='SwipperTitle'
                            href='/templates/all'>
                            Tayyor shablonlar
                        </a>
                    </div>
                    <div className='row'>
                        {product ? (
                            product.slice(0, 6).map((item, index) => (
                                <div className='col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4'>
                                    <RedesignProduct
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
