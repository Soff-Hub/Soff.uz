import { useRouter } from 'next/router'
import React from 'react'
import PremiumBadge from '~/components/product/audio/PremiumBadge'

export default function HeaderTop() {
    const { pathname } = useRouter()
    const isDark = pathname !== '/'
    return (
        <div className='header-topsection mb-2' style={{ backgroundColor: '#00a44f' }}>
            <div className="container">
                <div className='sotuvchi-boling sotuvchi-boling-2'>
                    <a href='https://t.me/soff_uz' target='_blank' >
                        <i className={`fa-brands fa-telegram me-1 phone-ic fs-4 text-white`}></i>
                    </a>

                    <a href='https://www.instagram.com/soffuz_/' target='_blank' >
                        <i className={`fa-brands fa-instagram me-1 phone-ic fs-4 text-white`}></i>
                    </a>
                </div>
                <div className='sotuvchi-boling'>
                    <PremiumBadge />
                    <a href='https://seller.soff.uz' target='_blank' className={`fs-4 text-white`}>Sotuvchi bo'lish</a>
                    <a href='tel:+998910086789' className='ml-3'>
                        <i className={`fa-solid fa-phone mr-2 text-white`}></i>
                        <span className={'text-white'}>{'+998 (91) 008 67 89'}</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
