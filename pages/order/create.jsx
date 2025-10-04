import React from 'react';
import { Form, Modal, Button } from 'antd';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import useCreateOrder from '~/shared/hooks/useCreateOrder';

const breadCrumb = [
    {
        text: 'Asosiy sahifa',
        url: '/',
    },
    {
        text: 'Maxsus buyurtma yaratish',
    },
];

function OrderCreate() {
    return (
        <PageContainer title="Order Create">
            <div className="ps-page--simple mb-4">
                <Meta title={'Maxsus buyurtma yaratish'} />
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="ps-section--shopping ps-shopping-cart">
                    <div className="container">
                        <div className="ps-section__header">
                            <h1>Maxsus buyurtma yaratish</h1>
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
            <Form
                form={form}
                layout="vertical"
                className="create-order-form"
                onFinish={handleOpenConfirm}>
                {formItemsContent}
                <Form.Item className="mb-64 md:mb-0">
                    <Button
                        loading={isPending}
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="mt-3 py-4 fs-4 form-element"
                        block>
                        {isPending ? (
                            <div className="d-flex align-items-center gap-3">
                                Buyurtmani joylashtirilmoqda...
                            </div>
                        ) : (
                            'Buyurtmani joylashtirish'
                        )}
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="Buyurtmani tasdiqlash"
                open={confirmOpen}
                onCancel={handleCloseConfirm}
                footer={[
                    <Button key="cancel" onClick={handleCloseConfirm}>
                        Yo‘q
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
