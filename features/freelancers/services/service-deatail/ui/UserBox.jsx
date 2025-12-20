import React, { useState } from 'react';
import styles from '../styles/detail.module.scss';
import { Button } from 'antd';
import { MessageOutlined, StarFilled } from '@ant-design/icons';
import useCreateChat from '~/features/freelancers/chat/api/useCreateChat';
import { useSelector } from 'react-redux';
import AuthModal from '~/features/auth/ui/auth-modal';
import dayjs from 'dayjs';
import Image from 'next/image';

const UserBox = ({ pushUser, priceBox, rating, feedbacks }) => {
    const { mutate } = useCreateChat();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);

    const { price, id, days, revisions, title, user: seller } = priceBox;
    const { full_name, last_active, photo_url, status, soff_seller_id } =
        seller[0];

    const handleClick = () => {
        if (isLoggedIn) {
            mutate(soff_seller_id);
        } else {
            setOpen(true);
        }
    };

    const formattedLastActive = last_active
        ? dayjs(last_active).format('DD-MMMM YYYY, HH:mm')
        : 'Faol emas';

    return (
        <>
            <div className={styles.userBox}>
                <div className={styles.imgbox}>
                    <Image
                        onClick={pushUser}
                        width={50}
                        height={50}
                        src={photo_url || '/static/img/ozodbek.png'}
                        alt={full_name || 'User'}
                    />
                    <div>
                        <div>
                            <h3
                                style={{ cursor: 'pointer' }}
                                onClick={pushUser}>
                                {full_name || 'No Name'}
                            </h3>
                            {rating >= 1 && (
                                <div className="d-flex gap-2 align-items-center">
                                    <StarFilled
                                        style={{
                                            fontSize: '16px',
                                            color: '#faad14',
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontSize: '16px',
                                            color: '#faad14',
                                        }}>
                                        {Number(rating).toFixed(1)}
                                    </span>
                                    <span>({feedbacks} izoh)</span>
                                </div>
                            )}
                        </div>
                        <p className="m-0">
                            Oxirgi faollik: {formattedLastActive}
                        </p>
                    </div>
                </div>
                <Button
                    onClick={handleClick}
                    icon={<MessageOutlined />}
                    className="w-100">
                    Xabar yuborish
                </Button>
            </div>
            <AuthModal open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default UserBox;
