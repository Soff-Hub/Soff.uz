import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import useAuth from '~/hooks/useAuth';
import { logOut } from '~/store/auth/action';
import { Badge, Card, Modal, Tooltip } from 'antd';
import { formatCurrency } from '~/utilities/product-helper';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
import CalculateTimeDifference from '~/components/partials/account/DateFormatter';

const AccountMenuSidebar = ({ setMenuDrawer, setCategoriesDrawer }) => {
    const dispatch = useDispatch();
    const { accountLinks } = useSelector((state) => state.auth);
    const refresh = useSelector((state) => state.auth?.user?.refresh);

    const { asPath } = useRouter();
    const { user } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.ecomerce);
    const [webdata, setWebData] = useState(null);
    const [socket, setSocket] = useState(null);
    const [webdata1, setWebData1] = useState(null);
    const [socket1, setSocket1] = useState(null);
    const [webdata2, setWebData2] = useState(null);
    const [socket2, setSocket2] = useState(null);
    const [dataBlock, setdataBlock] = useState(null);
    const [copy, setCopy] = useState(false);
    const [socketApplication, setSocketApplication] = useState(null);
    const [applicationData, setApplicationData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenCustomer, setIsModalOpenCustomer] = useState(false);


    const showModalCustomer = () => {
        setIsModalOpenCustomer(true);
    };

    const handleOkCustomer = () => {
        setIsModalOpenCustomer(false);
    };

    const handleCancelCustomer = () => {
        setIsModalOpenCustomer(false);
    };

    const handleOk = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleLogoutToken = () => {
        const data = {
            refresh: refresh,
        };
        const { logOutAuth } = useAuth();
        const res = logOutAuth(data);

        if (res) {
            Router.push('/account/dashbord');
            dispatch(logOut());
        }
    };

    async function ProfileUsersToken(token) {
        const ItemsData = await GetRepository.getProfileToken(token);
        if (Number(ItemsData?.status) == 403) {
            handleLogoutToken();
        }
    }


    async function ProfileUsersBLock() {
        const token = user?.access
        const ItemsData = await GetRepository.getProfileBlock(token);
        setdataBlock(ItemsData);
    }

    useEffect(() => {
        if (socket) {
            socket.addEventListener('message', (event) => {
                setWebData(JSON.parse(event.data));
            });
        }
    }, [socket]);

    useEffect(() => {
        if (user?.role === 'admin') {
            setSocket(
                new WebSocket(
                    `${process.env.NEXT_PUBLIC_WS_BASE_URL}ws/admin-offer/?token=${user?.access}`
                )
            );
        } else {
            setSocket(
                new WebSocket(
                    `${process.env.NEXT_PUBLIC_WS_BASE_URL}ws/seller-offer/?token=` +
                    user?.access
                )
            );
        }
    }, []);

    useEffect(() => {
        if (socket1) {
            socket1.addEventListener('message', (event) => {
                setWebData1(JSON.parse(event.data));
            });
        }
    }, [socket1]);

    useEffect(() => {
        if (user?.role === 'admin') {
            setSocket1(
                new WebSocket(
                    `${process.env.NEXT_PUBLIC_WS_BASE_URL}ws/admin-document/?token=${user?.access}`
                )
            );
        }
    }, []);

    useEffect(() => {
        if (socket2) {
            socket2.addEventListener('message', (event) => {
                setWebData2(JSON.parse(event.data));
            });
        }
    }, [socket2]);

    useEffect(() => {
        if (user?.role) {
            setSocket2(
                new WebSocket(
                    `${process.env.NEXT_PUBLIC_WS_BASE_URL}ws/seller-document/?token=` +
                    user?.access
                )
            );
        }
    }, []);

    useEffect(() => {
        if (socketApplication) {
            socketApplication.onmessage = (event) => {
                setApplicationData(JSON.parse(event.data));
            };
        }
    }, [socketApplication]);

    useEffect(() => {
        if (user?.role === 'admin') {
            setSocketApplication(
                new WebSocket(
                    `${process.env.NEXT_PUBLIC_WS_BASE_URL}ws/admin-application/?token=${user?.access}`
                )
            );
        } else {
            setSocketApplication(
                new WebSocket(
                    `${process.env.NEXT_PUBLIC_WS_BASE_URL}ws/seller-application/?token=` +
                    user?.access
                )
            );
        }
    }, []);


    useEffect(() => {
        if (user?.access && user?.role === "seller") {
            ProfileUsersToken(user?.access);
            ProfileUsersBLock()
        }
    }, [user?.access]);

    function copyToClipboard() {
        const textToCopy = `https://soff.uz/account/register/${profile?.code}`;
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        if (document.execCommand('copy')) {
            setCopy(true);
            setTimeout(() => {
                setCopy(false);
            }, 2000);
        }
    }

    const handleDrawerClose = () => {
        setTimeout(() => {
            setMenuDrawer(false);
            setCategoriesDrawer(false);
        }, 700);
    };



    return (
        <aside className="ps-widget--account-dashboard">
            <div className="ps-widget__header  p-2 pb-4 step-2">
                {profile?.image ? (
                    <img src={`${profile?.image}`} className="profile__image" />
                ) : (
                    <i className=" fa-3x text-info fa-solid fa-circle-user"></i>
                )}
                <figure>
                    <>
                        <h4 className="m-0 " style={{ maxWidth: '280px' }}>
                            {' '}
                            {profile?.first_name && profile?.last_name ? (
                                <>
                                    <span>{profile?.first_name}</span>{' '}
                                    <span> {profile?.last_name}</span>
                                </>
                            ) : user?.role === 'seller' ? (
                                <span>
                                    {profile?.role
                                        ? 'Sotuvchi'
                                        : "ma'lumot yo'q"}
                                </span>
                            ) : user?.role === 'admin' ? (
                                <span>
                                    {profile?.role
                                        ? 'Admin'
                                        : "malumot yo'q"}
                                </span>
                            ) : user?.role === 'customer' ? (
                                <span>
                                    {profile?.role
                                        ? 'Foydalanuvchi'
                                        : "malumot yo'q"}
                                </span>
                            ) : (
                                <></>
                            )}{' '}
                        </h4>
                        <p
                            className="text-truncate"
                            style={{ maxWidth: '280px' }}>
                            {profile?.phone || profile?.email}
                        </p>
                    </>
                </figure>
            </div>
            {user?.role === 'seller' ? (
                <div className="pb-3 step-3">
                    <div className="w-100   border m-0 p-3 rounded-3  text-truncate mb-2">
                        {
                            dataBlock?.has_blocked &&
                            <>

                                <div>
                                    <Tooltip
                                        color='red'
                                        overlayStyle={{
                                            minWidth: '350px',
                                        }} title={
                                            <div className='d-flex flex-column '>
                                                <div className='d-flex gap-1'>
                                                    <span>Bloklab qo'yilgan sanasi:</span>
                                                    <CalculateTimeDifference targetDate={dataBlock?.created_at} />
                                                </div>
                                                <div className='d-flex gap-1'>
                                                    <span>Blokdan chiqish sanasi:</span>
                                                    <CalculateTimeDifference targetDate={dataBlock?.to_date} />
                                                </div>


                                                <span>{dataBlock?.reason}</span>
                                            </div>

                                        }>
                                        <span style={{ cursor: 'pointer' }}>
                                            <i className="fa-solid fa-circle-question text-danger"></i>{' '}
                                        </span>
                                    </Tooltip>
                                    <strong style={{ whiteSpace: 'wrap' }} className='text-danger'>Siz Bloklangansiz.
                                        Bu davr mobaynida pul yechish uchun ariza yubora olmaysiz va yangi mahsulot qo'sha olmaysiz</strong>
                                </div>

                                <div className='d-flex flex-column '>
                                    <div className='d-flex gap-1'>
                                        <span className='fs-5'>Blok qilingan vaqt:</span>
                                        <CalculateTimeDifference className={"fs-5"} targetDate={dataBlock?.created_at} />
                                    </div>

                                    <div className='d-flex gap-1'>
                                        <span className='fs-5'>Blokdan chiqish sanasi:</span>
                                        <CalculateTimeDifference className={"fs-5"} targetDate={dataBlock?.to_date} />
                                    </div>
                                    <span className='fs-5'>{dataBlock?.reason}</span>
                                </div>


                            </>
                        }


                        <strong
                            className={`fs-3 text-${profile?.is_payment === false
                                ? 'danger'
                                : 'success'
                                }`}>
                            <i className="fa-solid fa-wallet mx-2"></i> Balans:{' '}
                            {addPeriodToThousands(profile?.wallet)} so'm
                        </strong>
                    </div>
                    <h5 className="w-100  border m-0 p-3 rounded-3  text-truncate">
                        <p
                            className="m-0"
                            style={{ fontWeight: 600, color: 'black' }}>
                            Taklif qilingan foydalanuvchilar:{' '}
                            <span className="text-success">
                                {profile?.invited_users}
                            </span>{' '}
                            ta
                        </p>
                        <p
                            className="m-0"
                            style={{ fontWeight: 600, color: 'black' }}>
                            Taklif orqali daromadingiz:{' '}
                            <span className="text-success">
                                {formatCurrency(profile?.inviter_wallet)}
                            </span>{' '}
                            so'm
                        </p>
                        <p
                            className="m-0"
                            style={{ fontWeight: 600, color: 'black' }}>
                            Sotilgan mahsulotlar daromadi:{' '}
                            <span className="text-success">
                                {formatCurrency(profile?.total_doc_selling_price)}
                            </span>{' '}
                            so'm
                        </p>

                        <p
                            className="m-0 mt-3"
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 10,
                            }}>
                            <Tooltip
                                title={`Sizning taklif havolangiz orqali ro'yxatdan o'tgan har bir sotuvchining daromadidan, ${+profile?.inviter_percentage} % qismi sizga tushadigan daromad`}>
                                <i
                                    style={{ cursor: 'pointer' }}
                                    className="fa-regular fa-circle-question mt-2"></i>
                            </Tooltip>
                            <span style={{ overflow: 'hidden' }}>
                                Taklif havolani olish{' '}
                                {profile?.code ? (
                                    <>
                                        {copy ? (
                                            <i className="fa-solid fa-check"></i>
                                        ) : (
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                onClick={copyToClipboard}
                                                className="fa-solid fa-copy"></i>
                                        )}
                                    </>
                                ) : (
                                    <a
                                        href="https://t.me/soff_uz_bot"
                                        target="_blank">
                                        <i
                                            className="fa-brands fa-telegram fa-beat fa-xl mt-4 mt-lg-3 mt-md-3 mt-sm-3"
                                            style={{
                                                color: '#6492e3',
                                                fontSize: '16px',
                                            }}></i>
                                    </a>
                                )}
                            </span>
                        </p>
                    </h5>
                    <p></p>
                </div>
            ) : (
                <></>
            )}

            <div className="ps-widget__content">

                <Modal
                    footer={null}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { backgroundColor: '#00A44F' } }}>
                    <h4 className='text-danger '>Siz Bloklangansiz </h4>

                    <p className='m-0 fw-medium '>Blok qilingan sana : <CalculateTimeDifference targetDate={dataBlock?.created_at} /></p>
                    <p className=' fw-medium'>Blokadan chiqish sanasi : <CalculateTimeDifference targetDate={dataBlock?.to_date} /></p>
                    <div>
                        <p className='fw-bold m-0'>Sabab:</p>
                        <p> {dataBlock?.reason}</p>
                    </div>
                </Modal>

                <Modal
                    title="Buyurtma berish"
                    open={isModalOpenCustomer}
                    onOk={handleOkCustomer}
                    onCancel={handleCancelCustomer}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { backgroundColor: '#00A44F' } }}>
                    <p>Tez kunda!</p>
                    <p>
                        Xurmatli Soff.uz foyalanuvchisi, siz bu yerda Sotuvchiga
                        mahsulot yoki xizmat buyurtmasini berishingiz mumkin
                        bo'ladi.
                    </p>
                </Modal>


                <ul>
                    {accountLinks.map((link, index) => (
                        <>
                            {
                                link?.url === 'b' ? (
                                    <Badge.Ribbon
                                        key={link?.url}
                                        text="Yangi funksiya"
                                        color="blue">
                                        <Card size="small">
                                            <li onClick={showModalCustomer}>
                                                <span
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}>
                                                    <a className="d-flex align-items-center">
                                                        <i className="fa-regular fa-handshake"></i>
                                                        Buyurtma berish
                                                    </a>
                                                </span>
                                            </li>
                                        </Card>
                                    </Badge.Ribbon>

                                ) : (dataBlock?.has_blocked && link?.url === '/account/myproducts/product-selection') ? (

                                    <li onClick={handleOk}>
                                        <span
                                            style={{
                                                cursor: 'pointer',
                                            }}>
                                            <a className="d-flex align-items-center">
                                                <i className="fa-solid fa-circle-plus"></i>
                                                Yangi Mahsulot
                                            </a>
                                        </span>
                                    </li>

                                ) :
                                    (

                                        <li
                                            onClick={handleDrawerClose}
                                            key={link.text}
                                            className={`${link.url === asPath ? 'active' : ''
                                                } step-${index + 4}`}>
                                            <Link href={link.url}>
                                                <a
                                                    className={`d-flex align-items-center`}>
                                                    <i className={link.icon}></i>
                                                    {link.text}{' '}

                                                    {user?.role === 'admin' ? (
                                                        link?.url ===
                                                            '/account/application' &&
                                                            (applicationData?.count > 0 ||
                                                                webdata?.count > 0) ? (
                                                            <strong
                                                                className="text-white bg-warning  border px-3 py-2  fs-5 rounded-circle"
                                                                style={{
                                                                    marginLeft: '11rem',
                                                                }}>
                                                                {Number(
                                                                    applicationData?.count
                                                                ) +
                                                                    Number(
                                                                        webdata?.count
                                                                    )}
                                                            </strong>
                                                        ) : (
                                                            ''
                                                        )
                                                    ) : (
                                                        ''
                                                    )}

                                                    {user?.role === 'admin' ? (
                                                        link?.url ===
                                                            '/account/products' &&
                                                            webdata1?.count > 0 ? (
                                                            <strong
                                                                className="text-white bg-warning  border px-3 py-2  fs-5 rounded-circle"
                                                                style={{
                                                                    marginLeft: '12rem',
                                                                }}>
                                                                {webdata1?.count}
                                                            </strong>
                                                        ) : (
                                                            ''
                                                        )
                                                    ) : (
                                                        ''
                                                    )}

                                                    {user?.role === 'seller' ? (
                                                        link?.url ===
                                                            '/account/myproducts' &&
                                                            webdata2?.count > 0 ? (
                                                            <strong
                                                                className="text-white bg-warning  border px-3 py-2  fs-5 rounded-circle"
                                                                style={{
                                                                    marginLeft: '4rem',
                                                                }}>
                                                                {webdata2?.count}
                                                            </strong>
                                                        ) : (
                                                            ''
                                                        )
                                                    ) : (
                                                        ''
                                                    )}

                                                    {user?.role === 'seller' ? (
                                                        link?.url ===
                                                            '/account/application' &&
                                                            (applicationData?.count > 0 ||
                                                                webdata?.count > 0) ? (
                                                            <strong
                                                                className="text-white bg-warning  border px-3 py-2  fs-5 rounded-circle"
                                                                style={{
                                                                    marginLeft: '11rem',
                                                                }}>
                                                                {Number(
                                                                    applicationData?.count
                                                                ) +
                                                                    Number(
                                                                        webdata?.count
                                                                    )}
                                                            </strong>
                                                        ) : (
                                                            ''
                                                        )
                                                    ) : (
                                                        ''
                                                    )}
                                                </a>
                                            </Link>
                                        </li>
                                    )}
                        </>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default AccountMenuSidebar;
