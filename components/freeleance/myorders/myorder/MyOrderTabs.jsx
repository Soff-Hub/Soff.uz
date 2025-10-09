import { Tabs, ConfigProvider, Empty } from 'antd';
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

    const totalOrders = data
        ? (data.pending || 0) +
          (data.requirement_process || 0) +
          (data.completed || 0) +
          (data.cancelled || 0)
        : 0;

    const items = [
        {
            key: '1',
            label: `Yangi ${data?.pending || 0}`,
            children:
                data?.pending > 0 ? (
                    <AllOrdersTable type={['pending']} />
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Sizda yangi buyurtmalar mavjud emas"
                    />
                ),
        },
        {
            key: '2',
            label: `Jarayonda ${data?.requirement_process || 0}`,
            children:
                data?.requirement_process > 0 ? (
                    <AllOrdersTable
                        type={['order_accepted', 'order_file_sent', 'rejected']}
                    />
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Sizda jarayondagi buyurtmalar mavjud emas"
                    />
                ),
        },
        {
            key: '3',
            label: `Tugallandi ${data?.completed || 0}`,
            children:
                data?.completed > 0 ? (
                    <AllOrdersTable type={'completed'} />
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Sizda tugallangan buyurtmalar mavjud emas"
                    />
                ),
        },
        {
            key: '4',
            label: `Bekor qilingan ${data?.cancelled || 0}`,
            children:
                data?.cancelled > 0 ? (
                    <AllOrdersTable type={'cancelled'} />
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Sizda bekor qilingan buyurtmalar mavjud emas"
                    />
                ),
        },
    ];

    if (isLoading) return <Loader />;

    if (totalOrders === 0) {
        return (
            <div
                style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    background: '#fafafa',
                    borderRadius: '8px',
                }}>
                <Empty
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description={
                        <span style={{ fontSize: '16px', color: '#666' }}>
                            Sizda hozircha buyurtmalar mavjud emas
                        </span>
                    }
                />
            </div>
        );
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00a44f',
                },
                components: {
                    Tabs: {
                        itemSelectedColor: '#00a44f',
                        itemActiveColor: '#00a44f',
                        inkBarColor: '#00a44f',
                    },
                },
            }}>
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
                        }}>
                        <DefaultTabBar {...tabBarProps} />
                    </div>
                )}
            />
        </ConfigProvider>
    );
};

export default MyOrderTabs;
