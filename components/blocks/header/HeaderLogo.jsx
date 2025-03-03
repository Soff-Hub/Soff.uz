import Image from 'next/image';
import Router from 'next/router';
import React from 'react';

export default function HeaderLogo ({ mode }) {
    return (
        <div>
            <div
                className='site-header-logo'
                style={{ cursor: 'pointer', margin: '0px', padding: '0px' }}
                onClick={() => Router.push('/')}>
                <Image
                    src={`/static/img/soff/logo-${mode}.png`}
                    width={'130.37px'}
                    height={'36.67px'}
                    alt='Logo of Soff.uz'
                />
            </div>
        </div>
    );
}
