import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { cn, useRcn } from '~/shared/utilities/cn';
import { useSellerProducts } from '../api/useSellerProducts';
import { Skeleton, Select, Pagination, Input } from 'antd';
import ProductCard from '~/entities/product/product-card';
import { digitalDirections } from '~/shared/constants';
import ItemsNotFound from './items-not-found';
import useResponsive from '~/shared/utilities/useResponsive';
import useDebounce from '~/shared/hooks/useDebounce';

const UserProducts = ({ id, direction }) => {
    const [page, setPage] = useState(1);
    const [type, setType] = useState(direction || 'file');
    const [search, setSearch] = useState('');
    const debounceSearch = useDebounce(search, 700);
    const { data, isLoading, isFetching } = useSellerProducts(
        id,
        page,
        type,
        debounceSearch
    );
    const { isMobile } = useResponsive();

    const notFound = data?.results?.length === 0 && !isLoading && !isFetching;
    const products = data?.results || [];
    const total = data?.count || 0;

    const gridClass = useRcn({
        mobile: 'grid-cols-2',
        tablet: 'grid-cols-3',
        desktop: 'grid-cols-4',
    });

    const flexClass = useRcn({
        mobile: 'flex-col',
        tablet: 'flex-row',
        desktop: 'flex-row',
    });

    const handleTypeChange = useCallback((value) => {
        setType(value);
        setPage(1);
    }, []);

    const handlePageChange = useCallback((p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const renderedProducts = useMemo(() => {
        return products.map((p) => <ProductCard product={p} key={p.id} />);
    }, [products]);

    const PaginationComponent = useMemo(
        () => (
            <Pagination
                current={page}
                total={total}
                pageSize={36}
                onChange={handlePageChange}
                showSizeChanger={false}
                hideOnSinglePage
            />
        ),
        [page, total]
    );

    useEffect(() => {
        setPage(1);
    }, [debounceSearch]);

    return (
        <div
            className={cn(
                'w-full',
                'h-full',
                'flex-1',
                'flex',
                'flex-col',
                'gap-4'
            )}>
            <div
                className={cn(
                    // 'mb-4',
                    'flex',
                    'justify-between',
                    'items-center',
                    'gap-2',
                    flexClass
                )}>
                <Input.Search
                    className={cn('flex-1')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Mahsulot qidirish..."
                />
                <Select
                    options={digitalDirections}
                    value={type}
                    onChange={handleTypeChange}
                    className={cn('flex-1', 'w-full')}
                />
            </div>

            {notFound && <ItemsNotFound type="product" />}

            {!isLoading && !isFetching && products.length !== 0 && (
                <div
                    className={cn(
                        'rounded-xl',
                        'bg-light',
                        'p-3',
                        'shadow',
                        'flex-1'
                        // 'h-min-80'
                    )}>
                    <div className={cn('grid', 'gap-2', gridClass)}>
                        {renderedProducts}
                    </div>
                </div>
            )}
            {(isLoading || isFetching) && (
                <div
                    className={cn(
                        'rounded-xl',
                        !isMobile ? 'bg-light' : '',
                        !isMobile ? 'p-3' : '',
                        !isMobile ? 'shadow' : '',
                        'flex-1'
                    )}>
                    <div className={cn('grid', 'gap-2', gridClass)}>
                        <ProductSkeletonGrid />
                    </div>
                </div>
            )}

            {total > 1 ? (
                <div className={cn('flex', 'justify-center')}>
                    {PaginationComponent}
                </div>
            ) : null}
        </div>
    );
};

export default memo(UserProducts);

const ProductSkeletonGrid = memo(() => {
    const skeletonItems = useMemo(
        () =>
            Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        'bg-white',
                        'rounded-xl',
                        'shadow-sm',
                        'p-3',
                        'w-full',
                        'flex',
                        'flex-col'
                    )}>
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
            )),
        []
    );

    return <>{skeletonItems}</>;
});
