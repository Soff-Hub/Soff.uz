import React, { useMemo } from 'react';
import { cn } from '~/shared/utilities/cn';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
    FileTextOutlined,
    ShoppingOutlined,
} from '@ant-design/icons';
import UserCommentsTabs from './user-comments-tabs';
import UserShortItems from './user-short-items';
import useResponsive from '~/shared/utilities/useResponsive';

const UserInfo = ({ seller, isOrderingClosed, commentRef, sectionRef }) => {
    const { isMobile } = useResponsive();

    const stats = useMemo(
        () => [
            {
                title: 'Jarayondagi ishlar',
                value: seller?.progress_jobs_count || 0,
                icon: (
                    <SyncOutlined className={cn('text-info', 'text-[26px]')} />
                ),
            },
            {
                title: 'Muvaffaqiyatli ishlar',
                value: seller?.successful_jobs_count || 0,
                icon: (
                    <CheckCircleOutlined
                        className={cn('text-primary', 'text-[26px]')}
                    />
                ),
            },
            {
                title: 'Muvaffaqiyatsiz ishlar',
                value: seller?.unsuccessful_jobs_count || 0,
                icon: (
                    <CloseCircleOutlined
                        className={cn('text-danger', 'text-[26px]')}
                    />
                ),
            },
            {
                title: 'Yuklangan mahsulotlar',
                value: seller?.total_products_count || 0,
                icon: (
                    <FileTextOutlined
                        className={cn('text-purple', 'text-[26px]')}
                    />
                ),
            },
            {
                title: 'Sotilgan mahsulotlar',
                value: seller?.total_sold_documents || 0,
                icon: (
                    <ShoppingOutlined
                        className={cn('text-warning', 'text-[26px]')}
                    />
                ),
            },
        ],
        [seller]
    );

    const limit = isMobile ? 2 : 4;

    return (
        <div className={cn('flex', 'flex-col', 'gap-4', 'flex-1')}>
            {seller?.bio && (
                <div
                    className={cn(
                        'bg-light',
                        'p-4',
                        'shadow',
                        'rounded-xl',
                        'w-full'
                    )}>
                    <h3 className={cn('mb-3', 'text-lg', 'font-semibold')}>
                        Muallif haqida
                    </h3>
                    <p className={cn('m-0', 'text-secondary')}>{seller?.bio}</p>
                </div>
            )}

            {!isMobile && (
                <div className={cn('flex', 'flex-wrap', 'gap-4')}>
                    {stats.map((stat, index) => (
                        <StatCard stat={stat} key={index} className="flex-1" />
                    ))}
                </div>
            )}

            <UserShortItems
                isOrderingClosed={isOrderingClosed}
                sectionRef={sectionRef}
                type="service"
                id={seller.id}
                limit={limit}
            />
            <UserShortItems
                sectionRef={sectionRef}
                type="product"
                direction={seller?.most_common_direction}
                id={seller.id}
                limit={limit}
            />
            <UserShortItems
                sectionRef={sectionRef}
                type="portfolio"
                id={seller.id}
                limit={limit}
            />

            <div ref={commentRef} style={{ scrollMarginTop: '120px' }}>
                <UserCommentsTabs id={seller?.id} />
            </div>
        </div>
    );
};

export default UserInfo;

const StatCard = ({ stat, className }) => {
    return (
        <div
            className={cn(
                'bg-light',
                'p-3',
                'rounded-xl',
                'shadow',
                'flex',
                'items-center',
                'gap-3',
                'min-w-[180px]',
                className
            )}>
            <div>{stat.icon}</div>
            <div>
                <p className={cn('text-[10px]', 'text-secondary', 'm-0')}>
                    {stat.title}
                </p>
                <h3 className={cn('text-[24px]', 'font-semibold', 'm-0')}>
                    {stat.value}
                </h3>
            </div>
        </div>
    );
};

StatCard.displayName = 'StatCard';
