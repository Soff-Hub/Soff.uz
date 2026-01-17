import React, { useEffect, useRef, useState } from 'react';
import styles from './commentList.module.scss';
import { baseURL } from '~/repositories/api';
import CommentItem from './commentItem';
import { useSelector } from 'react-redux';
import { useAppSelector } from '~/app/store/hooks';

interface CommentListProps {
    slug: string;
}

// const sampleData = {
//     count: 4,
//     next: null,
//     previous: null,
//     results: [
//         {
//             id: 16,
//             user: {
//                 id: 25,
//                 first_name: 'Sotuvchi',
//                 last_name: '25',
//                 image_url:
//                     'https://d2co7bxjtnp5o.cloudfront.net/media/users/IMG_6549.HEIC',
//             },
//             rating: 4,
//             text: `Lorem Ipsum
//             is simply dummy text of the printing and typesetting industry.
//                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
//             replied_count: 1,
//             created_at: '2024-07-02 10:46',
//             is_document_owner: false,
//             answer_comment: [
//                 {
//                     id: 608,
//                     replied_to: 16,
//                     rating: 0,
//                     text: 'zor',
//                     user: {
//                         id: 30,
//                         first_name: 'Zufarbek',
//                         last_name: 'Abdurakhmonov',
//                         image_url:
//                             'https://d2co7bxjtnp5o.cloudfront.net/media/users/2024-03-21_19.44.12.jpg',
//                     },
//                     created_at: '2026-01-14T17:03:00.567490',
//                 },
//                 {
//                     id: 608,
//                     replied_to: 16,
//                     rating: 0,
//                     text: 'zor',
//                     user: {
//                         id: 30,
//                         first_name: 'Zufarbek',
//                         last_name: 'Abdurakhmonov',
//                         image_url:
//                             'https://d2co7bxjtnp5o.cloudfront.net/media/users/IMG_6549.HEIC',
//                     },
//                     created_at: '2026-01-14T17:03:00.567490',
//                 },
//                 {
//                     id: 608,
//                     replied_to: 16,
//                     rating: 0,
//                     text: 'zo f jaklsfd; ajklsdf jakls;f jaklsdf jaklsdf jkals;df jkalsd;fjkalsd;r',
//                     user: {
//                         id: 30,
//                         first_name: 'Zufarbek',
//                         last_name: 'Abdurakhmonov',
//                         image_url:
//                             'https://d2co7bxjtnp5o.cloudfront.net/media/users/IMG_6549.HEIC',
//                     },
//                     created_at: '2026-01-14T17:03:00.567490',
//                 },
//                 {
//                     id: 608,
//                     replied_to: 16,
//                     rating: 0,
//                     text: 'zo f jaklsfd; ajklsdf jakls;f jaklsdf jaklsdf jkals;df jkalsd;fjkalsd;r',
//                     user: {
//                         id: 30,
//                         first_name: 'Zufarbek',
//                         last_name: 'Abdurakhmonov',
//                         image_url:
//                             'https://d2co7bxjtnp5o.cloudfront.net/media/users/IMG_6549.HEIC',
//                     },
//                     created_at: '2026-01-14T17:03:00.567490',
//                 },
//             ],
//         },
//         {
//             id: 20,
//             user: {
//                 id: 25,
//                 first_name: 'Sotuvchi',
//                 last_name: '25',
//                 image_url:
//                     'https://d2co7bxjtnp5o.cloudfront.net/media/users/IMG_6549.HEIC',
//             },
//             rating: 0,
//             text: 'yana bir',
//             replied_count: 1,
//             created_at: '2024-07-02 12:21',
//             is_document_owner: false,
//             answer_comment: [
//                 {
//                     id: 537,
//                     replied_to: 20,
//                     rating: 0,
//                     text: 'rahmat',
//                     user: {
//                         id: 30,
//                         first_name: 'Zufarbek',
//                         last_name: 'Abdurakhmonov',
//                         image_url:
//                             'https://d2co7bxjtnp5o.cloudfront.net/media/users/2024-03-21_19.44.12.jpg',
//                     },
//                     created_at: '2025-12-29T15:45:43.490690',
//                 },
//             ],
//         },
//         {
//             id: 21,
//             user: {
//                 id: 25,
//                 first_name: 'Sotuvchi',
//                 last_name: '25',
//                 image_url:
//                     'https://d2co7bxjtnp5o.cloudfront.net/media/users/IMG_6549.HEIC',
//             },
//             rating: 0,
//             text: 'yana bir',
//             replied_count: 1,
//             created_at: '2024-07-02 12:21',
//             is_document_owner: false,
//             answer_comment: [
//                 {
//                     id: 537,
//                     replied_to: 20,
//                     rating: 0,
//                     text: 'rahmat',
//                     user: {
//                         id: 30,
//                         first_name: 'Zufarbek',
//                         last_name: 'Abdurakhmonov',
//                         image_url:
//                             'https://d2co7bxjtnp5o.cloudfront.net/media/users/2024-03-21_19.44.12.jpg',
//                     },
//                     created_at: '2025-12-29T15:45:43.490690',
//                 },
//                 {
//                     id: 537,
//                     replied_to: 20,
//                     rating: 0,
//                     text: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
//                     user: {
//                         id: 30,
//                         first_name: 'Zufarbek',
//                         last_name: 'Abdurakhmonov',
//                         image_url:
//                             'https://d2co7bxjtnp5o.cloudfront.net/media/users/2024-03-21_19.44.12.jpg',
//                     },
//                     created_at: '2025-12-29T15:45:43.490690',
//                 },
//             ],
//         },
//         {
//             id: 22,
//             user: {
//                 id: 25,
//                 first_name: 'Sotuvchi',
//                 last_name: '25',
//                 image_url:
//                     'https://d2co7bxjtnp5o.cloudfront.net/media/users/IMG_6549.HEIC',
//             },
//             rating: 0,
//             text: 'yana bir',
//             replied_count: 1,
//             created_at: '2024-07-02 12:21',
//             is_document_owner: false,
//             answer_comment: [
//                 {
//                     id: 537,
//                     replied_to: 20,
//                     rating: 0,
//                     text: 'rahmat',
//                     user: {
//                         id: 30,
//                         first_name: 'Zufarbek',
//                         last_name: 'Abdurakhmonov',
//                         image_url:
//                             'https://d2co7bxjtnp5o.cloudfront.net/media/users/2024-03-21_19.44.12.jpg',
//                     },
//                     created_at: '2025-12-29T15:45:43.490690',
//                 },
//             ],
//         },
//     ],
// };

