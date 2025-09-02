import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logOut } from '~/store/auth/slice';
import useAuth from '~/hooks/useAuth';
import Router, { useRouter } from 'next/router';
import { setSavedPrfileData } from '~/store/ecomerce/slice';
import styles from '../../../landingStyles/landingStyles.module.scss';
import Image from 'next/image';
import useGetChats from '~/components/freeleance/chat/api/useGetChats';

const HeaderUserDropdown = props => {
    const dispatch = useDispatch();
    const { accountLinks, user } = useSelector(state => state.auth);
    const { user: profile } = useSelector(state => state.profile);
    const refresh = useSelector(state => state.auth?.user?.refresh);
    const { data: chats } = useGetChats();
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

    const unreads = chats?.reduce((sum, chat) => {
        sum += chat.unread_count;
        return sum;
    }, 0);

    const { isLoggedIn, color } = props;
    const linksView = accountLinks.map((item, index) => (
        <li key={index}>
            <Link href={item.url}>
                <div className="pointer d-flex pointer py-3 gap-3 align-items-center justify-content-between ">
                    <div className="d-flex gap-3 align-items-center">
                        <i className={` text-dark fs-4 me-2  ${item.icon}`}></i>{' '}
                        <p className="m-0">{item.text}</p>
                    </div>
                    {unreads != 0 && item.url == '/chat' && (
                        <span className={styles.unreadsChatsCount}>
                            {unreads}
                        </span>
                    )}
                </div>
            </Link>
        </li>
    ));
    useEffect(() => {
     
    }, []);

    console.log('user', user);

    if (isLoggedIn === true) {
        return (
            <div className="ps-block--user-account ">
                <div className="fs-3 d-flex align-items-center gap-3 pointer">
                    <Image
                        src={profile?.image || '/static/img/ozodbek.png'}
                        width={30}
                        height={30}
                        alt="user"
                    />
                </div>
                <div className="ps-block__content">
                    <ul className="ps-list--arrow order">
                        <div>
                            <div className="pointer d-flex pointer mb-3 gap-3 align-items-center ">
                                <Image
                                    src={
                                        profile?.image ||
                                        '/static/img/ozodbek.png'
                                    }
                                    width={30}
                                    height={30}
                                    alt="user"
                                />

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

                        {linksView}
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
            <Link href={'/auth/login'}>
                <p className={`${styles.loginEntrance} m-0`}>Kirish</p>
                {/* href={
                    id
                        ? `/auth/login?id=${id}`
                        : deal
                        ? `/auth/login?deal=${deal}`
                        : '/auth/login'
                } */}
            </Link>
        );
    }
};

export default connect(state => state)(HeaderUserDropdown);
