import React, { Component } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { accountLinks } from './modules/AccountLinks';
import { Badge, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';

function MyProductsLists(){
    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);

    async function GetItemsProducts(page) {
        if (page === 1) {
            setData([])
        }
        const ItemsData = await GetRepository.getMyProducts(page);
        setData((prev) => [...prev, ...ItemsData.results]);
        setSerach((prev) => [...prev, ...ItemsData.results]);
        if (ItemsData.next) {
            GetItemsProducts(page + 1)
        }
    }
    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.title.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }
    useEffect(() => {
        GetItemsProducts(1)
    }, [])

    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'poster',
            key: 'name',
            render: (poster) => (
                <div>
                <img src={poster}  width={54} height={54}/>
                </div>
              ),
        },
        {
            title: 'Ism',
            dataIndex: 'title',
            key: 'age',
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'address',
            render:(category)=>(
               <span>{category?.name}</span>
            )
        },
        {
            title: 'Narx/birlik',
            dataIndex: 'price',
            key: 'address',
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
                    <h3>Mening mahsulotlarim</h3>
                    <input type='search' className='form-control rounded w-50' placeholder="Qidiruv" onInput={handleClick} />
                </div>
                    <div className="row ">
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

export default MyProductsLists;
