import React from 'react';
import { Skeleton } from 'antd';
import { useRouter } from 'next/router';
import ServiceCard from '~/entities/service/service-card';
import { SELLER_SERVICES } from '~/shared/api/end-points';
import { useFGet } from '~/shared/hooks/useFApi';
import { cn, useRcn } from '~/shared/utilities/cn';
import ItemsNotFound from './items-not-found';

const UserServices = ({ isOrderingClosed }) => {
    const router = useRouter();
    const { pid } = router.query;
    const { data, isLoading } = useFGet(
        `${pid}-service`,
        `${SELLER_SERVICES}${pid}`,
        {
            enabled: !!pid,
            token: null,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 10,
        }
    );

    const gridClass = useRcn({
        mobile: 'grid-cols-2',
        tablet: 'grid-cols-3',
        desktop: 'grid-cols-4',
    });

    const notFound = !isLoading && (!Array.isArray(data) || data.length === 0);

    if (notFound)
        return (
            <div
                className={cn(
                    'w-full',
                    'h-full',
                    'flex',
                    'flex-col',
                    'gap-4',
                    'flex-1'
                )}>
                <ItemsNotFound type="service" />
            </div>
        );

    return (
        <div
            className={cn(
                'w-full',
                'h-full',
                'flex',
                'flex-col',
                'gap-4',
                'flex-1'
            )}>
            <div
                className={cn(
                    'bg-light',
                    'p-3',
                    'shadow',
                    'rounded-xl',
                    'h-full'
                )}>
                <div className={cn('grid', 'gap-4', gridClass)}>
                    {data?.map((service) => (
                        <ServiceCard
                            key={service.id}
                            hasFooter={false}
                            service={service}
                            disabled={isOrderingClosed}
                        />
                    ))}
                    {isLoading && <ServiceSkeletonGrid />}
                </div>
            </div>
        </div>
    );
};

export default UserServices;

const ServiceSkeletonGrid = () => {
    return Array.from({ length: 6 }).map((_, i) => (
        <Skeleton.Image
            key={i}
            active
            style={{ width: '100%', height: 200, borderRadius: '12px' }}
        />
    ));
};
