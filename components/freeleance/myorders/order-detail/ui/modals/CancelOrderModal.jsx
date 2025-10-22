import React, { useState } from 'react';
import { Modal, Select, message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import useCancelOrder from '../../../myorder/api/useCancelOrder';
import useGetReasons from '../../../myorder/api/useGetReasons';
import useGetOrderById from '../../api/useGetOrderById';

export const CancelOrderModal = ({ isOpen, selectedOrder, onClose}) => {
    const [reason, setReason] = useState('');
    const { data: reasons } = useGetReasons();
    const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();
    const queryClient = useQueryClient();

    const { data: order, refetch } = useGetOrderById(selectedOrder?.id, {
        enabled: false, // Avtomatik fetch qilmaslik uchun
    });

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
                        

                        // Barcha kerakli query'larni invalidate qilish
                        queryClient.invalidateQueries(['ordersStatus']);
                        queryClient.invalidateQueries(['orders']);
                        queryClient.invalidateQueries(['order', selectedOrder.id]);
                        
                        // Order ma'lumotlarini yangilash
                        refetch();
                        
                        setReason('');
                        onClose();
                    },
                    onError: (error) => {
                        message.error('Bekor qilishda xatolik yuz berdi');
                        console.error('Cancel order error:', error);
                    }
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
            confirmLoading={isCancelling}
            okButtonProps={{ danger: true }}>
            <p>
                Haqiqatan ham "<strong>{selectedOrder?.title}</strong>"
                buyurtmasini bekor qilmoqchimisiz?
            </p>
            <h5 style={{ marginTop: '20px' }}>Sababni tanlang</h5>
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
    );
};