import { Skeleton } from 'antd';
import React from 'react';
import useApi from '~/repositories/useApi';
import SearchResultsSpecialists_Card from './search-page-card/searchResultsSpecialists_Card';
import SearchResultsProducts_Card from './search-page-card/searchResultsProducts_Card';
import Link from 'next/link';
import SearchResultsServices_Card from './search-page-card/searchResultsServices_Card';

export default function SearchAllProducts ({ data }, isLoading) {
    console.log('data =>>>>>>>>00', data);

    return (
        <div className='SearchAllProducts'>
            <div>
                <div className='Search_Results_Products_Wrap'>
                    {isLoading ? (
                        <>
                            {Array(2)
                                .fill(0)
                                .map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        active
                                        className='Search_Results_Wrap_skeleton'
                                    />
                                ))}
                        </>
                    ) : (
                        data?.slice(0, 2).map((item, index) => (
                            <div key={index}>
                                <SearchResultsProducts_Card product={item} />
                            </div>
                        ))
                    )}
                </div>

                <div className='specialistsSection'>
                    <p className='SearchAllProductsTitle  '>Mutaxassislar</p>
                    <div className='Search_Results_Specialists_Wrap'>
                        {isLoading ? (
                            <>
                                {Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Skeleton.Image
                                            key={i}
                                            active
                                            className='Search_Results_Wrap_skeleton'
                                        />
                                    ))}
                            </>
                        ) : (
                            data?.slice(0, 4).map((item, index) => (
                                <div key={index}>
                                    <SearchResultsSpecialists_Card
                                        data={item}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                    <div className='forMoreBox'>
                        <a className='forMore'>Ko'proq ko'rish</a>
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
                    </div>
                </div>

                <div className='servicesDataSection'>
                    <p className='SearchAllProductsTitle  '>Xizmatlar</p>
                    <div className='Search_Results_Services_wrap'>
                        {isLoading ? (
                            <>
                                {Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Skeleton.Image
                                            key={i}
                                            active
                                            className='Search_Results_Wrap_skeleton'
                                        />
                                    ))}
                            </>
                        ) : (
                            data?.resluts?.slice(0, 4).map((item, index) => (
                                <div key={index}>
                                    <SearchResultsServices_Card
                                        product={item}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className='forMoreBox'>
                    <a className='forMore'>Ko'proq ko'rish</a>
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
                </div>

                <div className='productsDataSection'>
                    <p className='SearchAllProductsTitle  '>Mahsulotlar</p>

                    <div className='Search_Results_Products_Wrap'>
                        {isLoading ? (
                            <>
                                {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                        <Skeleton
                                            key={index}
                                            active
                                            className='Search_Results_Wrap_skeleton'
                                        />
                                    ))}
                            </>
                        ) : (
                            data?.resluts?.slice(0, 5).map((item, index) => (
                                <div key={index}>
                                    <SearchResultsProducts_Card
                                        product={item}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                    <div className='forMoreBox'>
                        <a className='forMore'>Ko'proq ko'rish</a>
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
                    </div>
                </div>
            </div>

            <div className='forAdds'></div>
        </div>
    );
}
