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
                <div className='header-topsection'>
                    <div className="container">
                        <div className='sotuvchi-boling sotuvchi-boling-2'>
                            <a href='tel:+998910086789'>
                                <i class="fa-solid fa-phone mr-2"></i>
                                <span>{'+998 (91) 008 67 89'}</span>
                            </a>

                            <a href='https://t.me/soff_uz' target='_blank' >
                                <i class="fa-brands fa-telegram me-2"></i>
                            </a>
                        </div>
                        <div className='sotuvchi-boling'>
                            <a href='https://seller.soff.uz' target='_blank'>Sotuvchi bo'lish</a>
                            <i class="fa-solid fa-user-check"></i>
                        </div>
                    </div>
                </div>

                <div className="navigation--mobile">
                    <div className="navigation__left">
                        <Link href="/">
                            <a className="ps-logo">
                                <NextImageCard
                                    url="/static/img/soff/soff_green_white.png"
                                    clasS="logoo"
                                    width="100px"
                                    height="40px"
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
