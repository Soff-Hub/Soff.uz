import { Modal, Form, InputNumber, Input, Button, message } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/repositories/api';

const BalanceWithDrawModal = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const formatCardNumber = (value) => {
        return value
            .replace(/\D/g, '')
            .slice(0, 16)
            .replace(/(.{4})/g, '$1 ')
            .trim();
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => api.post('seller/application/', data),
        onSuccess: () => {
            message.success('So‘rov muvaffaqiyatli yuborildi!');
            form.resetFields();
            onClose();
            queryClient.invalidateQueries({ queryKey: ['getCustomBalance'] });
        },
        onError: (error) => {
            const errMsg =
                error?.response?.data?.msg ||
                'Xatolik yuz berdi. Qayta urinib ko‘ring.';
            message.error(errMsg);
        },
    });

    const handleFinish = (values) => {
        const payload = {
            credit_card: values.cardNumber.replace(/\s/g, ''),
            amount: values.amount,
            app_type: 'freelance',
        };
        mutate(payload);
    };

    return (
        <Modal
            title="Balansdan pul yechish"
            open={open}
            onCancel={() => {
                form.resetFields();
                onClose();
            }}
            footer={null}
            centered
            className={styles.modal}
            destroyOnHidden>
            <div className={styles.wrapper}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleFinish}
                    className={styles.form}>
                    <Form.Item
                        label="Karta raqami"
                        name="cardNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Karta raqamini kiriting',
                            },
                            {
                                validator: (_, value) => {
                                    const digits =
                                        value?.replace(/\s/g, '') || '';
                                    if (digits.length !== 16) {
                                        return Promise.reject(
                                            'Karta raqami 16 xonali bo‘lishi kerak'
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}>
                        <Input
                            placeholder="8600 1234 5678 9012"
                            inputMode="numeric"
                            maxLength={19}
                            onChange={(e) => {
                                const formatted = formatCardNumber(
                                    e.target.value
                                );
                                form.setFieldsValue({ cardNumber: formatted });
                            }}
                            style={{ height: '44px' }}
                            className={styles.input}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Yechiladigan summa"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                message: 'Iltimos summani kiriting',
                            },
                            {
                                validator: (_, value) => {
                                    if (!value) return Promise.resolve();
                                    if (value <= 0)
                                        return Promise.reject(
                                            'Summani to‘g‘ri kiriting'
                                        );
                                    return Promise.resolve();
                                },
                            },
                        ]}>
                        <InputNumber
                            placeholder="50 000"
                            min={0}
                            step={1000}
                            style={{
                                width: '100%',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            formatter={(val) =>
                                `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                            }
                            parser={(val) => val.replace(/\s/g, '')}
                            className={styles.input}
                        />
                    </Form.Item>

                    <div className={styles.actions}>
                        <Button
                            onClick={() => {
                                onClose();
                                form.resetFields();
                            }}
                            className={styles.cancelBtn}>
                            Bekor qilish
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isPending}
                            className={styles.submitBtn}>
                            Tasdiqlash
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
};

export default BalanceWithDrawModal;
