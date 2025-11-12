import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { F_SEARCH_OPTIONS } from '~/shared/api/end-points';
import useDebounce from '~/shared/hooks/useDebounce';
import axiosInstance from '~/shared/api/freeleanceApi';
import { useRouter } from 'next/router';
import styles from '../styles/freelanceSearchInput.module.scss';
import dynamic from 'next/dynamic';

const AutoComplete = dynamic(() => import('antd/es/auto-complete'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

function FreelancerSearchInput() {
    const axios = axiosInstance();
    const [search, setSearch] = useState('');
    const router = useRouter();
    const debounceSearch = useDebounce(search, 500);
    const { data: freelanceData, isSuccess: freelanceSuccess } = useQuery({
        queryKey: ['freelanceData', debounceSearch],
        queryFn: async () => {
            const { data } = await axios.get(
                `${F_SEARCH_OPTIONS}${debounceSearch}`
            );
            return data;
        },
    });

    const options = freelanceSuccess
        ? freelanceData?.position?.map((item) => ({ value: item }))
        : [];

    const handleSearch = () => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, keyword: search },
        });
    };

    return (
        <div className={styles.searchBox}>
            <AutoComplete
                value={search}
                style={{ width: '100%' }}
                placeholder={'Qaysi turdagi mutaxassislar qidirmoqdasiz?'}
                onChange={(val) => setSearch(val)}
                options={options}>
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
    );
}

export default FreelancerSearchInput;
