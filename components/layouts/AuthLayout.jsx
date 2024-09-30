import React, { useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { isLoginning } from '~/store/auth/action';

export default function AuthLayout({ children }) {

    const images = ['1', '4', '6', '8', '10', '12', '13', '14', '16', '18']
    const router = useRouter();
    const { deal, id } = router?.query
    const dispatch = useDispatch()

    const defaultRoutePage = () => {
        dispatch(isLoginning());
    };

    useEffect(() => {
        defaultRoutePage();
    }, []);

    return (
        <div className='row bg-white' style={{ height: '100vh', width: '100%', backgroundColor: 'white', overflowY: 'scroll', alignItems: 'stretch' }} >
            <div className='col-md-5 auth-img'>
                <div className="auth-header p-4">
                    <img src={`/static/img/seller-logo.jpg`} alt="soff.uz logo" style={{ marginLeft: '100px' }} width={140} />
                </div>
                <div className="auth-body px-5">
                    <Swiper
                        style={{ height: '100%' }}
                        modules={[EffectFade, Autoplay]}
                        effect={'fade'}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        speed={2000}
                        pagination={false}
                        navigation={false}
                    >
                        {
                            images.map(el => (
                                <SwiperSlide style={{ height: '100%', backgroundColor: 'white', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <img key={el} src={`/static/img/auth/img${el}.png`} alt="" />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                </div>
            </div>
            <div className='col-md-7' style={{ backgroundColor: '#fdfbfb' }}>
                <div className="auth-header-login d-flex align-items-center">
                    <img src={`/static/img/auth/logo-dark.jpg`} alt="" width={100} />

                    {
                        router.pathname.startsWith('/account/register') ? (
                            <div className='d-flex gap-3'>
                                <Link style={{ fontSize: "12px" }} href={
                                    (id) ? `/account/login?id=${id}` :
                                        (deal) ? `/account/login?deal=${deal}` :
                                            "/account/login"
                                }
                                >


                                    <a className='register_title' style={{ fontSize: "16px", fontWeight: 500, color: "#00A44F" }}>Kirish</a>
                                </Link>
                            </div>
                        ) : (
                            <div className='d-flex gap-3 align-items-center'>
                                <Link style={{ fontSize: "12px" }} href={
                                    (id) ? `/account/register?id=${id}&role=customer` :
                                        (deal) ? `/account/register?deal=${deal}` :
                                            "/account/register"
                                }
                                >


                                    <a className='register_title' style={{ fontSize: "16px", fontWeight: 500, color: "#00A44F" }}>Ro'yxatdan o'tish</a>
                                </Link>
                            </div>
                        )
                    }
                </div>
                <div className="ps-form--account">
                    {children}
                </div>
            </div>
        </div>
    )
}