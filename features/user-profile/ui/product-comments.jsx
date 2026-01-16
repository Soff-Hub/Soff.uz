import React, { memo, useMemo, useCallback, useState } from 'react';
import { Skeleton, Button, Divider, Rate } from 'antd';
import { cn } from '~/shared/utilities/cn';
import { useProductComments } from '../api/useProductComments';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const ProductComments = memo(({ id }) => {
    const { t } = useTranslation('seller');
    const [limit, setLimit] = useState(10);
    const { data, isLoading, isFetching } = useProductComments(id, limit);

    const comments = useMemo(() => data?.results || [], [data]);
    const totalCount = data?.count || 0;

    const notFound = !isLoading && comments.length === 0;

    const handleShowMore = useCallback(() => {
        if (comments.length < totalCount) {
            setLimit((prev) => prev + 10);
        }
    }, [comments.length, totalCount]);

    return (
        <div className={cn('mt-4')}>
            {isLoading && <Skeleton active paragraph={{ rows: 4 }} />}

            {notFound && (
                <div
                    className={cn(
                        'flex',
                        'justify-center',
                        'items-center',
                        'my-[30px]'
                    )}>
                    <span className={cn('text-primary')}>
                        {t('commentsSection.noComments')}
                    </span>
                </div>
            )}

            <div className={cn('flex', 'flex-col', 'gap-3')}>
                {comments.map((item, idx) => (
                    <React.Fragment key={item.id}>
                        <CommentCard item={item} />
                        {idx < comments.length - 1 && <Divider size="small" />}
                    </React.Fragment>
                ))}
            </div>

            {comments.length < totalCount && (
                <div className={cn('flex', 'justify-center', 'mt-4')}>
                    <Button
                        onClick={handleShowMore}
                        loading={isFetching}
                        shape="round">
                        {isFetching ? (
                            t('commentsSection.loading')
                        ) : (
                            <div
                                className={cn('flex', 'items-center', 'gap-2')}>
                                {t('commentsSection.showMore')} <DownOutlined />
                            </div>
                        )}
                    </Button>
                </div>
            )}

            {comments.length > 0 && (
                <Divider size="small">
                    <p
                        className={cn(
                            'mt-3',
                            'text-[12px]',
                            'text-center',
                            'mb-0'
                        )}>
                        {t('commentsSection.showingCount', {
                            total: totalCount,
                            shown: comments.length,
                        })}
                    </p>
                </Divider>
            )}
        </div>
    );
});

export default memo(ProductComments);

const CommentCard = memo(
    ({ item }) => {
        const date = useMemo(
            () => item.created_at?.split('T')[0],
            [item.created_at]
        );
        const { push } = useRouter();
        return (
            <div className={cn('flex', 'flex-col', 'gap-2')}>
                <div className={cn('flex', 'flex-col', 'gap-1')}>
                    <div className={cn('flex', 'items-center', 'gap-3')}>
                        <span className={cn('font-semibold', 'text-[14px]')}>
                            {item.user_full_name}
                        </span>
                        {item.rating > 0 && (
                            <Rate
                                disabled
                                value={item.rating}
                                className={cn('text-[12px]')}
                            />
                        )}
                    </div>
                    <span className={cn('text-[13px]', 'text-secondary')}>
                        {date} |{' '}
                        <span
                            className={cn(
                                'cursor-pointer',
                                'hover-text-primary'
                            )}
                            onClick={() =>
                                push(`/product/${item?.document_slug}`)
                            }>
                            {item.document_title}
                        </span>
                    </span>
                    {item.text && (
                        <p className={cn('text-[14px]', 'text-dark', 'mt-1')}>
                            {item.text}
                        </p>
                    )}
                </div>

                {item.replies?.length > 0 && (
                    <div
                        style={{
                            borderLeft: '1px solid #e5e5e5',
                        }}
                        className={`${cn(
                            'ml-4',
                            'pl-4',
                            'mt-2',
                            'space-y-3'
                        )}`}>
                        {item.replies.map((reply) => (
                            <CommentCard key={reply.id} item={reply} />
                        ))}
                    </div>
                )}
            </div>
        );
    },
    (prev, next) => prev.item.id === next.item.id
);
