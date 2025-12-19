import React, { useState } from 'react';
import { Modal, Select, message } from 'antd';
import useCancelOrder from '../../../myorder/api/useCancelOrder';
import useGetReasons from '../../../myorder/api/useGetReasons';

export const CancelOrderModal = ({ isOpen, selectedOrder, onClose }) => {
    const [reason, setReason] = useState(null);
    const { data: reasons } = useGetReasons();
    const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();

    const handleOk = () => {
        if (!reason) {
            message.warning('Iltimos, sababni tanlang');
            return;
        }

        if (selectedOrder) {
            cancelOrder(
                { id: selectedOrder.id, reason },
                {
                    onSuccess: () => {
                        message.success(
                            'Buyurtma muvaffaqiyatli bekor qilindi!'
                        );

                        setReason('');
                        onClose();
                    },
                    onError: (error) => {
                        message.error('Bekor qilishda xatolik yuz berdi');
                        console.error('Cancel order error:', error);
                    },
                }
            );
        }
    };

    const handleCancel = () => {
        setReason('');
        onClose();
    };

    return (
        <Modal
            title="Buyurtmani bekor qilish"
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Bekor qilish"
            cancelText="Yopish"
            confirmLoading={isCancelling}>
            <p>
                Haqiqatan ham "<strong>{selectedOrder?.title}</strong>"
                buyurtmasini bekor qilmoqchimisiz?
            </p>
            <h5 style={{ marginTop: '20px' }}>Sababni tanlang</h5>
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
    );
};
