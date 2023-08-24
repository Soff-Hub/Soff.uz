import React, { Component } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { accountLinks } from './modules/AccountLinks';
import { Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import ModalDeletePostEdit from './ModalPostEdit';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import MediaRepository from '~/repositories/MediaRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';

function MyProductsLists() {
    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [search, setSerach] = useState([]);
    const [fileImg, setFileImg] = useState({});
    const [fileImgFile, setFileImgFile] = useState({});
    const [categoryName, setCategoryName] = useState({});
    const [tagName, setTagName] = useState({});
    const [tagItems, setTagItems] = useState([]);
    const [View, setView] = useState({});
    const [deleteIdEdit, setDeleteIdEdit] = useState({});
    
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
    async function GetItemsTag() {
        const ItemsData = await MediaRepository.getTagItmes();
        setTagItems(ItemsData.results);
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
        formData.append('file', fileImg)
        formData.append('poster', fileImgFile)
        formData.append('title', values.title)
        formData.append('price', values.price)
        formData.append('short_description', values.short_description)
        formData.append('description', values.description)
        formData.append('category', categoryName)
        formData.append('tag', tagName)
        const patchItems = await PostsRepository.PostsMyProducts(formData)
        GetItemsProducts(1)
    }
    async function handleClickEdit(values) {
        const formData = new FormData()
        formData.append('file', fileImg)
        formData.append('poster', fileImgFile)
        formData.append('title', values.title)
        formData.append('price', values.price)
        formData.append('short_description', values.short_description)
        formData.append('description', values.description)
        formData.append('category', categoryName)
        formData.append('tag', tagName)
        const patchItems = await PatchRepository.getMyProductsPatch(formData ,deleteIdEdit.id )
        GetItemsProducts(1)
    }

    const handleSelectFile = (e) => {
        setFileImg(e.target.files[0])
    };
    const handleSelectImg = (e) => {
        setFileImgFile(e.target.files[0])
    };
    async function handleClickView(item) {
        const ItemsData = await GetRepository.getMyProductsView(item.id);
        setView(ItemsData);
    }

    useEffect(() => {
        GetItemsProducts(1)
        GetItemsCategory(1)
        GetItemsTag()
    }, [])

    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'poster_url',
            key: 'name',
            render: (poster_url) => (
                <div >
                    {
                        poster_url ?
                            <img className='rounded-3' src={poster_url} width={54} height={54} />
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
                <a data-bs-target="#staticBackdropView" data-bs-toggle="modal"><i className="fa-solid fa-eye text-success-emphasis" onClick={() => handleClickView(data.find(item => item.id === id))}></i></a>
                <a data-bs-target="#exampleModalMyProductEdit" data-bs-toggle="modal"><i className="fa-solid fa-pen-to-square mx-4  text-success-emphasis" onClick={() => setDeleteIdEdit(data.find(item => item.id === id))}></i></a>
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
                        <input type="file" onChange={handleSelectFile} className='form-control pt-4 rounded-3' />
                        <input type="file" onChange={handleSelectImg} className='form-control pt-4 rounded-3' />
                        <input type="text" className='form-control rounded-3' placeholder='Nomi' name='title' />
                        <select className='form-select rounded-3 py-4 fs-4' onChange={(e) => setTagName(e.target.value)} >
                            <option value="">Barcha Teglar</option>
                            {
                                tagItems?.length > 0 && (
                                    tagItems.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))
                                )
                            }
                        </select>
                        <select className='form-select rounded-3 py-4 fs-4' onChange={(e) => setCategoryName(e.target.value)} >
                            <option value="">Barcha Kategoriyalar</option>
                            {
                                dataCategory?.length > 0 && (
                                    dataCategory.map(item => (
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
                <ModalDeletePostEdit dataBsTarget="exampleModalMyProductEdit" onSubmited={handleClickEdit} formID={'form-edit-myproducts'}>
                    <div className='d-flex flex-column gap-3'>
                        <input type="file" onChange={handleSelectFile} className='form-control pt-4 rounded-3' defaultValue={deleteIdEdit?.file} />
                        <input type="file" onChange={handleSelectImg} className='form-control pt-4 rounded-3' defaultValue={deleteIdEdit.poster} />
                        <input type="text" className='form-control rounded-3' placeholder='Nomi' name='title' defaultValue={deleteIdEdit?.title} />
                        <select required className='form-select rounded-3 py-4 fs-4' onChange={(e) => setTagName(e.target.value)} >
                            <option value="">Barcha Teglar</option>
                            {
                                tagItems?.length > 0 && (
                                    tagItems.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))
                                )
                            }
                        </select>
                        <select required className='form-select rounded-3 py-4 fs-4' onChange={(e) => setCategoryName(e.target.value)} >
                            <option value="">Barcha Kategoriyalar</option>
                            {
                                dataCategory?.length > 0 && (
                                    dataCategory.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))
                                )
                            }
                        </select>
                        <input required type="number" className='form-control rounded-3' placeholder='Narxi' name='price' defaultValue={deleteIdEdit?.price} />
                        <input required type="text" className='form-control rounded-3' placeholder='Qisqa tasvir' name='short_description' defaultValue={deleteIdEdit?.short_description}  />
                        <input  required  type="text" className='form-control rounded-3' placeholder='Tavsifi' name='description' defaultValue={deleteIdEdit?.description}/>
                    </div>
                </ModalDeletePostEdit>
                <div className="modal fade " id="staticBackdropView" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div className='modal-dialog modal-dialog-centered modal-lg'>
                        <div className='modal-content'>
                            <div className='d-flex justify-content-end p-3'>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="card  " style={{ maxWidth: "840px" }}>
                                <div className="row g-0 px-3 modal-body m-0">
                                    <div className="col-md-4 mt-4 ">
                                        <img src={View?.poster_url} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body pt-5">
                                            <p className="card-text"> <strong>Nomi:</strong> {View?.title}</p>
                                            <p className="card-text"><strong>Narxi:</strong>  ${View?.price} </p>
                                            <p className="card-text"><strong>Chegirma: </strong> {View?.discount}%</p>
                                            <p className="card-text"><strong>Sotuvchi:</strong> {View?.seller?.phone}</p>
                                            <p><strong>Teg:</strong> {View?.tag?.name}</p>

                                        </div>
                                    </div>
                                    <div className='col-md-12 pt-3'>
                                        <p className="card-text"><strong>Qisqa tasvir:</strong> {View?.short_description}</p>
                                        <p className="card-text m-0"><strong>Tavsifi:</strong> {View?.description}</p>
                                        <div className='d-flex justify-content-end py-3'>
                                            <a href={View?.file} className='btn btn-outline-warning w-25 py-2  fs-5' target='_blank' download> <i className="fa-solid fa-download mx-2"></i> File yuklash</a>

                                        </div>
                                    </div>
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
