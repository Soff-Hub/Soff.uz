import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import dynamic from 'next/dynamic';
import useSearch from '~/shared/hooks/useSearch';

const AutoComplete = dynamic(() => import('antd/es/auto-complete'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const placeholders = {
    mahsulotlar: 'Qaysi turdagi tayyor mahsulot qidirmoqdasiz?',
    xizmatlar: 'Qaysi turdagi  xizmat  qidirmoqdasiz?',
    mutaxasislar: 'Qaysi turdagi mutaxassislar qidirmoqdasiz?',
};

function HeroSearchPart() {
    const { options, search, setSearch, type, setType, handleSearch } =
        useSearch();

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
        </div>
    );
}

export default HeroSearchPart;
