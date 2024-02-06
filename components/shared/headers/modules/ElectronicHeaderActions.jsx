import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';
import useWishlist from '~/hooks/useWishlist';
import { SmileOutlined } from '@ant-design/icons';
import {  notification } from 'antd';


const ElectronicHeaderActions = ({ auth, ecomerce }) => {
    const { wishlist } = useWishlist()
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
      api.open({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        icon: (
          <SmileOutlined
            style={{
              color: '#108ee9',
            }}
          />
        ),
      });
    };

    return (
        <div className="header__actions">
            {/* <Link href="/page/about-us"> */}
            {contextHolder}
                <span className="header__extra" style={{cursor:'pointer'}} onClick={openNotification} >
                <i class="fa-regular fa-bell fa-lg"></i>
                </span>
            {/* </Link> */}
            <Link href="/account/wishlist">
                <a className="header__extra">
                    <i className="icon-heart"></i>
                    <span>
                        <i>{wishlist.length}</i>
                    </span>
                </a>
            </Link>
            <MiniCart />
            {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
                <AccountQuickLinks isLoggedIn={true} />
            ) : (
                <AccountQuickLinks isLoggedIn={false} />
            )}
        </div>
    );
};

export default connect((state) => state)(ElectronicHeaderActions);
