import React from 'react'
import { useSelector } from 'react-redux';
import DashboardOrderTable from './DashboardOrderTable';
import DashboardCommentsTable from './DashboardCommentsTable';
// import DashboardPlaylistTable from './DashboardPlaylistTable';
import { Tabs } from 'antd';
import useResponsive from '~/utilities/useResponsive';

export default function DashboardLastOrdersTabs() {
    const { profile } = useSelector(state => state.ecomerce)
    const { isMobile } = useResponsive()

    const tabs = [
        {
            key: '1',
            label: "So'ngi buyurtmalar",
            children: <DashboardOrderTable role={profile?.role} />
        },
        {
            key: '2',
            label: "Komentariyalar",
            children: <DashboardCommentsTable />
        },
        // {
        //     key: '3',
        //     label: "PlayList buyurtmalar",
        //     children: <DashboardPlaylistTable />,
        // }
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

    const sellerItems = items.filter(el => el.key !== "2")


    return (
        <div>
            <Tabs
                type='line'
                centered
                defaultActiveKey="1"
                items={profile?.role === 'admin' ? items : sellerItems}
                className={isMobile ? '' : 'bg-white'}
                onChange={() => scrollTo(0, 1000)}
            />
        </div>
    )
}
