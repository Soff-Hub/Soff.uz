import React, { Component } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { accountLinks } from './modules/AccountLinks';
import { Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import ModalDeletePostEdit from './ModalPostEdit';
import PostsRepository from '~/reositoriy-admin/PostsRepository';

function MyProductsLists(){
    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [search, setSerach] = useState([]);
    const [fileImg, setFileImg] = useState({});
    const [categoryName, setCategoryName] = useState([]);

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
    async function GetItemsCategory(page) {
        if (page === 1) {
            setDataCategory([])
        }
        const ItemsData = await GetRepository.getCategory(page);
        setDataCategory(ItemsData.results);
     
    }

    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.title.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }
 
    async function handleClickPosts(values) {
        const formData = new FormData()
        formData.append('poster_url', fileImg)
        formData.append('title', values.title)
        formData.append('price', values.price)
        formData.append('tag', values.tag)
        formData.append('short_description', values.short_description)
        formData.append('description', values.description)
        formData.append('category', categoryName)
        const patchItems = await  PostsRepository.PostsMyProducts(formData)
        GetItemsProducts(1)
    }

    const handleSelectFileFile = (e) => {
        setFileImg(e.target.files[0])
    };

    useEffect(() => {
        GetItemsProducts(1)
        GetItemsCategory(1)
    }, [])

    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'poster_url',
            key: 'name',
            render: (poster_url) => (
                <div>
                    {
                        poster_url ?
                            <img src={poster_url} width={54} height={54} />
                            :
                            <i className="fa-solid fa-image fa-2x"></i>
                    }
                </div>
            ),
        },
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'age',
            render: (title) => (
                <span className="truncate whitespace-nowrap"> {title}</span>

            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'address',
            render: (category) => (
                <span> <i className=" text-primary-emphasis fa-solid fa-layer-group"></i> {category?.name}</span>
            )
        },
        {
            title: 'Narxi',
            dataIndex: 'price',
            key: 'address',
            render: (price) => (
                <span><i className="fa-solid fa-coins text-warning"></i> {price}</span>
            ),
        },
        {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status) => (
                status === "moderation" ?
                    (<span><i className="text-primary-emphasis fa-solid fa-circle-info"></i> Moderatsiya</span>) :
                    status === 'approved' ?
                        (<span><i className="fa-solid text-success fa-circle-check"></i> Tasdiqlangan</span>) :
                        status === 'cancelled' ?
                            (<span><i className="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan</span>) :
                            <></>
            ),

        },

        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a data-bs-target="#staticBackdrop" data-bs-toggle="modal"><i className="fa-solid fa-eye text-success-emphasis" onClick={() => handleClickView(data.find(item => item.id === id))}></i></a>
                <a data-bs-target="#exampleModalToggleEditProducts" data-bs-toggle="modal"><i className="fa-solid fa-pen-to-square mx-4  text-success-emphasis" onClick={() => setDeleteIdEditProducts(data.find(item => item.id === id))}></i></a>
            </div>
        },
    ];
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                <div className=" p-5 mb-5 rounded d-flex justify-content-between" style={{ backgroundColor: "#fff", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }}>
                    <h3 className='w-75'>Mening mahsulotlarim</h3>
                    <div className='d-flex gap-5 w-50 flex-wrap'>
                    <input type='search' className='form-control rounded w-50' placeholder="Qidiruv" onInput={handleClick} />
                   <button className="btn btn-success" data-bs-target="#exampleModalMyProductsPosts" data-bs-toggle="modal"><span className='fs-4'>+ Mahsulot qo'shish</span></button>
                    </div>
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
                                 <Table dataSource={data} scroll={{ x: 1100 }} columns={columns} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalDeletePostEdit dataBsTarget="exampleModalMyProductsPosts" onSubmited={handleClickPosts} formID={'form-posts-myproducts'}>
                    <div className='d-flex flex-column gap-3'>
                    <input type="file" onChange={handleSelectFileFile}  className='form-control pt-4 rounded-3'  />
                    <input type="text" className='form-control rounded-3' placeholder='Nomi' name='title' />
                    <input type="number" className='form-control rounded-3' placeholder='Teg' name='tag' />
                    <select  className='form-select rounded-3 py-4 fs-4' onChange={(e)=>setCategoryName(e.target.value)} >
                        <option value="">Barcha Kategoriyalar</option>
                        {
                            dataCategory?.length>0 && (
                                dataCategory.map(item=>(
                                    <option value={item.id}>{item.name}</option>
                                ))
                            )
                        }
                    </select>
                    <input type="number" className='form-control rounded-3' placeholder='Narxi' name='price' />
                    <input type="text" className='form-control rounded-3' placeholder='Qisqa tasvir' name='short_description' />
                    <input type="text" className='form-control rounded-3' placeholder='Tavsifi' name='description' />
                    </div>
                    </ModalDeletePostEdit>
                </div>
            </section>
        );
    
}

export default MyProductsLists;
