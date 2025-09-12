import React from 'react';
import styles from '../styles/Card.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LastOpenedCard = ({ title, image, author, price, slug, userImage }) => {
    const router = useRouter();
    return (
        <div className={styles.card}>
            <p className={styles.title}>
                <span>{title}</span>
            </p>
            <Link href={`/service/${slug}`}>
                <div
                    className={styles.bannerBg}
                    style={{ background: image ? `url(${image})` : '#000000a3' }}>
                    <img
                        className={styles.image}
                        src={image || '/static/img/not-found.png'}
                        alt={title}
                    />
                </div>
            </Link>

            <div className={styles.footer}>
                <img
                    src={userImage || '/static/img/ozodbek.png'}
                    className={styles.avatar}
                    alt="userimage"
                />
                <div className={styles.info}>
                    <Link href={`/seller/${author?.soff_seller_id}`}>
                        <p className={styles.author}>{author?.full_name}</p>
                    </Link>
                    <p className={styles.price}>
                        {Number(price).toLocaleString('en-US')} so’m
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LastOpenedCard;
