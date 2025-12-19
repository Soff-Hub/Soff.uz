import React from 'react';
import Link from 'next/link';

const Logo = () => {
    return (
        <Link href='#'>
            <a className="ps-logo">
                <img src='/static/img/soff/soff_green_white.png' alt="" />
            </a>
        </Link>
    );
};

export default Logo;
