import {
    Badge,
    Button,
    Card,
    Drawer,
    Select,
    Slider,
    Space,
    Tooltip,
} from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import {
    AppstoreOutlined,
    FileTextOutlined,
    PictureOutlined,
    VideoCameraOutlined,
    GlobalOutlined,
    CodeOutlined,
    LayoutOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { IoFilter } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { LuFileType2 } from 'react-icons/lu';
import { FaRegFile } from 'react-icons/fa6';
import { MdOutlineFirstPage } from 'react-icons/md';
import { MdOutlineLastPage } from 'react-icons/md';
import { PiSortDescendingBold } from 'react-icons/pi';
import { useMounted } from '~/shared/hooks/useMounted';
import { useTranslation } from 'next-i18next';

const { Option } = Select;

const defaultValues = {
    type: 'file',
    file_type: '',
    parentCategory: '',
    category: '',
    order_by: '',
    pageRange: [1, 100],
};

function SearchResultsProductsFilter({ total, childData }) {
    const [filterOpen, setFilterOpen] = useState(false);
    const isMounted = useMounted(200);
    const router = useRouter();
    const { t } = useTranslation('search');

    const fileTypes = useMemo(
        () => [
            { label: t('filter.all'), value: '' },
            { label: 'DOCX', value: 'docx' },
            { label: 'DOC', value: 'doc' },
            { label: 'PPTX', value: 'pptx' },
            { label: 'PPT', value: 'ppt' },
            { label: 'PDF', value: 'pdf' },
        ],
        [t]
    );

    const orders = useMemo(
        () => [
            { label: t('filter.sortOptions.priceLow'), value: 'price' },
            { label: t('filter.sortOptions.priceHigh'), value: '-price' },
            { label: t('filter.sortOptions.views'), value: 'views' },
            {
                label: t('filter.sortOptions.purchased'),
                value: 'purchased_count',
            },
        ],
        [t]
    );

    const allTypes = useMemo(
        () => [
            {
                title: t('filter.all'),
                value: 'all',
                icon: <AppstoreOutlined />,
            },
            {
                title: t('filter.types.file'),
                value: 'file',
                icon: <FileTextOutlined />,
            },
            {
                title: t('filter.types.3d'),
                value: '3d',
                icon: <PictureOutlined />,
            },
            {
                title: t('filter.types.design'),
                value: 'design',
                icon: <LayoutOutlined />,
            },
            {
                title: t('filter.types.template'),
                value: 'template',
                icon: <CodeOutlined />,
            },
            {
                title: t('filter.types.website'),
                value: 'website',
                icon: <GlobalOutlined />,
            },
            {
                title: t('filter.types.video'),
                value: 'video',
                icon: <VideoCameraOutlined />,
            },
        ],
        [t]
    );

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
        delete newQueries.type;
        delete newQueries.file_type;
        delete newQueries.parentCategory;
        delete newQueries.category;
        delete newQueries.order_by;
        delete newQueries.page_from;
        delete newQueries.page_to;

        router.push(
            {
                pathname: router.pathname,
                query: {
                    page: 1,
                    keyword: router.query.keyword || '',
                    type: 'file',
                },
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
        const currentType = allTypes.find(
            (type) => type.value == router.query.type
        );
        const currentFileType = fileTypes.find(
            (type) => type.value == router.query.file_type
        );
        const currentParentCategory = childData?.results?.find(
            (cat) => cat.slug === router.query.parentCategory
        );

        const currentOrderBy = orders.find(
            (order) => order.value === router.query.order_by
        );

        return [
            {
                key: 'type',
                icon: currentType?.icon,
                title: currentType?.title,
                isEnabled: !!router.query.type,
                disabled: defaultValues.type === router.query.type,
                disabledTooltip: t('filter.tooltips.cannotDeleteDefault'),
                tooltip: t('filter.type'),
                action: () => deleteQuerySelectively('type'),
            },
            {
                key: 'file_type',
                icon: <LuFileType2 />,
                title: currentFileType?.label,
                tooltip: t('filter.fileType'),
                isEnabled: !!router.query.file_type,
                action: () => deleteQuerySelectively('file_type'),
            },
            {
                key: 'parentCategory',
                icon: <FaRegFile />,
                title: currentParentCategory?.name,
                tooltip: t('filter.parentCategory'),
                isEnabled: !!router.query.parentCategory,
                action: () =>
                    deleteQuerySelectively('parentCategory', 'category'),
            },
            {
                key: 'order_by',
                isEnabled: !!router.query.order_by,
                icon: <PiSortDescendingBold fontSize={16} />,
                tooltip: t('filter.sortBy'),
                title: currentOrderBy?.label,
                action: () => deleteQuerySelectively('order_by'),
            },
            {
                key: 'page_range-from',
                isEnabled:
                    !!router.query.page_from ||
                    Number(router.query.page_to || 100) < 100,
                disabled: !router.query.page_from,
                tooltip: t('filter.pageFrom'),
                disabledTooltip: t('filter.tooltips.cannotDeletePageFrom'),
                icon: <MdOutlineFirstPage fontSize={16} />,
                title: `${t('filter.pageFrom')}: ${
                    router.query.page_from || 1
                }`,
                action: () => deleteQuerySelectively('page_from'),
            },
            {
                key: 'page_range-to',
                isEnabled:
                    !!router.query.page_to ||
                    Number(router.query.page_from || 1) > 1,
                icon: <MdOutlineLastPage fontSize={16} />,
                tooltip: t('filter.pageTo'),
                disabledTooltip: t('filter.tooltips.cannotDeletePageTo'),
                title: `${t('filter.pageTo')}: ${router.query.page_to || 100}`,
                disabled: !router.query.page_to,
                action: () => deleteQuerySelectively('page_to'),
            },
        ];
    }, [router.query, childData, t, fileTypes, orders, allTypes]);

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
                    {t('filter.productCount', { count: total })}
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
                childData={childData}
                onClose={onClose}
                allTypes={allTypes}
                fileTypes={fileTypes}
                orders={orders}
            />
        </div>
    );
}

