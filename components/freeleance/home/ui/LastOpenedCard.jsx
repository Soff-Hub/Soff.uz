import React from 'react';
import styles from '../styles/Card.module.scss';
import { useRouter } from 'next/router';

const LastOpenedCard = ({ title, image, author, price, slug, userImage }) => {
    const router = useRouter();
    console.log(author)
    return (
        <div
            className={styles.card}
            onClick={() => router.push(`/service/${slug}`)}>
            <p className={styles.title}>
                <span>{title}</span>
            </p>
            <div
                className={styles.bannerBg}
                style={{ background: image ? `url(${image})` : '#000000a3' }}>
                <img
                    className={styles.image}
                    src={image || '/static/img/not-found.png'}
                    alt={title}
                />
            </div>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/seller/${author?.soff_seller_id}`);
                }}
                className={styles.footer}>
                <img
                    src={userImage || '/static/img/ozodbek.png'}
                    className={styles.avatar}
                    alt="userimage"
                />
                <div className={styles.info}>
                    <p className={styles.author}>{author?.full_name}</p>
                    <p className={styles.price}>
                        {Number(price).toLocaleString('en-US')} so’m
                    </p>
                </div>
            </div>
            <span className={styles.corner} />
        </div>
    );
};

export default LastOpenedCard;
