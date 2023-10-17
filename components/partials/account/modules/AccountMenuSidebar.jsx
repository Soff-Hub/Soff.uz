import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Button, Tooltip } from 'antd';
import { BeatLoader } from 'react-spinners';




const AccountMenuSidebar = ({ data, renderProfile }) => {
    const { user } = useSelector(state => state.auth);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    async function ProfileUsers() {
        setLoading(true)
        const ItemsData = await GetRepository.getProfile(user?.access);
        setProfile(ItemsData)
        setLoading(false)
    }


    useEffect(() => (
        ProfileUsers()
    ), [renderProfile])


    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }


    const { asPath } = useRouter();
    return (
        <aside className="ps-widget--account-dashboard">
            <div className="ps-widget__header  p-2 pb-4">
                <i className=" fa-3x text-info fa-solid fa-circle-user"></i>
                <figure>
                    {
                        !loading ?
                            <>
                                <h4 className='m-0 ' style={{ maxWidth: "280px" }}> {profile?.first_name && profile?.last_name ? (<><span>{profile?.first_name}</span> <span> {profile?.last_name}</span></>) : (user?.role === "seller" ? <span>{profile?.role ? "Sotuvchi" : "malumt yo'q"}</span> : user.role === "admin" ? <span>{profile?.role ? "Admin" : "malumt yo'q"}</span> : user.role === "customer" ? <span>{profile?.role ? "Foydalanuvchi" : "malumt yo'q"}</span> : <></>)}  </h4>
                                <p className='text-truncate' style={{ maxWidth: "280px" }}>{profile?.phone || profile?.email}</p>
                            </>
                            :
                            <div className="mx-5 mt-3">
                                 <BeatLoader size={10} color="#333" />
                            </div>
                    }



                </figure>
            </div>
            {
                user?.role === "seller"
                    ?
                    <div className='pb-3'>
                        <h4 className='w-100  border m-0 p-3 rounded-3  text-truncate ' ><strong className={`fs-3 text-${profile?.is_payment === false ? "danger" : "success"}`} ><i className="fa-solid fa-wallet mx-2"></i>  Balans: {addPeriodToThousands(profile?.wallet)} so'm</strong></h4>
                    </div>
                    :
                    <></>
            }
            <div className="ps-widget__content">
                <ul>
                    {data.map(link => (
                        <li key={link.text} className={link.url === asPath ? 'active' : ''}>
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
