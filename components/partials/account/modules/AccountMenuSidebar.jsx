import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';


const AccountMenuSidebar = ({ data }) => {
    const { user } = useSelector(state => state.auth);
    const [profile , setProfile] = useState(null);

    async function ProfileUsers(){
        const ItemsData = await GetRepository.getProfile(user?.access);
        setProfile(ItemsData)
    }


 useEffect(()=>(
    ProfileUsers()
 ),[])

    const {asPath} = useRouter();

return(
    <aside className="ps-widget--account-dashboard">
    <div className="ps-widget__header">
    <i className=" fa-3x text-info fa-solid fa-circle-user"></i>
        <figure>
            <h4 className='m-0 '> {profile?.first_name && profile?.last_name ? (<><span>{profile?.first_name }</span> <span> {profile?.last_name}</span></>) : (user?.role === "seller" ? <span>{profile?.role ? "Sotuvchi" : "malumt yo'q"}</span> : user.role==="admin" ? <span>{profile?.role ? "Admin" : "malumt yo'q"}</span> : user.role==="customer" ? <span>{profile?.role ? "Foydalanuvchi" : "malumt yo'q"}</span>  : <></>  ) }  </h4>
            <p>{profile?.phone}</p>
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