export function CommentList({ slug }: CommentListProps) {
    const { user } = useAppSelector((state) => state.auth);
    const [comments, setComments] = useState<{
        count: number;
        is_document_owner: boolean;
        results: any[];
    }>({ count: 0, is_document_owner: false, results: [] });
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement>(null);

    const fetchComments = async (
        url = `${baseURL}seller/document-reviews/${slug}`
    ) => {
        try {
            setLoading(true);
            const res = await fetch(url, {
                headers: {
                    Authorization: user ? `Bearer ${user.access}` : '',
                },
            });
            const data = await res.json();

            setComments((prev) => ({
                count: data.count,
                is_document_owner: data.is_document_owner,
                results:
                    url === `${baseURL}seller/document-reviews/${slug}`
                        ? data.results
                        : [...prev.results, ...data.results],
            }));

            setNextUrl(data.next);
        } catch (err) {
            console.error('Comment yuklashda xatolik:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug && user?.access) {
            // setComments({
            //     count: sampleData.count,
            //     results: sampleData.results,
            // });
            setComments({ count: 0, is_document_owner: false, results: [] });
            fetchComments();
        }
    }, [slug, user?.access]);

    useEffect(() => {
        if (!nextUrl || loading) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchComments(nextUrl);
                }
            },
            { rootMargin: '100px' }
        );
        const trigger = loadMoreRef.current;
        if (trigger) observer.observe(trigger);
        return () => {
            if (trigger) observer.unobserve(trigger);
        };
    }, [nextUrl, loading]);

    if (comments.count === 0 && !loading) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>{comments.count || 0} ta izoh</h3>
            </div>

            <div className={styles.commentList}>
                {comments.count === 0 && loading ? (
                    <div className={styles.loading}>Yuklanmoqda...</div>
                ) : (
                    comments.results.map((comment, i) => (
                        <CommentItem
                            key={`${comment.id}-${i}`}
                            comment={comment}
                            slug={slug}
                            isDocumentOwner={comments.is_document_owner}
                            onRefresh={() => fetchComments()}
                        />
                    ))
                )}

                {nextUrl && (
                    <div ref={loadMoreRef} className={styles.loading}>
                        {loading ? 'Yuklanmoqda...' : 'Ko‘proq yuklanmoqda...'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentList;
