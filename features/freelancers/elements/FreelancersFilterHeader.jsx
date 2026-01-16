import React from 'react';
import { useTranslation } from 'next-i18next';
import { LuSettings2 } from 'react-icons/lu';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import styles from '../styles/freelancersFilterHeader.module.scss';
import { Button, Select, Segmented } from 'antd';
import { useRouter } from 'next/router';
import { GoSortAsc } from 'react-icons/go';
import { GoSortDesc } from 'react-icons/go';

function FreelancersFilterHeader({
    toggleCollapsed,
    collapsed,
    viewType,
    onViewChange,
}) {
    const { t } = useTranslation('freelancers');
    const router = useRouter();
    const sortOrder = router.query.order || 'desc';

    const options = [
        {
            value: 'average_rating',
            label: t('filter.sortByRating'),
        },
        {
            value: 'last_active',
            label: t('filter.sortByActivity'),
        },
    ];

    const handleSortChange = (value) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                sort_by: value,
                order: 'desc',
            },
        });
    };

    return (
        <div className={styles.headerWrapper}>
            <Button
                icon={<LuSettings2 />}
                onClick={toggleCollapsed}
                type={collapsed ? 'primary' : 'default'}>
                {t('filter.title')}
            </Button>
            <div className={styles.controls}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Select
                        value={router.query.sort_by || 'average_rating'}
                        onChange={handleSortChange}
                        options={options}
                        style={{ width: 150 }}
                        placeholder={t('filter.sortBy')}
                    />
                    <Button
                        type="dashed"
                        icon={
                            sortOrder === 'asc' ? (
                                <GoSortAsc fontSize={20} />
                            ) : (
                                <GoSortDesc fontSize={20} />
                            )
                        }
                        onClick={() => {
                            const newSortOrder =
                                sortOrder === 'asc' ? 'desc' : 'asc';
                            router.push({
                                pathname: router.pathname,
                                query: {
                                    ...router.query,
                                    order: newSortOrder,
                                },
                            });
                        }}
                    />
                </div>
                <Segmented
                    value={viewType}
                    onChange={onViewChange}
                    rootClassName="ant-filter-segmented"
                    options={[
                        {
                            value: 'horizontal',
                            icon: <UnorderedListOutlined />,
                        },
                        {
                            value: 'grid',
                            icon: <AppstoreOutlined />,
                        },
                    ]}
                    className={styles.viewToggle}
                />
            </div>
        </div>
    );
}

export default FreelancersFilterHeader;
