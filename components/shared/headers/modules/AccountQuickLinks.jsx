import React, { useContext, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Badge, Card, Modal } from 'antd';
import useAuth from '~/hooks/useAuth';
import GetRepository from '~/reositoriy-admin/GetRepository';
import Router, { useRouter } from 'next/router';
import { SidebarContext } from '~/hooks/SidebarContext';
import { setSavedPrfileData } from '~/rtk-store/ecomerce';
import { logOut } from '~/rtk-store/auth';


const AccountQuickLinks = (props) => {
    const dispatch = useDispatch();
    const { accountLinks, user } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.ecomerce);
    const refresh = useSelector((state) => state.auth?.user?.refresh);
    const { asPath } = useRouter();
    const router = useRouter();
    const { id, deal } = router?.query
    const { collapse } = useContext(SidebarContext)

    const handleLogout = () => {
        const data = {
            refresh: refresh,
        };
        const { logOutAuth } = useAuth();
        const res = logOutAuth(data);

        if (res) {
            if (asPath == '/account/dashbord') {
                Router.push('/account/login')
            } else if ('/account/myproducts') {
                Router.push('/account/login')
            } else if ('/account/sellerproducts') {
                Router.push('/account/login')
            } else if ('/account/myproducts/product-selection') {
                Router.push('/account/login')
            } else if ('/account/orders') {
                Router.push('/account/login')
            } else if ('/account/settings') {
                Router.push('/account/login')
            } else if ('/account/application') {
                Router.push('/account/login')
            }
            dispatch(logOut());
            dispatch(setSavedPrfileData(null))
        }
    };

    const { isLoggedIn } = props;

    async function ProfileUsers(token) {
        const ItemsData = await GetRepository.getProfile(token);
        if (ItemsData) {
            dispatch(setSavedPrfileData(ItemsData))
            if (Number(ItemsData?.status) == 403) {
                handleLogout();
            }
        }
    }


    useEffect(() => {
        if (!profile && user?.access) {
            ProfileUsers(user?.access);
        }
    }, [user?.access, profile]);



    // View
    const linksView = accountLinks.map((item, i) => (
        <li key={i}>
            <Link href={item.url}>
                <a>
                    {' '}
                    <span>
                        <i
                            className={` text-dark fs-4 me-2  ${item.icon}`}></i>{' '}
                    </span>{' '}
                    {item.text}{' '}
                </a>
            </Link>
        </li>
    ));



    if (isLoggedIn === true) {
        return (
            <div className="ps-block--user-account">
                <Link
                    href={
                        user?.role === 'admin' || user?.role === 'seller'
                            ? '/account/dashbord'
                            : '/account/sellerproducts'
                    }>
                    <a>
                        {profile?.image ? (
                            <img
                                alt="soff"
                                src={profile?.image}
                                className="profile__image-client"
                            />
                        ) : (
                            <i className="icon-user"></i>
                        )}
                    </a>
                </Link>
                <div className="ps-block__content">
                    <ul className="ps-list--arrow order">
                        {linksView}
                        <li className="ps-block__footer" key={'wqe'}>
                            <a href="#" onClick={() => handleLogout()}>
                                <i className="fa-solid fa-right-from-bracket me-3 mx-2 text-dark fs-4"></i>{' '}
                                Chiqish
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {

        return (
            <div className="ps-block--user-header">
                <div className="ps-block__left">
                    <i className="icon-user"></i>
                </div>
                <div className="ps-block__right">
                    <Link href={
                        (id) ? `/account/login?id=${id}` :
                            (deal) ? `/account/login?deal=${deal}` :
                                "/account/login"
                    }>
                        <a>Kirish</a>
                    </Link>

                    <Link href={
                        (id) ? `/account/register?id=${id}&role=customer` :
                            (deal) ? `/account/register?deal=${deal}` :
                                "/account/register"
                    } >
                        <a>Ro'yxatdan o'tish</a>
                    </Link>
                </div>
            </div>
        );
    }
};

export default AccountQuickLinks
