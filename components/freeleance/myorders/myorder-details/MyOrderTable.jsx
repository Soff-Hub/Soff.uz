import { Table, Modal, Button, Space, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useGetOrders from './api/useGetOrders';
import useCancelOrder from './api/useCancelOrder';
import useGetReasons from './api/useGetReasons';

const getColumns = ({ onCancel }) => {
    const router = useRouter();

    return [
        {
            title: 'Buyurtma nomi',
            dataIndex: 'order_name',
            render: (text, record) => (
                <span
                    onClick={() => router.push(`/order/${record.key}`)}
                    className='order_name_link'
                    style={{
                        cursor: "pointer"
                    }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: 'Sotuvchi',
            dataIndex: 'seller',
        },
        {
            title: 'Buyurtma sanasi',
            dataIndex: 'ordered_at',
        },
        {
            title: 'Narx',
            dataIndex: 'price',
            render: (price) => `${price} so'm`,
        },
        {
            title: 'Holati',
            dataIndex: 'status',
            render: (_, record) => {
                if (record.status !== 'pay') {
                    return (
                        <Space direction="vertical" size={6} >
                            <Button
                                block
                                type="primary"
                                style={{ backgroundColor: '#00a44f', borderColor: '#00a44f' }}
                            >
                                <i className="fa-solid fa-money-bill-transfer"></i>
                            </Button>
                            <Button
                                block
                                type="primary"
                                danger
                                onClick={() => onCancel(record)}
                                className="cancel-btn"
                            >
                               <i className="fa-solid fa-xmark"></i>
                            </Button>
                        </Space>
                    );
                }
                return record.status
                    ? record.status.charAt(0).toUpperCase() + record.status.slice(1)
                    : '-';
            },
        },
    ];
};

export const AllOrdersTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [reason, setReason] = useState('');
    const { data: orders } = useGetOrders();
    const { mutate: cancelOrder, isLoading: isCancelling } = useCancelOrder();
    const { data: reasons } = useGetReasons()

    const handleCancelClick = (record) => {
        setSelectedOrder(record);
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        if (selectedOrder) {
            cancelOrder(
                { id: selectedOrder.key, reason },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        setReason('');
                        setSelectedOrder(null);
                    }
                }
            );
        }
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setReason('');
        setSelectedOrder(null);
    };

    // API ma'lumotlarini table formatiga o‘tkazish
    const dataSource =
        orders?.map((order) => ({
            key: order.id,
            order_name: order.service?.title || '-',
            seller: '-', // API-da hozircha yo'q
            ordered_at: new Date(order.created_at).toLocaleDateString('uz-UZ'),
            price: order.service?.price || 0,
            status: order.transaction_status || 'active',
        })) || [];

    return (
        <>
            <Table
                columns={getColumns({ onCancel: handleCancelClick })}
                pagination={false}
                dataSource={dataSource}
                scroll={{ x: 'max-content' }}
            />
            <Modal
                title='Buyurtmani bekor qilish'
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText='Bekor qilish'
                cancelText='Yopish'
                confirmLoading={isCancelling}
            >
                <p>Haqiqatan ham “{selectedOrder?.order_name}” buyurtmasini bekor qilmoqchimisiz?</p>
                <h5>Sababni tanlang</h5>
                <Select
                    className='w-100'
                    placeholder="Bekor qilish sababini tanlang..."
                    value={reason}
                    onChange={(val) => setReason(val)}
                    options={reasons?.map(reason => ({
                        value: reason.id,
                        label: reason.label
                    }))}
                />
            </Modal>
        </>
    );
};
