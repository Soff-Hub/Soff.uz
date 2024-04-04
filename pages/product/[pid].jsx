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
import { v4 as uuidv4 } from 'uuid';
import PostRepository from '~/repositories/PostRepository';
import ProductVideoDetailFullWidth from '~/components/elements/detail/ProductVideoDetailFullWidth';
import ProductAudioDetailFullWidth from '~/components/elements/detail/ProductAudioDetailFullWidth';

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
    const [views, setViews] = useState(null);
    const [document, setDocument] = useState('');
    const { user } = useSelector((state) => state.auth);

    async function getDocument() {
        const responseDocumentFile = await ProductRepository.getProductFileSlug(
            pid,
            user?.access,
            localStorage.getItem('uuid') || uuidv4()
        );
        if (responseDocumentFile && responseDocumentFile !== document) {
            setDocument(responseDocumentFile);
        }
    }

    async function getUUID(uuid) {
        const respons = await PostRepository.postProductUUID(pid, uuid);
        if (respons) {
            setViews(respons);
        }
    }

    useEffect(() => {
        if (user?.access && pid) {
            getDocument();
        }
    }, [user?.access, pid]);

    useEffect(() => {
        localStorage.getItem('uuid')
            ? ''
            : localStorage.setItem('uuid', uuidv4());
        getUUID(
            localStorage.getItem('uuid')
                ? localStorage.getItem('uuid')
                : uuidv4()
        );
    }, []);

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: product?.title ? product?.title : 'Loading...',
        },
    ];




    return (
        <>
            <PageContainer title={product ? product.title : 'Loading...'}>
                <Meta
                    title={`Soff | ${product?.title}`}
                    image={product?.document?.images?.[0]?.image_url}
                    description={`${product?.title} mahsulotni saytimizdan Soff.uz bepul yuklab yoki sotib olishingiz mumkin`}
                />

                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />

                <div className="container">
                    <div className="ps-page--product">
                        <div className="ps-container">
                            <div className="ps-page__container">
                                {product?.document?.content_type === 'file' ? (
                                    <div className="ps-page__left">
                                        <ProductDetailFullwidth
                                            product={product}
                                            document={document}
                                            views={views}
                                        />
                                    </div>
                                ) : product?.document?.content_type ===
                                    'video' ? (
                                    <div className="">
                                        <ProductVideoDetailFullWidth
                                            product={product}
                                            document={document}
                                            views={views}

                                        />
                                    </div>
                                ) : product?.document?.content_type ===
                                    'audio' ?
                                    <div className="">
                                        <ProductAudioDetailFullWidth
                                            product={product}
                                            document={document}
                                            views={views}
                                        />
                                    </div> : product?.document?.content_type ===
                                        'article' ?
                                        <div>
                                            {/* <ProductAudioDetailFullWidth
                                    product={product}
                                    document={document}
                                    views={views}
                                /> */}
                                        </div>
                                        : (
                                            <div className="ps-page__left">
                                                <SkeletonProductDetail />
                                            </div>
                                        )}
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

