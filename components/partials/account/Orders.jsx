import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';

import {  DatePicker, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import CalculateTimeDifference from './DateFormatter';
import { useSelector } from 'react-redux';


function OrdersLists() {
    const { accountLinks, user } = useSelector(state => state.auth);


    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [date, setDate] = useState(null);
    const [selector, setSelector] = useState(null);

    const { RangePicker } = DatePicker;
    const dateFormat0 = date ? `${date[0]?.$y}-${`${date[0].$M + 1}`.length === 1 ? `0${date[0].$M + 1}` : date[0].$M + 1}-${date[0].$D}` : ''
    const dateFormat1 = date ? `${date[1]?.$y}-${`${date[1].$M + 1}`.length === 1 ? `0${date[1].$M + 1}` : date[1].$M + 1}-${date[1].$D}` : ''
    const dataFormat = (date ? `${dateFormat0}&end_date=${dateFormat1}` : '');

    async function GetItemsProducts(page,  status, date) {
        if (page === 1) {
            setData([])
        }
        const ItemsData = await GetRepository.getOrdersLists(page, status, date, user?.access);
       if (ItemsData?.results) {
        setData((prev) => [...prev, ...ItemsData.results]);
        setSerach((prev) => [...prev, ...ItemsData.results]);
        if (ItemsData.next) {
            GetItemsProducts(page + 1, status, date)
        }
    }



    }
    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item?.user_name.toLowerCase().includes(text.toLowerCase()) ||
            item?.title.toLowerCase().includes(text.toLowerCase()) 


        ))
        setData(filterSearch)
    }
    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }
    useEffect(() => {

        GetItemsProducts(1, selector , dataFormat)
    }, [1, selector, dataFormat])

    const columns = [
        {
            title: 'Buyurtmachi',
            dataIndex: 'user_name',
            key: 'age',
            render: (user_name) => (
                <span className="truncate whitespace-nowrap"> {user_name}</span>
            ),
        },
        {
            title: 'Telefon raqam yoki email',
            dataIndex: 'data',
            key: 'age',
            width:300,
            render: (data) => (
                <div className='d-flex flex-column'>
                    {
                        data.phone==="None" ?
                        <></> :
                        <span className="truncate whitespace-nowrap"> {data.phone}</span>
                    }
                    {
                          data.email==="None" ?
                          <></> :
                    <span className="truncate whitespace-nowrap"> {data.email}</span>
                    }

                </div>

            ),
        },
        {
            title: 'Narx',
            dataIndex: 'price',
            key: 'address',
            render: (price) => (
                <span><i className="fa-solid fa-coins text-warning"></i> {addPeriodToThousands(price)}</span>
            ),
        },
        {
            title: 'Buyurtma sanasi',
            dataIndex: 'created_at',
            key: 'address',
            render: (created_at) => <span> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        },
        {
            title: 'Buyurtma nomi',
            dataIndex: 'title',
            key: 'address',
            width:350,
        },
        {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status) => (

                status==='approved'? (<span><i className="fa-solid text-success fa-circle-check"></i> tasdiqlangan</span>) :
                status === "cancelled" ?
                 (<span><i className="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan</span>) :
                 status === "pending" ?
                 (<span><i className="text-primary-emphasis fa-solid fa-circle-info"></i> Moderatsiya</span>) :
                   <></>
            ),

        },
    ];
    const columnSellers = [
        {
            title: 'Buyurtmachi',
            dataIndex: 'user_name',
            key: 'user',
        },
        {
            title: 'Buyurtma kategoriya',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Buyurtma sanasi',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        },

        {
            title: 'Holat',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (

                status==='approved'? (<span><i className="fa-solid text-success fa-circle-check"></i> tasdiqlangan</span>) :
                status === "cancelled" ?
                 (<span><i className="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan</span>) :
                 status === "pending" ?
                 (<span><i className="text-primary-emphasis fa-solid fa-circle-info"></i> Moderatsiya</span>) :
                   <></>
            ),

        },
    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row pb-5 " style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4 pb-5">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className='ps-section__content'>

                                <div className='d-flex flex-column gap-2'>
                                   <span className='fs-4'><i className="text-primary-emphasis fa-solid fa-circle-info"></i> <strong>Moderatsiya</strong> <em>malumotlar ko'rib chiqilmoqda...</em></span>
                                <span className='fs-4'><i className="fa-solid text-success fa-circle-check"></i> <strong>Tasdiqlangan </strong> <em>malumotlaringiz muvaffaqqiyatli tasdiqlandi!</em></span>
                                <span className='fs-4'><i className="fa-solid fa-circle-xmark text-danger"></i> <strong>Bekor qilingan</strong> <em>malumotlaringiz bekor qilindi</em></span>
                                   </div>
                                   <div className='py-4 row gap-5 mx-auto row-gap-3 pb-5' >
                                   <select className='form-select fs-3 py-3 rounded-3 col-md-6' onChange={(e)=>setSelector(e.target.value)}  >

                                            <option className='fs-3' selected value="">Barcha holatlar</option>
                                            <option className='fs-3' value="pending">Moderatsiya</option>
                                            <option className='fs-3' value="approved">Tasdiqlangan</option>
                                            <option className='fs-3' value="cancelled">Bekor qilingan</option>
                                        </select>

                                   <RangePicker className='col-md-5 rounded-3 py-3' onChange={(e)=>setDate(e)} />
                                   <input type='search' className='form-control rounded col-md-12 ' placeholder="Qidiruv" onInput={handleClick} />
                                   </div>
                                   {
                                    user?.role==="admin" ?
                                    <Table scroll={{ x:1350 }}  dataSource={ data} columns={columns} />
                                    :
                                    <Table scroll={{ x:850 }}  dataSource={data} columns={columnSellers} />

                                   }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default OrdersLists;
