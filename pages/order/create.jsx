import React, { useEffect } from 'react';
import { Form, Modal, Button } from 'antd';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import useCreateOrder from '~/shared/hooks/useCreateOrder';
import { useRouter } from 'next/router';
import useResponsive from '~/shared/utilities/useResponsive';
import { useSelector } from 'react-redux';
import PhoneNumberModal from '~/features/orders/ui/PhoneNumberModal';
import ProductVideoBanner from '~/shared/components/product-video-banner';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import Editor from '~/components/Editor';

const video_url = 'https://youtu.be/qy38WGhOq3Q?si=0y_oSKS1WRiSJ4G5';
function OrderCreate() {
    const { t } = useTranslation('order-create');
    const router = useRouter();
    const { isLoggedIn, status } = useSelector((state) => state.auth);

    useEffect(() => {
        const handleCheckLogin = async () => {
            if (status !== 'idle' && !isLoggedIn) {
                router.replace(
                    '/auth/login?returnUrl=' +
                        encodeURIComponent('/order/create')
                );
            }
        };
        handleCheckLogin();
    }, [router, isLoggedIn, status]);

    return (
        <PageContainer>
            <Meta title={t('meta.title')} description={t('meta.description')} />
            <ProductVideoBanner
                videoUrl={video_url}
                title={t('videoBanner.title')}
                subtitle={t('videoBanner.subtitle')}
            />
            <div className="page-content">
                <div className="container">
                    <div style={{ marginBottom: '10px', paddingBottom: '0' }}>
                        <h3
                            style={{
                                fontSize: '18px',
                                marginBottom: '0',
                                fontWeight: '600',
                                lineHeight: '1.2',
                                textAlign: 'center',
                            }}>
                            {t('form.title')}
                        </h3>
                    </div>
                    <OrderCreateForm />
                </div>
            </div>
        </PageContainer>
    );
}

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'order-create',
                'common',
                'modals',
            ])),
        },
    };
}

