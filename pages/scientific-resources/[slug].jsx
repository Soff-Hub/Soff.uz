import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import { useRouter } from 'next/router';
import CategoriesFilterSecion from '~/components/elements/CategoriesFilterSecion';
import useApi, { baseUrlUseApi } from '~/repositories/useApi';

export default function ProductCategoryScreen() {
    const router = useRouter();
    const { slug, page, parentCategory, childCategory } = router.query;

    // products API uchun so'rov
    const { data, error, isLoading } = useApi(
        ["products", slug, page, parentCategory, childCategory], // queryKey dinamik
        `${baseUrlUseApi}customer/products/?type=file&category=${childCategory ? childCategory : parentCategory}&page=${page || 1}&page_size=48`,
        "GET"
    );


    // Four-child API uchun so'rov
    const { data: fourChildData, error: fourChildError, isLoading: isFourChildLoading } = useApi(
        ["fourChild"], // Query key
        `${baseUrlUseApi}customer/four-child?type=file`,
        "GET"
    );

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
            title={'Ilmiy ishlar kategoriyasi'}
            boxed={true}>
            <Meta
                title={`${'Ilmiy ishlar kategoriyasi'}`}
                description={`Ilmiy ishlar kategoriyasi: Audio materiallar Biznes rejalar Video materiallar Taqdimotlar Tayyor shablonlar Kurs ishlari Diplom ishlari Referatlar Mustaqil ishlar Labaratoriya Ishlari Dissertatsiya ishlari Testlar O'quv qo'llanmalar Dars ishlanmalar Tarqatma materiallar Amaliy ishlar Blankalar Ijodiy Ishlar Loyihalar Plakatlar Maqola Ixtiro patenti Namunaviy hujjatlar Statistika Elektron kitoblar Dasturlash tillari `}
            />

            <div className='ps-page--shop container'>
                <CategoriesFilterSecion
                    breacrumb={fourChildData}
                    count={data?.count}
                    isLoading={isFourChildLoading}
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

        </PageContainer>
    );
}
