import React from 'react';
import { useRouter } from 'next/router';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import PageContainer from '~/components/layouts/PageContainer';

import { baseUrl } from '~/repositories/Repository';
import Axios from 'axios';
import Meta from '~/components/shared/headers/Meta';
import { useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import { useEffect } from 'react';

const ProductDefaultPage = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getProduct(pid) {
        setLoading(true);
        const responseData = await ProductRepository.getProductsById(pid);
        if (responseData) {
            setProduct(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getProduct(pid);
    }, [pid]);

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: product.product ? product.product.title : 'Loading...',
        },
    ];

    // Views

    // let productView, headerView;
    // if (true) {
    //     if (product) {
    //         productView = <ProductDetailFullwidth product={product} />;
    //         headerView = (
    //             <>
    //                 <HeaderElectronic product={product} />
    //                 <HeaderMobileProduct />
    //             </>
    //         );
    //     } else {
    //         headerView = (
    //             <>
    //                 <HeaderDefault />
    //                 <HeaderMobileProduct />
    //             </>
    //         );
    //     }
    // } else {
    //     productView = <SkeletonProductDetail />;
    // }


    return (
        <>
            <PageContainer
                title={product ? product?.title : 'Loading...'}>
                <Meta
                    title={product?.title}
                    image={product?.images?.[0]?.image_url}
                />

                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />

                <div className="container">
                    <div className="ps-page--product">
                        <div className="ps-container">
                            <div className="ps-page__container">
                                <div className="ps-page__left">
                                    {
                                        product ?
                                        <ProductDetailFullwidth
                                            product={product}
                                        /> :
                                        <SkeletonProductDetail />
                                    }
                                </div>
                            </div>

                            {product?.similar?.length > 0 ? (
                                <RelatedProduct
                                    data={product?.similar}
                                    pid={pid}
                                    collectionSlug="shop-recommend-items"
                                />
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    );
};


export default ProductDefaultPage;
