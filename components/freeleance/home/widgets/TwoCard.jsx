import React from 'react'
import styles from "../styles/TwoCard.module.scss"
import { Button } from "antd"
import { ArrowRightOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const TwoCard = () => {
    const {push} = useRouter()

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Tayyor mahsulotlaringizni
                    yuklab passiv daromad qiling</h2>
                <div className={styles.actions}>
                    <Button size='large' onClick={() => push("/account/login")} className={styles.btn} iconPosition='end' icon={<ArrowRightOutlined />}>
                        Sotuvchi bo’lish
                    </Button>
                </div>
            </div>
            <div className={styles.card}>
                <h2 className={styles.title}>Xizmatlaringizni ko‘rsatib
                    faol daromad qiling</h2>
                <div className={styles.actions}>
                    <Button onClick={() => push("/account/login")} size='large' className={styles.btn} iconPosition='end'  icon={<ArrowRightOutlined />}>
                        Frilanser bo’lish
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TwoCard
