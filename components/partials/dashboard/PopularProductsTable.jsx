import { Table } from 'antd'
import Link from 'next/link'
import React from 'react'
import { useFetchPopularProductsQuery } from '~/rtk-store/dashboard/api'
import { addPeriodToThousands } from '../account/ProductsLists'

export default function PopularProductsTable({ role }) {
    const { data, isLoading } = useFetchPopularProductsQuery(1)

    const dataOrders = data ? data : []

    const columns = [
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'age',
            width: 350,
            render: (seller_info, record) => (
                <Link className="d-flex flex-column" href={`https://soff.uz/product/${record?.slug}`}>
                    <a target='blank'>
                        <span className="truncate whitespace-nowrap">
                            {' '}
                            {seller_info}
                        </span>
                    </a>
                </Link>
            ),
        },
        {
            title: 'Sotuvchi',
            dataIndex: 'seller_info',
            key: 'address',
            render: (seller_info) => (
                <Link className="d-flex flex-column" href={`https://soff.uz/seller/${seller_info?.id}`}>
                    <a target='blank'>
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
    ];
    const columnsOrdersSeller = columns.filter(el => el.dataIndex !== 'seller_info')

    return (
        <div>
            <Table
                scroll={{ x: 1000 }}
                dataSource={dataOrders}
                columns={role === 'admin' ? columns : columnsOrdersSeller}
                pagination={false}
                loading={isLoading}
            />
        </div>
    )
}
