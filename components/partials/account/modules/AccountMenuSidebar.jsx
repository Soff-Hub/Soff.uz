import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Button, Tooltip } from 'antd';




const AccountMenuSidebar = ({ data, renderProfile }) => {
    const { user } = useSelector(state => state.auth);
    const [profile, setProfile] = useState(null);

    async function ProfileUsers() {
        const ItemsData = await GetRepository.getProfile(user?.access);
        setProfile(ItemsData)
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
                    <h4 className='m-0 '> {profile?.first_name && profile?.last_name ? (<><span>{profile?.first_name}</span> <span> {profile?.last_name}</span></>) : (user?.role === "seller" ? <span>{profile?.role ? "Sotuvchi" : "malumt yo'q"}</span> : user.role === "admin" ? <span>{profile?.role ? "Admin" : "malumt yo'q"}</span> : user.role === "customer" ? <span>{profile?.role ? "Foydalanuvchi" : "malumt yo'q"}</span> : <></>)}  </h4>
                    <p>{profile?.phone}</p>


                </figure>
            </div>
            {
                user?.role === "seller"
                    ?
                    <div className='pb-3'>
                        <Tooltip title={`${profile?.is_payment === false ? `Pul yechib olish uchun ` + profile?.min_sum + " So'mdan o'tish kerak " : " Pulni yechib olishingiz mumkin"}`} defaultOpen color={`${profile?.is_payment === false ? "red" : "green"}`}>
                            <Button className='w-100 pb-5 ' ><strong className={`fs-3 text-${profile?.is_payment === false ? "danger" : "success"}`} > Hisobingizda: {addPeriodToThousands(profile?.wallet)} so'm</strong></Button>
                        </Tooltip>
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
