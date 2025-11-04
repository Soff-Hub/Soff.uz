import React, { useRef, useEffect } from 'react';
import { Pagination, Skeleton } from 'antd';
import Search_Results_NotFound from './notFound';
import ServiceCard from '~/entities/service/service-card';
import { useRouter } from 'next/router';
import useScrollToNotFound from '../../../shared/hooks/useScrollToNotFound';
import { useFGet } from '~/shared/hooks/useFApi';
import SearchResultsProductsFilter from './search-page-filter/search-results-services-filter';

const currentTab = '2';
export default function Search_Results_Services({ children, initialData }) {
    const router = useRouter();
    const notFoundRef = useRef();
    const isFirstRender = useRef(true);
    const {
        keyword = '',
        service_parent = '',
        category_id = '',
        direction = '',
        type = '',
        tab = currentTab,
        offset: queryOffset,
    } = router.query;

    const limit = 50;
    const offset = Number(queryOffset || 0);
    const currentPage = Math.floor(offset / limit) + 1;

    const servicesQuery = new URLSearchParams({
        ...(category_id && { category_id }),
        ...(direction && { direction }),
        limit,
        offset,
    });

    const isRequestsEnabled = router.isReady && router.query.tab === currentTab;
    const isProductsSearchEnabled =
        (isRequestsEnabled && !isFirstRender.current) || !initialData;

    // NOTE: Initial Data for Services Search
    const productsDataInitialData =
        isFirstRender.current && initialData ? initialData : undefined;

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
    }, [router.query]);

    const { data, isLoading } = useFGet(
        [
            'customer/services',
            keyword,
            limit,
            offset,
            direction,
            service_parent,
        ],
        `customer?${servicesQuery.toString()}&search=${keyword}${
            service_parent ? `&category_id=${service_parent}` : ''
        }`,
        {
            enabled: isProductsSearchEnabled,
            initialData: productsDataInitialData,
        }
    );

    const showResults = Array.isArray(data?.items) && data?.items?.length > 0;

    useScrollToNotFound(notFoundRef, showResults, data);

    let showResultsContent = null;
    if (isLoading) {
        showResultsContent = (
            <div className="Search_Results_Services_wrap">
                {Array(12)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton.Image
                            key={i}
                            active
                            className="Search_Results_Wrap_skeleton"
                        />
                    ))}
            </div>
        );
    } else if (showResults) {
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
                        router.push(
                            {
                                pathname: router.pathname,
                                query: {
                                    ...router.query,
                                    offset: newOffset,
                                    limit,
                                },
                            },
                            undefined,
                            { shallow: true }
                        );
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
