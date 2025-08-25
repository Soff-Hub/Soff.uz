import React, { useEffect, useState } from 'react';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';
import { baseURL } from '~/repositories/api';
import Image from 'next/image';

export default function DesignDevelopmentSwipper() {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`${baseURL}customer/last-added?direction=design&limit=6`)
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
        <div className="categoryHighlightsSwippercontainer">
            {Array.isArray(product) && product.length > 0 && (
                <div className="categoryHighlightsSwipper">
                    <div className="sectionLabel">
                        <Image
                            src={'/static/img/3d.png'}
                            width={30}
                            height={30}
                            alt="file"
                        />
                        <a
                            className="SwipperTitle"
                            href="/design-developments/all">
                            Dizayn shablonlar
                        </a>
                    </div>
                    <div className="scientificWorksCards">
                        {product &&
                            product.map((item, index) => (
                                <RedesignProduct product={item} key={index} />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
