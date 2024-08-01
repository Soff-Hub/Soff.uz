import React, { useEffect } from 'react';
import Head from 'next/head';

import HeaderElectronic from '../shared/headers/HeaderElectronic';
import HeaderMobileElectronic from '../shared/headers/HeaderMobileElectronic';
import FooterSecond from '../shared/footers/FooterSecond';
import { useDispatch, useSelector } from 'react-redux';
import { accountLinksReducers, isLoginning } from '~/store/auth/action';
import FaqSaidbar from '../partials/faqs/faqSaidbar';
import { useRouter } from 'next/router';

const initHeaders = (
    <>
        <HeaderElectronic />
        <HeaderMobileElectronic />
    </>
);
const initFooters = (
    <>
        <FooterSecond />
    </>
);

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
        text: 'Joyida sotish',
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
        text: 'Joyida sotish',
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
    {
        text: 'Buyurtma berish',
        url: 'b',
        icon: 'fa-regular fa-handshake',
    },
    {
        text: 'Profil',
        url: '/account/settings',
        icon: 'fa-solid fa-gear',
    },
];

const PageContainer = ({
    header = initHeaders,
    footer = initFooters,
    children,
    title
}) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const Router = useRouter();
    const query = Router.route;

    useEffect(() => {
        if (user?.role === 'admin') {
            dispatch(accountLinksReducers(accountAdminLinks));
        }
        if (user?.role === 'seller') {
            dispatch(accountLinksReducers(accountSellerLink));
        }
        if (user?.role === 'customer') {
            dispatch(accountLinksReducers(cutomerAccountLink));
        }
    }, [user?.role]);


    const defaultRoutePage = () => {
        dispatch(isLoginning());
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
            {header}
            <div className='bg-soff' >
                <div
                    className={`${query === '/page/form'
                        ? 'container faq-page-container'
                        : query === '/page/questions'
                            ? 'container faq-page-container'
                            : query === '/page/about-us'
                                ? 'container faq-page-container'
                                : query === '/page/become-a-seller'
                                    ? 'container faq-page-container'
                                    : query === '/page/video-list'
                                        ? 'container faq-page-container'
                                        : ''
                        }  `}>
                    <div
                        className={` ${query === '/page/form'
                            ? ''
                            : query === '/page/questions'
                                ? ''
                                : query === '/page/about-us'
                                    ? ''
                                    : query === '/page/become-a-seller'
                                        ? ''
                                        : query === '/page/video-list'
                                            ? ''
                                            : 'd-none'
                            }`}>
                        <FaqSaidbar />
                    </div>

                    {children}
                </div>
            </div>

            {footer}
        </>
    );
};

export default PageContainer;
