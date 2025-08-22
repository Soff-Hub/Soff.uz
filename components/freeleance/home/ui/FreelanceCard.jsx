// FreelanceCard.jsx
import React from 'react'
import styles from "../styles/FreelanceCard.module.scss"
import { Col, Row } from 'antd'
import { useRouter } from 'next/router'

const FreelanceCard = ({ images = [], title, url }) => {
    const { push } = useRouter()
    return (
        <div onClick={() => push(url)} className={styles.card}>
            <Row gutter={[8, 8]}>
                {images.length === 3 ? (
                    <>
                        {/* Chap tarafdagi uzun rasm */}
                        <Col span={12}>
                            <img 
                                src={images[0]} 
                                alt="freelance-0" 
                                className={styles.longImage} 
                            />
                        </Col>
                        {/* O‘ng tarafdagi 2ta tagma-tag rasm */}
                        <Col span={12}>
                            <Row gutter={[8, 8]}>
                                {images.slice(1).map((img, idx) => (
                                    <Col span={24} key={idx}>
                                        <img 
                                            src={img} 
                                            alt={`freelance-${idx+1}`} 
                                            className={styles.smallImage} 
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </>
                ) : (
                    // Default holat (4ta yoki 2ta) 2x2 grid
                    images.slice(0, 4).map((img, idx) => (
                        <Col span={12} key={idx}>
                            <img src={img} alt={`freelance-${idx}`} />
                        </Col>
                    ))
                )}
            </Row>
            <h3 className={styles.title}>{title}</h3>
        </div>
    )
}

export default FreelanceCard
