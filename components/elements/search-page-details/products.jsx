import React, { useEffect, useRef } from 'react';
import SearchResultsProducts_Card from './search-page-card/searchResultsProducts_Card';
import { Pagination } from 'antd';
import SearchResultsProductsFilter from './search-page-filter/search-results-products-filter';
import { useRouter } from 'next/router';
import Search_Results_NotFound from './notFound';
import useScrollToNotFound from '../../../shared/hooks/useScrollToNotFound';
import { useQuery } from '@tanstack/react-query';
import { baseUrlUseApi } from '~/repositories/useApi';

const currentTab = '1';

export default function Search_Results_Products({
    children,
    initialData: data,
}) {
    const router = useRouter();
    const isFirstRender = useRef(true);
    const {
        page = 1,
        keyword = '',
        type = 'file',
        category = '',
        order_by = '',
        file_type = '',
        page_from = '',
        page_to = '',
    } = router.query;

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
    }, [router.query]);

    // NOTE: Requests Enable property
    const isRequestsEnabled = router.isReady && router.query.tab === currentTab;
    const isChildCategoryEnabled = isRequestsEnabled && !!router.query.category;
    // const isProductsSearchEnabled =
    //     (isRequestsEnabled && !isFirstRender.current) || !initialData;
    // NOTE: Initial Data for Products Search
    // const productsDataInitialData =
    //     isFirstRender.current && initialData ? initialData : undefined;

    const { data: childData } = useQuery({
        queryKey: ['four-child', type],
        queryFn: async () => {
            const res = await fetch(
                `${baseUrlUseApi}customer/four-child?direction=${type}`
            );

            return await res.json();
        },
        enabled: isRequestsEnabled,
    });

    const { data: parentData } = useQuery({
        queryKey: ['child-category', category, type],
        queryFn: async () => {
            const res = await fetch(
                `${baseUrlUseApi}customer/four-child?direction=${type}&parent__slug=${category}`
            );

            return await res.json();
        },
        enabled: isChildCategoryEnabled,
    });

    // const { data, isLoading } = useQuery({
    //     queryKey: [
    //         'products-search',
    //         page,
    //         keyword,
    //         type,
    //         category,
    //         order_by,
    //         file_type,
    //         page_from,
    //         page_to,
    //     ],
    //     queryFn: async () => {
    //         const res = await fetch(
    //             `${baseUrlUseApi}customer/same-google-search/?limit=50&${
    //                 page ? `page=${page}&` : ''
    //             }${keyword ? `search=${keyword}&` : ''}${
    //                 type ? `type=${type}&` : ''
    //             }${category ? `category=${category}&` : ''}${
    //                 order_by ? `order_by=${order_by}&` : ''
    //             }${file_type ? `file_type=${file_type}&` : ''}${
    //                 page_from ? `page_from=${page_from}&` : ''
    //             }${page_to ? `page_to=${page_to}` : ''}`
    //         );

    //         return await res.json();
    //     },
    //     enabled: isProductsSearchEnabled,
    //     initialData: productsDataInitialData,
    // });

    const total = data?.count || 0;
    const notFoundRef = useRef();
    const showResults =
        Array.isArray(data?.results) && data?.results?.length > 0;

    useScrollToNotFound(notFoundRef, showResults, data);

    let resultsContent = null;
    // if (isLoading) {
    //     resultsContent = Array(12)
    //         .fill(0)
    //         .map((_, i) => (
    //             <Skeleton
    //                 key={i}
    //                 active
    //                 className="Search_Results_Wrap_skeleton"
    //             />
    //         ));
    // } else
    if (showResults) {
        resultsContent = (
            <>
                {data.results.map((item, index) => (
                    <div key={index}>
                        <SearchResultsProducts_Card product={item} />
                    </div>
                ))}
                <Pagination
                    style={{
                        marginBottom: '100px',
                        marginTop: '20px',
                    }}
                    className=""
                    current={router.query.page || 1}
                    pageSize={50}
                    total={total}
                    onChange={(newPage) => {
                        router.push(
                            {
                                pathname: router.pathname,
                                query: {
                                    ...router.query,
                                    page: newPage,
                                },
                            },
                            undefined,
                            { shallow: true }
                        );
                    }}
                />
            </>
        );
    } else {
        resultsContent = <Search_Results_NotFound ref={notFoundRef} />;
    }

    return (
        <>
            <div className="Search_Results_Products container">
                <div className="Search_Results_Products_Wrap">
                    <div>
                        <div className="mb-3">
                            <SearchResultsProductsFilter
                                total={total}
                                parentData={parentData}
                                childData={childData}
                                count={data}
                            />
                        </div>
                        <div className="Search_Results_Products_Wrap">
                            {resultsContent}
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </>
    );
}
