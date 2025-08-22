import { Tabs, Dropdown, Menu, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { AllOrdersTable } from './MyOrderTable';
import useOrdersStatus from './api/useOrderStatus';
import Loader from '~/components/shared/loader';

const MyOrderTabs = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const [activeKey, setActiveKey] = useState('1');
    const { data, isLoading } = useOrdersStatus();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const items = [
        {
            key: '1',
            label: `Yangi ${data?.pending}`,
            children: <AllOrdersTable type={['pending']} />,
        },
        {
            key: '2',
            label: `To'langan ${data?.requirement_approved}`,
            children: (
                <AllOrdersTable
                    type={[
                        'approved',
                        'requirement_file',
                        'requirement_file_rejected',
                        'requirement_approved',
                    ]}
                />
            ),
        },
        {
            key: '3',
            label: `Jarayonda ${data?.requirement_process}`,
            children: (
                <AllOrdersTable
                    type={['order_accepted', 'order_file_sent', 'rejected']}
                />
            ),
        },
        {
            key: '4',
            label: `Tugallandi ${data?.completed}`,
            children: <AllOrdersTable type={'completed'} />,
        },
        {
            key: '5',
            label: `Bekor qilingan ${data?.cancelled}`,
            children: <AllOrdersTable type={'cancelled'} />,
        },
    ];

    const menuItems = items.map(item => ({
        key: item.key,
        label: item.label,
    }));

    if (isLoading) return <Loader />;

    const menu = (
        <Menu
            onClick={({ key }) => setActiveKey(key)}
            selectedKeys={[activeKey]}
            items={menuItems}
        />
    );

    return (
        <div className="tabs-container">
            {isMobile ? (
                <>
                    <Dropdown
                        overlay={menu}
                        trigger={['click']}
                        placement="bottomRight">
                        <Button
                            style={{ marginBottom: '20px' }}
                            iconPosition="end"
                            icon={<MoreOutlined />}
                            className="dropdown-button">
                            {items.find(item => item.key === activeKey)?.label}
                        </Button>
                    </Dropdown>
                    {items.find(item => item.key === activeKey)?.children}
                </>
            ) : (
                <Tabs
                    type="line"
                    activeKey={activeKey}
                    onChange={setActiveKey}
                    className="order_tabs"
                    items={items}
                    tabPosition="top"
                    tabBarStyle={{
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                />
            )}
        </div>
    );
};

export default MyOrderTabs;
