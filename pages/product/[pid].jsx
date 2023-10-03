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
import { baseUrl } from '~/repositories/Repository';
import Axios from 'axios';
import Meta from '~/components/shared/headers/Meta';

const ProductDefaultPage = (product) => {
    const router = useRouter();
    const { pid } = router.query;
    // const [product, setProduct] = useState([]);
    // const [loading, setLoading] = useState(false);

    // async function getProduct(pid) {
    //     setLoading(true);
    //     const responseData = await ProductRepository.getProductsById(pid);
    //     if (responseData) {
    //         setProduct(responseData);
    //         setTimeout(
    //             function () {
    //                 setLoading(false);
    //             }.bind(this),
    //             250
    //         );
    //     }
    // }

    // useEffect(() => {
    //     getProduct(pid);
    // }, [pid]);

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

    console.log('pro', product.product);

    return (
        <>
            <PageContainer
                title={product.product ? product.product.title : 'Loading...'}>
                <Meta
                    title={product?.product?.title}
                    image={product?.product?.iamges?.[0]?.image_url}
                />

                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />

                <div className="container">
                    <div className="ps-page--product">
                        <div className="ps-container">
                            <div className="ps-page__container">
                                <div className="ps-page__left">
                                    <ProductDetailFullwidth
                                        product={product.product}
                                    />
                                </div>
                            </div>

                            {product.product?.similar?.length > 0 ? (
                                <RelatedProduct
                                    data={product?.product?.similar}
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

export async function getStaticPaths() {
    try {
        const res = await fetch(baseUrl + 'customer/documents/');
        const documents = await res.json();
        const paths = documents.results.map((item) => ({
            params: { pid: item.slug },
        }));

        return { paths, fallback: false };
    } catch (error) {
        console.error('Error fetching paths:', error);
        throw error; // Rethrow the error to see it in the console
    }
}

// export async function getStaticProps({ params }) {
//     const resquest = [Axios.get(baseUrl + `customer/documents/${params.pid}`)];

//     const respons = await Promise.all(resquest);

//     const successData = [];

//     for (let i = 0; i < respons.length; i++) {
//         if (respons[i].status === 200) {
//             successData.push(respons[i].data);
//         }
//     }

//     return {
//         props: {
//             product: successData[0] || null,
//         },
//         revalidate: 60,
//     };
// }

export async function getStaticProps({ params }) {
    try {
        const response = await Axios.get(
            baseUrl + `customer/documents/${params.pid}`
        );

        if (response.status === 200) {
            return {
                props: {
                    product: response.data || null,
                },
                revalidate: 60,
            };
        } else {
            console.error('Error fetching product data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
    }

    return {
        props: {
            product: null,
        },
        revalidate: 60,
    };
}

export default ProductDefaultPage;
