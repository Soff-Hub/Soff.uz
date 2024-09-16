import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import { Select, Table, Tabs, Tooltip } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useSelector } from 'react-redux';
import CalculateTimeDifference from '~/components/partials/account/DateFormatter';
import { useRouter } from 'next/router';
import ChartSeller from '~/components/partials/account/ChartSeller';
import NextImageCard from '~/components/nextImagecard';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
import axios from 'axios';
import { orginalUrl } from '~/reositoriy-admin/Repository';

const SellerAccount = ({ pid }) => {
    const [data, setData] = useState([]);
    const [dashboardData, setDashboardData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [tableDataOffer, setTableDataOffer] = useState([]);
    const [transactions, setRtansactions] = useState([])
    const [donates, setDonates] = useState([])
    const router = useRouter();

    const { user } = useSelector((state) => state.auth);

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(null);
    const [yearGet, setYearGet] = useState([]);





    const handleChangeYear = (value) => {
        setYear(+value);
    };
    const handleChangeMonth = (value) => {
        setMonth(value);
    };

    const getDashboardData = async (id, token) => {
        if (token) {
            const ItemsData = await GetRepository.getSellerDashboard(id, token);
            setDashboardData(ItemsData);
        }
    };

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: data ? data?.full_name : 'Loading...',
        },
    ];

    async function GetSellerList(val) {
        if (user?.access) {
            const ItemsData = await GetRepository.getSellerLists(
                pid,
                user?.access
            );
            // setPageCount(ItemsData.count);
            setData(ItemsData);
            setTableData(ItemsData.documents);
            setTableDataOffer(ItemsData.offer_list);
        }
    }

    async function GetItemsSeller_Yearch() {
        const ItemsData = await GetRepository.getSellerDashbordYearch(user?.access, pid);
        if (ItemsData) {
            setYearGet(ItemsData);
        }
    }

    const getTransactions = async () => {
        const resp = await axios.get(orginalUrl + `auctions/payment_transfer_history/${pid}`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            }
        })
        setRtansactions(resp.data?.results);
    }

    const getDonates = async () => {
        const resp = await axios.get(orginalUrl + `seller/admin/donates/${pid}`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            }
        })
        setDonates(resp.data?.results);
    }

    useEffect(() => {
        if (user?.access) {
            GetSellerList(pid, user?.access);
            getDashboardData(pid, user?.access);
            GetItemsSeller_Yearch()
            getTransactions()
            getDonates()
        }

    }, [user?.access]);


    const columns = [
        {
            title: 'Mahsulot',
            dataIndex: 'title',
            key: 'title',
            width: 350,
            render: (title) => (
                <span className="truncate whitespace-nowrap"> {title}</span>
            ),
        },
        {
            title: 'Yuklangan sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <span key={created_at}>
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    <CalculateTimeDifference targetDate={created_at} />
                </span>
            ),
        },
        {
            title: 'Buyurtmalar soni',
            dataIndex: 'approved_count',
            key: 'approved_count',
            render: (approved_count) => (
                <span key={approved_count}>
                    {approved_count !== 0 ? approved_count + ' ta' : 0}
                </span>
            ),
        },
        {
            title: 'Holat',
            dataIndex: 'data_status',
            key: 'address',
            render: (datastatus) =>
                datastatus?.status === 'moderation' ? (
                    <span>
                        <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                        Moderatsiya
                    </span>
                ) : datastatus?.status === 'approved' ? (
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
                ) : datastatus?.status === 'deleted' ? (
                    <span>
                        <i className="fa-solid fa-inbox text-danger"></i>{' '}
                        Arxivlangan
                    </span>
                ) : (
                    <></>
                ),
        },
    ];

    const columnsOffer = [
        {
            title: 'Summa',
            dataIndex: 'amount',
            key: 'address',
            render: (price) => (
                <span><i className="fa-solid fa-coins text-warning"></i>  {addPeriodToThousands(price)} so'm</span>
            )
        },
        {
            title: 'Karta raqam',
            dataIndex: 'credit_card',
            key: 'address',
        },
        {
            title: 'Tavsif',
            dataIndex: 'description',
            key: 'address',
            width: 350,
        },
        {
            title: 'Chek',
            dataIndex: 'receipt',
            key: 'address',
            render: (image) => (
                <div>
                    {
                        image ?
                            <a href={image} download target='_blank'>
                                <NextImageCard url={image} clasS=' rounded-3 mb-2' width='74px' height='46px' />
                            </a>
                            :
                            <i className="fa-solid fa-file fa-2x"></i>
                    }
                </div>
            ),
        },
        {
            title: ' Yuborilgan sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span key={created_at}> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        },
        {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status) => (
                status === "moderation" ?
                    (<span><i className="text-primary-emphasis fa-solid fa-circle-info"></i> Moderatsiya</span>) :
                    status === 'approved' ?
                        (<span><i className="fa-solid text-success fa-circle-check"></i> Tasdiqlangan</span>) :
                        status === 'cancelled' ?
                            (<span><i className="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan</span>) :
                            <></>
            ),
        },
    ];

    const columnsDonate = [
        {
            title: 'Summa',
            dataIndex: 'amount_paid',
            key: 'address',
            render: (price) => (
                <span><i className="fa-solid fa-coins text-warning"></i>  {addPeriodToThousands(+price)} so'm</span>
            )
        },
        {
            title: 'Ism',
            dataIndex: 'user',
            key: 'address',
        },
        {
            title: 'Izoh',
            dataIndex: 'description',
            key: 'address',
            width: 350,
        },
        {
            title: 'Sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span key={created_at}> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        }
    ];

    const columnsTransactions = [
        {
            title: 'Izoh',
            dataIndex: 'description',
            key: 'address',
            width: 350
        },
        {
            title: 'Summa',
            dataIndex: 'amount',
            key: 'address',
            render: (amount, item) => (
                <div style={{ color: item?.type === 'income' ? 'green' : 'red' }} className='d-flex align-items-center'>
                    <div>
                        <i class={`fa-solid fa-angles-${item?.type === 'income' ? 'down' : 'up'} m-0 p-0 fs-6`}></i>
                    </div>
                    <div className='ms-2 d-flex'>{addPeriodToThousands(amount)} so'm</div>
                </div>
            )
        },
        {
            title: 'Sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span key={created_at}> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        }
    ];

    const items = [
        {
            key: '1',
            label: <span style={{ marginRight: "30px", fontSize: "16px", fontWeight: "600" }} >Sotuvchi mahsulotlari</span>,
            children: <Table
                dataSource={tableData}
                scroll={{ x: 800 }}
                columns={columns}
                pagination={false}
            />,


        },
        {
            key: '2',
            label: <span style={{ marginRight: "30px", fontSize: "16px", fontWeight: "600" }} >Sotuvchi Arizalari</span>,
            children: <div>

                <Table
                    scroll={{ x: 1250 }}
                    dataSource={tableDataOffer}
                    columns={columnsOffer}
                    className="pb-5"
                    pagination={false}
                />
            </div>,
        },
        {
            key: '3',
            label: <span style={{ marginRight: "30px", fontSize: "16px", fontWeight: "600" }} >Donatlar ro'yxati</span>,
            children: <div>
                <Table
                    dataSource={donates}
                    columns={columnsDonate}
                    className="pb-5"
                    pagination={false}
                />
            </div>,
        },
        {
            key: '4',
            label: <span style={{ marginRight: "30px", fontSize: "16px", fontWeight: "400" }} >Tranzaksiyalar</span>,
            children: <div>
                <Table
                    dataSource={transactions}
                    columns={columnsTransactions}
                    className="pb-5"
                    pagination={false}
                />
            </div>,
        },
    ]


    return (
        <PageContainer>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <Meta
                title={`${data?.full_name} `}
                description={`Saytimizga o'z mahsulotlarini sotuvga qo'yayotgan ${data?.full_name} ning barcha mahsulotlarini ko'rishingiz mumkin`}
            />
            <div className="ps-product-list color-seller-background">
                <div className="container">
                    <div className="py-4  d-flex gap-3 overflow-x-scroll">
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
                                {dashboardData?.total_approved_amount >= 0 ? (
                                    <h4 className="mt-5 ">
                                        {' '}
                                        <i className="fa-solid fa-coins text-warning"></i>{' '}
                                        {addPeriodToThousands(
                                            dashboardData?.total_approved_amount
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
                                {dashboardData?.days_approved_amount_30 >= 0 ? (
                                    <h4 className="mt-5 ">
                                        {' '}
                                        <i className="fa-solid fa-coins text-warning"></i>{' '}
                                        {addPeriodToThousands(
                                            dashboardData?.days_approved_amount_30
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
                                {dashboardData?.todays_approved_amount >= 0 ? (
                                    <h4 className="mt-5">
                                        {' '}
                                        <i className="fa-solid fa-coins text-warning"></i>{' '}
                                        {addPeriodToThousands(
                                            dashboardData?.todays_approved_amount
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
                                {dashboardData?.total_approved_count >= 0 ? (
                                    <h4 className="mt-5">
                                        {addPeriodToThousands(
                                            dashboardData?.total_approved_count
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
                    <div className="row my-5">
                        <div className="col-12 my-2"></div>
                        <div className="col-lg-4 user-inviter">
                            <div className="d-flex gap-3 align-items-start">
                                {/* <i className=" fa-3x text-info fa-solid fa-circle-user mb-3"></i> */}
                                {data?.image_url ? (
                                    <img
                                        src={`${data?.image_url}`}
                                        className="profile__image"
                                    />
                                ) : (
                                    <i className=" fa-3x text-info fa-solid fa-circle-user mb-3"></i>
                                )}
                                <div>
                                    <h4 className="m-0">{data?.full_name}</h4>
                                    <span className="mb-4 d-block">
                                        {' '}
                                        {data?.email_or_phone}
                                    </span>
                                </div>
                            </div>
                            <h4 className={Number(data?.wallet) < 10000 ? 'text-danger' : "text-success"}> - Balans {
                                addPeriodToThousands(data?.wallet)
                            } so'm{' '}</h4>
                            <div className='mb-2'>
                                <h4>- Ro'yxatdan o'tgan vaqti </h4>
                                <span className='fs-4 mx-4 '> <CalculateTimeDifference targetDate={data?.created_at} /></span>
                            </div>

                            <h4>
                                {' '}
                                - Jami mahsulotlari soni {
                                    data?.total_product
                                }{' '}
                                ta
                            </h4>
                            <h4>
                                {' '}
                                - Taklif orqali daromad {
                                    data?.inviter_wallet
                                }{' '}
                                so'm{' '}
                            </h4>
                            <h4>
                                {' '}
                                - Taklif qilinganlar soni{' '}
                                {data?.inviter_users?.length
                                    ? data?.inviter_users?.length + ' ta'
                                    : 0}{' '}
                            </h4>
                            <div className="inviter_user__container">
                                {data?.inviter_users?.map((el, i) => (
                                    <>
                                        <div key={el?.full_name} className="inviter_user__items">
                                            <p>
                                                {' '}
                                                - {el.full_name} {'  '}
                                                {el.auth_status ===
                                                    'code_verified' ? (
                                                    <i className="fa-solid text-success fa-circle-check"></i>
                                                ) : (
                                                    <i className="fa-solid fa-circle-xmark text-danger"></i>
                                                )}
                                            </p>
                                            <span>{el.email_or_phone}</span>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                        <div className="col-8">
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
                                    options={yearGet?.map((el) => ({
                                        value: +el?.year,
                                        label: `${+el?.year}-yil bo'yicha hisobotlar`,
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
                                        ...yearGet
                                            ?.filter(item => item?.year === year)
                                            .map(item => item?.months?.map((el) => ({
                                                label: `${el.name} oyi ma'lumotlari`,
                                                value: el.value,
                                            })))[0] || []
                                    ]}
                                />
                            </div>
                            <div className="dashboard-div">
                                <ChartSeller year={year} month={month} />
                            </div>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-lg-12 pb-5">
                            <div className="ps-page__content">
                                <div className="ps-section--account-setting">
                                    <div className="ps-section__content">
                                        <Tabs defaultActiveKey="1" items={items} className='bg-white ' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export async function getServerSideProps(context) {
    const { params } = context;

    return {
        props: {
            pid: params?.pid
        },
    };
}

export default SellerAccount;
