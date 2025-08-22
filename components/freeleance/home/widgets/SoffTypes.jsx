import React from 'react'
import styles from "../styles/SoffTypes.module.scss"
import { Col, Divider, Row } from 'antd'

const digitalProducts = [
    { title: "Ilmiy ishlar", img: "/static/img/HomePage/book.png" },
    { title: "3D modellar", img: "/static/img/HomePage/home.png" },
    { title: "Dizayn shablonlari", img: "/static/img/HomePage/color.png" },
    { title: "Veb saytlar", img: "/static/img/HomePage/comp.png" },
    { title: "Shablonlar", img: "/static/img/HomePage/file.png" },
    { title: "Video darsliklar", img: "/static/img/HomePage/video.png" },
]

const freeLanceServices = [
    { title: "Ilmiy va Akademik Xizmatlar", img: "/static/img/HomePage/book.png" },
    { title: "Dizayn", img: "/static/img/HomePage/color.png" },
    { title: "3D modellar", img: "/static/img/HomePage/home.png" },
    { title: "Dasturlash xizmatlari", img: "/static/img/HomePage/comp.png" },
]

const SoffTypes = () => {
    return (
        <div className={styles.soffTypes}>
            <h1 className={styles.sectionTitle}>
                Soff.uz’da daromad qilishingiz mumkin bo‘lgan 2 yo‘l
            </h1>

            {/* Elektron mahsulot */}
            <div className={styles.block}>
                <div className={styles.blockHeader}>
                    <h3>1</h3>
                    <h2>Elektron mahsulot sotish</h2>
                </div>
                <Row align="top" gutter={[16, 16]}>
                    <Col xs={24} lg={12}>
                        <Row gutter={[16, 16]}>
                            {digitalProducts.map((item, idx) => (
                                <Col xs={24} lg={12} key={idx}>
                                    <div className={styles.itemCard}>
                                        <div>
                                            <img src={item.img} alt={item.title} />
                                        </div>
                                        <p>{item.title}</p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xs={24} lg={12}>
                        <div className={styles.item}>
                            <img src={"/static/img/HomePage/shield.png"} alt="shield" />
                            <p>Sotuv va marketingni Soff.uz o‘zi amalga oshiradi.</p>
                        </div>
                        <div className={styles.itemCard}>
                            <img src={"/static/img/HomePage/coin.png"} alt="coin" />
                            <p>Har bir sotuvdan daromad olasiz va uni xohlagan vaqtda kartangizga yechib olasiz.</p>
                        </div>
                    </Col>
                </Row>
            </div>

            <Divider className={styles.divider} />

            {/* Xizmat ko‘rsatish */}
            <div className={styles.block}>
                <div className={styles.blockHeader}>
                    <h3>2</h3>
                    <h2>Xizmat ko‘rsatish (Gig)</h2>
                </div>
                <Row align="top" gutter={[16, 16]}>
                    <Col xs={24} lg={12}>
                        <Row gutter={[16, 16]}>
                            {freeLanceServices.map((item, idx) => (
                                <Col xs={24} lg={12} key={idx}>
                                    <div className={styles.itemCard}>
                                        <div>
                                            <img src={item.img} alt={item.title} />
                                        </div>
                                        <p>{item.title}</p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xs={24} lg={12}>
                        <div className={styles.item}>
                            <img src={"/static/img/HomePage/shield.png"} alt="shield" />
                            <p>Sotuv va marketingni Soff.uz o‘zi amalga oshiradi.</p>
                        </div>
                        <div className={styles.item}>
                            <img src={"/static/img/HomePage/coin.png"} alt="coin" />
                            <p>Har bir sotuvdan daromad olasiz va uni xohlagan vaqtda kartangizga yechib olasiz.</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default SoffTypes
