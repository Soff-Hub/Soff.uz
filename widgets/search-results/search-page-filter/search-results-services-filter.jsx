import React, { useState, useMemo, useEffect } from 'react';
import { Badge, Button, Card, Drawer, Select, Space, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { useMounted } from '~/shared/hooks/useMounted';
import { IoFilter } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { CloseCircleOutlined } from '@ant-design/icons';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineApartment } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import { useTranslation } from 'next-i18next';

const defaultValues = {
    direction: '',
    service_parent: undefined,
};

export default function SearchResultsProductsFilter({ total }) {
    const [filterOpen, setFilterOpen] = useState(false);
    const isMounted = useMounted(200);
    const router = useRouter();
    const { locale } = router;
    const [categoriesList, setCategoriesList] = useState([]);
    const { t } = useTranslation('search');

    const { data: directionsData } = useGetDirectionsQuery(
        `all-directinos - ${locale}`
    );

    const directions = useMemo(() => {
        return [
            { label: t('filter.all'), value: '' },
            ...(directionsData || []),
        ].filter(Boolean);
    }, [directionsData, t]);

    const mutationsInForm = useMemo(() => {
        if (!isMounted) {
            return {
                hasMutation: false,
                howManyMutations: 0,
            };
        }

        let hasMutation = false;
        let howManyMutations = 0;
        Object.keys(defaultValues).forEach((key) => {
            if (router.query[key] && router.query[key] !== defaultValues[key]) {
                hasMutation = true;
                howManyMutations += 1;
            }
        });
        return {
            hasMutation,
            howManyMutations,
        };
    }, [router.query, isMounted]);

    const handleClearAll = () => {
        const newQueries = { ...router.query };
        newQueries.offset = 0;
        newQueries.limit = 50;
        delete newQueries.direction;
        delete newQueries.service_parent;

        router.push(
            {
                pathname: router.pathname,
                query: newQueries,
            },
            undefined,
            { scroll: false }
        );
    };

    const deleteQuerySelectively = (...keys) => {
        const newParams = { ...router.query };
        keys.forEach((key) => {
            delete newParams[key];
        });
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...newParams,
                    page: 1,
                },
            },
            undefined,
            { scroll: false }
        );
    };

    const filterIndicatorSelectors = useMemo(() => {
        const currentType = directions?.find(
            (type) => type?.value == router.query.direction
        );

        const currentFileType = categoriesList.find(
            (type) => type.value == router.query.service_parent
        );

        return [
            {
                key: 'direction',
                icon: <AiOutlineApartment />,
                title: currentType?.label,
                isEnabled: !!router.query.direction,
                disabled:
                    defaultValues.direction === router.query.direction ||
                    router.query.service_parent,
                disabledTooltip: t('filter.tooltips.clearCategoryFirst'),
                tooltip: t('filter.direction'),
                action: () => deleteQuerySelectively('direction'),
            },
            {
                key: 'service_parent',
                icon: <BiCategory />,
                title: currentFileType?.label,
                tooltip: t('filter.category'),
                isEnabled: !!router.query.service_parent,
                action: () => deleteQuerySelectively('service_parent'),
            },
        ];
    }, [router.query, directions, categoriesList, t]);

    const onClose = () => {
        setFilterOpen(false);
    };

    return (
        <div className="Search_Results_Products_form_box">
            {mutationsInForm.hasMutation ? (
                <Card className="search_results_filter_card">
                    <div className="filter_card_action_btns">
                        <div className="filter_indicators">
                            {filterIndicatorSelectors
                                .filter((selector) => selector.isEnabled)
                                .map((selector) => (
                                    <Tooltip
                                        placement="top"
                                        title={
                                            selector.disabled
                                                ? selector.disabledTooltip
                                                : selector.tooltip
                                        }
                                        key={selector.key}>
                                        <Button
                                            color="light"
                                            icon={selector.icon}
                                            className="filter-indicator-button"
                                            disabled={selector.disabled}
                                            onClick={selector.action}>
                                            {selector.title}
                                            <CloseCircleOutlined
                                                style={{
                                                    marginLeft: '4px',
                                                }}
                                            />
                                        </Button>
                                    </Tooltip>
                                ))}
                            <Tooltip
                                placement="top"
                                title={t('filter.tooltips.clearAll')}>
                                <Button
                                    color="danger"
                                    icon={<IoClose />}
                                    onClick={handleClearAll}
                                    iconPosition="end"
                                    className="filter-danger"
                                />
                            </Tooltip>
                        </div>
                        <Badge count={mutationsInForm.howManyMutations}>
                            <Button
                                icon={<IoFilter />}
                                type="primary"
                                onClick={() => setFilterOpen(true)}
                                style={{
                                    width: 'auto',
                                }}>
                                {t('filter.button')}
                            </Button>
                        </Badge>
                    </div>
                </Card>
            ) : null}
            <div className="search_results_indicator">
                <p className="countProduct text-nowrap m-0">
                    {total ? t('filter.serviceCount', { count: total }) : ''}
                </p>
                {!mutationsInForm.hasMutation && (
                    <div>
                        <Badge count={mutationsInForm.howManyMutations}>
                            <Button
                                icon={<IoFilter />}
                                type="primary"
                                onClick={() => setFilterOpen(true)}
                                style={{
                                    width: 'auto',
                                }}>
                                {t('filter.button')}
                            </Button>
                        </Badge>
                    </div>
                )}
            </div>
            <FilterFormDrawer
                open={filterOpen}
                onClose={onClose}
                setCategoriesList={setCategoriesList}
                directions={directions}
            />
        </div>
    );
}

