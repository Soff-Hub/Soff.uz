import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthorization, setAccountLinks } from '~/store/auth/slice';
import { useRouter } from 'next/router';
import HeaderMobileBottom from '../shared/headers/HeaderMobilebottom';
import Header from '../blocks/header';

import { GoogleLogin } from '@react-oauth/google';
import SiteFooter from '../shared/footers/SiteFooter';
import FooterComponents from '../blocks/footer/FooterComponents';
import FastDowloadSection from '../shared/headers/fast-dowload/FastDowloadSection';

export let cutomerAccountLink = [
    {
        text: 'Sotib olinganlar',
        url: '/account/sellerproducts',
        icon: 'fa-solid fa-bag-shopping',
    },
    {
        text: 'Chatlar',
        url: '/chat',
        icon: 'fa-solid fa-comment-dots',
    },
    {
        text: 'Buyurtmalar',
        url: '/order/my-orders',
        icon: 'fas fa-truck',
    },
    // {
    //     text: 'Profil',
    //     url: '/account/settings',<i className="fas fa-file-invoice"></i>
    //     icon: 'fa-solid fa-gear',
    // },
];

const PageLayout = ({
    children,
    title
}) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const Router = useRouter();

    async function handleLogin(googleData) {
        Router.push(`/oauth/?token=${googleData}&returnUrl=${Router.asPath}`)
    }

    useEffect(() => {
        if (user?.role === 'customer') {
            dispatch(setAccountLinks(cutomerAccountLink));
        }
    }, [user?.role]);


    const defaultRoutePage = () => {
        dispatch(checkAuthorization());
    };

    useEffect(() => {
        defaultRoutePage();
    }, []);


    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <FastDowloadSection/>
            {children}
            <HeaderMobileBottom />
            <FooterComponents />


            {user ? '' : <div style={{ height: 0, overflow: 'hidden' }}>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        handleLogin(credentialResponse?.credential)
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    intermediate_iframe_close_callback={(e) => e.preventDefault()}
                    useOneTap
                    prompt="select_account"
                /></div>}
        </>
    );
};

export default PageLayout;
