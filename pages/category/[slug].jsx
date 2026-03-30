import React, { useMemo, useCallback } from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { baseUrlUseApi } from '~/repositories/useApi';
import AISoffiaPresentation from '~/components/elements/AISoffiaPresentation';
import CategoryFilterSecion from '~/components/elements/CategoryFilterSection';
import CategorySearchSection from '~/components/elements/CategorySearchAction';
import Meta from '~/shared/ui/meta';

// Helper function for API calls
const fetchJson = async (url) => {
    if (!url) return null;
    try {
        const res = await fetch(url);
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        console.error('Fetch error:', e);
        return null;
    }
};

export default function ProductCategoryScreen({
    productsData,
    initialSlugInfo, // Minimal SEO info from SSR
    slug,
    childCategory,
    page,
}) {
    const router = useRouter();
    
    // 1. TanStack Query for Global Category Tree (Cached for 1 hour)
    const { data: fourChildData, isLoading: isFourChildLoading } = useQuery({
        queryKey: ['four-child', 'file'],
        queryFn: () => fetchJson(`${baseUrlUseApi}customer/four-child?direction=file`),
        staleTime: 1000 * 60 * 60, 
    });

    // 2. TanStack Query for Current Sub-categories (Cached for 10 minutes)
    const { data: childCategoryData, isLoading: isChildCategoryLoading } = useQuery({
        queryKey: ['child-categories', slug],
        queryFn: () => slug && slug !== 'all'
            ? fetchJson(`${baseUrlUseApi}customer/four-child?direction=file&parent__slug=${slug}`)
            : null,
        enabled: slug !== 'all',
        staleTime: 1000 * 60 * 10,
    });

    const isMenuLoading = isFourChildLoading || isChildCategoryLoading;

    // Dynamic SEO generation (Always SSR-powered via initialSlugInfo)
    const fullTitle = useMemo(() => {
        if (!initialSlugInfo?.name) return 'Ilmiy ishlar kategoriyasi | Soff.uz';
        const subName = childCategory ? ` - ${childCategory.replace(/-/g, ' ')}` : '';
        return `${initialSlugInfo.name}${subName}`;
    }, [initialSlugInfo, childCategory]);

    const dynamicKeywords = useMemo(() => {
        const base = [fullTitle, 'Soff.uz', 'ilmiy ishlar', 'online bozor'];
        if (initialSlugInfo?.name) base.push(initialSlugInfo.name);
        return base.map(k => ({ name: k }));
    }, [fullTitle, initialSlugInfo]);

    const dynamicDescription = useMemo(() => {
        const count = productsData?.count || 0;
        return `${fullTitle} bo‘yicha ${count > 0 ? `${count} ta ` : ''}eng yaxshi raqamli mahsulotlar va tayyor ishlanmalarni Soff.uz platformasida toping. Sifatli va ishonchli materiallar!`;
    }, [fullTitle, productsData?.count]);

    const handlePageChange = useCallback((newPage) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage },
        }, undefined, { shallow: false });
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [router]);

    return (
        <PageContainer>
            <Meta
                title={fullTitle}
                description={dynamicDescription}
                image="https://soff.uz/static/img/ilmiy-ishlar-2.png"
                keywords={dynamicKeywords}
                author="Soff.uz"
            />

            <div className="ps-page--shop container p-lg-1 d-flex flex-column gap-4 my-5">
                <AISoffiaPresentation />
                <CategorySearchSection />
                <CategoryFilterSecion
                    breacrumb={fourChildData}
                    count={productsData?.count}
                    isLoading={isMenuLoading}
                    childCategoryData={childCategoryData}
                />
                <ProductsByCategory
                    data={productsData}
                    page={page}
                    handlePagination={handlePageChange}
                    isLoading={false}
                    router={router}
                />
            </div>
        </PageContainer>
    );
}

export async function getServerSideProps(context) {
    const { res, query } = context;
    
    // Use SWR strategy for CDN/Browser caching
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600');

    const {
        slug = 'all',
        page = 1,
        childCategory = '',
        search = '',
    } = query;

    const categoryParam = slug === 'all' ? '' : childCategory || slug;

    const productsUrl = `${baseUrlUseApi}customer/products/?direction=file&category=${categoryParam}&page=${page}&page_size=24&search=${search}`;
    
    // Only fetch minimal info for metadata on SSR
    const activeCategoryUrl = slug !== 'all' 
        ? `${baseUrlUseApi}customer/four-child?direction=file&slug=${slug}`
        : null;

    const [productsData, activeCategoryData] = await Promise.all([
        fetchJson(productsUrl),
        fetchJson(activeCategoryUrl),
    ]);

    const initialSlugInfo = activeCategoryData?.results?.[0] || { name: 'Barcha ilmiy ishlar' };

    return {
        props: {
            productsData,
            initialSlugInfo,
            slug,
            childCategory,
            page,
        },
    };
}
