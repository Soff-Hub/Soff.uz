import { useRouter } from 'next/router'
import React from 'react'

export default function HeaderTop() {
    const { pathname } = useRouter()
    const isDark = pathname !== '/'
    return (
        <div className='header-topsection new' style={{ backgroundColor: isDark ? "" : 'transparent' }}>
            <div className="container">
                <div className='sotuvchi-boling sotuvchi-boling-2'>
                    <a href='tel:+998910086789'>
                        <i className={`fa-solid fa-phone mr-2 ${isDark ? 'text-black' : 'text-white'}`}></i>
                        <span className={isDark ? 'text-black' : 'text-white'}>{'+998 (91) 008 67 89'}</span>
                    </a>

                    <a href='https://t.me/soff_uz' target='_blank' >
                        <i className={`fa-brands fa-telegram me-2 phone-ic ${isDark ? 'text-black' : 'text-white'}`}></i>
                    </a>

                    <a href='https://www.instagram.com/soffuz_/' target='_blank' >
                        <i className={`fa-brands fa-instagram me-2 phone-ic ${isDark ? 'text-black' : 'text-white'}`}></i>
                    </a>
                </div>
                <div className='sotuvchi-boling'>
                    <a href='https://seller.soff.uz' target='_blank' className={isDark ? 'black-link' : 'white-link'}>Sotuvchi bo'lish</a>
                    <i className={`fa-solid fa-user-check ${isDark ? 'text-black' : 'text-white'}`}></i>
                </div>
            </div>
        </div>
    )
}
