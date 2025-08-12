import React from 'react'
import styles from "../styles/detail.module.scss";
import { Button } from 'antd';
import { formatCurrencyWithSpace } from '~/utilities/product-helper';

const PriceBox = ({ priceBox }) => {
    const { price, id, days, revisions } = priceBox

    return (
        <div className={styles.priceBox}>
            <div className={styles.priceDiv}>
                <h2 className={styles.price}>{formatCurrencyWithSpace(price)} so'm</h2>
                <h2 className={styles.priceTitle}>Xizmat haqida</h2>
            </div>
            <div className={styles.infoBox}>
                <p className={styles.info}><i class="fa-solid fa-clock"></i> {days} kunda yetkazish</p>
                <p className={styles.info}><i class="fa-solid fa-pen-to-square"></i> {revisions} marta tahrirlash huquqi</p>
            </div>
            <Button className={styles.btn}>Buyurtma berish</Button>
        </div>
    )
}

export default PriceBox