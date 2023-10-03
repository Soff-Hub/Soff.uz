import React, { Component } from 'react';
import Link from 'next/link';
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
                                    src="/static/img/soff/soff_green_white.png"
                                    alt="soff"
                                    width={100}
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
