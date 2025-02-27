import React, { useState } from 'react';
import Product from '~/components/elements/products/Product';
import { Pagination } from 'antd';
import { Skeleton } from 'antd';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';

export default function ProductsByCategory ({
    data = [],
    page,
    handlePagination,
    isLoading,
}) {
    return (
        <div id='products' className='container' >
            {isLoading && (
                <div className={`product-list  p-loading gap-4 mt-5`}>
                    {Array(15)
                        .fill(0)
                        .map((d, i) => (
                            <Skeleton.Image
                                key={i}
                                active
                                className={`skeletion-card file`}
                            />
                        ))}
                </div>
            )}
            <div className='card_conatiner_section '>
                {data?.results?.map((item, index) => (
                    <div className='card_container' key={index}>
                        <RedesignProduct product={item} />
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
