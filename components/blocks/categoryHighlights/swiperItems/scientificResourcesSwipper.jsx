import React, { useEffect, useState } from 'react';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';
import { baseURL } from '~/repositories/api';
import { Col, Row } from 'antd';
import Image from 'next/image';

export default function ScientificResourcesSwipper() {
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`${baseURL}customer/last-added/?direction=file&limit=6`)
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
        <div className="categoryHighlightsSwippercontainer">
            {Array.isArray(products) && products.length > 0 && (
                <div className="categoryHighlightsSwipper">
                    <div className="SwipperTitlewrap">
                        <img
                            className="m-0 pb-4 pr-2"
                            src="/static/img/star.svg"
                            alt="badge"
                        />
                        <a
                            className="SwipperTitle"
                            href="/scientific-resources/all">
                            So’ngi yuklangan mahsulotlar
                        </a>
                    </div>
                    <div className="sectionLabel">
                        <Image
                            src={'/static/img/file.png'}
                            width={30}
                            height={30}
                            alt="file"
                        />
                        <h4>Ilmiy ishlar</h4>
                    </div>
                    <div className="scientificWorksCards">
                        {products &&
                            products?.map((item, index) => (
                                <RedesignProduct product={item} key={index} />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
