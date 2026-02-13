import dayjs from 'dayjs';
import Image from 'next/image';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Divider, Alert, message } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
    FileTextOutlined,
    ShoppingOutlined,
} from '@ant-design/icons';
import { FaLink, FaClock, FaClipboardList, FaGlobe, FaRegCalendarCheck, FaCommentDots, FaCalendar } from 'react-icons/fa6';
import { PiMoneyWavyBold } from 'react-icons/pi';
import { useCreateChat } from '~/features/freelancers/chat/api/useCreateChat';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import styles from '../styles/user-short-info.module.scss';


const AuthModal = dynamic(() => import('~/features/auth/ui/auth-modal'), { ssr: false });
const CreateOrderModal = dynamic(() => import('~/shared/components/modals/create-order-modal/CreateOrderModal'), { ssr: false });
const OrderPaymentPrompt = dynamic(() => import('./OrderPaymentPrompt'), { ssr: false });

const InfoRow = memo(({ icon, label, value }) => (
    <div className={styles.infoRow}>
        <div className={styles.infoRowLeft}>
            <div className={styles.infoRowIcon}>
                {icon}
            </div>
            <span className={styles.infoRowLabel}>{label}</span>
        </div>
        <span className={styles.infoRowValue}>{value}</span>
    </div>
));

