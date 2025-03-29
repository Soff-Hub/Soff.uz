import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import { useRouter } from 'next/router';
import useApi, { baseUrlUseApi } from '~/repositories/useApi';
import FooterComponents from '~/components/blocks/footer/FooterComponents';
import ScientificResourcesFilterSection, { getTitleFromSlug } from '~/components/elements/scientificResourcesFilterSection';

export default function ProductCategoryScreen() {
    const router = useRouter();
    const { slug, page, parentCategory, childCategory } = router.query;

    // products API uchun so'rov
    const { data, error, isLoading } = useApi(
        ["products", page, parentCategory, childCategory], // queryKey dinamik 
        `${baseUrlUseApi}customer/products/?direction=scientific_work&category=${childCategory ? childCategory : parentCategory}&page=${page || 1}&page_size=48`,"GET"
    );

    // Otab kategoriya API uchun so'rov
    const { data: fourChildData, error: fourChildError, isLoading: isFourChildLoading } = useApi(
        ["fourChild"], // Query key
        `${baseUrlUseApi}customer/four-child?direction=scientific_work`,
        "GET"
    );

    // Farzand kategoriya API uchun so'rov
    const { data: childCategoryData, error: childCategoryEror, isLoading: isChildCategory } = useApi(
        ["fourChild", parentCategory], // Query key
        `${baseUrlUseApi}customer/four-child?direction=scientific_work&parent__slug=${parentCategory}`,
        "GET"
    );

    // Pagination tugmalari uchun funksiya
    const handlePageChange = (newPage) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage }, // URL'ga yangi page qo'shish
        });
    };

    const title = getTitleFromSlug(fourChildData?.results, parentCategory)
    const subTitle = getTitleFromSlug(childCategoryData?.results, childCategory)

    const fullTitle = title && subTitle 
    ? `${title} - ${subTitle}` 
    : title 
    ? title 
    : "Ilmiy ishlar kategoriyasi";

    return (
        <PageContainer
            footer={<FooterDefault />}
            title={fullTitle || 'Ilmiy ishlar kategoriyasi'}
            boxed={true}>
            <Meta
                title={`${fullTitle || 'Ilmiy ishlar kategoriyasi'}`}
                description={`${fullTitle || 'Ilmiy ishlar kategoriyasi'} bo‘yicha eng yaxshi raqamli mahsulotlarni Soff.uz da toping. Ishonchli sotuvchilar va sifatli kontent!`}
            />

            <div className='ps-page--shop container p-lg-1'>
                <ScientificResourcesFilterSection
                    breacrumb={fourChildData}
                    count={data?.count}
                    isLoading={isFourChildLoading}
                    childCategoryData={childCategoryData}
                />
                <ProductsByCategory
                    data={data}
                    page={page}
                    handlePagination={number => {
                        handlePageChange(number);
                    }}
                    isLoading={isLoading}
                />
            </div>
            <FooterComponents/>

        </PageContainer>
    );
}
