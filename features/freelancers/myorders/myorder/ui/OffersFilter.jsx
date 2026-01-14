import React from 'react';
import { Button, Select, Tooltip, Collapse } from 'antd';
import {
    SortAscendingOutlined,
    SortDescendingOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'next-i18next';

const OffersFilter = ({
    filters,
    setFilters,
    isMobile,
    filterAccordionOpen,
    setFilterAccordionOpen,
    disabled = false,
}) => {
    const { t } = useTranslation('my-orders');
    const hasActiveFilters = Object.values(filters).some(
        (val) => val !== null && val !== undefined
    );

    const filterContent = (
        <div
            style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '12px',
                alignItems: isMobile ? 'stretch' : 'flex-end',
                flexWrap: 'wrap',
            }}>
            <div
                style={{
                    flex: isMobile ? '1' : '0 0 auto',
                    minWidth: isMobile ? '100%' : '150px',
                }}>
                <label
                    style={{
                        display: 'block',
                        marginBottom: '4px',
                        fontSize: '14px',
                        fontWeight: 500,
                    }}>
                    {t('filters.minRating')}
                </label>
                <Select
                    style={{ width: '100%' }}
                    placeholder={t('filters.minRatingPlaceholder')}
                    allowClear
                    value={filters.min_rating}
                    onChange={(value) =>
                        setFilters((prev) => ({
                            ...prev,
                            min_rating: value,
                        }))
                    }
                    disabled={disabled}
                    options={[
                        { label: '1', value: 1 },
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                        { label: '4', value: 4 },
                        { label: '5', value: 5 },
                    ]}
                />
            </div>

            <div
                style={{
                    flex: isMobile ? '1' : '0 0 auto',
                    minWidth: isMobile ? '100%' : '180px',
                }}>
                <label
                    style={{
                        display: 'block',
                        marginBottom: '4px',
                        fontSize: '14px',
                        fontWeight: 500,
                    }}>
                    {t('filters.experience')}
                </label>
                <Select
                    style={{ width: '100%' }}
                    placeholder={t('filters.experiencePlaceholder')}
                    allowClear
                    value={filters.has_category_experience}
                    onChange={(value) =>
                        setFilters((prev) => ({
                            ...prev,
                            has_category_experience: value,
                        }))
                    }
                    disabled={disabled}
                    options={[
                        { label: t('filters.experienced'), value: true },
                        {
                            label: t('filters.beginner'),
                            value: false,
                        },
                    ]}
                />
            </div>

            <div
                style={{
                    flex: isMobile ? '1' : '0 0 auto',
                    minWidth: isMobile ? '100%' : '150px',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'flex-end',
                }}>
                <div style={{ flex: 1 }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '4px',
                            fontSize: '14px',
                            fontWeight: 500,
                        }}>
                        {t('filters.sort')}
                    </label>
                    <Select
                        style={{ width: '100%' }}
                        placeholder={t('filters.sortPlaceholder')}
                        allowClear
                        value={filters.sort_by}
                        onChange={(value) =>
                            setFilters((prev) => ({
                                ...prev,
                                sort_by: value,
                                sort_order: value ? 'desc' : null,
                            }))
                        }
                        disabled={disabled}
                        options={[
                            {
                                label: t('filters.sortByRating'),
                                value: 'rating',
                            },
                            {
                                label: t('filters.sortByTime'),
                                value: 'sent_time',
                            },
                        ]}
                    />
                </div>
                {filters.sort_by && (
                    <Tooltip
                        title={
                            filters.sort_order === 'asc'
                                ? t('filters.sortAscending')
                                : t('filters.sortDescending')
                        }>
                        <Button
                            type="primary"
                            icon={
                                filters.sort_order === 'asc' ? (
                                    <SortAscendingOutlined />
                                ) : (
                                    <SortDescendingOutlined />
                                )
                            }
                            onClick={() => {
                                setFilters((prev) => ({
                                    ...prev,
                                    sort_order:
                                        prev.sort_order === 'asc'
                                            ? 'desc'
                                            : 'asc',
                                }));
                            }}
                            disabled={disabled}
                            style={{
                                height: '32px',
                                width: '32px',
                            }}
                        />
                    </Tooltip>
                )}
            </div>

            <Button
                type="default"
                danger
                block={isMobile}
                onClick={() =>
                    setFilters({
                        min_rating: null,
                        has_category_experience: null,
                        sort_by: null,
                        sort_order: null,
                    })
                }
                disabled={disabled}
                style={{
                    height: '32px',
                    ...(isMobile && { marginTop: '4px' }),
                }}>
                {t('filters.clearFilters')}
            </Button>
        </div>
    );

    if (isMobile) {
        return (
            <Collapse
                activeKey={filterAccordionOpen ? ['1'] : []}
                onChange={(keys) => {
                    if (!disabled) {
                        setFilterAccordionOpen(keys.includes('1'));
                    }
                }}
                disabled={disabled}
                style={{
                    marginBottom: '16px',
                    opacity: disabled ? 0.6 : 1,
                    pointerEvents: disabled ? 'none' : 'auto',
                }}
                items={[
                    {
                        key: '1',
                        label: (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <span style={{ fontWeight: 500 }}>
                                    {t('filters.title')}
                                </span>
                                {hasActiveFilters && (
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            color: '#1890ff',
                                            marginLeft: '8px',
                                        }}>
                                        ({t('filters.active')})
                                    </span>
                                )}
                            </div>
                        ),
                        children: (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                }}>
                                {filterContent}
                            </div>
                        ),
                    },
                ]}
            />
        );
    }

    return (
        <div
            style={{
                padding: '16px',
                marginBottom: '16px',
                background: '#f5f5f5',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
            }}>
            {filterContent}
        </div>
    );
};

export default OffersFilter;