const UserShortInfo = ({ seller }) => {
    const router = useRouter();
    const { isLoggedIn, status } = useSelector((state) => state?.auth);
    const { mutate: createChat } = useCreateChat();
    const { startTimeout } = useTimeManager();
    const [activeModal, setActiveModal] = useState(null);
    const [authModal, setAuthModal] = useState(false);
    const [createOrderModal, setCreateOrderModal] = useState(false);
    const [latelyCreatedOrder, setLatelyCreatedOrder] = useState(null);
    const [orderPaymentPromptModal, setOrderPaymentPromptModal] =
        useState(false);

    const isFreelancer = seller?.has_portfolio && seller?.has_service;
    const isOpenToAcceptOrders = seller?.accepting_orders;
    const isBlocked = seller?.is_blocked;
    const isLockedForService = !(isFreelancer && isOpenToAcceptOrders);
    const isOrderingClosed = isLockedForService || isBlocked;

    const lastActive = useMemo(
        () =>
            seller?.last_login
                ? dayjs(seller.last_login).fromNow()
                : 'Faol emas',
        [seller?.last_login]
    );

    const joinedDate = useMemo(
        () => dayjs(seller?.created_at).format('DD.MM.YYYY'),
        [seller?.created_at]
    );

    const sellerStats = useMemo(
        () => [
            {
                title: 'Jarayondagi ishlar',
                value: seller?.progress_jobs_count,
                icon: (
                    <SyncOutlined className="text-info" style={{ fontSize: '15px' }} />
                ),
                color: 'text-info',
            },
            {
                title: 'Muvaffaqiyatli ishlar',
                value: seller?.successful_jobs_count,
                icon: (
                    <CheckCircleOutlined
                        className="text-primary"
                        style={{ fontSize: '15px' }}
                    />
                ),
                color: 'text-primary',
            },
            {
                title: 'Muvaffaqiyatsiz ishlar',
                value: seller?.unsuccessful_jobs_count,
                icon: (
                    <CloseCircleOutlined
                        className="text-danger"
                        style={{ fontSize: '15px' }}
                    />
                ),
                color: 'text-danger',
            },
            {
                title: 'Yuklangan mahsulotlar',
                value: seller?.total_products_count,
                icon: (
                    <FileTextOutlined
                        className="text-purple"
                        style={{ fontSize: '15px' }}
                    />
                ),
                color: 'text-purple',
            },
            {
                title: 'Sotilgan mahsulotlar',
                value: seller?.total_sold_documents,
                icon: (
                    <ShoppingOutlined
                        className="text-warning"
                        style={{ fontSize: '15px' }}
                    />
                ),
                color: 'text-warning',
            },
        ],
        [seller]
    );

    const handleCreateOrder = () => {
        if (isLoggedIn) {
            setCreateOrderModal(true);
            router.replace(
                {
                    pathname: router.pathname,
                    query: { ...router.query, order: 'true' },
                },
                undefined,
                { shallow: true }
            );
        } else {
            setAuthModal(true);
            setActiveModal('createOrder');
        }
    };

    const onOrderCreateSuccess = (orderId) => {
        setLatelyCreatedOrder(orderId);
        setOrderPaymentPromptModal(true);
    };

    const handleCreateChat = useCallback(() => {
        if (isLoggedIn) {
            createChat(seller?.id);
        } else {
            setAuthModal(true);
            setActiveModal('chat');
        }
    }, [isLoggedIn, seller?.id, createChat]);

    const cancelCreateOrder = () => {
        setCreateOrderModal(false);
        const newQuery = { ...router.query };
        delete newQuery.order;
        router.replace(
            { pathname: router.pathname, query: newQuery },
            undefined,
            { shallow: true }
        );
    };

    const imageSrc = seller?.image || '/static/img/ozodbek.png';
    const imageAlt = seller?.full_name || 'User image';

    const handleSuccessAuth = () => {
        if (activeModal === 'createOrder') {
            setCreateOrderModal(true);
        } else if (activeModal === 'chat') {
            startTimeout(() => {
                createChat(seller?.id);
            }, 1000);
        }
    };

    const handleCopyLink = useCallback(() => {
        const link = `${window.location.origin}/seller/${seller?.id}`;
        navigator.clipboard
            .writeText(link)
            .then(() => {
                message.success('Link nusxalandi!');
            })
            .catch(() => {
                message.error('Link nusxalanmadi');
            });
    }, [seller?.id]);

    useEffect(() => {
        const { order } = router.query;
        if (order === 'true' && isLoggedIn && status === 'succeeded') {
            setCreateOrderModal(true);
            setAuthModal(false);
            setActiveModal(null);
        } else if (order === 'true' && !isLoggedIn && status !== 'idle') {
            setAuthModal(true);
            setActiveModal('createOrder');
        }
    }, [isLoggedIn, status]);

    useEffect(() => {
        const { payment } = router.query;
        if (payment === 'true') {
            setOrderPaymentPromptModal(true);
            setCreateOrderModal(false);
        }
    }, [router.query]);

    return (
        <div className={styles.userShortInfo}>
            <div className={styles.avatarContainer}>
                <div className={styles.avatarImageWrapper}>
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        priority
                        loading="eager"
                        layout="fill"
                        objectFit="cover"
                        className={styles.avatarImage}
                    />
                </div>
                <h2 className={styles.fullName}>
                    {seller?.full_name}
                </h2>
                <h4 className={styles.position}>
                    {seller?.position}
                </h4>
                {Boolean(seller?.total_income) && (
                    <div className={styles.totalIncome}>
                        <div className={styles.card}>
                            <div className={styles.right}>
                                <PiMoneyWavyBold className={styles.icon} />
                            </div>
                            <div className={styles.info}>
                                <p className={styles.label}>Jami daromad</p>
                                <div className={styles.amount}>
                                    <span className={styles.value}>
                                        {formatCurrencyWithSpace(
                                            seller?.total_income
                                        )}
                                    </span>
                                    <span className={styles.currency}>
                                        so'm
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <Button
                    type="primary"
                    shape="round"
                    iconPosition="end"
                    className={styles.copyLinkBtn}
                    icon={<FaLink fontSize={18} />}
                    onClick={handleCopyLink}></Button>
            </div>

            <div className={styles.infoRows}>
                <InfoRow
                    icon={<FaClipboardList />}
                    label="Xizmatlar uchun ochiq"
                    value={
                        !isOrderingClosed ? (
                            <CheckCircleOutlined
                                className="text-primary"
                                style={{ fontSize: '16px' }}
                            />
                        ) : (
                            <CloseCircleOutlined
                                className="text-danger"
                                style={{ fontSize: '16px' }}
                            />
                        )
                    }
                />
                {seller?.location && (
                    <InfoRow
                        icon={<FaGlobe />}
                        label="Joylashuv"
                        value={seller?.location}
                    />
                )}
                <InfoRow
                    icon={<FaClock />}
                    label="Oxirgi faollik"
                    value={lastActive}
                />
                <InfoRow
                    icon={<FaRegCalendarCheck />}
                    label="Ro'yhatdan o'tgan"
                    value={joinedDate}
                />
            </div>

            <Divider size="small" style={{ marginBlock: '16px' }} />
            {isBlocked && (
                <Alert
                    className={styles.alertMiddle}
                    message="Frilanser vaqtincha bloklangan"
                    description="Afsuski, ushbu frilanserning xizmatlari vaqtincha bloklangan. Boshqa frilanser xizmatlaridan foydalanishingiz mumkin."
                    type="error"
                    showIcon
                />
            )}
            {isLockedForService && !isBlocked && (
                <Alert
                    className={styles.alertMiddle}
                    message="Xizmatlar uchun ochiq emas"
                    description="Afsuski, ushbu frilanserning xizmatlari vaqtincha ochiq emas. Boshqa frilanser xizmatlaridan foydalanishingiz mumkin."
                    type="warning"
                    showIcon
                />
            )}
            <div className={styles.actionButtons}>
                <Button
                    type="default"
                    className={styles.chatBtn}
                    disabled={isOrderingClosed}
                    onClick={handleCreateChat}>
                    <FaCommentDots />
                </Button>
                <Button
                    type="primary"
                    block
                    onClick={handleCreateOrder}
                    disabled={isOrderingClosed}>
                    <FaCalendar /> Buyurtma berish
                </Button>
            </div>

            <div className={styles.mobileOnlyActions}>
                <Button
                    type="default"
                    className={styles.chatBtn}
                    onClick={handleCreateChat}>
                    <FaCommentDots />
                </Button>
                <Button
                    block
                    type="primary"
                    onClick={handleCreateOrder}
                    disabled={isOrderingClosed}>
                    <FaCalendar /> Buyurtma berish
                </Button>
            </div>

            <Divider size="small" style={{ marginBlock: '16px' }} />
            <div className={styles.statsSection}>
                <span className={styles.statsTitle}>
                    Statistikalar
                </span>
                <div className={styles.statsList}>
                    {sellerStats.map((stat) => (
                        <div
                            key={stat.title}
                            className={styles.statItem}>
                            <div className={styles.statItemLabel}>
                                {stat.icon}
                                <span className={styles.statTitleText}>
                                    {stat.title}
                                </span>
                            </div>
                            <span className={`${styles.statValueText} ${stat.color}`}>
                                {stat.value || 0}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {authModal && (
                <AuthModal
                    open={authModal}
                    onClose={() => setAuthModal(false)}
                    onSuccess={handleSuccessAuth}
                />
            )}
            {createOrderModal && (
                <CreateOrderModal
                    open={createOrderModal}
                    onClose={cancelCreateOrder}
                    onSuccess={onOrderCreateSuccess}
                    seller={seller?.full_name}
                    defaultDirection={seller?.direction}
                    id={seller?.id}
                    sellerInfo={seller}
                />
            )}
            {orderPaymentPromptModal && (
                <OrderPaymentPrompt
                    isOpen={orderPaymentPromptModal}
                    onClose={() => setOrderPaymentPromptModal(false)}
                    order={latelyCreatedOrder}
                />
            )}
        </div>
    );
};

export default memo(UserShortInfo);
