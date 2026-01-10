import React from 'react';
import Link from 'next/link';
import { Button, Skeleton, Spin } from 'antd';
import { MdOutlineAccessTime } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { IoSearch } from 'react-icons/io5';
import useHistorySearch from '~/shared/hooks/useHistorySearch';
import { highlightMatch } from '~/shared/utilities/utils';
import { EmptyTab } from '~/widgets/header/HeaderCategories';
import styles from './search-result.module.scss';

function SearchResult({
    debouncedSearch,
    handleClickOption,
    options,
    isLoading,
    isNavigating,
    setIsNavigating,
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
            <div className={styles.historyContainer}>
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
                        <a onClick={() => setIsNavigating(true)}>
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
                <Skeleton key={i} active className={styles.skeletonItem} />
            ));
    } else if (options.length) {
        filteredDataOptions = (
            <div className={styles.optionsContainer}>
                {options.map((option) => (
                    <div
                        key={option.key}
                        className={styles.searchOption}
                        onClick={() => handleClickOption(option.value)}>
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
        <div className={styles.container}>
            <div
                className={styles.loadingOverlay}
                style={{
                    height: isNavigating ? '300px' : '0px',
                    opacity: isNavigating ? 1 : 0,
                    pointerEvents: isNavigating ? 'auto' : 'none',
                }}>
                <Spin size="large" />
                <p className={styles.loadingText}>
                    Qidiruv sahifasiga o'tilmoqda...
                </p>
            </div>
            {historyOptions}
            {filteredDataOptions}
        </div>
    );
}

export default SearchResult;
