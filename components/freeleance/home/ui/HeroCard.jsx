import React from 'react';
import styles from '../styles/HeroCard.module.scss';
import { useRouter } from 'next/router';

const HeroCard = ({ title, img, link }) => {
    const router = useRouter();
    return (
        <div onClick={() => router.push(link)} className={styles.hero_card}>
            <div className=' flex-fill align-content-center w-100 d-flex justify-content-center'>
                <img
                    className={styles.card_img}
                    src={
                        img ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Js_bPZeyn0QE7oSrUlpmgI8ckIdYgm5doA&s'
                    }
                    alt="card_image"
                />
            </div>
            <p className={styles.card_title}>{title || 'Dizayn'}</p>
        </div>
    );
};

export default HeroCard;
