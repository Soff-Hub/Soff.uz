import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Select, Input } from 'antd';
import searchStyle from './search-modal.module.scss';
import useSearch from '~/shared/hooks/useSearch';
import { IoSearch } from 'react-icons/io5';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import useResponsive from '~/shared/utilities/useResponsive';
import { useDisableWindowScroll } from '~/shared/hooks/useDisableWindowScroll';
import SearchResult from '../../search-result';

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
        isNavigating,
        setIsNavigating,
    } = useSearch();
    const [isSearchFocused, setIsSearchFocused] = useState(false);

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
                    disabled={isNavigating}
                    onChange={(val) => setType(val)}
                    className={searchStyle.select}>
                    <Option value="mahsulotlar">Mahsulotlar</Option>
                    <Option value="xizmatlar">Xizmatlar</Option>
                    <Option value="mutaxasislar">Mutaxassislar</Option>
                </Select>

                <Input
                    ref={searchRef}
                    disabled={isNavigating}
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
                        disabled={isNavigating}
                        onChange={(val) => setType(val)}
                        className={searchStyle.select}
                        bordered={false}>
                        <Option value="mahsulotlar">Mahsulotlar</Option>
                        <Option value="xizmatlar">Xizmatlar</Option>
                        <Option value="mutaxasislar">Mutaxassislar</Option>
                    </Select>

                    <Input
                        ref={searchRef}
                        disabled={isNavigating}
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
                    <SearchResult
                        debouncedSearch={debouncedSearch}
                        handleClickOption={handleClickOption}
                        options={options}
                        isLoading={isLoading}
                        isNavigating={isNavigating}
                        setIsNavigating={setIsNavigating}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default SearchModal;
