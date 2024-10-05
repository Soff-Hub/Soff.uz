
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import PageLoader from '~/components/elements/common/PageLoader';
import Loader from './loader';
import Link from 'next/link';
import Head from 'next/head';

const HomepageDefaultPage = () => {
    const { push } = useRouter()

    // useEffect(() => {
    //     push('/account/register')
    // }, []);

    return (
        <div className="ps-page--my-account">

            <Head>
                <title>Soffda Intelektuall mulklaringizni soting va daromad qiling</title>
            </Head>
            <div className="l-navbar">
                <div className="container">
                    <div className="l-navbar-inner py-4">
                        <div className="l-navbar-logo">
                            <img src="./static/img/seller-logo.jpg" height={30} alt="soff seller logo" />
                        </div>

                        <div className="l-navbar-buttons">
                            <Link href={'/account/login'}>
                                <a className='l-navbar-login-button'>
                                    Kirish
                                </a>
                            </Link>
                            <Link href={'/account/register'}>
                                <a className='l-navbar-signup-button'>
                                    Sotuvchi bo'lish
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <main>
                <div className="l-hero">
                    <div className="container">
                        <div className="l-hero-inner">
                            <div className="frame-1">
                                <p className="text-1">Hoziroq daromad qilishni<br />boshlang</p>
                                <p className="text-2">Intelektuall mulkaringizni soff da oson soting va daromadingizni oshiring</p>
                                <Link href={'/account/register'}>
                                    <a className='l-navbar-signup-button'>
                                        Sotuvchi bo'lish
                                    </a>
                                </Link>
                            </div>
                            <div className="frame-2">
                                <img src="./static/img/auth/img18.png" alt="" height={400} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="l-how">
                    <div className="container">
                        <div className="l-how-inner">
                            <h2 className="l-how-title">
                                Platformada quyidagi turdagi intelektuall mulklaringizni <br /> sotishingiz mumkin
                            </h2>

                            <div className="l-how-content">
                                <div className="l-how-list">
                                    <img height={50} src="/static/img/document.png" alt="" />
                                    <h4>Ishlanmalar</h4>

                                    <ul>
                                        <li>Biznes g'oyalar</li>
                                        <li>Ijodiy ishlanmalar</li>
                                        <li>Taqdimotlar</li>
                                    </ul>
                                </div>

                                <div className="l-how-list">
                                    <img height={50} src="/static/img/programming-course.png" alt="" />
                                    <h4>Video materiallar</h4>

                                    <ul>
                                        <li>Videodarslar</li>
                                        <li>Video ma'lumotlar</li>
                                        <li>Playlistlar</li>
                                    </ul>
                                </div>

                                <div className="l-how-list">
                                    <img height={50} src="/static/img/voice-message.png" alt="" />
                                    <h4>Audio materiallar</h4>

                                    <ul>
                                        <li>Audo hikoyalar</li>
                                        <li>Audio darslar</li>
                                        <li>Musiqalar</li>
                                    </ul>
                                </div>

                                <div className="l-how-list">
                                    <img height={50} src="/static/img/layout.png" alt="" />
                                    <h4>Shablonlar</h4>

                                    <ul>
                                        <li>Dizayn shablonlari</li>
                                        <li>Sayt shablonlari</li>
                                        <li>Video shablonlar</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="l-app">
                    <div className="container">
                        <div className="l-app-inner">
                            <div className="frame-2">
                                <h2 className="l-app-title mb-4">Istalgan joydan ishlang</h2>
                                <p className="l-app-desc mb-5">Sotuvingizni masofadan boshqaring — sotuvchilar uchun qulay veb-sayt yoki mobil ilova orqali</p>
                                <div className="d-flex gap-2">
                                    <Link href="https://play.google.com/store/apps/details?id=com.SoffUz&pcampaignid=web_share">
                                        <a target='_blank' className="l-app-btn google">.</a>
                                    </Link>
                                    <Link href="https://apps.apple.com/tr/app/soff-seller/id6502236741">
                                        <a target='_blank' className="l-app-btn apple">.</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="l-about">
                    <div className="container">
                        <div className="l-about-inner">
                            <div className="l-about-item">
                                <img className='l-about-img' src="https://assets.entrepreneur.com/content/3x2/2000/20180109204555-GettyImages-658621130.jpeg" alt="" />
                                <div className="l-about-content">
                                    <h2 className='l-about-title'>Qanday qilib video materiallarni sotuvini oshirish mumkin?</h2>
                                    <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sed suscipit doloremque explicabo ipsam minus!</p>

                                    <Link href={'/account/register'}>
                                        <a className='l-navbar-signup-button'>
                                            Sotuvchi bo'lish
                                        </a>
                                    </Link>
                                </div>
                            </div>

                            <div className="l-about-item">
                                <div className="l-about-content">
                                    <h2 className='l-about-title'>Qanday qilib video materiallarni sotuvini oshirish mumkin?</h2>
                                    <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sed suscipit doloremque explicabo ipsam minus!</p>

                                    <Link href={'/account/register'}>
                                        <a className='l-navbar-signup-button'>
                                            Sotuvchi bo'lish
                                        </a>
                                    </Link>
                                </div>
                                <img className='l-about-img' src="https://images.ctfassets.net/qr8kennq1pom/5zceNjV1u1YFuD5UshOdXB/c9cc297b3a34314718cab112f0d7dfe1/Top_companies_to_intern_in_Germany.jpg" alt="" />
                            </div>

                            <div className="l-about-item">
                                <img className='l-about-img' src="https://i.pinimg.com/originals/15/eb/ba/15ebba8d38d5030034cdf1d7c6db2759.jpg" alt="" />
                                <div className="l-about-content">
                                    <h2 className='l-about-title'>Qanday qilib video materiallarni sotuvini oshirish mumkin?</h2>
                                    <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sed suscipit doloremque explicabo ipsam minus!</p>

                                    <Link href={'/account/register'}>
                                        <a className='l-navbar-signup-button'>
                                            Sotuvchi bo'lish
                                        </a>
                                    </Link>
                                </div>
                            </div>

                            <div className="l-about-item">
                                <div className="l-about-content">
                                    <h2 className='l-about-title'>Qanday qilib video materiallarni sotuvini oshirish mumkin?</h2>
                                    <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sed suscipit doloremque explicabo ipsam minus!</p>

                                    <Link href={'/account/register'}>
                                        <a className='l-navbar-signup-button'>
                                            Sotuvchi bo'lish
                                        </a>
                                    </Link>
                                </div>
                                <img className='l-about-img' src="https://www.sostav.ru/app/public/images/news/2013/10/23/pirat.JPG" alt="" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="l-text">
                    <div className="container">
                        <div className="l-text-inner">
                            <h2 className="l-text-title mb-5">
                                Biz haqimizda
                                <span className='top-sellersss'>
                                    sotuvchilarimiz

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="200"
                                        height="32"
                                        fill="none"
                                        viewBox="0 0 228 38"
                                        className="img-crossed"
                                    >
                                        <path
                                            stroke="#4caf4f"
                                            strokeWidth="3"
                                            d="M1 19q30.672-15.051 16.143 0Q2.54 34.204 33.286 19q30.67-15.204 16.143 0-23.51 34 16.142 0 30.672-34 16.143 0-11.076 17.841 16.143 0Q128.53 1.159 114 19q-20.673 32.931 16.143 0 30.67-32.931 16.143 0-11.538 19.368 16.143 0 30.67-19.368 16.142 0-8.969 4.545 16.143 0 30.672-4.545 16.143 0Q162.693 44.596 227 19"
                                        />
                                    </svg>
                                </span>
                                qanday fikrda?
                            </h2>

                            <div className="l-text-content mt-3">
                                <div className="l-text-list">
                                    <img height={50} src="/static/img/userava-1.png" alt="" />
                                    <h4>Doniyor Eshmamatov</h4>

                                    <p>
                                        Assalomu alaykum saytni yorvoripsila vashe gapyo, har kuni soqa oqib kelyapti
                                    </p>
                                </div>

                                <div className="l-text-list">
                                    <img height={50} src="/static/img/userava-1.png" alt="" />
                                    <h4>Doniyor Eshmamatov</h4>

                                    <p>
                                        Assalomu alaykum saytni yorvoripsila vashe gapyo, har kuni soqa oqib kelyapti
                                    </p>
                                </div>

                                <div className="l-text-list">
                                    <img height={50} src="/static/img/userava-1.png" alt="" />
                                    <h4>Doniyor Eshmamatov</h4>

                                    <p>
                                        Assalomu alaykum saytni yorvoripsila vashe gapyo, har kuni soqa oqib kelyapti
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <div>
                <footer className='l-footer'>
                    <div className="container">
                        <div className="footer-frame-2">
                            <div className="company-info">
                                <div className="logo-footer">
                                    <img src="/assets/Icon.svg" alt="" />
                                    <img src="./assets/Nexcent.svg" alt="" style={{ fill: 'var(--neutral-white, #FFF)' }} />
                                </div>
                                <div className="copyright">
                                    <p>
                                        Copyright © 2020 Nexcent ltd.
                                    </p>
                                    <p>
                                        All rights reserved
                                    </p>
                                </div>
                                <div className="social-links">
                                    <img src="./assets/social_icons/Social Icons.svg" alt="" />
                                    <img src="./assets/social_icons/Social Icons (2).svg" alt="" />
                                    <img src="./assets/social_icons/Social Icons (3).svg" alt="" />
                                    <img src="./assets/social_icons/Social Icons (4).svg" alt="" />
                                </div>
                            </div>
                            <div className="company-links">
                                <div className="column">
                                    <p className="head-column">
                                        Company
                                    </p>
                                    <div className="list-items">
                                        <p>
                                            About us
                                        </p>
                                        <p>
                                            Blog
                                        </p>
                                        <p>
                                            Contact us
                                        </p>
                                        <p>
                                            Pricing
                                        </p>
                                        <p>
                                            Testimonials
                                        </p>
                                    </div>
                                </div>
                                <div className="column">
                                    <p className="head-column">
                                        Support
                                    </p>
                                    <div className="list-items">
                                        <p>
                                            Help center
                                        </p>
                                        <p>
                                            Terms of service
                                        </p>
                                        <p>
                                            Legal
                                        </p>
                                        <p>
                                            Privacy policy
                                        </p>
                                        <p>
                                            Status
                                        </p>
                                    </div>
                                </div>
                                <div className="column">
                                    <p className="head-column">Stay up to date</p>
                                    <div className="email-box">
                                        <input type="email" id="email" className="email-input" placeholder="Your email address" />
                                        <img src="./assets/send.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default HomepageDefaultPage;




