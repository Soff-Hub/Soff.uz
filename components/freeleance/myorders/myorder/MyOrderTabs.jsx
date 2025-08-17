import { Tabs, Dropdown, Menu, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { AllOrdersTable } from './MyOrderTable';

const MyOrderTabs = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const [activeKey, setActiveKey] = useState('1');

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const items = [
        { key: '1', label: 'Barchasi', children: <AllOrdersTable /> },
        { key: '2', label: 'Bekor qilingan', children: <AllOrdersTable /> },
        { key: '3', label: 'To‘lash kutilyotgan', children: <AllOrdersTable /> },
        { key: '4', label: 'Tugatilgan', children: <AllOrdersTable /> },
    ];

    const menuItems = items.map(item => ({
        key: item.key,
        label: item.label,
    }));

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
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                        <Button style={{ marginBottom: '20px' }} iconPosition='end' icon={<MoreOutlined />} className="dropdown-button">
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
                    tabBarStyle={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
                />
            )}
        </div>
    );
};

export default MyOrderTabs;
