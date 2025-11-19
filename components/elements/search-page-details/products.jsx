import React, { useEffect, useMemo, useRef } from 'react';
import SearchResultsProducts_Card from './search-page-card/searchResultsProducts_Card';
import SearchResultsLoading from './search-page-card/searchResultsLoading';
import { Pagination } from 'antd';
import SearchResultsProductsFilter from './search-page-filter/search-results-products-filter';
import { useRouter } from 'next/router';
import NotFound, { SearchProductsNotFound } from './notFound';
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
        type = 'file',
        category = '',
        similar_documents,
        tab = '1',
        page = 1,
        keyword = '',
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
    const isRequestsEnabled = router.isReady && tab === currentTab;
    const isChildCategoryEnabled = isRequestsEnabled && !!router.query.category;
    const similarDocumentsEnabled = data?.count < 50 && Number(page) === 1;
    const keysChangeOnSimilarDocuments = `${page}-${keyword}-${type}-${category}-${order_by}-${file_type}-${page_from}-${page_to}`;

    const {
        data: similarDocuments,
        isFetching: isFetchingSimilarDocuments,
    } = useQuery({
        queryKey: ['similar-documents', keysChangeOnSimilarDocuments],
        queryFn: async () => {
            const res = await fetch(
                `${baseUrlUseApi}customer/same-google-search/?limit=50${
                    page ? `&page=${page}` : ''
                }${keyword ? `&search=${keyword}` : ''}${
                    type ? `&type=${type}` : ''
                }${category ? `&category=${category}` : ''}${
                    order_by ? `&order_by=${order_by}` : ''
                }${file_type ? `&file_type=${file_type}` : ''}${
                    page_from ? `&page_from=${page_from}` : ''
                }${page_to ? `&page_to=${page_to}` : ''}&similar_documents=true`
            );
            return await res.json();
        },
        enabled: similarDocumentsEnabled,
    });

    const mergedData = useMemo(() => {
        return [
            ...((data && data.results) || []),
            ...(isFetchingSimilarDocuments
                ? Array(10).fill({ type: 'skeleton' })
                : (similarDocuments && similarDocuments.results) || []),
        ];
    }, [data, similarDocuments, isFetchingSimilarDocuments]);

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

    const total = data?.count + (similarDocuments?.count || 0) || 0;
    const notFoundRef = useRef();
    const showResults = Array.isArray(mergedData) && mergedData?.length > 0;

    useScrollToNotFound(notFoundRef, showResults, data);

    useEffect(() => {
        if (similarDocuments && similarDocuments.results.length) {
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

    let resultsContent = null;

    if (showResults) {
        resultsContent = (
            <>
                {mergedData.map((item, index) =>
                    item.type === 'skeleton' ? (
                        <SearchResultsLoading key={index} />
                    ) : (
                        <SearchResultsProducts_Card
                            product={item}
                            key={index}
                        />
                    )
                )}
                <Pagination
                    style={{
                        marginBottom: '100px',
                        marginTop: '20px',
                    }}
                    className=""
                    current={router.query.page || 1}
                    pageSize={50}
                    total={total}
                    onChange={newPage => {
                        router.push({
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                                page: newPage,
                            },
                        });
                    }}
                />
            </>
        );
    } else {
        resultsContent = <NotFound ref={notFoundRef} />;
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
