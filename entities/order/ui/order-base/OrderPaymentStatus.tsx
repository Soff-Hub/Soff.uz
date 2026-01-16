import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaRegStopCircle } from 'react-icons/fa';
import { FaExclamationCircle } from 'react-icons/fa';
import styles from './style.module.scss';
import { useTranslation } from 'next-i18next';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { OrderStatusKey } from '../../config/status-map';
import { SizeType } from '~/shared/types/size';

type OrderPaymentStatusProps = {
    order: any;
    size?: SizeType;
};

const getPaymentStatusSize = (size: OrderPaymentStatusProps['size']) => {
    switch (size) {
        case 'small':
            return {
                fontSize: '11px',
                iconMarginRight: '2px',
                iconMarginBottom: '1px',
            };
        case 'middle':
            return {
                fontSize: '13px',
                iconMarginRight: '3px',
                iconMarginBottom: '2px',
            };
        default: // large
            return {
                fontSize: '14px',
                iconMarginRight: '6px',
                iconMarginBottom: '2px',
            };
    }
};

function OrderPaymentStatus({
    order,
    size = 'large',
}: OrderPaymentStatusProps) {
    const { t } = useTranslation('card');
    const orderStatus = (order?.order_status_doing?.status ||
        'pending') as OrderStatusKey;
    const isCancelled = orderStatus === 'cancelled';
    const price = order.service?.price ?? order.budget ?? 0;
    const isFullyPaid = order?.approved_transaction_amount >= price;
    const isPartiallyPaid =
        order?.approved_transaction_amount > 0 &&
        order?.approved_transaction_amount < price;
    const notPaidAmount = price - (order?.approved_transaction_amount || 0);

    const sizeStyles = getPaymentStatusSize(size);

    const iconStyle = {
        marginRight: sizeStyles.iconMarginRight,
        marginBottom: sizeStyles.iconMarginBottom,
    };

    const textStyle = {
        fontSize: sizeStyles.fontSize,
    };

    if (isCancelled && (isPartiallyPaid || isFullyPaid)) {
        return (
            <span className={styles.paymentRejected} style={textStyle}>
                <FaExclamationCircle style={iconStyle} />
                {t('orderCard.paymentRefunded')}
            </span>
        );
    } else if (!isCancelled && isFullyPaid) {
        return (
            <span className={styles.paymentApproved} style={textStyle}>
                <FaRegCheckCircle style={iconStyle} />
                {t('orderCard.paymentAccepted')}
            </span>
        );
    } else if (isPartiallyPaid) {
        return (
            <span className={styles.paymentHalfApproved} style={textStyle}>
                <FaRegStopCircle style={iconStyle} />
                {t('orderCard.paymentPartial', {
                    amount: formatCurrencyWithSpace(notPaidAmount),
                })}
            </span>
        );
    }

    return null;
}

export default OrderPaymentStatus;
