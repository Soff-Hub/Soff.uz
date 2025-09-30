import React from 'react';
import { List, Avatar, Rate, Button } from 'antd';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import styles from './styles/comment.module.scss';
import useGetComments from '../api/useGetComments';

const CommentSection = ({ id, type }) => {
    const router = useRouter();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetComments(id, type);

    const comments = data?.pages.flatMap(page => page.items) || [];
    console.log(data)
    const handleUserClick = sellerId => {
        router.push(`/seller/${sellerId}`);
    };

    return (
        <div className={styles.commentSection}>
            <h3 className={styles.title}>Fikrlar</h3>

            <List
                itemLayout="horizontal"
                dataSource={comments}
                locale={{ emptyText: "Hozircha izohlar yo'q" }}
                renderItem={item => (
                    <List.Item className={styles.commentItem}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={item.user?.photo_url || '/static/img/ozodbek.png'}
                                    size={48}
                                    className={styles.avatar}
                                    onClick={() => handleUserClick(item.user?.soff_seller_id)}
                                />
                            }
                            title={
                                <div className={styles.commentHeader}>
                                    <div className={styles.userInfo}>
                                        <span
                                            className={styles.userName}
                                            onClick={() => handleUserClick(item.user?.soff_seller_id)}
                                        >
                                            {item.user?.full_name}
                                        </span>
                                        <Rate disabled defaultValue={item.quality} className={styles.rating} />
                                    </div>
                                    <span style={{ color: 'gray', fontSize: '12px' }}>
                                        {dayjs(item.created_at).format('YYYY-MM-DD')}
                                    </span>
                                </div>
                            }

                            description={<p className={styles.commentText}>{item.comment}</p>}
                        />
                    </List.Item>
                )}
            />

            {/* Ko‘proq yuklash tugmasi */}
            {hasNextPage && (
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <Button onClick={() => fetchNextPage()} loading={isFetchingNextPage}>
                        {isFetchingNextPage ? 'Yuklanmoqda...' : `Ko'proq ko‘rsatish (${data?.pages[0].total})`}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CommentSection;
