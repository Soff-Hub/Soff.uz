import React from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'next-i18next'

const AffiliateBenefitsSection = () => {
    const { t } = useTranslation('affiliate');
    
    const benefits = [
        t('benefits.items.percentage'),
        t('benefits.items.passive'),
        t('benefits.items.minimal'),
        t('benefits.items.monitoring'),
        t('benefits.items.withdraw'),
        t('benefits.items.market')
    ]
    
    return (
        <div className='affiliate_benefits_wrapper'>
            <div className='container py-5'>
                <div className='affiliate_benefits_section'>
                    <div className='benefits_image'>
                        <img  src="/static/img/affiliate_program/benefist.svg" alt="Affiliate advantages" />
                    </div>
                    <div className='benefits_text'>
                        <h2>{t('benefits.title')}</h2>
                        <p>{t('benefits.description')}</p>
                        <ul>
                            {benefits.map((item, index) => (
                                <li key={index}>
                                    <CheckCircleOutlined style={{ color: '#00A44F', marginRight: '10px', fontSize: '18px' }} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AffiliateBenefitsSection
