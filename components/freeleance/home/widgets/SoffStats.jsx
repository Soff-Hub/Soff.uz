import React from 'react'
import styles from "../styles/SoffStats.module.scss"
import { Col, Row } from 'antd'

const stats = [
    { title: "Raqamli mahsulotlar", value: 250000 },
    { title: "Oylik faol foydalanuvchilar", value: 500000 },
    { title: "Tranzaksiyalar", value: 86000 },
    { title: "Mutaxassislar soni", value: 11000 },
]

const SoffStats = () => {
    return (
        <div className={styles.statsWrapper}>
            <img src="/static/img/HomePage/icon.png" alt="badge" className='mb-5' />
            <h1 className={styles.title}>Statistik ma’lumotlar</h1>
            <Row gutter={[16, 16]} justify="center" align="stretch">
                {stats.map((item, idx) => (
                    <Col xs={24} sm={12} md={12} lg={6} key={idx}>
                        <div className={styles.statCard}>
                            <div className={styles.value}>
                                {item.value.toLocaleString()}+
                            </div>
                            <div className={styles.label}>
                                {item.title}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default SoffStats
