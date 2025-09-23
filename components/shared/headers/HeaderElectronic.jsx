import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ElectronicHeaderActions from '~/components/shared/headers/modules/ElectronicHeaderActions';
import { stickyHeader } from '~/shared/utilities/common-helpers';
import NextImageCard from '~/components/nextImagecard';
import SearchHeader from './modules/SearchHeader';
import { useRouter } from 'next/router';

const HeaderElectronic = () => {
    const { asPath } = useRouter();
    const [run, setRun] = useState(false);


    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('tour') && localStorage.getItem('tour') === "true") {
            setRun(true);
        }
    }, [])

    return (
        <header
            className="header header--standard header--electronic "
            id={run ? "" : "headerSticky"}>

            <div className="header__content">
                <div className='header-topsection'>
                    <div className="container">
                        <div className='sotuvchi-boling sotuvchi-boling-2'>
                            <a href='tel:+998910086789'>
                                <i className="fa-solid fa-phone mr-2"></i>
                                <span>{'+998 (91) 008 67 89'}</span>
                            </a>

                            <a href='https://t.me/soff_uz' target='_blank' >
                                <i className="fa-brands fa-telegram me-2"></i>
                            </a>

                            <a href='https://www.instagram.com/soffuz_/' target='_blank' >
                                <i className="fa-brands fa-instagram me-2"></i>
                            </a>

                            {/* <a href='https://www.instagram.com/soffuz_/' target='_blank' >
                                <i className="fa-brands fa-telegram me-2"></i>
                            </a> */}
                        </div>
                        <div className='sotuvchi-boling'>
                            <a href='https://seller.soff.uz' target='_blank'>Sotuvchi bo'lish</a>
                            <i className="fa-solid fa-user-check"></i>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="header__content-left">
                        <Link href="/">
                            <a className="ps-logo">
                                <NextImageCard
                                    url="/static/img/soff/soff_green_white.png"
                                    className="logoo"
                                    width="140px"
                                    height="60px"
                                />
                            </a>
                        </Link>

                    </div>
                    {asPath !== "/" && <div className="header__content-center">
                        <SearchHeader />
                    </div>}

                    <div className="header__content-right">
                        <ElectronicHeaderActions />
                    </div>
                </div>
            </div>

        </header>
    );
};

export default HeaderElectronic;


