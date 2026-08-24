import Link from 'next/link'
import React from 'react'

function TagsComponents({ name }) {
    return (
        <Link
            href={`/search-page?keyword=${encodeURIComponent(name || '')}`}
            passHref>
            <div className="tags_components">{name}</div>
        </Link>
    );
}

export default TagsComponents