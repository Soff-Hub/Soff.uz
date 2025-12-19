import React, { useEffect, useRef } from 'react';
import { Pagination } from 'antd';
import SearchResultsSpecialists_Filter from './search-page-filter/search-results-specialists-filter';
import Search_Results_NotFound from './notFound';
import { useRouter } from 'next/router';
import useScrollToNotFound from '~/shared/hooks/useScrollToNotFound';
import SearchSellerCard from '~/entities/seller/search-seller-card';

const currentTab = '3';
export default function Search_Results_Specialists({
    children,
    initialData: data,
}) {
    const router = useRouter();
    const notFoundRef = useRef();
    const { offset: queryOffset } = router.query;

    const limit = 51;
    const offset = Number(queryOffset || 0);
    const currentPage = Math.floor(offset / limit) + 1;

    const showResults =
        Array.isArray(data?.results) && data?.results?.length > 0;

    useScrollToNotFound(notFoundRef, showResults, data);

    let resultsContent = null;
    if (showResults) {
        resultsContent = (
            <>
                <div className="Search_Results_Specialists_Wrap">
                    {data.results.map((item) => (
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

    useEffect(() => {
        const defineDirection = async () => {
            const rankingsMap = new Map();

            if (data?.count) {
                data.results.forEach((specialist) => {
                    if (
                        rankingsMap.has(specialist.position?.position_direction)
                    ) {
                        const currentUsageNumber = rankingsMap.get(
                            specialist.position?.position_direction
                        );
                        rankingsMap.set(
                            specialist.position?.position_direction,
                            ++currentUsageNumber
                        );
                    } else {
                        rankingsMap.set(
                            specialist.position?.position_direction,
                            1
                        );
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
