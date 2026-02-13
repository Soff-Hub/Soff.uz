import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/user-tab-content.module.scss';
import { useSellerProducts } from '../api/useSellerProducts';
import { Skeleton, Select, Pagination, Input } from 'antd';
import ProductCard from '~/entities/product/product-card';
import { digitalDirections } from '~/shared/constants';
import ItemsNotFound from './items-not-found';
import useDebounce from '~/shared/hooks/useDebounce';

const UserProducts = ({ id, direction }) => {
    const router = useRouter();
    const page = parseInt(router.query.page || '1', 10);
    const type = router.query.type || direction || 'file';
    const searchQuery = router.query.search || '';
    const [searchInput, setSearchInput] = useState(searchQuery);
    const debounceSearch = useDebounce(searchInput, 700);

    const { data, isLoading, isFetching } = useSellerProducts(
        id,
        page,
        type,
        debounceSearch
    );

    const notFound = data?.results?.length === 0 && !isLoading && !isFetching;
    const products = data?.results || [];
    const total = data?.count || 0;

    const handleTypeChange = useCallback(
        (value) => {
            router.replace(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        type: value,
                        page: '1',
                    },
                },
                undefined,
                { shallow: true }
            );
        },
        [router]
    );

    const handlePageChange = useCallback(
        (p) => {
            router.replace(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        page: p.toString(),
                    },
                },
                undefined,
                { shallow: true }
            );
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        [router]
    );

    const renderedProducts = useMemo(() => {
        return products.map((p) => <ProductCard product={p} key={p.id} />);
    }, [products]);

    // Sync searchInput with query param on mount/query change
    useEffect(() => {
        setSearchInput(searchQuery);
    }, [searchQuery]);

    // Update query params when debounced search changes
    useEffect(() => {
        if (debounceSearch !== searchQuery) {
            router.replace(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        search: debounceSearch,
                        page: '1',
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [debounceSearch, searchQuery, router]);

    return (
        <div className={styles.tabContentContainer}>
            <div className={styles.filtersWrapper}>
                <Input.Search
                    className={styles.searchField}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Mahsulot qidirish..."
                />
                <Select
                    options={digitalDirections}
                    value={type}
                    onChange={handleTypeChange}
                    className={styles.typeSelect}
                />
            </div>

            {notFound && <ItemsNotFound type="product" />}

            {!isLoading && !isFetching && products.length !== 0 && (
                <div className={styles.contentWrapper}>
                    <div className={styles.itemsGrid}>
                        {renderedProducts}
                    </div>
                </div>
            )}
            {(isLoading || isFetching) && (
                <div className={`${styles.contentWrapper} ${styles.mobileSkeleton}`}>
                    <div className={styles.itemsGrid}>
                        <ProductSkeletonGrid />
                    </div>
                </div>
            )}

            {total > 1 ? (
                <div className={styles.paginationContainer}>
                    <Pagination
                        current={page}
                        total={total}
                        pageSize={36}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        hideOnSinglePage
                    />
                </div>
            ) : null}
        </div>
    );
};

export default UserProducts;

const ProductSkeletonGrid = () => {
    return Array.from({ length: 8 }).map((_, i) => (
        <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-3 w-full flex flex-col">
            <Skeleton.Image
                active
                style={{
                    width: '100%',
                    height: 160,
                    borderRadius: 12,
                    marginBottom: 8,
                }}
            />
            <Skeleton
                active
                title={false}
                paragraph={{ rows: 2, width: ['80%', '60%'] }}
            />
        </div>
    ));
};
