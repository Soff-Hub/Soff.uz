import { Tabs, ConfigProvider } from 'antd';
import React, { useState, useEffect } from 'react';
import { AllOrdersTable } from './MyOrderTable';
import useOrdersStatus from './api/useOrderStatus';
import Loader from '~/components/shared/loader';
import { useRouter } from 'next/router';

const MyOrderTabs = () => {
    const [activeKey, setActiveKey] = useState('1');
    const { data, isLoading } = useOrdersStatus();
    const { query } = useRouter();

    useEffect(() => {
        if (query?.tab) {
            setActiveKey(String(query?.tab));
        }
    }, [query?.tab]);

    const items = [
        {
            key: '1',
            label: `Yangi ${data?.pending || 0}`,
            children: <AllOrdersTable type={['pending']} />,
        },
        {
            key: '2',
            label: `Jarayonda ${data?.requirement_process || 0}`,
            children: (
                <AllOrdersTable
                    type={['order_accepted', 'order_file_sent', 'rejected']}
                />
            ),
        },
        {
            key: '3',
            label: `Tugallandi ${data?.completed || 0}`,
            children: <AllOrdersTable type={'completed'} />,
        },
        {
            key: '4',
            label: `Bekor qilingan ${data?.cancelled || 0}`,
            children: <AllOrdersTable type={'cancelled'} />,
        },
    ];

    if (isLoading) return <Loader />;

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#00a44f",
                },
                components: {
                    Tabs: {
                        itemSelectedColor: "#00a44f",
                        itemActiveColor: "#00a44f",
                        inkBarColor: "#00a44f",
                    },
                },
            }}
        >
            <Tabs
                type="card"
                activeKey={activeKey}
                onChange={setActiveKey}
                items={items}
                tabPosition="top"
                renderTabBar={(tabBarProps, DefaultTabBar) => (
                    <div
                        style={{
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DefaultTabBar {...tabBarProps} />
                    </div>
                )}
            />
        </ConfigProvider>
    );
};

export default MyOrderTabs;
