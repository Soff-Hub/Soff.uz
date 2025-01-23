import React, { useState } from 'react'
import Product from '~/components/elements/products/Product';
import { Pagination } from 'antd';
import { Skeleton } from 'antd'

export default function ProductsByCategory({ data = [], page, handlePagination }) {

    return (
        <div className="container" id='products'>
            <div className="row">
                {data?.results?.length > 0 ?
                    (data?.results?.map((item, index) => (
                            <div
                                className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6"
                                key={item.id}>
                                <Product product={item} />
                            </div> 
                    ))) :
                    // <div className='row d-flex justify-content-center align-items-center py-5 mt-5'>
                    //     <h3 className='col-md-4 text-center '>Ma'lumot topilmadi!</h3>
                    // </div>

                    <div className={`product-list p-loading`}>
                    {
                        Array(15).fill(0).map((d, i) => <Skeleton.Image
                            key={i}
                            active
                            className={`skeletion-card`}
                        />)
                    }
                    </div>
                }
            </div>
            {data?.count >= 40 && (
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
            )}
        </div>
    )
}
