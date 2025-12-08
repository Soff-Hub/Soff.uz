import React, { useEffect, useMemo, useRef } from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import { getTitleFromSlug } from '~/components/elements/ScientificResourcesFilterSection';
import { useRouter } from 'next/router';
import { baseUrlUseApi } from '~/repositories/useApi';
import styles from '~/widgets/home/catalog/style.module.scss';
import Image from 'next/image';
import ProductFilterSection from '~/components/elements/product-filter-section/ProductFilterSection';
import GrayCard from '~/widgets/gray-card';
import { useQuery } from '@tanstack/react-query';
import { formatFileSize } from '~/shared/utilities/utils';

export default function ProductCategoryScreen({
    productsData,
    fourChildData,
    childCategoryData,
    parentCategory,
    childCategory,
    page,
}) {
    const router = useRouter();
    const isFirstRender = useRef(true);
    console.log('productsData:', productsData);

    const {
        page: queryPage = page || 1,
        search = '',
        category = '',
        content_extensions = [],
        price_from = '',
        price_to = '',
        from_page = '',
        to_page = '',
        similar_documents,
    } = router.query;

    // Determine category parameter (same logic as getServerSideProps)
    const categoryParam = childCategory || parentCategory || category;

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
    }, [router.query]);

    // Similar documents enabled when count < 50 and page === 1
    const similarDocumentsEnabled = false;
    // productsData?.count < 50 && Number(queryPage) === 1;

    // Build query key for similar documents
    const fileTypes = Array.isArray(content_extensions)
        ? content_extensions
        : content_extensions
        ? [content_extensions]
        : [];
    const keysChangeOnSimilarDocuments = `${queryPage}-${search}-file-${categoryParam}-${fileTypes.join(
        '-'
    )}-${price_from}-${price_to}-${from_page}-${to_page}`;

    const { data: similarDocuments, isFetching: isFetchingSimilarDocuments } =
        useQuery({
            queryKey: [
                'similar-documents-scientific',
                keysChangeOnSimilarDocuments,
            ],
            queryFn: async () => {
                const params = new URLSearchParams({
                    limit: '50',
                    page: queryPage,
                    type: 'file',
                    similar_documents: 'true',
                });

                if (search) params.append('search', search);
                if (categoryParam) params.append('category', categoryParam);
                if (fileTypes.length) {
                    fileTypes.forEach((ext) => params.append('file_type', ext));
                }
                if (price_from) params.append('price_from', price_from);
                if (price_to) params.append('price_to', price_to);
                if (from_page) params.append('page_from', from_page);
                if (to_page) params.append('page_to', to_page);

                const res = await fetch(
                    `${baseUrlUseApi}customer/same-google-search/?${params.toString()}`
                );
                return await res.json();
            },
            enabled: similarDocumentsEnabled && router.isReady,
        });

    // Transform similar documents to match ProductCard expected structure
    const transformSimilarDocument = (item) => {
        // Check if item is already in the correct format (from products API)
        if (item.document) {
            return item;
        }

        // Transform from same-google-search API format to ProductCard format
        return {
            ...item,
            poster_url: item.poster || item.poster_url,
            price: parseFloat(item.discount_price) || 0,
            discount_price: parseFloat(item.discount_price) || 0,
            views_count: item.views_count || 0,
            document: {
                file_type: item.file_type || '.zip',
                file_size: formatFileSize(item.file_size || 0),
                page_count: item.page_count || 0,
                content_type: item.content_type || 'file',
            },
        };
    };

    const mergedData = useMemo(() => {
        const initialResults = (productsData && productsData.results) || [];
        const similarResults = isFetchingSimilarDocuments
            ? []
            : (similarDocuments && similarDocuments.results) || [];

        // Transform both SSR initial results and client-side similar documents
        // to match ProductCard structure (both may come from same-google-search API)
        const transformedInitialResults = initialResults.map(
            transformSimilarDocument
        );
        const transformedSimilarResults = similarResults.map(
            transformSimilarDocument
        );

        return {
            results: [
                ...transformedInitialResults,
                ...transformedSimilarResults,
            ],
            count: (productsData?.count || 0) + (similarDocuments?.count || 0),
        };
    }, [productsData, similarDocuments, isFetchingSimilarDocuments]);

    useEffect(() => {
        if (
            similarDocuments &&
            similarDocuments.results &&
            similarDocuments.results.length > 0
        ) {
            router.push(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        similar_documents: 'true',
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [similarDocuments]);

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

            <ProductFilterSection
                isFile
                child={childCategoryData?.results}
                parent={fourChildData?.results}
                path={'/scientific-resources/'}
            />
            <div className="ps-page--shop container p-lg-10 p-l-0">
                <ProductsByCategory
                    data={mergedData}
                    page={Number(queryPage)}
                    handlePagination={(number) => {
                        handlePageChange(number);
                    }}
                    isLoading={false}
                />
            </div>
            <div className={styles.catalogSectionBlock}>
                <div className="container mx-auto px-5">
                    <section className={styles.howItWorksSection}>
                        <div className="d-flex justify-content-center my-5">
                            <Image
                                width={30}
                                height={30}
                                src={'/static/img/star.svg'}
                                alt="starts"
                            />
                        </div>
                        <h2>
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
            {/* <div className="servicesSpace" /> */}
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
        category = '',
        content_extensions = [],
        price_from = '',
        price_to = '',
        from_page = '',
        to_page = '',
    } = context.query;

    const queryParams = new URLSearchParams({
        direction: 'file',
        page,
        page_size: 50,
        search,
    });

    if (category) queryParams.append('category', category);
    if (content_extensions && content_extensions.length) {
        const exts = Array.isArray(content_extensions)
            ? content_extensions
            : [content_extensions];

        exts.forEach((ext) => {
            queryParams.append('content_extensions', ext);
        });
    }

    if (price_from) queryParams.append('price_from', price_from);
    if (price_to) queryParams.append('price_to', price_to);
    if (from_page) queryParams.append('from_page', from_page);
    if (to_page) queryParams.append('to_page', to_page);

    const searchParams = new URLSearchParams({
        type: 'file',
        limit: 50,
        page,
        search,
    });

    if (category) searchParams.append('parentCategory', category);
    if (content_extensions && content_extensions.length) {
        const exts = Array.isArray(content_extensions)
            ? content_extensions
            : [content_extensions];

        exts.forEach((ext) => {
            searchParams.append('file_type', ext);
        });
    }

    if (price_from) searchParams.append('price_from', price_from);
    if (price_to) searchParams.append('price_to', price_to);
    if (from_page) searchParams.append('from_page', from_page);
    if (to_page) searchParams.append('to_page', to_page);

    const fetchJson = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return res.json();
    };

    const categoryParam = childCategory ? childCategory : parentCategory;

    const productsUrl = `${baseUrlUseApi}customer/products/?${queryParams.toString()}&category=${categoryParam}`;
    const searchPageUrl = `${baseUrlUseApi}customer/same-google-search/?${queryParams.toString()}`;
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=file`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=file&parent__slug=${parentCategory}`;

    const [productsData, fourChildData, childCategoryData] = await Promise.all([
        fetchJson(search ? searchPageUrl : productsUrl),
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
            search,
            productsUrl,
        },
    };
}
