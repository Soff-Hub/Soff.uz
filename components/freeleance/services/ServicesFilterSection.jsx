import { Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './ServiceFilterSection.module.scss';
import {
    DeleteOutlined,
    DownOutlined,
    SearchOutlined,
} from '@ant-design/icons';

const { Option } = Select;

const directions = [
    { label: 'Ilmiy ishlar', value: 'scientific_work' },
    { label: '3D Dizayn va Vizualizatsiya', value: 'three_d' },
    { label: 'Grafik Dizayn va Shablonlar', value: 'dizayn' },
    { label: 'Veb Dasturlash va IT Xizmatlari', value: 'web' },
    { label: 'Hujjatlar va Professional Shablonlar', value: 'document' },
    { label: 'Barchasi', value: '' },
];

const ServicesFilterSection = ({ count, parentCategory, childCategory }) => {
    const router = useRouter();
    const { query } = router;

    const [searchValue, setSearchValue] = useState(query.search || '');
    const [selectedDirection, setSelectedDirection] = useState(
        query.direction || ''
    );
    const [selectedParentCategory, setSelectedParentCategory] = useState(
        query.category_id || ''
    );

    const updateQuery = newQuery => {
        router.push({ pathname: router.pathname, query: newQuery }, undefined, {
            shallow: false,
        });
    };

    const sendServer = useCallback(() => {
        const delay = setTimeout(() => {
            const newQuery = {
                ...router.query,
                search: searchValue || undefined,
                direction: selectedDirection || undefined,
                category_id: selectedParentCategory || undefined,
            };

            // faqat query farq qilsa update
            if (JSON.stringify(newQuery) !== JSON.stringify(router.query)) {
                updateQuery(newQuery);
            }
        }, 800);

        return () => clearTimeout(delay);
    }, [searchValue, selectedDirection, selectedParentCategory]);

    const updateDirection = value => {
        setSelectedDirection(value);
        setSelectedParentCategory('');
        router.push({
            pathname: router.pathname,
            query: {
                direction: value || undefined, // faqat direction
            },
        });
    };

    const onParentCategoryChange = value => {
        setSelectedParentCategory(value);
        router.push({
            pathname: router.pathname,
            query: {
                direction: selectedDirection || undefined,
                category_id: value || undefined, // direction + parent_category_id
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
    }, [query]);

    const bannerTitle = {
        scientific_work:
            'Ilmiy maqolalar, tadqiqotlar va akademik ishlar uchun materiallar',
        three_d:
            '3D modellashtirish, animatsiya va vizualizatsiya bo‘yicha kreativ yechimlar',
        dizayn: 'Grafik dizayn, brending, logotip va banner shablonlari',
        web: 'Veb dasturlash, mobil ilovalar va IT xizmatlari',
        document: 'Rasmiy hujjatlar va biznes shablonlari',
    };

    return (
        <div className="">
            <div className={styles.headlineWrapper}>
                <h1 className={styles.headline}>
                    {bannerTitle[selectedDirection] || 'Barcha xizmatlar'}
                </h1>
            </div>
            <div className={styles.serviceFilterTab}>
                <div className={styles.filterRow}>
                    <div className="d-flex gap-3 flex-fill">
                        <div className={styles.searchBox}>
                            <input
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                                placeholder="Xizmatlarni izlash"
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

                    <div className={styles.filterSelects}>
                        <Select
                            className={styles.filter_select}
                            suffixIcon={
                                <DownOutlined style={{ color: 'green' }} />
                            }
                            placeholder="Yo'nalish"
                            value={selectedDirection || undefined}
                            onChange={updateDirection}>
                            {directions.map(d => (
                                <Option key={d.value} value={d.value}>
                                    {d.label}
                                </Option>
                            ))}
                        </Select>

                        {selectedDirection  && (
                            <Select
                                className={styles.filter_select}
                                suffixIcon={
                                    <DownOutlined style={{ color: 'green' }} />
                                }
                                placeholder="Kategoriya"
                                value={selectedParentCategory || undefined}
                                onChange={onParentCategoryChange}>
                                {parentCategory?.map(cat => (
                                    <Option key={cat.id} value={String(cat.id)}>
                                        {cat.title}
                                    </Option>
                                ))}
                            </Select>
                        )}

                        {/* <Select
                            className={styles.filter_select}
                            suffixIcon={
                                <DownOutlined style={{ color: 'green' }} />
                            }
                            placeholder="Sub kategoriya"
                            value={selectedChildCategory || undefined}
                            onChange={onChildCategoryChange}>
                            {childCategory?.map(cat => (
                                <Option key={cat.id} value={String(cat.id)}>
                                    {cat.title}
                                </Option>
                            ))}
                        </Select> */}

                        <button
                            className={styles.deleteBtn}
                            onClick={clearFilters}>
                            <DeleteOutlined />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesFilterSection;
