import React, { useCallback, useEffect, useState } from 'react';
import HeaderTop from './HeaderTop';
import HeaderLogo from './HeaderLogo';
import HeaderActions from './HeaderActions';
import HeaderSearchbar from './HeaderSearchbar';
import { useRouter } from 'next/router';

const Header = () => {
    const [headerSticky, setHeaderSticky] = useState(false);
    const { pathname } = useRouter()

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

    return (
        <header className="site-header">
            <HeaderTop />
            <div className={`${headerSticky ? 'header-bottom header-bottom--show' : 'header-bottom'} ${pathname == '/' ? '' : 'other-header'}`}>
                <div className="container">
                    <div className="header-inner">
                        <HeaderLogo mode={headerSticky ? 'dark' : pathname !== '/' ? 'dark' : 'light'} />

                        {headerSticky || pathname !== '/' ? <HeaderSearchbar isDark={headerSticky || pathname !== '/'} /> : ''}

                        <HeaderActions isDark={headerSticky || pathname !== '/'} />
                    </div>
                    <div className="search-form-mobile">
                        {pathname !== '/' ? <HeaderSearchbar isDark={headerSticky || pathname !== '/'} /> : ''}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;


