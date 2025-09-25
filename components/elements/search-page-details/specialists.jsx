import { Pagination, Skeleton } from 'antd';
import React from 'react';
import SearchResultsSpecialists_Filter from './search-page-filter/search-results-specialists-filter';
import SearchResultsSpecialists_Card from './search-page-card/searchResultsSpecialists_Card';
import Search_Results_NotFound from './notFound';
import { useRouter } from 'next/router';
import LastAddedProductCard from './search-page-card/lastAddedProductCard';

export default function Search_Results_Specialists({ data, lastProducts, createBtn }) {
    const router = useRouter();
    const isLoading = false;

    const limit = 32; // 🔑 nechta specialist chiqishi
    const offset = Number(router.query.offset || 0);
    const currentPage = Math.floor(offset / limit) + 1;

    const showResults =
        Array.isArray(data?.results) && data?.results?.length > 0;

    return (
        <div>
            <SearchResultsSpecialists_Filter total={data?.count} />
            <div className="Search_Results_Specialists">
                <div>
                    <div className="Search_Results_Specialists_Wrap">
                        {isLoading && (
                            <>
                                {Array(12)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Skeleton.Image
                                            key={i}
                                            active
                                            className="Search_Results_Wrap_skeleton"
                                        />
                                    ))}
                            </>
                        )}
                        {showResults &&
                            data?.results?.map((item, index) => (
                                <SearchResultsSpecialists_Card
                                    key={item?.soff_seller_id}
                                    data={item}
                                />
                            ))}
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

                    {!showResults && <Search_Results_NotFound />}
                </div>

                <div className="forAdds p-5">
                    <div className='d-flex justify-content-center mb-3'>
                        {createBtn()}
                    </div>
                    {lastProducts?.results && (
                        <h3
                            style={{
                                fontSize: '20px',
                                fontWeight: 400,
                            }}
                            className="similar_title">
                            So‘ngi yuklangan mahsulotlar
                        </h3>
                    )}
                    {lastProducts?.results?.map((p, i) => (
                        <div className="mb-4" key={i}>
                            <LastAddedProductCard product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
