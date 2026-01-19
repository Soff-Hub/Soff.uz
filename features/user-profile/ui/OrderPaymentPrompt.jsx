import React, { useState, useEffect } from 'react';
import { Button, Modal, Tooltip, Switch } from 'antd';
import { useTranslation } from 'next-i18next';
import ServiceCheckout from '~/features/freelancers/services/service-deatail/ui/auth/serviceCheckout';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { useRouter } from 'next/router';
import useGetCustomBalance from '~/features/freelancers/myorders/myorder/api/useGetCustomBalance';
import { FaArrowRight } from 'react-icons/fa6';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaFileAlt } from 'react-icons/fa';
import { FaShieldHalved } from 'react-icons/fa6';
import styles from '../styles/orderPaymentPrompt.module.scss';

function OrderPaymentPrompt({ isOpen, onClose, order }) {
    const { t } = useTranslation('seller');
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
                            {t('orderPayment.title')}
                        </h3>

                        <div className={styles.securityMessage}>
                            <FaShieldHalved className="text-success fs-4 mb-2" />
                            <p className="text-muted mb-0">
                                {t('orderPayment.securityMessage')}
                            </p>
                        </div>

                        <div className="service-details-box bg-white border rounded p-3 mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <FaFileAlt className="text-primary me-3 fs-4" />
                                    <div>
                                        <h5 className="mb-1 fw-bold">
                                            {order?.title}
                                        </h5>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <h4 className="text-primary mb-0 fw-bold">
                                        {formatCurrencyWithSpace(order?.price)}{' '}
                                        {t('profile.currency')}
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
                                {t('orderPayment.proceedToOrder')}
                                <FaArrowRight
                                    style={{
                                        marginLeft: '6px',
                                    }}
                                />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.orderPayment}>
                        <div className={styles.orderPaymentHeader}>
                            {/* NOTE: Balance button temporarily commented */}
                            {balanceDisabled ? (
                                <Tooltip title={t('orderPayment.useBalance')}>
                                    <Button
                                        onClick={() => setMode((pre) => !pre)}
                                        className={
                                            mode && isSufficientBalance
                                                ? styles.orderButtonActive
                                                : mode && !isSufficientBalance
                                                  ? styles.orderButtonWarn
                                                  : styles.orderButtonInactive
                                        }
                                        disabled={!balanceDisabled}>
                                        <Switch value={mode} size="small" />
                                        {t('orderPayment.balance')} -{' '}
                                        {leftBalance} {t('profile.currency')}
                                    </Button>
                                </Tooltip>
                            ) : null}
                            <Button
                                type="text"
                                className={styles.backButton}
                                icon={<FaArrowLeft />}
                                onClick={() => setShowPayment(false)}>
                                {t('orderPayment.back')}
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
