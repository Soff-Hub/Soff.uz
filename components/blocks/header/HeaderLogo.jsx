import Image from 'next/image';
import Router from 'next/router';
import React from 'react'; 

export default function HeaderLogo({ mode }) {
    return (
        <div className="d-flex gap-5 align-items-center">
            <div
                className="site-header-logo p-0 m-0"
                style={{ cursor: 'pointer' }}
                onClick={() => Router.push('/')}>
                <Image
                    src={`/static/img/soff/logo-${mode}.png`}
                    width={'100px'}
                    height={'30px'}
                    alt="Logo of Soff.uz"
                />
            </div>
        </div>
    );
}
