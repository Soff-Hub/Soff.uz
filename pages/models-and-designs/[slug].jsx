import { useRouter } from 'next/router';
import React from 'react';
import HeaderTitle from '~/components/blocks/header/HeaderTitle';
import ModelAndDesignHero from '~/components/blocks/header/ModelAndDesignHero';
import CategoriesFilterSecion from '~/components/elements/CategoriesFilterSecion';
import PageContainer from '~/components/layouts/PageContainer';
import ProductsByModelsAndDesignCategory from '~/components/partials/category/ProductsByModelsAndDesignCategory';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import useApi, { baseUrlUseApi } from '~/repositories/useApi';

export default function ModelsAndInteriorDesign() {
    const router = useRouter();
    const { slug, page, parentCategory, childCategory } = router.query;

    // products API uchun so'rov
    const { data, error, isLoading } = useApi(
        ['products', slug, page, parentCategory, childCategory], // queryKey dinamik
        `${baseUrlUseApi}customer/products/?category__direction=three_d_model&category=${childCategory ? childCategory : parentCategory
        }&page=${page || 1}&page_size=48`,
        'GET'
    );

    // Four-child API uchun so'rov
    const {
        data: fourChildData,
        error: fourChildError,
        isLoading: isFourChildLoading,
    } = useApi(
        ['fourChild'], // Query key
        `${baseUrlUseApi}customer/four-child?direction=three_d_model`,
        'GET'
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
            <ModelAndDesignHero />

            <div className='ps-page--shop container'>
                <CategoriesFilterSecion
                    breacrumb={fourChildData}
                    count={data?.count}
                    isLoading={isFourChildLoading}
                />
                <ProductsByModelsAndDesignCategory
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
