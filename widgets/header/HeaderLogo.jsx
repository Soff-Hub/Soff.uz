import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function HeaderLogo({ mode }) {
    return (
        <div className="d-flex gap-5 align-items-center pointer">
            <Link href="/" style={{ cursor: 'pointer' }}>
                <a style={{ display: 'block' }}>
                    <Image
                        src={`/static/img/soff/logo-${mode}.png`}
                        width={'100px'}
                        height={'30px'}
                        alt="Logo of Soff.uz"
                    />
                </a>
            </Link>
        </div>
    );
}
