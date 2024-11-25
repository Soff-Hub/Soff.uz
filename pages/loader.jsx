import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import { accountLinksReducers, begin, login, setAccountLinks } from '~/store/auth/slice';

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
        text: "Ariza va Takliflar",
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
        if (asPath.split('').length > 10) {
            const roleBegin = asPath.slice(-1)
            const role = asPath.slice(-20).split('&')[0];
            const tokenArr = asPath.split('token=');
            const token = tokenArr[1]?.split('');
            const list = token?.reverse()?.splice(0, 20);
            const tokenText = token?.reverse()?.join('');
            localStorage.setItem('token', tokenText);
            const data = {
                access: tokenText,
                role: 'customer'
            }
            dispatch(login({ user: data, data: data }));
            dispatch(begin({ id: roleBegin }))
        }

        if (user?.role === 'admin') {
            localStorage.setItem('is_seller', '1')
        }
        // if (user?.role === 'seller') {
        //     dispatch(accountLinksReducers(accountSellerLink));
        // }
        // if (user?.role === 'customer') {
        dispatch(setAccountLinks(cutomerAccountLink));
        // }

        // if (
        // user?.role === 'seller' ||
        // user?.role === 'admin'
        // ) {
        // Router.push('/account/dashbord');
        // } else if (user?.role === 'customer') {
        Router.push('/account/sellerproducts');
        // }

    }, [user?.role]);
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

export default Loader