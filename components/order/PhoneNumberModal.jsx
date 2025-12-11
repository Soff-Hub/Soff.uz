import React from 'react';
import { Modal, Form, Input, Button, Alert } from 'antd';

const PhoneNumberModal = ({ open, onCancel, onSubmit, loading }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        const phoneNumber = '+998' + values.phone;
        onSubmit(phoneNumber);
    };

    return (
        <Modal
            title="Telefon raqamni kiriting"
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            closable={!loading}>
            <Alert
                description="Buyurtma berishda iltimos, telefon raqamingizni kiriting. Bu buyurtma bajarilish davomida siz bilan bog‘lana olishimiz uchun muhim."
                type="warning"
                showIcon
            />
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{ marginTop: '20px' }}>
                <Form.Item
                    name="phone"
                    label="Telefon raqam"
                    rules={[
                        {
                            required: true,
                            message: 'Telefon raqam kiritish majburiy',
                        },
                        {
                            pattern: /^\d{9}$/,
                            message: 'Iltimos, haqiqiy telefon raqam kiriting',
                        },
                    ]}
                    normalize={(value) => value.replace(/\D/g, '').slice(0, 9)}>
                    <Input
                        autoComplete="off"
                        style={{ height: '50px', fontSize: '16px' }}
                        type="text"
                        placeholder="Telefon raqam"
                        addonBefore="+998"
                        disabled={loading}
                    />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                        style={{ height: '45px', fontSize: '16px' }}>
                        {loading ? 'Yuborilmoqda...' : 'Tasdiqlash'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PhoneNumberModal;
