import React from 'react';
import { Skeleton } from 'antd';
import { useRouter } from 'next/router';
import ServiceCard from '~/entities/service/service-card';
import { SELLER_SERVICES } from '~/shared/api/end-points';
import { useFGet } from '~/shared/hooks/useFApi';
import styles from '../styles/user-tab-content.module.scss';
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

    const notFound = !isLoading && (!Array.isArray(data) || data.length === 0);

    if (notFound)
        return (
            <div className={styles.tabContentContainer}>
                <ItemsNotFound type="service" />
            </div>
        );

    return (
        <div className={styles.tabContentContainer}>
            <div className={styles.contentWrapper}>
                <div className={styles.itemsGrid}>
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
