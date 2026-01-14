import React, { useEffect } from 'react';
import HeaderTop from './HeaderTop';
import HeaderLogo from './HeaderLogo';
import HeaderActions from './HeaderActions';
import { useDispatch } from 'react-redux';
import { initLocalCart } from '~/store/ecomerce/slice';
import useResponsive from '~/shared/utilities/useResponsive';
import NavbarSearch from './navbar-search';
import NavbarMenu from '~/widgets/navbar-menu';
import FastDownloadSection from '~/shared/components/fast-dowload/FastDowloadSection';
import { initSearchHistory } from '~/store/search/slice';
import { useViewportContext } from '~/shared/hooks/useViewportContext';

const Header = () => {
    const { headerRef } = useViewportContext();
    const { isMobile } = useResponsive();
    const dispatch = useDispatch();

    useEffect(() => {
        const initFunctions = () => {
            dispatch(initLocalCart());
            dispatch(initSearchHistory());
        };
        initFunctions();
    }, []);

    return (
        <header className="site-header" ref={headerRef}>
            <div className={`header-bottom top-0 bg-white`}>
                <div className="container">
                    <HeaderTop />
                    <div className="header-inner">
                        <HeaderLogo mode={'dark'} />
                        <HeaderActions />
                    </div>
                </div>
                {isMobile ? <NavbarSearch /> : <NavbarMenu />}
                <FastDownloadSection />
            </div>
        </header>
    );
};

export default Header;
