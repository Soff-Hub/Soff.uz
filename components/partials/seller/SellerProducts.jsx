import React from 'react'
import Product from '~/components/elements/products/Product';
import { Pagination } from 'antd';
import ProductVideo from '~/components/elements/products/ProductVideo';
import AudioWaveform from '~/components/elements/products/AudioProductCart';

export default function SellerProducts({ data = [], page, handlePagination }) {

    console.log(data?.results?.length > 0);

    return (
        <div className="container" id='products'>
            <div className="row">
                {data?.results?.length > 0 ?
               ( data?.results?.map((item) => (
                    item?.document?.content_type === 'file' || item?.document?.content_type === 'template' ?
                        <div
                            className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6"
                            key={item.id}>
                            <Product product={item} />{' '}
                        </div> :
                        item?.document?.content_type === 'video' ?
                            <div className='col-md-4 my-3'>
                                <ProductVideo product={item} />

                            </div>
                            : item?.document?.content_type === 'audio' ?
                                <div className='col-md-12 my-3'>
                                    <AudioWaveform product={item} />
                                </div> :
                                <></>
                )))  :
                <div className='row d-flex justify-content-center align-items-center py-5 mt-5'>
                    <h3 className='col-md-4 text-center '>Ma'lumot topilmadi!</h3>
                </div>
                }
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
