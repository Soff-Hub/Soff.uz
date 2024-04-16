import React from 'react'
import Product from '~/components/elements/products/Product';
import { Pagination } from 'antd';

export default function SellerProducts({ data = [], page, handlePagination }) {
    return (
        <div className="container" style={{ marginTop: '30px' }} id='products'>
            <div className="row">
                {data?.results?.map((item) => (
                    <div
                        className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6"
                        key={item.id}>
                        <Product product={item} />{' '}
                    </div>
                ))}
            </div>
            {data?.count >= 40 && (
                <div className="text-center my-4">
                    <Pagination
                        total={data?.count}
                        pageSize={40}
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
