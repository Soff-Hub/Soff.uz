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
    const [file, setFile] = useState({});
    const [tagName, setTagName] = useState(null);
    ;
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
    async function getParentLists(){
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
        formData.append('image', file)
        formData.append('icon', values.icon)
        formData.append('name', values.name)
        if (tagName) {
            formData.append('parent', tagName )
        }
        const postsItems = await PostsRepository.PostsCategory(formData, user?.access);
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz  yangi malumot qo'shdingiz`,
        });
        GetItemsProducts(1)
    }

    async function handleItemsEdit(values) {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('icon', values.icon)
        formData.append('name', values.name)
        const patchItems = await PatchRepository.PatchCategory(formData, deleteIdEdit?.id, user?.access)
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: "Siz  malumotlarni o'zgartirdingiz ",
        });
        GetItemsProducts(1)

    }
    async function handleClickChecked(item) {
        const patchItems = await PatchRepository.PatchCategory({ top: !item.top }, item.id, user?.access)
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
        },
        {
            title: 'Rasm',
            dataIndex: 'image',
            key: 'address',
            render: (poster_url) => (
                <div>
                    {
                        poster_url ?
                            <img src={poster_url} width={54} height={54} className='rounded-3' />
                            :
                            <i className="fa-solid fa-image fa-2x"></i>
                    }
                </div>
            ),
        },
        {
            title: 'Top',
            dataIndex: 'top',
            key: 'address',
            render: (top, id) => (
                <input type='checkbox' defaultChecked={top} onChange={() => handleClickChecked(id)} />
            )
        },
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
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row  mx-auto gap-5 row-gap-3 p-5 mb-5 rounded" style={{ backgroundColor: "#fff", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }}>
                    <h3 className='col-md-4'>Kategoriya</h3>
                    <input type='search' className='form-control rounded col-md-5 ' placeholder="Qidiruv" onInput={handleClick} />
                    <button className="btn btn-success col-md-2 py-3 " data-bs-target="#addcategory" data-bs-toggle="modal" ><span className='fs-4'>Kategoriya qo'shish </span></button>
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
                                <div>
                                    <Table scroll={{ x: 750 }} dataSource={data} columns={columns} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalDelete onSuccess={deleteItemsId} />
                <ModalDeletePostEdit dataBsTarget="exampleModalToggleEditCategory" onSubmited={handleItemsEdit} formID={'edit-form-category'}>
                    <input
                        type='file'
                        className="form-control rounded-3 py-4"
                        required
                        onChange={handleClickPostsImg}
                        defaultValue={deleteIdEdit?.image}
                    />
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
                        Rasm tanlash uchun bosing <i className="fa-regular fa-hand-pointer"></i>
                        <input required type="file" name='file' id='file' style={{ display: "none" }} className='form-control pt-4 rounded-3 fileUpload' onChange={handleClickPostsImg} />
                    </label>
                    <select  className='form-select  rounded-3 py-3 fs-3' onChange={(e) => setTagName(e.target.value)} >
                        <option value="">Parent</option>
                        {
                            tagItems?.length > 0 && (
                                tagItems?.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))
                            )
                        }
                    </select>
                    <input
                        type='text'
                        placeholder="Belgi"
                        className="form-control rounded-3"
                        name='icon'
                        required
                    />
                    <input
                        type='text'
                        placeholder="Nomi"
                        className="form-control rounded-3"
                        name='name'
                        required
                    />
                </ModalDeletePostEdit>
            </div>
        </section>
    );

}

export default CategoryLists;
