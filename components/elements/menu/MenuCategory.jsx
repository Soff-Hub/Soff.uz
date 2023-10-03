import Link from 'next/link';
import React from 'react';

export default function MenuCategory({ source, className }) {
    return (
        <div>
            <ul className={className} style={{overflowY:'scroll', height:'400px'}}>
                {source &&
                    source?.map((item, i) => (
                        <li key={i}>
                            <Link
                                href={`/category/${item.id}`}
                                as={`/category/${item.id}`}>
                                <a>
                                    {item.icon && <i className={item.icon}></i>}
                                    {item.name}
                                </a>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
