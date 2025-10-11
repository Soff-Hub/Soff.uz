import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/uz-latn';
import Image from 'next/image';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { cn, useRcn } from '~/shared/utilities/cn';
import { Button, Divider } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
    FileTextOutlined,
    ShoppingOutlined,
} from '@ant-design/icons';
import AuthModal from '~/components/AuthModal';
import CreateOrderModal from '~/shared/components/modals/CreateOrderModal';
import { useSelector } from 'react-redux';
import useCreateChat from '~/components/freeleance/chat/api/useCreateChat';
import useResponsive from '~/shared/utilities/useResponsive';

dayjs.extend(relativeTime);
dayjs.locale('uz-latn');

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
    const { isLoggedIn } = useSelector((state) => state?.auth);
    const { mutate: createChat } = useCreateChat();
    const { isMobile, isTablet } = useResponsive();

    const [authModal, setAuthModal] = useState(false);
    const [createOrderModal, setCreateOrderModal] = useState(false);

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
        mobile: 'hidden',
        tablet: 'flex',
        desktop: 'flex',
    });

    const hiddenClass = useRcn({
        mobile: 'flex',
        tablet: 'hidden',
        desktop: 'hidden',
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

    const handleCreateOrder = useCallback(() => {
        isLoggedIn ? setCreateOrderModal(true) : setAuthModal(true);
    }, [isLoggedIn]);

    const handleCreateChat = useCallback(() => {
        isLoggedIn ? createChat(seller?.id) : setAuthModal(true);
    }, [isLoggedIn, seller?.id, createChat]);

    const imageSrc = useMemo(
        () => seller?.image || '/static/img/ozodbek.png',
        [seller?.image]
    );
    const imageAlt = useMemo(
        () => seller?.full_name || 'User image',
        [seller?.full_name]
    );

    return (
        <div className={cn('bg-light', 'p-3', 'shadow', 'rounded-xl')}>
            <div
                className={cn(
                    'flex',
                    'flex-col',
                    'items-center',
                    'justify-center'
                )}>
                <Image
                    width={125}
                    height={125}
                    src={imageSrc}
                    alt={imageAlt}
                    priority={!isMobile}
                    loading={isMobile ? 'lazy' : 'eager'}
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBIAAAAvAAAAAA..."
                    className={cn('rounded-full')}
                />
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
            </div>

            <div className={cn('mt-5', 'flex', 'flex-col', 'gap-4')}>
                <InfoRow
                    icon={<i className="fa-solid fa-clipboard-list"></i>}
                    label="Xizmatlar uchun ochiq"
                    value={
                        seller?.has_service && seller?.has_portfolio ? (
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

            <Divider size="small" className={cn(flexClass)} />
            <div className={cn('mt-5', flexClass, 'gap-3')}>
                <Button
                    type="default"
                    className={cn('border-primary', 'text-primary')}
                    onClick={handleCreateChat}>
                    <i className="fa-solid fa-comment-dots"></i>
                </Button>
                <Button type="primary" block onClick={handleCreateOrder}>
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
                <Button block type="primary" onClick={handleCreateOrder}>
                    <i className="fa-solid fa-calendar"></i> Buyurtma berish
                </Button>
            </div>

            <Divider size="small" />
            <div className="mt-5">
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
                onSuccess={() => setCreateOrderModal(true)}
            />
            <CreateOrderModal
                open={createOrderModal}
                onClose={() => setCreateOrderModal(false)}
                seller={seller?.full_name}
                id={seller?.id}
                sellerInfo={seller}
            />
        </div>
    );
};

export default memo(UserShortInfo);
