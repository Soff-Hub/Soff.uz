import Link from 'next/link'
import React from 'react'

export default function FreeBtn({ url }) {
    return (
        <div>
            <Link href={url}>
                <a className='free-downlaod-button'>Bepul yuklab olish</a>
            </Link>
        </div>
    )
}
