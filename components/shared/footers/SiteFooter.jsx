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
                <div className="row">
                    <div className="col-lg-5 col-sm-12">
                        <div className="left-inner">
                            <Link href="/">
                                <a className="ps-logo">
                                    <NextImageCard
                                        url="/static/img/soff/logo-dark.png"
                                        className="logoo"
                                        width="100px"
                                        height="40px"
                                    />
                                </a>
                            </Link>
                            <p className='fs-3'> - raqamli xizmatlar bozori! </p>
                        </div>
                    </div>
                    <div className="site-footer-right col-lg-7 col-sm-12 ">
                        {
                            contacts.map((el, index) => (
                                <div key={index} className='site-footer-item'>
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
                        {/* <p className='m-0'>Yangiliklarga obuna bo'lish</p>
                        <form onSubmit={handleSubmit} className='subscribe-box'>
                            <Input value={email} placeholder='Email' onChange={e => setEmail(e.target.value)} className='subscribe-input' />
                            <Button htmlType='submit'>Obuna bo'lish</Button>
                        </form> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteFooter;
