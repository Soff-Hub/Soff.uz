import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logOut } from '~/store/auth/action';
import { Badge, Card, Modal } from 'antd';
import useAuth from '~/hooks/useAuth';
import GetRepository from '~/reositoriy-admin/GetRepository';
import Router, { useRouter } from 'next/router';
import { setSavedPrfileData } from '~/store/ecomerce/action';

const AccountQuickLinks = (props) => {
    const dispatch = useDispatch();
    const { accountLinks, user } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.ecomerce);
    const refresh = useSelector((state) => state.auth?.user?.refresh);
    const { asPath } = useRouter();
    const router = useRouter();
    const { id, deal } = router?.query

    const handleLogout = () => {
        const data = {
            refresh: refresh,
        };
        const { logOutAuth } = useAuth();
        const res = logOutAuth(data);

        if (res) {
            const modal = Modal.info({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz muvaffaqqiyatli chiqdingiz`,
            });
            if (asPath == '/account/dashbord') {
                Router.push('/account/selection')
            } else if ('/account/myproducts') {
                Router.push('/account/selection')
            } else if ('/account/sellerproducts') {
                Router.push('/account/selection')
            } else if ('/account/myproducts/product-selection') {
                Router.push('/account/selection')
            } else if ('/account/orders') {
                Router.push('/account/selection')
            } else if ('/account/settings') {
                Router.push('/account/selection')
            } else if ('/account/application') {
                Router.push('/account/selection')
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
    const linksView = accountLinks.map((item) => (
        <>
            {item?.url === '/account/selling' ? (
                <Badge.Ribbon key={item?.url} text="Yangi funksiya" color='blue'>
                    <Card size="small">
                        <li  >
                            <Link
                                href={item?.url}
                                style={{
                                    cursor: 'pointer',
                                }}>
                                <a className="d-flex align-items-center">
                                <img src='/static/img/birja-icon.png' height={20} width={20} className='me-2' />
                                    {item.text}
                                </a>
                            </Link>
                        </li >
                    </Card>
                </Badge.Ribbon>
            ) : item?.url === 'b' ? (
                <Badge.Ribbon key={item?.url} text="Tez kunda" color="volcano">
                    <Card size="small">
                        <li  >
                            <span
                                style={{
                                    cursor: 'pointer',
                                }}>
                                <a className="d-flex align-items-center">
                                    <i className="fa-regular fa-handshake text-dark fs-4 me-2 "></i>
                                    Buyurtma berish
                                </a>
                            </span>
                        </li >
                    </Card>
                </Badge.Ribbon>
            ) : item?.url == '/account/deals' ? (
                <Badge.Ribbon key={item?.url} text="Yangi funksiya" color="primary">
                    <Card size="small">
                        <li>
                            <Link href={item.url}>

                                <a
                                    style={{
                                        cursor: 'pointer',
                                    }}>
                                    <a className="d-flex align-items-center">
                                        <i className={` text-dark fs-4 me-2  ${item.icon}`}></i>
                                        Mening bitimlarim
                                    </a>
                                </a>

                            </Link>
                        </li>
                    </Card>
                </Badge.Ribbon>
            ) : (
                <li key={item.text}>
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
            )}
        </>
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
                        <li className="ps-block__footer">
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
                        (id) ? `/account/register?id=${id}` :
                            (deal) ? `/account/register?deal=${deal}` :
                                "/account/selection"
                    } >
                        <a>Ro'yxatdan o'tish</a>
                    </Link>
                </div>
            </div>
        );
    }
};

export default connect((state) => state)(AccountQuickLinks);
