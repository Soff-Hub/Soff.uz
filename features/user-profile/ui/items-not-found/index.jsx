import React from 'react'
import style from './style.module.scss'

const TYPE_MAP = {
    service: {
        title: "Xizmat mavjud emas",
        description: "Bu sotuvchi hali xizmatlarini ishga tushirmagan."
    },
    portfolio: {
        title: "Portfolio mavjud emas",
        description: "Bu sotuvchi hali portfolio yuklamagan."
    },
    product: {
        title: "Mahsulot mavjud emas",
        description: "Bu sotuvchi hali bu turdagi mahsulot yuklamagan."
    }
}

const ItemNotFound = ({ type = "product" }) => {
    const content = TYPE_MAP[type] || TYPE_MAP['product']

    return (
        <div className={style.wrapper}>
            <div className={style.image}>
                <img src="/static/img/change-setting.png" alt={content.title} />
            </div>

            <div className={style.body}>
                <p className={style.title}>{content.title}</p>
                <p className={style.description}>{content.description}</p>
            </div>
        </div>
    )
}

export default ItemNotFound
