import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { Badge } from 'antd'

export default function HeaderSearchIcon() {
    return (
        <Link href={`/`}>
            <a className="header__extra fs-2" style={{ cursor: 'pointer' }}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </a>
        </Link>
    )
}
