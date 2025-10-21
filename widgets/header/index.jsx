import React, { useCallback, useEffect, useState } from 'react';
import HeaderTop from './HeaderTop';
import HeaderLogo from './HeaderLogo';
import HeaderActions from './HeaderActions';
import { useDispatch, useSelector } from 'react-redux';
import { initLocalCart } from '~/store/ecomerce/slice';
import useResponsive from '~/shared/utilities/useResponsive';
import NavbarSearch from './navbar-search';
import NavbarMenu from '~/widgets/navbar-menu';
import FastDownloadSection from '~/shared/components/fast-dowload/FastDowloadSection';

const Header = () => {
    const { isMobile } = useResponsive();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.ecomerce.cartDataItems);
    const { showSearch, showFastDownload } = useSelector((state) => state.ui);
    const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);

    useEffect(() => {
        if (!cartItems.length) {
            dispatch(initLocalCart());
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isInTelegram = !!window.Telegram?.WebApp;

            if (isInTelegram) {
                console.log('Opened inside Telegram WebApp');
                setIsTelegramWebApp(true);
            }
        }
    }, []);

    if (isTelegramWebApp) {
        return null;
    }

    return (
        <header className="site-header">
            <div className={`header-bottom top-0 bg-white`}>
                <div className="container">
                    <HeaderTop />
                    <div className="">
                        <div className="header-inner">
                            <HeaderLogo mode={'dark'} />
                            <HeaderActions isDark={true} />
                        </div>
                    </div>
                </div>
                {isMobile ? <NavbarSearch /> : <NavbarMenu />}
                {showFastDownload ? <FastDownloadSection /> : null}
            </div>
        </header>
    );
};

export default Header;
