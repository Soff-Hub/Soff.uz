import Link from 'next/link';
import React from 'react';

export default function MenuCategory({ source, className }) {
    return (
        <div>
            <ul className={className} style={{overflowY:'scroll', height:'400px'}}>
                {source &&
                    source?.map((item, i) => (
                        <li key={i}>
                            <Link className='d-flex align-items-center'
                                href={`/category/${item.id}`}
                                as={`/category/${item.id}`}>
                                <a>
                                    {item.icon && <i className={`fs-4 ${item.icon }`}></i>}
                                    {item.name}
                                </a>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
