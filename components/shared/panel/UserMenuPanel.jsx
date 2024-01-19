import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { BeatLoader } from 'react-spinners';
import { Modal, Tooltip } from 'antd';




const UserMenuPanel = ({
    setMenuDrawer,
    setCategoriesDrawer
}) => {
    const { user } = useSelector(state => state.auth);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [webdata, setWebData] = useState(null);
    const [socket, setSocket] = useState(null);
    const [webdata1, setWebData1] = useState(null);
    const [socket1, setSocket1] = useState(null);
    const [webdata2, setWebData2] = useState(null);
    const [socket2, setSocket2] = useState(null);

    const { accountLinks } = useSelector(state => state.auth)

    async function ProfileUsers() {
        setLoading(true)
        const ItemsData = await GetRepository.getProfile(user?.access);
        setProfile(ItemsData)
        setLoading(false)
    }

    const handleDrawerClose = () => {
        setMenuDrawer(false);
        setCategoriesDrawer(false);
    };
    useEffect(() => {
        if (socket) {
            socket.addEventListener("message", (event) => {
                setWebData(JSON.parse(event.data))
            });
        }
    }, [socket])

    useEffect(() => {
        if (socket1) {
            socket1.addEventListener("message", (event) => {
                setWebData1(JSON.parse(event.data))
            });
        }
    }, [socket1])

    useEffect(() => {
        setSocket1(new WebSocket("wss://api.soff.uz/ws/admin-document/"));
    }, [])

    useEffect(() => {
        if (socket2) {
            socket2.addEventListener("message", (event) => {
                setWebData2(JSON.parse(event.data))
            });
        }
    }, [socket2])

    useEffect(() => {
        setSocket2(new WebSocket("wss://api.soff.uz/ws/seller-document/"));
    }, [])


    useEffect(() => (
        ProfileUsers()
    ), [])


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


    const handleAboutReffer = () => {
        handleDrawerClose()
        const modal = Modal.info({
            centered: true,
            title: 'Taklif havlasi bu?',
            content: `Siz o'z taklif havolangiz orqali ro'yxatdan o'tgan har bir sotuvchi foydasidan, 10% sizga beriladigan bonus`,
        });
        modal.update
    }

    return (
        <aside className="ps-widget--account-dashboard">
            <div className="ps-widget__header  p-2 pb-4 py-4">
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
                        <h5 className='w-100  border m-0 p-3 rounded-3  text-truncate' >

                            <p className='m-0' style={{ fontWeight: 600, color: 'black' }}>Taklif qilingan foydalanuvhcilar: <span className='text-success'>0</span> ta</p>
                            <p className='m-0' style={{ fontWeight: 600, color: 'black' }}>Taklif orqali daromadingiz: <span className='text-success'>0</span> so'm</p>
                            <p className='m-0 mb-3' style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                                <a href={'https://t.me/soff_uz_bot'} target='_blank'>Taklif havolani olish <i class="fa-brands fa-telegram fa-beat fa-xl mt-4 mt-lg-3 mt-md-3 mt-sm-3" style={{ color: '#6492e3' }}></i></a>
                            </p>
                            <u onClick={() => handleAboutReffer()} className='m-0' style={{ cursor: 'pointer' }}>Taklif havola nima?</u>
                        </h5>
                    </div>
                    :
                    <></>
            }
            <div className="ps-widget__content">
                <ul>
                    {accountLinks?.map(link => (
                        <li onClick={handleDrawerClose} key={link.text} className={link.url === asPath ? 'active' : ''}>
                            <Link href={link.url}>
                                <a>
                                    <i className={link.icon}></i>
                                    {link.text} {user?.role === "admin" ? (link?.url === "/account/application" && webdata?.is_avaiable === true ? <strong className='text-white bg-warning  border px-3 py-2  fs-5 rounded-circle' style={{ marginLeft: "15rem" }}>{webdata?.count}</strong> : "") : ""}
                                    {user?.role === "admin" ? (link?.url === "/account/products" && webdata1?.is_avaiable === true ? <strong className='text-white bg-warning  border px-3 py-2  fs-5 rounded-circle' style={{ marginLeft: "15rem" }}>{webdata1?.count}</strong> : "") : ""}
                                    {user?.role === "seller" ? (link?.url === "/account/myproducts" && webdata2?.is_avaiable === true ? <strong className='text-white bg-warning  border px-3 py-2  fs-5 rounded-circle' style={{ marginLeft: "5rem" }}>{webdata2?.count}</strong> : "") : ""}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}


export default UserMenuPanel;
