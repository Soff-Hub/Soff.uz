import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Modal, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import DeleteRepository from '~/reositoriy-admin/DeleteRepository';
import ModalDelete from './Modal';
import ModalDeletePostEdit from './ModalPostEdit';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { useSelector } from 'react-redux';

function OrdersLists() {
    const { accountLinks, user } = useSelector(state => state.auth)

    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteIdEdit, setDeleteIdEdit] = useState(null);
    const [selectVal, setSelectVal] = useState({});


    async function GetItemsUsers(page) {
        if (page === 1) {
            setData([])
        }
        const ItemsData = await GetRepository.getUsersLists(page, user?.access);
        if (ItemsData?.results) {
            setData((prev) => [...prev, ...ItemsData.results]);
            setSerach((prev) => [...prev, ...ItemsData.results]);
            if (ItemsData.next) {
                GetItemsUsers(page + 1)
            }
        }
    }
    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.first_name.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }
    async function deleteItemsId() {
        const userDelete = await DeleteRepository.getUsersListsDelete(deleteId, user?.access);
        const modal = Modal.error({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz  malumotlarni o'chirdingiz`,
        });
        GetItemsUsers(1)
    }
    async function handleItemsPost() {
        const postsItems = await PostsRepository.PostsUsers(selectVal, user?.access);
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz  yangi malumot qo'shdingiz`,
        });
        GetItemsUsers(1)
    }
    async function handleItemsEdit() {
        const patchItems = await PatchRepository.PatchUsers(selectVal, deleteIdEdit?.id, user?.access)
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: "Siz  malumotlarni o'zgartirdingiz ",
        });
        GetItemsUsers(1)
    }

    useEffect(() => {
        GetItemsUsers(1)
    }, [])
    const columns = [
        {
            title: 'Ism',
            dataIndex: 'first_name',
            key: 'age',
            render: (title) => (
                <span className="truncate whitespace-nowrap"> {title}</span>

            ),
        },
        {
            title: 'Telefon raqam',
            dataIndex: 'phone',
            key: 'address',
            render: (title) => (
                <span className="truncate whitespace-nowrap"><i className=" text-primary-emphasis fa-solid fa-phone-volume"></i> {title}</span>

            ),
        },
        {
            title: 'Holat',
            dataIndex: 'auth_status',
            key: 'address',
            render: (auth_status) => (
                <span>{auth_status === 'code_verified' ? (<span><i className="fa-solid text-success fa-circle-check"></i> Faol</span>) : (<span><i class="fa-solid fa-circle-xmark text-danger"></i> Faol emas</span>)}</span>
            )

        },
        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a data-bs-target="#exampleModalTogglEdit" data-bs-toggle="modal"><i className="fa-solid fa-user-pen mx-4 text-success-emphasis" onClick={() => setDeleteIdEdit(data.find(item => item.id === id))}></i></a>
                <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><i className="fa-solid fa-trash-can text-danger" onClick={() => setDeleteId(id)}></i></a>
            </div>
        },
    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row gap-5 row-gap-3 mx-auto p-5 mb-5 rounded" style={{ backgroundColor: "#fff", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }}>
                    <h3 className='col-md-4'>Xaridorlar</h3>
                        <input type='search' className='form-control rounded col-md-5' placeholder="Qidiruv" onInput={handleClick} />
                        <button className="btn btn-success col-md-2 py-3 " data-bs-target="#addUsersPosts" data-bs-toggle="modal" ><span className='fs-4'><i className="fa-solid fa-plus"></i> Xaridor qo'shish </span></button>
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
                                    <Table dataSource={data} scroll={{x:740}} columns={columns} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDelete onSuccess={deleteItemsId} />
                <ModalDeletePostEdit dataBsTarget="exampleModalTogglEdit" onSubmited={handleItemsEdit} formID={'edit-form-users'}>
                    <input
                        type='text'
                        placeholder="Ism"
                        className="form-control rounded-3"
                        name='first_name'
                        defaultValue={deleteIdEdit?.first_name}
                        onChange={(e) => setSelectVal((prev) => ({ ...prev, first_name: e.target.value }))}
                    />
                    <input
                        type='tel'
                        placeholder="Telefon raqam"
                        className="form-control rounded-3"
                        name='phone'
                        defaultValue={deleteIdEdit?.phone}
                        onChange={(e) => setSelectVal((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                    <select className='form-select fs-3 py-3' onChange={(e) => setSelectVal((prev) => ({ ...prev, auth_status: e.target.value }))}>
                        <option className='fs-3' selected disabled value="new">Holatni tanlang</option>
                        <option className='fs-3' value="new">Faol emas</option>
                        <option className='fs-3' value="code_verified">Faol</option>
                    </select>
                </ModalDeletePostEdit >
                <ModalDeletePostEdit dataBsTarget="addUsersPosts" onSubmited={handleItemsPost} formID={'post-form'}>
                    <input
                        type='text'
                        placeholder="Ism"
                        className="form-control rounded-3"
                        name='first_name'
                        required
                        onChange={(e) => setSelectVal((prev) => ({ ...prev, first_name: e.target.value }))}

                    />
                    <input
                        type='tel'
                        placeholder="Telefon raqam"
                        className="form-control rounded-3"
                        name='phone'
                        defaultValue="+998"
                        required
                        onChange={(e) => setSelectVal((prev) => ({ ...prev, phone: e.target.value }))}

                    />
                    <select required className='form-select fs-3 py-3' onChange={(e) => setSelectVal((prev) => ({ ...prev, auth_status: e.target.value }))}>
                        <option className='fs-3' selected disabled value="new">Holatni tanlang</option>
                        <option className='fs-3' value="new">Faol emas</option>
                        <option className='fs-3' value="code_verified">Faol</option>
                    </select>
                </ModalDeletePostEdit>
            </div>
        </section>
    );

}

export default OrdersLists;
