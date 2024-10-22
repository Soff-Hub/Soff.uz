import React, { useCallback, useEffect, useState } from 'react';
import HeaderTop from './HeaderTop';
import HeaderLogo from './HeaderLogo';
import HeaderActions from './HeaderActions';
import HeaderSearchbar from './HeaderSearchbar';

const Header = () => {
    const [headerSticky, setHeaderSticky] = useState(false);

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
            <div className={headerSticky ? 'header-bottom header-bottom--show' : 'header-bottom'}>
                <div className="container">
                    <div className="header-inner">
                        <HeaderLogo />

                        {/* {headerSticky ? <HeaderSearchbar /> : ''} */}

                        <HeaderActions />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;


