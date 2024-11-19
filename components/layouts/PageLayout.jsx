import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthorization, setAccountLinks } from '~/store/auth/slice';
import FaqSaidbar from '../partials/faqs/faqSaidbar';
import { useRouter } from 'next/router';
import HeaderMobileBottom from '../shared/headers/HeaderMobilebottom';
import Header from '../blocks/header';
import FooterDefault from '../shared/footers/FooterDefault';

import { GoogleLogin } from '@react-oauth/google';

export let accountAdminLinks = [
    {
        text: 'Boshqaruv paneli',
        url: '/account/dashbord',
        icon: 'fa-solid fa-house-user',
    },
    {
        text: 'Sotuvchilar',
        url: '/account/shops',
        icon: 'fa-solid fa-shop',
    },
    {
        text: 'Mahsulotlar',
        url: '/account/products?page=1',
        icon: 'fa-solid fa-cube',
    },
    {
        text: 'Sotib olingan mahsulotlar',
        url: '/account/selling',
        icon: 'fa-brands fa-shopify',
    },
    {
        text: 'Kategoriyalar',
        url: '/account/category',
        icon: 'fa-solid fa-layer-group',
    },
    {
        text: 'Sotilgan mahsulotlar',
        url: '/account/orders',
        icon: 'fa-solid fa-truck',
    },
    {
        text: 'Buyurtmalar',
        url: '/account/dealOrder',
        icon: 'fa-solid fa-sliders',
    },
    {
        text: 'Xaridorlar',
        url: '/account/users',
        icon: 'fa-solid fa-users',
    },
    {
        text: 'Taglar',
        url: '/account/tegs',
        icon: 'fa-solid fa-tags',
    },
    {
        text: "Ariza va Takliflar",
        url: '/account/application',
        icon: 'fa-solid fa-file-signature',
    },
    {
        text: "Bildirishnomalar yuborish",
        url: '/account/email',
        icon: 'fa-solid fa-envelope',
    },
    {
        text: 'Pemium Sotuvchilar',
        url: '/account/pemium-sellers',
        icon: 'fa-solid fa-star',
    },

];

export let accountSellerLink = [
    {
        text: 'Boshqaruv paneli',
        url: '/account/dashbord',
        icon: 'fa-solid fa-house-user',
    },
    {
        text: 'Mening mahsulotlarim',
        url: '/account/myproducts',
        icon: 'fa-solid fa-shop-lock',
    },
    {
        text: 'Birjaga chiqarish',
        url: '/account/selling',
        icon: 'fa-brands fa-shopify',
    },
    {
        text: 'Sotib olinganlar',
        url: '/account/sellerproducts',
        icon: 'fa-solid fa-bag-shopping',
    },
    {
        text: 'Yangi mahsulot',
        url: '/account/myproducts/product-selection',
        icon: 'fa-solid fa-circle-plus',
    },
    {
        text: 'Buyurtmalar',
        url: '/account/orders',
        icon: 'fa-solid fa-truck',
    },
    {
        text: 'Donatlar ro\'yxati',
        url: '/account/donate-page',
        icon: 'fa-solid fa-hand-holding-dollar',
    },
    {
        text: "Ariza va Takliflar",
        url: '/account/application',
        icon: 'fa-solid fa-file-signature',
    },
    {
        text: 'Profil',
        url: '/account/settings',
        icon: 'fa-solid fa-gear',
    },
];
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
    {
        text: 'Profil',
        url: '/account/settings',
        icon: 'fa-solid fa-gear',
    },
];

const PageLayout = ({
    children,
    title
}) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const Router = useRouter();
    const query = Router.route;

    async function handleLogin(googleData) {
        Router.push(`/oauth/?token=${googleData}&returnUrl=${Router.asPath}`)
    }

    useEffect(() => {
        if (user?.role === 'admin') {
            dispatch(setAccountLinks(accountAdminLinks));
        }
        if (user?.role === 'seller') {
            dispatch(setAccountLinks(accountSellerLink));
        }
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
                <title>Soff - barcha ma'lumotlar bazasi </title>
                <meta property="og:title" content={title} />
            </Head>
            <Header />

            <div className='bg-soff' style={{ paddingTop: Router.pathname === '/' ? '' : '75px' }}>
                <div className={`${query.startsWith('/page/') ? 'container faq-page-container' : ''}`}>
                    <div
                        className={` ${query.startsWith('/page') ? '' : 'd-none'}`}>
                        <FaqSaidbar />
                    </div>
                    {children}
                </div>
            </div>

            <HeaderMobileBottom />
            <FooterDefault />


            {user ? '' : <GoogleLogin
                onSuccess={credentialResponse => {
                    handleLogin(credentialResponse?.credential)
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
                prompt="select_account"
            />}
        </>
    );
};

export default PageLayout;
