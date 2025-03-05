import React, { useState } from 'react';
import { Pagination } from 'antd';
import { Skeleton } from 'antd';
import VideoLessonsProducts from '~/components/elements/products/VideoLessonsProducts';

export default function ProductsByVideoLessons ({
    data = [],
    page,
    handlePagination,
    isLoading,
}) {
    return (
        <div id='products'>
            <div className=' container videoLessonsProduct'>
                {isLoading && (
                    <div className={' container videoLessonsProduct'}>
                        {Array(48)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton.Image
                                    key={i}
                                    active
                                    className={'designDevelopmentSkeleton'}
                                />
                            ))}
                    </div>
                )}
                {data?.results?.length > 0 &&
                    data?.results?.map((item, index) => (
                        <div key={index}>
                            <VideoLessonsProducts product={item} />
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
