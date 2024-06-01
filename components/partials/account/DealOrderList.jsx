import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import { Modal, Table, Tooltip } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';
import Link from 'next/link';
import Router from 'next/router';

export default function DealOrderList() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [dealList, setDealList] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dealItem, setDealItem] = useState(null);

    const showModal = async (id) => {
        setIsModalOpen(true);
        const data = await GetRepository.getDealItems(id?.id, user?.access);
        if (data) {
            setDealItem(data);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    async function getDealList(token) {
        const data = await GetRepository.getDealList(token);
        if (data?.results) {
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
            title: 'Narxi',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <div className="d-flex gap-2">
                    <i className="fa-solid fa-coins text-warning"></i>{' '}
                    <span> {price ? JSON.parse(price) + " so'm" : ''}</span>
                </div>
            ),
        },
        {
            title: 'Muddati',
            dataIndex: 'deadline',
            key: 'deadline',
            render: (deadline) => (
                <span>
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    {deadline}
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
            dataIndex: 'status',
            key: 'address',
            render: (status) =>
                status === 'new' ? (
                    <span>
                        <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                        Moderatsiya
                    </span>
                ) : status === 'active' ? (
                    <span>
                        <i className="fa-solid text-success fa-circle-check"></i>{' '}
                        Tasdiqlangan
                    </span>
                ) : status === 'archived' ? (
                    <Tooltip title={''}>
                        <span style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-circle-question text-danger"></i>{' '}
                            Bekor qilingan{' '}
                        </span>
                    </Tooltip>
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
                                showModal(
                                    dealList.find((item) => item.id === id)
                                )
                            }></i>
                    </a>

                    <span style={{ cursor: 'pointer' }}>
                        <i
                            className="fa-solid fa-pen-to-square mx-4  text-success-emphasis"
                            onClick={() =>
                                Router.push(`/account/deal/${id}`)
                            }></i>
                    </span>
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (user?.access) {
            getDealList(user?.access);
        }
    }, []);

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
                                        scroll={{ x: 1200 }}
                                        dataSource={dealList}
                                        columns={columns}
                                        pagination={false}
                                    />
                                    {/* <Pagination
                                        className="mt-3"
                                        defaultCurrent={1}
                                        total={pageCount}
                                        onChange={handlePagination}
                                        showSizeChanger={false}
                                        current={+router.query.page}
                                    /> */}
                                </div>
                                <Modal
                                    title="Buyurtmani foydalanuvchi tarafda ko'rinishi"
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
                                    <div className="border border-2 rounded-3 p-4 bg-white">
                                        <div className="d-md-flex justify-content-between  ">
                                            <h3 className="text-success">
                                                {' '}
                                                {dealItem?.title
                                                    ? dealItem?.title
                                                    : 'Kurs ishi kerak'}{' '}
                                            </h3>
                                            <div>
                                                {' '}
                                                <span className="fw-medium">
                                                    narxi:
                                                </span>{' '}
                                                <span className="text-success fs-3 fw-bold">
                                                    {dealItem?.price
                                                        ? JSON.parse(
                                                              dealItem?.price
                                                          ) + " so'm"
                                                        : "23 000 so'm"}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="d-md-flex justify-content-between gap-4 ">
                                                <div className="d-flex justify-content-start gap-3 pt-4 ">
                                                    {dealItem?.user_info
                                                        ?.image ? (
                                                        <img
                                                            className="d-block"
                                                            width={80}
                                                            src={
                                                                dealItem
                                                                    ?.user_info
                                                                    ?.image
                                                            }
                                                            alt="sca"
                                                        />
                                                    ) : (
                                                        <div className=" d-flex align-items-center border rounded rounded-3 px-3 ">
                                                            <i
                                                                style={{
                                                                    fontSize:
                                                                        '35px',
                                                                }}
                                                                class="fa-solid fa-circle-user d-block"></i>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="text-start">
                                                            <Link href="#">
                                                                <a className="fw-medium fw-bold">
                                                                    {
                                                                        dealItem
                                                                            ?.user_info
                                                                            ?.full_name
                                                                    }
                                                                </a>
                                                            </Link>
                                                        </div>
                                                        <div className="text-start">
                                                            <span className="fw-medium ">
                                                                {
                                                                    dealItem?.deadline_date
                                                                }
                                                            </span>
                                                        </div>
                                                        {dealItem?.status ===
                                                        'active' ? (
                                                            <div className="bg-success rounded-3 d-flex justify-content-center align-items-center gap-2 p-1  mt-3 ">
                                                                {' '}
                                                                <span className="text-white fs-3 fw-medium d-block">
                                                                    <i class="fa-solid fa-circle-check"></i>
                                                                </span>{' '}
                                                                <span className="fw-medium text-white  d-block">
                                                                    tasdiqlangan
                                                                </span>
                                                            </div>
                                                        ) : dealItem?.status ===
                                                          'new' ? (
                                                            <div className="bg-warning rounded-3 d-flex justify-content-center align-items-center gap-2 p-1 mt-3 ">
                                                                {' '}
                                                                <span className="text-success fs-3 fw-medium d-block">
                                                                    <i class="fa-regular fa-clock"></i>
                                                                </span>{' '}
                                                                <span className="fw-medium text-success  d-block">
                                                                    moderatsiya
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className="bg-danger rounded-3 d-flex justify-content-center align-items-center gap-2 px-1 mt-3 ">
                                                                {' '}
                                                                <span className="text-white fs-3 fw-medium d-block">
                                                                    <i class="fa-solid fa-circle-xmark"></i>
                                                                </span>{' '}
                                                                <span className="fw-medium text-white  d-block">
                                                                    bekor
                                                                    qilingan
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="px-3 py-4">
                                            {dealItem?.description
                                                ? dealItem?.description
                                                : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus veritatis, corporis non repellat totam magni quae corrupti quia labore, adipisci beatae animi unde. Dignissimos labore odio similique numquam nisi aspernatur?'}
                                        </p>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
