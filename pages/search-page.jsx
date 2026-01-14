import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import NextImageCard from '~/components/nextImagecard';
import Search_Results_Products from '~/widgets/search-results/products';
import useDebounce from '~/shared/hooks/useDebounce';
import { Tabs } from 'antd';
import Search_Results_Services from '~/widgets/search-results/services';
import Search_Results_Specialists from '~/widgets/search-results/specialists';
import useResponsive from '~/shared/utilities/useResponsive';
import { useSelector } from 'react-redux';
import SerachSide from '~/widgets/search-results/search-page-side';
import { useFGet } from '~/shared/hooks/useFApi';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/repositories/api';
import { baseUrlUseApi } from '~/repositories/useApi';
import { getOrCreateDeviceId } from '~/shared/utilities/device-id';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Search_Results = ({
    keyword,
    productsInitialData,
    servicesInitialData,
    sellersInitialData,
    searchUrl,
}) => {
    const inputEl = useRef(null);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(keyword || '');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const { query } = useRouter();
    const { isDesktop } = useResponsive();
    const pageRef = useRef(null);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const tab = router.query.tab || '1';
    const { t } = useTranslation('search');

    const topServicesQuery = new URLSearchParams({
        limit: 6,
        ...((query.direction || query.ts_direction) &&
            tab !== '1' && {
                direction: query.direction || query.ts_direction,
            }),
        ...(query.keyword &&
            !query.direction &&
            !query.ts_direction &&
            tab !== '1' && { search: query.keyword }),
    });

    const { data: topServices, isLoading: topServicesLoading } = useFGet(
        ['top-services', topServicesQuery.toString()],
        `customer/popular-services?${topServicesQuery.toString()}`
    );

    const { data: lastProducts, isLoading: lastProductsLoading } = useQuery({
        queryKey: [`last-products`],
        queryFn: async () => {
            const res = await api.get(`customer/last-added?limit=10`);
            return res.data;
        },
    });

    const dynamicCreateBtnLink = isLoggedIn
        ? '/order/create'
        : '/auth/login?returnUrl=' + encodeURIComponent('/order/create');

    const createBtn = () => (
        <div className="w-100">
            {isDesktop && (
                <Link href={dynamicCreateBtnLink}>
                    <a>
                        <div className="Search_Results_not_found_btn w-100 text-center py-3">
                            {t('notFound.createOrder')}
                        </div>
                    </a>
                </Link>
            )}
        </div>
    );

    const handleSetRouterQuery = (currentTab) => {
        const omitKeys = [
            'direction',
            'ts_direction',
            'page',
            'offset',
            'limit',
            'category',
            'parentCategory',
            'service_parent',
            'file_type',
            'order_by',
            'page_from',
            'page_to',
        ];

        const newQueries = Object.fromEntries(
            Object.entries(router.query).filter(
                ([key]) => !omitKeys.includes(key)
            )
        );

        router.push({
            pathname: router.pathname,
            query: {
                ...newQueries,
                keyword: debouncedSearchTerm,
                tab: currentTab,
                type: currentTab == '1' ? 'file' : 'all',
            },
        });
    };

    useEffect(() => {
        if (pageRef.current) {
            pageRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollIntoView({ behavior: 'smooth' });
        }
    }, [tab]);

    const handleClearInput = () => {
        setSearchTerm('');
        inputEl.current.value = '';
    };

    const handleChangeTab = (value) => {
        handleSetRouterQuery(value);
    };

    useEffect(() => {
        if (debouncedSearchTerm !== router.query.keyword) {
            // When a new search term is entered, reset pagination and filter params
            const omitKeys = ['page', 'offset', 'similar_documents'];

            const newQueries = Object.fromEntries(
                Object.entries(router.query).filter(
                    ([key]) => !omitKeys.includes(key)
                )
            );

            router.push({
                pathname: router.pathname,
                query: {
                    ...newQueries,
                    keyword: debouncedSearchTerm,
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);

    const clearTextView = (
        <span className="ps-form__action">
            {searchTerm ? (
                <p
                    className="ps-form__action_search_btn m-auto cursor-pointer"
                    onClick={handleClearInput}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24">
                        <path
                            fill="#7B7B7B"
                            d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.41L10.59 12l-4.89 4.89a1 1 0 0 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z"
                        />
                    </svg>
                </p>
            ) : (
                <p className="ps-form__action_search_btn m-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="13"
                        viewBox="0 0 12 13">
                        <path
                            d="M9.47006 9.13465L12 11.6646L11.1646 12.5L8.63465 9.97006C7.72497 10.6978 6.57133 11.1332 5.31661 11.1332C2.38184 11.1332 0 8.75138 0 5.81661C0 2.88184 2.38184 0.5 5.31661 0.5C8.25138 0.5 10.6332 2.88184 10.6332 5.81661C10.6332 7.07133 10.1978 8.22497 9.47006 9.13465ZM8.28487 8.69632C9.00722 7.95188 9.45175 6.93641 9.45175 5.81661C9.45175 3.53194 7.60127 1.68147 5.31661 1.68147C3.03194 1.68147 1.18147 3.53194 1.18147 5.81661C1.18147 8.10127 3.03194 9.95175 5.31661 9.95175C6.43641 9.95175 7.45188 9.50722 8.19632 8.78487L8.28487 8.69632Z"
                            fill="#7B7B7B"
                        />
                    </svg>
                </p>
            )}
        </span>
    );

    const sideElements = (
        <SerachSide
            createBtn={createBtn}
            topServices={topServices}
            topServicesLoading={topServicesLoading}
            lastProducts={lastProducts}
            lastProductsLoading={lastProductsLoading}
        />
    );

    const tabItems = [
        {
            key: '1',
            label: t('tabs.products'),
            children: (
                <Search_Results_Products
                    children={sideElements}
                    initialData={productsInitialData}
                />
            ),
        },
        {
            key: '2',
            label: t('tabs.services'),
            children: (
                <Search_Results_Services
                    children={sideElements}
                    initialData={servicesInitialData}
                />
            ),
        },
        {
            key: '3',
            label: t('tabs.specialists'),
            children: (
                <Search_Results_Specialists
                    children={sideElements}
                    initialData={sellersInitialData}
                />
            ),
        },
    ];

    return (
        <div ref={pageRef} className="global_search_results">
            <Head>
                <title>
                    {keyword
                        ? `${t('meta.titleWithKeyword', { keyword })} | Soff.uz`
                        : t('meta.title')}
                </title>
                <meta name="robots" content="index, follow" />
                <meta
                    name="description"
                    content={
                        keyword
                            ? t('meta.descriptionWithKeyword', { keyword })
                            : t('meta.description')
                    }
                />
            </Head>

            {/* Navbar */}
            <nav className="global_navbar">
                <div className="container d-flex align-items-center">
                    <div className="d-flex align-items-center gap-5 width_full_screen">
                        <Link href="/">
                            <a className="ps-logo">
                                <NextImageCard
                                    url="/static/img/soff/logo-dark.png"
                                    className="logoo"
                                    width="120px"
                                    height="50px"
                                />
                            </a>
                        </Link>
                        <div className="ps-form--quick-search">
                            <div
                                style={{ background: 'white' }}
                                className={
                                    keyword === ''
                                        ? 'ps-form__input'
                                        : 'ps-form__input active_search_input'
                                }>
                                <input
                                    ref={inputEl}
                                    autoFocus
                                    className={
                                        keyword === ''
                                            ? 'form-control input2'
                                            : 'input1 form-control active_search_input'
                                    }
                                    type="text"
                                    value={searchTerm}
                                    placeholder={t('input.placeholder')}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    style={{
                                        width: 'calc(100% - 30px)',
                                    }}
                                />
                                {clearTextView}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Search Results */}

            <div className="container ">
                <Tabs
                    className="order_tabs"
                    destroyInactiveTabPane
                    activeKey={tab}
                    onChange={handleChangeTab}
                    items={tabItems}
                />
            </div>
        </div>
    );
};

export default Search_Results;

export async function getServerSideProps(context) {
    const { locale } = context;
    const {
        keyword = '',
        page = 1,
        tab = '1',
        type = 'all',
        category = '',
        parentCategory = '',
        order_by = '',
        direction = '',
        limit = 20,
        offset = 0,
        category_id = '',
        service_parent = '',
        file_type = '', // fayl turi (file_type)
        page_from = '', // ✅ yangi qo‘shildi
        page_to = '', // ✅ yangi qo‘shildi
        similar_documents = '',
    } = context.query;

    const deviceId = getOrCreateDeviceId({
        req: context.req,
        res: context.res,
    });

    const servicesQuery = new URLSearchParams({
        ...(category_id && { category_id }),
        ...(direction && { direction }),
        limit,
        offset,
    });

    const fetchJson = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch');
            return await res.json();
        } catch (err) {
            return { error: err.message };
        }
    };

    // ✅ Yangi filterlar qo‘shildi
    const searchUrl = `${baseUrlUseApi}customer/same-google-search/?limit=50${
        page ? `&page=${page}` : ''
    }${keyword ? `&search=${keyword}` : ''}${type ? `&type=${type}` : ''}${
        category ? `&category=${category}` : ''
    }${order_by ? `&order_by=${order_by}` : ''}${
        file_type ? `&file_type=${file_type}` : ''
    }${page_from ? `&page_from=${page_from}` : ''}${
        page_to ? `&page_to=${page_to}` : ''
    }${parentCategory ? `&parentCategory=${parentCategory}` : ''}${
        similar_documents ? `&similar_documents=${similar_documents}` : ''
    }`;

    const servicesUrl = `${
        process.env.NEXT_PUBLIC_FREELEANCE_URL
    }/api/v1/customer?${servicesQuery.toString()}&search=${keyword}${
        service_parent ? `&category_id=${service_parent}` : ''
    }`;
    const sellersUrl = `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/users/sellers?limit=${limit}&offset=${offset}&search=${keyword}`;

    const restQueries = {
        fourChildData: null,
        childCategoryData: null,
        searchData: null,
        keyword,
        page,
        type,
        category,
        order_by,
        error: null,
        lastProducts: null,
        service: null,
        serviceParent: null,
        serviceChild: null,
        sellers: null,
    };

    switch (tab) {
        case '1': {
            let productsInitialData = null;
            try {
                const productsFetch = await fetch(searchUrl, {
                    headers: {
                        'X-Device-ID': deviceId,
                    },
                });
                productsInitialData = await productsFetch.json();
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            const searchError = productsInitialData?.error || null;

            return {
                props: {
                    ...restQueries,
                    error: searchError,
                    searchUrl,
                    productsInitialData: productsInitialData?.results
                        ? productsInitialData
                        : null,
                    ...(await serverSideTranslations(locale, [
                        'header',
                        'footer',
                        'common',
                        'search',
                        'modals',
                    ])),
                },
            };
        }
        case '2': {
            const servicesInitialData = await fetchJson(servicesUrl);

            return {
                props: {
                    ...restQueries,
                    error: null,
                    servicesInitialData,
                    ...(await serverSideTranslations(locale, [
                        'header',
                        'footer',
                        'common',
                        'search',
                        'modals',
                    ])),
                },
            };
        }
        case '3': {
            const sellersInitialData = await fetchJson(sellersUrl);

            return {
                props: {
                    ...restQueries,
                    sellersInitialData,
                    ...(await serverSideTranslations(locale, [
                        'header',
                        'footer',
                        'common',
                        'search',
                        'modals',
                    ])),
                },
            };
        }
        default: {
            const [
                productsInitialData,
                servicesInitialData,
                sellersInitialData,
            ] = await Promise.all([
                fetchJson(searchUrl),
                fetchJson(servicesUrl),
                fetchJson(sellersUrl),
            ]);
            const searchError = productsInitialData?.error || null;

            return {
                props: {
                    ...restQueries,
                    error: searchError,
                    productsInitialData: productsInitialData?.results
                        ? productsInitialData
                        : null,
                    servicesInitialData,
                    sellersInitialData,
                    ...(await serverSideTranslations(locale, [
                        'header',
                        'footer',
                        'common',
                        'search',
                        'modals',
                    ])),
                },
            };
        }
    }
}
