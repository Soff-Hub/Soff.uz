import { Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React, { memo, useCallback, useMemo, useState } from 'react';
import PortfolioCard from '~/entities/portfolio/portfolio-card';
import { SELLER_PORTFOLIOS } from '~/shared/api/end-points';
import { useFGet } from '~/shared/hooks/useFApi';
import { cn, useRcn } from '~/shared/utilities/cn';
import dynamic from 'next/dynamic';
import ItemsNotFound from './items-not-found';
import useResponsive from '~/shared/utilities/useResponsive';
import styles from '@/widgets/home/freelance/style.module.scss';

const PortfolioModal = dynamic(
    () => import('~/entities/portfolio/portfolio-modal'),
    {
        ssr: false,
    }
);

const UserPortfolios = () => {
    const router = useRouter();
    const [portfolio, setPortfolio] = useState();
    const { isDesktop } = useResponsive();
    const { pid } = router.query;
    const { data: portfolios, isLoading } = useFGet(
        `${pid}-portfolio`,
        `${SELLER_PORTFOLIOS}${pid}`,
        {
            enabled: !!pid,
            token: null,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 10,
        }
    );

    const gridClass = useRcn({
        mobile: 'grid-cols-2',
        tablet: 'grid-cols-2',
        desktop: 'grid-cols-3',
    });

    const notFound = !isLoading && (!portfolios || portfolios?.length === 0);

    const handleSetPortfolio = useCallback((item) => setPortfolio(item), []);

    if (notFound)
        return (
            <div
                className={cn('w-full', 'flex', 'flex-col', 'gap-4', 'flex-1')}>
                <ItemsNotFound type="portfolio" />
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
                    // isDesktop ? 'h-min-90' : ''
                )}>
                <div className={cn('grid', 'gap-4', gridClass)}>
                    {portfolios?.map((portfolio) => (
                        <PortfolioCard
                            setPortfolio={handleSetPortfolio}
                            portfolio={portfolio}
                            key={portfolio.id}
                        />
                    ))}
                    {isLoading && <PortfolioSkeletonGrid />}
                </div>
            </div>
            <PortfolioModal
                open={!!portfolio}
                onClose={() => setPortfolio(null)}
                portfolio={portfolio}
            />
        </div>
    );
};

export default memo(UserPortfolios);

const PortfolioSkeletonGrid = memo(() => {
    const skeletonItems = useMemo(
        () =>
            Array.from({ length: 6 }).map((_, i) => (
                <Skeleton.Image
                    key={i}
                    active
                    style={{ width: '100%', height: 200, borderRadius: '12px' }}
                />
            )),
        []
    );

    return <>{skeletonItems}</>;
});
