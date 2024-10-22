import React from 'react';
import HeaderTop from './HeaderTop';
import HeaderLogo from './HeaderLogo';
import HeaderActions from './HeaderActions';
import HeaderSearchbar from './HeaderSearchbar';

const Header = () => {

    return (
        <header className="site-header">
            <HeaderTop />
            <div className="container">
                <div className="header-inner">
                    <HeaderLogo />

                    <HeaderSearchbar />

                    <HeaderActions />
                </div>
            </div>
        </header>
    );
};

export default Header;


