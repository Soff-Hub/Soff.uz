import React, { useCallback, useEffect, useState } from 'react';
import HeaderTop from './HeaderTop';
import HeaderLogo from './HeaderLogo';
import HeaderActions from './HeaderActions';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { initLocalCart } from '~/store/ecomerce/slice';
import NavbarMenu from '../../freeleance/home/widgets/NavbarMenu';
import useResponsive from '~/utilities/useResponsive';
import NavbarSearch from './navbar-search';

const Header = () => {
    const [headerSticky, setHeaderSticky] = useState(false);
    const { isMobile } = useResponsive();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.ecomerce.cartDataItems);

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
                {isMobile ? '' : <NavbarMenu />}  
            </div> 
            <div className='pagesSpace'/>
        </header>
    );
};

export default Header;
// <NavbarSearch/>