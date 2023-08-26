import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountLinksReducers } from '~/store/auth/action';

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
        text: 'Bildirishnomalar',
        url: '/account/notifications',
        icon: 'fa-solid fa-bell',
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
        url: '/account/MyProducts',
        icon: 'fa-solid fa-shop-lock',
    },
    {
        text: 'Buyurtmalar',
        url: '/account/orders',
        icon: 'fa-solid fa-truck',
    },
    {
        text: 'Bildirishnomalar',
        url: '/account/notifications',
        icon: 'fa-solid fa-bell',
    },
    {
        text: 'Profil',
        url: '/account/settings',
        icon: 'fa-solid fa-gear',
    },
];
export let cutomerAccountLink = [
    {
        text: 'Mahsulotlar',
        url: '/account/products',
        icon: 'fa-solid fa-cube',
    },
    {
        text: 'Profil',
        url: '/account/settings',
        icon: 'fa-solid fa-gear',
    },
];

export default function RoleChecker() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.role === 'admin') {
            dispatch(accountLinksReducers(cutomerAccountLink))
        }
        if (user?.role === 'seller') {
            dispatch(accountLinksReducers(accountSellerLink))
        }
        if (user?.role === 'customer') {
            dispatch(accountLinksReducers(cutomerAccountLink))
        }
    }, []);

    return <div></div>;
}
