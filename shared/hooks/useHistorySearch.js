import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearSearchHistory,
    deleteSearchHistoryItem,
    setSearchHistoryItem,
} from '~/store/search/slice';

function useHistorySearch(search) {
    const dispatch = useDispatch();
    const { searchHistory, status } = useSelector((state) => state.search);
    const isLoading = status === 'loading';

    const addSearchHistoryItem = (item) => {
        dispatch(setSearchHistoryItem(item));
    };

    const filterHistoryItem = (query) => {
        dispatch(filterHistoryItem(query));
    };

    const deleteHistoryItem = (item) => {
        dispatch(deleteSearchHistoryItem(item));
    };

    const clearHistoryItem = () => {
        dispatch(clearSearchHistory());
    };

    const filteredHistorySearch = useMemo(() => {
        if (!search) return searchHistory;
        return searchHistory.filter((item) =>
            item.value.toLowerCase().includes(search.toLowerCase())
        );
    }, [searchHistory, search]);

    return {
        searchHistory: filteredHistorySearch,
        addSearchHistoryItem,
        filterHistoryItem,
        deleteHistoryItem,
        clearHistoryItem,
        status,
        isLoading,
    };
}

export default useHistorySearch;
