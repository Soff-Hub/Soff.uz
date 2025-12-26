import { IoCheckmarkDone } from 'react-icons/io5';
import { MdErrorOutline } from 'react-icons/md';
import { RiProgress5Line } from 'react-icons/ri';
import { MdOutlinePendingActions } from 'react-icons/md';
import styles from '../ui/order-base/style.module.scss';

const progres_status = {
    label: 'Buyurtma jarayonda',
    color: '#ffb400',
    iconClass: styles.inProgress,
    Icon: RiProgress5Line,
    className: styles.cardInProgress,
    isRejectable: true,
};

export const CancellableStatuses = [
    'pending',
    'order_accepted',
    'order_file_sent',
    'rejected',
];

export const STATUS_MAP = {
    completed: {
        label: 'Buyurtma tugallandi',
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
        label: 'Buyurtma bekor qilindi',
        color: '#f5222d',
        iconClass: styles.cancelled,
        Icon: MdErrorOutline,
        className: styles.cardCancelled,
        isRejectable: false,
    },
    pending: {
        label: 'Yangi yaratilgan buyurtma',
        color: 'blue',
        iconClass: styles.pending,
        icon: MdOutlinePendingActions,
        className: styles.cardPending,
        isRejectable: true,
    },
} as const;
