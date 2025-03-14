import React from 'react';
import { Pagination } from 'antd';
import { Skeleton } from 'antd';
import DevelopmentAndItProduct from '~/components/elements/ItServicesCategoriesProduct/DevelopmentAndItProduct';
import Link from 'next/link';

export default function DevelopmentAndItProductsByCategory ({
    data = [],
    page,
    handlePagination,
    isLoading,
}) {
    return (
        <div id='products' className='container p-xl-0 p-lg-0 p-sm-0 p-0'>
            <div className='DevelopmentAndItCategory'>
                {isLoading && (
                    <>
                        {Array(25)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton.Image
                                    key={i}
                                    active
                                    className={`DevelopmentAndItCategorySkeleton`}
                                />
                            ))}
                    </>
                )}
                {data?.results?.length > 0 &&
                    data?.results?.map((item, index) => (
                        <div key={index}>
                            <DevelopmentAndItProduct product={item} />
                        </div>
                    ))}
            </div>

            <div className='showMoreBox'>
                <p className='showMore'>Yana ko’rsatish 46</p>
            </div>
        </div>
    );
}
