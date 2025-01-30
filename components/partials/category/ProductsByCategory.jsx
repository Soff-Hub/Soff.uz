import React, { useState } from 'react'
import Product from '~/components/elements/products/Product';
import { Pagination } from 'antd';
import { Skeleton } from 'antd'

export default function ProductsByCategory({ data = [], page, handlePagination, isLoading }) {

    return (
        <div id='products'>
            <div className="row">
                {
                    data && (data?.results?.map((item, index) => (
                        <div
                            className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6"
                            key={item.id}>
                            <Product product={item} />
                        </div>
                    )))
                }
                {
                    isLoading && <div className={`product-list p-loading mt-4`}>
                        {Array(15).fill(0).map((d, i) => <Skeleton.Image
                            key={i}
                            active
                            className={`skeletion-card file`}
                        />)
                        }
                    </div>
                }

            </div>
            {
                data?.count >= 40 && (
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
