import React from 'react'
import styles from '../style/style.module.scss'
import { Steps } from 'antd'


const OrderStatus = () => {
    return (
        <div className='col-12 col-lg-3'>
            <div className={styles.status}>
                <div className={styles.status_info}>
                    <span>Buyurtma holati</span>
                    <p>To'lov kutilmoqda</p>
                </div>
                <div className={styles.status_price}>
                    <span>Buyurtma narxi</span>
                    <p>30$</p>
                </div>
            </div>
            <div className={styles.seller}>
                <span>Sotuvchi</span>
                <div className={styles.seller_box}>
                    <div>
                        <p>username</p>
                        <span>offline</span>
                    </div>
                    <img src="/static/img/ozodbek.png" alt="user" />
                </div>
            </div>
            <div className={styles.status_steps}>
                <Steps
                    direction="vertical"
                    className={styles.greenSteps}
                    items={[
                        { title: 'Buyurtma yaratildi' },
                        { title: "To'lov qilindi" },
                        { title: "Buyurtma talablari jo'natildi" },
                        { title: "Buyurtma qabul qilindi" },
                        { title: "Tasdiqlash uchun topshirildi" },
                        { title: "Buyurtma tugallandi" },
                    ]}
                />
            </div>
        </div>
    )
}

export default OrderStatus