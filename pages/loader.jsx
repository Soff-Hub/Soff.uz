import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import {
    accountLinksReducers,
    begin,
    login,
    setAccountLinks,
} from '~/store/auth/slice';

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
        text: 'Ariza va Takliflar',
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
        text: 'Sotib olinganlar',
        url: '/account/sellerproducts',
        icon: 'fa-solid fa-bag-shopping',
    },
    {
        text: 'Yangi mahsulot',
        url: '/account/myproducts/posts',
        icon: 'fa-solid fa-circle-plus',
    },
    {
        text: 'Olingan buyurtmalar',
        url: '#',
        icon: 'fa-solid fa-folder-open',
    },
    {
        text: 'Buyurtmalar',
        url: '/account/orders',
        icon: 'fa-solid fa-truck',
    },
    {
        text: 'Ariza va Takliflar',
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

const Loader = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const Router = useRouter();
    const query = Router.route;
    const { asPath } = Router;

    useEffect(() => {
        // Better token extraction for iOS 18 compatibility
        if (asPath && asPath.includes('token=')) {
            try {
                // Extract token from URL
                const urlParams = new URLSearchParams(
                    asPath.split('?')[1] || ''
                );
                const token = urlParams.get('token');
                const returnUrl = urlParams.get('returnUrl');
                if (token) {


                    // Store token
                    localStorage.setItem('token', token);

                    const userData = {
                        access: token,
                        role: 'customer',
                    };

                    dispatch(login({ user: userData, data: userData }));
                    dispatch(begin({ id: userData.role }));

                    // Redirect to return URL or default page
                    if (returnUrl) {
                        Router.replace(decodeURIComponent(returnUrl));
                    } else {
                        Router.replace('/account/sellerproducts');
                    }
                    return;
                }
            } catch (error) {
                console.error('Error processing OAuth token:', error);
                // Fallback to old method if new method fails
                if (asPath.split('').length > 10) {
                    const roleBegin = asPath.slice(-1);
                    const tokenArr = asPath.split('token=');
                    const tokenPart = tokenArr[1];

                    if (tokenPart) {
                        const token = tokenPart.split('&')[0]; // Get token before any other params
                        localStorage.setItem('token', token);

                        const data = {
                            access: token,
                            role: 'customer',
                        };

                        dispatch(login({ user: data, data: data }));
                        dispatch(begin({ id: roleBegin }));
                    }
                }
            }
        }

        if (user?.role === 'admin') {
            localStorage.setItem('is_seller', '1');
        }

        dispatch(setAccountLinks(cutomerAccountLink));

        // Only redirect if we're not already processing a token
        if (!asPath.includes('token=') && user?.role) {
            Router.push('/account/sellerproducts');
        }
    }, [user?.role, asPath]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20%',
            }}>
            <PacmanLoader color="#00A44F" />
        </div>
    );
};

export default Loader;
