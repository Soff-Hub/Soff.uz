import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import PageContainer from '~/components/layouts/PageContainer';

import Meta from '~/components/shared/headers/Meta';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import { baseUrl } from '~/repositories/Repository';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductRepository from '~/repositories/ProductRepository';

export async function getServerSideProps(context) {

    try {
        const request = await fetch(
            baseUrl + `customer/documents/${context.query.pid}/`
        );
        const product = await request.json();

        const SimilarRes = await fetch(
            baseUrl + `customer/similar/${context.query.pid}/`
        );
        const similar = await SimilarRes.json();

        return {
            props: {
                product,
                similar,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            props: {
                product: null,
                similar: null,
            },
        };
    }
}

const ProductDefaultPage = ({ product, similar }) => {
    const router = useRouter();
    const { pid } = router.query;
    const [document, setDocument] = useState('');
    const { user } = useSelector((state) => state.auth);

    async function getDocument() {
        const responsDocumentFile = await ProductRepository.getProductFileSlug(
            pid,
            user?.access
        );
        if (responsDocumentFile) {
            setDocument(responsDocumentFile);
        }
    }

    useEffect(() => {
        if (user?.access) {
            getDocument();
        }
    }, [user?.access]);

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: product.title ? product.title : 'Loading...',
        },
    ];


    return (
        <>
            <PageContainer title={product ? product.title : 'Loading...'}>
                <Meta
                    title={`Soff | ${product.title}`}
                    image={product?.document?.images?.[0]?.image_url}
                    description={`${product.title} mahsulotni saytimizdan Soff.uz bepul yuklab yoki sotib olishingiz mumkin`}
                />

                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />

                <div className="container">
                    <div className="ps-page--product">
                        <div className="ps-container">
                            <div className="ps-page__container">
                                <div className="ps-page__left">
                                    {product ? (
                                        <ProductDetailFullwidth
                                            product={product}
                                            document={document}
                                        />
                                    ) : (
                                        <SkeletonProductDetail />
                                    )}
                                </div>
                            </div>

                            {similar?.length > 0 ? (
                                <RelatedProduct
                                    data={similar}
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
