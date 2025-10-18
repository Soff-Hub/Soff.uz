import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete, Select, Input } from 'antd';
import { api } from '~/repositories/api';
import useDebounce from '~/shared/hooks/useDebounce';
import styles from './style.module.scss';
import axiosInstance from '~/shared/api/freeleanceApi';
import { useSelector } from 'react-redux';

const { Option } = Select;

const NavbarSearch = () => {
    const { push } = useRouter();
    const [type, setType] = useState('mahsulotlar');
    const [search, setSearch] = useState('');
    const axios = axiosInstance();
    const location = useRouter().pathname;
    const { showSearch } = useSelector((state) => state.ui);

    const debounceSearch = useDebounce(search, 500);

    const { data, isSuccess } = useQuery({
        queryKey: ['searchResults', debounceSearch, type],
        queryFn: async () => {
            const { data } = await api.get(
                `doc-search/?search=${debounceSearch}`
            );
            return data;
        },
        enabled: type === 'mahsulotlar',
        cacheTime: 10000,
        retry: 1,
    });

    const { data: freelanceData, isSuccess: freelanceSuccess } = useQuery({
        queryKey: ['freelanceData', debounceSearch, type],
        queryFn: async () => {
            const { data } = await axios.get(
                `customer/search-page?search=${debounceSearch}`
            );
            return data;
        },
        enabled: type !== 'mahsulotlar',
        cacheTime: 10000,
        retry: 1,
    });

    const getOptions = () => {
        if (type === 'mahsulotlar') {
            return isSuccess ? data?.map((item) => ({ value: item })) : [];
        } else if (type === 'mutaxasislar') {
            return freelanceSuccess
                ? freelanceData?.position?.map((item) => ({ value: item }))
                : [];
        } else if (type === 'xizmatlar') {
            return freelanceSuccess
                ? freelanceData?.services?.map((item) => ({ value: item }))
                : [];
        }
    };

    const handleSearch = () => {
        if (!search) return;
        if (type === 'mahsulotlar') {
            push(`/search-page/?keyword=${search}&tab=1&type=file`);
        } else if (type === 'xizmatlar') {
            push(`/search-page/?keyword=${search}&tab=2&type=all`);
        } else if (type === 'mutaxasislar') {
            push(`/search-page/?keyword=${search}&tab=3&type=all`);
        }
    };

    if (location === '/') {
        return null;
    }

    return (
        <div className="container">
            {showSearch && (
                <div className={styles.searchBox}>
                    <div className="d-flex w-100">
                        <Select
                            value={type}
                            onChange={(val) => setType(val)}
                            className={styles.select}
                            bordered={false}>
                            <Option value="mahsulotlar">Mahsulotlar</Option>
                            <Option value="xizmatlar">Xizmatlar</Option>
                            <Option value="mutaxasislar">Mutaxassislar</Option>
                        </Select>

                        <AutoComplete
                            value={search}
                            onChange={(val) => setSearch(val)}
                            options={getOptions()}
                            style={{ width: '100%' }}
                            // popupMatchSelectWidth={popupWidth}
                        >
                            <Input
                                className={styles.input}
                                placeholder={'izlash...'}
                                onPressEnter={handleSearch}
                                bordered={false}
                            />
                        </AutoComplete>
                    </div>

                    <span className={styles.searchIcon} onClick={handleSearch}>
                        <SearchOutlined />
                    </span>
                </div>
            )}
        </div>
    );
};

export default NavbarSearch;
