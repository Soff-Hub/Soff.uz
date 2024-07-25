import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';

import { DatePicker, Pagination, Select, Table, Tabs } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import CalculateTimeDifference from './DateFormatter';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import useDebounce from '~/hooks/useDebounce';
import { addPeriodToThousands } from './ProductsLists';

function OrdersLists() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const { RangePicker } = DatePicker;

    const [data, setData] = useState([]);
    const [search, setSerach] = useState('');
    const [userRole, setUserRole] = useState('');
    const [selector, setSelector] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const searchDebounce = useDebounce(search, 1000);
    const [dataPlayLists, setDataPlayLists] = useState([]);
    const [lifeTime, setLifetime] = useState('');
    const [lifeTime1, setLifetime2] = useState('');


    const handleChange = (date) => {

        if (date?.[0]) {
            setLifetime(date[0].format('YYYY-MM-DD'));
            setLifetime2(date[1].format('YYYY-MM-DD'));
        } else {
            setLifetime('');
            setLifetime2('');
        }
    };
    const dataFormat = `${lifeTime}&end_date=${lifeTime1}`;



    async function GetItemsProducts(page, status, date, searchVal, userRole) {
        const ItemsData = await GetRepository.getOrdersLists(
            page,
            status,
            date,
            searchVal,
            user?.access,
            userRole
        );
        if (ItemsData?.results) {
            setPageCount(ItemsData.count);
            setData([...ItemsData.results]);
        }
    }


    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
        GetItemsProducts(pageNum, selector, dataFormat, search, userRole);
    };

    useEffect(() => {
        GetItemsProducts(currPage, selector, dataFormat, search, userRole);
    }, [currPage, selector, dataFormat, searchDebounce, userRole]);


    async function GetItemsProductsPlayLists() {
        const ItemsData = await GetRepository.getPopularPlayLists(user?.access);
        if (ItemsData?.results) {
            setDataPlayLists(ItemsData?.results);
        }
    }

    useEffect(() => {

        if (user?.access) {
            GetItemsProductsPlayLists()
        }
    }, [user?.access]);



    const columns = [
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
                    <span className="truncate whitespace-nowrap">
                        {' '}
                        {customer_info.email_or_phone}
                    </span>
                </div>
            ),
        },
        user?.role === 'admin' ? (
            {
                title: 'Sotuvchi',
                dataIndex: 'seller_info',
                key: 'age',
                render: (seller_info) => (
                    <a
                        href={`/sellerAccount/${seller_info?.id}`}
                        className="d-flex flex-column">
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
                title: "To'lov turi ",
                dataIndex: 'provider',
                key: 'address',
                render: (provider) => (
                    <span>
                        {provider === 'card_data' ? (
                            <span>
                                <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                karta orqali
                            </span>
                        ) : provider === 'click' ? (
                            <span>
                                <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                click orqali
                            </span>
                        ) : provider === 'payme' ? (
                            <span>
                                <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                payme orqali
                            </span>
                        ) : (
                            ' '
                        )}
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
                            tasdiqlanmagan
                        </span>
                    )}
                </span>
            ),
        },
    ];

    const columnSellers = [
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
            width: 400,
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

    ];


    const itemsOrder = [
        {
            key: '1',
            label: (
                dataPlayLists?.length > 0 &&
                <span
                    style={{
                        marginRight: '20px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}>
                    Sotilgan mahsulotlar
                </span>
            ),
            children: (
                user?.role === "admin" ?
                    <>
                        <Table
                            scroll={{ x: 1600 }}
                            dataSource={data}
                            columns={columns}
                            pagination={false}
                        />
                        <Pagination
                            className="mt-3"
                            defaultCurrent={currPage || 1}
                            total={pageCount}
                            onChange={handlePagination}
                        />
                    </> :
                    <>
                        <Table
                            scroll={{ x: 900 }}
                            dataSource={data}
                            columns={columnSellers}
                            pagination={false}
                        />
                        <Pagination
                            className="mt-3"
                            defaultCurrent={currPage || 1}
                            total={pageCount}
                            onChange={handlePagination}
                        />
                    </>
            ),
        },
        ...(dataPlayLists?.length > 0 ? [{
            key: '2',
            label: (
                <span
                    style={{
                        marginLeft: '30px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}>
                    Sotilgan playlistlar
                </span>
            ),
            children: (
                <div>
                    <Table
                        scroll={{ x: user?.role === "seller" ? 900 : 1450 }}
                        dataSource={dataPlayLists}
                        columns={user?.role === "seller" ? columnSellers : columns}
                        className="pb-5"
                        pagination={false}
                    />
                </div>
            ),
        }] : []),
    ];



    return (
        <section className="ps-my-account ps-page--account ">
            <div className="container">
                <div className="row pb-5 " style={{ alignItems: 'flex-start' }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">

                                    <div className="pt-4 row gap-5 mx-auto row-gap-3 ">
                                        <RangePicker
                                            className="col-md-12 rounded-3 py-3"
                                            onChange={handleChange}
                                        />
                                        <div className="d-flex gap-2">
                                            <label
                                                className={`form-label border ${user.role === 'admin'
                                                    ? 'col-6 w-50'
                                                    : 'col-12 w-100'
                                                    } col-6 w-50 p-0 d-flex justify-content-between align-items-center`}
                                                style={{
                                                    backgroundColor: '#F1F1F1',
                                                }}>
                                                <input
                                                    type="search"
                                                    className="form-control"
                                                    style={{ border: 'none' }}
                                                    placeholder="Qidiruv"
                                                    onInput={(e) =>
                                                        setSerach(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <span className="px-4">
                                                    <i className="fa-solid fa-search "></i>
                                                </span>
                                            </label>
                                            {user.role === 'admin' ? (
                                                <Select
                                                    className="col-md-6 p-0"
                                                    mode="select"
                                                    // showSearch
                                                    style={{
                                                        width: '100%',
                                                        height: '47px',
                                                    }}
                                                    onChange={(e) =>
                                                        setUserRole(e)
                                                    }
                                                    placeholder="Filter"
                                                    options={[
                                                        {
                                                            label: 'Barchasi',
                                                            value: '',
                                                        },
                                                        {
                                                            label: 'Sotuvchi',
                                                            value: 'seller',
                                                        },
                                                        {
                                                            label: 'Xaridor',
                                                            value: 'customer',
                                                        },
                                                    ]}></Select>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>

                                    <Tabs
                                        centered
                                        defaultActiveKey="1"
                                        items={itemsOrder}
                                        className="bg-white"
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OrdersLists;
