import { Table, Modal, Button, Space, Select, message, Tooltip, Avatar } from 'antd';
import React, { useState } from 'react';
import useGetOrders from './api/useGetOrders';
import useCancelOrder from './api/useCancelOrder';
import useGetReasons from './api/useGetReasons';
import { formatCurrencyWithSpace } from '~/utilities/product-helper';
import styles from './style/status.module.scss';
import { getRemainingDays } from '~/utilities/calculateTime';
import { useRouter } from 'next/router';
import SelectOrderDrawer from './ui/SelectOrderDrawer';

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
                    Buyurtma talablari toliq emas
                </span>
            );
        case 'order_accepted':
            return (
                <span className={styles.statusProcess}>
                    Buyurtma qabul qilindi
                </span>
            );
        case 'rejected':
            return (
                <span className={styles.statusProcess}>Kamchilik topildi</span>
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
                    Buyurtma bekor qilindi
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
    rejected: <Status status={'rejected'} />,
};

const getColumns = ({ onCancel, onOpenDrawer }) => {
    const router = useRouter();
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
                <div
                    className="d-flex flex-row gap-2 align-items-center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        if (record.seller) {
                            router.push(`/order/${record.key}`)
                        } else {
                            if (record?.status !== "cancelled") {
                                onOpenDrawer(record)
                            } else {
                                message.warning("Siz bu buyurtmani bekor qilgansiz")
                            }
                        }
                    }}
                >
                    <span className="order_name_link">{text}</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                </div>
            ),
        },
        {
            title: 'Mutaxassis',
            dataIndex: 'seller',
            render: (_, record) => {
                const photos = record?.offers?.map(item => item.photo_url) || [];

                return record?.seller ? (   
                    <div
                        onClick={() => router.push(`/seller/${record?.seller?.soff_seller_id}`)}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                    >
                        {record?.photo_url ? (
                            <img src={record?.photo_url} alt={record?.seller?.full_name} style={{ width: 28, height: 28, borderRadius: '50%' }} />
                        ) : (
                            <i className="fa-solid fa-user" style={{ fontSize: 20, color: '#999' }}></i>
                        )}
                        <span>{record?.seller?.full_name}</span>
                    </div>
                ) : (
                    <div>
                        <Avatar.Group
                            max={{
                                count: 3,
                                popover: { trigger: "click" },
                                style: { color: '#fff', backgroundColor: '#00a44f' },
                            }}
                        >
                            {photos?.map((photo) => (
                                <Avatar
                                    style={{cursor: "pointer"}}
                                    src={photo || "/static/img/ozodbek.png"}
                                    onClick={() => {
                                        if (record?.status !== "cancelled") {
                                            onOpenDrawer(record)
                                        } else {
                                            message.warning("Siz bu buyurtmani bekor qilgansiz")
                                        }
                                    }}
                                />
                            ))}
                        </Avatar.Group>
                        {photos.length === 0 &&
                            <span>
                                Takliflar kutilmoqda
                            </span>
                        }
                    </div>
                )
            },
            align: 'start',
        },
        {
            title: 'Buyurtma sanasi',
            dataIndex: 'ordered_at',
            align: 'center',
        },
        {
            title: 'Qoldi',
            render: (_, record) =>
                record.status === 'completed'
                    ? '-'
                    : record.status === 'cancelled'
                        ? '-'
                        : record.acceptedDate == null
                            ? 'Ish boshlanmadi'
                            : `${getRemainingDays(
                                record.ordered_at,
                                record.deliveryDay
                            )}`,
            align: 'center',
        },
        {
            title: 'Narx',
            dataIndex: 'price',
            render: price => `${formatCurrencyWithSpace(price)} so'm`,
            align: 'center',
        },
        {
            title: "Harakatlar",
            dataIndex: 'status',
            render: (_, record) => {
                if (record.status == 'pending') {
                    return (
                        <Space direction="" size={6}>
                            {!record.seller ?
                                <Tooltip title="Takliflarni ko'rish">
                                    <Button
                                        type="primary"
                                        style={{
                                            background: "#00a44f"
                                        }}
                                        onClick={() => onOpenDrawer(record)}>
                                        <i className="fa-solid fa-arrow-up-right-from-square" />
                                    </Button>
                                </Tooltip> : 
                                <Tooltip title="Batafisl ko'rish">
                                    <Button
                                        type="primary"
                                        style={{
                                            background: "#00a44f"
                                        }}
                                        onClick={() => router.push(`/order/${record.key}`)}>
                                        <i className="fa-solid fa-arrow-up-right-from-square" />
                                    </Button>
                                </Tooltip>
                            }
                            <Tooltip title="Bekor qilish">
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => onCancel(record)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </Button>
                            </Tooltip>
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
    const [openDrawer, setOpenDrawer] = useState(false)

    const handleCancelClick = record => {
        setSelectedOrder(record);
        setIsModalOpen(true);
    };

    const handleOpenDrawer = (order) => {
        setSelectedOrder(order);
        setOpenDrawer(true);
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
    const dataSource =
        orders?.map(order => ({
            key: order.id,
            order_name: order.service?.title || order?.title || '-',
            seller: order?.user,
            ordered_at: new Date(order.created_at).toLocaleString('uz-UZ', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
            description: order?.description || '-',
            sellerId: order?.user?.soff_seller_id,
            deliveryDay: order.service?.delivery_days,
            deadline_date: order?.deadline_date,
            price: order.service?.price || order?.budget || 0,
            status: order.order_status_doing?.status || 'pending',
            serviceId: order?.service?.id,
            acceptedDate: order?.order_status_doing?.accepted_date,
            offers: order?.offers
        })) || [];

    const statusFilter = dataSource.filter(item => type?.includes(item.status));

    return (
        <>
            <Table
                columns={getColumns({
                    onCancel: handleCancelClick,
                    onOpenDrawer: (order) => handleOpenDrawer(order),
                })}
                pagination={false}
                dataSource={statusFilter}
                scroll={{ x: "max-content" }}
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

            <SelectOrderDrawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                order={selectedOrder}
            />
        </>
    );
};
