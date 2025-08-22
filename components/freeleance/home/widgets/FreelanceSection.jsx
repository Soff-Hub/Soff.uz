// FreelanceSection.jsx
import React from 'react'
import styles from "../styles/Freelance.module.scss"
import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import FreelanceCard from '../ui/FreelanceCard'
import { useRouter } from 'next/router'

const cardData = [
    {
        title: "Ilmiy va Akademik Xizmatlar",
        images: [
            "/static/img/HomePage/pen-tool-1.png",
            "/static/img/HomePage/Main Photo.png",
            "/static/img/HomePage/code.png",
            "/static/img/HomePage/Cube.png"
        ],
        url: "/orders?direction=scientific_work"
    },
    {
        title: "3D Dizayn va Vizualizatsiya",
        images: [
            "/static/img/HomePage/Photo 1.png",
            "/static/img/HomePage/image 1.png",
            "/static/img/HomePage/3dLantern.png",
            "/static/img/HomePage/Image Placeholder.png",
        ],
        url: "/orders?direction=three_d"
    },
    {
        title: "Dizayn",
        images: [
            "/static/img/HomePage/Photo4.png",
            "/static/img/HomePage/Photo 2.png",
            "/static/img/HomePage/Photo 3.png",
        ],
        url: "/orders?direction=design"
    },
    {
        title: "Dasturlash xizmatlari",
        images: [
            "/static/img/HomePage/Photo5.png",
            "/static/img/HomePage/TelegramChat.png",
            "/static/img/HomePage/Photo7.png",
        ],
        url: "/orders?direction=web"
    },
]

const FreelanceSection = () => {
    const { push } = useRouter()
    return (
        <div>
            <div className={styles.freelance_section}>
                <div className={styles.freelance_text}>
                    <div className={styles.titleWrapper}>
                        <img src="/static/img/HomePage/icon.png" alt="badge" className={styles.badge} />
                        <h1>Xizmatni tanlang – Buyurtma bering</h1>
                    </div>
                    <p>
                        Tajribali frilanserlar bilan ishlang va sifatli natijaga erishing.
                    </p>
                </div>
                <Button
                    className={styles.freelance_button}
                    size='large'
                    icon={<ArrowRightOutlined />}
                    iconPosition='end'
                    onClick={() => push("/orders")}
                    type='primary'
                >
                    Barcha xizmatlar
                </Button>
            </div>

            {/* Cardlar */}
            <Row className='py-5' gutter={[16, 16]}>
                {cardData.map((item, idx) => (
                    <Col md={12} xs={24} lg={6}  >
                        <FreelanceCard
                            key={idx}
                            title={item.title}
                            images={item.images}
                            url={item.url}
                        />
                    </Col>
                ))}

            </Row>
        </div>
    )
}

export default FreelanceSection
