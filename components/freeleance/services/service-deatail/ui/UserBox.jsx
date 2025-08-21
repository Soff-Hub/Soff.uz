import React, { useState } from 'react';
import styles from "../styles/detail.module.scss";
import { Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import useCreateChat from '~/components/freeleance/chat/api/useCreateChat';
import { useSelector } from 'react-redux';
import AuthModal from '~/components/AuthModal';
import dayjs from 'dayjs';
import 'dayjs/locale/uz-latn';

const UserBox = ({ pushUser, priceBox }) => {
    const { mutate } = useCreateChat();
    const { isLoggedIn } = useSelector(state => state.auth);
    const [open, setOpen] = useState(false);

    const { price, id, days, revisions, title, user: seller } = priceBox; 
    const { full_name, last_active, photo_url, status, soff_seller_id } = seller[0]; 

    const handleClick = () => {
        if (isLoggedIn) {
            mutate(soff_seller_id);
        } else {
            setOpen(true);
        }
    };
    

    const formattedLastActive = last_active 
        ? dayjs(last_active).locale('uz-latn').format('DD-MMMM YYYY, HH:mm') 
        : "Faol emas";

    return (
        <>
            <div className={styles.userBox}>
                <img style={{cursor: "pointer"}} onClick={pushUser} src={photo_url || "/static/img/ozodbek.png"} alt={full_name || "User"} />
                <div className={styles.userInfo}>
                    <div>
                        <h3 style={{cursor: "pointer"}} onClick={pushUser}>{full_name || "No Name"}</h3>
                        <p>Oxirgi faollik: {formattedLastActive}</p>
                    </div>
                    <Button
                        onClick={handleClick}
                        icon={<MessageOutlined />}
                        className='w-100'
                    >
                        Chatlashish
                    </Button>
                </div>
            </div>
            <AuthModal open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default UserBox;
