import React, { memo, useMemo } from 'react'
import { cn } from '~/shared/utilities/cn'
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
    FileTextOutlined,
    ShoppingOutlined
} from '@ant-design/icons'
import UserCommentsTabs from './user-comments-tabs'
import useResponsive from '~/shared/utilities/useResponsive'

const UserInfo = ({ seller, commentRef }) => {
    const { isMobile } = useResponsive()
    const stats = useMemo(() => [
        {
            title: "Jarayondagi ishlar",
            value: seller?.progress_jobs_count || 0,
            icon: <SyncOutlined className={cn("text-info", "text-[30px]")} />,
        },
        {
            title: "Muvaffaqiyatli ishlar",
            value: seller?.successful_jobs_count || 0,
            icon: <CheckCircleOutlined className={cn("text-primary", "text-[30px]")} />,
        },
        {
            title: "Muvaffaqiyatsiz ishlar",
            value: seller?.unsuccessful_jobs_count || 0,
            icon: <CloseCircleOutlined className={cn("text-danger", "text-[30px]")} />,
        },
        {
            title: "Yuklangan mahsulotlar",
            value: seller?.total_products_count || 0,
            icon: <FileTextOutlined className={cn("text-purple", "text-[30px]")} />,
        },
        {
            title: "Sotilgan mahsulotlar",
            value: seller?.total_sold_documents || 0,
            icon: <ShoppingOutlined className={cn("text-warning", "text-[30px]")} />,
        },
    ], [seller])

    return (
        <div>
            {seller?.bio && (
                <div className={cn("bg-light", "p-4", "shadow", "rounded-xl", "w-full", "mt-5")}>
                    <h3 className={cn("mb-3", "text-lg", "font-semibold")}>Muallif haqida</h3>
                    <p className={cn("m-0", "text-secondary")}>{seller?.bio}</p>
                </div>
            )}
            <div className={cn("flex", "flex-wrap", "gap-4", "mt-5")}>
                {stats.map((stat, index) => (
                    <StatCard stat={stat} key={index} className="flex-1" />
                ))}
            </div>
            {!isMobile && 
                <div ref={commentRef} style={{ scrollMarginTop: '120px' }}>
                    <UserCommentsTabs id={seller?.id} />
                </div>
            }
        </div>
    )
}

export default memo(UserInfo)


const StatCard = memo(({ stat, className }) => {
    return (
        <div
            className={cn(
                "bg-light",
                "p-4",
                "rounded-xl",
                "shadow",
                "flex",
                "items-center",
                "gap-3",
                "min-w-[180px]",
                className
            )}
        >
            <div className="text-2xl">{stat.icon}</div>
            <div>
                <p className="text-sm text-secondary m-0">{stat.title}</p>
                <h3 className="text-lg font-semibold m-0">{stat.value}</h3>
            </div>
        </div>
    )
})

StatCard.displayName = "StatCard"
