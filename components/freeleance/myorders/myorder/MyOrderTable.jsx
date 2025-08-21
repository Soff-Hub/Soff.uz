import { Table, Modal, Button, Space, Select, message, Tooltip } from 'antd';
import React, { useState } from 'react';
import useGetOrders from './api/useGetOrders';
import useCancelOrder from './api/useCancelOrder';
import useGetReasons from './api/useGetReasons';
import { formatCurrencyWithSpace } from '~/utilities/product-helper';
import { useMobile } from '~/hooks/useMobile';
import Link from 'next/link';
import styles from './style/status.module.scss';
import { getRemainingDays } from '~/utilities/calculateTime';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ServiceCheckout from '../../services/service-deatail/ui/auth/serviceCheckout';

const Status = ({ status }) => {
    switch (status) {
        case 'approved':
            return (
                <span className={styles.statusApproved}>To'lov qilindi</span>
            );
        case 'requirement_file':
            return (
                <span className={styles.statusApproved}>
                    Buyurtma talablari jo'natildi
                </span>
            );
        case 'requirement_file_rejected':
            return (
                <span className={styles.statusApproved}>
                    Buyurma talablari toliq emas
                </span>
            );
        case 'order_accepted':
            return (
                <span className={styles.statusProcess}>
                    Buyurtma qabul qilindi
                </span>
            );
        case 'order_file_sent':
            return (
                <span className={styles.statusProcess}>
                    Tasdiqlash uchun topshirildi
                </span>
            );
        case 'completed':
            return (
                <span className={styles.statusCompleted}>
                    Buyurtma tugallandi
                </span>
            );
        case 'cancelled':
            return (
                <span className={styles.statusCancelled}>
                    Buyurtma bekorqilindi
                </span>
            );
        default:
            return null;
    }
};

const orderStatusName = {
    pending: <Status status={'pending'} />,
    approved: <Status status={'approved'} />,
    requirement_file: <Status status={'requirement_file'} />,
    requirement_file_rejected: <Status status={'requirement_file_rejected'} />,
    order_accepted: <Status status={'order_accepted'} />,
    order_file_sent: <Status status={'order_file_sent'} />,
    completed: <Status status={'completed'} />,
    cancelled: <Status status={'cancelled'} />,
};
const getColumns = ({ onCancel }) => {
    const { isMobile } = useMobile();
    const [showPayment, setShowPayment] = useState(false);
    const queryClient = useQueryClient();

    const onClose = () => {
        setShowPayment(false);
        queryClient.invalidateQueries(['order']);
    };
    return [
        {
            title: 'ID',
            dataIndex: 'key',
            align: 'center',
        },
        {
            title: 'Buyurtma nomi',
            dataIndex: 'order_name',
            render: (text, record) => (
                <div className="d-flex flex-row gap-2 align-items-center">
                    <Link
                        href={`/order/${record.key}`}
                        className="order_name_link"
                        style={{
                            cursor: 'pointer',
                        }}>
                        {text}
                    </Link>
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                </div>
            ),
        },
        {
            title: 'Sotuvchi',
            dataIndex: 'seller',
            render: record => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}>
                    {record?.photo_url ? (
                        <img
                            src={record?.photo_url}
                            alt={record?.full_name}
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                            }}
                        />
                    ) : (
                        <i
                            className="fa-solid fa-user"
                            style={{
                                fontSize: 20,
                                color: '#999',
                            }}></i>
                    )}
                    <span>{record?.full_name}</span>
                </div>
            ),
            align: 'center',
            hidden: isMobile < 992,
        },
        {
            title: 'Buyurtma sanasi',
            dataIndex: 'ordered_at',
            align: 'center',
            hidden: isMobile < 1280,
        },
        {
            title: 'Qoldi',
            render: (_, record) =>
                `${getRemainingDays(record.ordered_at, record.deliveryDay)}`,
            align: 'center',
            hidden: isMobile < 768,
        },
        {
            title: 'Narx',
            dataIndex: 'price',
            render: price => `${formatCurrencyWithSpace(price)} so'm`,
            align: 'center',
            hidden: isMobile < 1280,
        },
        {
            title: 'Holati',
            dataIndex: 'status',
            render: (_, record) => {
                console.log(record);

                if (record.status == 'pending') {
                    return (
                        <Space direction="" size={6}>
                            <Tooltip title="To'lash">
                                <Button
                                    onClick={() => setShowPayment(true)}
                                    type="primary"
                                    style={{
                                        backgroundColor: '#00a44f',
                                        borderColor: '#00a44f',
                                    }}>
                                    <i className="fa-solid fa-money-bill-transfer"></i>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Bekor qilish">
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => onCancel(record)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </Button>
                            </Tooltip>
                            <Modal
                                title="Buyurtmaga to'lov qilish"
                                open={showPayment}
                                onCancel={() => setShowPayment(false)}
                                footer={null}>
                                <>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h3 className="type_payment_h3 mb-0">
                                            To'lov turini tanlang:
                                        </h3>
                                    </div>
                                    <div className="bg-white">
                                        <ServiceCheckout
                                            onClose={onClose}
                                            order_id={record?.key}
                                            document={record?.serviceId}
                                        />
                                    </div>
                                </>
                            </Modal>
                        </Space>
                    );
                }
                return orderStatusName[record.status];
            },
            align: 'center',
        },
    ];
};

export const AllOrdersTable = ({ type }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [reason, setReason] = useState('');
    const { data: orders } = useGetOrders();
    const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();
    const { data: reasons } = useGetReasons();

    const handleCancelClick = record => {
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
                        message.success(
                            'Buyurtma muvaffaqiyatli bekor qilindi!'
                        );
                    },
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
        orders?.map(order => ({
            key: order.id,
            order_name: order.service?.title || '-',
            seller: order?.user || '-',
            ordered_at: new Date(order.created_at).toLocaleString('uz-UZ', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
            deliveryDay: order.service?.delivery_days,
            price: order.service?.price || 0,
            status: order.order_status_doing?.status || 'pending',
            serviceId: order?.service?.id,
        })) || [];

    const statusFilter = dataSource.filter(item => type?.includes(item.status));
    console.log('orders', orders);

    return (
        <>
            <Table
                columns={getColumns({ onCancel: handleCancelClick })}
                pagination={false}
                dataSource={statusFilter}
                tabBarStyle={{
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    whiteSpace: 'nowrap',
                }}
            />
            <Modal
                title="Buyurtmani bekor qilish"
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Bekor qilish"
                cancelText="Yopish"
                confirmLoading={isCancelling}>
                <p>
                    Haqiqatan ham “{selectedOrder?.order_name}” buyurtmasini
                    bekor qilmoqchimisiz?
                </p>
                <h5>Sababni tanlang</h5>
                <Select
                    className="w-100"
                    placeholder="Bekor qilish sababini tanlang..."
                    value={reason}
                    onChange={val => setReason(val)}
                    options={reasons?.map(reason => ({
                        value: reason.id,
                        label: reason.reason,
                    }))}
                />
            </Modal>
        </>
    );
};
