import React, { useMemo } from 'react';
import { Form, Modal, Select, message } from 'antd';
import useCancelOrder from '../model/useCancelOrder';
import useGetReasons from '../model/useGetReasons';
import { useQueryClient } from '@tanstack/react-query';

type OrderCancelModalProps = {
    isOpen: boolean;
    selectedOrder: any;
    onClose: () => void;
};

type OrderCancelModalFieldTypes = {
    reason?: string;
};

const OrderCancelModal = ({
    isOpen,
    selectedOrder,
    onClose,
}: OrderCancelModalProps) => {
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const { data: dataReasons } = useGetReasons();
    const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();

    const reasonOptions = useMemo(() => {
        if (!dataReasons || !dataReasons.length) return [];
        return dataReasons.map((reason: any) => ({
            value: reason.id,
            label: reason.reason,
        }));
    }, [dataReasons]);

    const onFinish = (values: OrderCancelModalFieldTypes) => {
        const { reason } = values;

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
                        queryClient.invalidateQueries({ queryKey: ['orders'] });

                        form.resetFields();
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

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            destroyOnClose
            title="Buyurtmani bekor qilish"
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Bekor qilish"
            cancelText="Yopish"
            confirmLoading={isCancelling}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <p>
                    Haqiqatan ham "<strong>{selectedOrder?.title}</strong>"
                    buyurtmasini bekor qilmoqchimisiz?
                </p>
                <Form.Item
                    name="reason"
                    label="Sababni tanlang"
                    rules={[
                        { required: true, message: 'Iltimos, sababni tanlang' },
                    ]}>
                    <Select
                        className="w-100"
                        placeholder="Bekor qilish sababini tanlang..."
                        options={reasonOptions}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrderCancelModal;
