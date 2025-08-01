import { Tabs } from 'antd';
import React from 'react'
import { AllOrdersTable, AwaitPayOrdersTable, CancelledOrdersTable, CompletedOrdersTable } from './MyOrderTable';

const MyOrderTabs = () => {
    const items = [
        {
            key: '1',
            label: 'Barchasi',
            children: <AllOrdersTable />,
        },
        {
            key: '2',
            label: 'Bekor qilingan',
            children: <CancelledOrdersTable />,
        },
        {
            key: '3',
            label: 'Tolash kutilyotgan',
            children: <AwaitPayOrdersTable />,
        },
        {
            key: '4',
            label: 'Tugatilgan',
            children: <CompletedOrdersTable />,
        },
    ];
    return (
        <Tabs className='order_tabs' items={items} defaultActiveKey='1' />
    )
}

export default MyOrderTabs