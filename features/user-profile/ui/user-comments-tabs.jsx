import { Tabs } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { cn } from '~/shared/utilities/cn';
import ProductComments from './product-comments';
import ServiceComments from './service-comments';
import { useTranslation } from 'next-i18next';

const UserCommentsTabs = ({ id }) => {
    const { t } = useTranslation('seller');
    const [activeKey, setActiveKey] = useState('product');

    const items = useMemo(
        () => [
            { key: 'product', label: t('tabs.products') },
            { key: 'service', label: t('tabs.services') },
        ],
        [t]
    );

    const renderContent = useMemo(() => {
        if (activeKey === 'product') {
            return <ProductComments id={id} />;
        } else {
            return <ServiceComments id={id} />;
        }
    });

    const onChange = useCallback((key) => setActiveKey(key), []);

    return (
        <div
            className={cn(
                'rounded-xl',
                'w-full',
                // 'mt-4',
                'p-4',
                'bg-light',
                'shadow'
            )}>
            <span className={cn('font-bold', 'text-[20px]', 'mb-3', 'block')}>
                {t('tabs.comments')}
            </span>
            <Tabs
                className="user_tabs"
                items={items}
                destroyOnHidden
                onChange={onChange}
                activeKey={activeKey}
            />

            {renderContent}
        </div>
    );
};

export default memo(UserCommentsTabs);
