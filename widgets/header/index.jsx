import React, { useEffect } from 'react';
import HeaderTop from './HeaderTop';
import HeaderLogo from './HeaderLogo';
import HeaderActions from './HeaderActions';
import { useDispatch, useSelector } from 'react-redux';
import { initLocalCart } from '~/store/ecomerce/slice';
import useResponsive from '~/shared/utilities/useResponsive';
import NavbarSearch from './navbar-search';
import NavbarMenu from '~/widgets/navbar-menu';
import FastDownloadSection from '~/shared/components/fast-dowload/FastDowloadSection';
import { initSearchHistory } from '~/store/search/slice';

const Header = () => {
    const { isMobile } = useResponsive();
    const dispatch = useDispatch();
    const { showFastDownload } = useSelector((state) => state.ui);

    useEffect(() => {
        const initFunctions = async () => {
            dispatch(initLocalCart());
            dispatch(initSearchHistory());
        };
        initFunctions();
    }, []);

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
//
