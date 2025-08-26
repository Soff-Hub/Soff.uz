import { SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import styles from '../styles/hero.module.scss';
import HeroCard from '../ui/HeroCard';
import { useRouter } from 'next/router';
import useResponsive from '~/utilities/useResponsive';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete } from 'antd';
import { api, apiForFreelance } from '~/repositories/api';

const option = {
    mahsulotlar: [
        { value: '3D Models Details' },
        { value: 'UI Kit Figma' },
        { value: 'React Components Pack' },
        { value: 'E-commerce Template' },
        { value: 'Mobile App UI' },
        { value: 'Illustrations Pack' },
        { value: 'Business Card Template' },
        { value: 'Landing Page Design' },
        { value: 'WordPress Theme' },
        { value: 'Dashboard Template' },
    ],
    xizmatlar: [
        { value: 'Web Development' },
        { value: 'Mobile App Development' },
        { value: 'UI/UX Design' },
        { value: 'SEO Optimization' },
        { value: 'Logo Design' },
        { value: 'Translation Service' },
        { value: 'Video Editing' },
        { value: 'Copywriting' },
        { value: '3D Modeling' },
        { value: 'Digital Marketing' },
    ],
    mutaxasislar: [
        { value: 'Frontend Developer' },
        { value: 'Backend Developer' },
        { value: 'Fullstack Developer' },
        { value: 'UI/UX Designer' },
        { value: 'Project Manager' },
        { value: 'QA Engineer' },
        { value: 'Data Scientist' },
        { value: 'DevOps Engineer' },
        { value: 'Content Writer' },
        { value: '3D Artist' },
    ],
};


const placeholders = {
    mahsulotlar: 'Qaysi turdagi tayyor mahsulot qidirmoqdasiz?',
    xizmatlar: 'Qaysi turdagi xizmar qidirmoqdasiz?',
    mutaxasislar: 'Qaysi turdagi tayyor mutaxassis qidirmoqdasiz?',
};

const Hero = () => {
    const { push } = useRouter();
    const [type, setType] = useState('mahsulotlar');
    const [search, setSearch] = useState('');
    const [options, setOptions] = useState(option);
    useState;
    const { isMobile } = useResponsive();

    const { data, status, isSuccess } = useQuery({
        queryKey: ['searchResults'],
        queryFn: async () => {
            const mahsulotlar = await api.get('doc-search/');

            return {
                products: mahsulotlar.data,
            };
        },

        cacheTime: 10000,
        refetchOnMount: true,
        retry: 1,
    });

    // if (isSuccess && status === 'success') {
    //     setOptions({
    //         mahsulotlar: data.products.map(item => ({ value: item })),
    //     });
    //     console.log(options);
    // }

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
                            <i className="fa-solid fa-download"></i>
                            Mahsulotlar
                        </span>
                        <span
                            onClick={() => setType('xizmatlar')}
                            className={
                                type == 'xizmatlar'
                                    ? styles.activeHeroBtn
                                    : styles.heroBtn
                            }>
                            <i className="fa-solid fa-briefcase"></i> Xizmatlar
                        </span>
                        <span
                            onClick={() => setType('mutaxasislar')}
                            className={
                                type == 'mutaxasislar'
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
                            options={option[type]}>
                            <input
                                className={styles.input}
                                style={{ width: '100%' }}
                            />
                        </AutoComplete>
                        <span className={styles.searchIcon}>
                            <SearchOutlined />
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.heroCardSection}>
                <div className={styles.cardWrapperOne}>
                    <HeroCard
                        title={'Dizayn'}
                        link="/orders?direction=dizayn"
                        img={'/static/img/land-design.svg'}
                    />
                    <HeroCard
                        title={'Dasturlash'}
                        link={'/orders?direction=web'}
                        img={'/static/img/land-dev.svg'}
                    />
                </div>
                <div className={styles.cardWrapperTwo}>
                    <HeroCard
                        title={'Ilmiy ishlar'}
                        link={'/orders?direction=scientific_work'}
                        img={'/static/img/land-file.svg'}
                    />
                    <HeroCard
                        title={'3D Modellar'}
                        link={'/orders?direction=three_d'}
                        img={'/static/img/land-3d.svg'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
