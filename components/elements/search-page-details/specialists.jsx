import React, { useRef } from 'react';
import { Pagination, Skeleton } from 'antd';
import SearchResultsSpecialists_Filter from './search-page-filter/search-results-specialists-filter';
import SearchResultsSpecialists_Card from './search-page-card/searchResultsSpecialists_Card';
import Search_Results_NotFound from './notFound';
import { useRouter } from 'next/router';
import LastAddedProductCard from './search-page-card/lastAddedProductCard';
import SerachSide from './search-page-side';
import useScrollToNotFound from './useScrollToNotFound';

export default function Search_Results_Specialists({
    data,
    lastProducts,
    createBtn,
}) {
    const router = useRouter();
    const notFoundRef = useRef();

    const isLoading = false;
    const limit = 32; // 🔑 nechta specialist chiqishi
    const offset = Number(router.query.offset || 0);
    const currentPage = Math.floor(offset / limit) + 1;

    const showResults =
        Array.isArray(data?.results) && data?.results?.length > 0;

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
        resultsContent = data.results.map((item, index) => (
            <SearchResultsSpecialists_Card
                key={item?.soff_seller_id}
                data={item}
            />
        ));
    }

    return (
        <div className="Search_Results_Products container">
            <div className="d-flex">
                <div>
                    <div className="mb-3">
                        <SearchResultsSpecialists_Filter total={data?.count} />
                    </div>
                    <div>
                        <div className="Search_Results_Specialists_Wrap">
                            {loadingContent}
                            {resultsContent}
                        </div>
                        {/* ✅ Pagination */}
                        {showResults && (
                            <Pagination
                                className="mt-3"
                                pageSize={limit}
                                current={currentPage}
                                total={data?.count}
                                onChange={newPage => {
                                    const newOffset = (newPage - 1) * limit;
                                    router.push({
                                        pathname: router.pathname,
                                        query: {
                                            ...router.query,
                                            offset: newOffset,
                                            limit,
                                        },
                                    });
                                }}
                            />
                        )}

                        {!showResults && (
                            <Search_Results_NotFound ref={notFoundRef} />
                        )}
                    </div>
                </div>
            </div>

            <SerachSide lastProducts={lastProducts} createBtn={createBtn} />
        </div>
    );
}
