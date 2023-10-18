import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Modal, Table } from 'antd';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';
import CalculateTimeDifference from './DateFormatter';

function Notifications() {
    const { accountLinks, user } = useSelector(state => state.auth)

    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [currPage, setCurrPage] = useState(1)

    async function GetItems(page) {
        const ItemsData = await GetRepository.getShops(page, search, user?.access);
        if (ItemsData?.results) {
            setData([...ItemsData?.results]);
            setPageCount(ItemsData.count)
        }
    }

    const handlePagination = (pageNum) => {
        setCurrPage(pageNum)
        GetItems(pageNum, search)
    }


    useEffect(() => {
        GetItems(currPage, search)
    }, [search])

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'image',
            key: 'name',
            render: (image) => (
                <div>
                    {
                        image ?
                            <img src={image} width={54} height={54} />
                            :
                            <span className='fs-4'><i className="  fa-2x fa-solid fa-circle-user"></i></span>
                    }
                </div>
            ),
        },
        {
            title: 'Ism',
            dataIndex: 'first_name',
            key: 'age',
            render: (first_name) => (
                <span className="truncate whitespace-nowrap"> {first_name}</span>

            ),
        },
        {
            title: 'Telefon raqam yoki email',
            dataIndex: 'data',
            key: 'address',
            width: 300,
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
            title: 'Mahsulotlar',
            dataIndex: 'total_product',
            key: 'address',
            render: (total_product) => (
                <span> <i className="fa-solid fa-boxes-stacked"></i> {total_product}</span>
            ),
        },
        {
            title: 'Buyurtmalar',
            dataIndex: 'total_approved',
            key: 'address',
            render: (total_approved) => (
                <span> <i className="fa-solid fa-box"></i> {total_approved}</span>
            ),
        },
        {
            title: "Ro'yxatdan o'tgan sana",
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span key={created_at}> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
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
                <div className="row flex pb-5" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4" >
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className='bg-white p-3'>
                                    <span className='col-md-12 m-0 py-3 border d-flex bg-white justify-content-center rounded mb-2 h4' style={{ backgroundColor: "GrayText" }} >Sotuvchilar soni: {pageCount} ta</span>
                                    <input type='search' className='form-control rounded bg-white mb-3 ' style={{ backgroundColor: "#F1F1F1" }} placeholder="Qidiruv" onInput={e => setSerach(e.target.value)} />
                                    <Table scroll={{ x: 1150 }} dataSource={data} columns={columns} pagination={false}
                                    />
                                    <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount} onChange={handlePagination} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}
export default Notifications;
