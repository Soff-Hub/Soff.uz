import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Select, Input } from 'antd';
import searchStyle from './search-modal.module.scss';
import useSearch from '~/shared/hooks/useSearch';
import { IoSearch } from 'react-icons/io5';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import useResponsive from '~/shared/utilities/useResponsive';
import { useDisableWindowScroll } from '~/shared/hooks/useDisableWindowScroll';
import SearchResult from '../../search-result';
import { useTranslation } from 'next-i18next';

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
    const { t } = useTranslation('header');
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
                    onChange={(val) => setType(val)}
                    className={searchStyle.select}>
                    <Option value="mahsulotlar">{t('products')}</Option>
                    <Option value="xizmatlar">{t('services')}</Option>
                    <Option value="mutaxasislar">{t('specialties')}</Option>
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
                    placeholder={t('seekPlaceholder')}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onPressEnter={handleSearch}
                />

                <Button type="primary" onClick={handleSearch}>
                    <IoSearch />
                    {t('seek')}
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
                        <Option value="mahsulotlar">{t('products')}</Option>
                        <Option value="xizmatlar">{t('services')}</Option>
                        <Option value="mutaxasislar">{t('specialties')}</Option>
                    </Select>

                    <Input
                        ref={searchRef}
                        className={searchStyle.input}
                        placeholder={t('seekPlaceholder')}
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
            title={t('search')}
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
                    />
                </div>
            </div>
        </Modal>
    );
}

export default SearchModal;
