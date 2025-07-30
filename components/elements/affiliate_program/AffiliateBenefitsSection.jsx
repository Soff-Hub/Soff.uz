import React from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'

const benefits = [
    "Har bir sotuvdan foizli daromad",
    "Passiv daromad olish imkoniyati",
    "Minimal harakat — maksimal foyda",
    "Doimiy kuzatuv va statistika",
    "Pulni tezkor yechib olish imkoniyati",
    "Raqobatsiz mahalliy bozor"
]

const AffiliateBenefitsSection = () => {
    return (
        <div className='affiliate_benefits_wrapper'>
            <div className='container py-5'>
                <div className='affiliate_benefits_section'>
                    <div className='benefits_image'>
                        <img  src="/static/img/affiliate_program/benefist.svg" alt="Affiliate advantages" />
                    </div>
                    <div className='benefits_text'>
                        <h2>Soff.uz hamkorlik dasturining afzalliklari</h2>
                        <p>Hamkor sifatida siz har bir faoliyatingiz uchun mukofot olasiz. Quyidagi imkoniyatlardan bahramand bo‘ling:</p>
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