const FilterFormDrawer = ({
    open,
    childData,
    onClose,
    allTypes,
    fileTypes,
    orders,
}) => {
    const router = useRouter();
    const { t } = useTranslation('search');
    const initialFilterValues = useMemo(
        () => ({
            type: router.query.type || 'file',
            file_type: router.query.file_type || '',
            parentCategory: router.query.parentCategory || '',
            category: router.query.category || '',
            order_by: router.query.order_by || '',
            pageRange: [
                Number(router.query.page_from) || 1,
                Number(router.query.page_to) || 100,
            ],
        }),
        [router.query]
    );
    const [filterValues, setFilterValues] = useState(initialFilterValues);

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
        const { pageRange, ...restFilterValues } = filterValues;
        const newQueries = { ...router.query };

        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...newQueries,
                    ...restFilterValues,

                    page_from: pageRange[0] === 1 ? '' : pageRange[0],
                    page_to: pageRange[1] === 100 ? '' : pageRange[1],
                    page: 1,
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
                onSubmit={saveAndCloseForm}
                className="search_results_filter_form">
                <Select
                    style={{ width: '100%' }}
                    value={filterValues.type}
                    onClear={handleClear}
                    onChange={(value) =>
                        handleChangeFilterValues({
                            type: value,
                            parentCategory: '',
                            category: '',
                            file_type: '',
                            pageRange: [1, 100],
                        })
                    }>
                    {allTypes.map((item) => (
                        <Option key={item.value} value={item.value}>
                            <span className="d-flex align-items-center gap-2">
                                {item.icon} {item.title}
                            </span>
                        </Option>
                    ))}
                </Select>

                <Select
                    style={{ width: '100%' }}
                    placeholder={t('filter.fileType')}
                    value={filterValues.file_type || undefined}
                    disabled={filterValues?.type !== 'file'}
                    allowClear
                    onClear={() => handleChangeFilterValues({ file_type: '' })}
                    onChange={(value) =>
                        handleChangeFilterValues({ file_type: value })
                    }
                    options={fileTypes}
                />
                <Select
                    style={{ width: '100%' }}
                    placeholder={t('filter.parentCategory')}
                    value={filterValues.parentCategory || undefined}
                    disabled={!filterValues.type || filterValues.type === 'all'}
                    allowClear
                    onClear={() =>
                        handleChangeFilterValues({
                            parentCategory: '',
                            category: '',
                        })
                    }
                    onChange={(value) => {
                        const selected = childData?.results?.find(
                            (cat) => cat.slug === value
                        );
                        handleChangeFilterValues({
                            parentCategory: selected?.slug || '',
                            category: selected?.id,
                        });
                    }}
                    options={childData?.results?.map((cat) => ({
                        value: cat.slug,
                        label: cat.name,
                    }))}
                />
                <Select
                    placeholder={t('filter.sortBy')}
                    style={{
                        width: '100%',
                        maxWidth: '159px',
                    }}
                    value={filterValues.order_by || undefined}
                    allowClear
                    onClear={() => handleChangeFilterValues({ order_by: '' })}
                    onChange={(value) =>
                        handleChangeFilterValues({ order_by: value })
                    }
                    options={orders}
                />

                {filterValues.type === 'file' && (
                    <div className="ranger p-2 border rounded bg-light">
                        <p className="mb-0 fw-medium small">
                            {t('filter.pageRange')}
                        </p>
                        <Slider
                            range
                            min={1}
                            max={100}
                            value={filterValues.pageRange}
                            onChange={(val) =>
                                handleChangeFilterValues('pageRange', val)
                            }
                            style={{
                                margin: '6px',
                            }}
                        />
                        <div className="d-flex justify-content-between">
                            <span className="text-muted small">
                                {filterValues.pageRange[0]} {t('filter.pages')}
                            </span>
                            <span className="text-muted small">
                                {filterValues.pageRange[1]} {t('filter.pages')}
                            </span>
                        </div>
                    </div>
                )}

                <div className="actions">
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

export default SearchResultsProductsFilter;
