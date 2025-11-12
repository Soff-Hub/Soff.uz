import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import { useRouter } from 'next/router';
import { baseUrlUseApi } from '~/repositories/useApi';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import ProductFilterSection, {
    getTitleFromSlug,
} from '~/components/elements/product-filter-section/ProductFilterSection';

export default function Websites({
    productsData,
    parentCategory,
    childCategory,
    fourChildData,
    childCategoryData,
    page,
}) {
    const router = useRouter();

    const title = getTitleFromSlug(fourChildData?.results, parentCategory);
    const subTitle = getTitleFromSlug(
        childCategoryData?.results,
        childCategory
    );

    const fullTitle =
        title && subTitle
            ? `${title} - ${subTitle}`
            : title
                ? title
                : 'Veb saytlar';

    const handlePageChange = (newPage) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage },
        });
    };

    return (
        <PageContainer>
            <Meta
                title={fullTitle}
                description={`Biz siz qidirayotgan mahsulotlarni Soff.uz saytimizning kategoriyasida topdik`}
            />
            <ProductFilterSection
                child={childCategoryData.results}
                parent={fourChildData.results}
                path={'/websites/'}
            />
            <div className="ps-page--shop container my-5">
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
    const {
        slug,
        page = 1,
        parentCategory = '',
        childCategory = '',
        search = '',
    } = context.query;

    const fetchJson = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return res.json();
    };

    const categoryParam = childCategory ? childCategory : parentCategory;

    const productsUrl = `${baseUrlUseApi}customer/products/?direction=website&category=${categoryParam}&page=${page}&page_size=50&search=${search}`;
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=website`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=website&parent__slug=${parentCategory}`;

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
