import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Select, Input, Skeleton } from 'antd';
import searchStyle from './search-modal.module.scss';
import useSearch from '~/shared/hooks/useSearch';
import { MdOutlineAccessTime } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import useHistorySearch from '~/shared/hooks/useHistorySearch';
import { highlightMatch } from '~/shared/utilities/utils';
import Link from 'next/link';
import { IoSearch } from 'react-icons/io5';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import useResponsive from '~/shared/utilities/useResponsive';
import { useDisableWindowScroll } from '~/shared/hooks/useDisableWindowScroll';

function SearchModal({ onClose, open, defaultType = 'mahsulotlar' }) {
    const searchRef = useRef(null);
    const { isMobile } = useResponsive();
    const {
        search,
        debouncedSearch,
        setSearch,
        type,
        setType,
        handleSearch,
        handleClickOption,
        options,
        isLoading,
    } = useSearch();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const {
        searchHistory,
        clearHistoryItem,
        deleteHistoryItem,
        isLoading: isHistoryLoading,
    } = useHistorySearch(debouncedSearch);
    const { startTimeout } = useTimeManager();

    useEffect(() => {
        setType(defaultType);
        if (open && searchRef.current) {
            startTimeout(() => {
                searchRef.current.focus();
            }, 100);
        }
    }, [open, defaultType]);

    useDisableWindowScroll(open);

    let searchHeader = null;

    if (isMobile) {
        searchHeader = (
            <div className={searchStyle.searchBoxMobile}>
                <Select
                    value={type}
                    onChange={(val) => setType(val)}
                    className={searchStyle.select}>
                    <Option value="mahsulotlar">Mahsulotlar</Option>
                    <Option value="xizmatlar">Xizmatlar</Option>
                    <Option value="mutaxasislar">Mutaxassislar</Option>
                </Select>

                <Input
                    ref={searchRef}
                    classNames={{
                        prefix: searchStyle.inputIconPrefix,
                    }}
                    prefix={
                        <IoSearch
                            style={{
                                fontSize: '18px',
                            }}
                        />
                    }
                    className={searchStyle.input}
                    placeholder={'izlash...'}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onPressEnter={handleSearch}
                />

                <Button type="primary" onClick={handleSearch}>
                    <IoSearch />
                    Izlash
                </Button>
            </div>
        );
    } else {
        searchHeader = (
            <div
                className={searchStyle.searchBox}
                style={{
                    boxShadow: isSearchFocused
                        ? '0 0 0 2px rgba(0, 164, 79, 0.5)'
                        : 'none',
                }}>
                <div className="d-flex w-100">
                    <Select
                        value={type}
                        onChange={(val) => setType(val)}
                        className={searchStyle.select}
                        bordered={false}>
                        <Option value="mahsulotlar">Mahsulotlar</Option>
                        <Option value="xizmatlar">Xizmatlar</Option>
                        <Option value="mutaxasislar">Mutaxassislar</Option>
                    </Select>

                    <Input
                        ref={searchRef}
                        className={searchStyle.input}
                        placeholder={'izlash...'}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onPressEnter={handleSearch}
                        bordered={false}
                    />
                </div>

                <span className={searchStyle.searchIcon} onClick={handleSearch}>
                    <IoSearch />
                </span>
            </div>
        );
    }

    let historyOptions = null;

    if (!isHistoryLoading && searchHistory.length) {
        historyOptions = (
            <div
                style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    marginBottom: '15px',
                }}>
                <div className={searchStyle.searchHistoryHeader}>
                    <h4>Yaqinda izlangan natijalar</h4>
                    <Button
                        variant="text"
                        color="danger"
                        onClick={clearHistoryItem}
                        size="small">
                        Tozalash
                    </Button>
                </div>
                {searchHistory.map((item) => (
                    <Link
                        key={item.value}
                        href={
                            item.type === 'mahsulotlar'
                                ? `/search-page/?keyword=${item.value}&tab=1&type=file`
                                : item.type === 'xizmatlar'
                                ? `/search-page/?keyword=${item.value}&tab=2&type=all`
                                : `/search-page/?keyword=${item.value}&tab=3&type=all`
                        }>
                        <a>
                            <div className={searchStyle.searchOption}>
                                <MdOutlineAccessTime
                                    className={searchStyle.searchOptionIcon}
                                />
                                <span>
                                    {highlightMatch(item.value, search)}
                                </span>
                                <Button
                                    type="text"
                                    className={searchStyle.deleteHistoryBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        deleteHistoryItem(item);
                                    }}
                                    icon={<IoClose fontSize={18} />}
                                    size="small"
                                    style={{ marginLeft: 'auto' }}
                                />
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        );
    }

    console.log({ options });

    let filteredDataOptions = null;
    if (isLoading) {
        filteredDataOptions = Array(10)
            .fill(null)
            .map((_, i) => (
                <Skeleton
                    key={i}
                    active
                    className="Search_Results_Wrap_skeleton"
                    style={{
                        width: '100% !important',
                        padding: '10px 10px 10px 0',
                    }}
                />
            ));
    } else if (options.length) {
        filteredDataOptions = (
            <div
                style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                }}>
                {options.map((option) => (
                    <div
                        key={option.key}
                        className={searchStyle.searchOption}
                        onClick={() => handleClickOption(option.value)}
                        style={{ cursor: 'pointer' }}>
                        <IoSearch className={searchStyle.searchOptionIcon} />
                        {highlightMatch(option.value, search)}
                    </div>
                ))}
            </div>
        );
    } else {
        filteredDataOptions = (
            <EmptyTab description="So'rov bo'yicha ma'lumotlar topilmadi" />
        );
    }

    return (
        <Modal
            title={'Qidiruv'}
            classNames={{
                content: searchStyle.searchModalContent,
            }}
            open={open}
            width={560}
            footer={null}
            onCancel={onClose}>
            <div>
                {searchHeader}
                <div
                    style={{
                        marginTop: '10px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                    }}>
                    {historyOptions}
                    {filteredDataOptions}
                </div>
            </div>
        </Modal>
    );
}

export default SearchModal;
