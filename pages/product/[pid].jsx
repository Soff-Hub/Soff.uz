import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import PageContainer from '~/components/layouts/PageContainer';
import HeaderMobileProduct from '~/components/shared/header-mobile/HeaderMobileProduct';

import HeaderElectronic from '~/components/shared/headers/HeaderElectronic';

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
            text: product ? product.title : 'Loading...',
        },
    ];

    // Views
    let productView, headerView;
    if (!loading) {
        if (product) {
            productView = <ProductDetailFullwidth product={product} />;
            headerView = (
                <>
                    <HeaderElectronic product={product} />
                    <HeaderMobileProduct />
                </>
            );
        } else {
            headerView = (
                <>
                    <HeaderDefault />
                    <HeaderMobileProduct />
                </>
            );
        }
    } else {
        productView = <SkeletonProductDetail />;
    }
    console.log(product);
    return (
        <PageContainer
            header={headerView}
            title={product ? product.title : 'Loading...'}>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
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
            {/* <Newletters /> */}
        </PageContainer>
    );
};

export default ProductDefaultPage;
