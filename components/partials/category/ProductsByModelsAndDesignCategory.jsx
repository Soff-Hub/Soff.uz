import React, { useState } from 'react';
import { Pagination } from 'antd';
import { Skeleton } from 'antd';
import ModelAndDesignProduct from '~/components/elements/products/ModelAndDesignProduct';

export default function ProductsByModelsAndDesignCategory ({
    data = [],
    page,
    handlePagination,
    isLoading,
}) {
    return (
        <div id='products'>
            <div className='row contaioner  ' style={{rowGap:'42px'}}>
                {isLoading && (
                    <div className={`product-list p-loading mb-5 mt-3 `}>
                        {Array(48)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton.Image
                                    key={i}
                                    active
                                    className={`ModelAndDesignProduct_skeletion_card col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6`}
                                />
                            ))}
                    </div>
                )}

                {data?.results?.map((item, index) => (
                    <div
                        className=' col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 '
                        style={{ height: '329px' }}
                        key={index}>
                        <ModelAndDesignProduct product={item} />
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
                <div className='d-flex justify-content-center mt-5'>
                    <Pagination
                        className='text-success'
                        total={data?.count}
                        pageSize={48}
                        responsive={true}
                        showSizeChanger={false}
                        current={page}
                        onChange={e => handlePagination(e)}
                    />
                </div>
            )}
        </div>
    );
}
