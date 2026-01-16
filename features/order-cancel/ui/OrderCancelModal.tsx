import React, { useMemo } from 'react';
import { Form, Modal, Select, message } from 'antd';
import { useTranslation, Trans } from 'next-i18next';
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
    const { t } = useTranslation('modals');
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
            message.warning(t('orderCancel.reasonRequired'));
            return;
        }

        if (selectedOrder) {
            cancelOrder(
                { id: selectedOrder.id, reason },
                {
                    onSuccess: () => {
                        message.success(t('orderCancel.success'));
                        queryClient.invalidateQueries({ queryKey: ['orders'] });

                        form.resetFields();
                        onClose();
                    },
                    onError: (error) => {
                        message.error(t('orderCancel.error'));
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
            title={t('orderCancel.title')}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={t('orderCancel.okText')}
            cancelText={t('orderCancel.cancelText')}
            confirmLoading={isCancelling}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <p>
                    <Trans
                        t={t}
                        i18nKey="orderCancel.confirmQuestion"
                        values={{ title: selectedOrder?.title }}
                        components={{ strong: <strong /> }}
                    />
                </p>
                <Form.Item
                    name="reason"
                    label={t('orderCancel.reasonLabel')}
                    rules={[
                        {
                            required: true,
                            message: t('orderCancel.reasonRequired'),
                        },
                    ]}>
                    <Select
                        className="w-100"
                        placeholder={t('orderCancel.reasonPlaceholder')}
                        options={reasonOptions}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrderCancelModal;
