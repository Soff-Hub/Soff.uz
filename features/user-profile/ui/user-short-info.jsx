import dayjs from 'dayjs';
import Image from 'next/image';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { cn, useRcn } from '~/shared/utilities/cn';
import { Button, Divider, Alert, message } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
    FileTextOutlined,
    ShoppingOutlined,
} from '@ant-design/icons';
import AuthModal from '~/features/auth/ui/auth-modal';
import CreateOrderModal from '~/shared/components/modals/create-order-modal/CreateOrderModal';
import { useSelector } from 'react-redux';
import { useCreateChat } from '~/features/freelancers/chat/api/useCreateChat';
import useResponsive from '~/shared/utilities/useResponsive';
import { useRouter } from 'next/router';
import OrderPaymentPrompt from './OrderPaymentPrompt';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { FaLink } from 'react-icons/fa6';
import styles from '../styles/user-short-info.module.scss';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { PiMoneyWavyBold } from 'react-icons/pi';

const InfoRow = memo(({ icon, label, value }) => (
    <div
        className={cn(
            'flex',
            'items-start',
            'justify-between',
            'gap-2',
            'text-[18px]'
        )}>
        <div className={cn('flex', 'items-center', 'gap-2')}>
            <div className={cn('w-[20px]', 'flex', 'justify-center')}>
                {icon}
            </div>
            <span className={cn('text-[12px]', 'text-secondary')}>{label}</span>
        </div>
        <span className={cn('text-[14px]', 'text-right')}>{value}</span>
    </div>
));

