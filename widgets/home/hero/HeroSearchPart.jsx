import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Popover } from 'antd';
import styles from './style.module.scss';
import useSearch from '~/shared/hooks/useSearch';
import SearchResult from '~/shared/components/search-result';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { FaBriefcase } from 'react-icons/fa6';
import { FaDownload } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa6';
import { useTranslation } from 'next-i18next';

function HeroSearchPart() {
    const { t } = useTranslation('index');

    const placeholders = {
        mahsulotlar: t('heroSearch.placeholders.products'),
        xizmatlar: t('heroSearch.placeholders.services'),
        mutaxasislar: t('heroSearch.placeholders.specialists'),
    };
    const {
        options,
        search,
        setSearch,
        type,
        setType,
        handleSearch,
        debouncedSearch,
        handleClickOption,
        isLoading,
        isNavigating,
        setIsNavigating,
    } = useSearch();
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [popoverWidth, setPopoverWidth] = useState(null);
    const inputRef = useRef(null);
    const searchBoxRef = useRef(null);
    const { startTimeout } = useTimeManager();

    const handleInputChange = (e) => {
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

    useEffect(() => {
        if (!popoverVisible) return;

        const handleClickOutside = (event) => {
            const target = event.target;
            const portalElement = document.getElementById('my-portal');

            if (
                searchBoxRef.current &&
                !searchBoxRef.current.contains(target) &&
                portalElement &&
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

    const handleOptionClick = (value) => {
        handleClickOption(value);
    };

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

    const popoverContent = (
        <div
            onMouseDown={(e) => {
                e.preventDefault();
            }}>
            <SearchResult
                debouncedSearch={debouncedSearch}
                handleClickOption={handleOptionClick}
                options={options}
                isLoading={isLoading}
                isNavigating={isNavigating}
                setIsNavigating={setIsNavigating}
            />
        </div>
    );

    return (
        <div className={styles.heroButtons}>
            <div className={styles.heroFilterButtons}>
                <span
                    onClick={() => setType('mahsulotlar')}
                    className={
                        type === 'mahsulotlar'
                            ? styles.activeHeroBtn
                            : styles.heroBtn
                    }>
                    <FaDownload /> {t('heroSearch.products')}
                </span>
                <span
                    onClick={() => setType('xizmatlar')}
                    className={
                        type === 'xizmatlar'
                            ? styles.activeHeroBtn
                            : styles.heroBtn
                    }>
                    <FaBriefcase /> {t('heroSearch.services')}
                </span>
                <span
                    onClick={() => setType('mutaxasislar')}
                    className={
                        type === 'mutaxasislar'
                            ? styles.activeHeroBtn
                            : styles.heroBtn
                    }>
                    <FaUsers /> {t('heroSearch.specialists')}
                </span>
            </div>

            <div ref={searchBoxRef} className={styles.searchBoxWrapper}>
                <Popover
                    content={popoverContent}
                    open={popoverVisible}
                    overlayClassName={styles.searchPopover}
                    placement="bottomLeft"
                    overlayInnerStyle={{ padding: 0 }}
                    overlayStyle={{
                        ...(popoverWidth ? { width: `${popoverWidth}px` } : {}),
                    }}
                    // getPopupContainer={() =>
                    //     document.getElementById('my-portal')
                    // }
                >
                    <div className={styles.searchBox}>
                        <Input
                            ref={inputRef}
                            disabled={isNavigating}
                            size="large"
                            value={search}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            placeholder={placeholders[type]}
                            className={styles.input}
                            bordered={false}
                            allowClear
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />

                        <span
                            disabled={isNavigating}
                            className={styles.searchIcon}
                            onClick={handleSearch}>
                            <SearchOutlined />
                        </span>
                    </div>
                </Popover>
            </div>
        </div>
    );
}

export default HeroSearchPart;
