import React, { useRef, useEffect } from 'react';
import { Pagination } from 'antd';
import Search_Results_NotFound from './notFound';
import ServiceCard from '~/entities/service/service-card';
import { useRouter } from 'next/router';
import useScrollToNotFound from '~/shared/hooks/useScrollToNotFound';
import SearchResultsProductsFilter from './search-page-filter/search-results-services-filter';

export default function Search_Results_Services({
    children,
    initialData: data,
}) {
    const router = useRouter();
    const notFoundRef = useRef();
    const { offset: queryOffset } = router.query;

    const limit = 50;
    const offset = Number(queryOffset || 0);
    const currentPage = Math.floor(offset / limit) + 1;

    const showResults = Array.isArray(data?.items) && data?.items?.length > 0;

    useScrollToNotFound(notFoundRef, showResults, data);

    let showResultsContent = null;

    if (showResults) {
        showResultsContent = (
            <>
                <div className="Search_Results_Services_wrap">
                    {data?.items?.map((item, index) => (
                        <ServiceCard service={item} key={index} />
                    ))}
                </div>
                <Pagination
                    style={{
                        marginBottom: '100px',
                        marginTop: '20px',
                    }}
                    pageSize={limit}
                    current={currentPage}
                    total={data?.total_service}
                    pageSizeOptions={[]}
                    onChange={(newPage) => {
                        const newOffset = (newPage - 1) * limit;
                        router.push({
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                                offset: newOffset,
                                limit,
                            },
                        });
                    }}
                />
            </>
        );
    } else {
        showResultsContent = <Search_Results_NotFound ref={notFoundRef} />;
    }

    useEffect(() => {
        const defineDirection = async () => {
            const rankingsMap = new Map();

            if (data?.total_service) {
                data.items.forEach((service) => {
                    if (rankingsMap.has(service.category?.direction)) {
                        const currentUsageNumber = rankingsMap.get(
                            service.category?.direction
                        );
                        rankingsMap.set(
                            service.category?.direction,
                            ++currentUsageNumber
                        );
                    } else {
                        rankingsMap.set(service.category?.direction, 1);
                    }
                });

                const heighestUsageDetect = [...rankingsMap.entries()];

                let max = -Infinity;
                let direction = null;

                for (let i = 0; i < heighestUsageDetect.length; i++) {
                    const [key, value] = heighestUsageDetect[i];
                    if (value > max) {
                        max = value;
                        direction = key;
                    }
                }

                router.push(
                    {
                        pathname: router.pathname,
                        query: {
                            ...router.query,
                            ts_direction: direction,
                        },
                    },
                    undefined,
                    { shallow: true }
                );
            }
        };
        defineDirection();
    }, [data]);

    return (
        <div className="Search_Results_Products container">
            <div className="d-flex">
                <div className="w-100">
                    <div className="mb-3">
                        <SearchResultsProductsFilter
                            count={data}
                            total={data?.total_service}
                        />
                    </div>
                    <div>{showResultsContent}</div>
                </div>
            </div>
            {children}
        </div>
    );
}
