import { Input } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SearchController from '~/shared/components/search-result/SearchController';
import useSearch from '~/shared/hooks/useSearch';

export default function CategorySearchSection() {
    const searchProps = useSearch();
    const { search, setSearch } = searchProps;
    const { push, query, isReady } = useRouter();
    const { search: querySearch } = query;

    const handleSearch = (search) => {
        push({
            pathname: query.pathname,
            query: { ...query, search },
        });
    };

    useEffect(() => {
        if (isReady && querySearch) {
            setSearch(querySearch);
        }
    }, [isReady]);

    return (
        <SearchController
            searchOption="selection"
            categoryType="mahsulotlar"
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
                <Input.Search
                    ref={inputRef}
                    allowClear
                    placeholder="Mahsulot qidirish..."
                    size="large"
                    value={search}
                    defaultValue={querySearch || ''}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={{ fontSize: '18px' }}
                    onSearch={() => {
                        handleSearch(search);
                        handleStoreSearchValue(search);
                        handleClose();
                    }}
                />
            )}
        </SearchController>
    );
}
