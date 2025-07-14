import React, { useEffect, useState } from 'react';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';

export default function DesignDevelopmentSwipper() {
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

        <div className='categoryHighlightsSwippercontainer mb-5'>

            {Array.isArray(product) && product.length > 0 && (
                <div className='categoryHighlightsSwipper'>
                    <div className='SwipperTitlewrap'>
                        <a
                            className='SwipperTitle'
                            href='/design-developments/all'>
                            Dizayn shablonlar
                        </a>
                    </div>

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
