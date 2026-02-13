import React, { memo, useMemo, useState, useCallback } from 'react';
import { Skeleton, Button } from 'antd';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useFGet } from '~/shared/hooks/useFApi';
import styles from '../styles/user-short-items.module.scss';
import { SELLER_PORTFOLIOS, SELLER_SERVICES } from '~/shared/api/end-points';
import { useSellerProducts } from '../api/useSellerProducts';

const PortfolioCard = dynamic(() => import('~/shared/components/portfolio-card'), { ssr: true });
const ServiceCard = dynamic(() => import('~/entities/service/service-card'), { ssr: true });
const ProductCard = dynamic(() => import('~/entities/product/product-card'), { ssr: true });

const PortfolioModal = dynamic(
    () => import('~/shared/components/portfolio-modal'),
    {
        ssr: false,
    }
);

const UserShortItems = ({
    type = 'portfolio',
    id,
    limit = 4,
    isOrderingClosed,
    sectionRef,
    direction,
}) => {
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

    const items = useMemo(() => {
        if (!data) return [];

        if (isProduct && Array.isArray(data.results)) {
            return data.results.slice(0, 4); // Always take up to 4, handle hiding in CSS
        }

        if (Array.isArray(data)) {
            return data.slice(0, 4);
        }

        return [];
    }, [data, isProduct]);

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
        <div className={styles.itemsContainer}>
            <div className={styles.itemsWrapper}>
                {/* Title */}
                <h2 className={styles.title}>
                    {titles[type]}
                </h2>

                {/* Grid */}
                <div className={styles.itemsGrid}>
                    {isLoading && <SkeletonGrid count={limit} type={type} />}
                    {!isLoading &&
                        items.map((item) => (
                            <div key={item.id} className={styles.itemCard}>
                                <Card
                                    {...(type === 'portfolio'
                                        ? {
                                            portfolio: item,
                                            setPortfolio: handleClick,
                                        }
                                        : {})}
                                    {...(type === 'service'
                                        ? {
                                            service: item,
                                            hasFooter: false,
                                            disabled: isOrderingClosed,
                                        }
                                        : {})}
                                    {...(type === 'product'
                                        ? { product: item }
                                        : {})}
                                />
                            </div>
                        ))}
                </div>

                {/* Button */}

                <div className={styles.buttonContainer}>
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
                <div key={i} className={styles.itemCard}>
                    <Skeleton.Image
                        active
                        style={{ width: '100%', height, borderRadius: '12px' }}
                    />
                </div>
            ))}
        </>
    );
});
