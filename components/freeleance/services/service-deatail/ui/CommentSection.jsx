import React from 'react';
import { List, Avatar, Rate, Button } from 'antd';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import styles from './styles/comment.module.scss';
import useGetComments from '../api/useGetComments';
import { cn } from '~/shared/utilities/cn';
import { DownOutlined } from '@ant-design/icons';

const CommentSection = ({ id, type }) => {
    const router = useRouter();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetComments(id, type);

    const comments = data?.pages.flatMap(page => page.items) || [];
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
                    <Button onClick={() => fetchNextPage()} loading={isFetchingNextPage} shape="round">
                        {isFetchingNextPage ? 'Yuklanmoqda...' : <div className={cn("flex", 'items-center', 'gap-2')}>Ko'proq ko‘rsatish <DownOutlined /></div>}
                    </Button>
                </div>
            )}
            <p className={cn("mt-2", 'text-[12px]', 'text-center')}>{data?.pages[0].total} tadan {comments?.length} ta ko'rsatilgan</p>
        </div>
    );
};

export default CommentSection;
