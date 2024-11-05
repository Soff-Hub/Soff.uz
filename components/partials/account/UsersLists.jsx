import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Modal, Pagination, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import ModalDeletePostEdit from './ModalPostEdit';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { useSelector } from 'react-redux';
import CalculateTimeDifference from './DateFormatter';
import useDebounce from '~/hooks/useDebounce';
import Link from 'next/link';
import SidebarLayout from '../SidebarLayout';

function AccountUserPages() {
    const { accountLinks, user } = useSelector(state => state.auth)

    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [selectVal, setSelectVal] = useState(null);
    const [selectValStatus, setSelectValStatus] = useState("");
    const [customers_count, setCustomers_Count] = useState('');
    const [loading, setLoading] = useState(false)
    const [orderSort, setOrderSort] = useState('')

    const [pageCount, setPageCount] = useState(0)
    const [currPage, setCurrPage] = useState(1)
    const searchDebounce = useDebounce(search, 1000)



    async function GetItemsUsers(page, status, search) {
        setCurrPage(page)
        setLoading(true)
        const ItemsData = await GetRepository.getUsersLists(page, status, search, user?.access, orderSort);
        setPageCount(ItemsData.count)
        setData([...ItemsData.results]);
        setCustomers_Count(ItemsData.count)
        setLoading(false)
    }

    async function handleItemsPost() {
        const postsItems = await PostsRepository.PostsUsers(selectVal, user?.access);
        if (postsItems?.status === 201) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Siz  malumotlarni o'zgartirdingiz ",
            });
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: postsItems?.data?.msg,
            });
        }
        GetItemsUsers(currPage, selectValStatus, search)
    }



    useEffect(() => {
        GetItemsUsers(currPage, selectValStatus, search)
    }, [selectValStatus, searchDebounce, orderSort])
    const columns = [
        {
            title: 'Batafsil',
            dataIndex: 'id',
            key: 'age',
            width: 50,
            render: (id) => (
                <Link href={`/customerAccount/${id}`}>
                    <a className="truncate whitespace-nowrap">
                        <i className="fa-solid fa-eye"></i>
                    </a>
                </Link>
            ),
        },
        {
            title: 'Ism',
            dataIndex: 'first_name',
            key: 'age',
            render: (title) => (
                <span className="truncate whitespace-nowrap"> {title}</span>

            ),
        },
        {
            title: 'Telefon raqam yoki email',
            dataIndex: 'data',
            key: 'address',
            render: (data) => (
                <div className='d-flex flex-column'>
                    {
                        data.phone === "None" ?
                            <></> :
                            <span className="truncate whitespace-nowrap"> {data.phone}</span>
                    }
                    {
                        data.email === "None" ?
                            <></> :
                            <span className="truncate whitespace-nowrap"> {data.email}</span>
                    }

                </div>

            ),
        },
        {
            title: "Ro'yxatdan o'tgan sana",
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span key={created_at}> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        },
        {
            title: 'Sotib olingan mahsulotlar soni',
            dataIndex: 'purchased_count',
            key: 'purchased_count',
            render: (purchased_count) => (
                <span className="truncate whitespace-nowrap"> {purchased_count === 0 ? 0 : purchased_count + ' ta'}</span>

            ),
            sorter: () => {
                if (orderSort === '') {
                    setOrderSort('buy_count')
                } else setOrderSort('')
            },
        },
        {
            title: 'Holat',
            dataIndex: 'auth_status',
            key: 'address',
            render: (auth_status) => (
                <span>{auth_status === 'code_verified' ? (<span><i className="fa-solid text-success fa-circle-check"></i> Faol</span>) : (<span><i className="fa-solid fa-circle-xmark text-danger"></i> Faol emas</span>)}</span>
            )

        },
    ];
    return (
        <section className="ps-my-account ps-page--account p-0">
            <div className="container">
                <div className="row " style={{ alignItems: "flex-start" }}>
                    <SidebarLayout accountLinks={accountLinks}>
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <div className='row row-gap-3 gap-3 m-0 pb-3'>
                                        <label className='form-label border col-md-5 m-0 p-0 d-flex justify-content-between align-items-center' style={{ backgroundColor: "#F1F1F1" }} >
                                            <input type='search' className='form-control' style={{ border: "none" }} placeholder="Qidiruv" onInput={e => setSerach(e.target.value)} />
                                            <span className='px-4'><i className='fa-solid fa-search '></i></span>

                                        </label>
                                        <select className='form-select fs-3 py-3   col-md-4' onChange={(e) => setSelectValStatus(e.target.value)}>
                                            <option className='fs-3' value="" >Barcha holat</option>
                                            <option className='fs-3' value="new">Faol emas</option>
                                            <option className='fs-3' value="code_verified">Faol</option>
                                        </select>
                                        <button className="btn btn-success col-md-2 py-3 " data-bs-target="#addUsersPosts" data-bs-toggle="modal" ><span className='fs-4'><i className="fa-solid fa-plus"></i> Xaridor</span></button>
                                    </div>
                                    <h4 className='ps-2' >Barcha xaridorlar soni {customers_count} ta </h4>

                                    <Table dataSource={data} scroll={{ x: 1100 }} columns={columns} pagination={false} loading={loading} />
                                    <Pagination total={pageCount} defaultCurrent={currPage}
                                        onChange={(val) => GetItemsUsers(val, selectValStatus)} />
                                </div>
                            </div>
                        </div>
                    </SidebarLayout>
                </div>

                <ModalDeletePostEdit dataBsTarget="addUsersPosts" onSubmited={handleItemsPost} formID={'post-form'}>
                    <input
                        type='text'
                        placeholder="Ism"
                        className="form-control rounded-3"
                        name='first_name'
                        onChange={(e) => setSelectVal((prev) => ({ ...prev, first_name: e.target.value }))}

                    />
                    <input
                        type='tel'
                        placeholder="Telefon raqam"
                        className="form-control rounded-3"
                        name='phone'
                        defaultValue="+998"
                        onChange={(e) => setSelectVal((prev) => ({ ...prev, phone: e.target.value }))}
                        maxLength={13}

                    />
                    <input
                        type='email'
                        placeholder="Elektron pochta"
                        className="form-control rounded-3"
                        name='email'
                        onChange={(e) => setSelectVal((prev) => ({ ...prev, email: e.target.value }))}
                    />
                </ModalDeletePostEdit>
            </div>
        </section>
    );

}

export default AccountUserPages;
