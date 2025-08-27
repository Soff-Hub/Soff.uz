import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logOut } from '~/store/auth/slice';
import useAuth from '~/hooks/useAuth';
import GetRepository from '~/reositoriy-admin/GetRepository';
import Router, { useRouter } from 'next/router';
import { setSavedPrfileData } from '~/store/ecomerce/slice';
import styles from '../../../landingStyles/landingStyles.module.scss';
const HeaderUserDropdown = props => {
    const dispatch = useDispatch();
    const { accountLinks, user } = useSelector(state => state.auth);
    const { profile } = useSelector(state => state.ecomerce);
    const refresh = useSelector(state => state.auth?.user?.refresh);
    const { asPath } = useRouter();
    const router = useRouter();
    const { id, deal } = router?.query;

    const handleLogout = () => {
        const data = {
            refresh: refresh,
        };
        const { logOutAuth } = useAuth();
        const res = logOutAuth(data);

        if (res) {
            if (asPath == '/account/dashbord') {
                Router.push('/auth/login');
            } else if ('/account/myproducts') {
                Router.push('/auth/login');
            } else if ('/account/sellerproducts') {
                Router.push('/auth/login');
            } else if ('/account/myproducts/product-selection') {
                Router.push('/auth/login');
            } else if ('/account/orders') {
                Router.push('/auth/login');
            } else if ('/account/settings') {
                Router.push('/auth/login');
            } else if ('/account/application') {
                Router.push('/auth/login');
            }
            dispatch(logOut());
            dispatch(setSavedPrfileData(null));
        }
    };

    const { isLoggedIn, color } = props;

    async function ProfileUsers(token) {
        const ItemsData = await GetRepository.getProfile(token);
        if (ItemsData) {
            dispatch(setSavedPrfileData(ItemsData));
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
    const linksView = accountLinks.map((item, index) => (
        <li key={index}>
            <Link href={item.url}>
                <a>
                    {' '}
                    <span>
                        <i className={` text-dark fs-4 me-2  ${item.icon}`}></i>{' '}
                    </span>{' '}
                    {item.text}{' '}
                </a>
            </Link>
        </li>
    ));

    if (isLoggedIn === true) {
        return (
            <div className="ps-block--user-account ">
                <Link
                    href={
                        user?.role === 'admin' || user?.role === 'seller'
                            ? '/account/dashbord'
                            : '/account/sellerproducts'
                    }>
                    <a className="fs-3 d-flex align-items-center gap-3">
                        {profile?.image ? (
                            <img
                                alt="soff"
                                src={profile?.image}
                                className="profile__image-client"
                            />
                        ) : (
                            <i
                                className={`fa-regular fa-user fs-2 me-1 ${color}`}></i>
                        )}
                        <span className="username_title">
                            {profile?.email?.slice(
                                0,
                                profile?.email.indexOf('@')
                            )}
                            {profile?.phone}
                        </span>
                    </a>
                </Link>
                <div className="ps-block__content">
                    <ul className="ps-list--arrow order">
                        {linksView}
                        <li className="ps-block__footer">
                            <a href="#" onClick={() => handleLogout()}>
                                <i
                                    className={`fa-solid fa-right-from-bracket me-3 mx-2 text-dark fs-4  ${color}`}></i>{' '}
                                Chiqish
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            
            <a
                href={
                    id
                        ? `/auth/login?id=${id}`
                        : deal
                        ? `/auth/login?deal=${deal}`
                        : '/auth/login'
                }
                className={styles.loginEntrance}>
                Kirish
            </a>
        );
    }
};

export default connect(state => state)(HeaderUserDropdown);
