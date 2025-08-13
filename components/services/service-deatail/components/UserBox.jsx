import React from 'react';
import styles from "../styles/detail.module.scss";
import { Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import useCreateChat from '~/components/chat/api/useCreateChat';

const UserBox = ({ user }) => {
    const { mutate } = useCreateChat();

    return (
        <div className={styles.userBox}>
            <img src={user?.photo_url || "/static/img/ozodbek.png"} alt={user?.full_name || "User"} />
            <div className={styles.userInfo}>
                <h3>{user?.full_name || "No Name"}</h3>
                <Button
                    onClick={() => mutate(user?.soff_seller_id)}
                    icon={<MessageOutlined />}
                    className='w-100'
                    // type="primary"
                >
                    Chatlashish
                </Button>
            </div>
        </div>
    )
}

export default UserBox;
