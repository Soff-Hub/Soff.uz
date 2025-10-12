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
import useResponsive from '~/shared/utilities/useResponsive';

const items = [
    { key: 'about', label: 'Muallif haqida' },
    { key: 'portfolio', label: 'Portfolio' },
    { key: 'service', label: 'Xizmatlar' },
    { key: 'product', label: 'Mahsulotlar' },
    { key: 'comments', label: 'Izohlar' },
];

const UserTabs = ({ seller }) => {
    const router = useRouter();
    const { tab } = router.query;
    const [activeKey, setActiveKey] = useState('about');

    const commentRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        if (tab && items.find((item) => item.key === tab)) {
            setActiveKey(tab);
        }
    }, [tab, items]);

    const onChange = useCallback(
        (key) => {
            setActiveKey(key);
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
            setTimeout(() => {
                commentRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }, 300);
        }
    }, [activeKey]);

    const renderContent = useMemo(() => {
        switch (activeKey) {
            case 'portfolio':
                return <UserPortfolios />;
            case 'service':
                return <UserServices />;
            case 'product':
                return <UserProducts id={seller?.id} />;
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

const DynamicTabs = forwardRef(({ activeKey, onChange }, ref) => {
    const { isMobile } = useResponsive();

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
