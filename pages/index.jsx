import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { baseUrl } from '~/repositories/Repository';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import Image from 'next/image';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import PageContainer from '~/components/layouts/PageContainer';



const HomepageDefaultPage = ({ faq, advantages, projecs }) => {
    const [acc, setAcc] = useState(0)
    const { user } = useSelector(state => state.auth)

    var settings = {
        infinite: true,
        speed: 300,
        centerMode: true,
        variableWidth: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    };

    return (
        <div className="ps-page--my-account">
            <div style={{ height: '0', overflow: 'hidden', position: 'relative', zIndex: -6, opacity: 0 }}><PageContainer title={'none'} /></div>
            <Head>
                <title aria-label='Sell ​​your Intellectual Property on Soff and earn' aria-level={1}>Soffda Intelektuall mulklaringizni soting va daromad qiling</title>
                <meta name="description" content="Intelektuall mulkaringizni soff da oson soting va daromadingizni oshiring" />
                <meta name="keywords" content="soff seller, sof seller, seller soff, soff sotuvchi, seller, soffda sotish, seffuzda sotish, sotuvch bo'lish, soffuz da sotivchi bolish, intelektuall mulk sotish, video sotish, audio sotish, shablon sotish, sofda dokument sotish, sofda sotuvchi bo'lish" />
            </Head>

            <div className="l-navbar">
                <div className="container">
                    <div className="l-navbar-inner py-4">
                        <div className="l-navbar-logo">
                            <img src="./static/img/seller-logo.jpg" alt="soff seller logo" />
                        </div>

                        <nav className="l-navbar-buttons">
                            {
                                user?.access ? (
                                    <Link href={'/account/dashbord'}>
                                        <a className='l-navbar-signup-button' aria-label={'register or become a seller'}>
                                            Profilga o'tish
                                        </a>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={'/account/login'}>
                                            <a className='l-navbar-login-button' aria-label='sign in'>
                                                Kirish
                                            </a>
                                        </Link>
                                        <Link href={'/account/register'}>
                                            <a className='l-navbar-signup-button' aria-label={'register or become a seller'}>
                                                Sotuvchi bo'lish
                                            </a>
                                        </Link>
                                    </>
                                )
                            }
                        </nav>
                    </div>
                </div>
            </div>

            <main>
                <div className="l-hero">
                    <div className="container">
                        <div className="l-hero-inner">
                            <div className="frame-1 l-hero-content">
                                <h1 className="text-1 l-hero-title" aria-label='Start earning now'>Hoziroq daromad <br /> qilishni boshlang</h1>
                                <p className="text-2 l-hero-desc" aria-label='Sell ​​your intellectual property easily on soff and increase your income'>Intelektuall mulkaringizni soff da oson soting va daromadingizni oshiring</p>
                                <Link href={'/account/register'}>
                                    <a className='hero-btn' aria-label='become a seller'>
                                        <span className='btn-inner'>Sotuvchi bo'lish</span>

                                        <svg className='gooo'>
                                            <filter id="goo">
                                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result='blur' />
                                                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                                                <feBlend in="SourceGraphic" in2="goo" />
                                            </filter>
                                        </svg>

                                        <span className='right-up-icon'>
                                        </span>
                                    </a>
                                </Link>
                            </div>

                            <div className="frame-2 hero-img">
                                <img src="./static/img/man.png" alt="" height={450} />
                                <div class="circle-ripple"></div>
                                <span className='daromad'>Daromad</span>
                                <span className='foyda'>foyda</span>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="l-first">
                    <div className="l-first-inner">
                        <h2 className="text-1" aria-label='Soff da sotishning afzalliklari'>Soff da sotishning afzalliklari</h2>
                        <ul className="circles row px-4 m-0">
                            {
                                advantages.map((el, i) => (
                                    <li className='col-md-3 col-sm-4 col-12 p-0 l-first-item-last' key={i}>
                                        <div className="l-first-item">
                                            <div>
                                                <img src={el?.icon} alt={el.title} />
                                                <h4 className='mt-3'>{el.title}</h4>
                                                <p className='m-0'>{el.description}</p>
                                                {
                                                    el?.last && (
                                                        <Link href={'/account/register'}>
                                                            <a className='hero-btn' aria-label='become a seller'>
                                                                <span className='btn-inner'>Sotuvchi bo'lish</span>

                                                                <span className='right-up-icon'>
                                                                </span>
                                                            </a>
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="l-how">
                    <div className="container">
                        <div className="l-how-inner">
                            <h2 className="l-how-title" aria-label='You can sell the following types of intellectual property on the platform'>
                                Platformada <span className='har-xil-turdagi'><div>har</div> <div>xil</div> <div>turdagi</div></span> intelektuall mulklaringizni sotish imkoniyatiga egasiz
                            </h2>

                            <div className="l-how-content">
                                <div className="l-how-list">
                                    <img height={50} src="/static/img/document.png" alt="" />
                                    <h4 aria-label='developments'>Ishlanmalar</h4>

                                    <ul>
                                        <li aria-label='bussines ideas'>Biznes g'oyalar</li>
                                        <li aria-label='creative works'>Ijodiy ishlanmalar</li>
                                        <li aria-label='cours work and, slides'>Taqdimotlar</li>
                                    </ul>
                                </div>

                                <div className="l-how-list">
                                    <img height={50} src="/static/img/programming-course.png" alt="" />
                                    <h4 aria-label='video contents'>Video materiallar</h4>

                                    <ul>
                                        <li aria-label='video lessons'>Videodarslar</li>
                                        <li aria-label='video data'>Video ma'lumotlar</li>
                                        <li aria-label='playlists'>Playlistlar</li>
                                    </ul>
                                </div>

                                <div className="l-how-list">
                                    <img height={50} src="/static/img/voice-message.png" alt="" />
                                    <h4 aria-label='audio contents'>Audio materiallar</h4>

                                    <ul>
                                        <li aria-label='audio stories'>Audo hikoyalar</li>
                                        <li aria-label='audio lessons'>Audio darslar</li>
                                        <li aria-label='musics'>Musiqalar</li>
                                    </ul>
                                </div>

                                <div className="l-how-list">
                                    <img height={50} src="/static/img/layout.png" alt="" />
                                    <h4 aria-label='multi type templates'>Shablonlar</h4>

                                    <ul>
                                        <li aria-label='design templates'>Dizayn shablonlari</li>
                                        <li aria-label='website templates'>Sayt shablonlari</li>
                                        <li aria-label='video templates and etc.'>Video shablonlar</li>
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
                                <h2 className="l-app-title mb-4" aria-label='Work from anywhere'>Qulay boshqaruv paneli</h2>
                                <p className="l-app-desc mb-5" aria-label='Manage your sales remotely — with a seller-friendly website or mobile app'>Mobil ilova yoki vebsayt orqali o'zingizga qulay joyda ishlang</p>
                                <div className="d-flex gap-2">
                                    <Link href="https://play.google.com/store/apps/details?id=com.SoffUz&pcampaignid=web_share">
                                        <a target='_blank' className="l-app-btn google" aria-label='download mobile app for android free'>.</a>
                                    </Link>
                                    <Link href="https://apps.apple.com/tr/app/soff-seller/id6502236741">
                                        <a target='_blank' className="l-app-btn apple" aria-label='download mobile app for ios free'>.</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="wrap">
                    <div class="content content--sticky bg-1">
                        <div className="l-about">
                            <div className="container">
                                <div className="l-about-inner">
                                    <div className="l-about-item">
                                        <img className='l-about-img' src="/static/gif/video.gif" alt="" />
                                        <div className="l-about-content">
                                            <h2 className='l-about-title'>
                                                <u className='mark-video'>Video</u> materiallaringizni sotish yoki keng auditoriyaga ulashish imkoniyati
                                            </h2>
                                            <p className='mb-4'>
                                                Video kurslar, video shanblonlaringizni qanday sotishni bilmayapsizmi? soff.uz siz uchun eng oqilona va xavfsiz yechim! Soff.uz ga yuklagan videolaringiz google qidiruvida birinchilardan bo'lib chiqishini ta'minlaydi.
                                            </p>

                                            <Link href={'/account/register'}>
                                                <a className='l-navbar-signup-button'>
                                                    Sotuvchi bo'lish
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content content--sticky bg-2">
                        <div className="l-about">
                            <div className="container">
                                <div className="l-about-inner">
                                    <div className="l-about-item">
                                        <div className="l-about-content">
                                            <h2 className='l-about-title'><u className='mark-video white'>Audio</u> materiallaringizni Soff.uz da soting yoki tekinga ulashing</h2>
                                            <p className='mb-4'>
                                                Siz havaskor qo'shiqchimisiz yoki audio kitob yoki ertaklar yaratuvchisimisiz, o'zingizga keng auditoriya izlayapsizmi? unda sizga Soff Seller bo'lishni tavsiya qilamiz
                                            </p>

                                            <Link href={'/account/register'}>
                                                <a className='l-navbar-signup-button'>
                                                    Sotuvchi bo'lish
                                                </a>
                                            </Link>
                                        </div>
                                        <img className='l-about-img' src="/static/gif/audio.gif" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content content--sticky bg-1">
                        <div className="l-about">
                            <div className="container">
                                <div className="l-about-inner">
                                    <div className="l-about-item">
                                        <img className='l-about-img' src="/static/gif/template.gif" alt="" />
                                        <div className="l-about-content">
                                            <h2 className='l-about-title'>Tayyor <u className='mark-video'>shablonlaringiz</u>orqali online daromad qiling</h2>
                                            <p className='mb-4'>Sizda qayta foydalanish uchun tayyor websayt, blankalar, dizayn, excel va boshqa turdagi shablonlar bormi? Soff.uz imkoniyatlaridan foydalaning va bu yo'nalishda top <br /> Soff Sellerlardan biri bo'ling
                                            </p>

                                            <Link href={'/account/register'}>
                                                <a className='l-navbar-signup-button'>
                                                    Sotuvchi bo'lish
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content content--sticky bg-2">
                        <div className="l-about">
                            <div className="container">
                                <div className="l-about-inner">
                                    <div className="l-about-item">
                                        <div className="l-about-content">
                                            <h2 className='l-about-title'>Turli mavzularga oid <u className='mark-video white'>hujjat va fayllarni</u> soting yoki bepul ulashing</h2>
                                            <p className='mb-4'>
                                                Sizda turli xil qo'lyozmalar, taqdimotlar, muhim mavzudagi hujjatlar bor va bularni kimdirlar shu mavzularda izlanish qilmoqda, ularga ko'proq ma'lumot topishda yordam berish va ularni vaqtini tejash orqali daromad qiling
                                            </p>

                                            <Link href={'/account/register'}>
                                                <a className='l-navbar-signup-button'>
                                                    Sotuvchi bo'lish
                                                </a>
                                            </Link>
                                        </div>
                                        <img className='l-about-img' src="/static/gif/work.gif" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="l-faq">
                    <div className="container">
                        <div className="l-faq-inner">
                            <h3 className='l-faq-title'>Soff dan sotuvchi bo'lib foydalanish bo'yicha eng ko'p beriladigan savollar</h3>

                            <div className="l-faq-list">
                                <div className="l-faq-item" onClick={() => setAcc(0)}>
                                    <div className="l-faq-accordion-header">
                                        <h4 className='l-faq-accordion-title m-0' aria-label='Soff.uz nima?'>
                                            Soff.uz nima?
                                        </h4>

                                        <i class={`fa-solid fa-${acc === 0 ? 'minus' : 'plus'}`}></i>
                                    </div>

                                    <div className={`l-faq-content ${acc === 0 ? 'active' : ''}`} aria-description="Soff.uz - Intellektual mulk marketi, Intellektual mahsulotlarini soting va xarid qiling. Intellektual mulk - ijodiy aqliy faoliyat mahsuli. Ixtirochilik va mualliflik obʼyekti huquqi majmuiga kiruvchi, fan, adabiyot, sanʼat va ishlab chiqarish sohasida ijodiy faoliyatning boshqa turlari, adabiy, badiiy, ilmiy asarlar, ijrochi aktyorlik sanʼati, jumladan ovoz yozish, radio, televideniye asarlari, kashfiyotlar, ixtirolar, ratsionalizatorlik takliflari, sanoat namunalari, kompyuterlar uchun dasturlar, maʼlumotlar bazasi, nou-xauning ekspert tizimlari, tovar belgilari, firma atamalari va boshqa aqliy mulk obʼyektlariga kiradi. Endilikda siz Soff Marketi orqali o'z intellektual mulklaringizni joylab daromad topishingiz mumkin.">
                                        <p>Soff.uz - Intellektual mulk marketi, Intellektual mahsulotlarini soting va xarid qiling.</p>

                                        <p>Intellektual mulk - ijodiy aqliy faoliyat mahsuli. Ixtirochilik va mualliflik obʼyekti huquqi majmuiga kiruvchi, fan, adabiyot, sanʼat va ishlab chiqarish sohasida ijodiy faoliyatning boshqa turlari, adabiy, badiiy, ilmiy asarlar, ijrochi aktyorlik sanʼati, jumladan ovoz yozish, radio, televideniye asarlari, kashfiyotlar, ixtirolar, ratsionalizatorlik takliflari, sanoat namunalari, kompyuterlar uchun dasturlar, maʼlumotlar bazasi, nou-xauning ekspert tizimlari, tovar belgilari, firma atamalari va boshqa aqliy mulk obʼyektlariga kiradi.</p>

                                        <p>Endilikda siz Soff Marketi orqali o'z intellektual mulklaringizni joylab daromad topishingiz mumkin.</p>
                                    </div>
                                </div>

                                {
                                    faq?.map(el => (
                                        <div className="l-faq-item" onClick={() => setAcc(el?.id)}>
                                            <div className="l-faq-accordion-header">
                                                <h4 className='l-faq-accordion-title m-0' aria-label={el?.title}>
                                                    {el?.title}
                                                </h4>

                                                <i class={`fa-solid fa-${acc === el?.id ? 'minus' : 'plus'}`}></i>
                                            </div>

                                            <div className={`l-faq-content ${acc === el?.id ? 'active' : ''}`} aria-description={el?.description}>
                                                <p>{el?.description}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div className="l-text">
                    <div className="">
                        <div className="l-text-inner">
                            <h2 className="l-text-title mb-5">
                                Biz haqimizda sotuvchilarimiz qanday fikrda?
                            </h2>

                            <Slider {...settings} className='slider-container_section'>
                                {
                                    [1, 2, 4]?.map(item => (
                                        <div key={item.id}>
                                            <div className="card_carseol p-8 ml-3 cursor-pointer ">
                                                <div className="l-text-list">
                                                    <img height={50} src="/static/img/userava-1.png" alt="" />
                                                    <h4>Doniyor Eshmamatov</h4>

                                                    <p>
                                                        Assalomu alaykum saytni yorvoripsila vashe gapyo, har kuni soqa oqib kelyapti
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                </div> */}


                <div className="system">
                    <div className="container">
                        <div className="system-inner">
                            {
                                projecs.map(el => (
                                    <div className='system-card'>
                                        <div className="system-card-inner">
                                            {el?.last ? <h2 className='sdsdsd'>{el?.title}</h2> : <img src={el?.logo} alt='' height={40} />}
                                            <span className='system-text'>{el?.linkMask}</span>
                                            <a className='system-link' href={el?.link} target={el?.last ? '' : '_blank'}>.</a>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>

            <div>

                <FooterDefault />
                {/* <footer className='l-footer'>
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
                </footer> */}
            </div>
        </div>
    );
};

export async function getServerSideProps() {
    const resquest = await fetch(baseUrl + `customer/faq/`);
    const faq = await resquest.json();

    const advantages = [
        {
            title: 'Har xil turdagi intelektuall mulklarni sotish',
            description: 'Siz istalgan turdagi: videolar, audiolar, shablonlar, ilmiy ishlanmalarni sotishingiz mumkin bo\'ladi',
            icon: '/static/img/ai.png'
        },
        {
            title: "Qidiruvda birinchilardan bo'ling",
            description: 'Mahsulotlaringiz tasdiqlanganidan keyin 3-5 kun ichida qidiruvda birinchilarda ko\'rinishni boshlaydi',
            icon: '/static/img/search-ic.png'
        },
        {
            title: "Taklif evaziga daromad qiling",
            description: "Referal havola orqali do'stingizni taklif qiling va do'stingizning har bir daromadidan 5% miqdorda bonus oling",
            icon: '/static/img/refer-ic.png'
        },
        {
            title: 'Birjada savdo qiling',
            description: 'birja.soff.uz saytimizda mahsulotlaringizni egalik huquqlarini sotish va daromadingizni oshirish imkoniyati',
            icon: '/static/img/stock-ic.png'
        },
        {
            title: 'Frilanserlik qilish imkoniyati',
            description: 'Buyurtmalarni qabul qilish va istalgan joydan online daromad qilish imkoniyati',
            icon: '/static/img/order-ic.png'
        },
        {
            title: '',
            description: 'Soff Seller bo\'lish orqali bu imkoniyatlarning barchasidan foydalaning',
            last: true,
            icon: '/static/img/seller-logo.jpg'
        }
    ]

    const projecs = [
        {
            logo: '/static/img/soff/soff_green-old.png',
            link: 'https://soff.uz',
            linkMask: 'SOFF.UZ - Intelektuall mulk marketi',
        },
        {
            logo: 'https://soffstudy.uz/assets/imgs/page/logo/Soff%20Study%20dark%20logo.png',
            link: 'https://soffstudy.uz',
            linkMask: 'SOFF STUDY - Zamonaviy kasblarni o\'qtish markazi',
        },
        {
            logo: 'https://soffhub.uz/assets/imgs/page/about/soffhub-removebg-preview.png',
            link: 'https://soffhub.uz',
            linkMask: 'SOFFHUB - Biznes uchun raqamli yechimlar',
        },
        {
            logo: 'https://birja.soff.uz/images/soffbirja-dark-logo.png',
            link: 'https://birja.soff.uz',
            linkMask: 'SOFF BIRJA - Intelektuall mulk birjasi',
        },
        {
            logo: 'https://soffcrm.uz/_next/image?url=%2Fassets%2Fimages%2Flogo.jpg&w=256&q=75',
            link: 'https://soffcrm.uz',
            linkMask: 'SOFFCRM - O\'quv markazlar uchun crm tizim',
        },
        {
            logo: '',
            link: '#',
            linkMask: 'Biz rivoyjalishda davom etamiz!',
            title: "SOFF Jamoasi",
            last: true
        }
    ]

    return {
        props: {
            faq: faq?.results,
            advantages,
            projecs
        },
    };
}

export default HomepageDefaultPage;




