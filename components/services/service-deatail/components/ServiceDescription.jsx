import React from 'react'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import styles from "../styles/detail.module.scss";

const ServiceDescription = ({ description = {}, priceBox = {} }) => {
    const { price, id, days, revisions } = priceBox;
    const { requirements = '', file = '', serviceItems = [], description: descText = '' } = description;

    return (
        <div className={styles.serviceDescription}>
            <h2>Xizmat tavsifi</h2>
            {descText && <div dangerouslySetInnerHTML={{ __html: descText }} />}

            <h3>Boshlash uchun sotuvchiga kerak</h3>
            {requirements && <div dangerouslySetInnerHTML={{ __html: requirements }} />}

            <h3>Fayllar</h3>
            {file ? (
                <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    href={file}
                    target="_blank"
                    download
                    className={styles.downloadBtn}
                >
                    Faylni yuklab olish
                </Button>
            ) : (
                <p>Fayl mavjud emas</p>
            )}

            <div className={styles.serviceBox}>
                <h3>Qo'shimcha xizmatlar</h3>
                {serviceItems.map((item, idx) => (
                    <p key={idx} className={styles.serviceItem}>
                        {idx + 1}. {item}
                    </p>
                ))}
            </div>

            <div className={styles.pricing}>
                <div className={styles.infoBox}>
                    <p className={styles.info}><i className="fa-solid fa-clock"></i> {days} kunda yetkazish</p>
                    <p className={styles.info}><i className="fa-solid fa-pen-to-square"></i> {revisions} marta tahrirlash huquqi</p>
                </div>
                <div className={styles.btnWrapper}>
                    <Button className={styles.btn}>Buyurtma berish</Button>
                </div>
            </div>
        </div>
    )
}

export default ServiceDescription;
