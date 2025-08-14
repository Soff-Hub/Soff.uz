import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ServicesFilterSection = ({ count, parentCategory, childCategory }) => {
    const router = useRouter();
    const { query } = router;

    const [searchValue, setSearchValue] = useState(query.search || '');
    const [selectedParentCategory, setSelectedParentCategory] = useState(query.parent_category_id || '');

    const updateQuery = (key, value) => {
        const newQuery = { ...query, [key]: value };
        if (!value) {
            delete newQuery[key];
        }
        router.push(
            {
                pathname: router.pathname,
                query: newQuery
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
    const onParentCategoryChange = (val) => {
        setSelectedParentCategory(val);
        updateQuery('parent_category_id', val);
    };

    return (
        <div className="container mb-3">
            <div
                className="d-flex flex-wrap justify-content-between align-items-center gap-2"
                style={{ rowGap: '10px' }}
            >
                {/* Chap taraf - mahsulot soni */}
                <p className="fs-5 m-0">{count || 0} ta xizmatlar</p>

                {/* O'ng taraf - filterlar */}
                <Space wrap>
                    {/* Search */}
                    <Input
                        style={{ height: '32px', minWidth: '200px' }}
                        suffix={<SearchOutlined style={{ color: '#aaa' }} />}
                        placeholder="Xizmatlarni izlash"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        allowClear
                    />

                    {/* Kategoriya (existing) */}
                    {selectedParentCategory && (
                        <Select
                            placeholder="Kategoriya"
                            style={{ minWidth: '150px' }}
                            value={query.category_id || undefined}
                            onChange={(val) => updateQuery('category_id', val)}
                            allowClear
                        >
                            {childCategory && childCategory.map((cat) => (
                                <Select.Option key={cat.id} value={String(cat.id)}>
                                    {cat.title}
                                </Select.Option>
                            ))}
                        </Select>
                    )}

                    {/* Yangi parent category select */}
                    <Select
                        placeholder="Parent Category"
                        style={{ minWidth: '180px' }}
                        value={selectedParentCategory || undefined}
                        onChange={onParentCategoryChange}
                        allowClear
                    >
                        {parentCategory && parentCategory.map((cat) => (
                            <Select.Option key={cat.id} value={String(cat.id)}>
                                {cat.title}
                            </Select.Option>
                        ))}
                    </Select>
                </Space>
            </div>
        </div>
    );
};

export default ServicesFilterSection;
