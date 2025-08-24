import { SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import styles from '../styles/hero.module.scss';
import HeroCard from '../ui/HeroCard';
import { useRouter } from 'next/router';
import useResponsive from '~/utilities/useResponsive';

const cards = [
    { title: 'Dizayn', img: '/static/img/HomePage/pen-tool-1.png' },
    { title: 'Ilmiy ishlar', img: '/static/img/HomePage/Main Photo.png' },
    { title: 'Dasturlash', img: '/static/img/HomePage/code.png' },
    { title: '3D modellar', img: '/static/img/HomePage/Cube.png' },
];

const Hero = () => {
    const { push } = useRouter();
    const [type, setType] = useState('mahsulotlar');
    const [search, setSearch] = useState('');
    const { isMobile } = useResponsive();

    // searchni debounce bilan ishlatamiz
    useEffect(() => {
        if (search.trim().length === 0) return;

        const timeout = setTimeout(() => {
            if (type === 'mahsulotlar') {
                push(
                    `/search-page?keyword=${search}&type=all&tab=products&page=1`
                );
            } else {
                push(`/orders/?direction=scientific_work&search=${search}`);
            }
        }, 500); // 0.5s ichida yozmasa qidiruv

        return () => clearTimeout(timeout); // cleanup
    }, [search, type, push]);

    return (
        <div className={styles.heroMainBlock} gutter={32}>
            <div className={styles.heroInfoSection}>
                <h1 className={styles.heroTitle}>
                    Raqamli mahsulotlar va onlayn xizmatlar bozori
                </h1>
                <p className={styles.heroParagraph}>
                    Bizning mutaxassislar va sotuvchilar sizga kerakli tayyor
                    raqamli mahsulot yoki xizmatni tez va sifatli taqdim etadi.
                </p>
                <div className={styles.heroButtons}>
                    <div className="d-flex align-items-center gap-3 mb-3">
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
                    </div>

                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            placeholder={
                                type === 'mahsulotlar'
                                    ? 'Qanday mahsulot izlamoqdasiz?'
                                    : 'Qanday xizmat kerak?'
                            }
                            className={styles.input}
                            value={search}
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
                        img={'/static/img/land-design.png'}
                    />
                    <HeroCard
                        title={'Dasturlash'}
                        img={'/static/img/land-dev.png'}
                    />
                </div>
                <div className={styles.cardWrapperTwo}>
                    <HeroCard
                        title={'Ilmiy ishlar'}
                        img={'/static/img/land-file.png'}
                    />
                    <HeroCard
                        title={'3D Modellar'}
                        img={'/static/img/land-3d.png'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
