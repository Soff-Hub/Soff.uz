import React from 'react'
import styles from "../styles/detail.module.scss";

const MoneyBack = () => {
  return (
    <div className={styles.moneyBox}>
        <img src="/static/img/services_images/garant.png" alt="money garant img" />
        <div>
            <h3>Pulni qaytarish kafolati</h3>
            <p>Agar buyurtmangiz siz kutgandek bo‘lmasa, pulingizni to‘liq qaytaramiz.</p>
        </div>
    </div>
  )
}

export default MoneyBack