import React, { memo, useCallback, useMemo, useState } from 'react'
import { cn, useRcn } from '~/shared/utilities/cn'
import { useSellerProducts } from '../api/useSellerProducts'
import { Skeleton, Select, Pagination } from 'antd'
import ProductCard from '~/entities/product/product-card'
import { digitalDirections } from '~/shared/constants'
import ItemsNotFound from './items-not-found'
import useResponsive from '~/shared/utilities/useResponsive'

const UserProducts = ({ id }) => {
    const [page, setPage] = useState(1)
    const [type, setType] = useState("file")
    const { data, isLoading, isFetching } = useSellerProducts(id, page, type)
    const { isMobile } = useResponsive()

    const notFound = data?.results?.length === 0 && !isLoading && !isFetching
    const products = data?.results || []
    const total = data?.count || 0

    const gridClass = useRcn({
        mobile: "grid-cols-2",
        tablet: "grid-cols-3",
        desktop: "grid-cols-4"
    })



    const handleTypeChange = useCallback((value) => {
        setType(value)
        setPage(1)
    }, [])

    const handlePageChange = useCallback(p => {
        setPage(p)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const renderedProducts = useMemo(() => {
        return products.map(p => <ProductCard product={p} key={p.id} />)
    }, [products])


    const PaginationComponent = useMemo(() => (
        <Pagination
            current={page}
            total={total}
            pageSize={36}
            onChange={handlePageChange}
            showSizeChanger={false}
            hideOnSinglePage
        />
    ), [page, total])

    return (
        <div className={cn("w-full", isMobile ? "" : "my-4")}>
            <div className={cn("mb-3", "flex", "justify-end")}>
                <Select
                    options={digitalDirections}
                    value={type}
                    onChange={handleTypeChange}
                    style={{ width: 250 }}
                />
            </div>

            {notFound &&
                <ItemsNotFound type="product" />
            }

            <div
                className={cn(
                    "grid",
                    "gap-2",
                    gridClass,
                    "rounded-xl",
                    !isMobile ? "bg-light" : "",
                    !isMobile ? "p-3" : "",
                    !isMobile ? "shadow" : ""
                )}
            >
                {(isLoading || isFetching) && <ProductSkeletonGrid />}

                {!isLoading && !isFetching && renderedProducts}
            </div>

            {total > 0 && (
                <div className={cn("flex", "justify-center", "mt-4")}>
                    {PaginationComponent}
                </div>
            )}
        </div>
    )
}

export default memo(UserProducts)


const ProductSkeletonGrid = memo(() => {
    const skeletonItems = useMemo(() =>
        Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={cn("bg-white", "rounded-xl", "shadow-sm", "p-3", "w-full", "flex", "flex-col")}>
                <Skeleton.Image
                    active
                    style={{ width: '100%', height: 160, borderRadius: 12, marginBottom: 8 }}
                />
                <Skeleton active title={false} paragraph={{ rows: 2, width: ['80%', '60%'] }} />
            </div>
        ))
        , [])

    return <>{skeletonItems}</>
})
