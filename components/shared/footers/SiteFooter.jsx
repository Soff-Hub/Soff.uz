import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Modal } from 'antd';
import NextImageCard from '~/components/nextImagecard';

const SiteFooter = () => {
    const [email, setEmail] = useState('')
    const contacts = [
        {
            link: "https://yandex.uz/maps/-/CDxfY-1C",
            text: "8/1 Bunyodkor Avenue, Toshkent shahri",
            icon: "fa-solid fa-location-dot"
        },
        {
            link: "tel:+998910086789",
            text: "+998 (91) 008 67 89",
            icon: "fa-solid fa-phone"
        },
        {
            link: "mailto:support@soff.uz",
            text: "support@soff.uz",
            icon: "fa-solid fa-envelope"
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        Modal.success({
            title: "Muvaffaqiyatli",
            content: "Yangiliklarga ubuna bo'ldingiz"
        })
        setEmail('')
    }

    return (
        <div className='site-footer'>
            <div className="container">
                <div className="site-footer-inner row m-0">
                    <div className="site-footer-left col-lg-6 col-md-6 col-sm-12">
                        <div className="left-inner">
                            <Link href="/">
                                <a className="ps-logo">
                                    <NextImageCard
                                        url="/static/img/soff/logo-dark.png"
                                        className="logoo"
                                        width="150px"
                                        height="50px"
                                    />
                                </a>
                            </Link>
                            <p>
                                <strong>SOFF.UZ</strong> - qidiruv tizimi
                            </p>
                            <p>
                                O‘zbek tilida saralanib borilayotgan sifatli ma’lumotlar jamlanmasini, fayllar, tasvirlar, videolar, audiolar ko‘rinishida qidirib topish imkonini beradi.
                            </p>
                            {/* <Link href={'/account/donat'}>
                                <a>
                                    Loyiha rivoji uchun o'z hissangizni qo'shing - Donat
                                </a>
                            </Link> */}
                        </div>
                    </div>
                    <div className="site-footer-right col-lg-6 col-md-6 col-sm-12">
                        {
                            contacts.map(el => (
                                <div className='site-footer-item'>
                                    <div className="site-footer-icon">
                                        <i className={el.icon}></i>
                                    </div>
                                    <Link href={el.link}>
                                        <a className="site-footer-text" target='_blank'>
                                            {el.text}
                                        </a>
                                    </Link>
                                </div>
                            ))
                        }
                        <p className='m-0'>Yangiliklarga obuna bo'lish</p>
                        <form onSubmit={handleSubmit} className='subscribe-box'>
                            <Input value={email} placeholder='Email' onChange={e => setEmail(e.target.value)} className='subscribe-input' />
                            <Button htmlType='submit'>Obuna bo'lish</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteFooter;
