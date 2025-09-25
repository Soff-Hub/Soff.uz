import React from 'react';
import Search_Results_Services_filter from './search-page-filter/search-results-services-filter';
import { Pagination, Skeleton } from 'antd';
import Search_Results_NotFound from './notFound';
import ServiceCard from '~/entities/cards/service-card';
import { useRouter } from 'next/router';
import LastAddedProductCard from './search-page-card/lastAddedProductCard';

export default function Search_Results_Services({ data, isLoading, childData, parentData, lastProducts, createBtn }) {
    const router = useRouter();

    const limit = 10;
    const offset = Number(router.query.offset || 0);
    const currentPage = Math.floor(offset / limit) + 1;

    const showResults = Array.isArray(data?.items) && data?.items?.length > 0;

    return (
        <div className='Search_Results_Services'>
            <div className='mb-5'>
                <Search_Results_Services_filter
                    total={data?.total_service}
                    parentData={parentData}
                    childData={childData}
                />
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
                        )}
                        {showResults && (
                            data?.items?.map((item, index) => (
                                <div key={index}>
                                    <ServiceCard service={item}/>
                                </div>
                            ))
                        )}
                    </div>

                    {showResults && (
                        <Pagination
                            className='mt-3'
                            pageSize={limit}
                            current={currentPage}
                            total={data?.total_service}
                            onChange={(newPage) => {
                                const newOffset = (newPage - 1) * limit;
                                router.push({
                                    pathname: router.pathname,
                                    query: { ...router.query, offset: newOffset, limit },
                                });
                            }}
                        />
                    )}

                    {!showResults && <Search_Results_NotFound />}
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
        </div>
    );
}
