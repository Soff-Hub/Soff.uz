import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import { useRouter } from 'next/router';
import useApi, { baseUrlUseApi } from '~/repositories/useApi';
import ProductsByDesignDevelopment from '~/components/partials/category/ProductsByDesignDevelopment';
import CategoriesFilterForDesignDevelopmentsSection from '~/components/elements/CategoriesFilterForDesignDevelopmentsSection';

export default function DesignDevelopments () {
    const router = useRouter();
    const { slug, page, parentCategory, childCategory } = router.query;

    // products API uchun so'rov
    const { data, error, isLoading } = useApi(
        ['products', slug, page, parentCategory, childCategory], // queryKey dinamik
        `${baseUrlUseApi}customer/products/?direction=scientific_work&category=${
            childCategory ? childCategory : parentCategory
        }&page=${page || 1}&page_size=48`,
        'GET'
    );

    // Four-child API uchun so'rov
    const { data: fourChildData, error: fourChildError, isLoading: isFourChildLoading, } = useApi(
        ['fourChild'], // Query key
        `${baseUrlUseApi}customer/four-child?direction=scientific_work`,
        'GET'
    );

    // Farzand kategoriya API uchun so'rov
    const { data: childCategoryData, error: childCategoryEror, isLoading: isChildCategory } = useApi(
        ["fourChild", parentCategory], // Query key
        `${baseUrlUseApi}customer/four-child?direction=scientific_work&parent__slug=${parentCategory}`,
        "GET"
    );

    // Pagination tugmalari uchun funksiya
    const handlePageChange = newPage => {
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

            <div className='ps-page--shop container'>
                <CategoriesFilterForDesignDevelopmentsSection
                    breacrumb={fourChildData}
                    count={data?.count}
                    isLoading={isFourChildLoading}
                    childCategoryData={childCategoryData}
                />
                <ProductsByDesignDevelopment
                    data={data}
                    page={page}
                    handlePagination={number => {
                        handlePageChange(number);
                    }}
                    isLoading={isLoading}
                />
            </div>
        </PageContainer>
    );
}
