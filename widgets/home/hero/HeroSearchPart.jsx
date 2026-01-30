import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import styles from './style.module.scss';
import useSearch from '~/shared/hooks/useSearch';
import { FaBriefcase } from 'react-icons/fa6';
import { FaDownload } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa6';
import SearchController from '~/shared/components/search-result/SearchController';

const placeholders = {
    mahsulotlar: 'Qaysi turdagi tayyor mahsulot qidirmoqdasiz?',
    xizmatlar: 'Qaysi turdagi  xizmat  qidirmoqdasiz?',
    mutaxasislar: 'Qaysi turdagi mutaxassislar qidirmoqdasiz?',
};

function HeroSearchPart() {
    const searchProps = useSearch();
    const { search, type, setType, handleSearch, isNavigating } = searchProps;

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
                    <FaDownload />
                    Mahsulotlar
                </span>
                <span
                    onClick={() => setType('xizmatlar')}
                    className={
                        type === 'xizmatlar'
                            ? styles.activeHeroBtn
                            : styles.heroBtn
                    }>
                    <FaBriefcase /> Xizmatlar
                </span>
                <span
                    onClick={() => setType('mutaxasislar')}
                    className={
                        type === 'mutaxasislar'
                            ? styles.activeHeroBtn
                            : styles.heroBtn
                    }>
                    <FaUsers />
                    Mutaxasislar
                </span>
            </div>
            <SearchController
                searchOption={'navigation'}
                searchProps={searchProps}
                styles={{
                    wrapper: {
                        maxWidth: '600px',
                    },
                }}>
                {(
                    inputRef,
                    { handleInputChange, handleInputFocus, handleInputBlur }
                ) => (
                    <div className={styles.searchBox}>
                        <Input
                            ref={inputRef}
                            disabled={isNavigating}
                            size="large"
                            value={search}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            placeholder={placeholders[type]}
                            className={styles.input}
                            variant="borderless"
                            allowClear
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />

                        <span
                            disabled={isNavigating}
                            className={styles.searchIcon}
                            onClick={handleSearch}>
                            <SearchOutlined />
                        </span>
                    </div>
                )}
            </SearchController>
        </div>
    );
}

export default HeroSearchPart;
