import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ElectronicHeaderActions from '~/components/shared/headers/modules/ElectronicHeaderActions';
import { stickyHeader } from '~/utilities/common-helpers';
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
                <div className="container">
                    <div className="header__content-left">
                        <Link href="/">
                            <a className="ps-logo">
                                <NextImageCard
                                    url="/static/img/soff/soff_green_white.png"
                                    clasS="logoo"
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


