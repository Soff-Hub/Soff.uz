import { IoCheckmarkDone } from 'react-icons/io5';
import { MdErrorOutline } from 'react-icons/md';
import { RiProgress5Line } from 'react-icons/ri';
import { MdOutlinePendingActions } from 'react-icons/md';
import styles from '../ui/order-base/style.module.scss';
import type { TFunction } from 'i18next';

export const CancellableStatuses = [
    'pending',
    'order_accepted',
    'order_file_sent',
    'rejected',
];

export type OrderStatusKey =
    | 'completed'
    | 'requirement_file'
    | 'order_accepted'
    | 'order_file_sent'
    | 'rejected'
    | 'cancelled'
    | 'pending';

export const getStatusMap = (t: TFunction) => {
    const progres_status = {
        label: t('card:orderCard.status.inProgress'),
        color: '#ffb400',
        iconClass: styles.inProgress,
        Icon: RiProgress5Line,
        className: styles.cardInProgress,
        isRejectable: true,
    };

    return {
        completed: {
            label: t('card:orderCard.status.completed'),
            color: '#06aa27',
            iconClass: styles.completed,
            Icon: IoCheckmarkDone,
            className: styles.cardCompleted,
            isRejectable: false,
        },
        requirement_file: progres_status,
        order_accepted: progres_status,
        order_file_sent: progres_status,
        rejected: progres_status,
        cancelled: {
            label: t('card:orderCard.status.cancelled'),
            color: '#f5222d',
            iconClass: styles.cancelled,
            Icon: MdErrorOutline,
            className: styles.cardCancelled,
            isRejectable: false,
        },
        pending: {
            label: t('card:orderCard.status.pending'),
            color: 'blue',
            iconClass: styles.pending,
            icon: MdOutlinePendingActions,
            className: styles.cardPending,
            isRejectable: true,
        },
    };
};
