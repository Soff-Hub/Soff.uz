import React, { useMemo, useCallback } from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { baseUrlUseApi } from '~/repositories/useApi';
import { buildSearchUrl, normalizeProducts, resolveCategoryId } from '~/shared/utilities/api-helpers';
import Meta from '~/shared/ui/meta';
import Image from 'next/image';
import ProductFilterSection, { getTitleFromSlug } from '~/components/elements/product-filter-section/ProductFilterSection';
import GrayCard from '~/widgets/gray-card';
import styles from '~/widgets/home/catalog/style.module.scss';

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
    initialSlugInfo,
    slug,
    parentCategory,
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

    // SEO & Title Logic (Robust matching)
    const activeTitle = useMemo(() => {
        return getTitleFromSlug(fourChildData?.results, parentCategory) || initialSlugInfo?.name;
    }, [fourChildData, parentCategory, initialSlugInfo]);

    const activeSubTitle = useMemo(() => {
        return getTitleFromSlug(childCategoryData?.results, childCategory);
    }, [childCategoryData, childCategory]);

    const fullTitle = useMemo(() => {
        if (!activeTitle) return 'Ilmiy ishlar kategoriyasi | Soff.uz';
        const subName = activeSubTitle ? ` - ${activeSubTitle}` : '';
        return `${activeTitle}${subName}`;
    }, [activeTitle, activeSubTitle]);

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

            <ProductFilterSection
                isFile
                title={fullTitle}
                child={childCategoryData?.results}
                parent={fourChildData?.results}
                path={'/category/'}
            />
            <div className="ps-page--shop container p-lg-10 p-l-0">
                <ProductsByCategory
                    data={productsData}
                    page={page}
                    handlePagination={handlePageChange}
                    isLoading={false}
                    router={router}
                />
            </div>

            <div className={styles.catalogSectionBlock}>
                <div className="container mx-auto">
                    <section className={styles.howItWorksSection}>
                        <div className="d-flex justify-content-center my-5">
                            <Image
                                width={30}
                                height={30}
                                src={'/static/img/star.svg'}
                                alt="starts"
                            />
                        </div>
                        <h2
                            style={{
                                marginBottom: '80px',
                            }}>
                            Tayyor mahsulotlardan foydalanish qanday ishlaydi?
                        </h2>
                        <div className={styles.steps}>
                            <div className={styles.stepItem}>
                                <img
                                    src={'/static/img/catalogMenu.png'}
                                    alt="starts"
                                />
                                <div>
                                    <h3>Qidiring va tanlang</h3>
                                    <p>
                                        Katalogdan yoki qidiruv orqali sizga
                                        kerakli tayyor mahsulotni toping.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.stepItem}>
                                <img
                                    src={'/static/img/catalogCoin.png'}
                                    alt="starts"
                                />
                                <div>
                                    <h3>Sotib oling</h3>
                                    <p>
                                        Xavfsiz to‘lov tizimi orqali mahsulotni
                                        sotib oling — narx va shartlar oldindan
                                        ko‘rinadi.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.stepItem}>
                                <img
                                    src={'/static/img/catalogSecure.png'}
                                    alt="starts"
                                />
                                <div>
                                    <h3>Yuklab oling va foydalaning</h3>
                                    <p>
                                        Mahsulotni darhol yuklab oling va
                                        ishlatishni boshlang.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <GrayCard
                        title="Kerakli mahsulotni topa olmadingizmi? Buyurtma
                                berishingiz mumkin."
                        btn="Buyurtmar berish"
                        link="/orders?direction=scientific_work"
                    />
                </div>
            </div>
        </PageContainer>
    );
}

export async function getServerSideProps(context) {
    const { res, query, params } = context;

    // Use SWR strategy for CDN/Browser caching
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600');

    // Use params.slug for the dynamic path to avoid query collisions
    const pathSlug = params?.slug || 'all';
    const {
        page = 1,
        childCategory = '',
        search = '',
    } = query;

    const queryWithSlug = { ...query, parentCategory: pathSlug === 'all' ? '' : pathSlug };
    const productsUrl = buildSearchUrl(queryWithSlug, 'file', 24);

    // SSR fetch for SEO and ID resolution
    const activeCategoryUrl = pathSlug !== 'all'
        ? `${baseUrlUseApi}customer/four-child?direction=file&slug=${pathSlug}`
        : null;

    const [activeCategoryData] = await Promise.all([
        fetchJson(activeCategoryUrl),
    ]);

    // Resolve numeric IDs from slugs
    const resolvedParentId = resolveCategoryId(pathSlug, activeCategoryData);
    const resolvedChildId = resolveCategoryId(childCategory, activeCategoryData);

    const finalProductsUrl = buildSearchUrl({
        ...query,
        parentCategoryId: resolvedParentId,
        childCategoryId: resolvedChildId
    }, 'file', 24);

    const productsDataRawFinal = await fetchJson(finalProductsUrl);
    const productsData = normalizeProducts(productsDataRawFinal);

    // Senior fix: Find exact match in results list
    const matchedCategory = activeCategoryData?.results?.find(item => item.slug === pathSlug);
    const initialSlugInfo = matchedCategory || activeCategoryData?.results?.[0] || { name: 'Barcha ilmiy ishlar' };

    return {
        props: {
            productsData,
            initialSlugInfo,
            slug: pathSlug,
            parentCategory: pathSlug,
            childCategory,
            page,
        },
    };
}
