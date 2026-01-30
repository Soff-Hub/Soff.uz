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
import useSearch from '~/shared/hooks/useSearch';
import SearchController from '~/shared/components/search-result/SearchController';

const { Option } = Select;

const ServicesFilterSection = ({ parentCategory, directions }) => {
    const searchProps = useSearch();
    const { search, setSearch } = searchProps;
    const router = useRouter();
    const { query, isReady } = router;

    const directionsWithEmpty = [
        { label: 'Barchasi', value: '' },
        ...directions,
    ];

    const [selectedDirection, setSelectedDirection] = useState('');
    const [selectedParentCategory, setSelectedParentCategory] = useState('');

    const updateQuery = (newQuery) => {
        router.push({ pathname: router.pathname, query: newQuery }, undefined, {
            shallow: false,
        });
    };

    const updateDirection = (value) => {
        setSelectedDirection(value);
        setSelectedParentCategory('');
        setSearch('');
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
        setSearch('');
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
        setSearch('');
        setSelectedDirection('');
        setSelectedParentCategory('');
        updateQuery({});
    };

    useEffect(() => {
        if (!isReady) return;
        setSelectedDirection(query.direction || '');
        setSelectedParentCategory(
            query.category_id || query.parent_category_id || ''
        );
        setSearch(query.search || '');
    }, [isReady]);

    const handleSearch = (search) => {
        router.push({
            pathname: query.pathname,
            query: { ...query, search },
        });
    };

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

                    <SearchController
                        searchOption="selection"
                        categoryType="xizmatlar"
                        styles={{
                            wrapper: {
                                maxWidth: '480px',
                            },
                        }}
                        classnames={{
                            wrapper: styles.searchBoxWrapper,
                        }}
                        searchProps={{
                            ...searchProps,
                            handleClickOption: handleSearch,
                        }}>
                        {(
                            inputRef,
                            {
                                handleInputChange,
                                handleInputFocus,
                                handleInputBlur,
                                handleStoreSearchValue,
                                handleClose,
                            }
                        ) => (
                            <div className="d-flex justify-content-end gap-3 flex-fill">
                                <div className={styles.searchBox}>
                                    <input
                                        ref={inputRef}
                                        value={search}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        placeholder="Qanday xizmat izlamoqdasiz"
                                        className={styles.input}
                                        type="text"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSearch(search);
                                                handleStoreSearchValue(search);
                                                handleClose();
                                            }
                                        }}
                                    />
                                    <span
                                        className={styles.searchIcon}
                                        onClick={() => {
                                            handleSearch(search);
                                            handleStoreSearchValue(search);
                                            handleClose();
                                        }}>
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
                        )}
                    </SearchController>
                </div>
            </div>
        </div>
    );
};

export default ServicesFilterSection;
