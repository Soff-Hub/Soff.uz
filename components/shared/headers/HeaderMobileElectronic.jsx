import React, { Component } from 'react';
import CurrencyDropdown from './modules/CurrencyDropdown';
import Link from 'next/link';
import LanguageSwicher from './modules/LanguageSwicher';
import MobileHeaderActions from './modules/MobileHeaderActions';

class HeaderMobileElectronic extends Component {
    constructor({ props }) {
        super(props);
    }

    render() {
        return (
            <header className="header header--mobile electronic">
              
                <div className="navigation--mobile">
                    <div className="navigation__left">
                        <Link href="/">
                            <a className="ps-logo">
                                <img
                                    src="/static/img/alldata_logo.png"
                                    alt="soff"
                                />
                            </a>
                        </Link>
                    </div>
                    <MobileHeaderActions />
                </div>
            </header>
        );
    }
}

export default HeaderMobileElectronic;
