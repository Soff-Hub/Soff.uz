import React from 'react'

import { Table } from 'antd'

import CalculateTimeDifference from '../account/DateFormatter';
import { addPeriodToThousands } from '../account/ProductsLists';

import { useFetchDonatesQuery } from '~/rtk-store/dashboard/api';

export default function DashboardDonatesTable() {

    const columnsDonat = [
        {
            title: 'Donat qiluvchi',
            dataIndex: 'sponsor_info',
            key: 'age',
            width: 350,
        },
        {
            title: "So'mma",
            dataIndex: 'amount',
            key: 'age',
            render: (discount_price, record) => (
                <span>
                    <i className="fa-solid fa-coins text-warning"></i>{' '}
                    {discount_price ? addPeriodToThousands(discount_price) : addPeriodToThousands(record?.amount_paid)}
                </span>
            ),
        },
        {
            title: 'Donat qilingan sanasi',
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
            title: 'Donat xabari',
            dataIndex: 'description',
            key: 'age',
            width: 350,
        },
    ];

    const { data, isLoading } = useFetchDonatesQuery(1, {
        refetchOnMountOrArgChange: true,
    })

    const donates = data ? data?.results : []

    return (
        <div>
            <Table
                dataSource={donates}
                columns={columnsDonat}
                pagination={false}
                loading={isLoading}
                scroll={{ x: 1000 }}
            />
        </div>
    )
}
