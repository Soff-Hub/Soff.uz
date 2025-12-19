import React from 'react';
import { LuSettings2 } from 'react-icons/lu';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import styles from '../styles/freelancersFilterHeader.module.scss';
import { Button, Select, Segmented } from 'antd';
import { useRouter } from 'next/router';
import { GoSortAsc } from 'react-icons/go';
import { GoSortDesc } from 'react-icons/go';

const options = [
    {
        value: 'average_rating',
        label: "Reyting bo'yicha",
    },
    {
        value: 'last_active',
        label: "Faollik bo'yicha",
    },
];

function FreelancersFilterHeader({
    toggleCollapsed,
    collapsed,
    viewType,
    onViewChange,
}) {
    const router = useRouter();
    const sortOrder = router.query.order || 'desc';

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
                Filterlar
            </Button>
            <div className={styles.controls}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Select
                        value={router.query.sort_by || 'average_rating'}
                        onChange={handleSortChange}
                        options={options}
                        style={{ width: 150 }}
                        placeholder={'Saralash'}
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
