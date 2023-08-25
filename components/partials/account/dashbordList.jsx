import React, { useState, useEffect } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { accountLinks } from './modules/AccountLinks';
import GetRepository from '~/reositoriy-admin/GetRepository';
import {  Table } from 'antd';
// import dynamic from 'next/dynamic';
import CalculateTimeDifference from './DateFormatter';
import Example from './Chart';


function DashbordList() {
    const [data, setData] = useState([]);
    const [dataOrders, setDataOrders] = useState([]);
    const [dataProducts, setDataProducts] = useState([]);
    async function GetItemsProducts() {
        const ItemsData = await GetRepository.getSellerDashbord();
        setData(ItemsData);
    }
    async function GetItemsProductsPopular(page) {
        if (page === 1) {
            setDataProducts([])
        }
        const ItemsData = await GetRepository.getPopularProducts(page);
        setDataProducts((prev) => [...prev, ...ItemsData.results]);
        if (ItemsData.next) {
            GetItemsProductsPopular(page + 1)
        }
    }

    async function GetItemsProductsOrders(page) {
        if (page === 1) {
            setDataOrders([])
        }
        const ItemsData = await GetRepository.getOrdersLists(page);
        setDataOrders((prev) => [...prev, ...ItemsData.results]);
        if (ItemsData.next) {
            GetItemsProducts(page + 1)
        }
    }
    useEffect(() => {
        GetItemsProducts()
        GetItemsProductsOrders(1)
        GetItemsProductsPopular(1)
    }, [])

    const columns = [
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'age',
        },
        {
            title: 'Sotuvchi',
            dataIndex: 'seller',
            key: 'address',
            render: (seller) => (
                <span><i className="fa-solid fa-child-reaching text-primary-emphasis"></i> {seller?.first_name}</span>
            ),
        },
        {
            title: 'Buyurtmalar ',
            dataIndex: 'seller',
            key: 'address',
            render: (seller) => (
                <span> <i className="fa-solid fa-box"></i> {seller?.total_approved}</span>
            ),
        },
        {
            title: 'Narx',
            dataIndex: 'price',
            key: 'age',
            render: (price) => (
                <span><i className="fa-solid fa-coins text-warning"></i> {price}</span>
            ),
        },
    ];
    const columnsOrders = [
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
                <span className="truncate whitespace-nowrap"><i className=" text-primary-emphasis fa-solid fa-user-tie"></i> {user?.first_name}</span>
            ),
        },
        {
            title: 'Telefon raqam',
            dataIndex: 'user',
            key: 'age',
            render: (user) => (
                <span className="truncate whitespace-nowrap"><i className=" text-primary-emphasis fa-solid fa-user-tie"></i> {user?.phone}</span>
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
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status) => (
                <span>{status==='approved'? (<span><i className="fa-solid text-success fa-circle-check"></i> tasdiqlangan</span>)  : (<span><i class="fa-solid fa-circle-xmark text-danger"></i> tasdiqlanganmagan</span>)}</span>
            ),

        },
    ];
    // const DynamicComponentWithNoSSR = dynamic(
    //     () => import('./Chart'),
    //     { ssr: false }
    //   )
    
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className='pb-5 d-flex justify-content-between '>
                    <div className='card   py-5 px-4' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h4>Jami daromad</h4>
                                <span>(Oxirgi 30 kun)</span>
                            </div>
                            <div><i className="fa-solid fa-hand-holding-dollar fa-2x text-success"></i></div>
                        </div>
                        <h4 className='mt-5 pt-3'>{data?.total_revenue}</h4>
                    </div>
                    <div className='card   py-5 px-4 ' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h4>Jami buyurtma</h4>
                                <span>(Oxirgi 30 kun)</span>
                            </div>
                            <div><i className="fa-solid fa-truck fa-2x text-danger"></i></div>
                        </div>
                        <h4 className='mt-5 pt-3'>{data?.total_order}</h4>
                    </div>
                    <div className='card   py-5 px-4 ' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h4>Bugungi daromad</h4>
                                <span>(Oxirgi 30 kun)</span>
                            </div>
                            <div><i className="fa-solid fa-sack-dollar fa-2x text-warning"></i></div>
                        </div>
                        <h4 className='mt-5 pt-3'>{data?.today_revenue}</h4>
                    </div>
                    <div className='card   py-5 px-4 ' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h4>Jami do'konlar</h4>
                                <span>(Oxirgi 30 kun)</span>
                            </div>
                            <div><i className="fa-solid fa-shop fa-2x text-primary"></i></div>
                        </div>
                        <h4 className='mt-5 pt-3'>{data?.all_revenue}</h4>
                    </div>
                </div>
                <div className="row pb-5" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4 pb-5">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <Example/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className='bg-white m-0 text-center py-4'>Ommabop mahsulotlar</h4>
                <Table scroll={{ x:850 }}  dataSource={dataProducts} columns={columns} className='pb-5' />
                </div>
              <div>
              <h4 className='bg-white m-0 text-center py-4'>So'nggi buyurtmalar</h4>
              <Table scroll={{ x:850 }}  dataSource={dataOrders} columns={columnsOrders} />
              </div>
            </div>
        </section>
    );

}

export default DashbordList;
