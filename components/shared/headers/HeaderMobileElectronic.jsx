import React, { Component } from 'react';
import Link from 'next/link';
import MobileHeaderActions from './modules/MobileHeaderActions';
import NextImageCard from '~/components/nextImagecard';

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
                                {/* <img
                                    src="/static/img/soff/soff_green_white.png"
                                    alt="soff"
                                    width={100}
                                /> */}
                                 <NextImageCard
                             url="/static/img/soff/soff_green_white.png" clasS='logoo' width='100px' height='40px' />

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
