import React from 'react'
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import PopularProductsTable from './PopularProductsTable';
import DashboardDonatesTable from './DashboardDonatesTable';

export default function DashboardSecondTabs() {
    const { profile } = useSelector(state => state.ecomerce)

    const tabs = [
        {
            key: '1',
            label: "Ommabop mahsulotlar",
            children: <PopularProductsTable role={profile?.role} />
        },
        {
            key: '2',
            label: "Donatlar ro'yxati",
            children: <DashboardDonatesTable />
        },
    ]

    const items = tabs.map(el => ({
        ...el, label: (
            <span
                style={{
                    marginRight: '20px',
                    fontSize: '16px',
                    fontWeight: '600',
                }}
            >
                {el.label}
            </span>
        )
    }));

    return (
        <div>
            <Tabs
                type='line'
                centered
                defaultActiveKey="1"
                items={items}
                className="bg-white "
            />
        </div>
    )
}
