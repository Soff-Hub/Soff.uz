import React from 'react';
import { Form, Modal, Button } from 'antd';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import useCreateOrder from '~/shared/hooks/useCreateOrder';

function OrderCreate() {
    return (
        <PageContainer title="Order Create">
            <div className="ps-page--simple">
                <Meta title={'Maxsus buyurtma yaratish'} />
                <div className="ps-section--shopping ps-shopping-cart" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                    <div className="container" style={{ paddingTop: '0' }}>
                        <div className="ps-section__header" style={{ marginBottom: '4px', paddingBottom: '0' }}>
                            <h3 style={{ fontSize: '18px', marginBottom: '0', fontWeight: '600', lineHeight: '1.2' }}>
                                Maxsus buyurtma yaratish
                            </h3>
                        </div>
                        <OrderCreateForm />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}

const OrderCreateForm = () => {
    const {
        form,
        formItemsContent,
        isPending,
        confirmOpen,
        handleConfirm,
        handleOpenConfirm,
        handleCloseConfirm,
    } = useCreateOrder();
    
    return (
        <div>
           <style jsx global>{`
    .ps-section--shopping.ps-shopping-cart {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
    }
    .ps-section--shopping .container {
        padding-top: 0 !important;
    }
    .ps-section__header {
        margin-bottom: 7px !important;
        padding-bottom: 0 !important;
        margin-top: 0 !important;
        padding-top: 0 !important;
    }
    .ps-section__header h3 {
        font-size: 20px !important;
        margin-bottom: 0 !important;
        margin-top: 0 !important;
        line-height: 1.2 !important;
    }
    
    .create-order-form .ant-form-item {
        margin-bottom: 14px !important;
    }
    .create-order-form .ant-form-item:first-child {
        margin-top: 0 !important;
    }
    .create-order-form .ant-form-item-label {
        padding-bottom: 2px !important;
        margin-bottom: 0 !important;
    }
    .create-order-form .ant-form-item-label > label {
        height: auto !important;
        font-size: 12px !important;
        line-height: 1.2 !important;
    }
    
    /* Input height va padding */
    .create-order-form .form-element,
    .create-order-form .ant-select,
    .create-order-form .ant-picker {
        height: 36px !important;
        font-size: 14px !important;
    }
    .create-order-form .ant-select-selector {
        height: 36px !important;
        line-height: 36px !important;
        padding: 0 12px !important;
    }
    .create-order-form .ant-select-selection-item {
        line-height: 34px !important;
    }
    .create-order-form .ant-input {
        height: 36px !important;
        line-height: 36px !important;
        font-size: 14px !important;
        padding: 4px 12px !important;
    }
    .create-order-form .ant-input-number {
        height: 36px !important;
    }
    .create-order-form .ant-input-number-input {
        height: 34px !important;
        font-size: 14px !important;
        padding: 4px 12px !important;
    }
    .create-order-form .ant-picker-input {
        padding: 0 12px !important;
    }
    .create-order-form .ant-picker-input > input {
        font-size: 13px !important;
        padding: 4px 0 !important;
    }
    
    /* Textarea */
    .create-order-form textarea.ant-input {
        height: auto !important;
        min-height: 60px !important;
        line-height: 1.5 !important;
        padding: 8px 12px !important;
        font-size: 14px !important;
    }
    
    /* Placeholder styles */
    .create-order-form .ant-input::placeholder,
    .create-order-form .ant-input-number-input::placeholder,
    .create-order-form .ant-picker-input input::placeholder,
    .create-order-form textarea.ant-input::placeholder {
        color: #bfbfbf !important;
        font-size: 13px !important;
        opacity: 1 !important;
    }
    
    .create-order-form .ant-select-selection-placeholder {
        color: #bfbfbf !important;
        font-size: 13px !important;
        padding-left: 0 !important;
    }
    
    .create-order-form .d-flex.gap-2 {
        gap: 6px !important;
    }
    .create-order-form .my-3 {
        margin-top: 4px !important;
        margin-bottom: 4px !important;
    }
    .create-order-form .mb-2 {
        margin-bottom: 4px !important;
    }
    .create-order-form .mb-3 {
        margin-bottom: 0 !important;
    }
    .create-order-form .option-price-btn {
        height: 28px !important;
        font-size: 11px !important;
        padding: 0 8px !important;
        line-height: 28px !important;
    }
    .create-order-form .thumbs-swiper {
        margin-top: 4px !important;
    }
    
    @media (max-width: 768px) {
        .create-order-form .ant-form-item {
            margin-bottom: 10px !important;
        }
        .create-order-form .ant-form-item-label > label {
            font-size: 11px !important;
        }
        .ps-section__header h3 {
            font-size: 18px !important;
        }
        .ps-section__header {
            margin-bottom: 20px !important;
        }
        
        /* Mobile placeholder */
        .create-order-form .ant-input::placeholder,
        .create-order-form .ant-input-number-input::placeholder,
        .create-order-form textarea.ant-input::placeholder {
            font-size: 12px !important;
        }
    }
`}</style>
            
            <Form
                form={form}
                layout="vertical"
                className="create-order-form"
                onFinish={handleOpenConfirm}
                style={{ 
                    maxWidth: '800px',
                    margin: '0 auto',
                    paddingTop: '0'
                }}>
                {formItemsContent}
                
                <Form.Item style={{ marginTop: '10px', marginBottom: '0' }}>
                    <Button
                        loading={isPending}
                        type="primary"
                        htmlType="submit"
                        style={{ height: '38px', fontSize: '14px' }}
                        block>
                        {isPending ? 'Buyurtmangiz joylashtirilmoqda...' : 'Buyurtmani joylashtirish'}
                    </Button>
                </Form.Item>
            </Form>
            
            <Modal
                title="Buyurtmani tasdiqlash"
                open={confirmOpen}
                onCancel={handleCloseConfirm}
                footer={[
                    <Button key="cancel" onClick={handleCloseConfirm}>
                        Yo'q
                    </Button>,
                    <Button
                        key="ok"
                        type="primary"
                        loading={isPending}
                        onClick={handleConfirm}>
                        Ha, buyurtmani yubor
                    </Button>,
                ]}
                centered>
                <p>
                    Rostdan ham buyurtma berishni xohlaysizmi? Buyurtmangiz 10
                    000 dan ortiq frilanserlarga yuboriladi, ular siz bilan
                    hamkorlik qilish uchun taklif yuborishadi.
                </p>
            </Modal>
        </div>
    );
};

export default OrderCreate;