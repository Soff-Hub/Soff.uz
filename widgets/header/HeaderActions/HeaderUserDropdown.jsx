import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logOut } from '~/store/auth/slice';
import useAuth from '~/shared/hooks/useAuth';
import Router, { useRouter } from 'next/router';
import { setSavedPrfileData } from '~/store/ecomerce/slice';
import styles from '~/shared/styles/landingStyles.module.scss';
import Image from 'next/image';
import { useFGet } from '~/shared/hooks/useFApi';
import { CHAT_UNSEENS } from '~/shared/api/end-points';

const HeaderUserDropdown = props => {
    const dispatch = useDispatch();
    const { accountLinks, user } = useSelector(state => state.auth);
    const { user: profile } = useSelector(state => state.profile);
    const refresh = useSelector(state => state.auth?.user?.refresh);
    const router = useRouter();

    const handleLogout = () => {
        const data = {
            refresh: refresh,
        };
        const { logOutAuth } = useAuth();
        const res = logOutAuth(data);

        if (res) {
            if (router.asPath == '/account/dashbord') {
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

    const { data } = useFGet('unread_messages_count', CHAT_UNSEENS, {
        enabled: !!user?.access,
        token: user?.access,
    });

    const { isLoggedIn, color } = props;
    const linksView = accountLinks.map((item, index) => (
        <li key={index} className={styles.hoverAction}>
            <Link href={item.url}>
                <div className="pointer  d-flex pointer p-3 gap-3 align-items-center justify-content-between ">
                    <div className="d-flex gap-2 align-items-center">
                        <i className={` text-dark fs-4 me-2  ${item.icon}`}></i>{' '}
                        <p className="m-0">{item.text}</p>
                    </div>
                    {data?.unread_messages != 0 && item.url == '/chat' && (
                        <span className={styles.unreadsChatsCount}>
                            {data?.unread_messages}
                        </span>
                    )}
                </div>
            </Link>
        </li>
    ));

    const returnUrl = router.query?.returnUrl
        ? router.query.returnUrl
        : decodeURIComponent(router.asPath);

    if (isLoggedIn === true) {
        return (
            <div className="ps-block--user-account ">
                <div className="fs-3 d-flex align-items-center gap-3 pointer">
                    <Image
                        src={profile?.image || '/static/img/ozodbek.png'}
                        style={{ borderRadius: '50%' }}
                        width={30}
                        height={30}
                        alt="user"
                    />
                </div>
                <div className="ps-block__content">
                    <ul className="ps-list--arrow order">
                        <div>
                            <div className="pointer d-flex pointer mb-3  gap-3 align-items-center ">
                                <Link
                                    href={
                                        user?.role === 'admin'
                                            ? '/account/dashbord'
                                            : user?.role === 'seller'
                                            ? '/account/sellerproducts'
                                            : '#'
                                    }>
                                    <div className="m-0">
                                        <h4 className="m-0 fw-normal fs-3">
                                            {profile?.first_name}{' '}
                                            {profile?.last_name}
                                        </h4>
                                        <p className="m-0">{profile?.email}</p>
                                        <p className="m-0">{profile?.phone}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <ul className="my-2 list-unstyled">{linksView}</ul>
                        <li className="ps-block__footer">
                            <a href="#" onClick={handleLogout}>
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
            <Link
                href={`/auth/login/?returnUrl=${returnUrl}`}
                onClick={e => {
                    e.preventDefault();
                    Router.push(`/auth/login/?returnUrl=${returnUrl}`);
                }}>
                <p className={`${styles.loginEntrance} m-0`}>Kirish</p>
            </Link>
        );
    }
};

export default connect(state => state)(HeaderUserDropdown);
