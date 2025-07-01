import React from 'react';
import SearchResultsProducts_Card from './search-page-card/searchResultsProducts_Card';
import { Pagination, Skeleton } from 'antd';
import SearchResultsProductsFilter from './search-page-filter/search-results-products-filter';
import { useRouter } from 'next/router';
import Search_Results_NotFound from './notFound';

export default function Search_Results_Products({ data, page, total, isLoading, childData , parentData}) {
    const router = useRouter();
    const showResults = !isLoading && Array.isArray(data) && data.length > 0;

    return (
        <>
            <SearchResultsProductsFilter parentData={parentData} childData={childData}   count={data} />
            <>
                <div className='Search_Results_Products container'>
                    <div className='Search_Results_Products_Wrap'>
                        <div>
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
                                ): <Search_Results_NotFound />}

                             
                            </div>
                        </div>
                    </div>

                    <div className='forAdds mt-5'></div>
                </div>

                {showResults && (
                    <Pagination
                        className='mt-3'
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
        </>
    );
}









{/* {data?.count >= 48 && ( */}
{/* <Link href='' className='forMore'> */}
{/* <button className='forMoreBox'>
    Ko‘proq ko‘rish
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'>
        <path
            d='M11.6243 7.97984L7.86833 4.22389L8.85857 3.23364L14.305 8.68005L8.85857 14.1264L7.86833 13.1361L11.6243 9.38027H3.10156V7.97984H11.6243Z'
            fill='#312F30'
        />
    </svg>
</button> */}
{/* </Link> */}
{/* )} */}