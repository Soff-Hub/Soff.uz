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
            <div className='container modelAndDesignProduct'>
                {isLoading && (
                    <>
                        {Array(48)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton.Image
                                    key={i}
                                    active
                                    style={{}}
                                    className='ModelAndDesignProduct_skeletion_card'
                                />
                            ))}
                    </>
                )}

                {data?.results?.map((item, index) => (
                    <div key={index}>
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
