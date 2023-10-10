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
        url: '/account/products',
        icon: 'fa-solid fa-cube',
    },
    {
        text: 'Kategoriyalar',
        url: '/account/category',
        icon: 'fa-solid fa-layer-group',
    },
    {
        text: 'Buyurtmalar',
        url: '/account/orders',
        icon: 'fa-solid fa-truck',
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
        text: "Ariza bo'limi",
        url: '/account/application',
        icon: 'fa-solid fa-file-signature',
    },
    {
        text: 'Context',
        url: '/account/context',
        icon: 'fa-solid fa-sliders',
    },
    {
        text: 'Sozlamalar',
        url: '/account/settings',
        icon: 'fa-solid fa-gear',
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
        text: 'Sotib olingan',
        url: '/account/sellerproducts',
        icon: 'fa-solid fa-bag-shopping',
    },
    {
        text: 'Yangi mahsulot',
        url: '/account/myproducts/posts',
        icon: 'fa-solid fa-circle-plus',
    },
    {
        text: 'Buyurtmalar',
        url: '/account/orders',
        icon: 'fa-solid fa-truck',
    },
    {
        text: "Ariza bo'limi",
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
        text: 'Mening mahsulotlarim',
        url: '/account/myproducts',
        icon: 'fa-solid fa-shop-lock',
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
    title = 'Page',
}) => {
    let titleView;

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const Router = useRouter();

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

    const query = Router.route;

    return (
        <>
            <Head>
                <title>{titleView}</title>
            </Head>
            {header}
            <div>
                <div
                    className={`${
                        query === '/page/form'
                            ? 'container faq-page-container'
                            : query === '/page/questions'
                            ? 'container faq-page-container'
                            : query === '/page/about-us'
                            ? 'container faq-page-container'
                            : ''
                    }  `}>
                    <div
                        className={` ${
                            query === '/page/form'
                                ? ''
                                : query === '/page/questions'
                                ? ''
                                    : query === '/page/about-us'
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
