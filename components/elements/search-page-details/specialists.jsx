import { Breadcrumb, Skeleton } from 'antd';
import React from 'react';
import SearchResultsSpecialists_Filter from './search-page-filter/search-results-specialists-filter';
import SearchResultsSpecialists_Card from './search-page-card/searchResultsSpecialists_Card';
import useApi from '~/repositories/useApi';

export default function Search_Results_Specialists ({ data }) {
    console.log('Search_Results_Specialists', data);
    const { isLoading } = useApi();

    return (
        <div>
            <SearchResultsSpecialists_Filter count={data} />
            <div className='Search_Results_Specialists'>
                <div className='Search_Results_Specialists_Wrap'>
                    {isLoading ? (
                        <>
                            {Array(15)
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
                        data.map((item, index) => (
                            <div key={index}>
                                <SearchResultsSpecialists_Card data={item} />
                            </div>
                        ))
                    )}
                </div>

                <div className='forAdds'></div>
            </div>
        </div>
    );
}
