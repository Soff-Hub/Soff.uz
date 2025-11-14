import { Badge, Tabs } from 'antd';
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
import useResponsive from '~/shared/utilities/useResponsive';
import { useTimeManager } from '~/shared/hooks/useTimeManager';



const UserTabs = ({ seller }) => {
    const router = useRouter();
    const { startTimeout, stopTimeout } = useTimeManager();
    const [activeKey, setActiveKey] = useState('about');

    const commentRef = useRef(null);
    const sectionRef = useRef(null);

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
        { key: 'about', label: 'Muallif haqida' },
        {
            key: 'portfolio',
            label: (
                <span>
                    Portfolio {seller?.portfolio_count > 0 && `(${seller.portfolio_count})`}
                </span>
            )
        },
        {
            key: 'service',
            label: (
                <span>
                    Xizmatlar {seller?.service_count > 0 && `(${seller.service_count})`}
                </span>
            )
        },
        {
            key: 'product',
            label: (
                <span>
                    Mahsulotlar {seller?.total_products_count > 0 && `(${seller.total_products_count})`}
                </span>
            )
        },
        {
            key: 'comments',
            label: (
                <span>
                    Izohlar {seller?.total_comments_count > 0 && `(${seller.total_comments_count})`}
                </span>
            )
        },
    ];

    const renderContent = useMemo(() => {
        switch (activeKey) {
            case 'portfolio':
                return <UserPortfolios />;
            case 'service':
                return <UserServices />;
            case 'product':
                return <UserProducts direction={seller?.most_common_direction} id={seller?.id} />;
            default:
                return (
                    <UserInfo
                        sectionRef={sectionRef}
                        commentRef={commentRef}
                        seller={seller}
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
