import React from 'react';
import Link from 'next/link';
import { Skeleton } from 'antd';
import useHistorySearch from '~/shared/hooks/useHistorySearch';
import { EmptyTab } from '~/widgets/header/HeaderCategories';
import styles from './search-result.module.scss';
import {
    SearchHistoryHeader,
    SearchHistoryOption,
    SearchNavigationProgress,
    SearchOption,
    SearchSoffiaAIOption,
} from './SearchComponents';

function SearchResult({
    debouncedSearch,
    handleNavigateOption,
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
                <SearchHistoryHeader clearHistoryItem={clearHistoryItem} />
                {searchHistory.map((item) => (
                    <Link
                        key={item.value}
                        href={
                            item.type === 'mahsulotlar'
                                ? `/search-page/?keyword=${item.value}&tab=1&type=all`
                                : item.type === 'xizmatlar'
                                    ? `/search-page/?keyword=${item.value}&tab=2&type=all`
                                    : `/search-page/?keyword=${item.value}&tab=3&type=all`
                        }>
                        <a onClick={() => setIsNavigating(true)}>
                            <SearchHistoryOption
                                item={item}
                                debouncedSearch={debouncedSearch}
                                deleteHistoryItem={deleteHistoryItem}
                            />
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
                    <SearchOption
                        key={option.key}
                        option={option}
                        debouncedSearch={debouncedSearch}
                        onClick={() => handleNavigateOption(option.value)}
                    />
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
            <SearchNavigationProgress isNavigating={isNavigating} />
            {historyOptions}
            {filteredDataOptions}
            {debouncedSearch && (
                <SearchSoffiaAIOption debouncedSearch={debouncedSearch} />
            )}
        </div>
    );
}

export default SearchResult;
