import { Table, Modal, Button, Space, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useGetOrders from './api/useGetOrders';
import useCancelOrder from './api/useCancelOrder';
import useGetReasons from './api/useGetReasons';

const getColumns = ({ onCancel }) => {
    const router = useRouter();

    const orderStatusName = {
        "pending": "Yaratildi",
        "approved": "To'lov qilindi",
        "requirement_file": "Buyurtma talablari jo'natildi",
        "requirement_file_rejected": "Buyurma talablari toliq emas",
        "order_accepted": "Buyurtma qabul qilindi",
        "order_file_sent": "Tasdiqlash uchun topshirildi",
        "completed": "Buyurtma tugallandi",
    }

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
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {record.userPhoto ? (
                        <img
                            src={record.userPhoto}
                            alt={record.seller}
                            style={{ width: 28, height: 28, borderRadius: '50%' }}
                        />
                    ) : (
                        <i className="fa-solid fa-user" style={{ fontSize: 20, color: '#999' }}></i>
                    )}
                    <span>{record.seller}</span>
                </div>
            )
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
                if (record.status == 'pending') {
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
                return orderStatusName[record.status]
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
            seller: order.user?.full_name || '-',
            ordered_at: new Date(order.created_at).toLocaleString('uz-UZ', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
            price: order.service?.price || 0,
            status: order.order_status_doing?.status || 'pending',
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
