import React from 'react';
import SearchResultsProducts_Card from './search-page-card/searchResultsProducts_Card';
import { Skeleton } from 'antd';
import SearchResultsProductsFilter from './search-page-filter/search-results-products-filter';

export default function Search_Results_Products (
    {data},
    page,
    handlePagination,
    isLoading
) {
    console.log(' data data =><>>>', data);

    return (
        <>
            <SearchResultsProductsFilter count={data} />
            <div className='Search_Results_Products container'>
                <div className='Search_Results_Products_Wrap'>
                    <div>
                        <div className='Search_Results_Products_Wrap'>
                            {isLoading ? (
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
                            ) : (
                                data?.map((item, index) => (
                                    <div key={index}>
                                        <SearchResultsProducts_Card
                                            product={item}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                        {data?.count >= 48 && (
                            <button
                                className='forMoreBox text-center'
                                onChange={e => handlePagination(e)}
                                current={page}>
                                Ko'proq ko'rish
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
                            </button>
                        )}
                    </div>
                </div>
                <div className='forAdds'></div>
            </div>
        </>
    );
}
