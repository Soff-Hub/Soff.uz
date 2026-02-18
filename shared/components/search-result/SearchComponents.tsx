import React, { FC } from 'react';
import styles from './search-result.module.scss';
import { Button, Spin } from 'antd';
import { MdOutlineAccessTime } from 'react-icons/md';
import { IoClose, IoSearch, IoArrowForward } from 'react-icons/io5';
import { highlightMatch } from '~/shared/utilities/utils';
import { soffiaIconSVG } from '~/widgets/header/HeaderActions/HeaderAIIcon';

type SearchSoffiaAIOptionProps = {
    debouncedSearch: string;
};

export const SearchSoffiaAIOption: FC<SearchSoffiaAIOptionProps> = ({
    debouncedSearch,
}) => {
    return (
        <a
            href="https://soffia.uz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.soffiaAiSuggestion}>
            <div className={styles.aiIcon}>{soffiaIconSVG}</div>
            <div className={styles.aiText}>
                <span className={styles.aiLabel}>Soffia AI orqali yaratish</span>
                <span className={styles.aiDesc}>
                    "{debouncedSearch}" haqida AI dan so'rab ko'ring
                </span>
            </div>
            <IoArrowForward className={styles.aiArrow} />
        </a>
    );
};

type SearchHistoryHeaderProps = {
    clearHistoryItem: () => void;
};

export const SearchHistoryHeader: FC<SearchHistoryHeaderProps> = ({
    clearHistoryItem,
}) => {
    return (
        <div className={styles.searchHistoryHeader}>
            <h4>Yaqinda izlangan natijalar</h4>
            <Button
                variant="text"
                color="danger"
                onClick={clearHistoryItem}
                size="small">
                Tozalash
            </Button>
        </div>
    );
};

type SearchHistoryOptionProps = {
    item: { key: string; value: string };
    debouncedSearch: string;
    deleteHistoryItem: (item: { key: string; value: string }) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const SearchHistoryOption: FC<SearchHistoryOptionProps> = ({
    item,
    debouncedSearch,
    deleteHistoryItem,
    ...props
}) => {
    return (
        <div className={styles.searchOption} {...props}>
            <MdOutlineAccessTime className={styles.searchOptionIcon} />

            <Button
                type="text"
                className={styles.deleteHistoryBtn}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteHistoryItem(item);
                }}
                icon={<IoClose fontSize={18} />}
                size="small"
                style={{ marginLeft: 'auto' }}
            />
            <span>{highlightMatch(item.value, debouncedSearch)}</span>
        </div>
    );
};

type SearchOptionProps = {
    option: { key: string; value: string };
    debouncedSearch: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const SearchOption: FC<SearchOptionProps> = ({
    option,
    debouncedSearch,
    ...props
}) => {
    return (
        <div className={styles.searchOption} {...props}>
            <IoSearch className={styles.searchOptionIcon} />
            {highlightMatch(option.value, debouncedSearch)}
        </div>
    );
};

type SearchNavigationProgressProps = {
    isNavigating: boolean;
};

export const SearchNavigationProgress: FC<SearchNavigationProgressProps> = ({
    isNavigating,
}) => {
    return (
        <div
            className={styles.loadingOverlay}
            style={{
                height: isNavigating ? '300px' : '0px',
                opacity: isNavigating ? 1 : 0,
                pointerEvents: isNavigating ? 'auto' : 'none',
            }}>
            <Spin size="large" />
            <p className={styles.loadingText}>
                Qidiruv sahifasiga o'tilmoqda...
            </p>
        </div>
    );
};
