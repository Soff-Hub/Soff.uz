import { Table, Modal, Button, Space } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const getColumns = ({ onCancel }) => {
    const router = useRouter()
    return [
        {
            title: 'Buyurtma nomi',
            dataIndex: 'order_name',
            render: (text, record) => (
                <span
                    onClick={() => router.push(`/order/${record.key}`)}
                    className='order_name_link '
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
            render: (price) => `$${price}`,
        },
        {
            title: 'Xolati',
            dataIndex: 'status',
            render: (_, record) => {
                if (record.status === 'pay') {
                    return (
                        <Space direction="vertical" size={6} style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                block
                                style={{ backgroundColor: '#00a44f', borderColor: '#00a44f' }}
                            >
                                To‘lash
                            </Button>
                            <Button
                                block
                                type="default"
                                onClick={() => onCancel(record)}
                                style={{
                                    color: '#1890ff',
                                    borderColor: '#1890ff',
                                }}
                                className="cancel-btn"
                            >
                                Bekor qilish
                            </Button>
                        </Space>
                    );
                }
                return record.status.charAt(0).toUpperCase() + record.status.slice(1);
            },
        },
    ];

}

const allOrders = [
    {
        key: '1',
        order_name: 'Logo Design',
        seller: 'John Doe',
        ordered_at: '2025-08-01',
        price: 50,
        status: 'active',
    },
    {
        key: '2',
        order_name: 'Video Editing',
        seller: 'Bob Brown',
        ordered_at: '2025-06-20',
        price: 80,
        status: 'pay',
    },
    {
        key: '3',
        order_name: 'Website Development',
        seller: 'Jane Smith',
        ordered_at: '2025-07-15',
        price: 300,
        status: 'completed',
    },
];

const completedOrders = [
    {
        key: '2',
        order_name: 'Website Development',
        seller: 'Jane Smith',
        ordered_at: '2025-07-15',
        price: 300,
        status: 'completed',
    },
];

const cancelledOrders = [
    {
        key: '3',
        order_name: 'Video Editing',
        seller: 'Bob Brown',
        ordered_at: '2025-06-20',
        price: 80,
        status: 'cancelled',
    },
];

const awaitPayOrdersTable = [
    {
        key: '3',
        order_name: 'Video Editing',
        seller: 'Bob Brown',
        ordered_at: '2025-06-20',
        price: 80,
        status: 'pay',
    }
]

export const AwaitPayOrdersTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleCancelClick = (record) => {
        setSelectedOrder(record);
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        console.log('Bekor qilindi:', selectedOrder);
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Table
                columns={getColumns({ onCancel: handleCancelClick })}
                pagination={false}
                dataSource={awaitPayOrdersTable}
                scroll={{ x: 'max-content' }}
            />
            <Modal
                title='Buyurtmani bekor qilish'
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText='Bekor qilish'
                cancelText='Yopish'
            >
                <p>Haqiqatan ham “{selectedOrder?.order_name}” buyurtmasini bekor qilmoqchimisiz?</p>
            </Modal>
        </>
    );
};

export const AllOrdersTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleCancelClick = (record) => {
        setSelectedOrder(record);
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        console.log('Bekor qilindi:', selectedOrder);
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Table
                columns={getColumns({ onCancel: handleCancelClick })}
                pagination={false}
                dataSource={allOrders}
                scroll={{ x: 'max-content' }}
            />
            <Modal
                title='Buyurtmani bekor qilish'
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText='Bekor qilish'
                cancelText='Yopish'
            >
                <p>Haqiqatan ham “{selectedOrder?.order_name}” buyurtmasini bekor qilmoqchimisiz?</p>
            </Modal>
        </>

    );
};

export const CompletedOrdersTable = () => {
    return (
        <Table
            columns={getColumns({ onCancel: () => { } })}
            pagination={false}
            dataSource={completedOrders}
            scroll={{ x: 'max-content' }}
        />
    );
};

export const CancelledOrdersTable = () => {
    return (
        <Table
            columns={getColumns({ onCancel: () => { } })}
            pagination={false}
            dataSource={cancelledOrders}
            scroll={{ x: 'max-content' }}
        />
    );
};