const OrderCreateForm = () => {
    const { t } = useTranslation('order-create');
    const {
        form,
        formItemsContent,
        isPending,
        confirmOpen,
        handleConfirm,
        handleOpenConfirm,
        handleCloseConfirm,
        phoneModalOpen,
        handlePhoneSubmit,
        handlePhoneModalCancel,
    } = useCreateOrder();
    const { isMobile } = useResponsive();

    return (
        <div>
            <style jsx>{`
                .create-order-form {
                    max-width: 650px !important;
                    margin: 0 auto !important;
                }

                .create-order-form .ant-form-item {
                    margin-bottom: 16px !important;
                }
                .create-order-form .ant-form-item:first-child {
                    margin-top: 0 !important;
                }
                .create-order-form .ant-form-item-label {
                    padding-bottom: 4px !important;
                    margin-bottom: 0 !important;
                }
                .create-order-form .ant-form-item-label > label {
                    height: auto !important;
                    font-size: 13px !important;
                    line-height: 1.3 !important;
                    font-weight: 500 !important;
                    color: #333 !important;
                }

                /* Input styles */
                .create-order-form .form-element,
                .create-order-form .ant-select,
                .create-order-form .ant-picker {
                    height: 40px !important;
                    font-size: 14px !important;
                }
                .create-order-form .ant-select-selector {
                    height: 40px !important;
                    line-height: 40px !important;
                    padding: 0 14px !important;
                }
                .create-order-form .ant-select-selection-item {
                    line-height: 38px !important;
                }
                .create-order-form .ant-input {
                    height: 40px !important;
                    line-height: 40px !important;
                    font-size: 14px !important;
                    padding: 8px 14px !important;
                }
                .create-order-form .ant-input-number {
                    height: 40px !important;
                }
                .create-order-form .ant-input-number-input {
                    height: 38px !important;
                    font-size: 14px !important;
                    padding: 8px 14px !important;
                }
                .create-order-form .ant-picker-input {
                    padding: 0 14px !important;
                }
                .create-order-form .ant-picker-input > input {
                    font-size: 14px !important;
                    padding: 8px 0 !important;
                }

                .create-order-form textarea.ant-input {
                    height: auto !important;
                    min-height: 70px !important;
                    line-height: 1.5 !important;
                    padding: 10px 14px !important;
                    font-size: 14px !important;
                }

                /* Placeholder */
                .create-order-form .ant-input::placeholder,
                .create-order-form .ant-input-number-input::placeholder,
                .create-order-form .ant-picker-input input::placeholder,
                .create-order-form textarea.ant-input::placeholder {
                    color: #999 !important;
                    font-size: 13px !important;
                    opacity: 1 !important;
                }

                .create-order-form .ant-select-selection-placeholder {
                    color: #999 !important;
                    font-size: 13px !important;
                }

                .create-order-form .d-flex.gap-2 {
                    gap: 8px !important;
                }
                .create-order-form .my-3 {
                    margin-top: 6px !important;
                    margin-bottom: 6px !important;
                }
                .create-order-form .mb-2 {
                    margin-bottom: 6px !important;
                }
                .create-order-form .mb-3 {
                    margin-bottom: 0 !important;
                }
                .create-order-form .option-price-btn {
                    height: 32px !important;
                    font-size: 12px !important;
                    padding: 0 12px !important;
                    line-height: 32px !important;
                }
                .create-order-form .thumbs-swiper {
                    margin-top: 6px !important;
                }
                .ant-popover {
                    max-width: 320px !important;
                }

                @media (min-width: 1024px) and (max-width: 1400px) {
                    .ant-popover-placement-right,
                    .ant-popover-placement-rightTop,
                    .ant-popover-placement-rightBottom {
                        margin-left: 0 !important;
                    }

                    .ant-popover-placement-top,
                    .ant-popover-placement-bottom {
                        margin-left: 0 !important;
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                    }
                }

                @media (max-width: 1024px) {
                    .ant-popover {
                        max-width: 280px !important;
                    }
                }
                @media (max-width: 768px) {
                    .create-order-form .ant-form-item {
                        margin-bottom: 12px !important;
                    }
                    .create-order-form .ant-form-item-label > label {
                        font-size: 12px !important;
                    }
                }
            `}</style>

            <Form
                form={form}
                layout="vertical"
                className="create-order-form"
                onFinish={handleOpenConfirm}
                onFinishFailed={(errorInfo) => {
                    const firstErrorField =
                        errorInfo?.errorFields?.[0]?.name?.[0];
                    if (firstErrorField) {
                        form.scrollToField(firstErrorField, {
                            behavior: 'smooth',
                            block: 'center',
                        });
                    }
                }}
                style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    paddingTop: '0',
                }}>
                {formItemsContent}
                {isMobile && (
                    <Form.Item
                        style={{
                            marginTop: isMobile ? 0 : '10px',
                            marginBottom: 0,
                            position: isMobile ? 'fixed' : 'static',
                            bottom: isMobile ? 0 : 'auto',
                            left: isMobile ? 0 : 'auto',
                            width: isMobile ? '100%' : 'auto',
                            zIndex: isMobile ? 1000 : 'auto',
                            padding: isMobile ? '0' : '0',
                            background: isMobile ? '#fff' : 'transparent', // mobilda orqa fon
                            boxShadow: isMobile
                                ? '0 -2px 10px rgba(0,0,0,0.05)'
                                : 'none', // engil soyali
                        }}>
                        <Button
                            loading={isPending}
                            type="primary"
                            htmlType="submit"
                            style={{
                                height: isMobile ? '50px' : '38px',
                                fontSize: isMobile ? '15px' : '14px',
                                width: '100%',
                                borderRadius: isMobile ? 0 : 6,
                            }}
                            block>
                            {isPending
                                ? t('form.submit.loading')
                                : t('form.submit.text')}
                        </Button>
                    </Form.Item>
                )}
                <Form.Item
                    style={{
                        marginTop: '10px',
                        marginBottom: 0,
                    }}>
                    <Button
                        loading={isPending}
                        type="primary"
                        htmlType="submit"
                        block
                        style={{ height: '38px', fontSize: '14px' }}>
                        {isPending
                            ? t('form.submit.loading')
                            : t('form.submit.text')}
                    </Button>
                </Form.Item>
            </Form>

            <Modal
                title={t('modal.confirmTitle')}
                open={confirmOpen}
                onCancel={handleCloseConfirm}
                footer={[
                    <Button
                        key="ok"
                        type="primary"
                        loading={isPending}
                        onClick={handleConfirm}>
                        {t('modal.confirmButton')}
                    </Button>,
                ]}
                centered>
                <p
                    style={{
                        lineHeight: '1.6',
                        fontSize: '14px',
                        color: '#333',
                        marginBottom: '0',
                    }}>
                    <strong
                        style={{
                            display: 'block',
                            textAlign: 'center',
                            fontSize: '16px',
                            marginBottom: '16px',
                            color: '#1a1a1a',
                        }}>
                        {t('modal.confirmQuestion')}
                    </strong>

                    <div
                        style={{
                            background: '#f8f9fa',
                            padding: '16px',
                            borderRadius: '8px',
                            borderLeft: '4px solid #28a745',
                        }}>
                        <div style={{ marginBottom: '8px' }}>
                            <span style={{ marginRight: '8px' }}>✅</span>
                            {t('modal.point1')}
                        </div>

                        <div style={{ marginBottom: '8px' }}>
                            <span style={{ marginRight: '8px' }}>💼</span>
                            {t('modal.point2')}
                        </div>

                        <div>
                            <span style={{ marginRight: '8px' }}>🎯</span>
                            {t('modal.point3')}
                        </div>
                    </div>
                </p>
            </Modal>

            <PhoneNumberModal
                open={phoneModalOpen}
                onCancel={handlePhoneModalCancel}
                onSubmit={handlePhoneSubmit}
                loading={isPending}
            />
        </div>
    );
};

export default OrderCreate;
