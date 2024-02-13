import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import { Pagination, Select, Table } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useSelector } from 'react-redux';
import CalculateTimeDifference from '~/components/partials/account/DateFormatter';
import { useRouter } from 'next/router';
import ChartSeller from '~/components/partials/account/ChartSeller';

const SellerAccount = ({ seller }) => {
    const [data, setData] = useState([]);
    const [dashboardData, setDashboardData] = useState([]);
    // const [search, setSerach] = useState([]);
    // const [deleteIdEdit, setDeleteIdEdit] = useState(null);
    // const [selectVal, setSelectVal] = useState(null);
    // const [selectValStatus, setSelectValStatus] = useState('');
    const [tableData, setTableData] = useState([]);
    const router = useRouter();
    const { pid } = router.query;
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);

    const { user } = useSelector((state) => state.auth);

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(null);

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
        console.log('val', val);
        if (user?.access) {
            const ItemsData = await GetRepository.getSellerLists(
                pid,
                user?.access
            );
            // setPageCount(ItemsData.count);
            setData(ItemsData);
            setTableData(ItemsData.documents);
        }
    }

    useEffect(() => {
        if (user?.access && pid) {
            GetSellerList(pid, user?.access);
            getDashboardData(pid, user?.access);
        }
    }, [pid]);

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
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span>
                    {status === 'approved' ? (
                        <span>
                            <i className="fa-solid text-success fa-circle-check"></i>{' '}
                            Faol
                        </span>
                    ) : (
                        <span>
                            <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
                            Faol emas
                        </span>
                    )}
                </span>
            ),
        }
    ];

    return (
        <PageContainer>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <Meta
                title={`Soff | ${data?.full_name} } `}
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
                                {data?.image ? (
                                    <img
                                        src={`${data?.image}`}
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
                                        <div className="inviter_user__items">
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
                                        <Table
                                            dataSource={tableData}
                                            scroll={{ x: 800 }}
                                            columns={columns}
                                            pagination={false}
                                        />
                                        {/* <Pagination
                                            total={pageCount}
                                            defaultCurrent={currPage}
                                            className="my-3"
                                            onChange={(val) =>
                                                GetSellerList(
                                                    val
                                                )
                                            }
                                        /> */}
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

export default SellerAccount;
