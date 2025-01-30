import React, { useState } from 'react'
import { Pagination } from 'antd';
import { Skeleton } from 'antd'
import DesignDevelopmentProducts from '~/components/elements/products/DesignDevelopmentProducts';

export default function ProductsByDesignDevelopment({ data = [], page, handlePagination, isLoading }) {

    return (
        <div id='products'>
            <div className="row">
                {
                    data && (data?.results?.map((item, index) => (
                        <div
                            className="home-card col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-3 col-6"
                            key={item.id}>
                            <DesignDevelopmentProducts product={item} />
                        </div>
                    )))
                }
                {
                    isLoading && <div className={`product-list p-loading`}>
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
