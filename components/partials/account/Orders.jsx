import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';

import { DatePicker, Pagination, Select, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import CalculateTimeDifference from './DateFormatter';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import useDebounce from '~/hooks/useDebounce';

function OrdersLists() {
    const { accountLinks, user } = useSelector((state) => state.auth);

    const [data, setData] = useState([]);
    const [search, setSerach] = useState('');
    const [userRole, setUserRole] = useState('');
    const [date, setDate] = useState(null);
    const [selector, setSelector] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const searchDebounce = useDebounce(search, 1000);

    const { RangePicker } = DatePicker;
    const dateFormat0 = date
        ? `${date[0]?.$y}-${
              `${date[0].$M + 1}`.length === 1
                  ? `0${date[0].$M + 1}`
                  : date[0].$M + 1
          }-${date[0].$D}`
        : '';
    const dateFormat1 = date
        ? `${date[1]?.$y}-${
              `${date[1].$M + 1}`.length === 1
                  ? `0${date[1].$M + 1}`
                  : date[1].$M + 1
          }-${date[1].$D}`
        : '';
    const dataFormat = date ? `${dateFormat0}&end_date=${dateFormat1}` : '';

    async function GetItemsProducts(page, status, date, searchVal, userRole) {
        console.log('user role', userRole);
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

    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
        GetItemsProducts(pageNum, selector, dataFormat, search, userRole);
    };

    useEffect(() => {
        GetItemsProducts(currPage, selector, dataFormat, search, userRole);
    }, [currPage, selector, dataFormat, searchDebounce, userRole]);

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
                    <span>{customer_info.email_or_phone}</span>
                </div>
            ),
        },
        {
            title: 'Sotuvchi ',
            dataIndex: 'seller_info',
            key: 'age',
            width: 300,
            render: (seller_info) => (
                <div className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        {' '}
                        {seller_info.name}
                    </span>
                    <span>{seller_info.email_or_phone}</span>
                </div>
            ),
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
            title: 'Buyurtma nomi',
            dataIndex: 'info',
            key: 'address',
            width: 350,
            render: (data) => (
                <div className="d-flex flex-column">
                    <Link
                        href={`/product/${data[0].slug}`}
                        className="truncate whitespace-nowrap">
                        {data[0].title}
                    </Link>
                </div>
            ),
        },
        {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status) =>
                status === 'approved' ? (
                    <span>
                        <i className="fa-solid text-success fa-circle-check"></i>{' '}
                        tasdiqlangan
                    </span>
                ) : status === 'cancelled' ? (
                    <span>
                        <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
                        Bekor qilingan
                    </span>
                ) : status === 'pending' ? (
                    <span>
                        <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                        Moderatsiya
                    </span>
                ) : (
                    <></>
                ),
        },
    ];
    const columnSellers = [
        {
            title: 'Buyurtmachi',
            dataIndex: 'customer_info',
            key: 'user',
        },
        {
            title: 'Buyurtma nomi',
            dataIndex: 'info',
            key: 'title',
            width: 350,
            render: (data) => (
                <div className="d-flex flex-column">
                    <Link
                        href={`/product/${data[0].slug}`}
                        className="truncate whitespace-nowrap">
                        {data[0].title}
                    </Link>
                </div>
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
            title: 'Buyurtma sanasi',
            dataIndex: 'created_at',
            key: 'created_at',
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
            key: 'status',
            render: (status) =>
                status === 'approved' ? (
                    <span>
                        <i className="fa-solid text-success fa-circle-check"></i>{' '}
                        tasdiqlangan
                    </span>
                ) : status === 'cancelled' ? (
                    <span>
                        <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
                        Bekor qilingan
                    </span>
                ) : status === 'pending' ? (
                    <span>
                        <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                        Moderatsiya
                    </span>
                ) : (
                    <></>
                ),
        },
    ];
    return (
        <section className="ps-my-account ps-page--account p-0">
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
                                    {/* <div className="d-flex flex-column gap-2">
                                        <span className="fs-4">
                                            <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                            <strong>Moderatsiya</strong>{' '}
                                            <em>
                                                malumotlar ko'rib chiqilmoqda...
                                            </em>
                                        </span>
                                        <span className="fs-4">
                                            <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                            <strong>Tasdiqlangan </strong>{' '}
                                            <em>
                                                malumotlaringiz muvaffaqqiyatli
                                                tasdiqlandi!
                                            </em>
                                        </span>
                                        <span className="fs-4">
                                            <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
                                            <strong>Bekor qilingan</strong>{' '}
                                            <em>
                                                malumotlaringiz bekor qilindi
                                            </em>
                                        </span>
                                    </div> */}
                                    <div className="py-4 row gap-5 mx-auto row-gap-3 pb-5">
                                        <RangePicker
                                            className="col-md-12 rounded-3 py-3"
                                            onChange={(e) => setDate(e)}
                                        />
                                        <div className="d-flex gap-2">
                                            <label
                                                className={`form-label border ${
                                                    user.role === 'admin'
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
                                    {user?.role === 'admin' ? (
                                        <>
                                            <Table
                                                scroll={{ x: 1550 }}
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
                                        </>
                                    ) : (
                                        <>
                                            <Table
                                                scroll={{ x: 1250 }}
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
                                    )}
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
