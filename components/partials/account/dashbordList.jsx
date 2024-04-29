import React, { useState, useEffect } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Select, Table } from 'antd';
import CalculateTimeDifference from './DateFormatter';
import { useSelector } from 'react-redux';
import PartialDescription from '~/components/elements/detail/description/PartialDescription';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
const { TabPane } = Tabs;
import { Tabs } from 'antd';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import Link from 'next/link';
import Example from './Chart';

function DashbordList({ setOpen }) {
    const [data, setData] = useState([]);
    const [dataOrders, setDataOrders] = useState([]);
    const [dataProducts, setDataProducts] = useState([]);
    const [View, setView] = useState({});
    const [pageCount2, setPageCount2] = useState(0);
    const [currPage, setCurrPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(null);

    const { accountLinks, user } = useSelector((state) => state.auth);
    // Birinchi marta kirgan bolsa id===0 bo'ladi , aks holda 1
    // const{ id }= useSelector(state => state.auth.beginRole)

    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    async function GetItemsProducts() {
        const ItemsData = await GetRepository.getSellerDashbord(user?.access);
        if (ItemsData) {
            setData(ItemsData);
        }
    }
    async function GetItemsProductsPopular() {
        const ItemsData = await GetRepository.getPopularProducts(user?.access);
        if (ItemsData) {
            setDataProducts(ItemsData);
        }
    }

    async function GetItemsProductsOrders(page) {
        setCurrPage(page);
        const ItemsData = await GetRepository.getOrdersListsDashbord(
            page,
            user?.access
        );
        if (ItemsData?.results) {
            setPageCount2(ItemsData.count);
            setDataOrders([...ItemsData.results]);
        }
    }
    async function handleClickView(item) {
        setLoading(true);
        const ItemsData = await GetRepository.getPopularProductsView(
            item.id,
            user?.access
        );
        setView(ItemsData);
        setLoading(false);
    }

    // const handlePagination = (pageNum) => {
    //     setCurrPage(pageNum)
    //     GetItems(pageNum, dataValCat, dataValStatus, dataFormat, null, dateArxiv,)
    // }

    // const handlePagination2 = (pageNum) => {
    //     setCurrPage(pageNum)
    //     GetItemsProductsOrders(pageNum)
    // }

    const handleChangeYear = (value) => {
        setYear(+value);
    };
    const handleChangeMonth = (value) => {
        setMonth(value);
    };

    useEffect(() => {
        GetItemsProducts();
        GetItemsProductsOrders(1);
        GetItemsProductsPopular();
    }, []);

    const columns = [
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'age',
            width: 350,
        },
        {
            title: 'Sotuvchi',
            dataIndex: 'seller_info',
            key: 'address',
            render: (seller_info) => (
                <div className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        {' '}
                        {seller_info.name}
                    </span>
                    <span className="truncate whitespace-nowrap">
                        {' '}
                        {seller_info.email_or_phone}
                    </span>
                </div>
            ),
        },
        {
            title: 'Buyurtmalar ',
            dataIndex: 'total_approved',
            key: 'address',
            render: (total_approved) => (
                <span>
                    {' '}
                    <i className="fa-solid fa-box"></i> {total_approved}
                </span>
            ),
        },
        {
            title: 'Narx',
            dataIndex: 'discount_price',
            key: 'age',
            render: (discount_price) => (
                <span>
                    <i className="fa-solid fa-coins text-warning"></i>{' '}
                    {addPeriodToThousands(discount_price)}
                </span>
            ),
        },
        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => (
                <a
                    data-bs-target="#staticBackdropViewPopular"
                    data-bs-toggle="modal">
                    <i
                        className="fa-solid fa-eye text-success-emphasis mx-5"
                        onClick={() =>
                            handleClickView(
                                dataProducts.find((item) => item.id === id)
                            )
                        }></i>
                </a>
            ),
        },
    ];

    const columnsOrders = [
        {
            title: 'Buyurtmachi',
            dataIndex: 'customer_info',
            key: 'age',
            render: (customer_info) => (
                <div className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        {' '}
                        {customer_info.name}
                    </span>
                    <span className="truncate whitespace-nowrap"> {customer_info.email_or_phone}</span>
                </div>
            ),
        },
        user?.role === 'admin' ? (
            {
                title: 'Sotuvchi',
                dataIndex: 'seller_info',
                key: 'age',
                render: (seller_info) => (
                    <a href={`/sellerAccount/${seller_info?.id}`} className="d-flex flex-column">
                        <span className="truncate whitespace-nowrap">
                            {' '}
                            {seller_info.name}
                        </span>
                        <span className="truncate whitespace-nowrap">
                            {' '}
                            {seller_info.email_or_phone}
                        </span>
                    </a>
                ),
            }
        ) : (
            <></>
        ),
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
        user.role === 'admin' ? (
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
            }
        ) : (
            <></>
        ),
        user.role === 'admin' ? (
            {
                title: "To\'lov turi ",
                dataIndex: 'provider',
                key: 'address',
                render: (provider) => (
                    <span>
                        {provider === 'card_data' ? (
                            <span>
                                <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                karta orqali
                            </span>
                        ) : provider === 'click' ? (<span>
                            <i className="fa-solid text-success fa-circle-check"></i>{' '}
                            click orqali
                        </span>) : provider === 'payme' ? (
                            <span>
                                <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                payme orqali
                            </span>
                        ) : " "}
                    </span>
                ),
            }
        ) : (
            <></>
        ),

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
        {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status) => (
                <span>
                    {status === 'approved' ? (
                        <span>
                            <i className="fa-solid text-success fa-circle-check"></i>{' '}
                            tasdiqlangan
                        </span>
                    ) : (
                        <span>
                            <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
                            tasdiqlanganmagan
                        </span>
                    )}
                </span>
            ),
        },
    ];

    const columnsOrdersSeller = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'age',
            render: (customer_info) => (
                <div className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        #{customer_info}
                    </span>
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
        {
            title: 'Narx',
            dataIndex: 'price',
            key: 'address',
            render: (price) => (
                <span>
                    <i className="fa-solid fa-coins text-warning"></i>{' '}
                    {addPeriodToThousands(price)}
                </span>
            ),
        },
        {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status) => (
                <span>
                    {status === 'approved' ? (
                        <span>
                            <i className="fa-solid text-success fa-circle-check"></i>{' '}
                            tasdiqlangan
                        </span>
                    ) : (
                        <span>
                            <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
                            tasdiqlanganmagan
                        </span>
                    )}
                </span>
            ),
        },
    ];

    const labels = [
        { name: 'Yanvar', value: '01' },
        { name: 'Fevral', value: '02' },
        { name: 'Mart', value: '03' },
        { name: 'Aprel', value: '04' },
        { name: 'May', value: '05' },
        { name: 'Iyun', value: '06' },
        { name: 'Iyul', value: '07' },
        { name: 'Avgust', value: '08' },
        { name: 'Sentyabr', value: '09' },
        { name: 'Oktyabr', value: '10' },
        { name: 'Noyabr', value: '11' },
        { name: 'Dekabr', value: '12' },
    ];

    return (
        <section className="ps-my-account ps-page--account p-0">
            <p className='step-0 m-0'></p>
            <div className="container">
                {window.innerWidth > 1000 && <div style={{ textAlign: 'end', marginBottom: '6px' }}>
                    <p className='m-0 d-inline' style={{ cursor: 'pointer' }} onClick={() => setOpen(true)}><i className='fa-regular fa-circle-question'></i> Saytdan foydalanish bo'yicha savolingiz bormi?</p>
                </div>}
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
                                {data?.all_revenue || data?.all_revenue == 0 ? (
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
                        </div>
                    </div>
                ) : (
                    <div
                        className="pb-4  d-flex gap-3 overflow-x-scroll step-1">
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
                    <div className="col-lg-4" id='panel' >
                        <div className="ps-page__left" >
                            <AccountMenuSidebar
                                data={accountLinks}
                            />
                        </div>
                    </div>

                    <div className="col-lg-8 pb-5">
                        {user?.role === 'admin' && (
                            <div className="dashboard-div mb-2">
                                <Select
                                    defaultValue={{
                                        value: +year,
                                        label: `${+year}-yil bo'yicha hisobotlar`,
                                    }}
                                    style={{
                                        width: 300,
                                    }}
                                    onChange={handleChangeYear}
                                    options={[
                                        2023, 2024, 2025, 2026, 2027, 2028,
                                        2029, 2030, 2031, 2032, 2033,
                                    ].map((el) => ({
                                        value: +el,
                                        label: `${+el}-yil bo'yicha hisobotlar`,
                                    }))}
                                    className="me-2"
                                />
                                <Select
                                    defaultValue={{
                                        label: `Barcha oy ma'lumotlari`,
                                        value: null,
                                    }}
                                    style={{
                                        width: 300,
                                    }}
                                    onChange={handleChangeMonth}
                                    options={[
                                        {
                                            label: `Barcha oy ma'lumotlari`,
                                            value: null,
                                        },
                                        ...labels.map((el) => ({
                                            label: `${el.name} oyi ma'lumotlari`,
                                            value: el.value,
                                        })),
                                    ]}
                                />
                            </div>
                        )}

                        {user?.role === 'admin' && (
                            <div className="dashboard-div">
                                <Example year={year} month={month} />
                            </div>
                        )}
                        <div className="pb-5">
                            <h4
                                className="bg-white m-0 text-center py-4">
                                So'nggi buyurtmalar
                            </h4>
                            {user?.role == 'admin' ? (
                                <>
                                    <Table
                                        scroll={{ x: 1600 }}
                                        dataSource={dataOrders}
                                        columns={columnsOrders}
                                        pagination={false}
                                    />
                                    {/* <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount2} onChange={handlePagination2} /> */}
                                </>
                            ) : (
                                <>
                                    <Table
                                        scroll={{ x: 1150 }}
                                        dataSource={dataOrders}
                                        columns={columnsOrdersSeller}
                                        pagination={false}
                                    />
                                    {/* <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount2}
                                            onChange={GetItemsProductsOrders} /> */}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {user?.role === 'admin' ? (
                    <div>
                        <h4 className="bg-white m-0 text-center py-4">
                            Ommabop mahsulotlar
                        </h4>
                        <Table
                            scroll={{ x: 1250 }}
                            dataSource={dataProducts}
                            columns={columns}
                            className="pb-5"
                            pagination={false}
                        />
                        {/* <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount} onChange={handlePagination} /> */}
                    </div>
                ) : (
                    <></>
                )}
                <div
                    className="modal fade "
                    id="staticBackdropViewPopular"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true">
                    <div className="modal-dialog container ">
                        <div className="modal-content">
                            <div className="d-flex justify-content-end p-3">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div className="ps-container">
                                {!loading ? (
                                    <div className="ps-product--detail ps-product--fullwidth">
                                        <div className="ps-product__header ">
                                            <ThumbnailDefault product={View} />
                                            <div className="ps-product__info">
                                                <header>
                                                    <h1>{View?.title}</h1>
                                                    <h4>
                                                        {addPeriodToThousands(
                                                            View?.price
                                                        )}{' '}
                                                        so'm{' '}
                                                    </h4>
                                                </header>
                                                <div>
                                                    {View?.seller ? (
                                                        <h4>
                                                            {' '}
                                                            Muallif :{' '}
                                                            {
                                                                View?.seller
                                                                    ?.first_name
                                                            }{' '}
                                                            {
                                                                View?.seller
                                                                    ?.last_name
                                                            }
                                                        </h4>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <ModuleProductDetailDescription
                                                    product={View}
                                                />
                                                <div className="ps-product__shopping row-gap-3">
                                                    <button
                                                        className="ps-btn ps-btn--black"
                                                        style={{
                                                            cursor: 'not-allowed',
                                                        }}>
                                                        Savatga qo'shish
                                                    </button>
                                                    <button
                                                        className="ps-btn"
                                                        style={{
                                                            cursor: 'not-allowed',
                                                        }}>
                                                        Sotib olish
                                                    </button>
                                                    <div className="ps-product__actions">
                                                        <a
                                                            style={{
                                                                cursor: 'not-allowed',
                                                            }}>
                                                            <i
                                                                className={`icon-heart`}></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                                    {View?.tag?.length > 0 ? (
                                                        <p>
                                                            {' '}
                                                            {View?.tag?.map(
                                                                (item) => (
                                                                    <span
                                                                        key={
                                                                            item.id
                                                                        }>
                                                                        #
                                                                        {
                                                                            item.name
                                                                        }{' '}
                                                                    </span>
                                                                )
                                                            )}{' '}
                                                        </p>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                                    {View?.deactive_tag
                                                        ?.length > 0 ? (
                                                        <p>
                                                            {' '}
                                                            <strong>
                                                                Aktiv emas
                                                                teglar:{' '}
                                                            </strong>{' '}
                                                            {View?.deactive_tag?.map(
                                                                (item) => (
                                                                    <span
                                                                        key={
                                                                            item.id
                                                                        }>
                                                                        #
                                                                        {
                                                                            item.name
                                                                        }{' '}
                                                                    </span>
                                                                )
                                                            )}{' '}
                                                        </p>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ps-product__content ps-tab-root">
                                            <Tabs defaultActiveKey="1">
                                                <TabPane tab="Izoh" key="1">
                                                    <PartialDescription
                                                        product={View}
                                                    />
                                                </TabPane>
                                            </Tabs>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="ps-product--detail ps-product--fullwidth"
                                        style={{
                                            height: '690px',
                                            display: 'grid',
                                            placeContent: 'center',
                                        }}>
                                        <div
                                            className="spinner-border "
                                            role="status"
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                            }}>
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashbordList;
