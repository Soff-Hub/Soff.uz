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

const fileTypes = [
    { label: 'Barchasi', value: '' },
    { label: 'DOCX', value: 'docx' },
    { label: 'DOC', value: 'doc' },
    { label: 'PPTX', value: 'pptx' },
    { label: 'PPT', value: 'ppt' },
    { label: 'PDF', value: 'pdf' },
];
const { Option } = Select;

const orders = [
    { label: 'Narx (arzon)', value: 'price' },
    { label: 'Narx (qimmat)', value: '-price' },
    { label: "Ko'p ko‘rilganlar bo‘yicha", value: 'views' },
    { label: 'Ko‘p xarid qilingan', value: 'purchased_count' },
];

const allTypes = [
    { title: 'Barchasi', value: 'all', icon: <AppstoreOutlined /> },
    { title: 'Fayllar', value: 'file', icon: <FileTextOutlined /> },
    { title: '3D modellar', value: '3d', icon: <PictureOutlined /> },
    {
        title: 'Dizayn shablonlar',
        value: 'design',
        icon: <LayoutOutlined />,
    },
    {
        title: 'Turli shablonlar',
        value: 'template',
        icon: <CodeOutlined />,
    },
    { title: 'Veb saytlar', value: 'website', icon: <GlobalOutlined /> },
    { title: 'Videolar', value: 'video', icon: <VideoCameraOutlined /> },
];

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
                disabledTooltip:
                    "Bu qiymat standart sozlamaligi uchun o'chira olmaysiz, filtr orqali o'zgartiring",
                tooltip: 'Turi',
                action: () => deleteQuerySelectively('type'),
            },
            {
                key: 'file_type',
                icon: <LuFileType2 />,
                title: currentFileType?.label,
                tooltip: 'Fayl turi',
                isEnabled: !!router.query.file_type,
                action: () => deleteQuerySelectively('file_type'),
            },
            {
                key: 'parentCategory',
                icon: <FaRegFile />,
                title: currentParentCategory?.name,
                tooltip: 'Katta kategoriya',
                isEnabled: !!router.query.parentCategory,
                action: () =>
                    deleteQuerySelectively('parentCategory', 'category'),
            },
            {
                key: 'order_by',
                isEnabled: !!router.query.order_by,
                icon: <PiSortDescendingBold fontSize={16} />,
                tooltip: 'Saralash',
                title: currentOrderBy?.label,
                action: () => deleteQuerySelectively('order_by'),
            },
            {
                key: 'page_range-from',
                isEnabled:
                    !!router.query.page_from ||
                    Number(router.query.page_to || 100) < 100,
                disabled: !router.query.page_from,
                tooltip: 'Betlar soni dan',
                disabledTooltip:
                    "Bu qiymat standart sozlamaligi uchun o'chira olmaysiz, avval bet gacha qiymatini o'chiring",
                icon: <MdOutlineFirstPage fontSize={16} />,
                title: `Bet dan: ${router.query.page_from || 1}`,
                action: () => deleteQuerySelectively('page_from'),
            },
            {
                key: 'page_range-to',
                isEnabled:
                    !!router.query.page_to ||
                    Number(router.query.page_from || 1) > 1,
                icon: <MdOutlineLastPage fontSize={16} />,
                tooltip: 'Betlar soni gacha',
                disabledTooltip:
                    "Bu qiymat standart sozlamaligi uchun o'chira olmaysiz, avval bet dan qiymatini o'chiring",
                title: `Bet gacha: ${router.query.page_to || 100}`,
                disabled: !router.query.page_to,
                action: () => deleteQuerySelectively('page_to'),
            },
        ];
    }, [router.query, childData]);

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
                                title={'Barcha filterlarni tozalash'}>
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
                                Filter
                            </Button>
                        </Badge>
                    </div>
                </Card>
            ) : null}
            <div className="search_results_indicator">
                <p className="countProduct text-nowrap m-0">
                    {`${total} ta mahsulot topildi`}
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
                                Filter
                            </Button>
                        </Badge>
                    </div>
                )}
            </div>
            <FilterFormDrawer
                open={filterOpen}
                childData={childData}
                onClose={onClose}
            />
        </div>
    );
}

const FilterFormDrawer = ({ open, childData, onClose }) => {
    const router = useRouter();
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
            title="Filterlar"
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
                    placeholder="Fayl turi"
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
                    placeholder="Katta kategoriya"
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
                    placeholder="Saralash"
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
                        <p className="mb-0 fw-medium small">Betlar soni</p>
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
                                {filterValues.pageRange[0]} bet
                            </span>
                            <span className="text-muted small">
                                {filterValues.pageRange[1]} bet
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
                        Tozalash
                    </Button>
                    <Button htmlType="submit" type="primary" block>
                        Qo‘llash
                    </Button>
                </div>
            </form>
        </Drawer>
    );
};

export default SearchResultsProductsFilter;
