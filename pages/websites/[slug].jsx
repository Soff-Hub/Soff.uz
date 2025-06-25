import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import { useRouter } from 'next/router';
import useApi, { baseUrlUseApi } from '~/repositories/useApi';
import WebsitesProductsByCategory from '~/components/partials/category/WebsitesProductsByCategory';
import WebsitesCategoriesFilterSecion from '~/components/elements/WebsitesCategoriesFilterSecion';

export default function Websites({ 
    productsData, 
    fourChildData, 
    childCategoryData, 
    parentCategory, 
    childCategory, 
    page 
}) {
    const router = useRouter();
    
    // Pagination tugmalari uchun funksiya
    const handlePageChange = (newPage) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage }, // URL'ga yangi page qo'shish
        });
    };

    return (
        <PageContainer
            footer={<FooterDefault />}
            title={'Kategoriya'}
            boxed={true}>
            <Meta
                title={`${'asdf'}`}
                description={`Biz siz qidirayotgan mahsulotlarni Soff.uz saytimizning kategoriyasida topdik`}
            />

            <div className='ps-page--shop container my-5'>
                <WebsitesCategoriesFilterSecion
                    breacrumb={fourChildData}
                    count={productsData?.count}
                    isLoading={false}
                    childCategoryData={childCategoryData}
                />
                <WebsitesProductsByCategory
                    data={productsData}
                    page={page}
                    handlePagination={number => {
                        handlePageChange(number);
                    }}
                    isLoading={false}
                />
            </div>

        </PageContainer>
    );
}



export async function getServerSideProps(context) {
    const { slug, page = 1, parentCategory = '', childCategory = '' } = context.query;

    const fetchJson = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return res.json();
    };

    const categoryParam = childCategory ? childCategory : parentCategory;

    const productsUrl = `${baseUrlUseApi}customer/products/?direction=website&category=${categoryParam}&page=${page}&page_size=48`;
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=website`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=website&parent__slug=${parentCategory}`;

    const [productsData, fourChildData, childCategoryData] = await Promise.all([
        fetchJson(productsUrl),
        fetchJson(fourChildUrl),
        fetchJson(childCategoryUrl)
    ]);

    return {
        props: {
            productsData: productsData || null,
            fourChildData: fourChildData || null,
            childCategoryData: childCategoryData || null,
            parentCategory,
            childCategory,
            page
        }
    };
}
