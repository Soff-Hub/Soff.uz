import { useRouter } from 'next/router';
import React from 'react';
import ThreeDCategoriesFilterSecion from '~/components/elements/ThreeDCategoriesFilterSecion';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import ProductsByModelsAndDesignCategory from '~/components/partials/category/ProductsByModelsAndDesignCategory';
import { baseUrlUseApi } from '~/repositories/useApi';
import CategorySearchSection from '~/components/elements/CategorySearchSection';
import ProductFilterSection from '~/components/elements/product-filter-section/ProductFilterSection';

export default function ModelsAndInteriorDesign ({
    productsData,
    fourChildData,
    childCategoryData,
    page,
}) {
    const router = useRouter();

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
                title={`${'3D moddellar va Interier dizaynlar'}`}
                description={`3D moddellar va Interier dizaynlar kategoriyasi: Taqdimotlar Tayyor shablonlar Kurs ishlari Diplom ishlari Referatlar Mustaqil ishlar Labaratoriya Ishlari Dissertatsiya ishlari Testlar O'quv qo'llanmalar Dars ishlanmalar Tarqatma materiallar Amaliy ishlar Blankalar Ijodiy Ishlar Loyihalar Plakatlar Maqola Ixtiro patenti Namunaviy hujjatlar Statistika Elektron kitoblar Dasturlash tillari `}
            />

            <ProductFilterSection
                child={childCategoryData.results}
                parent={fourChildData.results}
                path={"/3d-models-and-interior-designs/"}
            />
            <div className='ps-page--shop my-5 container p-xl-0 p-l-0'>
                {/* <CategorySearchSection />
                <ThreeDCategoriesFilterSecion
                    breacrumb={fourChildData}
                    count={productsData?.count}
                    isLoading={false}
                    childCategoryData={childCategoryData}
                    route='/3d-models-and-interior-designs'
                /> */}
                <ProductsByModelsAndDesignCategory
                    data={productsData}
                    page={page}
                    handlePagination={number => {
                        handlePageChange(number);
                    }}
                    isLoading={false}
                />
                
                {/* <FilterSection
                    breacrumb={fourChildData}
                    count={productsData?.count}
                    isLoading={false}
                    childCategoryData={childCategoryData}
                    route='/3d-models-and-interior-designs'
                /> */}
                {/* <DynamicProductList
                    data={productsData}
                    page={page}
                    handlePagination={number => {
                        handlePageChange(number);
                    }}
                    isLoading={false}
                /> */}
            </div>
        </PageContainer>
    );
}



export async function getServerSideProps (context) {
    const {
        slug,
        page = 1,
        parentCategory = '',
        childCategory = '',
        search = '',
    } = context.query;

    const fetchJson = async url => {
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return res.json();
    };

    const categoryParam = childCategory ? childCategory : parentCategory;

    const productsUrl = `${baseUrlUseApi}customer/products/?direction=3d&category=${categoryParam}&page=${page}&page_size=48&search=${search}`;
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=3d`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=3d&parent__slug=${parentCategory}`;

    const [productsData, fourChildData, childCategoryData] = await Promise.all([
        fetchJson(productsUrl),
        fetchJson(fourChildUrl),
        fetchJson(childCategoryUrl),
    ]);

    return {
        props: {
            productsData: productsData || null,
            fourChildData: fourChildData || null,
            childCategoryData: childCategoryData || null,
            parentCategory,
            childCategory,
            page,
        },
    };
}
