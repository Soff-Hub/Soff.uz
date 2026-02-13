import { Tabs } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import styles from '../styles/user-comments-tabs.module.scss';
import ProductComments from './product-comments';
import ServiceComments from './service-comments';

const items = [
    { key: 'product', label: 'Mahsulotlar' },
    { key: 'service', label: 'Xizmatlar' },
];

const UserCommentsTabs = ({ id }) => {
    const [activeKey, setActiveKey] = useState('product');

    const renderContent = useMemo(() => {
        if (activeKey === 'product') {
            return <ProductComments id={id} />;
        } else {
            return <ServiceComments id={id} />;
        }
    });

    const onChange = useCallback((key) => setActiveKey(key), []);

    return (
        <div className={styles.commentsContainer}>
            <span className={styles.commentsTitle}>
                Izohlar
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
