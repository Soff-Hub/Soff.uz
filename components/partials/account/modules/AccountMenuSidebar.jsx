import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { useSelector } from 'react-redux';


const AccountMenuSidebar = ({ data }) => {
    const { user } = useSelector(state => state.auth);
    const dataUser= useSelector(state => state.auth.data);


    const {asPath} = useRouter();

return(
    <aside className="ps-widget--account-dashboard">
    <div className="ps-widget__header">
    <i className=" fa-3x text-info fa-solid fa-circle-user"></i>
        <figure>
            <h4 className='m-0 '>{user?.role==="admin" ? "Admin" : user?.role==="seller" ? "Sotuvchi" : user?.role==="customer" ? "Foydalanuvchi" : "" }</h4>
            <p>{dataUser?.phone}</p>
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
