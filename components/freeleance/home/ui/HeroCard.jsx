import React from 'react'
import styles from "../styles/HeroCard.module.scss"

const HeroCard = ({title, img}) => {
    return (
        <div className={styles.hero_card}>
            <div className='d-flex justify-content-center'>
                <img className={styles.card_img} src={img} alt="card_image" />
            </div>
            <p className={styles.card_title}>{title}</p>
        </div>
    )
}

export default HeroCard