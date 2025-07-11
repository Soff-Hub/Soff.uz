'use client';
import { Skeleton } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { baseURL } from '~/repositories/api';
import { useGet } from '~/repositories/https';

export default function TopProduct () {
    const [selectValue, setSelectValue] = useState('week');

    const { data: users, isLoading } = useGet(
        "customer/top-seller-statistics",
        `customer/top-seller-statistics/`,
        {
          filter_stats: 'top_produc',
          filter_by: selectValue,
        }
      )

    return (
        <div className='BestSellerStaticsTable'>
            <div className='d-flex gap-2 align-items-center BestSellerStaticsTable_titleWrap'>
                <select
                    className='BestSellerStaticsTable_titleWrap_select'
                    onChange={e => setSelectValue(e?.target?.value)}>
                    <option value='week'>Haftaning</option>
                    <option value='month'>Oyning</option>
                </select>
                <p className='BestSellerStaticsTable_titleWrap_title'>
                    top mahsulotlari
                </p>
            </div>

            <div className='BestSellerStaticsTableCardWrap'>
                {isLoading && (
                    <>
                        {Array(5)
                            .fill(0)
                            .map((d, i) => (
                                <div key={i} className='row align-items-center ms-1'>
                                    <Skeleton.Input active={true} size={40} style={{ width: 350, height: 80 }}/>
                                </div>
                            ))}
                    </>
                )}
                {users?.map((item, index) => {
                    return (
                        <Link
                            key={item?.slug || index}
                            href='/product/[slug]'
                            as={`/product/${item?.slug}`}>
                            <div
                                className='BestSellerStaticsTableCard'>
                                <img
                                    className='BestSellerStaticsTableCard_ProductView'
                                    src={
                                        item?.poster
                                            ? item?.poster
                                            : '/static/img/user-none.jpg'
                                    }
                                    alt={item.title}
                                />
                                <div className='BestSellerStaticsTableCard_infoWrap'>
                                    <h3 className='BestSellerStaticsTableCard_fullname'>
                                        {item?.title}
                                    </h3>
                                    <p className='BestSellerStaticsTableCard_statics'>
                                        {item?.view_count} marta ko'rilgan,{' '}
                                        {item?.sold_count} marta sotilgan
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
