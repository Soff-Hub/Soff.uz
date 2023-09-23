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

function TegLists() {
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
        const ItemsData = await GetRepository.getTagLists(page, user?.access);
        if (ItemsData?.results) {
            setData((prev) => [...prev, ...ItemsData.results]);
            setSerach((prev) => [...prev, ...ItemsData.results]);
            if (ItemsData.next) {
                // GetItemsUsers(page + 1, )
            }
        }
    }
    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.first_name.toLowerCase().includes(text.toLowerCase()) ||
            item.data?.email?.toLowerCase().includes(text.toLowerCase()) ||
            item.data?.phone.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }
    async function deleteItemsId() {
        const userDelete = await DeleteRepository.getTagListsDelete(deleteId, user?.access);
        const modal = Modal.error({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz  tegni o'chirdingiz`,
        });
        modal.update
        GetItemsUsers(1)
    }

    async function handleItemsPost() {
        const postsItems = await PostsRepository.TegUsers(selectVal, user?.access);
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz  yangi teg qo'shdingiz`,
        });
        GetItemsUsers(1)
    }
    async function handleItemsEdit() {
        const patchItems = await PatchRepository.PatchTegs(selectVal, deleteIdEdit?.id, user?.access)
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: "Siz  teglarni o'zgartirdingiz ",
        });
        GetItemsUsers(1)
    }

    useEffect(() => {
        GetItemsUsers(1)
    }, [])
    const columns = [
        {
            title: 'Teg nomi',
            dataIndex: 'name',
            key: 'address',
            width: 300,
        },
        {
            title: 'Aktive',
            dataIndex: 'active',
            key: 'address',
            render: (aktive) => (
                aktive === true ?
                    <span> <i className="fa-solid fa-square-check text-success"></i> Aktiv holatda</span>
                    :
                    <span> <i className="fa-solid fa-circle-minus text-danger"></i> Aktiv emas</span>
            )
        },
        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a data-bs-target="#exampleModalTogglEdit" data-bs-toggle="modal"><i className="fa-solid fa-pen-to-square mx-4 text-success-emphasis" onClick={() => setDeleteIdEdit(data.find(item => item.id === id))}></i></a>
                <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><i className="fa-solid fa-trash-can text-danger" onClick={() => setDeleteId(id)}></i></a>
            </div>
        },
    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
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
                                    <div className='row row-gap-3 gap-3 m-0 pb-3'>
                                        <input type='search' className='form-control rounded col-md-8' placeholder="Qidiruv" onInput={handleClick} />
                                        <button className="btn btn-success col-md-3 py-3 " data-bs-target="#addUsersPosts" data-bs-toggle="modal" ><span className='fs-4'><i className="fa-solid fa-plus"></i> Teg qo'shish</span></button>
                                    </div>

                                    <Table dataSource={data} scroll={{ x: 740 }} columns={columns} />
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
                        onChange={(e) => setSelectVal((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <select className='form-select fs-3 py-3' onChange={(e) => setSelectVal((prev) => ({ ...prev, active: e.target.value }))}>
                        <option className='fs-3' selected disabled value="new">Holatni tanlang</option>
                        <option className='fs-3' value="true">Aktiv holat</option>
                        <option className='fs-3' value="false">Aktiv emas</option>
                    </select>
                </ModalDeletePostEdit >
                <ModalDeletePostEdit dataBsTarget="addUsersPosts" onSubmited={handleItemsPost} formID={'post-form'}>
                    <input
                        type='text'
                        placeholder="Ism"
                        className="form-control rounded-3"
                        name='first_name'
                        defaultValue={deleteIdEdit?.first_name}
                        onChange={(e) => setSelectVal((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <select className='form-select fs-3 py-3' onChange={(e) => setSelectVal((prev) => ({ ...prev, active: e.target.value }))}>
                        <option className='fs-3' selected disabled value="new">Holatni tanlang</option>
                        <option className='fs-3' value="true">Aktiv holat</option>
                        <option className='fs-3' value="false">Aktiv emas</option>
                    </select>
                </ModalDeletePostEdit>
            </div>
        </section>
    );

}

export default TegLists;
