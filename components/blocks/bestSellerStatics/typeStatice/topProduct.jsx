'use client';
import React, { useEffect, useState } from 'react';

export default function TopProduct () {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState(null);
    const [selectValue, setSelectValue] = useState('week');
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(
                    `http://176.96.241.219:8006/api/v1/customer/top-seller-statistics/?filter_stats=top_produc&filter_by=${selectValue}`
                );
                const text = await res.text();
                console.log('Raw response:', text);
                const data = JSON.parse(text);
                setUsers(data);
            } catch (err) {
                console.error('Error fetching seller:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [selectValue]);

    function handleChange (e) {
        setSelectValue(e.target.value);
    }

    return (
        <div className='BestSellerStaticsTable'>
            <div className='d-flex gap-2 align-items-center BestSellerStaticsTable_titleWrap'>
                <select
                    className='BestSellerStaticsTable_titleWrap_select'
                    name=''
                    id=''
                    onChange={handleChange}>
                    <option value='week'>Haftalik</option>
                    <option value='month'>Oylik</option>
                </select>
                <h2 className='BestSellerStaticsTable_titleWrap_title'>
                    top mahsulotlari
                </h2>
            </div>

            <div className='BestSellerStaticsTableCardWrap'>
                {users?.map((item, index) => {
                    return (
                        <div
                            key={(item?.id, index)}
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
                                    {item?.title}
                                </h3>
                                <p className='BestSellerStaticsTableCard_statics'>
                                    {item?.view_count} marta ko'rilgan, {item?.sold_count} marta sotilgan
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* <div className='BestSellerStaticsTableCard'>
                <img
                    className='BestSellerStaticsTableCard_Avatar'
                    src='/static/img/user-none.jpg'
                    alt=''
                />
                <div className='BestSellerStaticsTableCard_infoWrap'>
                    <h3 className='BestSellerStaticsTableCard_fullname'>
                        Jhon dou
                    </h3>
                    <p className='BestSellerStaticsTableCard_statics'>
                        Jami 2 ta mahsulot yuklangan
                    </p>
                </div>
            </div> */}
        </div>
    );
}
