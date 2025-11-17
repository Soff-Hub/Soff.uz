import React, { useEffect, useState } from 'react';
import { Modal, Select, message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import useGetOrders from './api/useGetOrders';
import useCancelOrder from './api/useCancelOrder';
import useGetReasons from './api/useGetReasons';
import SelectOrderDrawer from './ui/SelectOrderDrawer';
import OrderCard from '~/entities/order/order-card';
import Loader from '~/components/shared/loader';
import { useRouter } from 'next/router';
import { EmptyTab } from './MyOrderTabs';

// const rejectableStatuses = [
//     'order_accepted',
//     'order_file_sent',
//     'rejected',
//     'pending',
// ];

export const AllOrdersTable = ({ type }) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { data: orders, isLoading: ordersLoading } = useGetOrders();
    const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();
    const { data: reasons } = useGetReasons();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [reason, setReason] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);

    const { orderId } = router.query;

    const handleOpenDrawer = order => {
        setSelectedOrder(order);
        setOpenDrawer(true);
    };

    const handleCancelClick = order => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        if (selectedOrder) {
            cancelOrder(
                { id: selectedOrder.id, reason },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        setReason('');
                        setSelectedOrder(null);
                        message.success(
                            'Buyurtma muvaffaqiyatli bekor qilindi!'
                        );
                        queryClient.invalidateQueries(['ordersStatus']);
                    },
                }
            );
        }
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setReason(null);
        setSelectedOrder(null);
    };

    const statusFilter =
        orders?.filter(order =>
            type
                ? type?.includes(order.order_status_doing?.status || 'pending')
                : true
        ) || [];

    let ordersContent = null;
    if (ordersLoading) {
        ordersContent = (
            <div
                style={{
                    minHeight: '60vh',
                }}>
                <Loader />
            </div>
        );
    } else if (statusFilter.length) {
        ordersContent = statusFilter.map(order => (
            <OrderCard
                key={order.id}
                order={order}
                onOpenDrawer={handleOpenDrawer}
                onCancel={handleCancelClick}
            />
        ));
    } else {
        ordersContent = (
            <EmptyTab description="Sizda buyurtmalar mavjud emas" />
        );
    }

    useEffect(() => {
        if (orderId && orders) {
            const found = orders.find(o => o.id === Number(orderId));
            if (found) {
                setSelectedOrder(found);
                setOpenDrawer(true);

                const { orderId, ...rest } = router.query;
                router.replace(
                    {
                        pathname: router.pathname,
                        query: rest,
                    },
                    undefined,
                    { shallow: true } // sahifani qayta yuklamasdan
                );
            }
        }
    }, [orderId, orders]);

    useEffect(() => {
        if (orders?.length) {
            setSelectedOrder(prev => {
                if (!prev) return null;
                return orders.find(o => o.id === prev.id) || null;
            });
        }
    }, [orders]);

    return (
        <>
            <div className="d-flex flex-column gap-3">{ordersContent}</div>

            <Modal
                title="Buyurtmani bekor qilish"
                open={isModalOpen}
                okButtonProps={{
                    disabled: !reason || isCancelling,
                }}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Bekor qilish"
                cancelText="Yopish"
                confirmLoading={isCancelling}>
                <p>
                    Haqiqatan ham “{selectedOrder?.title}” buyurtmasini bekor
                    qilmoqchimisiz?
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
                onOpen={() => setOpenDrawer(true)}
                order={selectedOrder}
            />
        </>
    );
};
