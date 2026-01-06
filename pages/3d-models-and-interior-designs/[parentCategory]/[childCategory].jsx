import { useRouter } from 'next/router';
import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { baseUrlUseApi } from '~/repositories/useApi';
import ProductFilterSection, {
    getTitleFromSlug,
} from '~/components/elements/product-filter-section/ProductFilterSection';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import { useFilteredProducts } from '~/shared/hooks/useFilteredProducts';

const type = '3d';
const defaultTitle = '3D moddellar va Interier dizaynlar';

export default function ParentChildCategoryPage({
    productsData,
    fourChildData,
    childCategoryData,
    parentCategory,
    childCategory,
}) {
    const router = useRouter();

    // Use custom hook for client-side filtering (use childCategory as it's more specific)
    const { productsData: filteredData, isLoading } = useFilteredProducts({
        direction: type,
        category: childCategory, // Use child category (more specific)
        defaultData: productsData, // SSG data as default
        filterKeys: ['search', 'price_from', 'price_to'],
    });

    const page = parseInt(router.query.page) || 1;

    const handlePageChange = (newPage) => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, page: newPage },
            },
            undefined,
            { shallow: true }
        ); // shallow: true prevents getStaticProps from running
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
                child={childCategoryData?.results || []}
                parent={fourChildData?.results || []}
                path={'/3d-models-and-interior-designs/'}
            />
            <div className="ps-page--shop container p-xl-0 p-l-0">
                <ProductsByCategory
                    data={filteredData}
                    page={page}
                    handlePagination={(number) => {
                        handlePageChange(number);
                    }}
                    isLoading={isLoading}
                />
            </div>
        </PageContainer>
    );
}

// Generate paths for ALL parent + child combinations
export async function getStaticPaths() {
    const fetchJson = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) return null;
            return res.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    };

    // 1. Fetch all parent categories
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=${type}`;
    const fourChildData = await fetchJson(fourChildUrl);

    if (!fourChildData?.results || fourChildData.results.length === 0) {
        return {
            paths: [],
            fallback: false,
        };
    }

    // 2. For each parent, fetch its children and generate paths
    const paths = [];

    for (const parent of fourChildData.results) {
        const parentSlug = parent.slug;

        // Fetch children for this parent
        const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=${type}&parent__slug=${parentSlug}`;
        const childCategoryData = await fetchJson(childCategoryUrl);

        if (
            childCategoryData?.results &&
            childCategoryData.results.length > 0
        ) {
            // Generate path for each child category
            for (const child of childCategoryData.results) {
                paths.push({
                    params: {
                        parentCategory: parentSlug,
                        childCategory: child.slug,
                    },
                });
            }
        }
    }

    return {
        paths,
        fallback: false, // All combinations are known
    };
}

// Fetch data for a specific parent + child combination
export async function getStaticProps({ params }) {
    const { parentCategory, childCategory } = params;

    const fetchJson = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                return null;
            }
            return res.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    };

    const queryParams = new URLSearchParams({
        direction: type,
        page: '1',
        page_size: '50',
        category: childCategory, // Use child category (more specific)
    });

    const productsUrl = `${baseUrlUseApi}customer/products/?${queryParams.toString()}`;
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=${type}`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=${type}&parent__slug=${parentCategory}`;

    const [productsData, fourChildData, childCategoryData] = await Promise.all([
        fetchJson(productsUrl),
        fetchJson(fourChildUrl),
        fetchJson(childCategoryUrl),
    ]);

    if (!productsData) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            productsData: productsData || null,
            fourChildData: fourChildData || null,
            childCategoryData: childCategoryData || null,
            parentCategory: parentCategory || '',
            childCategory: childCategory || '',
        },
        revalidate: 300, // ISR: revalidate every 5 minutes
    };
}
