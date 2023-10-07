import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Modal, Table } from 'antd';
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
    const [tagNameTop, setTagNameTop] = useState(null);
    const { accountLinks, user } = useSelector(state => state.auth)

    async function GetItemsProducts(page) {
        if (page === 1) {
            setData([])
        }
        const ItemsData = await GetRepository.getCategory(page, user?.access);
        if (ItemsData?.results) {
            setData((prev) => [...prev, ...ItemsData.results]);
            setSerach((prev) => [...prev, ...ItemsData.results]);
            if (ItemsData.next) {
                GetItemsProducts(page + 1)
            }
        }
    }

    async function getParentLists() {
        const Items = await GetRepository.getCategoryParentLists(user?.access);
        if (Items?.results) {
            setTagItems(Items?.results)
        }
    }

    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.name.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }

    async function deleteItemsId() {
        const deleteIdItems = await DeleteRepository.getCategoryDelete(deleteId, user?.access)
        const modal = Modal.error({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz  malumotlarni o'chirdingiz`,
        });
        GetItemsProducts(1)
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
        GetItemsProducts(1)
    }


    async function handleItemsEdit(values) {
        const formData = new FormData()
        if (file) {
            formData.append('image', file)
        }
        if (values?.icon) {
            formData.append('icon', values.icon)
        }
        if (values?.name) {
            formData.append('name', values.name)
        }
        if (tagName) {
            formData.append('parent', tagName)
        }
        if (tagNameTop) {
            formData.append('top', tagNameTop)
        }

        const patchItems = await PatchRepository.PatchCategory(formData, deleteIdEdit?.id, user?.access)
        if (patchItems?.status === 400) {
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Nimadir xato ketidi qaytadan urinib ko'ring",
            });
            modal.update
        }
        else {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Siz  malumotlarni o'zgartirdingiz ",
            });
            modal.update

        }

        GetItemsProducts(1)

    }

    function handleClickPostsImg(e) {
        setFile(e.target.files[0])
    }
    useEffect(() => {
        GetItemsProducts(1)
        getParentLists()
    }, []);

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
        // {
        //     title: 'Top',
        //     dataIndex: 'data',
        //     key: 'address',
        //     render: (datas) => {
        //         if (datas.parent === 'None') {
        //             if (datas.parent === 'None') {
        //                 return (
        //                     <input
        //                         type='checkbox'
        //                         defaultChecked={datas.top}
        //                         onChange={() => handleClickChecked(datas)}
        //                     />
        //                 );
        //             }
        //             else {
        //                 return (
        //                     <input
        //                         type='checkbox'
        //                         defaultChecked={false}
        //                         onChange={() => handleClickChecked(datas)}
        //                     />
        //                 );
        //             }
        //         }
        //         return <></>;
        //     },
        // },
        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a data-bs-target="#exampleModalToggleEditCategory" data-bs-toggle="modal"><i className="fa-solid fa-pen-to-square mx-4 text-success-emphasis" onClick={() => setDeleteIdEdit(data.find(item => item.id === id))}></i></a>
                {

                    data.some(el => el.id == id && el.is_delete === true) ?
                        <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><i className="fa-solid fa-trash-can text-danger mx-3" onClick={() => setDeleteId(id)}></i></a>
                        :
                        <a style={{ opacity: 0.6, cursor: "not-allowed" }}><i className="fa-solid fa-trash-can text-danger mx-3" ></i></a>

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
                                        <input type='search' className='form-control rounded col-md-8 ' placeholder="Qidiruv" onInput={handleClick} />
                                        <button className="btn btn-success col-md-3 py-3 " data-bs-target="#addcategory" data-bs-toggle="modal" ><span className='fs-4'> <i className="fa-solid fa-plus"></i> Kategoriya qo'shish</span></button>
                                    </div>
                                    <Table scroll={{ x: 750 }} dataSource={data} columns={columns} />
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
                        <input type="file" name='file' id='file' style={{ display: "none" }} className='form-control pt-4 rounded-3 fileUpload' onChange={handleClickPostsImg} />
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

                                            <option value={"true"} >Top </option>
                                            <option value={"false"} >Top emas</option>
                                        </>
                                            ||
                                            data.some(el => (el?.id == deleteIdEdit?.id && el.top === false)) ?
                                            <>
                                                <option selected value={"false"} >Top emas</option>
                                                <option value={"true"} >Top </option>
                                            </>
                                            :
                                            <>

                                                <option value={"true"} >Top </option>
                                                <option value={"false"} >Top emas</option>
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
                    />
                    <input
                        type='text'
                        placeholder="Nomi"
                        className="form-control rounded-3"
                        name='name'
                        defaultValue={deleteIdEdit?.name}
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
