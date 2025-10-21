import React, { useEffect, useState } from 'react';
import { Modal, Select, message, Button } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import useGetOrders from './api/useGetOrders';
import useCancelOrder from './api/useCancelOrder';
import useGetReasons from './api/useGetReasons';
import SelectOrderDrawer from './ui/SelectOrderDrawer';
import OrderCard from '~/entities/order/order-card';
import Loader from '~/components/shared/loader';
import { useRouter } from 'next/router';
import { EmptyTab } from './MyOrderTabs';
import ServiceCheckout from '~/components/freeleance/services/service-deatail/ui/auth/serviceCheckout';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';

const rejectableStatuses = [
    'order_accepted',
    'order_file_sent',
    'rejected',
    'pending',
];

export const AllOrdersTable = ({ type }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [notPaidOrder, setNotPaidOrder] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [reason, setReason] = useState('');
    const { data: orders, isLoading: ordersLoading } = useGetOrders();
    const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();
    const { data: reasons } = useGetReasons();
    const [openDrawer, setOpenDrawer] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();
    const { orderId } = router.query;

    const handleOpenDrawer = (order) => {
        setSelectedOrder(order);
        setOpenDrawer(true);
    };

    const handleCancelClick = (order) => {
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
        setReason('');
        setSelectedOrder(null);
    };

    const handleSelectNotPaidOrder = (order) => {
        setNotPaidOrder({
            id: order?.id,
            title: order?.title,
            price: order?.service?.price ?? order?.budget ?? 0,
        });
        setIsPaymentModalOpen(true);
    };

    const statusFilter =
        orders?.filter((order) =>
            type
                ? type?.includes(order.order_status_doing?.status || 'pending')
                : true
        ) || [];

    console.log({ orders, statusFilter });

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
        ordersContent = statusFilter.map((order) => (
            <OrderCard
                key={order.id}
                order={order}
                onOpenDrawer={handleOpenDrawer}
                onCancel={handleCancelClick}
                onSelectNotPaidOrder={handleSelectNotPaidOrder}
            />
        ));
    } else {
        ordersContent = (
            <EmptyTab description="Sizda buyurtmalar mavjud emas" />
        );
    }

    useEffect(() => {
        if (orderId && orders) {
            const found = orders.find((o) => o.id === Number(orderId));
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
            setSelectedOrder((prev) => {
                if (!prev) return null;
                return orders.find((o) => o.id === prev.id) || null;
            });
        }
    }, [orders]);

    return (
        <>
            <div className="d-flex flex-column gap-3">{ordersContent}</div>

            <Modal
                title="Buyurtmani bekor qilish"
                open={isModalOpen}
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
                    onChange={(val) => setReason(val)}
                    options={reasons?.map((reason) => ({
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

            <Modal
                open={isPaymentModalOpen}
                onCancel={() => setIsPaymentModalOpen(false)}
                footer={null}
                width={600}>
                <div className="type_payment p-lg-5 p-md-5 p-4">
                    {!showPayment ? (
                        <>
                            <h3 className="type_payment_h3 text-center mb-4">
                                Buyurtma uchun to'lovni amalga oshiring
                            </h3>

                            <div className="security-message mb-4 text-center">
                                <i className="fa-solid fa-shield-halved text-success fs-4 mb-2"></i>
                                <p className="text-muted mb-0">
                                    Sizning to'lovingiz Soff tizimi tomonidan
                                    xavfsiz saqlanadi. Mutaxassisga to'lov faqat
                                    siz ishni ko'rib chiqib, tasdiqlaganingizdan
                                    so'ng amalga oshiriladi.
                                </p>
                            </div>

                            <div className="service-details-box bg-white border rounded p-3 mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <i className="fa-solid fa-file-lines text-primary me-3 fs-4"></i>
                                        <div>
                                            <h5 className="mb-1 fw-bold">
                                                {notPaidOrder?.title}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h4 className="text-primary mb-0 fw-bold">
                                            {formatCurrencyWithSpace(
                                                notPaidOrder?.price
                                            )}{' '}
                                            so'm
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="px-5 py-2"
                                    style={{
                                        backgroundColor: '#28a745',
                                        borderColor: '#28a745',
                                        marginTop: '10px',
                                    }}
                                    onClick={() => setShowPayment(true)}>
                                    Buyurtma berish
                                    <i className="fa-solid fa-arrow-right ms-2"></i>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <Button
                                    type="text"
                                    icon={
                                        <i className="fa-solid fa-arrow-left"></i>
                                    }
                                    onClick={() => setShowPayment(false)}>
                                    Orqaga
                                </Button>
                            </div>
                            <div className="bg-white">
                                <ServiceCheckout
                                    order_id={notPaidOrder?.id}
                                    onClose={() => setIsPaymentModalOpen(false)}
                                />
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
};
