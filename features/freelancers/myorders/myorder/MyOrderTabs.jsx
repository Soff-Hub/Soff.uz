import { Tabs, ConfigProvider, Empty } from 'antd';
import React, { useState, useEffect } from 'react';
import { AllOrdersTable } from './MyOrderTable';
import useOrdersStatus from './api/useOrderStatus';
import Loader from '~/shared/components/loader';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'antd';

export const EmptyTab = ({ description }) => {
    return (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{
                height: '50vh',
                display: 'flex',
                background: '#fafafa',
                borderRadius: '8px',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 0 32px 0',
            }}
            description={description}
        />
    );
};

const MyOrderTabs = () => {
    const [activeKey, setActiveKey] = useState('0');
    const { data, isLoading } = useOrdersStatus({ activeclyFetch: true });
    const { query, push, replace } = useRouter();

    useEffect(() => {
        if (!query?.tab) {
            replace({ query: { ...query, tab: '0' } }, undefined, {
                shallow: true,
            });
            setActiveKey('0');
        } else {
            setActiveKey(query?.tab);
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
            key: '0',
            label: `Barchasi ${totalOrders}`,
            children: totalOrders && <AllOrdersTable type={null} />,
        },
        {
            key: '1',
            label: `Yangi ${data?.pending || 0}`,
            children:
                data?.pending > 0 ? (
                    <AllOrdersTable type={['pending']} />
                ) : (
                    <EmptyTab description="Sizda yangi buyurtmalar mavjud emas" />
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
                    <EmptyTab description="Sizda jarayondagi buyurtmalar mavjud emas" />
                ),
        },
        {
            key: '3',
            label: `Tugallandi ${data?.completed}`,
            children:
                data?.completed > 0 ? (
                    <AllOrdersTable type={'completed'} />
                ) : (
                    <EmptyTab description="Sizda tugallangan buyurtmalar mavjud emas" />
                ),
        },
        {
            key: '4',
            label: `Bekor qilingan ${data?.cancelled || 0}`,
            children:
                data?.cancelled > 0 ? (
                    <AllOrdersTable type={'cancelled'} />
                ) : (
                    <EmptyTab description="Sizda bekor qilingan buyurtmalar mavjud emas" />
                ),
        },
    ];

    if (isLoading)
        return (
            <div
                style={{
                    minHeight: '60vh',
                }}>
                <Loader />
            </div>
        );

    if (totalOrders === 0) {
        return (
            <Empty
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                style={{
                    height: '50vh',
                    display: 'flex',
                    background: '#fafafa',
                    borderRadius: '8px',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                description={
                    <>
                        <h3
                            style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '8px',
                            }}>
                            Sizda hozircha buyurtmalar mavjud emas
                        </h3>
                        <p
                            style={{
                                color: '#6b7280',
                                textAlign: 'center',
                                maxWidth: '448px',
                            }}>
                            Maxsus buyurtmalar bo'limi orqali siz o'zingizga
                            kerakli xizmatlarni topishingiz va buyurtma
                            berishingiz mumkin.
                        </p>
                        <Link
                            href="/order/create"
                            style={{ marginTop: '24px' }}>
                            <Button
                                type="primary"
                                size="large"
                                style={{
                                    borderRadius: '8px',
                                    padding: '0 24px',
                                }}>
                                Maxsus buyurtma yaratish
                            </Button>
                        </Link>
                    </>
                }
            />
        );
    }

    const handleOrderTabChange = (key) => {
        push(
            {
                pathname: query.pathname,
                query: { ...query, tab: key },
            },
            undefined,
            { shallow: true }
        );
    };

    return (
        <Tabs
            type="card"
            activeKey={activeKey}
            onChange={handleOrderTabChange}
            className="order-tabs"
            items={items}
            tabPosition="top"
            style={{
                minHeight: '60vh',
            }}
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
    );
};

export default MyOrderTabs;
