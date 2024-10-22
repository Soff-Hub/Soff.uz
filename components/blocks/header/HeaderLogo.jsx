import Link from 'next/link'
import React from 'react'
import NextImageCard from '~/components/nextImagecard'

export default function HeaderLogo() {
    return (
        <Link href="/">
            <a>
                <NextImageCard
                    url="/static/img/soff/soff_green_white.png"
                    className="logoo"
                    width="140px"
                    height="60px"
                />
            </a>
        </Link>

    )
}
