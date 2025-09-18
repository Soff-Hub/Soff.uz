import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete, Select } from 'antd';
import { api } from '~/repositories/api';
import useDebounce from '~/hooks/useDebounce';
import styles from './style.module.scss';
import axiosInstance from '~/components/freeleance/api/freeleanceApi';

const { Option } = Select;

const placeholders = {
    mahsulotlar: 'Qaysi turdagi tayyor mahsulot qidirmoqdasiz?',
    xizmatlar: 'Qaysi turdagi xizmat qidirmoqdasiz?',
    mutaxasislar: 'Qaysi turdagi mutaxassis qidirmoqdasiz?',
};

const staticOptions = {
    xizmatlar: [
        { value: 'Web Dasturlash' },
        { value: 'Mobile App Dasturlash' },
        { value: 'UI/UX Dizayn' },
        { value: 'SEO Optimization' },
        { value: 'Logo Dizayn' },
    ],
    mutaxasislar: [
        { value: 'Frontend Dasturchi' },
        { value: 'Backend Dasturchi' },
        { value: 'Fullstack Dasturchi' },
        { value: 'UI/UX Designer' },
        { value: 'Project Manager' },
    ],
};

const NavbarSearch = () => {
    const { push } = useRouter();
    const [type, setType] = useState('mahsulotlar');
    const [search, setSearch] = useState('');
    const axios = axiosInstance();

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
        queryKey: ["freelanceData", debounceSearch, type],
        queryFn: async () => {
            const { data } = await axios.get(`customer/search-page?search=${debounceSearch}`);
            return data;
        },
        enabled: type !== 'mahsulotlar',
        cacheTime: 10000,
        retry: 1,
    });

    const getOptions = () => {
        if (type === 'mahsulotlar') {
            return isSuccess ? data?.map(item => ({ value: item })) : [];
        } else if (type === "mutaxasislar") {
            return freelanceSuccess ? freelanceData?.position?.map(item => ({ value: item })) : [];
        } else if (type === "xizmatlar") {
            return freelanceSuccess ? freelanceData?.services?.map(item => ({ value: item })) : [];
        }
        return staticOptions[type] || [];
    };

    const handleSearch = () => {
        if (!search) return;
        if (type === 'mahsulotlar') {
            push(`/search-page/?keyword=${search}`);
        } else if (type === 'xizmatlar') {
            push(`/search-page/?keyword=${search}&tab=2`);
        } else if (type === 'mutaxasislar') {
            push(`/search-page/?keyword=${search}&tab=3`);
        }
    };

    return (
        <div className='container'>
            <div className={styles.searchBox}>
                {/* Select qo‘shdik */}
                <div className='d-flex'>
                    <Select
                        value={type}
                        onChange={(val) => setType(val)}
                        className={styles.select}
                        bordered={false}
                    >
                        <Option value="mahsulotlar">Mahsulotlar</Option>
                        <Option value="xizmatlar">Xizmatlar</Option>
                        <Option value="mutaxasislar">Mutaxassislar</Option>
                    </Select>
                    <AutoComplete
                        value={search}
                        // style={{ flex: 1 }}
                        placeholder={'Izlash...'}
                        onChange={val => setSearch(val)}
                        options={getOptions()}
                    >
                        <input
                            className={styles.input}
                            style={{ width: '100%' }}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />
                    </AutoComplete>

                </div>
                    <span
                        className={styles.searchIcon}
                        onClick={handleSearch}
                    >
                        <SearchOutlined />
                    </span>
            </div>
        </div>
    );
};

export default NavbarSearch;
