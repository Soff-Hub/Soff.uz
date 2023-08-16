import React, { Component } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { accountLinks } from './modules/AccountLinks';
import { Badge, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import DeleteRepository from '~/reositoriy-admin/DeleteRepository';
import DeleteModal from './Modal';

function OrdersLists() {
    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);

    async function GetItemsUsers(page) {
        if (page === 1) {
            setData([])
        }
        const ItemsData = await GetRepository.getUsersLists(page);
        setData((prev) => [...prev, ...ItemsData.results]);
        setSerach((prev) => [...prev, ...ItemsData.results]);
        if (ItemsData.next) {
            GetItemsUsers(page + 1)
        }
    }
    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.first_name.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }
    async function handleClickDelete(id){
        const ItemsDelete = await DeleteRepository.getUsersListsDelete(id)
        GetItemsUsers(1)
        }
    useEffect(() => {
        GetItemsUsers(1)
    }, [])

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'image',
            key: 'name',
            render:(image)=>(
                <img src={image}  width={54} height={54} />
            )
        },
        {
            title: 'Ism',
            dataIndex: 'first_name',
            key: 'age',

        },
        {
            title: 'Telefon raqam',
            dataIndex: 'phone',
            key: 'address',
        },
        {
            title: 'Holat',
            dataIndex: 'auth_status',
            key: 'address',
            render: (auth_status) => (
                <Badge
                    text={auth_status}
                    color={
                        auth_status === 'new'
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
            render: (id) => <div >
                <a><i className="fa-solid fa-pen-to-square mx-4"></i></a>
                <a><i className="fa-solid fa-trash" onClick={()=>handleClickDelete(id)}></i></a>
            </div>
        },
    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="ps-section__header p-5 mb-5 rounded" style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#fff", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }}>
                    <h3>Xaridorlar</h3>
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
                {/* <DeleteModal/> */}
            </div>
        </section>
    );

}

export default OrdersLists;
