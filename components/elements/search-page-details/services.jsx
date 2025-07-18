import React from 'react';
import Search_Results_Services_filter from './search-page-filter/search-results-services-filter';
import SearchResultsServices_Card from './search-page-card/searchResultsServices_Card';
import { Pagination, Skeleton } from 'antd';
import Search_Results_NotFound from './notFound';

export default function Search_Results_Services({ data, page, total, isLoading, childData, parentData }) {
    const showResults = !isLoading && Array.isArray(data) && data?.length > 0;
    return (
        <div className='Search_Results_Services'>
            <div className='mb-5'>
                <Search_Results_Services_filter total={total} parentData={parentData} childData={childData} count={data} />
            </div>
            <div className='Search_Results_Services_product'>
                <div>
                    <div className='Search_Results_Services_wrap'>
                        {isLoading && (
                            <>
                                {Array(12)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Skeleton.Image
                                            key={i}
                                            active
                                            className='Search_Results_Wrap_skeleton'
                                        />
                                    ))}
                            </>
                        )}{showResults && (
                            data?.map((item, index) => (
                                <div key={index}>
                                    <SearchResultsServices_Card
                                        product={item}
                                    />
                                </div>
                            ))
                        )}
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
                    {!showResults && <Search_Results_NotFound />}
                </div>
                <div className='forAdds'></div>
            </div>
        </div>
    );
}


// featured items

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