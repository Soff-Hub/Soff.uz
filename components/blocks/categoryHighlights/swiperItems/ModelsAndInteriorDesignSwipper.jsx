import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';
import ModelAndDesignProduct from '~/components/elements/products/ModelAndDesignProduct';
import { baseURL } from '~/repositories/api';
import Image from 'next/image';

export default function ModelsAndInteriorDesignSwipper() {
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
        <div className=" categoryHighlightsSwippercontainer">
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
                            href="/3d-models-and-interior-designs/all">
                            3D Moddellar
                        </a>
                    </div>
                    <div className="scientificWorksCards">
                        {product &&
                            product.map((item, index) => (
                                <ModelAndDesignProduct
                                    product={item}
                                    key={index}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
