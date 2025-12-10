import { useRouter } from 'next/router';
import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import { baseUrlUseApi } from '~/repositories/useApi';
import ProductFilterSection, {
    getTitleFromSlug,
} from '~/components/elements/product-filter-section/ProductFilterSection';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import useSimilarSearch from '~/shared/hooks/useSimilarSearch';

const type = '3d';
const defaultTitle = '3D moddellar va Interier dizaynlar';
export default function ModelsAndInteriorDesign({
    productsData,
    fourChildData,
    childCategoryData,
    parentCategory,
    childCategory,
    page,
}) {
    // NOTE: changed temporarily to productsData to avoid issues with search results
    // const { mergedData } = useSimilarSearch({
    //     defaultData: productsData,
    //     defaultType: type,
    // });
    const router = useRouter();

    const handlePageChange = (newPage) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage },
        });
    };

    const title = getTitleFromSlug(fourChildData?.results, parentCategory);
    const subTitle = getTitleFromSlug(
        childCategoryData?.results,
        childCategory
    );

    const fullTitle = title && subTitle ? `${title} - ${subTitle}` : title;

    const finalTitle = fullTitle || defaultTitle;

    return (
        <PageContainer>
            <Meta
                title={finalTitle}
                description={`3D moddellar va Interier dizaynlar kategoriyasi: Taqdimotlar Tayyor shablonlar Kurs ishlari Diplom ishlari Referatlar Mustaqil ishlar Labaratoriya Ishlari Dissertatsiya ishlari Testlar O'quv qo'llanmalar Dars ishlanmalar Tarqatma materiallar Amaliy ishlar Blankalar Ijodiy Ishlar Loyihalar Plakatlar Maqola Ixtiro patenti Namunaviy hujjatlar Statistika Elektron kitoblar Dasturlash tillari `}
            />

            <ProductFilterSection
                title={fullTitle}
                child={childCategoryData.results}
                parent={fourChildData.results}
                path={'/3d-models-and-interior-designs/'}
            />
            <div className="ps-page--shop container p-xl-0 p-l-0">
                <ProductsByCategory
                    // NOTE: changed temporarily to productsData to avoid issues with search results
                    // data={mergedData}
                    data={productsData}
                    page={page}
                    handlePagination={(number) => {
                        handlePageChange(number);
                    }}
                    isLoading={false}
                />
            </div>
        </PageContainer>
    );
}

export async function getServerSideProps(context) {
    const {
        slug,
        page = 1,
        parentCategory = '',
        parentCategoryId,
        childCategory = '',
        childCategoryId,
        search = '',
        price_from = '',
        price_to = '',
    } = context.query;

    const fetchJson = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return res.json();
    };

    const searchParams = new URLSearchParams({
        type,
        limit: 50,
        page,
        search,
    });

    if (parentCategoryId) searchParams.append('category', parentCategoryId);
    if (childCategoryId) searchParams.append('child_category', childCategoryId);
    if (price_from) searchParams.append('price_from', price_from);
    if (price_to) searchParams.append('price_to', price_to);

    const categoryParam = childCategory ? childCategory : parentCategory;

    const searchPageUrl = `${baseUrlUseApi}customer/same-google-search/?${searchParams.toString()}`;
    const productsUrl = `${baseUrlUseApi}customer/products/?direction=${type}&category=${categoryParam}&page=${page}&page_size=50&search=${search}`;
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=${type}`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=${type}&parent__slug=${parentCategory}`;

    const [productsData, fourChildData, childCategoryData] = await Promise.all([
        // NOTE: changed temporarily to productsUrl to avoid issues with search results
        // fetchJson(search ? searchPageUrl : productsUrl),
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
