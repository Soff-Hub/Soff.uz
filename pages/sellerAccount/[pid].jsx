import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import { baseUrl } from '~/repositories/Repository';
import Product from '~/components/elements/products/Product';
import Meta from '~/components/shared/headers/Meta';
import { Pagination, Table } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useSelector } from 'react-redux';
import CalculateTimeDifference from '~/components/partials/account/DateFormatter';

const SellerAccount = ({ seller }) => {
    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [deleteIdEdit, setDeleteIdEdit] = useState(null);
    const [selectVal, setSelectVal] = useState(null);
    const [selectValStatus, setSelectValStatus] = useState('');
    const [customers_count, setCustomers_Count] = useState('');

    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);

    const { user } = useSelector((state) => state.auth);

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: false ? seller?.results[0]?.seller?.first_name : 'Loading...',
        },
    ];

    async function GetItemsUsers(page, status, search) {
        setCurrPage(page);
        const ItemsData = await GetRepository.getUsersLists(
            page,
            status,
            search,
            user?.access
        );
        setPageCount(ItemsData.count);
        setData([...ItemsData.results]);
        setCustomers_Count(ItemsData.count);
    }

    useEffect(() => {
        GetItemsUsers(currPage, selectValStatus, search);
    }, [selectValStatus]);

    const columns = [
        {
            title: 'Mahsulotlar',
            dataIndex: 'first_name',
            key: 'age',
            render: (title) => (
                <span className="truncate whitespace-nowrap"> {title}</span>
            ),
        },
        {
            title: 'Xaridor',
            dataIndex: 'data',
            key: 'address',
            render: (data) => (
                <div className="d-flex flex-column">
                    {data.phone === 'None' ? (
                        <></>
                    ) : (
                        <span className="truncate whitespace-nowrap">
                            {' '}
                            {data.phone}
                        </span>
                    )}
                    {data.email === 'None' ? (
                        <></>
                    ) : (
                        <span className="truncate whitespace-nowrap">
                            {' '}
                            {data.email}
                        </span>
                    )}
                </div>
            ),
        },
        {
            title: "Yuklangan sana / Sotilgan sana ",
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <span key={created_at}>
                    {' '}
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    <CalculateTimeDifference targetDate={created_at} />
                </span>
            ),
        },
        {
            title: 'Arizalari',
            dataIndex: 'purchased_count',
            key: 'purchased_count',
            render: (purchased_count) => (
                <span className="truncate whitespace-nowrap">
                    {' '}
                    {purchased_count === 0 ? 0 : purchased_count + ' ta'}
                </span>
            ),
        },
        {
            title: 'Holat',
            dataIndex: 'auth_status',
            key: 'address',
            render: (auth_status) => (
                <span>
                    {auth_status === 'code_verified' ? (
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
        },
        // {
        //     title: 'Harakatlar',
        //     dataIndex: 'id',
        //     key: 'address',
        //     render: (id) => <div >
        //         {
        //             data.some(el => el.id == id && el.auth_status === 'new') ?
        //                 <a data-bs-target="#exampleModalTogglEdit" data-bs-toggle="modal"><i className="fa-solid fa-user-pen mx-4 text-success-emphasis" onClick={() => setDeleteIdEdit(data.find(item => item.id === id))}></i></a>
        //                 : <></>
        //         }
        //     </div>
        // },
    ];

    return (
        <PageContainer>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <Meta
                title={`Soff | Sotuvchi ${seller?.results[0]?.seller?.first_name} ${seller?.results[0]?.seller?.last_name}`}
                description={`Saytimizga o'z mahsulotlarini sotuvga qo'yayotgan ${seller?.results[0]?.seller?.first_name} ${seller?.results[0]?.seller?.last_name}ning barcha mahsulotlarini ko'rishingiz mumkin`}
            />

            <div className="ps-product-list mb-5">
                <div className="container">
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
                                {false ? (
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
                                {false ? (
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
                                {false ? (
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
                                {false ? (
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

                    <h4 className="pt-5 col-lg-12 d-flex align-items-center gap-5">
                        <i className=" fa-3x text-info fa-solid fa-circle-user"></i>
                        <span> Doniyor Eshmamatov</span> |
                        edoniyorbekdev@gmail.com |
                        <span> 7/23 ta</span>
                    </h4>

                    <div className="row ">
                        <div className="col-lg-12 pb-5">
                            <div className="ps-page__content">
                                <div className="ps-section--account-setting">
                                    <div className="ps-section__content">
                                        <Table
                                            dataSource={data}
                                            scroll={{ x: 900 }}
                                            columns={columns}
                                            pagination={false}
                                        />
                                        <Pagination
                                            total={pageCount}
                                            defaultCurrent={currPage}
                                            className="my-3"
                                            onChange={(val) =>
                                                GetItemsUsers(
                                                    val,
                                                    selectValStatus
                                                )
                                            }
                                        />
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

export async function getServerSideProps({ query }) {
    const resquest = await fetch(
        `http://192.168.1.24/api/v1/seller/admin/seller-detail/${query.pid}`
    );
    const seller = await resquest.json();

    return {
        props: {
            seller,
        },
    };
}

export default SellerAccount;
