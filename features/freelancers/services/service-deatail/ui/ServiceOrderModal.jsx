import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Button, Input, Modal, Upload, Switch, Radio, Tooltip, message } from 'antd';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import ServiceCheckout from './auth/serviceCheckout';
import AuthModal from '~/features/auth/ui/auth-modal';
import { useRouter } from 'next/router';
import styles from './styles/service-checkout.module.scss';
import useGetCustomBalance from '~/features/freelancers/myorders/myorder/api/useGetCustomBalance';
const { TextArea } = Input;

function ServiceOrderModal({
    children,
    handleAuthSuccess,
    order = {},
    requirements = '',
    externalOpenModal,
}) {
    const { t } = useTranslation('orders');
    const [openAuth, setOpenAuth] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [actionTracker, setActionTracker] = useState(null);
    const [mode, setMode] = useState(true);
    const [files, setFiles] = useState([]);
    const [description, setDescription] = useState('');
    const { push } = useRouter();
    const { data } = useGetCustomBalance();
    const switchRef = useRef(null);
    const balance = Number(data?.wallet || 0);
    const balanceDisabled = balance > 0;
    const { price, id, title } = order;

    const leftBalance = formatCurrencyWithSpace(Number(balance));
    const isSufficientBalance = balance >= order?.price;
    const componentProperties = {
        modalOpen: isOpen,
        setModalOpen: (value) => setIsOpen(value),
        authOpen: openAuth,
        setAuthOpen: (value) => setOpenAuth(value),
        actionTracker,
        setActionTracker,
    };

    let childrenContent = null;
    if (typeof children === 'function') {
        childrenContent = children(componentProperties);
    } else {
        childrenContent = children;
    }

    const handleClose = () => {
        setIsOpen(false);
        setShowPayment(false);
        setActionTracker(null);
    };

    const handleToPaymentPart = () => {
        setShowPayment(true);
    };

    const onAuthSuccess = async () => {
        handleAuthSuccess && handleAuthSuccess(componentProperties);
    };

    const onPaymentSuccess = (id) => {
        handleClose();
        push(`/order/${id}`);
    };

    useEffect(() => {
        if (externalOpenModal !== undefined) {
            setIsOpen(externalOpenModal);
        }
    }, [externalOpenModal]);

    useEffect(() => {
        if (switchRef.current) {
            switchRef.addEventListener('click', (e) => e.stopPropagation());
            return () => {
                switchRef.current.removeEventListener('click', (e) =>
                    e.stopPropagation()
                );
            };
        }
    }, []);

    useEffect(() => {
        setMode(Number(data?.wallet || 0) > 0);
    }, [data?.wallet]);

    return (
        <>
            {childrenContent}
            <Modal
                open={isOpen}
                classNames={{
                    content: styles.serviceOrderModalContainer,
                }}
                onCancel={handleClose}
                footer={null}
                width={600}>
                <div
                    className={
                        styles.serviceOrderModal
                        // "type_payment"
                    }>
                    {!showPayment ? (
                        <div className={styles.servicePreOrder}>
                            <h3
                                className={
                                    styles.title
                                    // "type_payment_h3 text-center mb-4"
                                }>
                                {t('serviceDetail.orderModal.title')}
                            </h3>

                            <div
                                className={
                                    styles.securityMessage
                                    // "security-message mb-4 text-center"
                                }>
                                <i className="fa-solid fa-shield-halved text-success fs-4 mb-2"></i>
                                <p className="text-muted mb-0">
                                    {t('serviceDetail.orderModal.securityMessage')}
                                </p>
                            </div>

                            <div className="service-details-box bg-white border rounded p-3 mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <i className="fa-solid fa-file-lines text-primary me-3 fs-4"></i>
                                        <div>
                                            <h5 className="mb-1 fw-bold">
                                                {title}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h4 className="text-primary mb-0 fw-bold">
                                            {formatCurrencyWithSpace(price)}{' '}
                                            {t('serviceDetail.orderModal.currency')}
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            {requirements && (
                                <>
                                    <h5
                                        className="mb-3"
                                        style={{ fontWeight: 'semi-bold' }}>
                                        {t('serviceDetail.orderModal.freelancerNeeds')}
                                    </h5>
                                    <div
                                        style={{
                                            borderBottom:
                                                '1px solid rgba(0,0,0,0.04)',
                                            marginBottom: '20px',
                                            paddingBottom: '15px',
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: requirements,
                                        }}
                                    />
                                </>
                            )}

                            <h5
                                className="mb-3"
                                style={{
                                    fontWeight: 'semi-bold',
                                }}>
                                {t('serviceDetail.orderModal.orderDetails')}
                            </h5>
                            <TextArea
                                rows={4}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                placeholder={t('serviceDetail.orderModal.additionalInfo')}
                                className="mb-4"
                            />

                            <Upload
                                fileList={files}
                                multiple={false}
                                listType="picture"
                                name="file"
                                style={{
                                    height: 'fit-content !important',
                                }}
                                maxCount={1}
                                beforeUpload={() => {
                                    return false;
                                }}
                                onChange={(e) => {
                                    const { file, fileList } = e;
                                    if (file) {
                                        const maxSize = 50 * 1024 * 1024;
                                        if (file.size > maxSize) {
                                            message.error(
                                                t('serviceDetail.orderModal.fileSizeError')
                                            );
                                            return;
                                        }
                                        setFiles(fileList);
                                    }
                                }}
                                onRemove={() => setFiles(null)}>
                                <Button
                                    icon={
                                        <i className="fa-solid fa-paperclip"></i>
                                    }>
                                    {t('serviceDetail.orderModal.fileUpload')}
                                </Button>
                            </Upload>

                            <div className="text-center">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="px-5 py-2"
                                    style={{
                                        backgroundColor: '#28a745',
                                        borderColor: '#28a745',
                                        marginTop: files?.[0] ? '40px' : '10px',
                                    }}
                                    onClick={() => {
                                        handleToPaymentPart();
                                    }}>
                                    {t('serviceDetail.orderModal.formalizeOrder')}
                                    <i className="fa-solid fa-arrow-right ms-2"></i>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.orderPayment}>
                            <div className={styles.orderPaymentHeader}>
                                {/* NOTE: Balance button temporarily commented */}
                                {balanceDisabled ? (
                                    <Tooltip title={t('serviceDetail.orderModal.useBalance')}>
                                        <Button
                                            onClick={() =>
                                                setMode((pre) => !pre)
                                            }
                                            className={
                                                mode && isSufficientBalance
                                                    ? styles.orderButtonActive
                                                    : mode &&
                                                      !isSufficientBalance
                                                    ? styles.orderButtonWarn
                                                    : styles.orderButtonInactive
                                            }
                                            disabled={!balanceDisabled}>
                                            <Switch value={mode} size="small" />
                                            {t('serviceDetail.orderModal.balance')} {leftBalance} {t('serviceDetail.orderModal.currency')}
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
                                    {t('serviceDetail.orderModal.back')}
                                </Button>
                            </div>

                            <ServiceCheckout
                                document={id}
                                order={order}
                                balanceMode={mode}
                                balance={balance}
                                files={files}
                                description={description}
                                onClose={handleClose}
                                onSuccess={onPaymentSuccess}
                            />
                        </div>
                    )}
                </div>
            </Modal>
            {/* Auth Modal */}
            <AuthModal
                open={openAuth}
                onClose={() => setOpenAuth(false)}
                onSuccess={onAuthSuccess}
            />
        </>
    );
}

export default ServiceOrderModal;
