import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.scss';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { getRemainingDays } from '~/shared/utilities/dayjs-locale-uz';
import { IoCheckmarkDone } from 'react-icons/io5';
import { MdErrorOutline } from 'react-icons/md';
import { RiProgress5Line } from 'react-icons/ri';
import { MdOutlinePendingActions } from 'react-icons/md';
import { useRouter } from 'next/router';
import { Avatar, Button, message, Tooltip, Badge } from 'antd';
import { cn } from '~/shared/utilities/cn';
import { CancelOrderModal } from '~/features/freelancers/myorders/order-detail/ui/modals/CancelOrderModal';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaRegStopCircle } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';

const CompletedOrderWrapper = ({ children }) => {
    return (
        <Badge.Ribbon text="Buyurtma tugallandi" color="#06aa27">
            {children}
        </Badge.Ribbon>
    );
};

const InProgressOrderWrapper = ({ children }) => {
    return (
        <Badge.Ribbon text="Buyurtma jarayonda" color="#ffb400">
            {children}
        </Badge.Ribbon>
    );
};

const CancelledOrderWrapper = ({ children }) => {
    return (
        <Badge.Ribbon text="Buyurtma bekor qilindi" color="#f5222d">
            {children}
        </Badge.Ribbon>
    );
};

const PendingOrderWrapper = ({ children }) => {
    return (
        <Badge.Ribbon text="Yangi buyurtma" color="blue">
            {children}
        </Badge.Ribbon>
    );
};

const orderStatusAssets = (status) => {
    switch (status) {
        case 'completed':
            return {
                orderClassName: styles.cardCompleted,
                orderIcon: (
                    <Tooltip title="Buyurtma tugallandi">
                        <IoCheckmarkDone className={styles.completed} />
                    </Tooltip>
                ),
                orderWrapper: CompletedOrderWrapper,
                status: 'completed',
                isRejectable: false,
                isPaymentApproved: true,
            };
        case 'order_accepted':
        case 'order_file_sent':
        case 'rejected':
            return {
                orderClassName: styles.cardInProgress,
                orderIcon: (
                    <Tooltip title="Buyurtma jarayonda">
                        <RiProgress5Line className={styles.inProgress} />
                    </Tooltip>
                ),
                orderWrapper: InProgressOrderWrapper,
                status: status,
                isRejectable: true,
                isPaymentApproved: true,
            };
        case 'cancelled':
            return {
                orderClassName: styles.cardCancelled,
                orderIcon: (
                    <Tooltip title="Buyurtma bekor qilingan">
                        <MdErrorOutline className={styles.cancelled} />
                    </Tooltip>
                ),
                orderWrapper: CancelledOrderWrapper,
                status: 'cancelled',
                isRejectable: false,
                isPaymentApproved: false,
            };
        case 'pending':
        default:
            return {
                orderClassName: styles.card,
                orderIcon: (
                    <Tooltip title="Yangi yaratilgan buyurtma">
                        <MdOutlinePendingActions className={styles.pending} />
                    </Tooltip>
                ),
                orderWrapper: PendingOrderWrapper,
                status: 'pending',
                isRejectable: true,
                isPaymentApproved: false,
            };
    }
    // pending: {
    //     orderClassName: styles.cardCompleted,
    //     orderIcon: <IoCheckmarkDone className={styles.completed} />,
    // },
    // approved: "To'lov amalga oshirildi",
    // requirement_file: "Buyurtma talablari jo'natildi",
    // requirement_file_rejected: "Buyurtma talablari to'liq emas",
    // order_accepted: 'Buyurtma qabul qilindi',
    // order_file_sent: 'Tasdiqlash uchun topshirildi',
    // completed: 'Buyurtma tugallandi',
    // rejected: "Fayl to'liq emas",
    // cancelled: 'Buyurtma bekor qilindi',
};

