import React, { memo } from 'react'
import { Skeleton } from 'antd'
import UserShortInfo from './ui/user-short-info'
import UserTabs from './ui/user-tabs'
import { cn, useRcn } from '~/shared/utilities/cn'
import useResponsive from '~/shared/utilities/useResponsive'
import UserAccordians from './ui/user-accordians'

const UserProfile = ({ seller }) => {
    const { isMobile } = useResponsive()
    const gridClass = useRcn({
        mobile: "grid-cols-1",
        tablet: "grid-cols-1",
        desktop: "grid-cols-12"
    })

    const gapClass = useRcn({
        mobile: "gap-y-4",
        tablet: "gap-y-4",
        desktop: "gap-x-4"
    })

    return (
        <div className={cn("grid", gapClass, gridClass, "mb-5")}>
            <div className={cn("col-span-3")}>
                <UserShortInfo seller={seller} />
            </div>
            <div className={cn("col-span-9")}>
                {isMobile ? (
                    <UserAccordians seller={seller} />
                ) : (
                    <UserTabs seller={seller} />
                )}
            </div>
        </div>
    )
}

export default memo(UserProfile)
