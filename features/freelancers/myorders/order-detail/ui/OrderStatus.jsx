import React, { useEffect, useRef } from 'react';
import styles from '../style/style.module.scss';
import { Button, Steps, Tooltip, Badge } from 'antd';
import { FaRegCommentDots } from 'react-icons/fa';
import { useCreateChat } from '~/features/freelancers/chat/api/useCreateChat';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const OrderStatus = ({ order, handleShowStickySeller }) => {
    const orderStatusRef = useRef(null);
    const { t } = useTranslation('order-detail');
    const priceFormatted =
        new Intl.NumberFormat('uz-UZ').format(
            order?.service?.price || order?.budget || 0
        ) + ` ${t('sum')}`;
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
        pending: t('status_pending'),
        approved: t('status_approved'),
        requirement_file: t('status_requirement_file'),
        requirement_file_rejected: t('status_requirement_file_rejected_title'),
        order_accepted: t('status_order_accepted'),
        order_file_sent: t('status_order_file_sent'),
        completed: t('status_completed'),
        rejected: t('status_rejected'),
        cancelled: t('status_cancelled'),
    };

    useEffect(() => {
        if (order?.user?.soff_seller_id && window.IntersectionObserver) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            handleShowStickySeller(false);
                        } else {
                            handleShowStickySeller(true);
                        }
                    });
                },
                { threshold: 0.3 }
            );
            observer.observe(orderStatusRef.current);
            return () => {
                observer.disconnect();
            };
        }
    }, [handleShowStickySeller]);

    return (
        <div className="col-12 col-lg-3 my-4" ref={orderStatusRef}>
            {/* Order info */}
            <div className={styles.status}>
                <div className={styles.status_info}>
                    <span>{t('order_status')}</span>
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
                    <span>{t('order_price')}</span>
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
                            <span className="text-muted fs-5">
                                {t('freelancer')}
                            </span>
                        </div>
                    </div>
                    {order?.user?.soff_seller_id && (
                        <Badge
                            offset={[-10, 3]}
                            size="small"
                            count={order?.unread_messages_count}
                            onClick={() =>
                                createChat(order?.user?.soff_seller_id)
                            }
                            color="#00a44f">
                            <Button
                                type="text"
                                icon={
                                    <FaRegCommentDots
                                        style={{ fontSize: '30px' }}
                                    />
                                }
                            />
                        </Badge>
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
                                    ? t('status_cancelled')
                                    : t('status_pending')
                            }  `,
                        },
                        { title: t('status_approved') },
                        {
                            title:
                                order?.order_status_doing?.status ==
                                'requirement_file_rejected' ? (
                                    <Tooltip
                                        title={
                                            order?.order_status_doing?.reason
                                        }>
                                        {t(
                                            'status_requirement_file_rejected_tooltip'
                                        )}
                                    </Tooltip>
                                ) : (
                                    t('status_requirement_file')
                                ),
                            className: order?.order_status_doing?.status,
                        },
                        { title: t('status_order_accepted') },
                        {
                            title:
                                order?.order_status_doing?.status ==
                                'rejected' ? (
                                    <Tooltip
                                        title={
                                            order?.order_status_doing?.reason
                                        }>
                                        {t('status_rejected_tooltip')}
                                    </Tooltip>
                                ) : (
                                    t('status_order_file_sent')
                                ),
                            className: order?.order_status_doing?.status,
                        },
                        { title: t('status_completed') },
                    ]}
                />
            </div>
        </div>
    );
};

export default OrderStatus;
