import React from 'react';
import { LuSettings2 } from 'react-icons/lu';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import styles from '../styles/freelancersFilterHeader.module.scss';
import { Button, Select, Segmented } from 'antd';
import { useRouter } from 'next/router';

const options = [
    {
        value: 'average_rating',
        label: "Rating bo'yicha",
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

    const handleSortChange = (value) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                sort_by: value,
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
                <Select
                    value={router.query.sort_by || 'average_rating'}
                    onChange={handleSortChange}
                    options={options}
                    style={{ width: 150 }}
                    placeholder={'Saralash'}
                />
                <Segmented
                    value={viewType}
                    onChange={onViewChange}
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
