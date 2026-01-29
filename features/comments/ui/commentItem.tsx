import { useState } from 'react';
import Image from 'next/image';
import { Button, Rate, Avatar } from 'antd';
import { getTimeAgo } from '~/shared/utilities/dayjs-locale-uz';
import ReplyForm from './replysForm';
import styles from './commentList.module.scss';

interface User {
    first_name: string;
    last_name: string;
    image_url?: string;
}

interface Comment {
    id: number;
    user: User;
    created_at: string;
    rating: number;
    text: string;
    is_document_owner: boolean;
    answer_comment?: Comment[];
}

interface CommentItemProps {
    comment: Comment;
    slug: string;
    isDocumentOwner?: boolean;
    onReplyAdded: (commentId: number, newReply: any) => void;
}

export default function CommentItem({
    comment,
    slug,
    isDocumentOwner,
    onReplyAdded,
}: CommentItemProps) {
    const [isReplying, setIsReplying] = useState(false);

    // Default visible if replies are 3 or fewer
    const replyCount = comment.answer_comment?.length || 0;
    const [areRepliesVisible, setAreRepliesVisible] = useState(
        replyCount > 0 && replyCount <= 3
    );

    const handleReplySuccess = (newReply: any) => {
        setIsReplying(false);
        // Automatically open replies to show the new one
        setAreRepliesVisible(true);
        onReplyAdded(comment.id, newReply);
    };

    return (
        <div className={styles.commentItem}>
            <div style={{ width: 40, flexShrink: 0 }}>
                <Image
                    src={comment?.user?.image_url || '/static/img/ozodbek.png'}
                    alt="avatar"
                    width={40}
                    height={40}
                    className={styles.avatar}
                />
            </div>

            <div className={styles.content}>
                {/* Header & Info */}
                <div className={styles.headerInfo}>
                    <span className={styles.author}>
                        {comment.user.first_name} {comment.user.last_name}
                    </span>
                    <span className={styles.date}>
                        {getTimeAgo(comment.created_at)}
                    </span>
                </div>

                {comment.rating > 0 && (
                    <div className={styles.rating}>
                        <Rate
                            disabled
                            allowHalf
                            value={comment.rating}
                            style={{ fontSize: 14 }}
                        />
                    </div>
                )}

                <p className={styles.text}>{comment.text}</p>

                {/* VISUAL THREAD LINE: Interactive, toggles visibility, changes color on hover */}
                {replyCount > 0 && (
                    <div
                        className={styles.threadLine}
                        onClick={() => setAreRepliesVisible(!areRepliesVisible)}
                    />
                )}

                {/* Action Buttons */}
                {isDocumentOwner && (
                    <div className={styles.actions}>
                        <Button
                            size="small"
                            className={styles.replyActionButton}
                            onClick={() => setIsReplying(!isReplying)}>
                            Javob berish
                        </Button>
                    </div>
                )}

                {/* Reply Form */}
                {isReplying && (
                    <div className={styles.replyFormContainer}>
                        <ReplyForm
                            commentId={comment.id}
                            documentId={slug}
                            onSuccess={handleReplySuccess}
                            onCancel={() => setIsReplying(false)}
                        />
                    </div>
                )}

                {/* View Replies Toggle Button */}
                {replyCount > 0 &&
                    (areRepliesVisible ? null : (
                        <div className={styles.repliesPreview}>
                            <Button
                                type="text"
                                className={styles.showRepliesButton}
                                onClick={() => setAreRepliesVisible(true)}>
                                <div className="d-flex align-items-center gap-2">
                                    <Avatar.Group
                                        size="small"
                                        maxCount={2}
                                        max={{
                                            count: 2,
                                            style: {
                                                color: '#fff',
                                                backgroundColor: '#00a44f',
                                            },
                                        }}>
                                        {comment.answer_comment?.map(
                                            (reply, idx) => (
                                                <Avatar
                                                    key={idx}
                                                    src={
                                                        reply.user?.image_url ||
                                                        '/static/img/ozodbek.png'
                                                    }
                                                    alt={reply.user?.first_name}
                                                />
                                            )
                                        )}
                                    </Avatar.Group>
                                    <span> javoblarni ko'rish</span>
                                </div>
                            </Button>
                        </div>
                    ))}

                {/* Nested Replies List */}
                {areRepliesVisible && replyCount > 0 && (
                    <div className={styles.repliesList}>
                        {comment.answer_comment?.map((reply, index) => (
                            <div key={index} className={styles.commentItem}>
                                <Image
                                    src={
                                        reply?.user?.image_url ||
                                        '/static/img/ozodbek.png'
                                    }
                                    alt="avatar"
                                    width={24}
                                    height={24}
                                    className={styles.avatar}
                                    style={{ width: 24, height: 24 }}
                                />
                                <div className={styles.content}>
                                    <div className={styles.headerInfo}>
                                        <span className={styles.author}>
                                            {reply.user.first_name}{' '}
                                            {reply.user.last_name}
                                        </span>
                                        <span className={styles.date}>
                                            {getTimeAgo(reply.created_at)}
                                        </span>
                                    </div>
                                    <p className={styles.text}>{reply.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
