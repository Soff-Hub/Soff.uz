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
import styles from '../styles/user-tabs.module.scss';
import dynamic from 'next/dynamic';
import { useTimeManager } from '~/shared/hooks/useTimeManager';

const UserInfo = dynamic(() => import('./user-info'), {
    loading: () => <div className="min-h-[400px]" />,
});
const UserPortfolios = dynamic(() => import('./user-portfolios'), {
    loading: () => <div className="min-h-[400px]" />,
});
const UserServices = dynamic(() => import('./user-services'), {
    loading: () => <div className="min-h-[400px]" />,
});
const UserProducts = dynamic(() => import('./user-products'), {
    loading: () => <div className="min-h-[400px]" />,
});

const UserTabs = ({ seller }) => {
    const router = useRouter();
    const { startTimeout, stopTimeout } = useTimeManager();
    const [activeKey, setActiveKey] = useState('about');

    const commentRef = useRef(null);
    const sectionRef = useRef(null);
    const isBlocked = seller?.is_blocked;

    // The default tab lives at the clean /seller/<id> URL. Rewriting it to
    // ?tab=about acted as a client-side redirect for Googlebot, which then
    // indexed the parameterised duplicate instead of the canonical page.
    useEffect(() => {
        setActiveKey(router.query.tab || 'about');
    }, [router]);

    const onChange = useCallback(
        (key) => {
            const { tab, ...rest } = router.query;
            router.push(
                {
                    pathname: router.pathname,
                    query: key === 'about' ? rest : { ...rest, tab: key },
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
        { key: 'about', label: 'Muallif haqida' },
        {
            key: 'portfolio',
            label: (
                <span>
                    Portfolio{' '}
                    {seller?.portfolio_count > 0 &&
                        `(${seller.portfolio_count})`}
                </span>
            ),
        },
        {
            key: 'service',
            label: (
                <span>
                    Xizmatlar{' '}
                    {seller?.service_count > 0 && `(${seller.service_count})`}
                </span>
            ),
        },
        {
            key: 'product',
            label: (
                <span>
                    Mahsulotlar{' '}
                    {seller?.total_products_count > 0 &&
                        `(${seller.total_products_count})`}
                </span>
            ),
        },
        {
            key: 'comments',
            label: (
                <span>
                    Izohlar{' '}
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
        <div className={styles.tabsContainer}>
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
            ref={ref}
            className={styles.tabsWrapper}>
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
