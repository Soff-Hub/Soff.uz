import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { useRouter } from 'next/router';
import { baseUrlUseApi } from '~/repositories/useApi';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import ProductFilterSection, {
    getTitleFromSlug,
} from '~/components/elements/product-filter-section/ProductFilterSection';

const type = 'video';

export default function VideoLessons({
    productsData,
    fourChildData,
    childCategoryData,
    parentCategory,
    childCategory,
    productsUrl,
    page,
}) {
    const { t } = useTranslation('product-pages');
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

    const defaultTitle = t('titles.videoLessons');
    const finalTitle = fullTitle || defaultTitle;

    return (
        <PageContainer>
            <Meta
                title={finalTitle}
                description={t('meta.defaultDescription')}
            />
            <ProductFilterSection
                title={fullTitle}
                child={childCategoryData?.results}
                parent={fourChildData?.results}
                path={'/video-lessons/'}
            />
            <div className="ps-page--shop container my-5 p-l-0 p-xl-0">
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
    const { locale } = context;
    const {
        page = 1,
        parentCategory = '',
        childCategory = '',
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

    const categoryParam = childCategory ? childCategory : parentCategory;

    const queryParams = new URLSearchParams({
        direction: type,
        page,
        page_size: 50,
    });
    if (search) queryParams.append('search', search);
    if (categoryParam) queryParams.append('category', categoryParam);
    if (price_from) queryParams.append('price_from', price_from);
    if (price_to) queryParams.append('price_to', price_to);

    const productsUrl = `${baseUrlUseApi}customer/products/?${queryParams.toString()}`;
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=${type}`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=${type}&parent__slug=${parentCategory}`;

    const [productsData, fourChildData, childCategoryData] = await Promise.all([
        fetchJson(productsUrl),
        fetchJson(fourChildUrl),
        fetchJson(childCategoryUrl),
    ]);

    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'product-pages',
                'card',
                'modals',
            ])),
            productsData: productsData || null,
            fourChildData: fourChildData || null,
            childCategoryData: childCategoryData || null,
            parentCategory,
            childCategory,
            productsUrl,
            page,
        },
    };
}
