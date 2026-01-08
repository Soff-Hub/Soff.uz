import { Breadcrumb, Button, Modal, Tooltip, Switch } from 'antd';
import { DownloadOutlined, BellOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import styles from '../style/style.module.scss';
import modalStyles from '~/features/user-profile/styles/orderPaymentPrompt.module.scss';
import Link from 'next/link';
import dayjs from 'dayjs';
import RequirementModal from './modals/RequirementModal';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import ServiceCheckout from '~/features/freelancers/services/service-deatail/ui/auth/serviceCheckout';
import useGetFile from '../api/useGetFile';
import { useQueryClient } from '@tanstack/react-query';
import useResponsive from '~/shared/utilities/useResponsive';
import { IoCheckboxOutline } from 'react-icons/io5';
import TelegramNotification from '~/shared/components/telegram-notlification';
import useGetCustomBalance from '~/features/freelancers/myorders/myorder/api/useGetCustomBalance';
import { downloadFile } from '~/shared/utilities/utils';
import OrderFiles from '~/entities/order/ui/order-card-files';
import OrderCancelModal from '~/features/order-cancel';
import OrderCard from '~/widgets/order-card';
import OrderApproveFilesModal from '~/features/order-approve-files';
import OrderRejected from '~/entities/order/ui/order-base/OrderRejected';

// TimerComponent to show time remaining until deadline
const TimerComponent = ({ deadlineDate }) => {
    const [timeRemaining, setTimeRemaining] = useState('');
    const [isOverdue, setIsOverdue] = useState(false);

    useEffect(() => {
        const updateTimer = () => {
            if (!deadlineDate) return;

            const now = dayjs();
            const deadline = dayjs(deadlineDate);
            const diff = deadline.diff(now);

            if (diff < 0) {
                // Deadline has passed - show overdue time
                const overdueDuration = dayjs.duration(Math.abs(diff));
                const years = Math.floor(overdueDuration.asYears());
                const months = Math.floor(overdueDuration.asMonths()) % 12;
                const days = Math.floor(overdueDuration.asDays()) % 30;
                const hours = overdueDuration.hours();
                const minutes = overdueDuration.minutes();

                let overdueString = '';

                if (years > 0) {
                    overdueString += `${years} yil `;
                }
                if (months > 0) {
                    overdueString += `${months} oy `;
                }
                if (days > 0) {
                    overdueString += `${days} kun `;
                }
                if (hours > 0) {
                    overdueString += `${hours} soat `;
                }
                if (minutes > 0 && days === 0 && hours === 0) {
                    overdueString += `${minutes} daqiqa `;
                }

                setTimeRemaining(overdueString.trim() + ' kechikdi');
                setIsOverdue(true);
                return;
            }

            const duration = dayjs.duration(diff);
            const years = Math.floor(duration.asYears());
            const months = Math.floor(duration.asMonths()) % 12;
            const days = Math.floor(duration.asDays()) % 30;
            const hours = duration.hours();
            const minutes = duration.minutes();

            let timeString = '';

            if (years > 0) {
                timeString += `${years} yil `;
            }
            if (months > 0) {
                timeString += `${months} oy `;
            }
            if (days > 0) {
                timeString += `${days} kun `;
            }
            if (hours > 0) {
                timeString += `${hours} soat `;
            }
            if (minutes > 0 && days === 0) {
                timeString += `${minutes} daqiqa `;
            }

            if (!timeString) {
                timeString = 'Bir necha daqiqa ';
            }

            setTimeRemaining(timeString.trim() + ' qoldi');
            setIsOverdue(false);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [deadlineDate]);

    if (!timeRemaining) return null;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px',
                color: isOverdue ? '#ff4d4f' : '#666',
                fontSize: '14px',
            }}>
            <span>
                {isOverdue ? '⚠️ ' : '⏰ '}
                Muddat: {timeRemaining}
            </span>
        </div>
    );
};

