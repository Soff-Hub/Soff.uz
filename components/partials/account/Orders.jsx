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

    async function GetItemsProducts(page, status, date) {
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
            item?.user?.first_name.toLowerCase().includes(text.toLowerCase()) 

        ))
        setData(filterSearch)
    }
    useEffect(() => {

        GetItemsProducts(1, selector , dataFormat)
    }, [1, selector, dataFormat])

    
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'name',
        },
        {
            title: 'Buyurtmachi',
            dataIndex: 'user',
            key: 'age',
            render: (user) => (
                <span className="truncate whitespace-nowrap"> {user?.first_name}</span>
            ),
        },
        {
            title: 'Telefon raqam',
            dataIndex: 'user',
            key: 'age',
            render: (user) => (
                <span className="truncate whitespace-nowrap"> {user?.phone}</span>
            ),
        },
        {
            title: 'Narx',
            dataIndex: 'total_price',
            key: 'address',
            render: (total_price) => (
                <span><i className="fa-solid fa-coins text-warning"></i> {total_price}</span>
            ),
        },
        {
            title: 'Buyurtma sanasi',
            dataIndex: 'created_at',
            key: 'address',
            render: (created_at) => <span> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        },
        {
            title: 'Buyurtma kategoriya',
            dataIndex: 'title',
            key: 'address',
            render:(title)=>(
                <select className='form-select border-0 fs-4'>
                {
                    title.map(item=>(
                        <option>{item} </option>
                    ))
                }
                </select>
            )
        },
        {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status) => (

                status==='approved'? (<span><i className="fa-solid text-success fa-circle-check"></i> tasdiqlangan</span>) :
                status === "cancelled" ?
                 (<span><i class="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan</span>) :
                 status === "pending" ?
                 (<span><i className="text-primary-emphasis fa-solid fa-circle-info"></i> Moderatsiya</span>) :
                   <></>
            ),

        },
    ];
    const columnSellers = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Buyurtmachi',
            dataIndex: 'user',
            key: 'user',
            render:(user)=>(
                <span>{user.first_name}</span>
            )
        },
        {
            title: 'Buyurtma kategoriya',
            dataIndex: 'title',
            key: 'title',
            render:(title)=>(
                <select className='form-select border-0 fs-4'>
                {
                    title.map(item=>(
                        <option>{item} </option>
                    ))
                }
                </select>
            )

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
                 (<span><i class="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan</span>) :
                 status === "pending" ?
                 (<span><i className="text-primary-emphasis fa-solid fa-circle-info"></i> Moderatsiya</span>) :
                   <></>
            ),

        },
    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="ps-section__header p-5 mb-5 rounded" style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#fff", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }}>
                    <h3>Buyurtmalar</h3>
                    <input type='search' className='form-control rounded w-50' placeholder="Qidiruv" onInput={handleClick} />
                </div>
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
                                   <div className='py-4 d-flex gap-4 pb-5 flex-start' >
                                   <select className='form-select fs-3 py-3 rounded-3 w-50' onChange={(e)=>setSelector(e.target.value)}  >
                                            <option className='fs-3' selected value="">Barcha holatlar</option>
                                            <option className='fs-3' value="pending">Moderatsiya</option>
                                            <option className='fs-3' value="approved">Tasdiqlangan</option>
                                            <option className='fs-3' value="cancelled">Bekor qilingan</option>
                                        </select>

                                   <RangePicker className='w-50   rounded-3' onChange={(e)=>setDate(e)} />
                                   </div>
                                   {
                                    user?.role==="admin" ?
                                    <Table scroll={{ x:1100 }}  dataSource={ data} columns={columns} />
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