const UserShortInfo = ({ seller }) => {
    const router = useRouter();
    const { isLoggedIn, status } = useSelector((state) => state?.auth);
    const { mutate: createChat } = useCreateChat();
    const { isMobile } = useResponsive();
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
    // NOTE: for testing purposes only
    // const isBlocked = true;
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

    const flexClass = useRcn({
        mobile: 'flex',
        tablet: 'flex',
        desktop: 'flex',
    });

    const hiddenClass = useRcn({
        mobile: 'flex',
        tablet: 'hidden',
        desktop: 'hidden',
    });

    const marginClass = useRcn({
        mobile: 'mt-4',
        tablet: 'mt-4',
        desktop: 'mt-4',
    });

    const sellerStats = useMemo(
        () => [
            {
                title: 'Jarayondagi ishlar',
                value: seller?.progress_jobs_count,
                icon: (
                    <SyncOutlined className={cn('text-info', 'text-[15px]')} />
                ),
                color: 'text-info',
            },
            {
                title: 'Muvaffaqiyatli ishlar',
                value: seller?.successful_jobs_count,
                icon: (
                    <CheckCircleOutlined
                        className={cn('text-primary', 'text-[15px]')}
                    />
                ),
                color: 'text-primary',
            },
            {
                title: 'Muvaffaqiyatsiz ishlar',
                value: seller?.unsuccessful_jobs_count,
                icon: (
                    <CloseCircleOutlined
                        className={cn('text-danger', 'text-[15px]')}
                    />
                ),
                color: 'text-danger',
            },
            {
                title: 'Yuklangan mahsulotlar',
                value: seller?.total_products_count,
                icon: (
                    <FileTextOutlined
                        className={cn('text-purple', 'text-[15px]')}
                    />
                ),
                color: 'text-purple',
            },
            {
                title: 'Sotilgan mahsulotlar',
                value: seller?.total_sold_documents,
                icon: (
                    <ShoppingOutlined
                        className={cn('text-warning', 'text-[15px]')}
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

    const imageSrc = useMemo(
        () => seller?.image || '/static/img/ozodbek.png',
        [seller?.image]
    );
    const imageAlt = useMemo(
        () => seller?.full_name || 'User image',
        [seller?.full_name]
    );

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
        <div className={cn('bg-light', 'p-3', 'shadow', 'rounded-xl')}>
            <div
                className={cn(
                    'flex',
                    'flex-col',
                    'items-center',
                    'justify-center'
                )}>
                <div
                    style={{
                        width: 125,
                        height: 125,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                    className={cn('rounded-full')}>
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        priority={!isMobile}
                        loading={isMobile ? 'lazy' : 'eager'}
                        placeholder="blur"
                        layout="fill"
                        blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBIAAAAvAAAAAA..."
                        className={cn('rounded-full', 'object-cover')}
                    />
                </div>
                <h2
                    className={cn(
                        'text-[18px]',
                        'font-semibold',
                        'text-center',
                        'mb-1',
                        'mt-2'
                    )}>
                    {seller?.full_name}
                </h2>
                <h4
                    className={cn(
                        'text-[14px]',
                        'font-normal',
                        'text-center',
                        'text-secondary',
                        'mb-1'
                    )}>
                    {seller?.position}
                </h4>
                {Boolean(seller?.total_income) && (
                    <div className={styles.totalIncome}>
                        <div className={styles.card}>
                            {/* <div className={styles.iconBg}>
                                <FaDollarSign className={styles.icon} />
                                </div> */}
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
                    variant="solid"
                    style={{
                        padding: '6px',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                    icon={<FaLink fontSize={18} />}
                    onClick={handleCopyLink}></Button>
            </div>

            <div className={cn(marginClass, 'flex', 'flex-col', 'gap-4')}>
                <InfoRow
                    icon={<i className="fa-solid fa-clipboard-list"></i>}
                    label="Xizmatlar uchun ochiq"
                    value={
                        !isOrderingClosed ? (
                            <CheckCircleOutlined
                                className={cn('text-primary', 'text-[16px]')}
                            />
                        ) : (
                            <CloseCircleOutlined
                                className={cn('text-danger', 'text-[16px]')}
                            />
                        )
                    }
                />
                {seller?.location && (
                    <InfoRow
                        icon={<i className="fa-solid fa-globe"></i>}
                        label="Joylashuv"
                        value={seller?.location}
                    />
                )}
                <InfoRow
                    icon={<i className="fa-regular fa-clock"></i>}
                    label="Oxirgi faollik"
                    value={lastActive}
                />
                <InfoRow
                    icon={<i className="fa-regular fa-calendar-check"></i>}
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
            <div className={cn(marginClass, flexClass, 'gap-3')}>
                <Button
                    type="default"
                    className={cn('border-primary', 'text-primary')}
                    disabled={isOrderingClosed}
                    onClick={handleCreateChat}>
                    <i className="fa-solid fa-comment-dots"></i>
                </Button>
                <Button
                    type="primary"
                    block
                    onClick={handleCreateOrder}
                    disabled={isOrderingClosed}>
                    <i className="fa-solid fa-calendar"></i> Buyurtma berish
                </Button>
            </div>

            <div
                className={cn(
                    'fixed',
                    'bottom-0',
                    'w-full',
                    'bg-light',
                    'p-3',
                    'flex',
                    'gap-3',
                    'justify-center',
                    hiddenClass,
                    'shadow',
                    'z-50',
                    'left-0'
                )}>
                <Button
                    type="default"
                    className={cn('border-primary', 'text-primary')}
                    onClick={handleCreateChat}>
                    <i className="fa-solid fa-comment-dots"></i>
                </Button>
                <Button
                    block
                    type="primary"
                    onClick={handleCreateOrder}
                    disabled={isOrderingClosed}>
                    <i className="fa-solid fa-calendar"></i> Buyurtma berish
                </Button>
            </div>

            <Divider size="small" style={{ marginBlock: '16px' }} />
            <div className={cn(marginClass)}>
                <span
                    className={cn(
                        'block',
                        'mb-3',
                        'font-semibold',
                        'text-[16px]'
                    )}>
                    Statistikalar
                </span>
                <div className={cn('flex', 'flex-col', 'gap-2')}>
                    {sellerStats.map((stat) => (
                        <div
                            key={stat.title}
                            className={cn(
                                'flex',
                                'items-center',
                                'gap-4',
                                'justify-between'
                            )}>
                            <div
                                className={cn('flex', 'items-center', 'gap-4')}>
                                {stat.icon}
                                <span
                                    className={cn(
                                        'text-secondary',
                                        'text-[15px]'
                                    )}>
                                    {stat.title}
                                </span>
                            </div>
                            <span
                                className={cn(
                                    stat.color,
                                    'font-semibold',
                                    'text-[15px]'
                                )}>
                                {stat.value || 0}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <AuthModal
                open={authModal}
                onClose={() => setAuthModal(false)}
                onSuccess={handleSuccessAuth}
            />
            <CreateOrderModal
                open={createOrderModal}
                onClose={cancelCreateOrder}
                onSuccess={onOrderCreateSuccess}
                seller={seller?.full_name}
                defaultDirection={seller?.direction}
                id={seller?.id}
                sellerInfo={seller}
            />
            <OrderPaymentPrompt
                isOpen={orderPaymentPromptModal}
                onClose={() => setOrderPaymentPromptModal(false)}
                order={latelyCreatedOrder}
            />
        </div>
    );
};

export default memo(UserShortInfo);
