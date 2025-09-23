import React from 'react';
import styles from './style.module.scss';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { getRemainingDays } from '~/shared/utilities/calculateTime';
import { useRouter } from 'next/router';
import { Avatar, message } from 'antd';

const OrderCard = ({ order, onOpenDrawer }) => {
    const router = useRouter();

    const status = order.order_status_doing?.status || 'pending';
    const hasSeller = Boolean(order.user);
    const price = order.service?.price ?? order.budget ?? 0;

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

    const createdAtDisplay = new Date(order.created_at).toLocaleString('uz-UZ', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    const handlePrimaryClick = () => {
        if (hasSeller) {
            router.push(`/order/${order.id}`);
        } else {
            if (status === 'cancelled') {
                message.warning('Siz bu buyurtmani bekor qilgansiz');
            } else if (typeof onOpenDrawer === 'function') {
                onOpenDrawer(order);
            } else {
                message.info('Takliflarni ko‘rish uchun funksiyani o‘tkazmadingiz');
            }
        }
    };


    return (
        <div className={styles.card} data-status={status}>
            <div className={styles.titleWrapper}>
                <span className={styles.id}>#{order.id}</span>

                <div className={styles.titleRow}>
                    <a
                        className={styles.title}
                        onClick={() => {
                            if (hasSeller) {
                                router.push(`/order/${order.id}`);
                            } else if (status === 'cancelled') {
                                message.warning('❌ Siz bu buyurtmani bekor qilgansiz');
                            } else if (typeof onOpenDrawer === 'function') {
                                onOpenDrawer(order);
                            }
                        }}
                    >
                        {order.service?.title || order.title || '-'}
                    </a>
                </div>
            </div>

            <div className={styles.catWrapper}>
                <div className={styles.leftMeta}>
                    <span className={styles.category}>{order.language?.toUpperCase() || '-'}</span>
                </div>

                <div className={styles.rightMeta}>
                    <span className={styles.time}>{createdAtDisplay}</span>
                </div>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.budjet}>
                    <span className={styles.budjetTitle}>
                        <i className="fa-solid fa-money-bill-wave mr-1" /> Budjet
                    </span>
                    <span className={styles.budjetPrice}>
                        {formatCurrencyWithSpace(price)} so'm
                    </span>
                </div>

                <div className={styles.date}>
                    <span className={styles.dateTitle}>
                        <i className="fa-regular fa-calendar mr-1" /> Topshirish muddati
                    </span>
                    <span className={styles.dateTime}>{deadlineDisplay}</span>
                </div>

                {hasSeller ?
                    <div></div> :
                    <div className={styles.offers}>
                        <span className={styles.offerTitle}>
                            {/* <i className="fa-solid fa-users mr-1" /> Takliflar  */}
                        </span>
                        <Avatar.Group
                            max={{
                                count: 3,
                                style: { color: 'white', backgroundColor: '#00a44f' }
                            }}
                        >
                            {order?.offers?.map(item =>
                                <Avatar src={item?.photo_url} />
                            )}
                        </Avatar.Group>
                    </div>
                }
                {typeof onOpenDrawer === 'function' &&
                    <button
                        className={styles.primary}
                        onClick={handlePrimaryClick}
                    >
                        {hasSeller ? 'Batafsil' : "Takliflarni ko'rish"}
                    </button>
                }
            </div>
        </div>
    );
};

export default OrderCard;
