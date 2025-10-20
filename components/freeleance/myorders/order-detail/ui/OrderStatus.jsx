import React from 'react';
import styles from '../style/style.module.scss';
import { Button, Steps, Tooltip } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import useCreateChat from '~/components/freeleance/chat/api/useCreateChat';
import Link from 'next/link';

const OrderStatus = ({ order }) => {
    const priceFormatted =
        new Intl.NumberFormat('uz-UZ').format(
            order?.service?.price || order?.budget || 0
        ) + " so'm";
    const { mutate: createChat } = useCreateChat();

    const orderStatus = {
        pending: 1,
        approved: 2,
        requirement_file: 3,
        requirement_file_rejected: 2,
        order_accepted: 4,
        rejected: 4,
        order_file_sent: 5,
        completed: 6,
        cancelled: 0,
    };

    const orderStatusName = {
        pending: 'Buyurtma yaratildi',
        approved: "To'lov amalga oshirildi",
        requirement_file: "Buyurtma talablari jo'natildi",
        requirement_file_rejected: "Buyurtma talablari to'liq emas",
        order_accepted: 'Buyurtma qabul qilindi',
        order_file_sent: 'Tasdiqlash uchun topshirildi',
        completed: 'Buyurtma tugallandi',
        rejected: "Fayl to'liq emas",
        cancelled: 'Buyurtma bekor qilindi',
    };

    return (
        <div className="col-12 col-lg-3 my-4">
            {/* Order info */}
            <div className={styles.status}>
                <div className={styles.status_info}>
                    <span>Buyurtma holati</span>
                    <p
                        style={{
                            background:
                                order?.order_status_doing?.status ==
                                    'cancelled' && 'red',
                        }}>
                        {orderStatusName[order?.order_status_doing?.status]}
                    </p>
                </div>
                <div className={styles.status_price}>
                    <span>Buyurtma narxi</span>
                    <p>{priceFormatted}</p>
                </div>
            </div>

            {/* Seller info */}
            <div className={styles.seller}>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className={styles.seller_box}>
                        <img
                            src={
                                order?.user?.photo_url ||
                                '/static/img/ozodbek.png'
                            }
                            alt={'USER PHOTO'}
                            width={60}
                            height={60}
                            style={{ objectFit: 'cover' }}
                        />
                        <div className="d-flex flex-column">
                            <Link
                                href={`/seller/${order?.user?.soff_seller_id}#about_author`}>
                                {order?.user?.full_name || ''}
                            </Link>
                            <span className="text-muted fs-5">Frilanser</span>
                        </div>
                    </div>
                    {order?.user?.soff_seller_id && (
                        <Button
                            onClick={() =>
                                createChat(order?.user?.soff_seller_id)
                            }
                            type="text"
                            icon={
                                <span className={styles.unreadChatsWrapper}>
                                    {order?.unread_messages_count !== 0 && (
                                        <span className={styles.unreadChats}>
                                            {order?.unread_messages_count}
                                        </span>
                                    )}
                                    <MessageOutlined
                                        style={{ fontSize: '30px' }}
                                    />
                                </span>
                            }
                        />
                    )}
                </div>
            </div>

            {/* Steps */}
            <div className={styles.status_steps}>
                <Steps
                    direction="vertical"
                    className={styles.greenSteps}
                    current={orderStatus[order?.order_status_doing?.status]}
                    status={
                        order?.order_status_doing?.status ===
                            'requirement_file_rejected' ||
                        order?.order_status_doing?.status === 'rejected' ||
                        order?.order_status_doing?.status === 'cancelled'
                            ? 'error'
                            : 'process'
                    }
                    items={[
                        {
                            title: `${
                                order?.order_status_doing?.status == 'cancelled'
                                    ? 'Buyurtma bekor qilindi'
                                    : 'Buyurtma yaratildi'
                            }  `,
                        },
                        { title: "To'lov amalga oshirildi" },
                        {
                            title:
                                order?.order_status_doing?.status ==
                                'requirement_file_rejected' ? (
                                    <Tooltip
                                        title={
                                            order?.order_status_doing?.reason
                                        }>
                                        Buyurtma talablari rad etildi
                                    </Tooltip>
                                ) : (
                                    "Buyurtma talablari jo'natildi"
                                ),
                            className: order?.order_status_doing?.status,
                        },
                        { title: 'Buyurtma qabul qilindi' },
                        {
                            title:
                                order?.order_status_doing?.status ==
                                'rejected' ? (
                                    <Tooltip
                                        title={
                                            order?.order_status_doing?.reason
                                        }>
                                        Fayl rad etildi
                                    </Tooltip>
                                ) : (
                                    'Tasdiqlash uchun topshirildi'
                                ),
                            className: order?.order_status_doing?.status,
                        },
                        { title: 'Buyurtma tugallandi' },
                    ]}
                />
            </div>
        </div>
    );
};

export default OrderStatus;
