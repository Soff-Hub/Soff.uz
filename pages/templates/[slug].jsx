import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { useRouter } from 'next/router';
import { baseUrlUseApi } from '~/repositories/useApi';
import { buildSearchUrl, normalizeProducts, resolveCategoryId } from '~/shared/utilities/api-helpers';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import ProductFilterSection, {
    getTitleFromSlug,
} from '~/components/elements/product-filter-section/ProductFilterSection';
import fetchJson from '~/shared/api/fetch-json';

const type = 'template';
const defaultTitle = 'Tayyor shablonlar';

export default function Templates({
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
            query: { ...router.query, page: newPage }, // URL'ga yangi page qo'shish
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
                description={`Biz siz qidirayotgan mahsulotlarni Soff.uz saytimizning kategoriyasida topdik`}
            />
            <ProductFilterSection
                title={fullTitle}
                child={childCategoryData.results}
                parent={fourChildData.results}
                path={'/templates/'}
            />
            <div className="ps-page--shop container my-5 p-xl-0 p-l-0">
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
    const type = 'template';
    const pathSlug = context.params.slug || 'all';
    const {
        page = 1,
        parentCategory = '',
        childCategory = '',
        search = '',
        price_from = '',
        price_to = '',
    } = context.query;

    const productsUrl = buildSearchUrl(context.query, 'template', 50);
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
