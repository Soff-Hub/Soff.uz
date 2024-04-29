import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { BeatLoader } from 'react-spinners';
import { Badge, Card, Modal, Tooltip } from 'antd';
import { formatCurrency } from '~/utilities/product-helper';

const UserMenuPanel = ({ setMenuDrawer, setCategoriesDrawer }) => {
    const { user } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [webdata, setWebData] = useState(null);
    const [socket, setSocket] = useState(null);
    const [webdata1, setWebData1] = useState(null);
    const [socket1, setSocket1] = useState(null);
    const [webdata2, setWebData2] = useState(null);
    const [socket2, setSocket2] = useState(null);
    const [copy, setCopy] = useState(false);

    const { accountLinks } = useSelector((state) => state.auth);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenCustomer, setIsModalOpenCustomer] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
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
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    async function ProfileUsers() {
        setLoading(true);
        const ItemsData = await GetRepository.getProfile(user?.access);

        setProfile(ItemsData);
        setLoading(false);
    }

    const handleDrawerClose = () => {
        setMenuDrawer(false);
        setCategoriesDrawer(false);
    };
    useEffect(() => {
        if (socket) {
            socket.addEventListener('message', (event) => {
                setWebData(JSON.parse(event.data));
            });
        }
    }, [socket]);

    useEffect(() => {
        if (socket1) {
            socket1.addEventListener('message', (event) => {
                setWebData1(JSON.parse(event.data));
            });
        }
    }, [socket1]);

    useEffect(() => {
        setSocket1(new WebSocket('wss://api.soff.uz/ws/admin-document/'));
    }, []);

    useEffect(() => {
        if (socket2) {
            socket2.addEventListener('message', (event) => {
                setWebData2(JSON.parse(event.data));
            });
        }
    }, [socket2]);

    useEffect(() => {
        setSocket2(new WebSocket('wss://api.soff.uz/ws/seller-document/'));
    }, []);

    useEffect(() => ProfileUsers(), []);

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
        handleDrawerClose();
        const modal = Modal.info({
            centered: true,
            title: 'Taklif havlasi bu?',
            content: `Sizning taklif havolangiz orqali ro'yxatdan o'tgan har bir sotuvchining daromadidan, ${+profile?.inviter_percentage} % qismi sizga tushadigan daromad`,
        });
        modal.update;
    };

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

    return (
        <aside className="ps-widget--account-dashboard">
            <div className="ps-widget__header  p-2 pb-4 py-4">
                <i className=" fa-3x text-info fa-solid fa-circle-user"></i>
                <figure>
                    {!loading ? (
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
                                            : "malumt yo'q"}
                                    </span>
                                ) : user.role === 'admin' ? (
                                    <span>
                                        {profile?.role
                                            ? 'Admin'
                                            : "malumt yo'q"}
                                    </span>
                                ) : user.role === 'customer' ? (
                                    <span>
                                        {profile?.role
                                            ? 'Foydalanuvchi'
                                            : "malumt yo'q"}
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
                    ) : (
                        <div className="mx-5 mt-3">
                            <BeatLoader size={10} color="#333" />
                        </div>
                    )}
                </figure>
            </div>
            {user?.role === 'seller' ? (
                <div className="pb-3">
                    <h4 className="w-100  border m-0 p-3 rounded-3  text-truncate ">
                        <strong
                            className={`fs-3 text-${profile?.is_payment === false
                                ? 'danger'
                                : 'success'
                                }`}>
                            <i className="fa-solid fa-wallet mx-2"></i> Balans:{' '}
                            {addPeriodToThousands(profile?.wallet)} so'm
                        </strong>
                    </h4>
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
                            className="m-0 mb-3"
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 20,
                            }}>
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
                        <u
                            onClick={() => handleAboutReffer()}
                            className="m-0"
                            style={{ cursor: 'pointer' }}>
                            Taklif havola nima?
                        </u>
                    </h5>
                </div>
            ) : (
                <></>
            )}
            <div className="ps-widget__content ">
                <Modal
                    title=" Mening bitimlarim"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { backgroundColor: '#00A44F' } }}>
                    <p>Tez kunda!</p>
                    <p>
                        Bu yerda siz o'z xizmatlaringizni sotishingiz mumkin.
                        Soff.uz platformasi siz uchun xizmatlaringizga mos
                        bo'lgan, Buyurtmachilardan kelib tushgan buyurtmalarni
                        taqdim qiladi.
                    </p>
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
                    {accountLinks?.map((link) => (
                        <>
                            {link?.url == 'b' ? (
                                <Badge.Ribbon text="Tez kunda" color="volcano">
                                    <Card size="small">
                                        <li onClick={handleDrawerClose}>
                                            <span
                                                onClick={showModalCustomer}
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
                            ) : link?.url == '#' ? (
                                <Badge.Ribbon text="Tez kunda" color="volcano">
                                    <Card size="small">
                                        <li onClick={handleDrawerClose}>
                                            <span
                                                onClick={showModal}
                                                style={{
                                                    cursor: 'pointer',
                                                }}>
                                                <a className="d-flex align-items-center">
                                                    <i className="fa-regular fa-handshake"></i>
                                                    Mening bitimlarim
                                                </a>
                                            </span>
                                        </li>
                                    </Card>
                                </Badge.Ribbon>
                            ) : link?.url == '/account/donate-page' ? (
                                <Badge.Ribbon text="Yangi funksiya" color="orange">
                                    <Card size="small">
                                        <li
                                            onClick={handleDrawerClose}
                                            key={link.text}
                                            className={
                                                link.url === asPath ? 'active' : ''
                                            }>
                                            <Link href={link.url}>
                                                <a>
                                                    <i className={link.icon}></i>
                                                    {link.text}{' '}
                                                </a>
                                            </Link>
                                        </li>
                                    </Card>
                                </Badge.Ribbon>
                            ) : (
                                <li
                                    onClick={handleDrawerClose}
                                    key={link.text}
                                    className={
                                        link.url === asPath ? 'active' : ''
                                    }>
                                    <Link href={link.url}>
                                        <a>
                                            <i className={link.icon}></i>
                                            {link.text}{' '}
                                            {user?.role === 'admin' ? (
                                                link?.url ===
                                                    '/account/application' &&
                                                    webdata?.is_avaiable ===
                                                    true ? (
                                                    <strong
                                                        className="text-white bg-warning  border px-3 py-2  fs-5 rounded-circle"
                                                        style={{
                                                            marginLeft: '15rem',
                                                        }}>
                                                        {webdata?.count}
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
                                                    webdata1?.is_avaiable ===
                                                    true ? (
                                                    <strong
                                                        className="text-white bg-warning  border px-3 py-2  fs-5 rounded-circle"
                                                        style={{
                                                            marginLeft: '15rem',
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
                                                    webdata2?.is_avaiable ===
                                                    true ? (
                                                    <strong
                                                        className="text-white bg-warning  border px-3 py-2  fs-5 rounded-circle"
                                                        style={{
                                                            marginLeft: '5rem',
                                                        }}>
                                                        {webdata2?.count}
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

export default UserMenuPanel;
