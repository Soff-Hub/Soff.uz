import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { F_SEARCH_OPTIONS } from '~/shared/api/end-points';
import useDebounce from '~/shared/hooks/useDebounce';
import axiosInstance from '~/shared/api/freeleanceApi';
import { useRouter } from 'next/router';
import styles from '../styles/freelanceSearchInput.module.scss';
import dynamic from 'next/dynamic';
import { Input } from 'antd';

const AutoComplete = dynamic(() => import('antd/es/auto-complete'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

function FreelancerSearchInput() {
    const { t } = useTranslation('freelancers');
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
        const newQueries = router.query;

        delete newQueries.position;
        delete newQueries.direction;

        router.push({
            pathname: router.pathname,
            query: { ...newQueries, keyword: search },
        });
    };

    return (
        <div className={styles.searchBox}>
            <Input
                allowClear
                variant="borderless"
                className={styles.input}
                placeholder={t('search.placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%' }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />

            <span className={styles.searchIcon} onClick={handleSearch}>
                <SearchOutlined />
            </span>
        </div>
    );
}

export default FreelancerSearchInput;
