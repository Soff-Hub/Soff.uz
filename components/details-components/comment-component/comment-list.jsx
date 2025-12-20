import Image from 'next/image';
import { Tooltip, Rate } from 'antd';
import { CheckCircleFilled, MessageOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { baseURL } from '~/repositories/api';
import { getTimeAgo } from '~/shared/utilities/dayjs-locale-uz';
import ReplyForm from '../comment-section/replysForm';

export function Comment_List({ slug }) {
    const [comments, setComments] = useState({ count: 0, results: [] });
    const [nextUrl, setNextUrl] = useState(null);
    const [activeReplyId, setActiveReplyId] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadMoreRef = useRef();

    return (
        <div className="border rounded-5 p-5 bg-white">
            <h5 className="mb-4 fs-1 d-flex align-items-center gap-2">
                Izohlar
                <span className="rounded-5 fs-4 text-white bg-success px-3 py-1">
                    {comments.count || 0}
                </span>
            </h5>

            <div
                style={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    paddingRight: '10px',
                    scrollbarGutter: 'stable',
                }}>
                {comments.count === 0 ? (
                    <p className="text-muted fs-3">Hali izohlar mavjud emas</p>
                ) : (
                    comments.results.map((comment, i) => (
                        <div
                            key={`${comment.id}-${i}`}
                            className="mb-4 pb-4 border-bottom">
                            <div className="d-flex align-items-start gap-3">
                                <Image
                                    src="/static/img/ozodbek.png"
                                    alt="avatar"
                                    width={50}
                                    height={50}
                                    className="rounded-circle"
                                />
                                <div className="w-100">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center gap-2">
                                            <strong className="fs-3">
                                                {comment.user.first_name}{' '}
                                                {comment.user.last_name}
                                            </strong>
                                            <span className="text-muted ms-2">
                                                {getTimeAgo(comment.created_at)}
                                            </span>
                                        </div>
                                        {comment.rating !== 0 && (
                                            <Rate
                                                disabled
                                                allowHalf
                                                value={comment.rating}
                                                style={{ fontSize: 18 }}
                                            />
                                        )}
                                    </div>
                                    <p className="mt-2 mb-2 fs-4">
                                        {comment.text}
                                    </p>

                                    {comment.is_document_owner && (
                                        <div className="d-flex gap-4 text-muted fs-6">
                                            <Tooltip title="Javob yozish">
                                                <span
                                                    role="button"
                                                    onClick={() =>
                                                        setActiveReplyId(
                                                            comment.id
                                                        )
                                                    }
                                                    className="text-success">
                                                    <MessageOutlined /> Javob
                                                    berish
                                                </span>
                                            </Tooltip>
                                        </div>
                                    )}

                                    {activeReplyId === comment.id && (
                                        <ReplyForm
                                            commentId={comment.id}
                                            documentId={slug}
                                            onSuccess={() => {
                                                setActiveReplyId(null);
                                                fetchComments();
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            {comment.replys?.map((reply, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-start gap-3 mt-4 ms-5 ps-3 border-start border-3 border-success">
                                    <Image
                                        src="/static/img/ozodbek.png"
                                        alt="avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-circle"
                                    />
                                    <div>
                                        <div className="d-flex align-items-center gap-2">
                                            <strong className="fs-6 text-success">
                                                {reply.username}
                                            </strong>
                                            <CheckCircleFilled className="text-success" />
                                            <span className="text-muted small">
                                                {reply.time}
                                            </span>
                                        </div>
                                        <p className="mt-1 mb-0">
                                            {reply.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                )}

                {/* Intersection trigger */}
                {nextUrl && (
                    <div
                        ref={loadMoreRef}
                        className="text-center text-muted py-3">
                        {loading ? 'Yuklanmoqda...' : 'Ko‘proq yuklanmoqda...'}
                    </div>
                )}
            </div>
        </div>
    );
}
