import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NextImageCard from '~/components/nextImagecard'

export default function HeaderLogo({ mode }) {

    return (
        <Link href="/">
            <a className='site-header-logo'>
                <Image
                    src={`/static/img/soff/logo-${mode}.png`}
                    width={140}
                    height={40}
                />
            </a>
        </Link>

    )
}
