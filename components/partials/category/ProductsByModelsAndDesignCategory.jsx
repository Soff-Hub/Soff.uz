import React, { useState } from 'react'
import { Pagination } from 'antd';
import { Skeleton } from 'antd'
import ModelAndDesignProduct from '~/components/elements/products/ModelAndDesignProduct';

export default function ProductsByModelsAndDesignCategory({ data = [], page, handlePagination, isLoading }) {

    return (
        <div id='products'>
            <div className="row">
                {
                    isLoading && (
                        <div className={`product-list p-loading`}>
                            {
                                Array(15).fill(0).map((d, i) => <Skeleton.Image
                                    key={i}
                                    active
                                    className={`skeletion-card file`}
                                />)
                            }
                        </div>
                    )
                }

                {
                    (data?.results?.map((item, index) => (
                        <div
                            className="home-card col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-3 col-6"
                            key={index}>
                            <ModelAndDesignProduct product={item} />
                        </div>
                    )))
                }

            </div>
            <div className='row justify-content-center'>
                {
                    (data?.results?.length == 0) && (
                        <div
                            className="text-center col-md-6 com-12" style={{ padding: '150px 0px' }}>
                            <p className='fs-1'>😕 Bu yerda hozircha hech narsa yo‘q...</p>
                            <p className='fs-4'>Birinchilardan bo‘lib ushbu kategoriyaga mahsulot joylashtirib boshlang va o'z auditoriyangizni yig'ib daromad qilishni boshlang! 👉 <a target='_blank' className='text-primary' href="https://seller.soff.uz">seller.soff.uz</a> </p>
                        </div>
                    )
                }
            </div>
            {
                data?.count >= 48 && (
                    <div className="text-center my-4">
                        <Pagination
                            total={data?.count}
                            pageSize={48}
                            responsive={true}
                            showSizeChanger={false}
                            current={page}
                            showTotal={(total, range) =>
                                `${total} ta dan ${range[0]}-${range[1]} oralig'i `
                            }
                            onChange={(e) => handlePagination(e)}
                        />
                    </div>
                )
            }
        </div >
    )
}
