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

export let cutomerAccountLink = [
    {
        text: 'Sotib olinganlar',
        url: '/account/sellerproducts',
        icon: 'fa-solid fa-bag-shopping',
    },
    // {
    //     text: 'Buyurtma berish',
    //     url: 'b',
    //     icon: 'fa-regular fa-handshake',
    // },
    // {
    //     text: 'Profil',
    //     url: '/account/settings',
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
