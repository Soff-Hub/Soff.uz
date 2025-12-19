import React, { useState, useEffect } from 'react';
import { Button, Modal, Tooltip, Switch } from 'antd';
import ServiceCheckout from '~/features/freelancers/services/service-deatail/ui/auth/serviceCheckout';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { useRouter } from 'next/router';
import useGetCustomBalance from '~/features/freelancers/myorders/myorder/api/useGetCustomBalance';
import styles from '../styles/orderPaymentPrompt.module.scss';

function OrderPaymentPrompt({ isOpen, onClose, order }) {
    const [showPayment, setShowPayment] = useState(false);
    const { push } = useRouter();
    const [mode, setMode] = useState(true);
    const { data } = useGetCustomBalance();
    const balance = Number(data?.wallet || 0);
    const balanceDisabled = balance > 0;
    // const { price, id, title } = order;

    const leftBalance = formatCurrencyWithSpace(Number(balance));
    const isSufficientBalance = balance >= order?.price;

    useEffect(() => {
        setMode(Number(data?.wallet || 0) > 0);
    }, [data?.wallet]);

    return (
        <Modal open={isOpen} onCancel={onClose} footer={null} width={600}>
            <div className={styles.serviceOrderModal}>
                {!showPayment ? (
                    <div className={styles.servicePreOrder}>
                        <h3 className={styles.title}>
                            Buyurtma uchun to'lovni amalga oshiring
                        </h3>

                        <div className={styles.securityMessage}>
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
                    </div>
                ) : (
                    <div className={styles.orderPayment}>
                        <div className={styles.orderPaymentHeader}>
                            {/* NOTE: Balance button temporarily commented */}
                            {balanceDisabled ? (
                                <Tooltip title="To'lov uchun balansingizdan foydalaning">
                                    <Button
                                        onClick={() => setMode(pre => !pre)}
                                        className={
                                            mode && isSufficientBalance
                                                ? styles.orderButtonActive
                                                : mode && !isSufficientBalance
                                                ? styles.orderButtonWarn
                                                : styles.orderButtonInactive
                                        }
                                        disabled={!balanceDisabled}>
                                        <Switch value={mode} size="small" />
                                        Balance - {leftBalance} so'm
                                    </Button>
                                </Tooltip>
                            ) : null}
                            <Button
                                type="text"
                                className={styles.backButton}
                                icon={
                                    <i className="fa-solid fa-arrow-left"></i>
                                }
                                onClick={() => setShowPayment(false)}>
                                Orqaga
                            </Button>
                        </div>
                        <ServiceCheckout
                            order_id={order?.id}
                            order={order}
                            balanceMode={mode}
                            balance={balance}
                            onSuccess={() => push(`/order/${order?.id}`)}
                            onClose={onClose}
                        />
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default OrderPaymentPrompt;
