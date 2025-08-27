import React from 'react';
import styles from '../styles/Card.module.scss';
import { useRouter } from 'next/router';

const LastOpenedCard = ({ title, image, author, price, slug, userImage }) => {
    const router = useRouter();
    return (
        <div className=" overflow-hidden flex-fill">
            <div
                className={styles.card}
                onClick={() => router.push(`/service/${slug}`)}>
                <p className={styles.title}>{title}</p>
                <div
                    style={{
                        background: `url(${image ||
                            '/static/img/not-found.png'})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                    className={styles.image}
                />
                <div className={styles.footer}>
                    <img
                        src={userImage}
                        className={styles.avatar}
                        alt="userimage"
                    />
                    <div className={styles.info}>
                        <p className={styles.author}>{author}</p>
                        <p className={styles.price}>
                            {Number(price).toLocaleString('en-US')} so’m
                        </p>
                    </div>
                </div>
                <span className={styles.corner} />
            </div>
        </div>
    );
};

export default LastOpenedCard;
