import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

const AccountMenuSidebar = ({ data }) => {
    const {asPath} = useRouter();
    return(
        <aside className="ps-widget--account-dashboard">
        <div className="ps-widget__header">
            <img src="/static/img/users/1.png" />
            <figure>
                <figcaption>Hello</figcaption>
                <p>+998 78 888 88 78 </p>
            </figure>
        </div>
        <div className="ps-widget__content">
            <ul>
                {data.map(link => (
                    <li key={link.text} className={link.url===asPath ? 'active' : ''}>
                        <Link href={link.url}>
                            <a>
                                <i className={link.icon}></i>
                                {link.text}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </aside>
    )
}
export default AccountMenuSidebar;
