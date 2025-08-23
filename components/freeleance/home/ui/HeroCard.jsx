import React from 'react';
import styles from '../styles/HeroCard.module.scss';

const HeroCard = ({ title, img }) => {
    return (
        <div className={styles.hero_card}>
            <img
                className={styles.card_img}
                src={
                    img ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Js_bPZeyn0QE7oSrUlpmgI8ckIdYgm5doA&s'
                }
                alt="card_image"
            />
            <p className={styles.card_title}>{title || 'Dizayn'}</p>
        </div>
    );
};

export default HeroCard;
