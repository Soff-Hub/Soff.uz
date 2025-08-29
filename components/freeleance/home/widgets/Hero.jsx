import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from '../styles/hero.module.scss';
import HeroCard from '../ui/HeroCard';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete } from 'antd';
import { api } from '~/repositories/api';
import useDebounce from '~/hooks/useDebounce';
import axiosInstance from '../../api/freeleanceApi';

const placeholders = {
    mahsulotlar: 'Qaysi turdagi tayyor mahsulot qidirmoqdasiz?',
    xizmatlar: 'Qaysi turdagi  xizmat  qidirmoqdasiz?',
    mutaxasislar: 'Qaysi turdagi tayyor mutaxassis qidirmoqdasiz?',
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

const Hero = () => {
    const { push } = useRouter();
    const [type, setType] = useState('mahsulotlar');
    const [search, setSearch] = useState('');
    const axios = axiosInstance()

    const debounceSearch = useDebounce(search, 500);

    const { data, isSuccess } = useQuery({
        queryKey: ['searchResults', debounceSearch],
        queryFn: async () => {
            const { data } = await api.get(
                `doc-search/?search=${debounceSearch}`
            );
            return data;
        },
        enabled: type === 'mahsulotlar' && debounceSearch.length > 0,
        cacheTime: 10000,
        retry: 1,
    });

    const { data: freelanceData, isSuccess: freelanceSuccess } = useQuery({
        queryKey: ["freelanceData", debounceSearch],
        queryFn: async () => {
            const { data } = await axios.get(`customer/search-page?search=${debounceSearch}`)
            return data
        },
        enabled: type !== 'mahsulotlar' && debounceSearch.length > 0,
        cacheTime: 10000,
        retry: 1,
    })

    const getOptions = () => {
        if (type === 'mahsulotlar') {
            return isSuccess ? data?.map(item => ({ value: item })) : [];
        }else if(type === "mutaxasislar") {
            return freelanceSuccess ? freelanceData?.position?.map(item => ({ value: item })) : [];
        }else if(type == "xizmatlar"){
            return freelanceSuccess ? freelanceData?.services?.map(item => ({ value: item })) : [];
        }
        return staticOptions[type] || [];
    };

    const handleSearch = () => {
        if (type === 'mahsulotlar') {
            push(`/search-page/?keyword=${search}`);
        } else if (type === 'xizmatlar') {
            push(`/search-page/?keyword=${search}&tab=2`);
        } else if (type === 'mutaxasislar') {
            push(`/search-page/?keyword=${search}&tab=3`);
        }
    };

    return (
        <div className={styles.heroMainBlock}>
            <div className={styles.heroInfoSection}>
                <h1 className={styles.heroTitle}>
                    Raqamli mahsulotlar va onlayn xizmatlar bozori
                </h1>
                <p className={styles.heroParagraph}>
                    Bizning mutaxassislar va sotuvchilar sizga kerakli tayyor
                    raqamli mahsulot yoki xizmatni tez va sifatli taqdim etadi.
                </p>

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
                            onChange={val => setSearch(val)}
                            options={getOptions()}>
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

                        <span
                            className={styles.searchIcon}
                            onClick={handleSearch}>
                            <SearchOutlined />
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.heroCardSection}>
                <div className={styles.cardWrapperOne}>
                    <HeroCard
                        title="Dizayn"
                        link="/orders?direction=dizayn"
                        img="/static/img/HomePage/design.webp"
                    />
                    <HeroCard
                        title="Dasturlash"
                        link="/orders?direction=web"
                        img="/static/img/HomePage/web.webp"
                    />
                </div>
                <div className={styles.cardWrapperTwo}>
                    <HeroCard
                        title="Ilmiy ishlar"
                        link="/orders?direction=scientific_work"
                        img="/static/img/HomePage/file.webp"
                    />
                    <HeroCard
                        title="3D Modellar"
                        link="/orders?direction=three_d"
                        img="/static/img/HomePage/3d.webp"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
