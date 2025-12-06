import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Popover } from 'antd';
import styles from './style.module.scss';
import useSearch from '~/shared/hooks/useSearch';
import SearchResult from '~/shared/components/search-result';

const placeholders = {
    mahsulotlar: 'Qaysi turdagi tayyor mahsulot qidirmoqdasiz?',
    xizmatlar: 'Qaysi turdagi  xizmat  qidirmoqdasiz?',
    mutaxasislar: 'Qaysi turdagi mutaxassislar qidirmoqdasiz?',
};

function HeroSearchPart() {
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
    } = useSearch();
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [popoverWidth, setPopoverWidth] = useState(null);
    const inputRef = useRef(null);
    const searchBoxRef = useRef(null);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
        setPopoverVisible(true);
    };

    const handleInputFocus = () => {
        setPopoverVisible(true);
    };

    const handleInputBlur = () => {
        // Delay hiding to allow clicks on popover items
        setTimeout(() => {
            setPopoverVisible(false);
        }, 200);
    };

    const handleOptionClick = (value) => {
        handleClickOption(value);
        setPopoverVisible(false);
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
        <div style={{ width: '100%', maxWidth: '600px', minWidth: '300px' }}>
            <SearchResult
                debouncedSearch={debouncedSearch}
                handleClickOption={handleOptionClick}
                options={options}
                isLoading={isLoading}
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
                    <i className="fa-solid fa-download"></i> Mahsulotlar
                </span>
                <span
                    onClick={() => setType('xizmatlar')}
                    className={
                        type === 'xizmatlar'
                            ? styles.activeHeroBtn
                            : styles.heroBtn
                    }>
                    <i className="fa-solid fa-briefcase"></i> Xizmatlar
                </span>
                <span
                    onClick={() => setType('mutaxasislar')}
                    className={
                        type === 'mutaxasislar'
                            ? styles.activeHeroBtn
                            : styles.heroBtn
                    }>
                    <i className="fa-solid fa-users"></i> Mutaxasislar
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
                    getPopupContainer={() =>
                        document.getElementById('my-portal')
                    }>
                    <div className={styles.searchBox}>
                        <Input
                            ref={inputRef}
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
                                    setPopoverVisible(false);
                                }
                            }}
                        />

                        <span
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
