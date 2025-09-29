import React from 'react';
import styles from './style.module.scss';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { getRemainingDays } from '~/shared/utilities/calculateTime';
import { useRouter } from 'next/router';
import { Avatar, message } from 'antd';
import { cn } from '~/shared/utilities/cn';

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
                                message.warning('Siz bu buyurtmani bekor qilgansiz');
                            } else if (typeof onOpenDrawer === 'function') {
                                onOpenDrawer(order);
                            }
                        }}
                    >
                        {order.service?.title || order.title || '-'}
                    </a>
                </div>
            </div>
            {(order.order_type == "custom_order" && typeof onOpenDrawer !== 'function') && 
                <div className={styles.meta}>
                    <div className={styles.metaTitle}>
                        <i className="fa-solid fa-file-pen" /> Buyurtma tavsifi
                    </div>
                    <span>{order.description}</span>
                </div>
            }
            {order.order_type == "ready_service" && 
                <div className={styles.meta}>
                    <div className={styles.metaTitle}>
                        <i className="fa-solid fa-file-pen" /> Buyurtma tavsifi
                    </div>
                    <div dangerouslySetInnerHTML={{__html: order.description}} />
                </div>
            }
            <div className={styles.catWrapper}>
                <div className={styles.meta}>
                    <div className={styles.metaTitle}>
                        <i className="fa-solid fa-language" /> Buyurtma tili
                    </div>
                    <span className={styles.metaMain}>{order.language?.toUpperCase() || '-'}</span>
                </div>

                <div className={styles.meta}>
                    <div className={styles.metaTitle}>
                        <i className="fa-regular fa-clock" /> Yaratilgan vaqti
                    </div>
                    <span className={styles.metaMain}>{createdAtDisplay}</span>
                </div>
            </div>

            <div className={typeof onOpenDrawer === 'function' ? styles.wrapper : styles.catWrapper}>
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

                {typeof onOpenDrawer === 'function' && 
                    <div></div>
                }
                {typeof onOpenDrawer === 'function' &&
                    <button
                        className={styles.primary}
                        onClick={handlePrimaryClick}
                    >
                        {hasSeller ? 'Batafsil' :
                            <div className={cn('flex', 'justify-center', 'items-center', 'gap-2')}>
                                <span style={{fontSize: "14px"}}>
                                    Takliflarni ko'rish
                                </span>
                                <Avatar.Group
                                    max={{
                                        count: 3,
                                        style: { color: 'white', backgroundColor: '#00a44f' }
                                    }}
                                >
                                    {order?.offers?.map(item =>
                                        <Avatar size={25} src={item?.photo_url || '/static/img/ozodbek.png'} />
                                    )}
                                </Avatar.Group>
                            </div>
                        }
                    </button>
                }
            </div>
        </div>
    );
};

export default OrderCard;
