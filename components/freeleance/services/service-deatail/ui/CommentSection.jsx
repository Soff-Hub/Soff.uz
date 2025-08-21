// CommentSection.jsx
import React from 'react';
import { List, Avatar, Rate } from 'antd';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import styles from './styles/comment.module.scss';
import useGetComments from '../api/useGetComments';

const CommentSection = ({ id, type }) => {
    const router = useRouter();
    const { data: comments } = useGetComments(id, type);

    const handleUserClick = (sellerId) => {
        router.push(`/_seller/${sellerId}`);
    };
    

    return (
        <div className={styles.commentSection}>
            <h3 className={styles.title}>Fikrlar</h3>
            <List
                itemLayout="horizontal"
                dataSource={comments || []}
                locale={{ emptyText: "Hozircha izohlar yo'q" }}
                renderItem={(item) => (
                    <List.Item className={styles.commentItem}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={item.user?.photo_url || "/static/img/ozodbek.png"}
                                    size={48}
                                    className={styles.avatar}
                                    onClick={() => handleUserClick(item.user?.soff_seller_id)}
                                />
                            }
                            title={
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className='d-flex align-items-center gap-4'>
                                        <span
                                            className={styles.userName}
                                            onClick={() => handleUserClick(item.user?.soff_seller_id)}
                                        >
                                            {item.user?.full_name}{" "}
                                        </span>
                                        <Rate disabled defaultValue={item.quality} className={styles.rating} />
                                    </div>
                                        <span style={{ color: "gray", fontSize: "12px", marginLeft: "8px" }}>
                                            {dayjs(item.created_at).format("YYYY-MM-DD")}
                                        </span>
                                </div>
                            }
                            description={
                                <p className={styles.commentText}>{item.comment}</p>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default CommentSection;
