import React, { useCallback, useState } from 'react';
import { Skeleton } from 'antd';
import { useRouter } from 'next/router';
// import PortfolioCard from '~/entities/portfolio/portfolio-card';
import PortfolioCard from '~/shared/components/portfolio-card';
import { SELLER_PORTFOLIOS } from '~/shared/api/end-points';
import { useFGet } from '~/shared/hooks/useFApi';
import { cn, useRcn } from '~/shared/utilities/cn';
import dynamic from 'next/dynamic';
import ItemsNotFound from './items-not-found';

const PortfolioModal = dynamic(
    () => import('~/shared/components/portfolio-modal'),
    {
        ssr: false,
    }
);

const UserPortfolios = () => {
    const router = useRouter();
    const [portfolio, setPortfolio] = useState();
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
        tablet: 'grid-cols-3',
        desktop: 'grid-cols-4',
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
                )}>
                <div className={cn('grid', 'gap-4', gridClass)}>
                    {portfolios?.map((portfolio) => (
                        <PortfolioCard
                            key={portfolio.id}
                            setPortfolio={handleSetPortfolio}
                            portfolio={portfolio}
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

export default UserPortfolios;

const PortfolioSkeletonGrid = () => {
    return Array.from({ length: 6 }).map((_, i) => (
        <Skeleton.Image
            key={i}
            active
            style={{ width: '100%', height: 200, borderRadius: '12px' }}
        />
    ));
};
