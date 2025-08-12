import { Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ServicesFilterSection = ({ count }) => {
    const router = useRouter();
    const { query } = router;

    const [searchValue, setSearchValue] = useState(query.search || '');

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
        }, 1000); // 0.5 soniya kutadi

        return () => clearTimeout(delay);
    }, [searchValue]);

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

                    {/* Kategoriya */}
                    <Select
                        placeholder="Kategoriya"
                        style={{ minWidth: '150px' }}
                        defaultValue={query.category_id}
                        onChange={(val) => updateQuery('category_id', val)}
                        allowClear
                    >
                        <Select.Option value="1">Design</Select.Option>
                        <Select.Option value="2">Video</Select.Option>
                    </Select>
                </Space>
            </div>
        </div>
    );
};

export default ServicesFilterSection;
