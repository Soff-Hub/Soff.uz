import React, { Component } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { accountLinks } from './modules/AccountLinks';
import { Badge, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import CalculateTimeDifference from './DateFormatter';

function OrdersLists() {
    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);

    async function GetItemsProducts(page) {
        if (page === 1) {
            setData([])
        }
        const ItemsData = await GetRepository.getOrdersLists(page);
        setData((prev) => [...prev, ...ItemsData.results]);
        setSerach((prev) => [...prev, ...ItemsData.results]);
        if (ItemsData.next) {
            GetItemsProducts(page + 1)
        }
    }
    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.user?.first_name.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }
    useEffect(() => {
        GetItemsProducts(1)
    }, [])

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
                <span className="truncate whitespace-nowrap">{user?.first_name}</span>
            ),
        },
        {
            title: 'Jami',
            dataIndex: 'total_price',
            key: 'address',
        },
        {
            title: 'Buyurtma sanasi',
            dataIndex: 'created_at',
            key: 'address',
            render: (created_at) => <CalculateTimeDifference targetDate={created_at} />
        },
        {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status) => (
                <Badge
                    text={status}
                    color={
                        status === 'approved'
                            ? 'green'
                            : 'red'
                    }
                />
            ),

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
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="ps-section__header p-5 mb-5 rounded" style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#fff", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }}>
                    <h3>Buyurtmalar</h3>
                    <input type='search' className='form-control rounded w-50' placeholder="Qidiruv" onInput={handleClick} />
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
                                    <Table dataSource={data} columns={columns} />
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
