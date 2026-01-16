import React from 'react';
import { Form, Modal, Button, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import PhoneNumberModal from '~/features/orders/ui/PhoneNumberModal';
import useCreateOrder from '~/shared/hooks/useCreateOrder';
import useResponsive from '~/shared/utilities/useResponsive';
import { useTranslation } from 'next-i18next';

const CreateOrderModal = ({
    open,
    onClose,
    id,
    seller,
    sellerInfo,
    defaultDirection,
    onSuccess,
}) => {
    const { t } = useTranslation('seller');
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
    } = useCreateOrder({
        size: 'middle',
        id,
        defaultDirection,
        directOrderOnSuccess: onSuccess,
        directOrderOnClose: onClose,
    });

    const { isMobile } = useResponsive();

    return (
        <>
            <Modal
                width={600}
                title={
                    seller
                        ? t('createOrder.titleForSeller', { seller })
                        : t('createOrder.title')
                }
                open={open}
                onCancel={onClose}
                footer={null}
                style={{
                    zIndex: 11100,
                }}
                centered>
                {seller && sellerInfo && (
                    <div
                        className="user-card mb-3 p-3 rounded-4"
                        style={{
                            background:
                                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: '1px solid #e8e8e8',
                        }}>
                        <div className="d-flex align-items-center gap-1 justify-content-between">
                            <div className="d-flex align-items-center gap-3">
                                <div
                                    className="user-avatar d-flex align-items-center justify-content-center rounded-circle"
                                    style={{
                                        width: '50px',
                                        overflow: 'hidden',
                                        aspectRatio: '1/1',
                                        background: '#fff',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        color: '#667eea',
                                    }}>
                                    {sellerInfo?.image ? (
                                        <img
                                            className={
                                                'rounded-circle object-fit-cover'
                                            }
                                            style={{
                                                width: '50px',
                                                aspectRatio: '1/1',
                                            }}
                                            src={sellerInfo.image}
                                            alt="No"
                                        />
                                    ) : (
                                        seller?.charAt(0)?.toUpperCase()
                                    )}
                                </div>
                                <div>
                                    <div className="d-flex align-items-center gap-2">
                                        <h6 className="m-0 text-white fw-bold">
                                            {seller}
                                        </h6>
                                        <span
                                            className="verified-badge"
                                            style={{
                                                color: '#4CAF50',
                                                fontSize: '16px',
                                            }}>
                                            ✓
                                        </span>
                                    </div>
                                    <div
                                        className="d-flex align-items-center gap-1 position-relative text-white-50 small"
                                        style={{
                                            bottom: '3px',
                                        }}>
                                        {sellerInfo?.position ||
                                            t('createOrder.noProfession')}
                                    </div>
                                </div>
                            </div>
                            <div className="text-end">
                                {/*NOTE: this will be implemented soon*/}
                                {/* <div
                                    className="d-flex align-items-center gap-1 position-relative text-white fw-bold justify-content-end"
                                    style={{
                                        bottom: '3px',
                                    }}>
                                    <span
                                        style={{
                                            color: '#FFD700',
                                            fontSize: '14px',
                                        }}>
                                        ★
                                    </span>
                                    <span>10/10</span>
                                </div>
                                <div className="text-white-50 small">
                                    65 дней, предоплата 25%
                                </div> */}
                            </div>
                        </div>
                    </div>
                )}

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
                                    ? t('createOrder.placingOrder')
                                    : t('createOrder.placeOrder')}
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
                                ? t('createOrder.placingOrder')
                                : t('createOrder.placeOrder')}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title={t('createOrder.confirmTitle')}
                open={confirmOpen}
                onCancel={handleCloseConfirm}
                footer={[
                    <Button key="cancel" onClick={handleCloseConfirm}>
                        {t('createOrder.confirmNo')}
                    </Button>,
                    <Button
                        key="ok"
                        type="primary"
                        loading={isPending}
                        onClick={handleConfirm}>
                        {t('createOrder.confirmYes')}
                    </Button>,
                ]}
                centered>
                <p>{t('createOrder.confirmMessage', { seller })}</p>
            </Modal>
            <PhoneNumberModal
                open={phoneModalOpen}
                onCancel={handlePhoneModalCancel}
                onSubmit={handlePhoneSubmit}
                loading={isPending}
            />
        </>
    );
};

export default CreateOrderModal;

export const Info = ({ title }) => {
    return (
        <Tooltip title={title} className="d-flex align-items-center">
            <div
                className="d-flex align-items-center justify-content-center ms-2"
                style={{ width: '15px', height: '15px', cursor: 'pointer' }}>
                <QuestionCircleOutlined />
            </div>
        </Tooltip>
    );
};
