import { Table } from 'antd'
import Link from 'next/link'
import React from 'react'
import { useFetchDashboardOrdersQuery } from '~/rtk-store/dashboard/api'
import { addPeriodToThousands } from '../account/ProductsLists'
import CalculateTimeDifference from '../account/DateFormatter'
import useResponsive from '~/utilities/useResponsive'

export default function DashboardOrderTable({ role }) {
    const { data } = useFetchDashboardOrdersQuery()
    const { isMobile } = useResponsive()

    const dataOrders = data ? data?.results : []

    const columnsOrders = [
        {
            title: 'Buyurtmachi',
            dataIndex: 'customer_info',
            key: 'age',
            render: (customer_info) => (
                <div className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        {' '}
                        {customer_info?.name}
                    </span>
                    <span className="truncate whitespace-nowrap">
                        {' '}
                        {customer_info?.email_or_phone}
                    </span>
                </div>
            ),
        },
        role === 'admin' ? (
            {
                title: 'Sotuvchi',
                dataIndex: 'seller_info',
                key: 'age',
                render: (seller_info) => (
                    <Link href={`/sellerAccount/${seller_info?.id}`}>
                        <a
                            className="d-flex flex-column">
                            <span className="truncate whitespace-nowrap">
                                {' '}
                                {seller_info?.name}
                            </span>
                            <span className="truncate whitespace-nowrap">
                                {' '}
                                {seller_info?.email_or_phone}
                            </span>
                        </a>
                    </Link>
                ),
            }
        ) : (
            <></>
        ),
        {
            title: 'Buyurtma nomi',
            dataIndex: 'document',
            key: 'age',
            render: (document) => (
                <Link href={`https://soff.uz/product/${document?.slug}`}>
                    <a target='blank'>{document?.title}</a>
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
        role === 'admin' ? (
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
    ]
    const orderLoading = false

    return (
        <div>
            {
                isMobile ? (
                    <div className='dashboard-orders d-flex flex-column gap-2 px-2'>
                        {
                            dataOrders?.map((el, i) => (
                                <div className='order-card py-2 px-3 pt-3 bg-white' key={i} style={{ borderRadius: '8px' }}>
                                    <div className="order-card-top d-flex align-items-center justify-content-between mb-2">
                                        <h6 className='m-0'>Buyurtma #{el.id}</h6>
                                        <span style={{ fontSize: '10px' }}>
                                            {' '}
                                            <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                                            <CalculateTimeDifference targetDate={el?.created_at} />
                                        </span>
                                    </div>
                                    <div className="order-card-top d-flex align-items-start flex-column gap-2">
                                        <Link href={`https://soff.uz/product/${el?.document?.slug}`}>
                                            <a target='blank'>
                                                <p className='m-0' style={{ fontSize: '10px' }}>
                                                    {el?.document?.title}
                                                </p>
                                            </a>
                                        </Link>
                                        <span style={{ fontSize: '10px', minWidth: '60px' }}>
                                            <i className="fa-solid fa-coins text-warning"></i>{' '}
                                            {addPeriodToThousands(el?.price)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <Table
                        size="small"
                        scroll={{ x: role === "admin" ? 1600 : 576 }}
                        dataSource={dataOrders}
                        columns={columnsOrders}
                        pagination={false}
                        loading={orderLoading}
                    />
                )
            }
        </div>
    )
}
