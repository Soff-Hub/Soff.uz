import React, { useState, useEffect } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { accountLinks } from './modules/AccountLinks';
import { Column } from '@ant-design/plots';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Table } from 'antd';

function DashbordList() {
    const [data, setData] = useState([]);
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
    useEffect(() => {
        GetItemsProducts()
        GetItemsProductsPopular(1)
    }, [])
    const columns = [
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'age',
        },
        {
            title: 'Sotuvchi ismi',
            dataIndex: 'seller',
            key: 'address',
            render: (seller) => (
                <span>{seller?.first_name}</span>
            ),
        },
        {
            title: 'Buyurtmalar ',
            dataIndex: 'seller',
            key: 'address',
            render: (seller) => (
                <span>{seller?.total_approved}</span>
            ),
        },
        {
            title: 'Narx/birlik',
            dataIndex: 'price',
            key: 'age',
        },
        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: () => <div >
                <a><i className="fa-solid fa-pen-to-square mx-4"></i></a>
                <a><i className="fa-solid fa-trash"></i></a>
            </div>
        },
    ];
    const DemoColumn = () => {
        const data = [
            {
                type: 'Yanvar',
                sales: 20,
            },
            {
                type: 'Fevral',
                sales: 32,
            },
            {
                type: 'Mart',
                sales: 41,
            },
            {
                type: 'Aprel',
                sales: 51,
            },
            {
                type: 'May',
                sales: 61,
            },
            {
                type: 'Iyun',
                sales: 71,
            },
            {
                type: 'Iyul',
                sales: 80,
            },
            {
                type: 'Avgust',
                sales: 71,
            },
            {
                type: 'Sentabr',
                sales: 61,
            },
            {
                type: 'Okatbr',
                sales: 51,
            },
            {
                type: 'Noyabr',
                sales: 41,
            },
            {
                type: 'Dekabr',
                sales: 32,
            },
        ];
        const config = {
            data,
            xField: 'type',
            yField: 'sales',
            label: {
                position: 'middle',
                // 'top', 'bottom', 'middle',
                style: {
                    fill: '#FFFFFF',
                    opacity: 0.6,
                },
            },
            xAxis: {
                label: {
                    autoHide: true,
                    autoRotate: false,
                },
            },
            meta: {
                type: {
                    alias: 'Foyda',
                },
                sales: {
                    alias: 'Foyda',
                },
            },
        };
        return <Column {...config} />
    };
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
                        <h4 className='mt-5 pt-3'>${data?.total_revenue}</h4>
                    </div>
                    <div className='card   py-5 px-4 ' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h4>Jami buyurtma</h4>
                                <span>(Oxirgi 30 kun)</span>
                            </div>
                            <div><i className="fa-solid fa-truck fa-2x text-danger"></i></div>
                        </div>
                        <h4 className='mt-5 pt-3'>${data?.total_order}</h4>
                    </div>
                    <div className='card   py-5 px-4 ' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h4>Bugungi daromad</h4>
                                <span>(Oxirgi 30 kun)</span>
                            </div>
                            <div><i className="fa-solid fa-sack-dollar fa-2x text-warning"></i></div>
                        </div>
                        <h4 className='mt-5 pt-3'>${data?.today_revenue}</h4>
                    </div>
                    <div className='card   py-5 px-4 ' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h4>Jami do'konlar</h4>
                                <span>(Oxirgi 30 kun)</span>
                            </div>
                            <div><i className="fa-solid fa-shop fa-2x text-primary"></i></div>
                        </div>
                        <h4 className='mt-5 pt-3'>${data?.all_revenue}</h4>
                    </div>
                </div>
                <div className="row " style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4 pb-5">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <DemoColumn />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Table dataSource={dataProducts} columns={columns} />
            </div>
        </section>
    );

}

export default DashbordList;
