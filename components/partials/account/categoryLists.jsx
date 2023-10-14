import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Modal, Pagination, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import ModalDelete from './Modal';
import DeleteRepository from '~/reositoriy-admin/DeleteRepository';
import ModalDeletePostEdit from './ModalPostEdit';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { useSelector } from 'react-redux';

function CategoryLists() {
    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteIdEdit, setDeleteIdEdit] = useState(null);
    const [file, setFile] = useState(null);
    const [tagName, setTagName] = useState(null);
    const [tagNameIcon, setTagNameIcon] = useState(null);
    const [tagNameUser, setTagNameUsers] = useState(null);
    const [tagNameTop, setTagNameTop] = useState(null);
    const { accountLinks, user } = useSelector(state => state.auth)
    const [pageCount, setPageCount] = useState(0)
    const [currPage, setCurrPage] = useState(1)

    async function GetItemsProducts(page, search, id) {
        setCurrPage(page)
        const ItemsData = await GetRepository.getCategory(page, search, id, user?.access);
        if (ItemsData?.results) {
            setPageCount(ItemsData.count)
            setData([...ItemsData.results]);
        }
    }


    async function GetItemsProductsEdit(id) {
        const ItemsData = await GetRepository.getCategory(currPage, search, id, user?.access);
        if (ItemsData) {
            setDeleteIdEdit(ItemsData)
        }
    }

    async function getParentLists() {
        const Items = await GetRepository.getCategoryParentLists(user?.access);
        if (Items?.results) {
            setTagItems(Items?.results)
        }
    }



    async function deleteItemsId() {
        const deleteIdItems = await DeleteRepository.getCategoryDelete(deleteId, user?.access)
        const modal = Modal.error({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz  malumotlarni o'chirdingiz`,
        });
        GetItemsProducts(currPage, search, null)
    }

    async function handleItemsPost(values) {
        const formData = new FormData()
        if (file) {
            formData.append('image', file)
        }
        if (values.icon) {
            formData.append('icon', values.icon)
        }
        formData.append('name', values?.name)

        if (tagName) {
            formData.append('parent', tagName)
        }
        const postsItems = await PostsRepository.PostsCategory(formData, user?.access);
        if (postsItems?.status === 201) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz  yangi malumot qo'shdingiz`,
            });

        }
        GetItemsProducts(currPage, search, null)
    }


    async function handleItemsEdit() {

        if (tagNameUser || tagNameIcon || tagName || tagNameTop || file) {

            const formData = new FormData()
            if (file) {
                formData.append('image', file)
            }
            if (tagNameIcon) {
                formData.append('icon', tagNameIcon)
            }
            if (tagNameUser) {
                formData.append('name', tagNameUser)
            }
            if (tagName) {
                formData.append('parent', tagName)
            }
            if (tagNameTop) {
                formData.append('top', tagNameTop)
            }

            const patchItems = await PatchRepository.PatchCategory(formData, deleteIdEdit?.id, user?.access)
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Siz  malumotlarni o'zgartirdingiz ",
            });
            GetItemsProducts(currPage, search, null)
            setTagNameTop(null)
            setTagName(null)
            setFile(null)
            setTagNameIcon(null)
            setTagNameUsers(null)

        }
        else {
            const modal = Modal.info({
                centered: true,
                title: "Qayta urinib ko'ring",
                content: "O'zgartirish uchun malumot kiritilmadi ",
            });
        }


    }

    function handleClickPostsImg(e) {
        setFile(e.target.files[0])
    }
    useEffect(() => {
        getParentLists()
    }, []);

    useEffect(() => {
        GetItemsProducts(currPage, search, null)
    }, [search]);

    const columns = [
        {
            title: 'Belgi',
            dataIndex: 'icon',
            key: 'address',
            render: (icon) => (
                <i className={icon}></i>
            )
        },
        {
            title: 'Nomi',
            dataIndex: 'name',
            key: 'address',
        },
        {
            title: 'Parent',
            dataIndex: 'parent',
            key: 'address',
            render: (parent) => (
                <span>{parent?.name}</span>
            )
        },
        {
            title: 'Rasm',
            dataIndex: 'image',
            key: 'address',
            render: (poster_url) => (
                <div>
                    {
                        poster_url ?
                            <a href={poster_url} target='blank'><img src={poster_url} width={54} height={54} className='rounded-3' /></a>
                            :
                            <i className="fa-solid fa-image fa-2x"></i>
                    }
                </div>
            ),
        },
        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a data-bs-target="#exampleModalToggleEditCategory" data-bs-toggle="modal"><i className="fa-solid fa-pen-to-square mx-4 text-success-emphasis" onClick={() => GetItemsProductsEdit(id)}></i></a>
                {

                    data.some(el => el.id == id && el.is_delete === true) ?
                        <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><i className="fa-solid fa-trash-can text-danger mx-3" onClick={() => setDeleteId(id)}></i></a>
                        :
                        <></>

                }
            </div>
        },
    ];
    return (
        <section className="ps-my-account ps-page--account p-0">
            <div className="container">
                <div className="row " style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div>
                                    <div className='row row-gap-3 bg-white m-0 gap-5 px-4 mb-3 pb-4 rounded'>
                                        <h5 className='bg-white m-0 px-4 pt-4 rounded text-danger '> <i className="fa-solid fa-square-check text-primary"></i> Top qilish uchun maxsimal oltita element tanlashingiz lozim!</h5>
                                        <input type='search' className='form-control rounded col-md-8 ' placeholder="Qidiruv" onInput={e => setSerach(e.target.value)} />
                                        <button className="btn btn-success col-md-3 py-3 " data-bs-target="#addcategory" data-bs-toggle="modal" ><span className='fs-4'> <i className="fa-solid fa-plus"></i> Kategoriya qo'shish</span></button>
                                    </div>
                                    <Table scroll={{ x: 750 }} dataSource={data} columns={columns} pagination={false}
                                    />
                                    <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount}
                                        onChange={page => GetItemsProducts(page, search)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalDelete onSuccess={deleteItemsId} />
                <ModalDeletePostEdit dataBsTarget="exampleModalToggleEditCategory" onSubmited={handleItemsEdit} formID={'edit-form-category'}>
                    <label htmlFor="file" className='w-100 text-truncate' style={{ border: "1px solid #dddddd", boxShadow: "0 0 0 #000", borderRadius: "5px", padding: "13px 12px", cursor: "pointer" }}>
                        {
                            deleteIdEdit?.image ? deleteIdEdit?.image :
                                <span>Rasm tanlash uchun bosing <i className="fa-regular fa-hand-pointer"></i></span>
                        }
                        <input type="file" name='file' id='file' style={{ display: "none" }} className='form-control pt-4 rounded-3 fileUpload' onChange={handleClickPostsImg} accept="image/*" />
                    </label>
                    <a className='text-primary m-0' href={deleteIdEdit?.image} target="_blank" rel="noopener noreferrer">Link (rasm)</a>
                    {
                        data.some(el => (el?.id == deleteIdEdit?.id && el.is_update === true)) ?
                            <select className='form-select  rounded-3 py-3 fs-3' onChange={(e) => setTagName(e.target.value)} >
                                <option value="">Parent</option>
                                {
                                    tagItems?.length > 0 && (
                                        tagItems?.map(item => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))
                                    )
                                }
                            </select>
                            :
                            <></>
                    }
                    {
                        data.some(el => (el?.id == deleteIdEdit?.id && el.is_parent === true)) ?
                            <select className='form-select  rounded-3 py-3 fs-3' onChange={(e) => setTagNameTop(e.target.value)} >
                                {
                                    data.some(el => (el?.id == deleteIdEdit?.id && el.top === true)) ?
                                        <>
                                            <option selected value={"true"} >Top </option>
                                            <option value={"false"} >Top emas</option>
                                        </>
                                        :
                                        <>
                                            <option selected value={"false"} >Top emas</option>
                                            <option value={"true"} >Top </option>
                                        </>
                                }

                            </select>
                            :
                            <></>
                    }
                    <input
                        type='text'
                        placeholder="Belgi"
                        className="form-control rounded-3"
                        name='icon'
                        defaultValue={deleteIdEdit?.icon}
                        onChange={(e) => setTagNameIcon(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder="Nomi"
                        className="form-control rounded-3"
                        name='name'
                        defaultValue={deleteIdEdit?.name}
                        onChange={(e) => setTagNameUsers(e.target.value)}
                    />
                </ModalDeletePostEdit >
                <ModalDeletePostEdit dataBsTarget="addcategory" onSubmited={handleItemsPost} formID={'post-form-category'}>
                    <label htmlFor="file" className='w-100 ' style={{ border: "1px solid #dddddd", boxShadow: "0 0 0 #000", borderRadius: "5px", padding: "13px 12px", cursor: "pointer" }}>
                        {
                            file ? "soff.uz//b30b856b-606c-4001-8bee-4839557c" :
                                <span>Rasm tanlash uchun bosing <i className="fa-regular fa-hand-pointer"></i></span>
                        }
                        <input type="file" name='file' id='file' style={{ display: "none" }} className='form-control pt-4 rounded-3 fileUpload' onChange={handleClickPostsImg} />
                    </label>
                    {
                        file ?
                            <a className='text-primary m-0' href={deleteIdEdit?.image} target="_blank" rel="noopener noreferrer">Link (rasm)</a>
                            :
                            <></>
                    }

                    <select className='form-select  rounded-3 py-3 fs-3' onChange={(e) => setTagName(e.target.value)} >
                        <option value="">Parent</option>
                        {
                            tagItems?.length > 0 && (
                                tagItems?.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            )
                        }
                    </select>
                    <input
                        type='text'
                        placeholder="Belgi"
                        className="form-control rounded-3"
                        name='icon'
                    />
                    <input
                        type='text'
                        placeholder="Nomi"
                        className="form-control rounded-3"
                        name='name'
                    />
                </ModalDeletePostEdit>
            </div>
        </section>
    );

}

export default CategoryLists;
