import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import NextImageCard from '~/components/nextImagecard';
import Search_Results_Products from '~/components/elements/search-page-details/products';
import { baseUrlUseApi } from '~/repositories/useApi';
import useDebounce from '~/shared/hooks/useDebounce';
import { baseURL } from '~/repositories/api';
import { Tabs } from 'antd';
import Search_Results_Services from '~/components/elements/search-page-details/services';
import Search_Results_Specialists from '~/components/elements/search-page-details/specialists';
import CreateOrderModal from '~/shared/components/modals/CreateOrderModal';
import useResponsive from '~/shared/utilities/useResponsive';
import AuthModal from '~/components/AuthModal';
import { useSelector } from 'react-redux';

const Search_Results = ({
    fourChildData,
    childCategoryData,
    searchData,
    keyword,
    page,
    lastProducts,
    service,
    serviceChild,
    serviceParent,
    sellers,
}) => {
    const inputEl = useRef(null);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(keyword || '');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const { query } = useRouter();
    const [activeTab, setActiveTab] = useState(query?.tab || '1');
    const [open, setOpen] = useState(false);
    const defaultTabRefSet = useRef(false);
    const { isDesktop } = useResponsive();
    const pageRef = useRef(null)
    const [ authModal, setAuthModal ] = useState(false)
    const { isLoggedIn } = useSelector(state => state.auth)


    const createBtn = () => (
        <>
            {isDesktop && (
                <span
                    onClick={() => {
                        if(isLoggedIn){
                            setOpen(true)
                        }else{
                            setAuthModal(true)
                        }
                    }}
                    className="Search_Results_not_found_btn w-100 text-center py-3">
                    Buyurtma yaratish
                </span>
            )}
        </>
    );

    const handleSetRouterQuery = currentTab => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                keyword: debouncedSearchTerm,
                page: 1,
                tab: currentTab || activeTab,
                type: (currentTab || activeTab) == '1' ? 'file' : 'all',
                category: '',
                parentCategory: '',
            },
        });
    };

    useEffect(() => {
        if (pageRef.current) {
            pageRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollIntoView({ behavior: 'smooth' });
        }
    }, [router.query.page]);

    const handleClearInput = () => {
        setSearchTerm('');
        inputEl.current.value = '';
    };

    const handleChangeTab = value => {
        setActiveTab(value);
        handleSetRouterQuery(value);
    };

    useEffect(() => {
        if (debouncedSearchTerm !== String(keyword || '')) {
            handleSetRouterQuery();
        }
    }, [debouncedSearchTerm, router.query]);

    useEffect(() => {
        if (query?.tab && !defaultTabRefSet.current) {
            setActiveTab(query?.tab);
            defaultTabRefSet.current = true;
        }
    }, [query?.tab]);

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

    const tabItems = [
        {
            key: '1',
            label: 'Mahsulotlar',
            children: (
                <Search_Results_Products
                    childData={fourChildData}
                    parentData={childCategoryData}
                    data={searchData?.results}
                    page={page}
                    total={searchData?.count}
                    isLoading={false}
                    lastProducts={lastProducts}
                    createBtn={createBtn}
                />
            ),
        },
        {
            key: '2',
            label: 'Xizmatlar',
            children: (
                <Search_Results_Services
                    childData={serviceChild}
                    parentData={serviceParent}
                    data={service}
                    lastProducts={lastProducts}
                    createBtn={createBtn}
                />
            ),
        },
        {
            key: '3',
            label: 'Mutahasislar',
            children: (
                <Search_Results_Specialists
                    data={sellers}
                    lastProducts={lastProducts}
                    createBtn={createBtn}
                />
            ),
        },
    ];

    return (
        <div ref={pageRef} className="global_search_results">
            <Head>
                <title>
                    {keyword ? `“${keyword}”` : 'Soff.uz - Qidiruv natijalar'}
                </title>
                <meta name="robots" content="index, follow" />
                <meta
                    name="description"
                    content={
                        keyword
                            ? `“${keyword}” bo‘yicha ${searchData?.count ||
                            0} ta mahsulot topildi. Soff.uz orqali kerakli bo'lgan raqamli mahsulotlarni yuklab olishingiz mumkin`
                            : "Soff.uz orqali kerakli bo'lgan raqamli mahsulotlarni yuklab olishingiz mumkin"
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
                                    placeholder="Izlayotgan mahsulotingizni toping..."
                                    onInput={e => setSearchTerm(e.target.value)}
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
                    defaultActiveKey={String(query?.tab)}
                    accessKey={activeTab}
                    onChange={handleChangeTab}
                    items={tabItems}
                />
            </div>
            <CreateOrderModal open={open} onClose={() => setOpen(false)} />
            <AuthModal open={authModal} onClose={() => setAuthModal(false)} onSuccess={() => setOpen(true)}/>
        </div>
    );
};

