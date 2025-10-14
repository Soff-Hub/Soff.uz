import React, { useRef, useMemo } from 'react';
import { Pagination, Skeleton } from 'antd';
import Search_Results_NotFound from './notFound';
import ServiceCard from '~/entities/service/service-card';
import { useRouter } from 'next/router';
import useScrollToNotFound from './useScrollToNotFound';
import { useFGet } from '~/shared/hooks/useFApi';

const currentTab = '2';
export default function Search_Results_Services({ children }) {
    const router = useRouter();
    const notFoundRef = useRef();
    const queriesRef = useRef(router.query);
    queriesRef.current =
        router.query.tab === currentTab ? router.query : queriesRef.current;

    const {
        keyword = '',
        service_parent = '',
        category_id = '',
        direction = '',
        offset: queryOffset,
    } = queriesRef.current;

    const limit = 50;
    const offset = Number(queryOffset || 0);
    const currentPage = Math.floor(offset / limit) + 1;

    const servicesQuery = new URLSearchParams({
        ...(category_id && { category_id }),
        ...(direction && { direction }),
        limit,
        offset,
    });

    const { data, isLoading } = useFGet(
        ['customer/services', keyword, limit, offset],
        `customer?${servicesQuery.toString()}&search=${keyword}${
            service_parent ? `&category_id=${service_parent}` : ''
        }`
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
                        <div key={index}>
                            <ServiceCard service={item} />
                        </div>
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
                    onChange={newPage => {
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

    return (
        <div className="Search_Results_Products container">
            <div className="d-flex">
                <div className="w-100">
                    <div className="mb-5">
                        <div className="Search_Results_Products_form_box">
                            <div className="row align-items-center mb-3">
                                <div className="col-12 col-md-3">
                                    <p className="countProduct text-nowrap m-0">
                                        {data?.total
                                            ? `${data?.total} ta mahsulot topildi`
                                            : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>{showResultsContent}</div>
                </div>
            </div>
            {children}
        </div>
    );
}
