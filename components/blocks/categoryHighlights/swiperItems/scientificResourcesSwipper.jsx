import React, { useEffect, useState } from 'react';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';

export default function ScientificResourcesSwipper() {
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`https://api.soff.uz/api/v1/customer/products/?direction=file`)
            .then(res => res.json())
            .then(data => {
                setProducts(data?.results);
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
            {Array.isArray(products) && products.length > 0 && (
                <div className='categoryHighlightsSwipper'>
                    <div className='SwipperTitlewrap'>
                        <a
                            className='SwipperTitle'
                            href='/scientific-resources/all'>
                            Ilmiy ishlar
                        </a> 
                    </div>

                    {products ? (
                        <Swiper_Pages categoryName type='template'>
                            {products?.map((item, index) => (
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
