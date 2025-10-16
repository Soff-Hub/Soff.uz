import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from './style.module.scss';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete } from 'antd';
import { api } from '~/repositories/api';
import useDebounce from '~/shared/hooks/useDebounce';
import Link from 'next/link';
import axiosInstance from '~/shared/api/freeleanceApi';
import { D_SEARCH_OPTIONS, F_SEARCH_OPTIONS } from '~/shared/api/end-points';

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

const Hero = () => {
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

                        <span
                            className={styles.searchIcon}
                            onClick={handleSearch}>
                            <SearchOutlined />
                        </span>
                    </div>
                </div>

                <div
                    style={{ backgroundColor: 'transparent' }}
                    className={styles.heroCategorySection}>
                    <div className={styles.categoryBlock}>
                        <div className={styles.titleWrapper}>
                            <img
                                src="/static/img/star.svg"
                                alt="badge"
                                className={styles.badge}
                            />
                            <h3>Tayyor yuklangan mahsulotlar</h3>
                        </div>
                        <div className={styles.categoryGrid}>
                            <Link href="/scientific-resources/all">
                                <div className={styles.categoryItem}>
                                    <img
                                        src="/static/img/HomePage/file3.webp"
                                        alt="Ilmiy ishlar"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <span>Ilmiy ishlar</span>
                                </div>
                            </Link>
                            <Link href="/3d-models-and-interior-designs/all">
                                <div className={styles.categoryItem}>
                                    <img
                                        src="/static/img/HomePage/3d2.webp"
                                        alt="3D Modellar"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <span>3D Modellar</span>
                                </div>
                            </Link>
                            <Link href="/design-developments/all">
                                <div className={styles.categoryItem}>
                                    <img
                                        src="/static/img/HomePage/design1.webp"
                                        alt="Dizayn shablonlari"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <span>Dizayn shablonlari</span>
                                </div>
                            </Link>
                            <Link href="/websites/all">
                                <div className={styles.categoryItem}>
                                    <img
                                        src="/static/img/HomePage/web2.webp"
                                        alt="Veb saytlar"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <span>Veb saytlar</span>
                                </div>
                            </Link>
                            <Link href="/templates/all">
                                <div className={styles.categoryItem}>
                                    <img
                                        src="/static/img/HomePage/template2.webp"
                                        alt="Shablonlar"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <span>Shablonlar</span>
                                </div>
                            </Link>
                            <Link href="/video-lessons/all">
                                <div className={styles.categoryItem}>
                                    <img
                                        src="/static/img/HomePage/video1.webp"
                                        alt="Video darsliklar"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <span>Video darsliklar</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.categoryBlock}>
                        <h3>Xizmatni tanlang – Buyurtma bering</h3>
                        <div className={styles.categoryGrid}>
                            <Link href="/orders?direction=scientific_work">
                                <div className={styles.categoryItem}>
                                    <img
                                        src="/static/img/HomePage/file2.webp"
                                        alt="Ilmiy va Akademik xizmatlar"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <span>Ilmiy va Akademik Xizmatlar</span>
                                </div>
                            </Link>
                            <Link href="/orders?direction=dizayn">
                                <div className={styles.categoryItem}>
                                    <img
                                        src="/static/img/HomePage/design3.webp"
                                        alt="Dizayn xizmatlari"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <span>Dizayn xizmatlari</span>
                                </div>
                            </Link>
                            <Link href="/orders?direction=web">
                                <div className={styles.categoryItem}>
                                    <img
                                        src="/static/img/HomePage/web3.webp"
                                        alt="Dasturlash xizmatlari"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <span>Dasturlash xizmatlari</span>
                                </div>
                            </Link>
                            <Link href="/orders?direction=three_d">
                                <div className={styles.categoryItem}>
                                    <img
                                        src="/static/img/HomePage/3d.webp"
                                        alt="3D Dizayn va Vizualizatsiya"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <span>3D Dizayn va Vizualizatsiya</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
