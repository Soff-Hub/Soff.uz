import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Modal, Pagination, Table } from 'antd';
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
    const [search, setSerach] = useState('');
    const [deleteId, setDeleteId] = useState(null);
    const [deleteIdEdit, setDeleteIdEdit] = useState(null);
    const [selectVal, setSelectVal] = useState({});
    const [pageCount, setPageCount] = useState(0)
    const [currPage, setCurrPage] = useState(1)
    const [dataVal, setDataVal] = useState("")


    async function GetItemsUsers(page) {
        setCurrPage(page)
        const ItemsData = await GetRepository.getTagLists(page, search, dataVal, user?.access);
        setPageCount(ItemsData.count)
        if (ItemsData?.results) {
            setData([...ItemsData.results]);
        }
    }


    async function deleteItemsId() {
        const userDelete = await DeleteRepository.getTagListsDelete(deleteId, user?.access);
        const modal = Modal.error({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz  tegni o'chirdingiz`,
        });
        modal.update
        GetItemsUsers(currPage, search, dataVal)
    }

    async function handleItemsPost() {
        const postsItems = await PostsRepository.TegUsers(selectVal, user?.access);
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz  yangi teg qo'shdingiz`,
        });
        GetItemsUsers(currPage, search, dataVal)
    }
    async function handleItemsEdit() {
        const patchItems = await PatchRepository.PatchTegs(selectVal, deleteIdEdit?.id, user?.access)
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: "Siz  teglarni o'zgartirdingiz ",
        });
        GetItemsUsers(currPage, search, dataVal)
    }

    useEffect(() => {
        GetItemsUsers(currPage, search, dataVal)
    }, [search, dataVal])

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
                {
                    data.some(el => el.id == id && el.delete_tag === true) ?
                        <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><i className="fa-solid fa-trash-can text-danger" onClick={() => setDeleteId(id)}></i></a>
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
                                <div className="ps-section__content">
                                    <div className='row row-gap-3 gap-3 m-0 pb-3'>
                                        <input type='search' className='form-control rounded col-md-5' placeholder="Qidiruv" onInput={(e) => setSerach(e.target.value)} />
                                        <select className='form-select fs-3 py-3 col-md-3' onChange={(e) => setDataVal(e.target.value)}>
                                            <option className='fs-3'  value="">Holatni tanlang</option>
                                            <option className='fs-3' value="true">Aktiv holat</option>
                                            <option className='fs-3' value="false">Aktiv emas</option>
                                        </select>
                                        <button className="btn btn-success col-md-3 py-3 " data-bs-target="#addUsersPosts" data-bs-toggle="modal" ><span className='fs-4'><i className="fa-solid fa-plus"></i> Teg qo'shish</span></button>
                                    </div>

                                    <Table dataSource={data} scroll={{ x: 740 }} columns={columns} pagination={false}
                                    />
                                    <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount} onChange={GetItemsUsers} />
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
                </ModalDeletePostEdit>
            </div>
        </section>
    );

}

export default TegLists;
