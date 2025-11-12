import React, { memo, useMemo, useState, useCallback } from 'react';
import { Skeleton, Button } from 'antd';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ArrowRightOutlined } from '@ant-design/icons';
import { cn, useRcn } from '~/shared/utilities/cn';
import { useFGet } from '~/shared/hooks/useFApi';
import useResponsive from '~/shared/utilities/useResponsive';

import PortfolioCard from '~/entities/portfolio/portfolio-card';
import ServiceCard from '~/entities/service/service-card';
import ProductCard from '~/entities/product/product-card';

import { SELLER_PORTFOLIOS, SELLER_SERVICES } from '~/shared/api/end-points';
import { useSellerProducts } from '../api/useSellerProducts';

const PortfolioModal = dynamic(
    () => import('~/entities/portfolio/portfolio-modal'),
    {
        ssr: false,
    }
);

const UserShortItems = ({ type = 'portfolio', id, limit = 4, sectionRef, direction }) => {
    const { isDesktop } = useResponsive();
    const router = useRouter();
    const [selected, setSelected] = useState(null);

    const titles = {
        portfolio: 'Portfolio',
        service: 'Xizmatlar',
        product: 'Mahsulotlar',
    };

    const { key, url, Card } = useMemo(() => {
        switch (type) {
            case 'service':
                return {
                    key: `${id}-service`,
                    url: `${SELLER_SERVICES}${id}`,
                    Card: ServiceCard,
                };
            case 'product':
                return {
                    key: `${id}-short-product`,
                    url: null,
                    Card: ProductCard,
                };
            default:
                return {
                    key: `${id}-portfolio`,
                    url: `${SELLER_PORTFOLIOS}${id}`,
                    Card: PortfolioCard,
                };
        }
    }, [type, id]);

    const isProduct = type === 'product';

    const { data: productData, isLoading: productLoading } = useSellerProducts(
        id,
        1,
        direction || 'file'
    );
    const { data: otherData, isLoading: otherLoading } = useFGet(key, url, {
        enabled: !!id && !isProduct,
        token: null,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    });

    const data = isProduct ? productData : otherData;
    const isLoading = isProduct ? productLoading : otherLoading;

    const gridClass = useRcn({
        mobile: 'grid-cols-2',
        tablet: 'grid-cols-3',
        desktop: 'grid-cols-4',
    });

    const items = useMemo(() => {
        if (!data) return [];

        if (isProduct && Array.isArray(data.results)) {
            return data.results.slice(0, limit);
        }

        if (Array.isArray(data)) {
            return data.slice(0, limit);
        }

        return [];
    }, [data, limit, isProduct]);

    const handleClick = useCallback(
        (item) => {
            if (type === 'portfolio') setSelected(item);
        },
        [type]
    );

    const handleMoreClick = useCallback(() => {
        if (!id) return;

        router
            .push(
                {
                    pathname: `/seller/${id}`,
                    query: { tab: type },
                },
                undefined,
                { shallow: true }
            )
            .then(() => {
                const isMobile = window.innerWidth < 768;

                if (isMobile) {
                    if (sectionRef?.current) {
                        sectionRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
    }, [id, type, router, sectionRef]);

    if (!isLoading && items.length === 0) return null;

    return (
        <div className={cn('w-full')}>
            <div
                className={cn(
                    'bg-light',
                    'p-3',
                    'shadow',
                    'rounded-xl',
                    'flex',
                    'flex-col',
                    'gap-3',
                    isDesktop ? 'h-min-90' : ''
                )}>
                {/* Title */}
                <h2 className={cn('text-lg', 'font-semibold', 'px-1')}>
                    {titles[type]}
                </h2>

                {/* Grid */}
                <div className={cn('grid', 'gap-4', gridClass)}>
                    {isLoading && <SkeletonGrid count={limit} type={type} />}
                    {!isLoading &&
                        items.map((item) => (
                            <Card
                                key={item.id}
                                {...(type === 'portfolio'
                                    ? {
                                        portfolio: item,
                                        setPortfolio: handleClick,
                                    }
                                    : {})}
                                {...(type === 'service'
                                    ? { service: item, hasFooter: false }
                                    : {})}
                                {...(type === 'product'
                                    ? { product: item }
                                    : {})}
                            />
                        ))}
                </div>

                {/* Button */}

                <div className={cn('flex', 'justify-center', 'mt-2', 'px-1')}>
                    <Button
                        type="primary"
                        shape="round"
                        icon={<ArrowRightOutlined />}
                        iconPosition="end"
                        onClick={handleMoreClick}>
                        Barchasini ko'rish
                    </Button>
                </div>
            </div>

            {type === 'portfolio' && (
                <PortfolioModal
                    open={!!selected}
                    onClose={() => setSelected(null)}
                    portfolio={selected}
                />
            )}
        </div>
    );
};

export default memo(UserShortItems);

const SkeletonGrid = memo(({ type, count }) => {
    const height = type === 'product' ? 160 : 200;

    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <Skeleton.Image
                    key={i}
                    active
                    style={{ width: '100%', height, borderRadius: '12px' }}
                />
            ))}
        </>
    );
});
