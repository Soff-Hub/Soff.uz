import { useRouter } from 'next/router';
import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { baseUrlUseApi } from '~/repositories/useApi';
import { buildSearchUrl, normalizeProducts, resolveCategoryId } from '~/shared/utilities/api-helpers';
import ProductFilterSection, {
    getTitleFromSlug,
} from '~/components/elements/product-filter-section/ProductFilterSection';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import fetchJson from '~/shared/api/fetch-json';

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
    const type = '3d';
    const pathSlug = context.params.slug || 'all';
    const {
        page = 1,
        parentCategory = '',
        childCategory = '',
        search = '',
        price_from = '',
        price_to = '',
    } = context.query;

    const productsUrl = buildSearchUrl(context.query, '3d', 50);
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=${type}`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=${type}&parent__slug=${parentCategory}`;

    const [productsDataRaw, fourChildData, childCategoryData] = await Promise.all([
        null, // Initial fetch deferred until IDs are resolved
        fetchJson(fourChildUrl),
        fetchJson(childCategoryUrl),
    ]);

    // Resolve numeric IDs from slugs
    const resolvedParentId = resolveCategoryId(parentCategory || pathSlug, fourChildData);
    const resolvedChildId = resolveCategoryId(childCategory, childCategoryData);

    // Build URL with numeric IDs
    const finalProductsUrl = buildSearchUrl({
        ...context.query,
        parentCategoryId: resolvedParentId,
        childCategoryId: resolvedChildId
    }, type, 50);

    const productsDataRawFinal = await fetchJson(finalProductsUrl);
    const productsData = normalizeProducts(productsDataRawFinal);

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
