import React, { useState, useEffect } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Pagination, Select, Table } from 'antd';
import CalculateTimeDifference from './DateFormatter';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Example from './Chart';
import { addPeriodToThousands } from './ProductsLists';
import SidebarLayout from '../SidebarLayout';

function BirjaDashbordList() {
    const [data, setData] = useState([]);
    const [dataOrders, setDataOrders] = useState([]);
    const [orderLoading, setOrderLoading] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const { accountLinks, user } = useSelector((state) => state.auth);


    async function GetItemsProducts() {
        const ItemsData = await GetRepository.getSellerDashbordBirja(user?.access);
        if (ItemsData) {
            setData(ItemsData);
        }
    }

    async function GetItemsProductsOrders() {
        setOrderLoading(true)
        const ItemsData = await GetRepository.getOrdersListsDashbordBirja(
            currPage,
            user?.access
        );
        if (ItemsData?.results) {
            setDataOrders(ItemsData?.results);
            setPageCount(ItemsData?.count)
        }
        setOrderLoading(false)
    }

    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
    };


    useEffect(() => {
        GetItemsProducts();

    }, []);

    useEffect(() => {
        GetItemsProductsOrders();
    }, [currPage]);


    // Columnlar ro'yxati

    const columnsOrders = [

        {
            title: 'Buyurtmachi',
            dataIndex: 'buyer',
            key: 'age',
            render: (byur) => (
                <div className='d-flex align-items-center gap-3'>
                    <div>
                        {byur?.image_url ? (
                            <img src={byur?.image_url} alt="soff.uz" className='profile__image-client' />
                        ) : (
                            <span className="fs-4">
                                <i className="  fa-2x fa-solid fa-circle-user"></i>
                            </span>
                        )}
                    </div>

                    <div className="d-flex flex-column">
                        <span className="truncate whitespace-nowrap">
                            {' '}
                            {byur.first_name} {byur?.last_name}
                        </span>
                        <span className="truncate whitespace-nowrap">
                            {' '}
                            {byur.phone_or_email}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Sotuvchi',
            dataIndex: 'seller',
            key: 'age',
            render: (seller) => (
                <div className='d-flex align-items-center gap-3'>
                    <div>
                        {seller?.image_url ? (
                            <img src={seller?.image_url} alt="soff.uz" className='profile__image-client' />
                        ) : (
                            <span className="fs-4">
                                <i className="  fa-2x fa-solid fa-circle-user"></i>
                            </span>
                        )}
                    </div>

                    <a
                        href={`/sellerAccount/${seller?.id}`}
                        className="d-flex flex-column">
                        <span className="truncate whitespace-nowrap">
                            {' '}
                            {seller.last_name}
                        </span>
                        <span className="truncate whitespace-nowrap">
                            {' '}
                            {seller.phone_or_email}
                        </span>
                    </a>
                </div>


            ),

        },
        {
            title: 'Buyurtma nomi',
            dataIndex: 'document',
            key: 'age',
            width: 300,
            render: (document) => (
                <Link href={`/product/${document.slug}`}>
                    <a>{document.title}</a>
                </Link>
            ),
        },
        {
            title: 'Narx',
            dataIndex: 'price',
            key: 'address',
            width: '150px',
            render: (price) => (
                <span>
                    <i className="fa-solid fa-coins text-warning"></i>{' '}
                    {addPeriodToThousands(price)}
                </span>
            ),
        },
        // {
        //     title: "To'lov turi ",
        //     dataIndex: 'provider',
        //     key: 'address',
        //     render: (provider) => (
        //         <span>
        //             {provider === 'card_data' ? (
        //                 <span>
        //                     <i className="fa-solid text-success fa-circle-check"></i>{' '}
        //                     karta orqali
        //                 </span>
        //             ) : provider === 'click' ? (
        //                 <span>
        //                     <i className="fa-solid text-success fa-circle-check"></i>{' '}
        //                     click orqali
        //                 </span>
        //             ) : provider === 'payme' ? (
        //                 <span>
        //                     <i className="fa-solid text-success fa-circle-check"></i>{' '}
        //                     payme orqali
        //                 </span>
        //             ) : (
        //                 ' '
        //             )}
        //         </span>
        //     ),
        // },
        {
            title: 'Buyurtma sanasi',
            dataIndex: 'created_at',
            key: 'address',
            render: (created_at) => (
                <span>
                    {' '}
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    <CalculateTimeDifference targetDate={created_at} />
                </span>
            ),
        },
    ];



    return (
        <section className="ps-my-account ps-page--account pb-5 pt-0 ">
            <p className="step-0 m-0"></p>
            <div className="container">


                {user?.role === 'admin' ? (
                    <div className="pb-4  d-flex gap-3 overflow-x-scroll">
                        <div>
                            <div
                                className=" bg-white py-5 px-4"
                                style={{
                                    width: '290px',
                                    height: '170px',
                                    borderRadius: '5px',
                                    boxShadow:
                                        '5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)',
                                }}>
                                <div className="d-flex justify-content-between pb-4">
                                    <div>
                                        <h4>Jami daromad</h4>
                                        <span>(Butun davr mobaynida)</span>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-money-check-dollar fa-2x text-warning"></i>
                                    </div>
                                </div>
                                {data?.total_exchange_amount || data?.total_exchange_amount == 0 ? (
                                    <h4 className="mt-5 ">
                                        {' '}
                                        <i className="fa-solid fa-coins text-warning"></i>{' '}
                                        {addPeriodToThousands(
                                            data?.total_exchange_amount
                                        )}{' '}
                                        so'm
                                    </h4>
                                ) : (
                                    <div
                                        className="spinner-border mt-5"
                                        role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div
                                className=" bg-white py-5 px-4"
                                style={{
                                    width: '290px',
                                    height: '170px',
                                    borderRadius: '5px',
                                    boxShadow:
                                        '5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)',
                                }}>
                                <div className="d-flex justify-content-between pb-4">
                                    <div>
                                        <h4>Web sayt soff foydasi</h4>
                                        <span>(Butun davr mobaynida)</span>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-hand-holding-dollar fa-2x text-success"></i>
                                    </div>
                                </div>
                                {data?.website_income ||
                                    data?.website_income == 0 ? (
                                    <h4 className="mt-5 ">
                                        {' '}
                                        <i className="fa-solid fa-coins text-warning"></i>{' '}
                                        {addPeriodToThousands(
                                            data?.website_income
                                        )}{' '}
                                        so'm
                                    </h4>
                                ) : (
                                    <div
                                        className="spinner-border mt-5"
                                        role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* <div>
                            <div
                                className=" bg-white py-5 px-4"
                                style={{
                                    width: '290px',
                                    height: '170px',
                                    borderRadius: '5px',
                                    boxShadow:
                                        '5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)',
                                }}>
                                <div className="d-flex justify-content-between pb-4">
                                    <div>
                                        <h4>Jami daromad</h4>
                                        <span>(Oxirgi 30 kun)</span>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-hand-holding-dollar fa-2x text-success"></i>
                                    </div>
                                </div>
                                {data?.total_revenue ||
                                    data?.total_revenue == 0 ? (
                                    <h4 className="mt-5 ">
                                        {' '}
                                        <i className="fa-solid fa-coins text-warning"></i>{' '}
                                        {addPeriodToThousands(
                                            data?.total_revenue
                                        )}{' '}
                                        so'm
                                    </h4>
                                ) : (
                                    <div
                                        className="spinner-border mt-5"
                                        role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div
                                className=" bg-white py-5 px-4  "
                                style={{
                                    width: '290px',
                                    height: '170px',
                                    borderRadius: '5px',
                                    boxShadow:
                                        '5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)',
                                }}>
                                <div className="d-flex justify-content-between pb-4">
                                    <div>
                                        <h4>Bugungi daromad</h4>
                                        <span>(Bugungi daromad)</span>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-sack-dollar fa-2x text-warning"></i>
                                    </div>
                                </div>
                                {data?.today_revenue ||
                                    data?.today_revenue === 0 ? (
                                    <h4 className="mt-5">
                                        {' '}
                                        <i className="fa-solid fa-coins text-warning"></i>{' '}
                                        {addPeriodToThousands(
                                            data?.today_revenue
                                        )}{' '}
                                        so'm
                                    </h4>
                                ) : (
                                    <div
                                        className="spinner-border mt-5"
                                        role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div> */}

                        <div>
                            <div
                                className=" bg-white py-5 px-4 "
                                style={{
                                    width: '290px',
                                    height: '170px',
                                    borderRadius: '5px',
                                    boxShadow:
                                        '5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)',
                                }}>
                                <div className="d-flex justify-content-between pb-4">
                                    <div>
                                        <h4>Almashinuvlar soni</h4>
                                        <span>(Butun davr mobaynida)</span>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-retweet fa-2x text-danger"></i>
                                    </div>
                                </div>
                                {data?.total_exchanges ||
                                    data?.total_exchanges === 0 ? (
                                    <h4 className="mt-5">
                                        {addPeriodToThousands(
                                            data?.total_exchanges
                                        )}{' '}
                                        ta
                                    </h4>
                                ) : (
                                    <div
                                        className="spinner-border mt-5"
                                        role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* <div>
                            <div
                                className=" bg-white py-5 px-4 "
                                style={{
                                    width: '290px',
                                    height: '170px',
                                    borderRadius: '5px',
                                    boxShadow:
                                        '5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)',
                                }}>
                                <div className="d-flex justify-content-between pb-4">
                                    <div>
                                        <h4>Aktiv sotuvchilar</h4>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-shop fa-2x text-primary"></i>
                                    </div>
                                </div>
                                {data?.total_shops ||
                                    data?.total_shops === 0 ? (
                                    <h4 className="mt-5 pt-4 ">
                                        {addPeriodToThousands(
                                            data?.total_shops
                                        )}{' '}
                                        ta
                                    </h4>
                                ) : (
                                    <div
                                        className="spinner-border mt-5 pt-4"
                                        role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div> */}
                    </div>
                ) : (
                    <div className="pb-4  d-flex gap-3 overflow-x-scroll step-1">
                        <div>
                            <div
                                className=" bg-white py-5 px-4"
                                style={{
                                    width: '290px',
                                    height: '170px',
                                    borderRadius: '5px',
                                    boxShadow:
                                        '5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)',
                                }}>
                                <div className="d-flex justify-content-between pb-4">
                                    <div>
                                        <h4>Jami daromad</h4>
                                        <span>(Butun davr mobaynida)</span>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-money-check-dollar fa-2x text-warning"></i>
                                    </div>
                                </div>
                                {data?.all_revenue ||
                                    data?.all_revenue === 0 ? (
                                    <h4 className="mt-5 ">
                                        {' '}
                                        <i className="fa-solid fa-coins text-warning"></i>{' '}
                                        {addPeriodToThousands(
                                            data?.all_revenue
                                        )}{' '}
                                        so'm
                                    </h4>
                                ) : (
                                    <div
                                        className="spinner-border mt-5"
                                        role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div
                                className=" bg-white py-5 px-4"
                                style={{
                                    width: '290px',
                                    height: '170px',
                                    borderRadius: '5px',
                                    boxShadow:
                                        '5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)',
                                }}>
                                <div className="d-flex justify-content-between pb-4">
                                    <div>
                                        <h4>Jami daromad</h4>
                                        <span>(Oxirgi 30 kun)</span>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-hand-holding-dollar fa-2x text-success"></i>
                                    </div>
                                </div>
                                {data?.last_month_revenue ||
                                    data?.last_month_revenue === 0 ? (
                                    <h4 className="mt-5 ">
                                        {' '}
                                        <i className="fa-solid fa-coins text-warning"></i>{' '}
                                        {addPeriodToThousands(
                                            data?.last_month_revenue
                                        )}{' '}
                                        so'm
                                    </h4>
                                ) : (
                                    <div
                                        className="spinner-border mt-5"
                                        role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div
                                className=" bg-white py-5 px-4  "
                                style={{
                                    width: '290px',
                                    height: '170px',
                                    borderRadius: '5px',
                                    boxShadow:
                                        '5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)',
                                }}>
                                <div className="d-flex justify-content-between pb-4">
                                    <div>
                                        <h4>Bugungi daromad</h4>
                                        <span>(Bugungi daromad)</span>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-sack-dollar fa-2x text-warning"></i>
                                    </div>
                                </div>
                                {data?.today_revenue ||
                                    data?.today_revenue === 0 ? (
                                    <h4 className="mt-5">
                                        {' '}
                                        <i className="fa-solid fa-coins text-warning"></i>{' '}
                                        {addPeriodToThousands(
                                            data?.today_revenue
                                        )}{' '}
                                        so'm
                                    </h4>
                                ) : (
                                    <div
                                        className="spinner-border mt-5"
                                        role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div
                                className=" bg-white py-5 px-4 "
                                style={{
                                    width: '290px',
                                    height: '170px',
                                    borderRadius: '5px',
                                    boxShadow:
                                        '5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)',
                                }}>
                                <div className="d-flex justify-content-between pb-4">
                                    <div>
                                        <h4>Jami buyurtma</h4>
                                        <span>(Butun davr mobaynida)</span>
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-truck fa-2x text-danger"></i>
                                    </div>
                                </div>
                                {data?.total_order ||
                                    data?.total_order === 0 ? (
                                    <h4 className="mt-5">
                                        {addPeriodToThousands(
                                            data?.total_order
                                        )}{' '}
                                        ta
                                    </h4>
                                ) : (
                                    <div
                                        className="spinner-border mt-5"
                                        role="status">
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className="row pb-5 mt-5"
                    style={{ alignItems: 'flex-start' }}>
                    <SidebarLayout accountLinks={accountLinks}>
                        <h4 className='text-center bg-white p-4 m-0 '>Sotilgan mahsulotlar</h4>
                        <Table
                            scroll={{ x: 1350 }}
                            dataSource={dataOrders}
                            columns={columnsOrders}
                            pagination={false}
                            loading={orderLoading}
                        />
                        {pageCount > 1 && <Pagination
                            className="mt-3"
                            total={pageCount}
                            defaultCurrent={currPage}
                            onChange={handlePagination}
                        />}
                    </SidebarLayout>
                </div>
            </div>
        </section>
    );
}

export default BirjaDashbordList;
