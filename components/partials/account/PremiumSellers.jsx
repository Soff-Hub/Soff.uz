import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';
import NextImageCard from '~/components/nextImagecard';
import ModalDeletePostEdit from './ModalPostEdit';
import ModalDelete from './Modal';

function Notifications() {
    const { accountLinks, user } = useSelector(state => state.auth)

    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [currPage, setCurrPage] = useState(1)
    const [isPremium, setIsPremium] = useState(null)
    const [discount, setDiscount] = useState(0)

    async function GetItems(page) {
        const ItemsData = await GetRepository.getPMSellers(page, search, user?.access);
        if (ItemsData?.results) {
            setData([...ItemsData?.results]);
            setPageCount(ItemsData.count)
        }
    }

    const getDicount = async (id) => {
        setIsPremium(id)
        // const ItemsData = await GetRepository.getPMSellerDetail(id, user?.access)
        // console.log(ItemsData);
        await GetRepository.getPMSellerDetail(id, user?.access).then(() => {
            setDiscount(20)
            const a = document.createElement('a')
            const body = document.querySelector('.ps-page__left')
            a.setAttribute("data-bs-target", "#exampleModalMyProductsPrice")
            a.setAttribute("data-bs-toggle", "modal")
            body.appendChild(a)
            a.click()
        })


        return 0
    }

    console.log(discount);

    const handlePagination = (pageNum) => {
        setCurrPage(pageNum)
        GetItems(pageNum, search)
    }

    const handleItemsEditProductsPosts = async (id) => {
        await GetRepository.updatePMSellerDetail(id, { privilege_percentage: discount }, user?.access)
    }


    const handleClickIdEditModal = async () => {
        await GetRepository.updatePMSellerDetail(+isPremium, { has_privilege: false }, user?.access)
        GetItems(currPage)
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
                            <NextImageCard url={image} clasS='rounded-3 ' width='54px' height='54px' />
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
            title: 'Holat',
            dataIndex: 'auth_status',
            key: 'address',
            render: (auth_status) => (
                <span>{auth_status === 'code_verified' ? (<span><i className="fa-solid text-success fa-circle-check"></i> Faol</span>) : (<span><i className="fa-solid fa-circle-xmark text-danger"></i> Faol emas</span>)}</span>
            )

        },
        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <div >
                {/* <GetDicount /> */}
                <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={() => setIsPremium(id)} >
                    <i className="fa-solid fa-trash mx-3  text-success-emphasis" ></i>
                </a>
                <a onClick={() => getDicount(id)} >
                    <i className="fa-solid fa-pen-to-square mx-3  text-success-emphasis" ></i>
                </a>
            </div>

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
                        <ModalDelete onSuccess={handleClickIdEditModal} />
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className='bg-white p-3'>
                                    <span className='col-md-12 m-0 py-3 border d-flex bg-white justify-content-center rounded mb-2 h4' style={{ backgroundColor: "GrayText" }} >Sotuvchilar soni: {pageCount} ta</span>
                                    <label className='form-label border w-100 d-flex justify-content-between align-items-center' style={{ backgroundColor: "#F1F1F1" }} >
                                        <input type='search' className='form-control' style={{ border: "none" }} placeholder="Qidiruv" onInput={e => setSerach(e.target.value)} />
                                        <span className='px-4'><i className='fa-solid fa-search '></i></span>

                                    </label>
                                    <Table scroll={{ x: 1150 }} dataSource={data} columns={columns} pagination={false}
                                    />
                                    <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount} onChange={handlePagination} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDeletePostEdit dataBsTarget="exampleModalMyProductsPrice" onSubmited={() => handleItemsEditProductsPosts(isPremium)} formID="products-edit_price" >
                    <label htmlFor="discount" className='form-label'>Ustamasi (%)
                        <input id='discount' onChange={(e) => setDiscount(e.target.value)} max={100} min={0} value={discount} type="number" className='form-control rounded-3' placeholder='Ustama qiymati (%)' />
                    </label>
                </ModalDeletePostEdit >
            </div>
        </section>
    );

}
export default Notifications;
