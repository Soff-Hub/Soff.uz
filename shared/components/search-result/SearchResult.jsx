import React from 'react';
import { MdOutlineAccessTime } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { IoSearch } from 'react-icons/io5';
import { Button, Skeleton } from 'antd';
import useHistorySearch from '~/shared/hooks/useHistorySearch';
import { highlightMatch } from '~/shared/utilities/utils';
import Link from 'next/link';
import styles from './search-result.module.scss';
import { EmptyTab } from '~/widgets/header/HeaderCategories';

function SearchResult({
    debouncedSearch,
    handleClickOption,
    options,
    isLoading,
}) {
    const {
        searchHistory,
        clearHistoryItem,
        deleteHistoryItem,
        isLoading: isHistoryLoading,
    } = useHistorySearch(debouncedSearch);
    let historyOptions = null;

    if (!isHistoryLoading && searchHistory.length) {
        historyOptions = (
            <div
                style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    marginBottom: '15px',
                }}>
                <div className={styles.searchHistoryHeader}>
                    <h4>Yaqinda izlangan natijalar</h4>
                    <Button
                        variant="text"
                        color="danger"
                        onClick={clearHistoryItem}
                        size="small">
                        Tozalash
                    </Button>
                </div>
                {searchHistory.map((item) => (
                    <Link
                        key={item.value}
                        href={
                            item.type === 'mahsulotlar'
                                ? `/search-page/?keyword=${item.value}&tab=1&type=file`
                                : item.type === 'xizmatlar'
                                ? `/search-page/?keyword=${item.value}&tab=2&type=all`
                                : `/search-page/?keyword=${item.value}&tab=3&type=all`
                        }>
                        <a>
                            <div className={styles.searchOption}>
                                <MdOutlineAccessTime
                                    className={styles.searchOptionIcon}
                                />
                                <span>
                                    {highlightMatch(
                                        item.value,
                                        debouncedSearch
                                    )}
                                </span>
                                <Button
                                    type="text"
                                    className={styles.deleteHistoryBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        deleteHistoryItem(item);
                                    }}
                                    icon={<IoClose fontSize={18} />}
                                    size="small"
                                    style={{ marginLeft: 'auto' }}
                                />
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        );
    }

    let filteredDataOptions = null;
    if (isLoading) {
        filteredDataOptions = Array(10)
            .fill(null)
            .map((_, i) => (
                <Skeleton
                    key={i}
                    active
                    className="Search_Results_Wrap_skeleton"
                    style={{
                        width: '100% !important',
                        padding: '10px 10px 10px 0',
                    }}
                />
            ));
    } else if (options.length) {
        filteredDataOptions = (
            <div
                style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                }}>
                {options.map((option) => (
                    <div
                        key={option.key}
                        className={styles.searchOption}
                        onClick={() => handleClickOption(option.value)}
                        style={{ cursor: 'pointer' }}>
                        <IoSearch className={styles.searchOptionIcon} />
                        {highlightMatch(option.value, debouncedSearch)}
                    </div>
                ))}
            </div>
        );
    } else {
        filteredDataOptions = (
            <EmptyTab description="So'rov bo'yicha ma'lumotlar topilmadi" />
        );
    }

    return (
        <>
            {historyOptions}
            {filteredDataOptions}
        </>
    );
}

export default SearchResult;