const OrderCard = ({
    order,
    onOpenDrawer,
    onCancel,
    infoOnly,
    detail = false,
    onOrderUpdate,
}) => {
    const router = useRouter();
    const statusAsset = orderStatusAssets(order?.order_status_doing?.status);

    const hasSeller = Boolean(order.user);
    const price = order.service?.price ?? order.budget ?? 0;
    const [showMore, setShowMore] = useState(false);
    const [showMoreBtn, setShowMoreBtn] = useState(false);
    const descRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const deadlineDisplay = order.deadline_date
        ? new Date(order.deadline_date).toLocaleString('uz-UZ', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
          })
        : order.service?.delivery_days
        ? `${getRemainingDays(order.created_at, order.service.delivery_days)}`
        : '-';

    const createdAtDisplay = new Date(order.created_at).toLocaleString(
        'uz-UZ',
        {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }
    );

    const isFullyPaid = order?.approved_transaction_amount >= price;
    const isPartiallyPaid =
        order?.approved_transaction_amount > 0 &&
        order?.approved_transaction_amount < price;
    const notPaidAmount = price - (order?.approved_transaction_amount || 0);

    useEffect(() => {
        if (descRef.current) {
            const isOverflowing =
                descRef.current.scrollHeight > descRef.current.clientHeight + 5;
            setShowMoreBtn(isOverflowing);
        }
    }, [order.description]);

    const handlePrimaryClick = () => {
        if (!isPartiallyPaid && !isFullyPaid) {
            onOpenDrawer(order);
            return;
        }
        if (hasSeller) {
            router.push(`/order/${order.id}`);
        } else {
            if (statusAsset.status === 'cancelled') {
                message.warning('Siz bu buyurtmani bekor qilgansiz');
            } else if (typeof onOpenDrawer === 'function') {
                onOpenDrawer(order);
            } else {
                message.info(
                    'Takliflarni ko‘rish uchun funksiyani o‘tkazmadingiz'
                );
            }
        }
    };

    const handleCancelClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (onOrderUpdate) {
            onOrderUpdate();
        }
    };

    const content = (
        <div
            className={statusAsset.orderClassName}
            data-status={statusAsset.status}>
            <div className={styles.titleWrapper}>
                <div className={styles.nameWrapper}>
                    <span className={styles.id}>#{order.id}</span>

                    <div className={styles.titleRow}>
                        <a
                            className={styles.title}
                            onClick={() => {
                                if (hasSeller) {
                                    router.push(`/order/${order.id}`);
                                } else if (statusAsset.status === 'cancelled') {
                                    message.warning(
                                        'Siz bu buyurtmani bekor qilgansiz'
                                    );
                                } else if (typeof onOpenDrawer === 'function') {
                                    onOpenDrawer(order);
                                }
                            }}>
                            {order.service?.title || order.title || '-'}
                        </a>
                    </div>
                </div>

                {/* <div>{statusAsset.orderIcon}</div> */}
            </div>
            {order.order_type == 'custom_order' &&
                typeof onOpenDrawer !== 'function' && (
                    <div className={styles.meta}>
                        <div className={styles.metaTitle}>
                            <i className="fa-solid fa-file-pen" />
                            Buyurtma tavsifi
                        </div>

                        <p
                            ref={descRef}
                            style={{
                                whiteSpace: 'pre-wrap',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: showMore ? 'unset' : 3,
                                lineHeight: '1.6',
                                fontSize: '14px',
                                marginBottom: 0,
                            }}>
                            {order.description}
                        </p>

                        {showMoreBtn && (
                            <span
                                onClick={() => setShowMore((prev) => !prev)}
                                style={{
                                    color: '#1677ff',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    marginTop: '4px',
                                    display: 'inline-block',
                                }}>
                                {showMore ? 'Kamroq' : 'Batafsil'}
                            </span>
                        )}
                    </div>
                )}
            {order.order_type == 'ready_service' &&
                typeof onOpenDrawer !== 'function' && (
                    <div className={styles.meta}>
                        <div className={styles.metaTitle}>
                            <i className="fa-solid fa-file-pen" /> Buyurtma
                            tavsifi
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: order.description,
                            }}
                        />
                    </div>
                )}
            <div className={styles.catWrapper}>
                <div className={styles.meta}>
                    <div className={styles.metaTitle}>
                        <i className="fa-solid fa-language" /> Buyurtma tili
                    </div>
                    <span className={styles.metaMain}>
                        {order.language?.toUpperCase() || '-'}
                    </span>
                </div>

                <div className={styles.meta}>
                    <div className={styles.metaTitle}>
                        <i className="fa-regular fa-clock" /> Yaratilgan vaqti
                    </div>
                    <span className={styles.metaMain}>{createdAtDisplay}</span>
                </div>
            </div>

            <div
                className={
                    typeof onOpenDrawer === 'function'
                        ? styles.wrapper
                        : styles.catWrapper
                }>
                <div className={styles.budjet}>
                    <span className={styles.budjetTitle}>
                        <i className="fa-solid fa-money-bill-wave mr-1" />{' '}
                        Budjet
                    </span>
                    <span className={styles.budjetPrice}>
                        {formatCurrencyWithSpace(price)} so'm
                    </span>
                    {statusAsset.status === 'cancelled' && isPartiallyPaid ? (
                        <span className={styles.paymentRejected}>
                            {/* <i className="fa fa-solid fa-times-circle-o" /> */}
                            <FaRegTimesCircle
                                style={{
                                    marginRight: '2px',
                                    marginBottom: '2px',
                                }}
                            />
                            To'lov bekor qilindi
                        </span>
                    ) : statusAsset.status ==
                      'cancelled' ? null : isFullyPaid ? (
                        <span className={styles.paymentApproved}>
                            {/* <i className="fa fa-check-circle-o" /> */}
                            <FaRegCheckCircle
                                style={{
                                    marginRight: '2px',
                                    marginBottom: '2px',
                                }}
                            />
                            To'lov qabul qilindi
                        </span>
                    ) : isPartiallyPaid ? (
                        <span className={styles.paymentHalfApproved}>
                            <FaRegStopCircle
                                style={{
                                    marginRight: '2px',
                                    marginBottom: '2px',
                                }}
                            />
                            To'lovning {formatCurrencyWithSpace(notPaidAmount)}{' '}
                            so'm qismi amalga oshirilmagan
                        </span>
                    ) : null}
                </div>
                <div className={styles.date}>
                    <span className={styles.dateTitle}>
                        <i className="fa-regular fa-calendar mr-1" /> Topshirish
                        muddati
                    </span>
                    <span className={styles.dateTime}>{deadlineDisplay}</span>
                </div>
                {!infoOnly && (
                    <div className={styles.actionButtons}>
                        {typeof onOpenDrawer === 'function' &&
                        statusAsset.isRejectable ? (
                            <Button
                                variant="outlined"
                                color="red"
                                className={styles.actionButtonReject}
                                onClick={() => onCancel(order)}>
                                Bekor qilish
                            </Button>
                        ) : null}
                        {statusAsset.status === 'cancelled' ? null : (
                            <button
                                className={styles.primary}
                                onClick={handlePrimaryClick}>
                                {!isPartiallyPaid && !isFullyPaid ? (
                                    "To'lovni amalga oshirish"
                                ) : hasSeller ? (
                                    'Batafsil'
                                ) : (
                                    <div
                                        className={cn(
                                            'flex',
                                            'justify-center',
                                            'items-center',
                                            'gap-2'
                                        )}>
                                        <span style={{ fontSize: '14px' }}>
                                            Takliflarni ko'rish
                                        </span>
                                        <Avatar.Group
                                            max={{
                                                count: 3,
                                                style: {
                                                    color: 'white',
                                                    backgroundColor: '#00a44f',
                                                },
                                            }}>
                                            {order?.offers?.map((item, i) => (
                                                <Avatar
                                                    key={i}
                                                    size={25}
                                                    src={
                                                        item?.photo_url ||
                                                        '/static/img/ozodbek.png'
                                                    }
                                                />
                                            ))}
                                        </Avatar.Group>
                                    </div>
                                )}
                            </button>
                        )}
                        {statusAsset.status === 'cancelled' &&
                            isPartiallyPaid && (
                                <div className={styles.rejectedLabel}>
                                    <i className="fa fa-exclamation-circle" />
                                    Buyurtma to'lovingiz 24 soat ichida
                                    profilingizga qaytariladi.
                                </div>
                            )}
                    </div>
                )}
                {infoOnly && (
                    <div className={styles.actionButtons}>
                        {statusAsset.status === 'order_accepted' &&
                            detail === true && (
                                <Button
                                    variant="outlined"
                                    color="red"
                                    className={styles.actionButtonReject}
                                    onClick={() => handleCancelClick()}>
                                    Bekor qilish
                                </Button>
                            )}
                    </div>
                )}
            </div>
            <CancelOrderModal
                isOpen={isModalOpen}
                selectedOrder={order}
                onClose={handleCloseModal}
            />
        </div>
    );

    return <statusAsset.orderWrapper>{content}</statusAsset.orderWrapper>;
};

export default OrderCard;
