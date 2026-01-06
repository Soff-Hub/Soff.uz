import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { baseUrlUseApi } from '~/repositories/useApi';
import { Button, Checkbox, Drawer, Input, Select, Slider } from 'antd';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { useDisableWindowScroll } from '~/shared/hooks/useDisableWindowScroll';
import { LuSettings2 } from 'react-icons/lu';
import { useQuery } from '@tanstack/react-query';
import {
    getFilterQueryParams,
    buildCategoryPath,
    getCategoryFromRouter,
} from '~/shared/utilities/filterHelpers';

export const getTitleFromSlug = (array, slug) => {
    let title = null;

    if (array && slug) {
        title = array.find((item) => {
            return item.slug == slug;
        })?.name;
    }
    return title;
};

export const clearEmptyQueries = (obj) => {
    const newObj = { ...obj };
    Object.keys(newObj).forEach((key) => {
        if (!String(newObj[key])) {
            delete newObj[key];
        }
    });
    return newObj;
};

const ProductFilterSection = ({ child, parent, path, isFile, title }) => {
    const [showParentArrow, setShowParentArrow] = useState(false);
    const [showChildArrow, setShowChildArrow] = useState(false);
    const [search, setSearch] = useState(undefined);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const parentRef = useRef(null);
    const childRef = useRef(null);
    const { isMobile } = useResponsive();
    const router = useRouter();
    const { query, push } = router;
    const { search: querySearch, parentCategory, childCategory } = query;
    const debouncedSearch = useDebounce(search, 500);

    const handleParent = (slug, id) => {
        // Get filter-only query params (preserves price_from, price_to, search, page, etc.)
        const filterQuery = getFilterQueryParams(query);

        // Build new path with parent category (SSG structure)
        const newPathname = buildCategoryPath(path, slug);

        // Navigate with preserved filters (shallow: true prevents getStaticProps from running)
        push(
            {
                pathname: newPathname,
                query: filterQuery,
            },
            undefined,
            { shallow: true }
        );
    };

    const handleChild = (slug, id) => {
        // Get current parent category from router
        const currentParent =
            parentCategory || getCategoryFromRouter(router).parentCategory;

        if (!currentParent) {
            console.warn('Parent category not found for child navigation');
            return;
        }

        // Get filter-only query params
        const filterQuery = getFilterQueryParams(query);

        // Build new path with parent and child category (SSG structure)
        const newPathname = buildCategoryPath(path, currentParent, slug);

        // Navigate with preserved filters (shallow: true prevents getStaticProps from running)
        push(
            {
                pathname: newPathname,
                query: filterQuery,
            },
            undefined,
            { shallow: true }
        );
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
        const newQuery = { ...query };
        delete newQuery.similar_documents;
        push(
            {
                pathname: router.pathname,
                query: { ...newQuery, search: debouncedSearch },
            },
            undefined,
            { shallow: true }
        ); // shallow: true prevents getStaticProps from running
    }, [debouncedSearch]);

    useDisableWindowScroll(drawerOpen);

    return (
        <div className={`${styles.filter} container`}>
            <h1 className={styles.title}>
                {title ? title.split('-').join('&') : 'Barcha mahsulotlar'}
            </h1>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                }}>
                {!isMobile && (
                    <Button
                        size="large"
                        type="primary"
                        onClick={() => setDrawerOpen(true)}>
                        <LuSettings2 fontSize={20} />
                    </Button>
                )}
                <div className={`${styles.searchBox} container`}>
                    <Input
                        defaultValue={querySearch || ''}
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
                    {parent?.map((cat) => (
                        <span
                            key={cat.id}
                            onClick={() => handleParent(cat.slug, cat.id)}
                            className={`${styles.parentCat} ${
                                (parentCategory === cat.slug ||
                                    query.slug === cat.slug) &&
                                styles.active
                            }`}>
                            {cat.name}
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
            {parentCategory && child?.length ? (
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
                                onClick={() => handleChild(cat?.slug, cat?.id)}
                                className={`${styles.childCat} ${
                                    (childCategory === cat.slug ||
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

            {isMobile && (
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
            )}
            <ProductFilterForm
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                path={path}
                isFile={isFile}
                parent={parent}
                child={child}
            />
        </div>
    );
};

const ProductFilterForm = ({ open, onClose, path, isFile, parent, child }) => {
    const [selectedCategory, setSelectedCategory] = useState({
        slug: null,
        id: null,
    });
    const [selectedSubCategory, setSelectedSubCategory] = useState({
        slug: null,
        id: null,
    });
    const [fileTypes, setFileTypes] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [pageRange, setPageRange] = useState([0, 100]);
    const isEnableChanged = useRef(false);
    const { isMobile } = useResponsive();
    const router = useRouter();
    const { query, push } = router;

    const isChildOptionsEnabled =
        open &&
        ((Boolean(selectedCategory?.slug) &&
            selectedCategory?.slug !== query.parentCategory) ||
            isEnableChanged.current);

    const { data: childData, isFetchingChildData } = useQuery({
        queryKey: ['child-categories', selectedCategory?.slug],
        queryFn: async () => {
            const res = await fetch(
                `${baseUrlUseApi}customer/four-child?direction=file&parent__slug=${selectedCategory?.slug}`
            );
            isEnableChanged.current = true;
            return await res.json();
        },
        enabled: isChildOptionsEnabled,
    });

    const parentOptions = useMemo(() => {
        return parent?.map((item) => ({
            label: item.name,
            value: item.slug,
            id: item.id,
        }));
    }, [parent]);

    const childOptions = useMemo(() => {
        if (childData?.results && childData.results.length) {
            return childData.results.map((item) => ({
                label: item.name,
                value: item.slug,
                id: item.id,
            }));
        }
        return child?.map((item) => ({
            label: item.name,
            value: item.slug,
            id: item.id,
        }));
    }, [child, childData]);

    useEffect(() => {
        if (open) {
            // Get categories from query (Next.js extracts dynamic route params into query)
            // Fallback to getCategoryFromRouter for edge cases
            const { parentCategory: pathParent, childCategory: pathChild } =
                getCategoryFromRouter(router);
            const currentParent = query.parentCategory || pathParent;
            const currentChild = query.childCategory || pathChild;

            setSelectedCategory({
                slug: currentParent,
                id: query.parentCategoryId,
            });
            setSelectedSubCategory({
                slug: currentChild,
                id: query.childCategoryId,
            });
            setFileTypes(
                query.content_extensions
                    ? Array.isArray(query.content_extensions)
                        ? query.content_extensions
                        : [query.content_extensions]
                    : []
            );
            setPriceRange([
                query.price_from ? Number(query.price_from) : 0,
                query.price_to ? Number(query.price_to) : 500000,
            ]);
            setPageRange([
                query.from_page ? Number(query.from_page) : 0,
                query.to_page ? Number(query.to_page) : 100,
            ]);
        }
    }, [open]);

    const handleSaveOnClose = () => {
        // Build filter-only query params (categories go in path, not query)
        const filterQuery = {
            ...getFilterQueryParams(query),
            content_extensions: fileTypes.length > 0 ? fileTypes : undefined,
            price_from: priceRange[0] > 0 ? priceRange[0] : undefined,
            price_to: priceRange[1] < 500000 ? priceRange[1] : undefined,
            from_page: pageRange[0] > 0 ? pageRange[0] : undefined,
            to_page: pageRange[1] < 100 ? pageRange[1] : undefined,
        };

        // Remove undefined values
        Object.keys(filterQuery).forEach((key) => {
            if (
                filterQuery[key] === undefined ||
                filterQuery[key] === null ||
                filterQuery[key] === ''
            ) {
                delete filterQuery[key];
            }
        });

        // Build category path (SSG structure)
        const categoryPath = buildCategoryPath(
            path,
            selectedCategory?.slug || null,
            selectedSubCategory?.slug || null
        );

        push(
            {
                pathname: categoryPath,
                query: filterQuery,
            },
            undefined,
            { shallow: true }
        ); // shallow: true prevents getStaticProps from running
        onClose();
    };

    const handleClear = () => {
        // Navigate to base path (no categories, no filters)
        const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
        push(
            {
                pathname: cleanPath,
                query: {},
            },
            undefined,
            { shallow: true }
        ); // shallow: true prevents getStaticProps from running
        onClose();
    };

    return (
        <Drawer
            destroyOnClose
            style={{
                borderRadius: isMobile ? '20px 20px 0 0' : '0',
            }}
            placement={isMobile ? 'bottom' : 'left'}
            onClose={handleSaveOnClose}
            open={open}
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
                    defaultValue={query.parentCategory || undefined}
                    onChange={(val, valObj) => {
                        if (!val) {
                            setSelectedCategory(undefined);
                        } else {
                            setSelectedCategory({
                                slug: val,
                                id: valObj.id,
                            });
                        }
                    }}
                    options={parentOptions}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                />
            </div>

            {/* Sub kategoriya Select */}
            {selectedCategory?.slug && (
                <div style={{ marginBottom: 24 }}>
                    <h4>Sub kategoriya</h4>
                    <Select
                        loading={isFetchingChildData}
                        placeholder="Sub kategoriyani tanlang"
                        style={{ width: '100%' }}
                        allowClear
                        defaultValue={query.childCategory || undefined}
                        onChange={(val, valObj) => {
                            if (!val) {
                                setSelectedSubCategory(undefined);
                            } else {
                                setSelectedSubCategory({
                                    slug: val,
                                    id: valObj.id,
                                });
                            }
                        }}
                        options={childOptions}
                        getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode
                        }
                    />
                </div>
            )}

            {isFile && (
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
            )}

            <div style={{ marginBottom: 24 }}>
                <h4>Narx oralig‘i</h4>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <span>{formatCurrencyWithSpace(priceRange[0])} so'm</span>
                    <span>{formatCurrencyWithSpace(priceRange[1])} so'm</span>
                </div>
                <Slider
                    range
                    min={0}
                    max={1000000}
                    value={priceRange}
                    onChange={(value) => setPriceRange(value)}
                />
            </div>

            {isFile && (
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
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <Button block onClick={handleClear}>
                    Filtrni tozalash
                </Button>

                <Button type="primary" block onClick={handleSaveOnClose}>
                    Filtrni qo‘llash
                </Button>
            </div>
        </Drawer>
    );
};
export default ProductFilterSection;
