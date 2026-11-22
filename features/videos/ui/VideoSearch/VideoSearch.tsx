import React, { useState, useEffect, useRef } from 'react';
import { SearchOutlined, CloseCircleFilled } from '@ant-design/icons';
import useDebounce from '~/shared/hooks/useDebounce';
import styles from './VideoSearch.module.scss';

interface VideoSearchProps {
    onSearch: (value: string) => void;
    placeholder?: string;
    initialValue?: string;
    className?: string;
}

/**
 * VideoSearch Component
 * Custom bespoke search input designed to match the specific UI requirements (pill shape, green theme).
 * Avoids Ant Design Input overrides to maintain full control over styling and behavior.
 */
const VideoSearch: React.FC<VideoSearchProps> = ({
    onSearch,
    placeholder,
    initialValue = '',
    className = ''
}) => {
    const [searchValue, setSearchValue] = useState(initialValue);
    const debouncedSearch = useDebounce(searchValue, 500);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync state with initialValue (e.g. from URL)
    useEffect(() => {
        setSearchValue(initialValue);
    }, [initialValue]);

    // Handle debounced search
    useEffect(() => {
        onSearch(debouncedSearch);
    }, [debouncedSearch, onSearch]);

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSearchValue('');
        inputRef.current?.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchValue);
    };

    return (
        <div className={`${styles.searchWrapper} ${className}`}>
            <div className={styles.searchContainer}>
                <input
                    ref={inputRef}
                    type="text"
                    className={styles.customInput}
                    placeholder={placeholder || "Darslarni izlash..."}
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                />
                
                <div className={styles.actionGroup}>
                    {searchValue && (
                        <CloseCircleFilled 
                            className={styles.clearIcon} 
                            onClick={handleClear} 
                            title="Tozalash"
                        />
                    )}
                    <button 
                        className={styles.searchButton}
                        onClick={handleSearchClick}
                        aria-label="Qidirish"
                    >
                        <SearchOutlined />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoSearch;
