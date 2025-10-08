import { Skeleton } from 'antd'
import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'
import ServiceCard from '~/entities/service/service-card'
import { SELLER_SERVICES } from '~/shared/api/end-points'
import { useFGet } from '~/shared/hooks/useFApi'
import { cn, useRcn } from '~/shared/utilities/cn'
import ItemsNotFound from './items-not-found'
import useResponsive from '~/shared/utilities/useResponsive'

const UserServices = () => {
    const router = useRouter()
    const { pid } = router.query
    const { isMobile } = useResponsive()
    const { data, isLoading } = useFGet(`${pid}-service`, `${SELLER_SERVICES}${pid}`, {
        enabled: !!pid,
        token: null,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    })

    const gridClass = useRcn({
        mobile: "grid-cols-2",
        tablet: "grid-cols-2",
        desktop: "grid-cols-3"
    })

    const notFound = !isLoading && (!Array.isArray(data) || data.length === 0)

    if (notFound) return (
        <div className={cn("w-full", "my-4")}>
            <ItemsNotFound type='service' />
        </div>
    )

    return (
        <div className={cn("w-full", "my-4")}>
            <div
                className={cn(
                    "grid",
                    "gap-4",
                    gridClass,
                    "rounded-xl",
                    !isMobile ? "bg-light" : "",
                    !isMobile ? "p-3" : "",
                    !isMobile ? "shadow" : ""
                )}
            >
                {data?.map(service =>
                    <ServiceCard service={service} key={service.id} />
                )}
                {isLoading && <ServiceSkeletonGrid />}
            </div>
        </div>
    )
}

export default memo(UserServices)


const ServiceSkeletonGrid = memo(() => {
    const skeletonItems = useMemo(() =>
        Array.from({ length: 6 }).map((_, i) => (
            <Skeleton.Image
                key={i}
                active
                style={{ width: '100%', height: 200, borderRadius: '12px' }}
            />
        )), [])

    return (
        <>{skeletonItems}</>
    )
})
