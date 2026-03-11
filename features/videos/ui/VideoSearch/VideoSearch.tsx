import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { SearchOutlined, CloseCircleFilled } from '@ant-design/icons';
import useDebounce from '~/shared/hooks/useDebounce';
import styles from './VideoSearch.module.scss';

interface VideoSearchProps {
    onSearch: (value: string) => void;
    placeholder?: string;
    initialValue?: string;
    className?: string;
}

const VideoSearch: React.FC<VideoSearchProps> = ({
    onSearch,
    placeholder,
    initialValue = '',
    className = ''
}) => {
    const [searchValue, setSearchValue] = useState(initialValue);
    const debouncedSearch = useDebounce(searchValue, 500);

    // Sync state with initialValue (e.g. from URL)
    useEffect(() => {
        setSearchValue(initialValue);
    }, [initialValue]);

    // Handle debounced search
    useEffect(() => {
        // Only trigger onSearch if the value actually changed from the previous debounced value
        // to avoid unnecessary re-fetches on initial mount if initialValue is empty.
        onSearch(debouncedSearch);
    }, [debouncedSearch, onSearch]);

    const handleClear = () => {
        setSearchValue('');
        // No need to call onSearch('') here because debouncedSearch will become '' and trigger the useEffect
    };

    return (
        <div className={`${styles.searchWrapper} ${className}`}>
            <Input
                size="large"
                placeholder={placeholder || "Darslarni izlash..."}
                prefix={<SearchOutlined className={styles.searchIcon} />}
                suffix={
                    searchValue && (
                        <CloseCircleFilled 
                            className={styles.clearIcon} 
                            onClick={handleClear} 
                        />
                    )
                }
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.searchInput}
                allowClear={false} // We use custom clear suffix for better styling
            />
        </div>
    );
};

export default VideoSearch;
