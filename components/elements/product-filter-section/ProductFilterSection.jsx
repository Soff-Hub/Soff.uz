import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductFilter.module.scss';
import {
    SearchOutlined,
    RightOutlined,
    LeftOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import useDebounce from '~/shared/hooks/useDebounce';
import useResponsive from '~/shared/utilities/useResponsive';
import { Button, Checkbox, Drawer, Input, Select, Slider } from 'antd';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { useDisableWindowScroll } from '~/shared/hooks/useDisableWindowScroll';
import { LuSettings2 } from 'react-icons/lu';

export const getTitleFromSlug = (array, slug) => {
    let title = null;

    if (array && slug) {
        title = array.find((item) => {
            return item.slug == slug;
        })?.name;
    }
    return title;
};

const ProductFilterSection = ({ child, parent, path, isFile }) => {
    const { query, pathname, push } = useRouter();
    const parentRef = useRef(null);
    const childRef = useRef(null);
    const [showParentArrow, setShowParentArrow] = useState(false);
    const [showChildArrow, setShowChildArrow] = useState(false);
    const [title, setTitle] = useState('Barchasi');
    const [sybTitle, setSybTitle] = useState('');
    const [search, setSearch] = useState(undefined);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { isMobile } = useResponsive();
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedSubCategory, setSelectedSubCategory] = useState();
    const [fileTypes, setFileTypes] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [pageRange, setPageRange] = useState([0, 100]);

    const debouncedSearch = useDebounce(search, 500);
    // Prevent body scroll when drawer is open
    useDisableWindowScroll(drawerOpen);

    const handleParent = (slug, name) => {
        push({
            pathname: `${path}${slug}`,
            query: {
                ...query,
                parentCategory: slug,
                childCategory: '',
                title: name,
            },
        });
        setTitle(name);
        setSybTitle('');
    };

    const handleChild = (slug, name) => {
        push({
            pathname: `${path}${slug}`,
            query: { ...query, childCategory: slug, title: title },
        });
        setSybTitle(name);
    };

    const scrollLeft = (ref) => {
        ref.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = (ref) => {
        ref.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    useEffect(() => {
        const childCont = childRef.current;
        if (!childCont) return;

        setShowChildArrow(childCont.scrollWidth > childCont.clientWidth);
    }, [child]);

    useEffect(() => {
        const parentCont = parentRef.current;
        if (!parentCont) return;

        setShowParentArrow(parentCont.scrollWidth > parentCont.clientWidth);
    }, [parent]);

    useEffect(() => {
        if (debouncedSearch === undefined) return;

        push({
            pathname: `${path}all`,
            query: { ...query, search: debouncedSearch },
        });
    }, [debouncedSearch]);

    useEffect(() => {
        if (query.title) {
            setTitle(query.title);
        }
    }, [query.title]);

    return (
        <div className={`${styles.filter} container`}>
            <h1 className={styles.title}>
                {(title || 'Barchasi').replace('-', ' ')}
                {sybTitle && ` & ${sybTitle.replace(`${title}-`, ' ')}`}
            </h1>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                }}>
                {!isMobile && (
                    <>
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => setDrawerOpen(true)}>
                            <LuSettings2 fontSize={20} />
                        </Button>
                    </>
                )}
                <div className={`${styles.searchBox} container`}>
                    <Input
                        value={search}
                        allowClear
                        variant="borderless"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Qanday mahsulot izlamoqdasiz?"
                        className={styles.input}
                        type="text"
                    />
                    <span className={styles.searchIcon}>
                        <SearchOutlined />
                    </span>
                </div>
            </div>

            {/* Parent carousel */}
            <div className={styles.carouselTestWrapper}>
                {showParentArrow && (
                    <LeftOutlined
                        className={`${styles.arrow} ${styles.left}`}
                        onClick={() => scrollLeft(parentRef)}
                    />
                )}
                <div
                    className={styles.carouselTest}
                    ref={parentRef}
                    style={{
                        justifyContent: showParentArrow ? 'start' : 'center',
                    }}>
                    {parent?.map((cat, index) => (
                        <span
                            key={cat.slug}
                            onClick={() => handleParent(cat?.slug, cat?.name)}
                            className={`${styles.parentCat} ${
                                (query.parentCategory === cat.slug ||
                                    query.slug === cat.slug) &&
                                styles.active
                            }`}>
                            {cat?.name}
                        </span>
                    ))}
                </div>
                {showParentArrow && (
                    <RightOutlined
                        className={`${styles.arrow} ${styles.right}`}
                        onClick={() => scrollRight(parentRef)}
                    />
                )}
            </div>

            {/* Child carousel */}
            {query?.parentCategory && child?.length ? (
                <div className={styles.carouselTestWrapper}>
                    {showChildArrow && (
                        <LeftOutlined
                            className={`${styles.arrow} ${styles.left}`}
                            onClick={() => scrollLeft(childRef)}
                        />
                    )}
                    <div
                        className={styles.carouselTest}
                        ref={childRef}
                        style={{
                            justifyContent: showChildArrow ? 'start' : 'center',
                        }}>
                        {child.map((cat) => (
                            <span
                                key={cat.slug}
                                onClick={() =>
                                    handleChild(cat?.slug, cat?.name)
                                }
                                className={`${styles.childCat} ${
                                    (query.childCategory === cat.slug ||
                                        query.slug === cat.slug) &&
                                    styles.active
                                }`}>
                                {cat?.name}
                            </span>
                        ))}
                    </div>
                    {showChildArrow && (
                        <RightOutlined
                            className={`${styles.arrow} ${styles.right}`}
                            onClick={() => scrollRight(childRef)}
                        />
                    )}
                </div>
            ) : null}

            {isMobile && isFile && (
                <>
                    <Button
                        type="primary"
                        block
                        style={{
                            marginBottom: 30,
                        }}
                        onClick={() => setDrawerOpen(true)}>
                        <LuSettings2 />
                        Filtrlarni ochish
                    </Button>
                </>
            )}
            <Drawer
                style={{
                    borderRadius: isMobile ? '20px 20px 0 0' : '0',
                }}
                placement={isMobile ? 'bottom' : 'left'}
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                height="90%"
                closeIcon={
                    <Button
                        type="text"
                        shape="circle"
                        icon={
                            <CloseOutlined
                                style={{
                                    fontSize: 20,
                                    color: '#00a44f',
                                }}
                            />
                        }
                    />
                }
                headerStyle={{
                    flexDirection: 'column-reverse',
                    alignItems: 'flex-end',
                }}>
                {/* Kategoriya Select */}
                <div style={{ marginBottom: 24 }}>
                    <h4>Kategoriya</h4>
                    <Select
                        placeholder="Kategoriya tanlang"
                        style={{ width: '100%' }}
                        allowClear
                        value={query.parentCategory || undefined}
                        onChange={(val) => {
                            if (!val) {
                                setSelectedCategory(undefined);
                                setSybTitle('');
                                push({
                                    pathname: `${path}all`,
                                    query: {
                                        ...query,
                                        parentCategory: '',
                                        childCategory: '',
                                        title: 'Barchasi',
                                    },
                                });
                                setTitle('Barchasi');
                            } else {
                                setSelectedCategory(val);
                                // shu yerda handleParent ishlatyapmiz
                                const category = parent.find(
                                    (item) => item.slug === val
                                );
                                if (category)
                                    handleParent(category.slug, category.name);
                            }
                        }}
                        options={parent.map((item) => ({
                            label: item.name,
                            value: item.slug,
                        }))}
                        getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode
                        }
                    />
                </div>

                {/* Sub kategoriya Select */}
                {query?.parentCategory && (
                    <div style={{ marginBottom: 24 }}>
                        <h4>Sub kategoriya</h4>
                        <Select
                            placeholder="Sub kategoriyani tanlang"
                            style={{ width: '100%' }}
                            allowClear
                            value={query.childCategory || undefined}
                            onChange={(val) => {
                                if (!val) {
                                    setSelectedSubCategory(undefined);
                                    push({
                                        pathname,
                                        query: {
                                            ...query,
                                            childCategory: '',
                                            title,
                                        },
                                    });
                                    setSybTitle('');
                                } else {
                                    setSelectedSubCategory(val);
                                    const subCategory = child.find(
                                        (item) => item.slug === val
                                    );
                                    if (subCategory)
                                        handleChild(
                                            subCategory.slug,
                                            subCategory.name
                                        );
                                }
                            }}
                            options={child.map((item) => ({
                                label: item.name,
                                value: item.slug,
                            }))}
                            getPopupContainer={(triggerNode) =>
                                triggerNode.parentNode
                            }
                        />
                    </div>
                )}

                <div style={{ marginBottom: 24 }}>
                    <h4>Fayl turlari</h4>
                    <Checkbox.Group
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                        }}
                        value={fileTypes}
                        onChange={(vals) => setFileTypes(vals)}
                        options={[
                            { label: 'DOCX', value: '.docx' },
                            { label: 'DOC', value: '.doc' },
                            { label: 'PPTX', value: '.pptx' },
                            { label: 'PPT', value: '.ppt' },
                            { label: 'PDF', value: '.pdf' },
                        ]}
                    />
                </div>

                <div style={{ marginBottom: 24 }}>
                    <h4>Narx oralig‘i</h4>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <span>
                            {formatCurrencyWithSpace(priceRange[0])} so'm
                        </span>
                        <span>
                            {formatCurrencyWithSpace(priceRange[1])} so'm
                        </span>
                    </div>
                    <Slider
                        range
                        min={0}
                        max={1000000}
                        value={priceRange}
                        onChange={(value) => setPriceRange(value)}
                    />
                </div>

                <div>
                    <h4>Varoqlar oralig‘i</h4>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <span>{pageRange[0]} bet</span>
                        <span>{pageRange[1]} bet</span>
                    </div>
                    <Slider
                        range
                        min={0}
                        max={100}
                        value={pageRange}
                        onChange={(value) => setPageRange(value)}
                    />
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                    <Button
                        block
                        onClick={() => {
                            setSelectedCategory(undefined);
                            setSelectedSubCategory(undefined);
                            setFileTypes([]);
                            setPriceRange([0, 500000]);
                            setPageRange([0, 100]);
                            setTitle('Barchasi');
                            setSybTitle('');

                            push({
                                pathname: `${path}all`,
                                query: {
                                    ...query,
                                    parentCategory: '',
                                    childCategory: '',
                                    title: 'Barchasi',
                                },
                            });

                            setDrawerOpen(false);
                        }}>
                        Filtrni tozalash
                    </Button>

                    <Button
                        type="primary"
                        block
                        onClick={() => {
                            const filters = {
                                category:
                                    selectedSubCategory ||
                                    selectedCategory ||
                                    '',
                                content_extensions: fileTypes,
                                price_from: priceRange[0],
                                price_to: priceRange[1],
                                from_page: pageRange[0],
                                to_page: pageRange[1],
                            };

                            push({
                                pathname,
                                query: { ...query, ...filters },
                            });

                            setDrawerOpen(false);
                        }}>
                        Filtrni qo‘llash
                    </Button>
                </div>
            </Drawer>
        </div>
    );
};

export default ProductFilterSection;
