import React, { Component, useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { accountLinks } from './modules/AccountLinks';
import Repository from '~/reositoriy-admin/Repository';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Badge, Table } from 'antd';
import Link from 'next/link';

function Notifications() {
    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    async function GetItems(page) {
        const ItemsData = await GetRepository.getShops(page);
        setData((prev) => [...prev, ...ItemsData.results]);
        setSerach((prev) => [...prev, ...ItemsData.results]);
        if (ItemsData.next) {
            GetItems(page + 1)
        }
    }

    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.first_name.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }

    useEffect(() => {
        GetItems(1)
    }, [])

    const columns = [
        {
            title: 'Logotip',
            dataIndex: 'image',
            key: 'name',
            render: (image) => (
                <div>
                    <img src={image} width={54} height={54} />
                </div>
            ),
        },
        {
            title: 'Ism',
            dataIndex: 'first_name',
            key: 'age',
        },
        {
            title: 'Mahsulotlar',
            dataIndex: 'total_product',
            key: 'address',
        },
        {
            title: 'Buyurtmalar',
            dataIndex: 'total_approved',
            key: 'address',
        },
        {
            title: 'Holat',
            dataIndex: 'auth_status',
            key: 'address',
            render: (status) => (
                <Badge
                    text={status}
                    color={
                        status === 'new'
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
                    <h3>Sotuvchilar</h3>
                    <input type='search' className='form-control rounded w-50' placeholder="Qidiruv" onInput={handleClick} />
                </div>
                <div className="row flex" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4 pb-5" >
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <Table dataSource={data} columns={columns}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}
export default Notifications;
