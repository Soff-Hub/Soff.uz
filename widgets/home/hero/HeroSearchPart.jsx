import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import styles from './style.module.scss';
import { api } from '~/repositories/api';
import useDebounce from '~/shared/hooks/useDebounce';
import axiosInstance from '~/shared/api/freeleanceApi';
import { D_SEARCH_OPTIONS, F_SEARCH_OPTIONS } from '~/shared/api/end-points';
import dynamic from 'next/dynamic';

const AutoComplete = dynamic(() => import('antd/es/auto-complete'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const placeholders = {
    mahsulotlar: 'Qaysi turdagi tayyor mahsulot qidirmoqdasiz?',
    xizmatlar: 'Qaysi turdagi  xizmat  qidirmoqdasiz?',
    mutaxasislar: 'Qaysi turdagi mutaxassislar qidirmoqdasiz?',
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

function HeroSearchPart() {
    const { push } = useRouter();
    const [type, setType] = useState('mahsulotlar');
    const [search, setSearch] = useState('');
    const axios = axiosInstance();

    const debounceSearch = useDebounce(search, 500);

    const { data, isSuccess } = useQuery({
        queryKey: ['searchResults', debounceSearch],
        queryFn: async () => {
            const { data } = await api.get(
                `${D_SEARCH_OPTIONS}${debounceSearch}`
            );
            return data;
        },
        enabled: type === 'mahsulotlar',
        cacheTime: 10000,
        retry: 1,
    });

    const { data: freelanceData, isSuccess: freelanceSuccess } = useQuery({
        queryKey: ['freelanceData', debounceSearch],
        queryFn: async () => {
            const { data } = await axios.get(
                `${F_SEARCH_OPTIONS}${debounceSearch}`
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
        } else if (type == 'xizmatlar') {
            return freelanceSuccess
                ? freelanceData?.services?.map((item) => ({ value: item }))
                : [];
        }
        return staticOptions[type] || [];
    };

    const handleSearch = () => {
        if (type === 'mahsulotlar') {
            push(`/search-page/?keyword=${search}&tab=1&type=file`);
        } else if (type === 'xizmatlar') {
            push(`/search-page/?keyword=${search}&tab=2&type=all`);
        } else if (type === 'mutaxasislar') {
            push(`/search-page/?keyword=${search}&tab=3&type=all`);
        }
    };

    return (
        <div className={styles.heroButtons}>
            <div className={styles.heroFilterButtons}>
                <span
                    onClick={() => setType('mahsulotlar')}
                    className={
                        type === 'mahsulotlar'
                            ? styles.activeHeroBtn
                            : styles.heroBtn
                    }>
                    <i className="fa-solid fa-download"></i> Mahsulotlar
                </span>
                <span
                    onClick={() => setType('xizmatlar')}
                    className={
                        type === 'xizmatlar'
                            ? styles.activeHeroBtn
                            : styles.heroBtn
                    }>
                    <i className="fa-solid fa-briefcase"></i> Xizmatlar
                </span>
                <span
                    onClick={() => setType('mutaxasislar')}
                    className={
                        type === 'mutaxasislar'
                            ? styles.activeHeroBtn
                            : styles.heroBtn
                    }>
                    <i className="fa-solid fa-users"></i> Mutaxasislar
                </span>
            </div>

            <div className={styles.searchBox}>
                <AutoComplete
                    value={search}
                    style={{ width: '100%' }}
                    placeholder={placeholders[type]}
                    onChange={(val) => setSearch(val)}
                    options={getOptions()}>
                    <input
                        className={styles.input}
                        style={{ width: '100%' }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                </AutoComplete>

                <span className={styles.searchIcon} onClick={handleSearch}>
                    <SearchOutlined />
                </span>
            </div>
        </div>
    );
}

export default HeroSearchPart;
