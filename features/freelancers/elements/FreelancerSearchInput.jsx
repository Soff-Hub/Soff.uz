import React, { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import styles from '../styles/freelanceSearchInput.module.scss';
import { Input } from 'antd';
import useSearch from '~/shared/hooks/useSearch';
import SearchController from '~/shared/components/search-result/SearchController';

function FreelancerSearchInput() {
    const searchProps = useSearch();
    const { search, setSearch } = searchProps;
    const { query, push, isReady } = useRouter();

    useEffect(() => {
        if (!isReady) return;

        setSearch(query.search || '');
    }, [isReady]);

    const handleSearch = (search) => {
        push({
            pathname: query.pathname,
            query: { ...query, search },
        });
    };

    return (
        <SearchController
            searchOption="selection"
            categoryType="mutaxasislar"
            styles={{
                wrapper: {
                    maxWidth: '600px',
                    margin: '0 auto',
                },
            }}
            classnames={{
                wrapper: styles.searchBoxWrapper,
            }}
            searchProps={{
                ...searchProps,
                handleClickOption: handleSearch,
            }}>
            {(
                inputRef,
                {
                    handleInputChange,
                    handleInputFocus,
                    handleInputBlur,
                    handleStoreSearchValue,
                    handleClose,
                }
            ) => (
                <div className={styles.searchBox}>
                    <Input
                        ref={inputRef}
                        allowClear
                        variant="borderless"
                        className={styles.input}
                        placeholder={
                            'Qaysi turdagi mutaxassislar qidirmoqdasiz?'
                        }
                        value={search}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        style={{ width: '100%' }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(search);
                                handleStoreSearchValue(search);
                                handleClose();
                            }
                        }}
                    />

                    <span
                        className={styles.searchIcon}
                        onClick={() => {
                            handleSearch(search);
                            handleStoreSearchValue(search);
                            handleClose();
                        }}>
                        <SearchOutlined />
                    </span>
                </div>
            )}
        </SearchController>
    );
}

export default FreelancerSearchInput;
