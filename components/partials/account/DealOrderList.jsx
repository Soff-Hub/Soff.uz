import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import { Modal, Pagination, Table, Tooltip } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';
import Link from 'next/link';
import CalculateTimeDifference from './DateFormatter';
import DealOrderEdit from './dealUpdate';

export default function DealOrderList() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [dealList, setDealList] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [dealItem, setDealItem] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);



    const showModal = async (id) => {
        setLoadingDetails(true)
        const data = await GetRepository.getDealItems(id?.id, user?.access);
        if (data) {
            setDealItem(data);
        }
        setLoadingDetails(false)
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };


    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }


    async function getDealList(token) {
        const data = await GetRepository.getDealList(currPage, token);
        if (data?.results) {
            setPageCount(data.count);
            setDealList(data?.results);
        }

    }


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 60,
            render: (id) => (
                <span className="truncate whitespace-nowrap "> #{id}</span>
            ),
        },
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'title',
            width: 300,
            render: (title) => <span> {title}</span>,
        },
        {
            title: 'Narx',
            dataIndex: 'price',
            key: 'address',
            render: (price) => (
                <span>
                    <i className="fa-solid fa-coins text-warning"></i>{' '}
                    {addPeriodToThousands(price)} so'm
                </span>
            ),
        },
        {
            title: 'Muaddati',
            dataIndex: 'deadline_date',
            key: 'address',
            render: (deadline_date) => (
                <span>
                    {' '}
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    <CalculateTimeDifference targetDate={deadline_date} />
                </span>
            ),
        },
        {
            title: 'Turi',
            dataIndex: 'type',
            key: 'type',
            render: (type) => <span> {type?.name}</span>,
        },
        {
            title: 'Yaratilgan sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span> {created_at.split('T')?.[0]}</span>,
        },

        {
            title: 'Holat',
            dataIndex: 'data_status',
            key: 'address',
            render: (datastatus) =>
                datastatus?.status === 'new' ? (
                    <span>
                        <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                        Moderatsiya
                    </span>
                ) : datastatus?.status === 'active' ? (
                    <span>
                        <i className="fa-solid text-success fa-circle-check"></i>{' '}
                        Tasdiqlangan
                    </span>
                ) : datastatus?.status === 'cancelled' ? (
                    <Tooltip title={datastatus?.reason}>
                        <span style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-circle-question text-danger"></i>{' '}
                            Bekor qilingan{' '}
                        </span>
                    </Tooltip>
                ) : datastatus?.status === 'archived' ? (
                    <span>
                        <i className="fa-solid fa-inbox text-danger"></i>{' '}
                        Arxivlangan
                    </span>
                ) : (
                    <></>
                ),

        },
        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (
                <div>
                    <a
                        data-bs-target="#staticBackdropView"
                        data-bs-toggle="modal">
                        <i
                            className="fa-solid fa-eye text-success-emphasis mx-2"
                            onClick={() =>
                            (showModal(
                                dealList.find((item) => item.id === id)
                            ), setIsModalOpen(true))
                            }></i>
                    </a>

                    <span style={{ cursor: 'pointer' }}>
                        <i
                            className="fa-solid fa-pen-to-square mx-4  text-success-emphasis"
                            onClick={() =>
                            (showModal(
                                dealList.find((item) => item.id === id)
                            ), setIsModalOpenUpdate(true))
                            }></i>
                    </span>
                </div>
            ),
        },
    ];


    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
    };


    useEffect(() => {
        if (user?.access) {
            getDealList(user?.access);
        }
    }, [currPage, isModalOpenUpdate]);


    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row pb-5" style={{ alignItems: 'flex-start' }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="bg-white p-3">
                                    <Table
                                        scroll={{ x: 1500 }}
                                        dataSource={dealList}
                                        columns={columns}
                                        pagination={false}
                                    />
                                    <div className='d-flex justify-content-center my-4 '>
                                        <Pagination
                                            className="mt-3"
                                            total={pageCount}
                                            defaultCurrent={currPage}
                                            onChange={handlePagination}
                                        />
                                    </div>


                                </div>

                                <Modal
                                    title="Buyurtma tavsifi"
                                    open={isModalOpen}
                                    maskClosable={false}
                                    width={900}
                                    onCancel={handleCancel}
                                    okButtonProps={{
                                        style: {
                                            display: 'none',
                                        },
                                    }}
                                    cancelButtonProps={{
                                        style: {
                                            display: 'none',
                                        },
                                    }}>
                                    {
                                        loadingDetails ? <div
                                            className=" "
                                            style={{
                                                height: '50vh',
                                                display: 'grid',
                                                placeContent: 'center',
                                            }}>
                                            <div
                                                className="spinner-border "
                                                role="status"
                                                style={{ width: '150px', height: '150px' }}>
                                                <span className="visually-hidden">
                                                    Loading...
                                                </span>
                                            </div>
                                        </div> :

                                            <div className="border border-2 rounded-3 bg-white">
                                                <div className='d-md-flex justify-content-between gap-2 align-items-center  mb-3 px-4 py-3 ' style={{ backgroundColor: "rgba(40, 167, 69, 0.1)" }}>
                                                    <h5 className="text-success fw-medium mb-2">
                                                        {dealItem?.title}
                                                    </h5>

                                                </div>

                                                <div className='px-4 pb-4'>
                                                    <p
                                                        className='mb-2'
                                                        style={{ width: "100%" }}
                                                    >
                                                        {dealItem?.description}
                                                    </p>

                                                    <div className="d-md-flex justify-content-between gap-4  ">
                                                        <div className="d-flex gap-3 align-items-center my-2">
                                                            <Link href={dealItem?.user_info?.role==="seller" ? `/seller/${dealItem?.user_info?.id}` : "#"}

                                                            >
                                                                <a style={{
                                                                    width: "40px",
                                                                    height: "40px",
                                                                    borderRadius: "50%",
                                                                    cursor: "pointer"
                                                                }}>
                                                                    <img
                                                                        src={dealItem?.user_info?.image_url ? dealItem?.user_info?.image_url : "/static/img/ozodbek.png"}
                                                                        alt="sca"
                                                                    />
                                                                </a>
                                                            </Link>
                                                            <div>

                                                                <Link href={dealItem?.user_info?.role==="seller" ? `/seller/${dealItem?.user_info?.id}` : "#"}style={{ cursor: "pointer" }} className="text-start">
                                                                    <a className="fw-medium fs-5">
                                                                        {dealItem?.user_info?.full_name}
                                                                    </a>
                                                                </Link>


                                                                <div className='d-flex flex-column'>

                                                                    <span className="fw-medium text-success fs-5  ">Aloqa: <span className="text-secondary fs-5 fw-medium ">
                                                                        {dealItem?.user_info?.contact_info ? dealItem?.user_info?.contact_info : '+998 (91) 008 67 89'}
                                                                    </span> </span>{' '}
                                                                    <span className="fw-medium text-success fs-5  ">Narxi: <span className="text-secondary fs-5 fw-medium ">
                                                                        {addPeriodToThousands(dealItem?.price)} so'm
                                                                    </span> </span>{' '}


                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className='d-flex justify-content-between'>
                                                        <div>
                                                            <span className="text-success fs-5 fw-medium">
                                                                Muddati:
                                                            </span>{' '}
                                                            <span className="fw-medium fs-5 ">
                                                                {dealItem?.deadline_date}
                                                            </span>
                                                        </div>

                                                        {
                                                            dealItem?.status === 'new' ? (
                                                                <span>
                                                                    <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                                                    Moderatsiya
                                                                </span>
                                                            ) : dealItem?.status === 'cancelled' ? (
                                                                <span>
                                                                    <i className="fa-regular fa-clock text-warning"></i>  Kelishildi va Ish boshlandi
                                                                </span>
                                                            ) : (
                                                                <span style={{ cursor: 'pointer' }}>
                                                                    <i className="fa-solid fa-circle-check text-success"></i>{' '}
                                                                    Tugallangan
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                </div>

                                            </div>

                                    }


                                </Modal>

                                <Modal
                                    title="Buyurtmani tahrirlash"
                                    open={isModalOpenUpdate}
                                    maskClosable={false}
                                    width={750}
                                    onCancel={() => setIsModalOpenUpdate(false)}
                                    okButtonProps={{
                                        style: {
                                            display: 'none',
                                        },
                                    }}
                                    cancelButtonProps={{
                                        style: {
                                            display: 'none',
                                        },
                                    }}>
                                    {
                                        loadingDetails ? <div
                                            style={{
                                                height: '50vh',
                                                display: 'grid',
                                                placeContent: 'center',
                                            }}>
                                            <div
                                                className="spinner-border "
                                                role="status"
                                                style={{ width: '150px', height: '150px' }}>
                                                <span className="visually-hidden">
                                                    Loading...
                                                </span>
                                            </div>
                                        </div> :

                                            <DealOrderEdit dealItem={dealItem} setIsModalOpenUpdate={setIsModalOpenUpdate} />


                                    }


                                </Modal>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
