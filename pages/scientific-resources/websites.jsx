import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import HeaderTitle from '~/components/blocks/header/headerTitle';
import PageContainer from '~/components/layouts/PageContainer';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import ProductRepository from '~/repositories/ProductRepository';

export default function Websites () {
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const breadCrumbRef = useRef(null); // Reference to the product list container
    const router = useRouter();
    const { slug } = router.query;

    async function getProductsByCategoryName () {
        setLoadingProducts(true);
        const responseData = await ProductRepository.getCustomerProducts(
            'file',
            page,
            48,
            slug
        );
        responseData && setData(responseData);
        setLoadingProducts(false);
        console.log('data=>', data);
    }

    const getCategories = async () => {
        const res = await ProductRepository.getMoreTopCategorys();
        res && setCategoryData(res.results);
    };

    useEffect(() => {
        page == 1 && getProductsByCategoryName();

        setPage(1);
    }, [slug]);

    useEffect(() => {
        getProductsByCategoryName();
        if (breadCrumbRef.current) {
            breadCrumbRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [page]);

    useEffect(() => {
        getCategories();
    }, []);
    return (
        <div>
            <h1>Websitesss</h1>
            <div className='container'>
                <HeaderTitle />
                <ul className='d-flex justify-content-center gap-5 py-3 bg-white'>
                    <li className='websitesNavItems'>WebSiteDesign</li>
                    <li className='websitesNavItems'>WebSiteDesign</li>
                    <li className='websitesNavItems'>WebSiteDesign</li>
                    <li className='websitesNavItems'>WebSiteDesign</li>
                    <li className='websitesNavItems'>WebSiteDesign</li>
                    <li className='websitesNavItems'>WebSiteDesign</li>
                </ul>

                <ProductsByCategory
                    data={data}
                    loading={loadingProducts}
                    page={page}
                    handlePagination={number => {
                        setPage(number);
                    }}
                />
            </div>
            <PageContainer />
        </div>
    );
}
