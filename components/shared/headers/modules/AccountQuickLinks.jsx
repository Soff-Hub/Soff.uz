import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logOut, profileImage } from '~/store/auth/action';
import { Badge, Card, Modal } from 'antd';
import useAuth from '~/hooks/useAuth';
import GetRepository from '~/reositoriy-admin/GetRepository';

const AccountQuickLinks = (props) => {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const refresh = useSelector((state) => state.auth?.user?.refresh);
    const [profile, setProfile] = useState(null);

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
            dispatch(logOut());
        }
    };
    
    const { isLoggedIn } = props;

    async function ProfileUsers(token) {
        const ItemsData = await GetRepository.getProfile(token);
        if (ItemsData) {
            setProfile(ItemsData);
            if (Number(ItemsData?.status) == 403) {
                handleLogoutToken();
            }
        }
    }

    const handleLogoutToken = () => {
        const data = {
            refresh: refresh,
        };
        const { logOutAuth } = useAuth();
        const res = logOutAuth(data);

        if (res) {
            dispatch(logOut());
        }
    };

    useEffect(() => {
        if (user?.access) {
            ProfileUsers(user?.access);
        }
    }, [user?.access]);


    // View
    const linksView = accountLinks.map((item) => (
        <>
            {item?.url === 'b' ? (
                <Badge.Ribbon text="Tez kunda" color="volcano">
                    <Card size="small">
                        <li>
                            <span
                                style={{
                                    cursor: 'pointer',
                                }}>
                                <a className="d-flex align-items-center">
                                    <i class="fa-regular fa-handshake text-dark fs-4 me-2 "></i>
                                    Buyurtma berish
                                </a>
                            </span>
                        </li>
                    </Card>
                </Badge.Ribbon>
            ) : item?.url == '#' ? (
                <Badge.Ribbon text="Tez kunda" color="volcano">
                    <Card size="small">
                        <li>
                            <span
                                style={{
                                    cursor: 'pointer',
                                }}>
                                <a className="d-flex align-items-center">
                                    <i class="fa-regular fa-handshake  text-dark fs-4 me-2"></i>
                                    Mening bitimlarim
                                </a>
                            </span>
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
                            : '/account/myproducts'
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
                    <Link href="/account/selection?select=login">
                        <a>Kirish</a>
                    </Link>

                    <Link href="/account/selection">
                        <a>Ro'yxatdan o'tish</a>
                    </Link>
                </div>
            </div>
        );
    }
};

export default connect((state) => state)(AccountQuickLinks);
