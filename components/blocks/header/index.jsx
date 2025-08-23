import React, { useCallback, useEffect, useState } from 'react';
import HeaderTop from './HeaderTop';
import HeaderLogo from './HeaderLogo';
import HeaderActions from './HeaderActions';
import HeaderSearchbar from './HeaderSearchbar';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { initLocalCart } from '~/store/ecomerce/slice';
import MenuCategoriesDropdown from '~/components/shared/menu/MenuCategoriesDropdown';
import HeaderAIIcon from './HeaderActions/HeaderAIIcon';

const Header = () => {
    const [headerSticky, setHeaderSticky] = useState(false);
    const { pathname } = useRouter();
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
                    <div className="container px-lg-0 pt-lg-2">
                        <div className="header-inner">
                            <HeaderLogo mode={'dark'} />
                            <HeaderActions isDark={true} />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="bg-white"
                style={{ height: '80px', width: '100%' }}></div>
        </header>
    );
};

export default Header;
