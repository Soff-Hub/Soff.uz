import React, { useMemo, useRef } from 'react';
import SearchResultsProducts_Card from './search-page-card/searchResultsProducts_Card';
import SearchResultsLoading from './search-page-card/searchResultsLoading';
import { Pagination } from 'antd';
import SearchResultsProductsFilter from './search-page-filter/search-results-products-filter';
import { useRouter } from 'next/router';
import NotFound from './notFound';
import useScrollToNotFound from '~/shared/hooks/useScrollToNotFound';
import { useQuery } from '@tanstack/react-query';
import { baseUrlUseApi } from '~/repositories/useApi';
import useSimilarSearch from '~/shared/hooks/useSimilarSearch';

const currentTab = '1';

export default function Search_Results_Products({
    children,
    initialData: data,
}) {
    const { similarDocuments, isFetchingSimilarDocuments } = useSimilarSearch({
        defaultData: data,
    });
    const router = useRouter();
    const {
        type = 'file',
        page = '1',
        category = '',
        tab = '1',
    } = router.query;

    // NOTE: Requests Enable property
    const isRequestsEnabled = router.isReady && tab === currentTab;
    const isChildCategoryEnabled = isRequestsEnabled && !!router.query.category;

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
                    current={Number(page)}
                    pageSize={50}
                    total={total}
                    onChange={(newPage) => {
                        router.push({
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                                // Keep similar documents in the SSR result set on
                                // later pages; the flag is only added on user
                                // navigation so the landing URL stays stable.
                                ...(similarDocuments?.results?.length > 0 && {
                                    similar_documents: 'true',
                                }),
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
