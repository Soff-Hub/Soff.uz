import { Input } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SearchController from '~/shared/components/search-result/SearchController';
import useSearch from '~/shared/hooks/useSearch';
import { SearchOutlined } from '@ant-design/icons';

export default function CategorySearchSection() {
    const searchProps = useSearch();
    const { search, setSearch, debouncedSearch } = searchProps;
    const { push, replace, query, isReady } = useRouter();
    const { search: querySearch } = query;

    const handleSearch = (searchValue, isReplace = false) => {
        const normalizedValue = (searchValue || '').trim();
        const currentSearch = (querySearch || '').trim();

        // Guard against redundant navigation to prevent infinite loops and unnecessary fetches
        if (normalizedValue === currentSearch && isReady) return;

        const action = isReplace ? replace : push;
        action({
            pathname: query.pathname,
            query: { ...query, search: normalizedValue },
        });
    };

    // Synchronize search state with URL query parameter (e.g. for browser back/forward buttons)
    useEffect(() => {
        const normalizedQuery = (querySearch || '').trim();
        const normalizedSearch = (search || '').trim();

        // Only sync if URL changed from an external action (like back button)
        // and it's not just the user currently typing a new value.
        if (isReady && normalizedQuery !== normalizedSearch) {
            if (normalizedQuery !== (debouncedSearch || '').trim()) {
                setSearch(normalizedQuery);
            }
        }
    }, [querySearch, isReady]);

    // Automatic debounced search
    useEffect(() => {
        const normalizedDebounced = (debouncedSearch || '').trim();
        const normalizedQuery = (querySearch || '').trim();
        
        if (isReady && normalizedDebounced !== normalizedQuery) {
            handleSearch(normalizedDebounced, true);
        }
    }, [debouncedSearch, isReady, querySearch]);

    return (
        <SearchController
            searchOption="selection"
            categoryType="mahsulotlar"
            searchProps={{
                ...searchProps,
                handleClickOption: (val) => {
                    handleSearch(val);
                },
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
            ) => {
                const executeSearch = () => {
                    handleSearch(search);
                    handleStoreSearchValue(search);
                    handleClose();
                };

                return (
                    <div className="category-search-box-wrapper">
                        <Input
                            ref={inputRef}
                            allowClear
                            placeholder="Mahsulot qidirish..."
                            size="large"
                            value={search}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            className="category-search-input"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    executeSearch();
                                }
                            }}
                        />
                        <div className="search-action-btn" onClick={executeSearch}>
                            <SearchOutlined />
                            <span>Qidirish</span>
                        </div>
                        <style jsx>{`
                            .category-search-box-wrapper {
                                display: flex;
                                align-items: center;
                                background: #fff;
                                border: 1px solid #dbdbdb;
                                border-radius: 8px;
                                padding: 2px;
                                transition: all 0.3s ease;
                                width: 100%;
                                overflow: hidden;
                            }
                            .category-search-box-wrapper:focus-within {
                                border-color: #00a44f;
                                box-shadow: 0 0 0 2px rgba(0, 164, 79, 0.1);
                            }
                            :global(.category-search-input) {
                                flex: 1;
                                border: none !important;
                                box-shadow: none !important;
                                height: 50px !important;
                                font-size: 16px !important;
                                padding: 0 16px !important;
                                background-color: transparent !important;
                            }
                            .search-action-btn {
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                background-color: #00a44f;
                                color: #fff;
                                padding: 0 24px;
                                height: 50px;
                                border-radius: 6px;
                                cursor: pointer;
                                font-weight: 600;
                                transition: background-color 0.2s;
                                user-select: none;
                                white-space: nowrap;
                            }
                            .search-action-btn:hover {
                                background-color: #008f44;
                            }
                            .search-action-btn :global(span.anticon) {
                                font-size: 20px;
                            }
                            @media (max-width: 640px) {
                                .search-action-btn span {
                                    display: none;
                                }
                                .search-action-btn {
                                    padding: 0 16px;
                                }
                            }
                        `}</style>
                    </div>
                );
            }}
        </SearchController>
    );
}
