import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logOut } from '~/store/auth/action';
import Router from 'next/router';
import { Modal } from 'antd';
import useAuth from '~/hooks/useAuth';

const AccountQuickLinks = (props) => {
    const { accountLinks , user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const refresh = useSelector(state => state.auth?.user?.refresh)

    const handleLogout = (e) => {
        e.preventDefault();

        const data = {
            'refresh': refresh
        }
        const { logOutAuth } = useAuth();
        const res = logOutAuth(data)

        if (res) {
            const modal = Modal.info({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz muvaffaqqiyatli chiqdingiz`,
            });
            dispatch(logOut());
        }

        Router.push('/');
    };
    const { isLoggedIn } = props;

    // View
    const linksView = accountLinks.map((item) => (
        <li key={item.text}>
            <Link href={item.url}>
                <a>  <span><i className={` text-dark fs-4 me-2  ${item.icon}`}></i> </span> {item.text}</a>
            </Link>
        </li>
    ));

    if (isLoggedIn === true) {
        return (
            <div className="ps-block--user-account">
                <Link  href={ user?.role==="admin" || user?.role==="seller" ? "/account/dashbord" : "/account/myproducts"}><a> <i className="icon-user"></i> </a></Link>
                <div className="ps-block__content">
                    <ul className="ps-list--arrow">
                        {linksView}
                        <li className="ps-block__footer">
                            <a href="#" onClick={(e) => handleLogout(e)}>
                                <i className="fa-solid fa-right-from-bracket me-3 mx-2 text-dark fs-4"></i>    Chiqish
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
                    <Link href="/account/login">
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
