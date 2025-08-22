import { Col, Row } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import styles from "../styles/hero.module.scss"
import HeroCard from '../ui/HeroCard'
import { useRouter } from 'next/router'

const cards = [
    { title: "Dizayn", img: "/static/img/HomePage/pen-tool-1.png" },
    { title: "Ilmiy ishlar", img: "/static/img/HomePage/Main Photo.png" },
    { title: "Dasturlash", img: "/static/img/HomePage/code.png" },
    { title: "3D modellar", img: "/static/img/HomePage/Cube.png" },
]

const Hero = () => {
    const { push } = useRouter()
    const [type, setType] = useState("m")
    const [search, setSearch] = useState("")

    // searchni debounce bilan ishlatamiz
    useEffect(() => {
        if (search.trim().length === 0) return

        const timeout = setTimeout(() => {
            if (type === "m") {
                push(`/search-page?keyword=${search}&type=all&tab=products&page=1`)
            } else {
                push(`/orders/?direction=scientific_work&search=${search}`)
            }
        }, 500) // 0.5s ichida yozmasa qidiruv

        return () => clearTimeout(timeout) // cleanup
    }, [search, type, push])

    return (
        <Row className={styles.heroRow} gutter={32}>
            <div className={styles.bgBlob}></div>
            <Col xs={24} md={12}>
                <div>
                    <h1 className={styles.heroTitle}>
                        Raqamli mahsulotlar va onlayn xizmatlar bozori
                    </h1>
                    <p className={styles.heroParagraph}>
                        Bizning mutaxassislar va sotuvchilar sizga kerakli tayyor raqamli mahsulot yoki xizmatni tez va sifatli taqdim etadi.
                    </p>
                    <div className={styles.heroButtons}>
                        <div className='d-flex align-items-center gap-3 mb-3'>
                            <span
                                onClick={() => setType("m")}
                                className={type == "m" ? styles.activeHeroBtn : styles.heroBtn}
                            >
                                <i className="fa-solid fa-download"></i> Mahsulotlar
                            </span>
                            <span
                                onClick={() => setType("x")}
                                className={type == "x" ? styles.activeHeroBtn : styles.heroBtn}
                            >
                                <i className="fa-solid fa-briefcase"></i> Xizmatlar
                            </span>
                        </div>

                        <div className={styles.searchBox}>
                            <input
                                type="text"
                                placeholder={type === "m"
                                    ? "Qaysi turdagi tayyor mahsulot qidirmoqdasiz?"
                                    : "Qanday xizmat kerak?"
                                }
                                className={styles.input}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <span className={styles.searchIcon}>
                                <SearchOutlined />
                            </span>
                        </div>
                    </div>
                </div>
            </Col>

            <Col xs={24} md={12}>
                <Row gutter={[16, 16]}>
                    {cards.map((card, index) => (
                        <Col
                            span={12}
                            style={{ marginTop: (index === 1 || index === 3) && "30px" }}
                            key={card.title}
                        >
                            <HeroCard title={card.title} img={card.img} />
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    )
}

export default Hero
