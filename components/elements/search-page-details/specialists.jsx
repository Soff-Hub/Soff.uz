import React, { useEffect, useRef, useState } from 'react';
import { Pagination, Skeleton } from 'antd';
import SearchResultsSpecialists_Filter from './search-page-filter/search-results-specialists-filter';
import Search_Results_NotFound from './notFound';
import { useRouter } from 'next/router';
import useScrollToNotFound from '../../../shared/hooks/useScrollToNotFound';
import { useFGet } from '~/shared/hooks/useFApi';
import SearchSellerCard from '~/entities/seller/search-seller-card';

const currentTab = '3';
export default function Search_Results_Specialists({ children }) {
    const router = useRouter();
    const notFoundRef = useRef();
    const queriesRef = useRef(router.query);

    queriesRef.current =
        router.query.tab === currentTab ? router.query : queriesRef.current;
    const { keyword = '', offset: queryOffset } = queriesRef.current;

    const limit = 51;
    const offset = Number(queryOffset || 0);
    const currentPage = Math.floor(offset / limit) + 1;

    const { data, isLoading } = useFGet(
        ['customer/sellers', keyword, limit, offset],
        `users/sellers?limit=${limit}&offset=${offset}&search=${keyword}`
    );

    const showResults =
        Array.isArray(data?.results) && data?.results?.length > 0;

    useScrollToNotFound(notFoundRef, showResults, data);

    let resultsContent = null;
    if (isLoading) {
        resultsContent = (
            <div className="Search_Results_Specialists_Wrap">
                {Array(12)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton
                            key={i}
                            active
                            className="Search_Results_Wrap_skeleton"
                        />
                    ))}
            </div>
        );
    } else if (showResults) {
        resultsContent = (
            <>
                <div className="Search_Results_Specialists_Wrap">
                    {data.results.map((item) => (
                        // <SearchResultsSpecialists_Card
                        //     key={item?.soff_seller_id}
                        //     data={item}
                        // />
                        <SearchSellerCard
                            seller={item}
                            key={item?.soff_seller_id}
                        />
                    ))}
                </div>
                {/* ✅ Pagination */}
                <Pagination
                    style={{
                        marginBottom: '100px',
                        marginTop: '20px',
                    }}
                    pageSize={limit}
                    current={currentPage}
                    pageSizeOptions={[]}
                    total={data?.count}
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
        resultsContent = <Search_Results_NotFound ref={notFoundRef} />;
    }

    console.log({ data });

    useEffect(() => {
        const defineDirection = async () => {
            const rankingsMap = new Map();

            if (data?.count) {
                data.results.forEach((specialist) => {
                    if (rankingsMap.has(specialist.position?.direction)) {
                        const currentUsageNumber = rankingsMap.get(
                            specialist.position?.direction
                        );
                        rankingsMap.set(
                            specialist.position?.direction,
                            ++currentUsageNumber
                        );
                    } else {
                        rankingsMap.set(specialist.position?.direction, 1);
                    }
                });

                const heighestUsageDetect = [...rankingsMap.entries()];
                console.log({ heighestUsageDetect });

                let max = -Infinity;
                let direction = null;

                for (let i = 0; i < heighestUsageDetect.length; i++) {
                    const [key, value] = heighestUsageDetect[i];
                    if (value > max) {
                        max = value;
                        direction = key;
                    }
                }

                router.push({
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        direction,
                    },
                });
            }
        };
        defineDirection();
    }, [data]);

    return (
        <div className="Search_Results_Products container">
            <div className="d-flex">
                <div className="w-100">
                    <div style={{ marginBottom: '26px' }}>
                        <SearchResultsSpecialists_Filter total={data?.count} />
                    </div>
                    <div>{resultsContent}</div>
                </div>
            </div>
            {children}
        </div>
    );
}
