import React from 'react'
import styles from "../styles/SoffTittle.module.scss"

const SoffTittle = () => {
    return (
        <div className={styles.wrapper}>
            <img src="/static/img/HomePage/icon.png" alt="icon" />
            <h3 className={styles.subtitle}>Raqamli mahsulotlar va onlayn xizmatlar bozori</h3>
            <h1 className={styles.title}>SOFF.UZ</h1>
        </div>
    )
}

export default SoffTittle