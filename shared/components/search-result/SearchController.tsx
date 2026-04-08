import React, { useEffect, useRef, useState } from 'react';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import SearchResult from './SearchResult';
import { Popover } from 'antd';
import styles from './search-result.module.scss';
import SearchOptions from './SearchOptions';
import { TooltipPlacement } from 'antd/es/tooltip';
import useHistorySearch from '~/shared/hooks/useHistorySearch';

type SearchControllerProps = {
    searchOption: 'navigation' | 'selection';
    categoryType?: 'mahsulotlar' | 'xizmatlar' | 'mutaxassislar';
    popoverPlacement?: TooltipPlacement;
    searchProps: {
        search: string;
        setSearch: React.Dispatch<React.SetStateAction<string>>;
        type: 'mahsulotlar' | 'xizmatlar' | 'mutaxassislar';
        setType: React.Dispatch<
            React.SetStateAction<'mahsulotlar' | 'xizmatlar' | 'mutaxassislar'>
        >;
        debouncedSearch: string;
        isNavigating: boolean;
        setIsNavigating: React.Dispatch<React.SetStateAction<boolean>>;
        isLoading: boolean;
        handleSearch: () => void;
        handleClickOption: (value: string) => void;
        handleNavigateOption: (value: string) => void;
        options: Array<{ key: string; value: string }>;
    };
    classnames: {
        wrapper?: string;
    };
    styles: {
        wrapper?: React.CSSProperties;
    };
    children: (
        ref: React.RefObject<HTMLInputElement>,
        controls: {
            handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
            handleInputFocus: () => void;
            handleInputBlur: () => void;
            handleStoreSearchValue: (value: string) => void;
            handleClose: () => void;
        }
    ) => React.ReactNode;
};

function SearchController({
    children,
    searchOption,
    categoryType,
    popoverPlacement = 'bottomLeft',
    searchProps,
    classnames,
    styles: customStyles,
}: SearchControllerProps) {
    const {
        type,
        setType,
        options,
        setSearch,
        debouncedSearch,
        handleClickOption,
        handleNavigateOption,
        isLoading,
        isNavigating,
        setIsNavigating,
    } = searchProps;
    const { addSearchHistoryItem } = useHistorySearch();
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [popoverWidth, setPopoverWidth] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const searchBoxRef = useRef<HTMLDivElement>(null);
    const { startTimeout } = useTimeManager();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPopoverVisible(true);
    };

    const handleInputFocus = () => {
        setPopoverVisible(true);
    };

    const handleInputBlur = () => {
        startTimeout(() => {
            const activeElement = document.activeElement;
            const portalElement = document.getElementById('my-portal');

            if (
                activeElement === inputRef.current ||
                (searchBoxRef.current &&
                    searchBoxRef.current.contains(activeElement)) ||
                (portalElement && portalElement.contains(activeElement))
            ) {
                return;
            }

            setPopoverVisible(false);
        }, 150);
    };

    const handleClickOptionWrapper = (value: string) => {
        handleClickOption(value);
        addSearchHistoryItem({ value, type });
        setSearch(value);
        setPopoverVisible(false);
    };

    const popoverContent = (
        <div
            onMouseDown={(e) => {
                e.preventDefault();
            }}>
            {searchOption == 'navigation' ? (
                <SearchResult
                    debouncedSearch={debouncedSearch}
                    handleNavigateOption={handleNavigateOption}
                    options={options}
                    isLoading={isLoading}
                    isNavigating={isNavigating}
                    setIsNavigating={setIsNavigating}
                />
            ) : (
                <SearchOptions
                    debouncedSearch={debouncedSearch}
                    handleClickOption={handleClickOptionWrapper}
                    options={options}
                    isLoading={isLoading}
                    categoryType={type}
                />
            )}
        </div>
    );

    useEffect(() => {
        if (categoryType && categoryType !== type) {
            setType(categoryType);
        }
    }, [categoryType]);

    useEffect(() => {
        if (!popoverVisible) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node | null;
            const portalElement = document.getElementById('my-portal');

            if (
                target &&
                searchBoxRef.current &&
                !searchBoxRef.current.contains(target) &&
                portalElement &&
                target &&
                !portalElement.contains(target)
            ) {
                setPopoverVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popoverVisible]);

    useEffect(() => {
        const updatePopoverWidth = () => {
            if (searchBoxRef.current) {
                const width = searchBoxRef.current.offsetWidth;
                setPopoverWidth(width);
            }
        };

        updatePopoverWidth();
        window.addEventListener('resize', updatePopoverWidth);
        return () => window.removeEventListener('resize', updatePopoverWidth);
    }, []);

    return (
        <div
            ref={searchBoxRef}
            className={`${styles.searchBoxWrapper} ${classnames?.wrapper}`}
            style={customStyles?.wrapper}>
            <Popover
                content={popoverContent}
                open={popoverVisible}
                overlayClassName={styles.searchPopover}
                placement={popoverPlacement}
                overlayStyle={{ ...(popoverWidth ? { width: popoverWidth, maxWidth: popoverWidth } : {}) }}
                overlayInnerStyle={{ ...(popoverWidth ? { width: popoverWidth, maxWidth: popoverWidth } : {}) }}

            // getPopupContainer={() =>
            //     document.getElementById('my-portal')
            // }
            >
                {children(inputRef, {
                    handleInputChange,
                    handleInputFocus,
                    handleInputBlur,
                    handleStoreSearchValue: (value: string) => {
                        addSearchHistoryItem({ value, type });
                    },
                    handleClose: () => setPopoverVisible(false),
                })}
            </Popover>
        </div>
    );
}

export default SearchController;
