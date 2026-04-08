import React from 'react';
import { Skeleton } from 'antd';
import useHistorySearch from '~/shared/hooks/useHistorySearch';
import { EmptyTab } from '~/widgets/header/HeaderCategories';
import styles from './search-result.module.scss';
import {
    SearchHistoryHeader,
    SearchHistoryOption,
    SearchOption,
    SearchSoffiaAIOption,
} from './SearchComponents';

type SearchOptionsProps = {
    debouncedSearch: string;
    handleClickOption: (value: string) => void;
    options: Array<{ key: string; value: string }>;
    isLoading: boolean;
    categoryType?: 'mahsulotlar' | 'xizmatlar' | 'mutaxassislar';
    isNavigating?: boolean;
};

function SearchOptions({
    debouncedSearch,
    handleClickOption,
    categoryType,
    options,
    isLoading,
}: SearchOptionsProps) {
    const {
        searchHistory,
        clearHistoryItem,
        deleteHistoryItem,
        isLoading: isHistoryLoading,
    } = useHistorySearch(debouncedSearch);
    let historyOptions = null;

    const filteredSearchHistory = searchHistory.filter(
        (item: any) => !categoryType || item.type === categoryType
    );

    if (!isHistoryLoading && filteredSearchHistory.length) {
        historyOptions = (
            <div className={styles.historyContainer}>
                <SearchHistoryHeader clearHistoryItem={clearHistoryItem} />
                {filteredSearchHistory.map((item: any) => (
                    <SearchHistoryOption
                        key={item.value}
                        item={item}
                        debouncedSearch={debouncedSearch}
                        deleteHistoryItem={deleteHistoryItem}
                        onClick={() => handleClickOption(item.value)}
                    />
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
                        onClick={() => handleClickOption(option.value)}
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
            {historyOptions}
            {filteredDataOptions}
            {debouncedSearch && (
                <SearchSoffiaAIOption debouncedSearch={debouncedSearch} />
            )}
        </div>
    );
}

export default SearchOptions;
