import React from 'react'
import DashboardStatsCard from './DashboardStatsCard'
import { useSelector } from 'react-redux'
import { useFetchDashboardStatsQuery } from '~/rtk-store/dashboard/api'
import { formatCurrencyWithSpace } from '~/utilities/product-helper'
import { Skeleton } from 'antd'

const sellerData = [
    {
        title: "Umumiy daromad",
        icon: "fa-solid fa-money-check-dollar fa-2x",
        dataIndex: "all_revenue",
        colorClass: "warning"
    },
    {
        title: "Oxirgi 30 kunlik",
        icon: "fa-solid fa-hand-holding-dollar fa-2x",
        dataIndex: "last_month_revenue",
        colorClass: "success"
    },
    {
        title: "Bugungi daromad",
        icon: "fa-solid fa-sack-dollar fa-2x",
        dataIndex: "today_revenue",
        colorClass: "warning"
    },
    {
        title: "Jami buyurtmalar",
        icon: "fa-solid fa-truck fa-2x",
        dataIndex: "total_order",
        colorClass: "danger"
    }
]

const adminData = {
    title: "Aktiv sotuvchilar",
    icon: "fa-solid fa-shop fa-2x",
    dataIndex: "total_shops",
    colorClass: "primary"
}

export default function DashboardStatsList() {
    let user = useSelector(state => state?.ecomerce?.profile)
    const role = user?.role || null

    const { data, isSuccess, isFetching } = useFetchDashboardStatsQuery(user?.id, {
        skip: !user?.id,
    })

    const columns = sellerData.map(el => ({ ...el, dataIndex: role === "admin" && el.dataIndex === 'last_month_revenue' ? "total_revenue" : el.dataIndex }))

    return (
        <div className="d-flex gap-3 dashboard-stats">
            {
                columns.map(el => (
                    <div className='w-100'>
                        {isSuccess && !isFetching ? <DashboardStatsCard icon={el.icon} colorClass={el.colorClass} title={el.title} value={formatCurrencyWithSpace(data[el.dataIndex])} /> : (
                            <Skeleton.Input active style={{ height: '60px', borderRadius: '10px' }} className='w-100' />
                        )}
                    </div>
                ))
            }
            {data && role === 'admin' ? (
                <div className='w-100'>
                    {isSuccess && !isFetching ? <DashboardStatsCard icon={adminData.icon} colorClass={adminData.colorClass} title={adminData.title} value={data[adminData.dataIndex]} /> : ''}
                </div>
            ) : ''}
        </div>
    )
}
