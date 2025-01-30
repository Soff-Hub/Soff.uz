import Image from 'next/image'
import Router from 'next/router'
import React from 'react'

export default function HeaderLogo({ mode }) {

    return (
        <div>
            <div className='site-header-logo' style={{ cursor: 'pointer' }} onClick={() => Router.push('/')}>
                <Image
                    src={`/static/img/soff/logo-${mode}.png`}
                    width={140}
                    height={40}
                    alt='Logo of Soff.uz'
                />
            </div>
        </div>

    )
}
