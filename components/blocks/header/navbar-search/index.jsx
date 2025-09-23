import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete, Select, Input } from 'antd';
import { api } from '~/repositories/api';
import useDebounce from '~/shared/hooks/useDebounce';
import styles from './style.module.scss';
import axiosInstance from '~/shared/api/freeleanceApi';

const { Option } = Select;

const NavbarSearch = () => {
    const { push } = useRouter();
    const [popupWidth, setPopupWidth] = useState(300);
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


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 320) {
                setPopupWidth(260);
            } else if (window.innerWidth <= 420) {
                setPopupWidth(300);
            } else {
                setPopupWidth(350); // katta ekran uchun
            }
        };

        handleResize(); // birinchi yuklanganda ishga tushadi
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="container">
            <div className={styles.searchBox}>
                <div className="d-flex">
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
