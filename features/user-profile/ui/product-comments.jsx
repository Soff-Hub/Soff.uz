import React, { memo, useMemo, useCallback, useState } from 'react'
import { Skeleton, Button, Divider, Rate } from 'antd'
import styles from '../styles/user-comments.module.scss'
import { useProductComments } from '../api/useProductComments'
import { DownOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

const ProductComments = memo(({ id }) => {
    const [limit, setLimit] = useState(10)
    const { data, isLoading, isFetching } = useProductComments(id, limit)

    const comments = useMemo(() => data?.results || [], [data])
    const totalCount = data?.count || 0

    const notFound = !isLoading && comments.length === 0

    const handleShowMore = useCallback(() => {
        if (comments.length < totalCount) {
            setLimit(prev => prev + 10)
        }
    }, [comments.length, totalCount])

    return (
        <div className={styles.commentsList}>
            {isLoading && <Skeleton active paragraph={{ rows: 4 }} />}

            {notFound && (
                <div className={`${styles.commentsList} ${styles.centered}`}>
                    <span className={styles.notFoundText}>Hozircha izohlar mavjud emas</span>
                </div>
            )}

            <div className={styles.commentsList}>
                {comments.map((item, idx) => (
                    <React.Fragment key={item.id}>
                        <CommentCard item={item} />
                        {idx < comments.length - 1 && <Divider size='small' />}
                    </React.Fragment>
                ))}
            </div>

            {comments.length < totalCount && (
                <div className={styles.showMoreContainer}>
                    <Button
                        onClick={handleShowMore}
                        loading={isFetching}
                        shape="round"
                    >
                        {isFetching ? (
                            'Yuklanmoqda...'
                        ) : (
                            <div className={styles.showMoreButton}>
                                Ko‘proq ko‘rsatish <DownOutlined />
                            </div>
                        )}
                    </Button>
                </div>
            )}

            {comments.length > 0 && (
                <Divider size='small'>
                    <p className={styles.countText}>
                        {totalCount} tadan {comments.length} ta ko‘rsatilgan
                    </p>
                </Divider>
            )}
        </div>
    )
})

export default memo(ProductComments)


const CommentCard = memo(({ item }) => {
    const date = useMemo(() => item.created_at?.split('T')[0], [item.created_at])
    const { push } = useRouter()
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <div className={styles.userInfoRow}>
                    <span className={styles.userName}>
                        {item.user_full_name}
                    </span>
                    {item.rating > 0 && (
                        <Rate disabled value={item.rating} className={styles.ratingStars} />
                    )}
                </div>
                <span className={styles.metaInfo}>
                    {date} |{" "}
                    <span
                        className={styles.documentLink}
                        onClick={() => push(`/product/${item?.document_slug}`)}
                    >
                        {item.document_title}
                    </span>
                </span>
                {item.text && (
                    <p className={styles.commentText}>{item.text}</p>
                )}
            </div>

            {item.replies?.length > 0 && (
                <div className={styles.repliesContainer}>
                    {item.replies.map((reply) => (
                        <CommentCard key={reply.id} item={reply} />
                    ))}
                </div>
            )}
        </div>
    )
}, (prev, next) => prev.item.id === next.item.id)
