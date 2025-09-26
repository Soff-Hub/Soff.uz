import React from 'react';
import SearchResultsProducts_Card from './search-page-card/searchResultsProducts_Card';
import { Pagination, Skeleton } from 'antd';
import SearchResultsProductsFilter from './search-page-filter/search-results-products-filter';
import { useRouter } from 'next/router';
import Search_Results_NotFound from './notFound';
import RedesignProduct from '../products/Redesign/Redesign-Product';
import LastAddedProductCard from './search-page-card/lastAddedProductCard';

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

                <div className='forAdds p-5'>
                    <div className='d-flex justify-content-center mb-3'>
                        {createBtn()}
                    </div>
                    {lastProducts?.results &&
                        <h3
                            style={{
                                fontSize: '20px',
                                fontWeight: 400,
                                borderTop: "1px solid rgba(0,0,0,0.2)",
                                paddingTop: "10px"
                            }}
                            className='similar_title'>
                            So'ngi yuklangan mahsulotlar
                        </h3>
                    }
                    {lastProducts?.results?.map((p, i) =>
                        <div className='mb-4' key={i}>
                            <LastAddedProductCard product={p} />
                        </div>
                    )}
                </div>
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