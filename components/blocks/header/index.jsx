import React, { useCallback, useEffect, useState } from 'react';
import HeaderTop from './HeaderTop';
import HeaderLogo from './HeaderLogo';
import HeaderActions from './HeaderActions';
import HeaderSearchbar from './HeaderSearchbar';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { initLocalCart } from '~/store/ecomerce/slice';

const Header = () => {
    const [headerSticky, setHeaderSticky] = useState(false);
    const { pathname } = useRouter()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.ecomerce.cartDataItems)

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
            dispatch(initLocalCart())
        }
    }, [])

    return (
        <header className="site-header">
            <div className={`header-bottom top-0 bg-white`}>
                <HeaderTop />
                <div className="container">
                    <div className="header-inner">
                        <HeaderLogo mode={'dark'} />

                        <HeaderSearchbar />

                        <HeaderActions isDark={true} />
                    </div>
                    <div className="search-form-mobile">
                        {pathname !== '/' ? <HeaderSearchbar /> : ''}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;


