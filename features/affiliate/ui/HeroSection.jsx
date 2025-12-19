import { Button } from 'antd'
import React from 'react'

const HeroSection = () => {
    return (
        <div className='container py-5'>
            <div className='hero_section'>
                <div className='hero_content'>
                    <h1>Soff.uz ga yangi foydalanuvchilarni taklif qilish orqali daromadingizni oshiring!</h1>
                    <p>Hamkorlik havolasini baham ko'ring va tavsiyalaringiz amalga oshirgan har bir tranzaksiya uchun mukofot oling. Bu juda oddiy.</p>
                    {/* <button className='hero_btn'>Bugundan daromad olishni boshlang</button> */}
                </div>
                <div className='hero_img'>
                    <img src="/static/img/affiliate_program/hero.webp" alt="happy man" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection