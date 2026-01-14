import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import React, {
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { cn } from '~/shared/utilities/cn';
import UserInfo from './user-info';
import UserPortfolios from './user-portfolios';
import UserServices from './user-services';
import UserProducts from './user-products';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { useTranslation } from 'next-i18next';

const UserTabs = ({ seller }) => {
    const { t } = useTranslation('seller');
    const router = useRouter();
    const { startTimeout, stopTimeout } = useTimeManager();
    const [activeKey, setActiveKey] = useState('about');

    const commentRef = useRef(null);
    const sectionRef = useRef(null);

    // const isFreelancer = seller?.has_portfolio && seller?.has_service;
    // const isOpenToAcceptOrders = seller?.accepting_orders;
    // NOTE: for testing purposes only
    // const isBlocked = true;
    // const isLockedForService = !(isFreelancer && isOpenToAcceptOrders);
    // const isOrderingClosed = isLockedForService || isBlocked;
    const isBlocked = seller?.is_blocked;

    useEffect(() => {
        const { tab } = router.query;
        if (!tab) {
            router.replace(
                {
                    pathname: router.pathname,
                    query: { ...router.query, tab: 'about' },
                },
                undefined,
                { shallow: true }
            );
            setActiveKey('about');
        } else {
            setActiveKey(tab);
        }
    }, [router]);

    const onChange = useCallback(
        (key) => {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query, tab: key },
                },
                undefined,
                { shallow: true }
            );
        },
        [router]
    );

    useEffect(() => {
        if (activeKey === 'comments' && commentRef.current) {
            const timing = startTimeout(() => {
                commentRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }, 300);

            return () => stopTimeout(timing);
        }
    }, [activeKey]);

    const items = [
        { key: 'about', label: t('tabs.about') },
        {
            key: 'portfolio',
            label: (
                <span>
                    {t('tabs.portfolio')}{' '}
                    {seller?.portfolio_count > 0 &&
                        `(${seller.portfolio_count})`}
                </span>
            ),
        },
        {
            key: 'service',
            label: (
                <span>
                    {t('tabs.services')}{' '}
                    {seller?.service_count > 0 && `(${seller.service_count})`}
                </span>
            ),
        },
        {
            key: 'product',
            label: (
                <span>
                    {t('tabs.products')}{' '}
                    {seller?.total_products_count > 0 &&
                        `(${seller.total_products_count})`}
                </span>
            ),
        },
        {
            key: 'comments',
            label: (
                <span>
                    {t('tabs.comments')}{' '}
                    {seller?.total_comments_count > 0 &&
                        `(${seller.total_comments_count})`}
                </span>
            ),
        },
    ];

    const renderContent = useMemo(() => {
        switch (activeKey) {
            case 'portfolio':
                return <UserPortfolios />;
            case 'service':
                return <UserServices isOrderingClosed={isBlocked} />;
            case 'product':
                return (
                    <UserProducts
                        direction={seller?.most_common_direction}
                        id={seller?.id}
                    />
                );
            default:
                return (
                    <UserInfo
                        sectionRef={sectionRef}
                        commentRef={commentRef}
                        seller={seller}
                        isOrderingClosed={isBlocked}
                    />
                );
        }
    }, [activeKey]);

    return (
        <div className={cn('h-full', 'flex', 'flex-col', 'gap-4', 'w-full')}>
            <DynamicTabs
                ref={sectionRef}
                items={items}
                activeKey={activeKey}
                onChange={onChange}
            />
            {renderContent}
        </div>
    );
};

export default memo(UserTabs);

const DynamicTabs = forwardRef(({ activeKey, onChange, items }, ref) => {
    return (
        <div
            style={{ scrollMarginTop: '150px' }}
            ref={ref}
            className={cn('bg-light', 'shadow', 'rounded-xl', 'w-full')}>
            <Tabs
                className="user_tabs"
                items={items}
                activeKey={activeKey}
                onChange={onChange}
                destroyOnHidden
            />
        </div>
    );
});
