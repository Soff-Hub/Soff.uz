import React from 'react';
import { Modal, Form, Input, Button, Alert } from 'antd';
import { useTranslation } from 'next-i18next';

const PhoneNumberModal = ({ open, onCancel, onSubmit, loading }) => {
    const { t } = useTranslation('modals');
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        const phoneNumber = '+998' + values.phone;
        onSubmit(phoneNumber);
    };

    return (
        <Modal
            title={t('phoneNumber.title')}
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            closable={!loading}>
            <Alert
                description={t('phoneNumber.alertDescription')}
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
                    label={t('phoneNumber.label')}
                    rules={[
                        {
                            required: true,
                            message: t('phoneNumber.required'),
                        },
                        {
                            pattern: /^\d{9}$/,
                            message: t('phoneNumber.pattern'),
                        },
                    ]}
                    normalize={(value) => value.replace(/\D/g, '').slice(0, 9)}>
                    <Input
                        autoComplete="off"
                        style={{ height: '50px', fontSize: '16px' }}
                        type="text"
                        placeholder={t('phoneNumber.placeholder')}
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
                        {loading
                            ? t('phoneNumber.submitting')
                            : t('phoneNumber.submit')}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PhoneNumberModal;
