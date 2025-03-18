import React from 'react';
import SearchResultsProducts from './search-page-filter/search-results-products-filter';
import SearchResultsProducts_Card from './search-page-card/searchResultsProducts_Card';
import useApi from '~/repositories/useApi';
import { Skeleton } from 'antd';

export default function Search_Results_Products ({ data }) {
    console.log('data =>', data);
    const { isLoading } = useApi();

    return (
        <>
            <SearchResultsProducts count={data} />
            <div className='Search_Results_Products container'>
                <div className='Search_Results_Products_Wrap'>
                    <div className='Search_Results_Products_Wrap'>
                        {isLoading ? (
                            <>
                                {Array(15)
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
                            data.map((item, index) => (
                                <div key={index}>
                                    <SearchResultsProducts_Card
                                        product={item}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className='forAdds'></div>
            </div>
        </>
    );
}