const FilterFormDrawer = ({ open, onClose, directions, setCategoriesList }) => {
    const router = useRouter();
    const { t } = useTranslation('search');
    const initialFilterValues = useMemo(() => {
        return {
            direction: router.query.direction || '',
            service_parent: router.query.service_parent || undefined,
            category_id: router.query.category_id || undefined,
        };
    }, [router.query]);
    const [filterValues, setFilterValues] = useState(initialFilterValues);

    const { data: parentData } = useQuery({
        queryKey: ['service-parent', filterValues.direction],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/categories?direction=${filterValues.direction}`
            );

            return await res.json();
        },
        enabled: !!filterValues.direction && filterValues.direction !== 'all',
    });

    const categories = useMemo(() => {
        return (parentData || []).map((parent) => ({
            label: parent.title,
            value: String(parent.id),
        }));
    }, [parentData]);

    const handleChangeFilterValues = (key, value) => {
        setFilterValues((prev) => {
            if (typeof key === 'object') {
                return {
                    ...prev,
                    ...key,
                };
            }
            return {
                ...prev,
                [key]: value,
            };
        });
    };

    const handleSaveFilters = () => {
        const validFilterValues = Object.keys(filterValues).reduce(
            (obj, key) => {
                obj[key] = filterValues[key];
                return obj;
            },
            {}
        );
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    ...validFilterValues,
                },
            },
            undefined,
            { scroll: false }
        );
        onClose();
    };

    const handleClear = () => {
        setFilterValues(defaultValues);
    };

    const handleSaveAndClose = () => {
        handleSaveFilters();
        onClose();
    };

    const saveAndCloseForm = (e) => {
        e.preventDefault();
        handleSaveAndClose();
    };

    useEffect(() => {
        setFilterValues(initialFilterValues);
    }, [initialFilterValues]);

    useEffect(() => {
        setCategoriesList(categories);
    }, [categories]);

    return (
        <Drawer
            title={t('filter.title')}
            placement="left"
            onClose={handleSaveAndClose}
            open={open}
            closable={false}
            extra={
                <Space>
                    <Button
                        onClick={onClose}
                        icon={<IoClose fontSize={20} />}
                        type="text"></Button>
                </Space>
            }>
            <form
                className="search_results_filter_form"
                onSubmit={saveAndCloseForm}>
                <Select
                    style={{ width: '100%', maxWidth: '159px' }}
                    placeholder={t('filter.direction')}
                    value={filterValues.direction}
                    onChange={(value) =>
                        handleChangeFilterValues({
                            direction: value,
                            service_parent: undefined,
                        })
                    }
                    options={directions}
                />
                <Select
                    style={{ width: '100%', maxWidth: '159px' }}
                    placeholder={t('filter.parentCategory')}
                    value={filterValues.service_parent}
                    allowClear
                    disabled={!(categories.length && filterValues.direction)}
                    onClear={() =>
                        handleChangeFilterValues({
                            service_parent: '',
                        })
                    }
                    onChange={(value) =>
                        handleChangeFilterValues({
                            service_parent: value,
                        })
                    }
                    options={categories}
                />
                <div
                    className="actions"
                    style={{
                        marginTop: '15px',
                    }}>
                    <Button
                        type="default"
                        htmlType="reset"
                        block
                        onClick={handleClear}>
                        {t('filter.actions.clear')}
                    </Button>
                    <Button htmlType="submit" type="primary" block>
                        {t('filter.actions.apply')}
                    </Button>
                </div>
            </form>
        </Drawer>
    );
};
