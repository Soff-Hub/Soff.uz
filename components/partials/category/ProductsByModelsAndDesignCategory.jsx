import React, { useState } from 'react';
import { Pagination } from 'antd';
import { Skeleton } from 'antd';
import ModelAndDesignProduct from '~/components/elements/products/ModelAndDesignProduct';
import Link from 'next/link';

export default function ProductsByModelsAndDesignCategory ({
    data = [],
    page,
    handlePagination,
    isLoading,
}) {
    return (
        <div id='products'>
            <div className='row   ' >
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
                        className='mt-5 card_wrapper col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 '
                        key={index}>
                        <ModelAndDesignProduct product={item} />
                    </div>
                ))}
            </div>
            
            {data?.results?.length == 0 && (
                <div className="ps-page-status">
                    <div className="container">
                        <div className="ps-section__content">
                        <img src="/static/img/noinfo.svg" alt="Ma'lumot topilmadi" />
                            <h3>😕 Bu yerda hozircha hech narsa yo‘q...</h3>
                            <p>
                                Ammo bu siz uchun ajoyib imkoniyat! Birinchilardan bo‘lib ushbu kategoriyaga mahsulot joylashtiring, o‘z auditoriyangizni yarating va daromad olishni boshlang. Imkoniyatni qo‘ldan boy bermang!
                            </p>
                            <p>
                                <Link href="https://seller.soff.uz">
                                    <a target='_blank'>Sotuvchi bo'lish</a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}

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
