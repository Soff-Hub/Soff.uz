import React, { useState } from 'react';
import { Pagination } from 'antd';
import { Skeleton } from 'antd';
import DesignDevelopmentProducts from '~/components/elements/products/DesignDevelopmentProducts';

export default function ProductsByDesignDevelopment ({
    data = [],
    page,
    handlePagination,
    isLoading,
}) {
    return (
        <div id='products'>
            <div className='row mt-5 mx-auto'>
                {isLoading && (
                    <div className={`product-list p-loading`}>
                        {Array(48)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton.Image
                                    key={i}
                                    active
                                    className={` ModelAndDesignProduct_skeletion_card col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6  mb-5`}
                                />
                            ))}
                    </div>
                )}
                {data?.results?.length > 0 &&
                    data?.results?.map((item, index) => (
                        <div
                            className=' mt-4 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6'
                            key={index}>
                            <DesignDevelopmentProducts product={item} />
                        </div>
                    ))}
            </div>
            <div className='row justify-content-center'>
                {data?.results?.length == 0 && (
                    <div
                        className='text-center col-md-6 com-12'
                        style={{ padding: '150px 0px' }}>
                        <p className='fs-1'>
                            😕 Bu yerda hozircha hech narsa yo‘q...
                        </p>
                        <p className='fs-4'>
                            Birinchilardan bo‘lib ushbu kategoriyaga mahsulot
                            joylashtirib boshlang va o'z auditoriyangizni yig'ib
                            daromad qilishni boshlang! 👉{' '}
                            <a
                                target='_blank'
                                className='text-primary'
                                href='https://seller.soff.uz'>
                                seller.soff.uz
                            </a>{' '}
                        </p>
                    </div>
                )}
            </div>
            {data?.count >= 48 && (
                <div className='text-center my-4'>
                    <Pagination
                        total={data?.count}
                        pageSize={48}
                        responsive={true}
                        showSizeChanger={false}
                        current={page}
                        showTotal={(total, range) =>
                            `${total} ta dan ${range[0]}-${range[1]} oralig'i `
                        }
                        onChange={e => handlePagination(e)}
                    />
                </div>
            )}
        </div>
    );
}
