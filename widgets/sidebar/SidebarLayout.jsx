import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';

function SidebarLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    const onChangeCollapse = () => {
        setCollapsed((pre) => !pre);
    };

    return (
        <Layout
            style={{
                display: 'flex',
                gap: '15px',
                backgroundColor: 'transparent',
            }}>
            <Sidebar
                collapsed={collapsed}
                onChangeCollapse={onChangeCollapse}
            />
            <Layout style={{ backgroundColor: 'transparent' }}>
                {children}
            </Layout>
        </Layout>
    );
}

export default SidebarLayout;
