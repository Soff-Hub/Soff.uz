import { SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import styles from '../styles/hero.module.scss';
import HeroCard from '../ui/HeroCard';
import { useRouter } from 'next/router';
import useResponsive from '~/utilities/useResponsive';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete } from 'antd';
import { api, apiForFreelance } from '~/repositories/api';

const Hero = () => {
    const { push } = useRouter();
    const [type, setType] = useState('mahsulotlar');
    const [search, setSearch] = useState('');
    const { isMobile } = useResponsive();

    const { data } = useQuery({
        queryKey: ['searchResults'],
        queryFn: async () => {
            const [mahsulotlar, serviceUsers] = await Promise.all([
                api.get('doc-search/'),
                apiForFreelance.get('customer/search-page'),
            ]);

            return {
                products: mahsulotlar.data,
                freelancers: serviceUsers.data.position,
                services: serviceUsers.data.services,
            };
        },
        cacheTime: 10000,
        refetchOnMount: true,
    });

    // useEffect(() => {
    //     if (search.trim().length === 0) return;

    //     const timeout = setTimeout(() => {
    //         if (type === 'mahsulotlar') {
    //             push(`/search-page?keyword=${search}&tab=1&page=1`);
    //         } else if (type === 'mutaxasislar') {
    //             push(`/search-page?keyword=${search}&tab=3`);
    //         } else {
    //             push(`/search-page?keyword=${search}&tab=2`);
    //         }
    //     }, 500); // 0.5s ichida yozmasa qidiruv

    //     return () => clearTimeout(timeout); // cleanup
    // }, []);

    const placeholders = {
        mahsulotlar: 'Qanday mahsulot izlamoqdasiz?',
        xizmatlar: 'Qanday xizmat kerak?',
        mutaxasislar: 'Qanday mutaxasis kerak?',
    };
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.key === 'Enter' && search !== '') {
                if (type === 'mahsulotlar') {
                    push(`/search-page?keyword=${search}&tab=1&page=1`);
                } else if (type === 'mutaxasislar') {
                    push(`/search-page?keyword=${search}&tab=3`);
                } else {
                    push(`/search-page?keyword=${search}&tab=2`);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [search, type, push]);
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
                            <i class="fa-solid fa-download"></i>
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
                            <i class="fa-solid fa-users"></i> Mutaxasislar
                        </span>
                    </div>

                    <div className={styles.searchBox}>
                        <input
                            className={styles.input}
                            value={search}
                            placeholder={placeholders[type]}
                            onChange={e => setSearch(e.target.value)}
                        />
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
