
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import PageLoader from '~/components/elements/common/PageLoader';
import Loader from './loader';
import Link from 'next/link';

const HomepageDefaultPage = () => {
    const { push } = useRouter()

    // useEffect(() => {
    //     push('/account/register')
    // }, []);

    return (
        <div className="ps-page--my-account">
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
                                Platformada quyidagi mahsulotlarni <br /> sotishingiz mumkin
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
                                <h3 className="l-app-title">Agar sizda mobil telefonda ishlash qulay bo'lsa unda bizning SOFF SELLER mobil ilovamizdan foydalanishingiz mumkin</h3>
                                <p className="l-app-desc">Ilovamizda ham barcha imkoniyatlar qulay va yaxshi ishlab chiqilgan</p>
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


                <div className="l-app">
                    <div className="container">
                        <div className="l-app-inner">
                            <div className="frame-2">
                                <h3 className="l-app-title">Agar sizda mobil telefonda ishlash qulay bo'lsa unda bizning SOFF SELLER mobil ilovamizdan foydalanishingiz mumkin</h3>
                                <p className="l-app-desc">Ilovamizda ham barcha imkoniyatlar qulay va yaxshi ishlab chiqilgan</p>
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


                <div className="l-how">
                    <div className="container">
                        <div className="l-how-inner">
                            <h2 className="l-how-title">
                                Platformada quyidagi mahsulotlarni <br /> sotishingiz mumkin
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
            </main>

            <div>
                <footer className='l-footer'>
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
                </footer>
            </div>
        </div>
    );
};

export default HomepageDefaultPage;




