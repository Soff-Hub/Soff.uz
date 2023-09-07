import React, { Component } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { DatePicker, Modal, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import ModalDeletePostEdit from './ModalPostEdit';
import MediaRepository from '~/repositories/MediaRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { useSelector } from 'react-redux';
import ModalDelete from './Modal';
import Link from 'next/link';


function MyProductsLists() {
    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [search, setSerach] = useState([]);
    const [fileImg, setFileImg] = useState({});
    const [fileImgFile, setFileImgFile] = useState({});
    

    const [categoryNameEdit, setCategoryNameEdit] = useState({});
    const [tagName, setTagName] = useState(null);
    const [tagNameEdit, setTagNameEdit] = useState(null);
    const [tagItems, setTagItems] = useState([]);
    const [View, setView] = useState({});
    const [deleteIdEdit, setDeleteIdEdit] = useState({});
    const [dataValCat, setDataCat] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [date, setDate] = useState(null);
    const { RangePicker } = DatePicker;
    const dateFormat0 = date ? `${date[0]?.$y}-${`${date[0].$M + 1}`.length === 1 ? `0${date[0].$M + 1}` : date[0].$M + 1}-${date[0].$D}` : ''
    const dateFormat1 = date ? `${date[1]?.$y}-${`${date[1].$M + 1}`.length === 1 ? `0${date[1].$M + 1}` : date[1].$M + 1}-${date[1].$D}` : ''
    const dataFormat = (date ? `${dateFormat0}&end_date=${dateFormat1}` : '');
    const { accountLinks, user } = useSelector(state => state.auth)


    async function GetItemsProducts(page, category, tagName, dataFormat) {
        if (page === 1) {
            setData([])
        }
        const ItemsData = await GetRepository.getMyProducts(page, category, tagName, dataFormat, user?.access);
        if (ItemsData?.results) {
            setData((prev) => [...prev, ...ItemsData.results]);
            setSerach((prev) => [...prev, ...ItemsData.results]);
            if (ItemsData.next) {
                GetItemsProducts(page + 1, category, tagName, dataFormat)
            }
        }
    }
    async function GetItemsCategory(page) {
        if (page === 1) {
            setDataCategory([])
        }
        const ItemsData = await GetRepository.getCategory(page, user?.access);
        setDataCategory(ItemsData.results);
    }
    async function GetItemsTag() {
        const ItemsData = await MediaRepository.getTagItmes(user?.access);
        if (ItemsData?.results) {
            setTagItems(ItemsData.results);
        }
    }
    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.title.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }

 
    async function handleClickEdit(values) {
        const formData = new FormData()
        formData.append('file', fileImg)
        formData.append('poster', fileImgFile)
        formData.append('title', values.title)
        formData.append('price', values.price)
        formData.append('discount', values.discount)
        formData.append('short_description', values.short_description)
        formData.append('description', values.description)
        formData.append('category', categoryNameEdit)
        formData.append('tag', tagNameEdit)
        const patchItems = await PatchRepository.getMyProductsPatch(formData, deleteIdEdit.id, user?.access)



        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz malumotlarni o'zgartirdingiz`,
        });
        modal.update;
        GetItemsProducts(1, dataValCat, tagName, dataFormat);

    }

    const handleSelectFile = (e) => {
        setFileImg(e.target.files[0])
    };
    const handleSelectImg = (e) => {
        setFileImgFile(e.target.files[0])
    };
    async function handleClickView(item) {
        const ItemsData = await GetRepository.getMyProductsView(item.id, user?.access);
        setView(ItemsData);
    }
    async function DeleteItemsProducts() {
        const ItemsData = await PatchRepository.getMyProductsDelete(deleteId, user?.access);



        const modal = Modal.error({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz malumotlarni o'chirdingiz`,
        });
        GetItemsProducts(1, dataValCat, tagName, dataFormat)

    }

    useEffect(() => {
        GetItemsCategory(1)
        GetItemsTag()
    }, [])
    useEffect(() => {
        GetItemsProducts(1, dataValCat, tagName, dataFormat)
    }, [dataValCat, tagName, dataFormat])


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
       user?.role === "seller" ? {
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

        } : <></> ,

       user?.role ==="seller" ?   {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a data-bs-target="#staticBackdropView" data-bs-toggle="modal"><i className="fa-solid fa-eye text-success-emphasis mx-2" onClick={() => handleClickView(data.find(item => item.id === id))}></i></a>
                {
                    data.some(el => el.id == id && el.status === 'moderation') ?

                    <a data-bs-target="#exampleModalMyProductEdit" data-bs-toggle="modal"><i className="fa-solid fa-pen-to-square mx-3  text-success-emphasis" onClick={() => setDeleteIdEdit(data.find(item => item.id === id))}></i></a>
                    : 
                    <i style={{opacity:0.7 ,cursor:"not-allowed"}} className="fa-solid fa-pen-to-square mx-3  text-success-emphasis" ></i>
                }
                <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><i className="fa-solid fa-trash-can text-danger mx-2" onClick={() => setDeleteId(id)}></i></a>

            </div>
        } : <></> ,
    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className=" p-5 mb-5 rounded row gap-5 row-gap-3 mx-auto" style={{ backgroundColor: "#fff", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }}>
                    <h3 className='col-md-4'>Mening mahsulotlarim</h3>
                        <input type='search' className='form-control rounded col-md-5' placeholder="Qidiruv" onInput={handleClick} />
                      <Link href={"/account/MyProducts/Posts"}>
                      <button className="btn btn-success col-md-2 py-3 "  ><span className='fs-4'>+ Mahsulot qo'shish</span></button>
                      </Link>

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

                                   <div className='d-flex flex-column gap-2'>
                                   <span className='fs-4'><i className="text-primary-emphasis fa-solid fa-circle-info"></i> <strong>Moderatsiya</strong> <em>malumotlar ko'rib chiqilmoqda...</em></span>
                                <span className='fs-4'><i className="fa-solid text-success fa-circle-check"></i> <strong>Tasdiqlangan </strong> <em>malumotlaringiz muvaffaqqiyatli tasdiqlandi!</em></span>
                                <span className='fs-4'><i className="fa-solid fa-circle-xmark text-danger"></i> <strong>Bekor qilingan</strong> <em>malumotlaringiz bekor qilindi</em></span>
                                   </div>
                                    <div className='row mx-auto gap-4  pb-4 pt-5'>
                                        <select className='form-select rounded-3 col-md-4 fs-3 py-3' onChange={(e) => setDataCat(e.target.value)} >
                                            <option className='fs-3' value=''>Kategoriyalar</option>

                                            {
                                                dataCategory?.length > 0 && (
                                                    dataCategory?.map(item => (
                                                        <option key={item.id} value={item.id}>{item.name} </option>
                                                    ))
                                                )
                                            }
                                        </select>
                                        <select required className='form-select col-md-3 rounded-3 py-3 fs-3' onChange={(e) => setTagName(e.target.value)} >
                                            <option value="">Teglar</option>
                                            {
                                                tagItems?.length > 0 && (
                                                    tagItems.map(item => (
                                                        <option value={item.id}>{item.name}</option>
                                                    ))
                                                )
                                            }
                                        </select>
                                        <RangePicker className='col-md-4 py-3   rounded-3' onChange={(e) => setDate(e)} />
                                    </div>
                                    {
                                        user?.role === "seller" ?
                                        <Table dataSource={data} scroll={{  x: 1100 }} columns={columns} />
                                        :
                                        <Table dataSource={data} scroll={{  x: 700 }} columns={columns} />

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDeletePostEdit dataBsTarget="exampleModalMyProductEdit" onSubmited={handleClickEdit} formID={'form-edit-myproducts'}>
                    <div className='d-flex flex-column gap-3'>
                        <input type="file" onChange={handleSelectFile} className='form-control pt-4 rounded-3' defaultValue={deleteIdEdit?.file} />
                        <input type="file" onChange={handleSelectImg} className='form-control pt-4 rounded-3' defaultValue={deleteIdEdit.poster} />
                        <input type="text" className='form-control rounded-3' placeholder='Nomi' name='title' defaultValue={deleteIdEdit?.title} />
                        <select required className='form-select rounded-3 py-4 fs-4' onChange={(e) => setTagNameEdit(e.target.value)} >
                            <option value="">Barcha Teglar</option>
                            {
                                tagItems?.length > 0 && (
                                    tagItems.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))
                                )
                            }
                        </select>
                        <select required className='form-select rounded-3 py-4 fs-4' onChange={(e) => setCategoryNameEdit(e.target.value)} >
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
                        <input required type="number" className='form-control rounded-3' placeholder='Chegirma' name='discount' defaultValue={deleteIdEdit?.discount} />
                        <input required type="text" className='form-control rounded-3' placeholder='Qisqa tasvir' name='short_description' defaultValue={deleteIdEdit?.short_description} />
                        <input required type="text" className='form-control rounded-3' placeholder='Tavsifi' name='description' defaultValue={deleteIdEdit?.description} />
                    </div>
                </ModalDeletePostEdit>

                <ModalDelete onSuccess={DeleteItemsProducts}  />
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
                                            <p className="card-text"> <strong>Nomi:</strong> {View?.category?.name}</p>
                                            <p className="card-text"><strong>Narxi:</strong>  ${View?.price} </p>
                                            <p className="card-text"><strong>Chegirma: </strong> {View?.discount}%</p>
                                            <p className="card-text"><strong>Sotuvchi:</strong> {View?.title}</p>

                                            <p><strong>Teg:</strong> {View?.tag?.map(item=>(item?.name))}</p>

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
