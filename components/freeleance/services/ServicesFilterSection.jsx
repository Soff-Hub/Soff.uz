import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './ServiceFilterSection.module.scss';
const ServicesFilterSection = ({ count, parentCategory, childCategory }) => {
    const router = useRouter();
    const { query } = router;

    const [searchValue, setSearchValue] = useState(query.search || '');
    const [selectedParentCategory, setSelectedParentCategory] = useState(
        query.parent_category_id || ''
    );

    const updateQuery = (key, value) => {
        // Avval query object nusxasini olamiz
        const newQuery = { ...router.query };

        if (key === 'direction') {
            // Faqat direction qoladi
            router.push(
                {
                    pathname: router.pathname,
                    query: { direction: value },
                },
                undefined,
                { shallow: false }
            );
            return;
        }

        if (key === 'parent_category_id') {
            // faqat direction + parent_category_id qoldiramiz
            const q = {
                direction: newQuery.direction,
                parent_category_id: value,
            };
            router.push({ pathname: router.pathname, query: q }, undefined, {
                shallow: false,
            });
            return;
        }

        if (key === 'category_id') {
            // faqat category_id yangilanadi
            const q = {
                ...newQuery,
                category_id: value,
            };
            router.push({ pathname: router.pathname, query: q }, undefined, {
                shallow: false,
            });
            return;
        }

        // default fallback (boshqa keylar uchun)
        if (value) {
            newQuery[key] = value;
        } else {
            delete newQuery[key];
        }

        router.push(
            {
                pathname: router.pathname,
                query: newQuery,
            },
            undefined,
            { shallow: false }
        );
    };

    // Debounce search
    useEffect(() => {
        const delay = setTimeout(() => {
            updateQuery('search', searchValue);
        }, 1000);

        return () => clearTimeout(delay);
    }, [searchValue]);

    // Parent category select o'zgarganda URL update qilish
    const onParentCategoryChange = val => {
        setSelectedParentCategory(val);
        updateQuery('parent_category_id', val);
    };

    // Direction qismini o'zgartirish
    const updateDirection = value => {
        updateQuery('direction', value);
        setSelectedParentCategory('');
    };

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
        <div className="container">
            <div className={styles.headlineWrapper}>
                <h1 className={styles.headline}>
                    {bannerTitle[query.direction] || 'Barcha xizmatlar'}
                </h1>
            </div>
            <div className={styles.serviceFilterTab}>
                {/* Chap taraf - mahsulot soni */}
                <p className={styles.servicesCount}>
                    {count || 0} ta xizmatlar
                </p>

                {/* O'ng taraf - filterlar */}
                <Space wrap>
                    {/* Search */}
                    <Input
                        style={{ height: '32px' }}
                        prefix={
                            <SearchOutlined
                                style={{ color: '#aaa', margin: '0px 4px' }}
                            />
                        }
                        placeholder="Xizmatlarni izlash"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        allowClear
                    />

                    {/* Kategoriya (existing) */}
                    {selectedParentCategory && (
                        <Select
                            placeholder="Kategoriya"
                            style={{ minWidth: '150px' }}
                            value={query.category_id || undefined}
                            onChange={val => updateQuery('category_id', val)}
                            allowClear>
                            {childCategory &&
                                childCategory.map(cat => (
                                    <Select.Option
                                        key={cat.id}
                                        value={String(cat.id)}>
                                        {cat.title}
                                    </Select.Option>
                                ))}
                        </Select>
                    )}

                    {/* Yangi parent category select */}
                    <Select
                        placeholder="Muvjud xizmatlar"
                        style={{ minWidth: '180px' }}
                        value={selectedParentCategory || undefined}
                        onChange={onParentCategoryChange}
                        allowClear>
                        {parentCategory &&
                            parentCategory.map(cat => (
                                <Select.Option
                                    key={cat.id}
                                    value={String(cat.id)}>
                                    {cat.title}
                                </Select.Option>
                            ))}
                    </Select>
                    <Select
                        placeholder="Yo'nalishlar"
                        style={{ minWidth: '180px' }}
                        value={router.query.direction || ''}
                        onChange={updateDirection}
                        allowClear>
                        {[
                            {
                                label: 'Ilmiy ishlar',
                                value: 'scientific_work',
                            },
                            {
                                label: '3D Dizayn va Vizualizatsiya',
                                value: 'three_d',
                            },
                            {
                                label: 'Grafik Dizayn va Shablonlar',
                                value: 'dizayn',
                            },
                            {
                                label: 'Veb Dasturlash va IT Xizmatlari',
                                value: 'web',
                            },
                            {
                                label: 'Hujjatlar va Professional Shablonlar',
                                value: 'document',
                            },
                        ].map(cat => (
                            <Select.Option key={cat.value} value={cat.value}>
                                {cat.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Space>
            </div>
        </div>
    );
};

export default ServicesFilterSection;
