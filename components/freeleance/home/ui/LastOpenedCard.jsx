import React from 'react';
import styles from '../styles/Card.module.scss';
import { useRouter } from 'next/router';

const LastOpenedCard = ({ title, image, author, price, slug, userImage }) => {
    const router = useRouter();
    return (
        <div className=' overflow-hidden'>
            <div
                className={styles.card}
                onClick={() => router.push(`/service/${slug}`)}>
                <h3 className={styles.title}>{title}</h3>
                <div
                    className={styles.image}
                    style={{
                        backgroundImage: `url(${image ||
                            '/static/img/not-found.png'})`,
                    }}></div>
                <div className={styles.footer}>
                    <div
                        className={styles.avatar}
                        style={{
                            backgroundImage: `url(${userImage})`,
                            objectFit: 'cover',
                        }}></div>
                    <div className={styles.info}>
                        <p className={styles.author}>{author}</p>
                        <p className={styles.price}>
                            {Number(price).toLocaleString('en-US')} so’m
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LastOpenedCard;
