import { Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './ServiceFilterSection.module.scss';
import {
    DeleteOutlined,
    DownOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import ServiceSteps from './service-steps';
import { useTimeManager } from '~/shared/hooks/useTimeManager';

const { Option } = Select;

const ServicesFilterSection = ({ parentCategory, directions }) => {
    const router = useRouter();
    const { query } = router;
    const { startTimeout, stopTimeout } = useTimeManager();

    const directionsWithEmpty = [
        { label: 'Barchasi', value: '' },
        ...directions,
    ];

    const [searchValue, setSearchValue] = useState(query.search);
    const [selectedDirection, setSelectedDirection] = useState(
        query.direction || ''
    );
    const [selectedParentCategory, setSelectedParentCategory] = useState(
        query.category_id || ''
    );

    const updateQuery = (newQuery) => {
        router.push({ pathname: router.pathname, query: newQuery }, undefined, {
            shallow: false,
        });
    };

    useEffect(() => {
        const delay = startTimeout(() => {
            if (searchValue === undefined) return;
            const newQuery = {
                ...router.query,
                search: searchValue || undefined,
                direction: selectedDirection || undefined,
                category_id: selectedParentCategory || undefined,
                offset: 0,
            };

            if (JSON.stringify(newQuery) !== JSON.stringify(router.query)) {
                updateQuery(newQuery);
            }
        }, 800);

        return () => stopTimeout(delay);
    }, [searchValue]);

    const updateDirection = (value) => {
        setSelectedDirection(value);
        setSelectedParentCategory('');
        setSearchValue('');
        router.push({
            pathname: router.pathname,
            query: {
                direction: value || undefined,
                offset: 0,
            },
        });
    };

    const onParentCategoryChange = (value) => {
        setSelectedParentCategory(value);
        setSearchValue('');
        router.push({
            pathname: router.pathname,
            query: {
                direction: selectedDirection || undefined,
                category_id: value || undefined,
                offset: 0,
            },
        });
    };

    const clearFilters = () => {
        setSearchValue('');
        setSelectedDirection('');
        setSelectedParentCategory('');
        updateQuery({});
    };

    useEffect(() => {
        setSelectedDirection(query.direction);
        setSelectedParentCategory(
            query.category_id || query.parent_category_id
        );
    }, [query]);

    return (
        <div className="">
            <div className={styles.headlineWrapper}>
                <ServiceSteps />
            </div>
            <div className={styles.serviceFilterTab}>
                <div className={styles.filterRow}>
                    <div className={styles.filterSelects}>
                        <Select
                            className={styles.filter_select}
                            suffixIcon={
                                <DownOutlined style={{ color: 'green' }} />
                            }
                            placeholder="Yo'nalish"
                            value={selectedDirection || undefined}
                            onChange={updateDirection}>
                            {directionsWithEmpty.map((d) => (
                                <Option key={d.value} value={d.value}>
                                    {d.label}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            allowClear
                            className={styles.filter_select}
                            suffixIcon={
                                <DownOutlined style={{ color: 'green' }} />
                            }
                            placeholder="Kategoriya"
                            value={selectedParentCategory || undefined}
                            onChange={onParentCategoryChange}>
                            <Option value="">Barchasi</Option>
                            {parentCategory?.map((cat) => (
                                <Option key={cat.id} value={String(cat.id)}>
                                    {cat.title}
                                </Option>
                            ))}
                        </Select>

                        <button
                            className={styles.deleteBtn}
                            onClick={clearFilters}>
                            <DeleteOutlined />
                        </button>
                    </div>

                    <div className="d-flex justify-content-end gap-3 flex-fill">
                        <div className={styles.searchBox}>
                            <input
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Qanday xizmat izlamoqdasiz"
                                className={styles.input}
                                type="text"
                            />
                            <span className={styles.searchIcon}>
                                <SearchOutlined />
                            </span>
                        </div>
                        <div className="d-flex d-md-none align-items-center">
                            <button
                                className={styles.deleteMob}
                                onClick={clearFilters}>
                                <DeleteOutlined />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesFilterSection;
