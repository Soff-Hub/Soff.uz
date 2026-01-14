import { Button } from 'antd'
import React from 'react'
import { useTranslation } from 'next-i18next'

const HeroSection = () => {
    const { t } = useTranslation('affiliate');
    return (
        <div className='container py-5'>
            <div className='hero_section'>
                <div className='hero_content'>
                    <h1>{t('hero.title')}</h1>
                    <p>{t('hero.description')}</p>
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