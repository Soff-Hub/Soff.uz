import { useRouter } from 'next/router';
import React from 'react'
import HeaderSearchForm from './HeaderSearchForm';

export default function HeaderSearchbar() {
    const { asPath } = useRouter();

    return (
        <div className='site-header-searchbar'>
            {asPath !== "/" && <div className="header__content-center">
                <HeaderSearchForm />
            </div>}
        </div>
    )
}
