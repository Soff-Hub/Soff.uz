import React, { useState } from "react";
import { Modal, Select, message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import useGetOrders from "./api/useGetOrders";
import useCancelOrder from "./api/useCancelOrder";
import useGetReasons from "./api/useGetReasons";
import SelectOrderDrawer from "./ui/SelectOrderDrawer";
import OrderCard from "../../../../entities/order/order-card";

export const AllOrdersTable = ({ type }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [reason, setReason] = useState("");
    const { data: orders } = useGetOrders();
    const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();
    const { data: reasons } = useGetReasons();
    const [openDrawer, setOpenDrawer] = useState(false);
    const queryClient = useQueryClient();

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
                        setReason("");
                        setSelectedOrder(null);
                        message.success("Buyurtma muvaffaqiyatli bekor qilindi!");
                        queryClient.invalidateQueries(["ordersStatus"]);
                    },
                }
            );
        }
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setReason("");
        setSelectedOrder(null);
    };

    const statusFilter =
        orders?.filter((order) =>
            type?.includes(order.order_status_doing?.status || "pending")
        ) || [];

    return (
        <>
            <div className="d-flex flex-column gap-3">
                {statusFilter.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        onOpenDrawer={handleOpenDrawer}
                        onCancel={handleCancelClick}
                    />
                ))}
            </div>

            <Modal
                title="Buyurtmani bekor qilish"
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Bekor qilish"
                cancelText="Yopish"
                confirmLoading={isCancelling}
            >
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
                order={selectedOrder}
            />
        </>
    );
};