const TelegramNotificationHeader = (
    <div className={styles.telegramNotification}>
        <h5 className={styles.telegramNotificationTitle}>
            <div className={styles.telegramNotificationIcon}>
                <BellOutlined
                    style={{
                        fontSize: '25px',
                    }}
                />
            </div>
            Bildirishnomalarni yoqing
        </h5>
        <p className={'mb-0 text-muted ' + styles.telegramNotificationDesc}>
            Buyurtma holati haqida xabardor bo'lish uchun Telegram orqali
            bildirishnoma oling
        </p>
    </div>
);

const OrderMain = ({ order }) => {
    const [open, setOpen] = useState(false);
    const [isCancelOrderOpen, setIsCancelOrderOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [res, setRes] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [mode, setMode] = useState(true);
    const {
        data: file,
        isFetching: fileIsFetching,
        refetch: refetchFiles,
    } = useGetFile(order?.id);
    const queryClient = useQueryClient();
    const { isDesktop } = useResponsive();
    const { data } = useGetCustomBalance();

    const price = order?.service?.price || order?.budget || 0;
    const balance = Number(data?.wallet || 0);
    const balanceDisabled = balance > 0;

    const leftBalance = formatCurrencyWithSpace(Number(balance));
    const isSufficientBalance = balance >= price;

    const items = [
        { title: <Link href={'/order/my-orders'}>Mening buyurtmalarim</Link> },
        { title: `#${order?.id}` },
    ];

    const onClose = () => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ['order'] });
    };

    const isFullyPaid = order?.approved_transaction_amount >= price;
    const isPartiallyPaid =
        order?.approved_transaction_amount > 0 &&
        order?.approved_transaction_amount < price;
    const notPaidAmount = price - (order?.approved_transaction_amount || 0);

    const serviceCheckoutOrder = {
        id: order?.id,
        price: isPartiallyPaid ? notPaidAmount : price,
        title: order?.title,
    };

    useEffect(() => {
        setMode(Number(data?.wallet || 0) > 0);
    }, [data?.wallet]);

    useEffect(() => {
        if (!isFullyPaid) {
            setIsOpen(true);
        }
    }, [setIsOpen, order]);

    return (
        <div className="col-lg-9 col-12 rounded-2 my-4">
            <div className={styles.orderDetailMain}>
                {/* Notification Settings Card */}
                {order?.order_status_doing?.status !== 'rejected' && (
                    <TelegramNotification
                        hideIfActivated
                        header={TelegramNotificationHeader}
                    />
                )}

                {order?.order_status_doing?.status === 'pending' && (
                    <div className={styles.orderPayCardFlex}>
                        <div className={styles.orderPayCardInfo}>
                            <h5
                                className={`mb-0 ${
                                    !isDesktop && 'text-center'
                                }`}>
                                Frilanser ish boshlashiga to'lov qiling.
                            </h5>
                        </div>
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: '#00a44f',
                                borderColor: '#00a44f',
                                padding: '16px 36px',
                            }}
                            onClick={() => setIsOpen(true)}>
                            <i class="fa-solid fa-credit-card"></i> To'lovni
                            amalga oshiring
                        </Button>
                    </div>
                )}
                {order?.order_status_doing?.status === 'order_accepted' && (
                    <div className={styles.orderPayCardFlex}>
                        <div>
                            <h4
                                style={{
                                    color: '#389e0d',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: 0,
                                }}
                                className={styles.orderNameLink}>
                                <div
                                    style={{
                                        width: '25px',
                                    }}>
                                    <IoCheckboxOutline
                                        style={{ fontSize: '25px' }}
                                    />
                                </div>
                                Buyurtma qabul qilindi! Frilanser ishni
                                boshladi.
                            </h4>
                            <p className="mt-2 mb-0 text-muted">
                                Ish tayyor bo'lgach fayl shu yerdan yuklanadi •
                                Chat orqali frilanser bilan aloqada bo'ling
                            </p>
                            <TimerComponent
                                deadlineDate={order?.deadline_date}
                            />
                        </div>
                    </div>
                )}
                {(order?.order_status_doing?.status === 'approved' ||
                    order?.order_status_doing?.status ===
                        'requirement_file_rejected') && (
                    <div className={styles.orderPayCardFlex}>
                        <div>
                            <h3 className={styles.orderNameLink}>
                                Buyurtma talablari kutilmoqda
                            </h3>
                            {order?.order_status_doing?.status ===
                                'approved' && (
                                <p>
                                    Siz to‘lovni amalga oshirdingiz. Endi
                                    mutahasis ishni boshlashi uchun kerakli
                                    materiallar va ko‘rsatmalarni yuboring.
                                </p>
                            )}
                            {order?.order_status_doing?.status ===
                                'requirement_file_rejected' && (
                                <p>
                                    Siz yuborgan materiallar yoki ko‘rsatmalar
                                    yetarli emasligi sababli mutahasis ularni
                                    rad etdi. Iltimos, ishni boshlash uchun
                                    barcha kerakli fayllar va aniq
                                    ko‘rsatmalarni qayta yuboring.
                                </p>
                            )}
                        </div>
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: '#00a44f',
                                borderColor: '#00a44f',
                                padding: '16px 28px',
                            }}
                            onClick={() => setOpen(true)}>
                            Talablarni yuborish
                        </Button>
                    </div>
                )}

                {order?.order_status_doing?.status == 'order_file_sent' && (
                    <OrderFiles
                        isPendingFiles
                        orderFiles={file?.files}
                        isOrderFilesFetching={fileIsFetching}
                        setFeedbackOpen={setFeedbackOpen}
                        setRes={setRes}
                    />
                )}

                {order?.order_status_doing?.status === 'rejected' && (
                    <OrderRejected order={order} />
                )}
                <Breadcrumb items={items} className="mb-2" />
                <OrderCard
                    order={order}
                    infoOnly
                    onCancel={() => setIsCancelOrderOpen(true)}
                />
                {order?.order_status_doing?.status === 'completed' && (
                    <OrderFiles
                        isCompletedFiles
                        orderFiles={file?.files}
                        isOrderFilesFetching={fileIsFetching}
                    />
                )}

                {order?.order_requirement?.length > 0 && (
                    <div
                        className="mt-4 border border-success"
                        style={{
                            borderRadius: '12px',
                            padding: '16px',
                            backgroundColor: '#fafafa',
                        }}>
                        <h5
                            style={{
                                fontWeight: '600',
                                marginBottom: '16px',
                                fontSize: '18px',
                                color: '#333',
                            }}>
                            Buyurtma talablari
                        </h5>

                        <div className="d-flex flex-column flex-md-row align-items-start gap-3">
                            {/* Tavsif qismi */}
                            <div
                                style={{
                                    flex: 1,
                                    fontSize: '15px',
                                    lineHeight: '1.6',
                                    color: '#444',
                                    overflowWrap: 'break-word',
                                    whiteSpace: 'pre-line',
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: order.order_requirement[0]
                                        ?.order_requirement_description,
                                }}
                            />
                            {/* Fayl bo‘lsa tugma chiqadi */}
                            {order.order_requirement[0]
                                ?.order_requirement_file && (
                                <div className="d-flex justify-content-md-end justify-content-start w-md-auto">
                                    <Button
                                        icon={<DownloadOutlined />}
                                        onClick={() =>
                                            downloadFile(
                                                order.order_requirement[0]
                                                    .order_requirement_file
                                            )
                                        }>
                                        Faylni yuklab olish
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <RequirementModal
                visible={open}
                onClose={() => setOpen(false)}
                orderId={order?.id}
            />
            <OrderCancelModal
                isOpen={isCancelOrderOpen}
                selectedOrder={order}
                onClose={() => setIsCancelOrderOpen(false)}
            />
            <OrderApproveFilesModal
                order={order}
                feedbackOpen={feedbackOpen}
                setFeedbackOpen={setFeedbackOpen}
                res={res}
                setRes={setRes}
                onSuccess={() => {
                    queryClient.invalidateQueries({
                        queryKey: ['order'],
                    });
                    refetchFiles();
                }}
            />
            <Modal
                open={isOpen}
                onCancel={() => {
                    setIsOpen(false);
                    setShowPayment(false);
                }}
                footer={null}
                width={600}>
                <div className={modalStyles.serviceOrderModal}>
                    {!showPayment ? (
                        <div className={modalStyles.servicePreOrder}>
                            <h3 className={modalStyles.title}>
                                Buyurtma uchun to'lovni amalga oshiring
                            </h3>

                            <div className={modalStyles.securityMessage}>
                                <i className="fa-solid fa-shield-halved text-success fs-4 mb-2"></i>
                                <p className="text-muted mb-0">
                                    Sizning to'lovingiz Soff tizimi tomonidan
                                    xavfsiz saqlanadi. Mutaxassisga to'lov faqat
                                    siz ishni ko'rib chiqib, tasdiqlaganingizdan
                                    so'ng amalga oshiriladi.
                                </p>
                            </div>

                            {isPartiallyPaid && (
                                <div className="text-center mb-4 text-warning">
                                    <p className="text-warning mb-0 mt-2">
                                        Eslatma: Siz ilgari{' '}
                                        {formatCurrencyWithSpace(
                                            order?.approved_transaction_amount
                                        )}{' '}
                                        so'm to'lovni amalga oshirgansiz.
                                        Iltimos, qolgan{' '}
                                        {formatCurrencyWithSpace(notPaidAmount)}{' '}
                                        so'm to'lovni amalga oshiring.
                                    </p>
                                </div>
                            )}

                            {!mode ? (
                                <div className="service-details-box bg-white border rounded p-3 mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-solid fa-file-lines text-primary me-3 fs-4"></i>
                                            <div>
                                                {/* <h5 className="mb-1 fw-bold">{title}</h5> */}
                                                <p className="text-muted mb-0">
                                                    {order?.service?.title ||
                                                        order?.title}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <h4
                                                className="text-primary white-space-nowrap mb-0 fw-bold"
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                {formatCurrencyWithSpace(
                                                    isPartiallyPaid
                                                        ? notPaidAmount
                                                        : price
                                                )}{' '}
                                                so'm
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            <div className={'text-center'}>
                                <Button
                                    type="primary"
                                    size="large"
                                    className="px-5 py-2"
                                    style={{
                                        backgroundColor: '#28a745',
                                        borderColor: '#28a745',
                                    }}
                                    onClick={() => setShowPayment(true)}>
                                    Buyurtma berish
                                    <i className="fa-solid fa-arrow-right ms-2"></i>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className={modalStyles.orderPayment}>
                            <div className={modalStyles.orderPaymentHeader}>
                                {/* NOTE: Balance button temporarily commented */}
                                {balanceDisabled ? (
                                    <Tooltip title="To'lov uchun balansingizdan foydalaning">
                                        <Button
                                            onClick={() =>
                                                setMode((pre) => !pre)
                                            }
                                            className={
                                                mode && isSufficientBalance
                                                    ? modalStyles.orderButtonActive
                                                    : mode &&
                                                      !isSufficientBalance
                                                    ? modalStyles.orderButtonWarn
                                                    : modalStyles.orderButtonInactive
                                            }
                                            disabled={!balanceDisabled}>
                                            <Switch value={mode} size="small" />
                                            Balance - {leftBalance} so'm
                                        </Button>
                                    </Tooltip>
                                ) : null}

                                <Button
                                    type="text"
                                    className={modalStyles.backButton}
                                    icon={
                                        <i className="fa-solid fa-arrow-left"></i>
                                    }
                                    onClick={() => setShowPayment(false)}>
                                    Orqaga
                                </Button>
                            </div>
                            <div className="bg-white">
                                <ServiceCheckout
                                    onClose={onClose}
                                    order={serviceCheckoutOrder}
                                    balanceMode={mode}
                                    balance={balance}
                                    document={order?.service?.id}
                                    order_id={order?.id}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default OrderMain;
