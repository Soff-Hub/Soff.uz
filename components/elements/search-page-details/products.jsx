import React, { useRef } from 'react';
import SearchResultsProducts_Card from './search-page-card/searchResultsProducts_Card';
import { Pagination, Skeleton } from 'antd';
import SearchResultsProductsFilter from './search-page-filter/search-results-products-filter';
import { useRouter } from 'next/router';
import Search_Results_NotFound from './notFound';
import SerachSide from './search-page-side';
import useScrollToNotFound from './useScrollToNotFound';

export default function Search_Results_Products({
    data,
    page,
    total,
    isLoading,
    childData,
    parentData,
    lastProducts,
    createBtn,
}) {
    const router = useRouter();
    const notFoundRef = useRef();
    const showResults = !isLoading && Array.isArray(data) && data.length > 0;

    useScrollToNotFound(notFoundRef, showResults, data);

    let loadingContent = null;
    if (isLoading) {
        loadingContent = isLoading ? (
            <>
                {Array(12)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton
                            key={i}
                            active
                            className="Search_Results_Wrap_skeleton"
                        />
                    ))}
            </>
        ) : null;
    }

    let resultsContent = null;
    if (showResults) {
        resultsContent = data.map((item, index) => (
            <div key={index}>
                <SearchResultsProducts_Card product={item} />
            </div>
        ));
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
                            {loadingContent}
                            {resultsContent}
                            {showResults && (
                                <Pagination
                                    style={{
                                        marginBottom: "100px",
                                        marginTop: "20px"
                                    }}
                                    className=""
                                    current={page}
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
                            )}
                        </div>
                    </div>
                </div>
                <SerachSide lastProducts={lastProducts} createBtn={createBtn} />
            </div>
        </>
    );
}
