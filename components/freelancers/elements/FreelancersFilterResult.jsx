import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import SearchSellerCard from '~/entities/seller/search-seller-card';

function FreelancersFilterResult({ data, collapsed }) {
    const router = useRouter();
    const limit = collapsed ? 21 : 20;
    const offset = Number(router.query.offset) || 0;
    const currentPage = offset / limit + 1;

    const handlePageChange = (page) => {
        const newOffset = (page - 1) * limit;
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                offset: newOffset || undefined,
                limit,
            },
        });
    };

    useEffect(() => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                offset: undefined,
                limit,
            },
        });
    }, [collapsed]);

    return (
        <div className="w-100">
            {data?.count > 0 ? (
                <div
                    className={`row row-gap-4 row-cols-2 row-cols-sm-2 row-cols-md-3 ${
                        collapsed ? 'row-cols-lg-3' : 'row-cols-lg-4'
                    } `}
                >
                    {data?.results?.map((s) => (
                        <div key={s.id}>
                            <SearchSellerCard seller={s} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="Search_Results_not_found">
                    <img
                        src="/static/img/searchNotFound.png"
                        alt=""
                        className="Search_Results_not_found_img"
                    />
                    <p
                        className="Search_Results_not_found_title"
                        style={{ marginTop: 20, marginBottom: 0 }}
                    >
                        Afsuski, bu yo'nalishda frilanserlar topilmadi.
                    </p>
                </div>
            )}
            {data?.count > limit && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '20px 0px',
                    }}
                >
                    <Pagination
                        pageSize={limit}
                        current={currentPage}
                        total={data?.count}
                        size="medium"
                        showSizeChanger={false}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
}

export default FreelancersFilterResult;
