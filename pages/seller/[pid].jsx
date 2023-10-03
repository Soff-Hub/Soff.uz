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
import Product from '~/components/elements/products/Product';

const SellerPage = ({ seller }) => {
    const router = useRouter();
    const { pid } = router.query;

    console.log('pid', seller.results);
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: seller?.results[0]
                ? seller?.results[0]?.seller?.first_name
                : 'Loading...',
        },
    ];

    // let productView = <SkeletonProductDetail />;
    return (
        <PageContainer>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />

            <div className="ps-product-list mb-5">
                <div className="container">
                    <h4 className="pt-5">
                        Muallif : {seller?.results[0]?.seller?.first_name} {seller?.results[0]?.seller?.last_name}
                    </h4>

                    <div className="row">
                        {seller?.results?.map((item, index) => (
                             <div className='home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6' >   <Product key={item.id} product={item} /> </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageContainer>
        
    );
};

// export async function getStaticPaths() {
//     const res = await fetch(baseUrl + 'customer/documents/');
//     const documents = await res.json();
//     const paths = documents.results.map((item) => ({
//         params: { pid: item.seller.id },
//     }));

//     return { paths, fallback: false };
// }

export async function getServerSideProps({ query }) {
    const resquest = await fetch(
        baseUrl + `customer/documents/?seller__id=${query.pid}`
    );
    const seller = await resquest.json();

    return {
        props: {
            seller,
        },
    };
}

export default SellerPage;
