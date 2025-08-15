import { Table, Modal, Button, Space } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useGetOrders from './api/useGetOrders';

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
                                <i class="fa-solid fa-money-bill-transfer"></i>
                            </Button>
                            <Button
                                block
                                type="primary"
                                danger
                                onClick={() => onCancel(record)}
                                className="cancel-btn"
                            >
                               <i class="fa-solid fa-xmark "></i>
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
    const { data: orders } = useGetOrders();

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

    // API ma'lumotlarini table formatiga o‘tkazish
    const dataSource =
        orders?.map((order) => ({
            key: order.id,
            order_name: order.service?.title || '-',
            seller: '-', // API-da hozircha yo'q
            ordered_at: new Date(order.created_at).toLocaleDateString('uz-UZ'),
            price: order.service?.price || 0,
            status: order.transaction_status || 'active', // null bo‘lsa 'active' deb qo‘yamiz
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
            >
                <p>Haqiqatan ham “{selectedOrder?.order_name}” buyurtmasini bekor qilmoqchimisiz?</p>
            </Modal>
        </>
    );
};
