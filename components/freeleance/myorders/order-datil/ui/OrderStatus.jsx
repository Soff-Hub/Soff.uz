import React from 'react'
import styles from '../style/style.module.scss'
import { Steps } from 'antd'

const OrderStatus = ({ order }) => {
    const priceFormatted = new Intl.NumberFormat('uz-UZ').format(order?.service?.price) + " so'm"

    return (
        <div className='col-12 col-lg-3'>
            {/* Order info */}
            <div className={styles.status}>
                <div className={styles.status_info}>
                    <span>Buyurtma holati</span>
                    <p>
                        {order?.transaction_status === 'pending'
                            ? "To'lov kutilmoqda"
                            : order?.transaction_status}
                    </p>
                </div>
                <div className={styles.status_price}>
                    <span>Buyurtma narxi</span>
                    <p>{priceFormatted}</p>
                </div>
            </div>

            {/* Seller info */}
            <div className={styles.seller}>
                <span>Sotuvchi</span>
                <div className={styles.seller_box}>
                    <div>
                        <p>{order?.service?.title}</p>
                        <span>offline</span>
                    </div>
                    <img
                        src={order?.service?.poster}
                        alt={order?.service?.title}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* Steps */}
            <div className={styles.status_steps}>
                <Steps
                    direction="vertical"
                    className={styles.greenSteps}
                    current={order?.transaction_status === 'pending' ? 0 : 1}
                    items={[
                        { title: `Buyurtma yaratildi` },
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
