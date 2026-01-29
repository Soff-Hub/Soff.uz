import React, { useEffect, useRef } from 'react';
import styles from './commentList.module.scss';
import { baseURL } from '~/repositories/api';
import CommentItem from './commentItem';
import { useAppSelector } from '~/app/store/hooks';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

interface CommentListProps {
    slug: string;
    id: number | string;
}

export function CommentList({ slug, id }: CommentListProps) {
    const { user } = useAppSelector((state) => state.auth);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useInfiniteQuery({
            queryKey: ['document-reviews', slug, user?.access],
            queryFn: async ({
                pageParam = `${baseURL}seller/document-reviews/${slug}?limit=10`,
            }) => {
                const res = await fetch(pageParam, {
                    headers: {
                        Authorization: user ? `Bearer ${user.access}` : '',
                    },
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch comments');
                }
                return res.json();
            },
            getNextPageParam: (lastPage) => lastPage.next ?? undefined,
        });

    const comments = {
        count: data?.pages[0]?.count || 0,
        is_document_owner: data?.pages[0]?.is_document_owner || false,
        results: data?.pages.flatMap((page) => page.results) || [],
    };

    const isValidComments =
        Array.isArray(comments?.results) && comments.results.length > 0;

    const handleReplyAdded = (commentId: number, newReply: any) => {
        queryClient.setQueryData(
            ['document-reviews', slug, user?.access],
            (oldData: any) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        results: page.results.map((comment: any) => {
                            if (comment.id === commentId) {
                                return {
                                    ...comment,
                                    answer_comment: [
                                        ...(comment.answer_comment || []),
                                        newReply,
                                    ],
                                };
                            }
                            return comment;
                        }),
                    })),
                };
            }
        );
    };

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { rootMargin: '100px' }
        );

        const trigger = loadMoreRef.current;
        if (trigger) observer.observe(trigger);

        return () => {
            if (trigger) observer.unobserve(trigger);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (comments.count === 0 && !isLoading) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>{comments.count || 0} ta izoh</h3>
            </div>

            <div className={styles.commentList}>
                {comments.count === 0 && isLoading && (
                    <div className={styles.loading}>Yuklanmoqda...</div>
                )}
                {!isLoading &&
                    isValidComments &&
                    comments.results.map((comment, i) => (
                        <CommentItem
                            key={`${comment.id}-${i}`}
                            comment={comment}
                            slug={id.toString()}
                            isDocumentOwner={comments.is_document_owner}
                            onReplyAdded={handleReplyAdded}
                        />
                    ))}

                {hasNextPage && (
                    <div ref={loadMoreRef} className={styles.loading}>
                        {isFetchingNextPage
                            ? 'Yuklanmoqda...'
                            : "Ko'proq yuklanmoqda..."}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentList;
