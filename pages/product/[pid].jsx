import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import PageContainer from '~/components/layouts/PageContainer';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import { baseUrl } from '~/repositories/Repository';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PostRepository from '~/repositories/PostRepository';
import ProductVideoDetailFullWidth from '~/components/elements/detail/ProductVideoDetailFullWidth';
import ProductAudioDetailFullWidth from '~/components/elements/detail/ProductAudioDetailFullWidth';
import axios from 'axios'
import Head from "next/head";


const ProductDefaultPage = ({ defaultProducts }) => {
    const router = useRouter();
    const { pid } = router.query;
    const [views, setViews] = useState(null);
    const [product, setProduct] = useState([]);
    const [similar, setSimilar] = useState([]);

    const { user } = useSelector((state) => state.auth);

    async function getProducts() {
        const token = user?.access;
        try {
            const response = await axios.get(
                baseUrl + `customer/documents/${pid}/`,
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },

                }
            );

            setProduct(response?.data);

        } catch (error) {
            console.error('Error fetching document:', error);
        }
    }

    async function getProductSimiller() {
        try {
            const token = user?.access;
            const response = await axios.get(
                baseUrl + `customer/similar/${pid}/`,
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },

                }
            );

            const responseDocumentFile = response.data;
            setSimilar(responseDocumentFile);

        } catch (error) {
            console.error('Error fetching document:', error);
        }
    }



    async function getUUID(uuid) {
        const respons = await PostRepository.postProductUUID(pid, uuid);
        if (respons) {
            setViews(respons);
        }
    }

    useEffect(() => {
        if (pid) {
            getProducts();
            getProductSimiller();
        }

    }, [user?.access, pid]);


    useEffect(() => {
        if (pid) {
            localStorage.getItem('uuid')
                ? ''
                : localStorage.setItem('uuid', uuidv4());
            getUUID(
                localStorage.getItem('uuid')
                    ? localStorage.getItem('uuid')
                    : uuidv4()
            );
        }
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
            <PageContainer title={defaultProducts ? defaultProducts?.title : 'Loading...'}>
                <Head>
                    {defaultProducts && (
                        <>
                            <meta property="og:title" content={`Soff | ${defaultProducts?.title}`} />
                            <meta property="og:description" content="Soff | Soff online hujjatlar bazasi" />
                            <meta property="og:image" content={defaultProducts?.poster_url} />
                            <meta property="og:site_name" content="Soff.uz" />
                            <title>{defaultProducts?.title}</title>
                        </>
                    )}
                    <meta
                        name="description"
                        content="Soff.uz - Intellektual mulk marketi, Intellektual mahsulotlarini soting va xarid qiling."
                    />
                </Head>

                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />

                <div className="container">
                    <div className="ps-page--product">
                        <div className="ps-container">
                            <div className="ps-page__container">
                                {product?.document?.content_type === 'file' ? (
                                    <div className="ps-page__left">
                                        <ProductDetailFullwidth
                                            product={product}
                                            views={views}
                                        />
                                    </div>
                                ) : product?.document?.content_type ===
                                    'video' ? (
                                    <div className="">
                                        <ProductVideoDetailFullWidth
                                            product={product}
                                            views={views}

                                        />
                                    </div>
                                ) : product?.document?.content_type ===
                                    'audio' ?
                                    <div className="">
                                        <ProductAudioDetailFullWidth
                                            product={product}
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


export async function getServerSideProps({ query }) {
    const resquest = await fetch(
        baseUrl + `customer/documents/${query.pid}/`,
    );
    const defaultProducts = await resquest.json();

    return {
        props: {
            defaultProducts,
        },
    };
}


export default ProductDefaultPage;

