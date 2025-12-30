import React, { ReactNode } from 'react';
import styles from './style.module.scss';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { getRemainingDays } from '~/shared/utilities/dayjs-locale-uz';
import { useRouter } from 'next/router';
import { message, Badge } from 'antd';
import { STATUS_MAP } from '../../config/status-map';
import { FaLanguage } from 'react-icons/fa6';
import { FaRegClock } from 'react-icons/fa6';
import { FaMoneyBillWave } from 'react-icons/fa6';
import { FaRegCalendar } from 'react-icons/fa6';
import OrderDescription from './OrderDescription';
import OrderMetaItem from './OrderMetaItem';
import OrderPaymentStatus from './OrderPaymentStatus';
import { SizeType } from '~/shared/types/size';
import OrderRejected from './OrderRejected';

type BaseOrderProps = {
    order: any;
    size?: SizeType;
    onClick?: (order: BaseOrderProps['order']) => void;
    withRejectedStatus?: boolean;
};

interface OrderBaseProps extends BaseOrderProps {
    actionsSlot?: (
        props: {
            order: BaseOrderProps['order'];
            hasSeller: boolean;
            isCancelled: boolean;
            isPartiallyPaid: boolean;
            isFullyPaid: boolean;
            isRejectable: boolean;
            size?: SizeType;
            handlePrimaryClick: () => void;
        },
        extraProps?: Record<string, any>
    ) => ReactNode; // <--- Slot for your Features: Buttons/Actions
    filesSlot?: (props: {
        order: BaseOrderProps['order'];
        isCompleted: boolean;
        isCancelled: boolean;
    }) => ReactNode; // <--- Slot for your Feature: OrderFiles
}

const getOrderBaseSize = (size: BaseOrderProps['size']) => {
    switch (size) {
        case 'small':
            return {
                cardPadding: '8px',
                cardGap: '6px',
                idFontSize: '14px',
                titleFontSize: '16px',
                metaWrapperGap: '4px',
                metaWrapperMarginTop: '6px',
                badgeTextSize: '11px',
            };
        case 'middle':
            return {
                cardPadding: '12px',
                cardGap: '8px',
                idFontSize: '16px',
                titleFontSize: '18px',
                metaWrapperGap: '5px',
                metaWrapperMarginTop: '8px',
                badgeTextSize: '12px',
            };
        default: // large
            return {
                cardPadding: '16px',
                cardGap: '10px',
                idFontSize: '18px',
                titleFontSize: '20px',
                metaWrapperGap: '6px',
                metaWrapperMarginTop: '10px',
                badgeTextSize: '13px',
            };
    }
};

const OrderBase = (props: OrderBaseProps) => {
    const { order, size = 'large', onClick, actionsSlot, filesSlot } = props;
    const router = useRouter();
    const orderStatus = (order?.order_status_doing?.status ||
        'pending') as keyof typeof STATUS_MAP;
    const statusAsset = STATUS_MAP[orderStatus];

    const sizeStyles = getOrderBaseSize(size);

    const hasSeller = Boolean(order.user);
    const price = order.service?.price ?? order.budget ?? 0;
    const isFullyPaid = order?.approved_transaction_amount >= price;
    const isPartiallyPaid =
        order?.approved_transaction_amount > 0 &&
        order?.approved_transaction_amount < price;
    const isCancelled = order?.order_status_doing?.status === 'cancelled';
    const isCompleted = order?.order_status_doing?.status === 'completed';
    const isRejected = order?.order_status_doing?.status === 'rejected';
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

    const handlePrimaryClick = () => {
        if (orderStatus === 'cancelled') {
            message.warning('Siz bu buyurtmani bekor qilgansiz');
        } else if (hasSeller) {
            router.push(`/order/${order.id}`);
            return;
        } else if (onClick) {
            onClick(order);
            return;
        }
    };

    return (
        <Badge.Ribbon
            text={statusAsset.label}
            color={statusAsset.color}
            style={{ fontSize: sizeStyles.badgeTextSize }}>
            <div
                className={statusAsset.className}
                data-status={orderStatus}
                style={{
                    padding: sizeStyles.cardPadding,
                    gap: sizeStyles.cardGap,
                }}>
                <div className={styles.nameWrapper}>
                    <span
                        className={styles.id}
                        style={{ fontSize: sizeStyles.idFontSize }}>
                        #{order.id}
                    </span>

                    <div className={styles.titleRow}>
                        <a
                            className={styles.title}
                            style={{ fontSize: sizeStyles.titleFontSize }}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePrimaryClick();
                            }}>
                            {order.service?.title || order.title || '-'}
                        </a>
                    </div>
                </div>
                <OrderDescription order={order} onClick={onClick} size={size} />
                <div
                    className={styles.metaWrapper}
                    style={{
                        gap: sizeStyles.metaWrapperGap,
                        marginTop: sizeStyles.metaWrapperMarginTop,
                    }}>
                    <OrderMetaItem
                        icon={FaLanguage}
                        label="Buyurtma tili"
                        value={order.language?.toUpperCase() || '-'}
                        size={size}
                    />
                    <OrderMetaItem
                        icon={FaRegClock}
                        label="Yaratilgan vaqti"
                        value={createdAtDisplay}
                        size={size}
                    />
                </div>

                <div
                    className={styles.metaWrapper}
                    style={{
                        gap: sizeStyles.metaWrapperGap,
                        marginTop: sizeStyles.metaWrapperMarginTop,
                    }}>
                    <div className={styles.budjet}>
                        <OrderMetaItem
                            icon={FaMoneyBillWave}
                            label="Budjet"
                            value={`${formatCurrencyWithSpace(price)} so'm`}
                            size={size}
                        />
                        <OrderPaymentStatus order={order} size={size} />
                    </div>
                    <div className={styles.date}>
                        <OrderMetaItem
                            icon={FaRegCalendar}
                            label="Topshirish muddati"
                            value={deadlineDisplay}
                            size={size}
                        />
                    </div>
                    {actionsSlot &&
                        actionsSlot({
                            order,
                            hasSeller,
                            isRejectable: statusAsset.isRejectable,
                            isCancelled,
                            isPartiallyPaid,
                            isFullyPaid,
                            size,
                            handlePrimaryClick,
                        })}
                </div>
                {isRejected && props.withRejectedStatus ? (
                    <OrderRejected order={order} size={size} />
                ) : filesSlot ? (
                    filesSlot({
                        order,
                        isCompleted,
                        isCancelled,
                    })
                ) : null}
            </div>
        </Badge.Ribbon>
    );
};

export default OrderBase;