export default Search_Results;

export async function getServerSideProps(context) {
    const {
        keyword = '',
        page = 1,
        tab,
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
    } = context.query;

    const servicesQuery = new URLSearchParams({
        ...(category_id && { category_id }),
        ...(direction && { direction }),
        limit,
        offset,
    });

    const fetchJson = async url => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch');
            return await res.json();
        } catch (err) {
            return { error: err.message };
        }
    };

    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=${type}`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=${type}&parent__slug=${parentCategory}`;

    // ✅ Yangi filterlar qo‘shildi
    const searchUrl = `${baseUrlUseApi}customer/same-google-search/?${page ? `page=${page}&` : ''
        }${keyword ? `search=${keyword}&` : ''}${type ? `type=${type}&` : ''}${category ? `category=${category}&` : ''
        }${order_by ? `order_by=${order_by}&` : ''}${file_type ? `file_type=${file_type}&` : ''
        }${page_from ? `page_from=${page_from}&` : ''}${page_to ? `page_to=${page_to}` : ''
        }`;

    // console.log('searchUrl', searchUrl);
    const lastProductsUrl = `${baseURL}customer/last-added?limit=10`;
    const servicesUrl = `${process.env.NEXT_PUBLIC_FREELEANCE_URL
        }/api/v1/customer?${servicesQuery.toString()}&search=${keyword}${service_parent ? `&category_id=${service_parent}` : ''
        }`;
    const serviceParentUrl = `${process.env.NEXT_PUBLIC_FREELEANCE_URL
        }/api/v1/categories/?direction=${direction || ''}`;
    const serviceChildUrl = `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/categories/?parent_id=${service_parent}`;
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
            const [
                fourChildData,
                childCategoryData,
                searchData,
                lastProducts,
            ] = await Promise.all([
                fetchJson(fourChildUrl),
                fetchJson(childCategoryUrl),
                fetchJson(searchUrl),
                fetchJson(lastProductsUrl),
            ]);


            const searchError = searchData?.error || null;

            return {
                props: {
                    ...restQueries,
                    error: searchError,
                    fourChildData: fourChildData || null,
                    childCategoryData: childCategoryData || null,
                    searchData: searchData?.results ? searchData : null,
                    lastProducts,
                },
            };
        }
        case '2': {
            const [
                lastProducts,
                service,
                serviceParent,
                serviceChild,
            ] = await Promise.all([
                fetchJson(lastProductsUrl),
                fetchJson(servicesUrl),
                fetchJson(serviceParentUrl),
                fetchJson(serviceChildUrl),
            ]);

            return {
                props: {
                    ...restQueries,
                    error: null,
                    lastProducts,
                    service,
                    serviceParent,
                    serviceChild,
                },
            };
        }
        case '3': {
            const [lastProducts, sellers] = await Promise.all([
                fetchJson(lastProductsUrl),
                fetchJson(sellersUrl),
            ]);


            return {
                props: {
                    ...restQueries,
                    lastProducts,
                    sellers,
                },
            };
        }
        default: {
            const [
                fourChildData,
                childCategoryData,
                searchData,
                lastProducts,
                service,
                serviceParent,
                serviceChild,
                sellers,
            ] = await Promise.all([
                fetchJson(fourChildUrl),
                fetchJson(childCategoryUrl),
                fetchJson(searchUrl),
                fetchJson(lastProductsUrl),
                fetchJson(servicesUrl),
                fetchJson(serviceParentUrl),
                fetchJson(serviceChildUrl),
                fetchJson(sellersUrl),
            ]);
            const searchError = searchData?.error || null;

            return {
                props: {
                    ...restQueries,
                    error: searchError,
                    fourChildData: fourChildData || null,
                    childCategoryData: childCategoryData || null,
                    searchData: searchData?.results ? searchData : null,
                    lastProducts,
                    service,
                    serviceParent,
                    serviceChild,
                    sellers,
                },
            };
        }
    }
}
