import React from 'react';
import SearchResultsProducts_Card from './search-page-card/searchResultsProducts_Card';
import { Pagination, Skeleton } from 'antd';
import SearchResultsProductsFilter from './search-page-filter/search-results-products-filter';
import { useRouter } from 'next/router';
import Search_Results_NotFound from './notFound';
import LastAddedProductCard from './search-page-card/lastAddedProductCard';
import SerachSide from './search-page-side';

export default function Search_Results_Products({ data, page, total, isLoading, childData, parentData, lastProducts, createBtn }) {
    const router = useRouter();
    const showResults = !isLoading && Array.isArray(data) && data.length > 0;

    return (
        <>
            <div className='Search_Results_Products container'>
                <div className='Search_Results_Products_Wrap'>
                    <div>
                        <div className='mb-3'>
                            <SearchResultsProductsFilter total={total} parentData={parentData} childData={childData} count={data} />
                        </div>
                        <div className='Search_Results_Products_Wrap'>
                            {isLoading && (
                                <>
                                    {Array(12)
                                        .fill(0)
                                        .map((_, i) => (
                                            <Skeleton
                                                key={i}
                                                active
                                                className='Search_Results_Wrap_skeleton'
                                            />
                                        ))}
                                </>
                            )}

                            {showResults ? (
                                data.map((item, index) => (
                                    <div key={index}>
                                        <SearchResultsProducts_Card product={item} />
                                    </div>
                                ))
                            ) : <Search_Results_NotFound />}


                        </div>
                    </div>
                </div>
                <SerachSide
                    lastProducts={lastProducts}
                    createBtn={createBtn}
                />
            </div>

            {showResults && (
                <Pagination
                    className='my-3'
                    current={page}
                    pageSize={10}
                    total={total}
                    onChange={(newPage) => {
                        router.push({
                            pathname: router.pathname,
                            query: { ...router.query, page: newPage },
                        });
                    }}
                />
            )}
        </>
    );
}