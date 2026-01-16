import React, { memo, useMemo, useCallback } from 'react';
import { Skeleton, Button, Divider, Rate } from 'antd';
import { cn } from '~/shared/utilities/cn';
import { useServiceComments } from '../api/useServiceComments';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const ServiceComments = memo(({ id }) => {
    const { t } = useTranslation('seller');
    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useServiceComments(id);

    const allComments = useMemo(
        () => data?.pages?.flatMap((p) => p.items) || [],
        [data]
    );

    const notFound = useMemo(
        () => !isLoading && allComments.length === 0,
        [isLoading, allComments]
    );

    const renderComment = useCallback(
        (item, idx) => (
            <div key={`${item.user?.soff_seller_id}-${idx}`}>
                <CommentCard item={item} />
                {idx < allComments.length - 1 && <Divider size="small" />}
            </div>
        ),
        [allComments.length]
    );

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
                {allComments.map(renderComment)}
            </div>

            {hasNextPage && (
                <div className={cn('flex', 'justify-center', 'mt-4')}>
                    <Button
                        onClick={fetchNextPage}
                        loading={isFetchingNextPage}
                        shape="round">
                        {isFetchingNextPage ? (
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

            {allComments.length > 0 && (
                <Divider size="small">
                    <p
                        className={cn(
                            'mt-3',
                            'text-[12px]',
                            'text-center',
                            'mb-0'
                        )}>
                        {t('commentsSection.showingCount', {
                            total: data?.pages[0]?.total,
                            shown: allComments.length,
                        })}
                    </p>
                </Divider>
            )}
        </div>
    );
});

export default memo(ServiceComments);

const CommentCard = memo(
    ({ item }) => {
        const { t } = useTranslation('seller');
        const date = useMemo(
            () => item.created_at?.split('T')[0],
            [item.created_at]
        );
        const { push } = useRouter();

        return (
            <div>
                <div className={cn('flex', 'gap-1', 'flex-col')}>
                    <div className={cn('flex', 'items-center', 'gap-3')}>
                        <span className={cn('font-semibold', 'block')}>
                            {item.user?.full_name}
                        </span>
                        <Rate
                            disabled
                            value={item.quality}
                            className={cn('text-[12px]')}
                        />
                    </div>
                    <span className={cn('text-[13px]', 'text-secondary')}>
                        {date} |{' '}
                        {item.service?.title ? (
                            <span
                                onClick={() =>
                                    push(`/service/${item.service?.slug}`)
                                }
                                className={cn(
                                    'cursor-pointer',
                                    'hover-text-primary',
                                    'transition'
                                )}>
                                {item.service?.title}
                            </span>
                        ) : (
                            t('commentsSection.specialOrder')
                        )}
                    </span>
                </div>
                <p className={cn('text-[14px]', 'text-dark')}>{item.comment}</p>
            </div>
        );
    },
    (prev, next) => prev.item.comment === next.item.comment
);
