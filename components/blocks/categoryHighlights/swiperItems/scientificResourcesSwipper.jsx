import React, { useEffect, useState } from 'react';
import Swiper_Pages from '../swipper/swiper';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';
import { baseURL } from '~/repositories/api';
import { Col, Row } from 'antd';

export default function ScientificResourcesSwipper() {
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch(`${baseURL}customer/last-added/?direction=file&limit=12`)
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
                            src="/static/img/HomePage/icon.png"
                            alt="badge"
                        />
                        <a
                            className="SwipperTitle"
                            href="/scientific-resources/all">
                            So’ngi yuklangan mahsulotlar
                        </a>
                    </div>
                    <Row gutter={[5,5]}>
                        {products
                            ? products?.map((item, index) => (
                                  <Col xs={24} sm={12} md={12} lg={6} xxl={4}>
                                      <RedesignProduct
                                          product={item}
                                          key={index}
                                      />
                                  </Col>
                              ))
                            : null}
                    </Row>
                </div>
            )}
        </div>
    );
}
