import React from 'react';
import Search_Results_Services_filter from './search-page-filter/search-results-services-filter';
import SearchResultsServices_Card from './search-page-card/searchResultsServices_Card';
import useApi from '~/repositories/useApi';
import { Skeleton } from 'antd';

export default function Search_Results_Services ({ data }) {
    console.log('Search_Results_Services =>', data);
    const { isLoading } = useApi();

    return (
        <div className='Search_Results_Services'>
            <Search_Results_Services_filter count={data} />
            <div className='Search_Results_Services_product'>
                <div className='Search_Results_Services_wrap'>
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
                        data &&
                        data.map((item, index) => (
                            <div key={index}>
                                <SearchResultsServices_Card product={item} />
                            </div>
                        ))
                    )}
                </div>
                <div className='forAdds'></div>
            </div>
        </div>
    );
}
