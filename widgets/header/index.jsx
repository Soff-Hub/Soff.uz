import React, { useCallback, useEffect, useState } from 'react';
import HeaderTop from './HeaderTop';
import HeaderLogo from './HeaderLogo';
import HeaderActions from './HeaderActions';
import { useDispatch, useSelector } from 'react-redux';
import { initLocalCart } from '~/store/ecomerce/slice';
import useResponsive from '~/shared/utilities/useResponsive';
import NavbarSearch from './navbar-search';
import NavbarMenu from '~/widgets/navbar-menu';

const Header = () => {
    const [headerSticky, setHeaderSticky] = useState(false);
    const { isMobile, isDesktop, isTablet } = useResponsive();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.ecomerce.cartDataItems);
    const { showSearch } = useSelector(state => state.ui)

    const handleScroll = useCallback(() => {
        const shouldBeSticky = window.scrollY > 30;
        if (headerSticky !== shouldBeSticky) {
            setHeaderSticky(shouldBeSticky);
        }
    }, [headerSticky]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        if (!cartItems.length) {
            dispatch(initLocalCart());
        }
    }, []);

    const getHeaderHeight = () => {
        if (isDesktop) return "120px";
        if (isTablet) return showSearch ? "140px" : "130px";
        if (isMobile) return showSearch ? "150px" : "130px";
        return "120px";
    };

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
            </div>
            <div
                className='pagesSpace'
                style={{
                    height: getHeaderHeight()
                }}
            />
        </header>
    );
};

export default Header;
// 