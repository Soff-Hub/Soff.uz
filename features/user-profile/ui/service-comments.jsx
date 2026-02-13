import React, { memo, useMemo, useCallback } from 'react'
import { Skeleton, Button, Divider, Rate } from 'antd'
import styles from '../styles/user-comments.module.scss'
import { useServiceComments } from '../api/useServiceComments'
import { DownOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

const ServiceComments = memo(({ id }) => {
    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useServiceComments(id)

    const allComments = useMemo(
        () => data?.pages?.flatMap(p => p.items) || [],
        [data]
    )

    const notFound = useMemo(
        () => !isLoading && allComments.length === 0,
        [isLoading, allComments]
    )

    const renderComment = useCallback(
        (item, idx) => (
            <div key={`${item.user?.soff_seller_id}-${idx}`}>
                <CommentCard item={item} />
                {idx < allComments.length - 1 && <Divider size='small' />}
            </div>
        ),
        [allComments.length]
    )

    return (
        <div className={styles.commentsList}>
            {isLoading && <Skeleton active paragraph={{ rows: 4 }} />}

            {notFound && (
                <div className={`${styles.commentsList} ${styles.centered}`}>
                    <span className={styles.notFoundText}>Hozircha izohlar mavjud emas</span>
                </div>
            )}

            <div className={styles.commentsList}>
                {allComments.map(renderComment)}
            </div>

            {hasNextPage && (
                <div className={styles.showMoreContainer}>
                    <Button onClick={fetchNextPage} loading={isFetchingNextPage} shape="round">
                        {isFetchingNextPage ? (
                            'Yuklanmoqda...'
                        ) : (
                            <div className={styles.showMoreButton}>
                                Ko‘proq ko‘rsatish <DownOutlined />
                            </div>
                        )}
                    </Button>
                </div>
            )}

            {allComments.length > 0 && (
                <Divider size='small'>
                    <p className={styles.countText}>
                        {data?.pages[0]?.total} tadan {allComments.length} ta ko‘rsatilgan
                    </p>
                </Divider>
            )}
        </div>
    )
})

export default memo(ServiceComments)


const CommentCard = memo(({ item }) => {
    const date = useMemo(() => item.created_at?.split('T')[0], [item.created_at])
    const { push } = useRouter()

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <div className={styles.userInfoRow}>
                    <span className={styles.userName}>{item.user?.full_name}</span>
                    <Rate disabled value={item.quality} className={styles.ratingStars} />
                </div>
                <span className={styles.metaInfo}>
                    {date} | {item.service?.title ? <span onClick={() => push(`/service/${item.service?.slug}`)} className={styles.documentLink}>{item.service?.title}</span> : "Maxsus buyurtma"}
                </span>
            </div>
            <p className={styles.commentText}>{item.comment}</p>
        </div>
    )
}, (prev, next) => prev.item.comment === next.item.comment)
