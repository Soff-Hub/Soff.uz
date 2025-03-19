import { Breadcrumb, Skeleton } from 'antd';
import React from 'react';
import SearchResultsSpecialists_Filter from './search-page-filter/search-results-specialists-filter';
import SearchResultsSpecialists_Card from './search-page-card/searchResultsSpecialists_Card';
import useApi from '~/repositories/useApi';

export default function Search_Results_Specialists ({ data }) {
    console.log('Search_Results_Specialists =>>' ,data);
    
    

    return (
        <div>
            <SearchResultsSpecialists_Filter count={data} />
            <div className='Search_Results_Specialists'>
                <div>
                    {' '}
                    <div className='Search_Results_Specialists_Wrap'>
                        {false ? (
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
                        ) : (
                            data?.map((item, index) => (
                                <div key={index}>
                                    <SearchResultsSpecialists_Card
                                        data={item}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                    <div className='forMoreBox text-center'>
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
                <div className='forAdds'></div>
            </div>
        </div>
    );
}
