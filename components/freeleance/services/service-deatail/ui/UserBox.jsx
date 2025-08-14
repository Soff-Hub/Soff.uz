import React, { useState } from 'react';
import styles from "../styles/detail.module.scss";
import { Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import useCreateChat from '~/components/freeleance/chat/api/useCreateChat';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AuthModal from '~/components/AuthModal';

const UserBox = ({ user }) => {
    const { mutate } = useCreateChat();
    const { isLoggedIn } = useSelector(state => state.auth)
    const [ open, setOpen ] = useState(false)

    const handleClick = () => {
        if(isLoggedIn){
            mutate(user?.soff_seller_id)
        }else{
            setOpen(true)
        }
    }

    return (
        <>
            <div className={styles.userBox}>
                <img src={user?.photo_url || "/static/img/ozodbek.png"} alt={user?.full_name || "User"} />
                <div className={styles.userInfo}>
                    <h3>{user?.full_name || "No Name"}</h3>
                    <Button
                        onClick={handleClick}
                        icon={<MessageOutlined />}
                        className='w-100'
                    >
                        Chatlashish
                    </Button>
                </div>
            </div>
        <AuthModal open={open} onClose={() => setOpen(false)}/>
        </>
    )
}

export default UserBox;
