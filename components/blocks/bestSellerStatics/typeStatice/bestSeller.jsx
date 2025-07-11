'use client';
import { Skeleton } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import { baseURL } from '~/repositories/api';
import { useGet } from '~/repositories/https';

export default function BestSellers () {
    const [selectValue, setSelectValue] = useState('week');

    const { data: users, isLoading } = useGet(
        "customer/top-seller-statistics",
        `customer/top-seller-statistics/`,
        {
          filter_stats: 'best_seller',
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
                    bestseller mualliflari
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
                            key={index || item?.id}
                            href='/seller/[pid]'
                            as={`/seller/${item?.id}`}>
                            <div
                                className='BestSellerStaticsTableCard'>
                                <img
                                    className='BestSellerStaticsTableCard_Avatar'
                                    src={
                                        item?.image
                                            ? item?.image
                                            : '/static/img/user-none.jpg'
                                    }
                                    alt='User image'
                                />
                                <div className='BestSellerStaticsTableCard_infoWrap'>
                                    <h3 className='BestSellerStaticsTableCard_fullname'>
                                        {item?.first_name} {item?.last_name}
                                    </h3>
                                    <p className='BestSellerStaticsTableCard_statics'>
                                        Jami {item?.order_count} ta sotuv {addPeriodToThousands(item?.total_amount)} so’m
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
