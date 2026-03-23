import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import ScientificResourcesFilterSection, {
    getTitleFromSlug,
} from '~/components/elements/ScientificResourcesFilterSection';
import { useRouter } from 'next/router';
import { baseUrlUseApi } from '~/repositories/useApi';
import AISoffiaPresentation from '~/components/elements/AISoffiaPresentation';
import CategoryFilterSecion from '~/components/elements/CategoryFilterSection';
import CategorySearchSection from '~/components/elements/CategorySearchAction';
import Meta from '~/shared/ui/meta';

export default function ProductCategoryScreen({
    productsData,
    fourChildData,
    childCategoryData,
    slug, // <- parentCategory o‘rniga
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

    const title = getTitleFromSlug(fourChildData?.results, slug);
    const subTitle = getTitleFromSlug(
        childCategoryData?.results,
        childCategory
    );

    const fullTitle =
        title && subTitle
            ? `${title} - ${subTitle}`
            : title
                ? title
                : 'Ilmiy ishlar kategoriyasi';

    return (
        <PageContainer>
            <Meta
                title={fullTitle}
                description={
                    fullTitle +
                    ' bo‘yicha eng yaxshi raqamli mahsulotlarni Soff.uz da toping. Ishonchli sotuvchilar va sifatli kontent!'
                }
                image="https://soff.uz/static/img/ilmiy-ishlar-2.png"
                keywords={[
                    { name: 'Biznes rejalar' },
                    { name: 'Taqdimotlar' },
                    { name: 'Kurs ishlari' },
                    { name: 'Diplom ishlari' },
                    { name: 'Referatlar' },
                    { name: 'Mustaqil ishlar' },
                    { name: 'Labaratoriya Ishlari' },
                    { name: 'Dissertatsiya ishlari' },
                    { name: 'Testlar' },
                    { name: "O'quv qo'llanmalar" },
                    { name: 'MustDars ishlanmalaraqil' },
                    { name: 'Tarqatma materiallar' },
                    { name: 'Amaliy ishlar' },
                    { name: 'Blankalar' },
                    { name: 'Ijodiy Ishlar' },
                    { name: 'Loyihalar' },
                    { name: 'Plakatlar' },
                    { name: 'Elektron kitoblar' },
                    { name: 'Dasturlash tillari' },
                ]}
                author="Soff.uz"
            />

            <div className="ps-page--shop container p-lg-1 d-flex flex-column gap-4 my-5">
                <AISoffiaPresentation />
                <CategorySearchSection />
                <CategoryFilterSecion
                    breacrumb={fourChildData}
                    count={productsData?.count}
                    isLoading={false}
                    childCategoryData={childCategoryData}
                />
                <ProductsByCategory
                    data={productsData}
                    page={page}
                    handlePagination={handlePageChange}
                    isLoading={false}
                />
            </div>
        </PageContainer>
    );
}

// ✅ getServerSideProps to'g'rilangan
export async function getServerSideProps(context) {
    const {
        slug = '',
        page = 1,
        childCategory = '',
        search = '',
    } = context.query;

    const fetchJson = async (url) => {
        const res = await fetch(url);
        if (!res.ok) return null;
        return res.json();
    };

    // Agar slug === 'all' bo‘lsa, category bo‘sh bo‘lishi kerak
    const categoryParam = slug === 'all' ? '' : childCategory || slug;

    const productsUrl = `${baseUrlUseApi}customer/products/?direction=file&category=${categoryParam}&page=${page}&page_size=50&search=${search}`;
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=file`;
    const childCategoryUrl =
        slug && slug !== 'all'
            ? `${baseUrlUseApi}customer/four-child?direction=file&parent__slug=${slug}`
            : null;

    const [productsData, fourChildData, childCategoryData] = await Promise.all([
        fetchJson(productsUrl),
        fetchJson(fourChildUrl),
        childCategoryUrl ? fetchJson(childCategoryUrl) : Promise.resolve(null),
    ]);

    return {
        props: {
            productsData: productsData || null,
            fourChildData: fourChildData || null,
            childCategoryData: childCategoryData || null,
            slug,
            childCategory,
            page,
        },
    };
}
