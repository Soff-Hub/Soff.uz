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
        enabled: type === 'mahsulotlar',
        cacheTime: 10000,
        retry: 1,
    });

    const { data: freelanceData, isSuccess: freelanceSuccess } = useQuery({
        queryKey: ["freelanceData", debounceSearch],
        queryFn: async () => {
            const { data } = await axios.get(`customer/search-page?search=${debounceSearch}`)
            return data
        },
        enabled: type !== 'mahsulotlar',
        cacheTime: 10000,
        retry: 1,
    })

    const getOptions = () => {
        if (type === 'mahsulotlar') {
            return isSuccess ? data?.map(item => ({ value: item })) : [];
        } else if (type === "mutaxasislar") {
            return freelanceSuccess ? freelanceData?.position?.map(item => ({ value: item })) : [];
        } else if (type == "xizmatlar") {
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

            {/* <div className={styles.heroCardSection}>
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
            </div> */}

            <div className={styles.heroCategorySection}>
                {/* Chap blok – Tayyor mahsulotlar */}
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
                        <div onClick={() => push('/scientific-resources/all')} className={styles.categoryItem}>
                            <img src="/static/img/HomePage/file3.webp" alt="Ilmiy ishlar" />
                            <span>Ilmiy ishlar</span>
                        </div>
                        <div onClick={() => push('/3d-models-and-interior-designs/all')} className={styles.categoryItem}>
                            <img src="/static/img/HomePage/3d2.webp" alt="3D Modellar" />
                            <span>3D Modellar</span>
                        </div>
                        <div onClick={() => push('/design-developments/all')} className={styles.categoryItem}>
                            <img src="/static/img/HomePage/design1.webp" alt="Dizayn shablonlari" />
                            <span>Dizayn shablonlari</span>
                        </div>
                        <div onClick={() => push('/websites/all')} className={styles.categoryItem}>
                            <img src="/static/img/HomePage/web2.webp" alt="Veb saytlar" />
                            <span>Veb saytlar</span>
                        </div>
                        <div onClick={() => push('/templates/all')} className={styles.categoryItem}>
                            <img src="/static/img/HomePage/template2.webp" alt="Shablonlar" />
                            <span>Shablonlar</span>
                        </div>
                        <div onClick={() => push('/video-lessons/all')} className={styles.categoryItem}>
                            <img src="/static/img/HomePage/video1.webp" alt="Video darsliklar" />
                            <span>Video darsliklar</span>
                        </div>
                    </div>
                </div>

                <div className={styles.categoryBlock}>
                    <h3>Xizmatni tanlang – Buyurtma bering</h3>
                    <div className={styles.categoryGrid}>
                        <div onClick={() => push('/orders?direction=scientific_work')} className={styles.categoryItem}>
                            <img src="/static/img/HomePage/file2.webp" alt="Ilmiy va Akademik xizmatlar" />
                            <span>Ilmiy va Akademik Xizmatlar</span>
                        </div>
                        <div onClick={() => push('/orders?direction=dizayn')} className={styles.categoryItem}>
                            <img src="/static/img/HomePage/design3.webp" alt="Dizayn xizmatlari" />
                            <span>Dizayn xizmatlari</span>
                        </div>
                        <div onClick={() => push('/orders?direction=web')} className={styles.categoryItem}>
                            <img src="/static/img/HomePage/web.webp" alt="Dasturlash xizmatlari" />
                            <span>Dasturlash xizmatlari</span>
                        </div>
                        <div onClick={() => push('/orders?direction=three_d')} className={styles.categoryItem}>
                            <img src="/static/img/HomePage/3d.webp" alt="3D Dizayn va Vizualizatsiya" />
                            <span>3D Dizayn va Vizualizatsiya</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Hero;
