import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ServiceCheckout from '~/components/freeleance/services/service-deatail/ui/auth/serviceCheckout';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { useRouter } from 'next/router';

function OrderPaymentPrompt({ isOpen, onClose, order }) {
    const [showPayment, setShowPayment] = useState(false);
    const { push } = useRouter();
    return (
        <Modal open={isOpen} onCancel={onClose} footer={null} width={600}>
            <div className="type_payment p-lg-5 p-md-5 p-4">
                {!showPayment ? (
                    <>
                        <h3 className="type_payment_h3 text-center mb-4">
                            Buyurtma uchun to'lovni amalga oshiring
                        </h3>

                        <div className="security-message mb-4 text-center">
                            <i className="fa-solid fa-shield-halved text-success fs-4 mb-2"></i>
                            <p className="text-muted mb-0">
                                Sizning to'lovingiz Soff tizimi tomonidan
                                xavfsiz saqlanadi. Mutaxassisga to'lov faqat siz
                                ishni ko'rib chiqib, tasdiqlaganingizdan so'ng
                                amalga oshiriladi.
                            </p>
                        </div>

                        <div className="service-details-box bg-white border rounded p-3 mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <i className="fa-solid fa-file-lines text-primary me-3 fs-4"></i>
                                    <div>
                                        <h5 className="mb-1 fw-bold">
                                            {order?.title}
                                        </h5>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <h4 className="text-primary mb-0 fw-bold">
                                        {formatCurrencyWithSpace(order?.price)}{' '}
                                        so'm
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <Button
                                type="primary"
                                size="large"
                                className="px-5 py-2"
                                style={{
                                    backgroundColor: '#28a745',
                                    borderColor: '#28a745',
                                    marginTop: '10px',
                                }}
                                onClick={() => setShowPayment(true)}>
                                Buyurtma berish
                                <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="type_payment_h3 mb-0">
                                {/* To'lov turini tanlang: */}
                            </h3>
                            <Button
                                type="text"
                                icon={
                                    <i className="fa-solid fa-arrow-left"></i>
                                }
                                onClick={() => setShowPayment(false)}>
                                Orqaga
                            </Button>
                        </div>
                        <div className="bg-white">
                            <ServiceCheckout
                                order_id={order?.id}
                                onSuccess={() => push(`/order/${order?.id}`)}
                                onClose={onClose}
                            />
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
}

export default OrderPaymentPrompt;
