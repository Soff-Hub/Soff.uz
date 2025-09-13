import React, { useState } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import useResponsive from '~/utilities/useResponsive';
import CreateOrderModal from '~/components/freeleance/custom/ui/CreateOrderModal';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Link from 'next/link';


const products = [
    {
        key: '1',
        icon: <Image src={'/static/svg/book-saved.svg'} alt="" width={20} height={20} />,
        label: (
            <a className={`ml-3 ${styles.dropLabel}`} href="/scientific-resources/all?slug=all">
                Ilmiy ishlar
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a className={`ml-3 ${styles.dropLabel}`} href="/3d-models-and-interior-designs/all?slug=all">
                3D moddellar va Interier dizaynlar
            </a>
        ),
        icon: <Image src={'/static/svg/3dcube.svg'} alt="" width={20} height={20} />,
    },
    {
        key: '3',
        label: (
            <a className={`ml-3 ${styles.dropLabel}`} href="/design-developments/all?slug=all">
                Dizayn shablonlari
            </a>
        ),
        icon: <Image src={'/static/svg/image.svg'} alt="" width={20} height={20} />,
    },
    {
        key: '4',
        icon: <Image src={'/static/svg/monitor.svg'} alt="" width={20} height={20} />,
        label: (
            <a className={`ml-3 ${styles.dropLabel}`} href="/websites/all?slug=all">
                Dasturlash xizmatlari
            </a>
        ),
    },
    {
        key: '5',
        icon: <Image src={'/static/svg/chart.svg'} alt="" width={20} height={20} />,
        label: (
            <a className={`ml-2 ${styles.dropLabel}`} href="/templates/all?slug=all">
                Turli sohalar uchun shablonlar
            </a>
        ),
    },
    {
        key: '6',
        icon: <Image src={'/static/svg/video-square.svg'} alt="" width={20} height={20} />,
        label: (
            <a className={`ml-3 ${styles.dropLabel}`} href="/video-lessons/all?slug=all">
                Video darsliklar
            </a>
        ),
    }
];

const templates = (handleOrder) => ([
    {
        key: '1',
        icon: <i style={{ fontSize: "20px", color: "rgba(0,0,0,0.6)" }} className="fa-solid fa-plus"></i>,
        label: (
            <p className={` ${styles.dropLabel}`}>
                Maxsus buyurtma berish
            </p>
        ),
        onClick: handleOrder
    },
    {
        key: '2',
        icon: <Image src={'/static/svg/book-saved.svg'} alt="" width={20} height={20} />,
        label: (
            <a className={`ml-3 ${styles.dropLabel}`} href="/orders?direction=scientific_work">
                Ilmiy va Akademik Xizmatlar
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a className={`ml-3 ${styles.dropLabel}`} href="/orders?direction=three_d">
                3D moddellar va Interier dizaynlar
            </a>
        ),
        icon: <Image src={'/static/svg/3dcube.svg'} alt="" width={20} height={20} />,
    },
    {
        key: '4',
        label: (
            <a className={`ml-3 ${styles.dropLabel}`} href="/orders?direction=dizayn">
                Dizayn shablonlari
            </a>
        ),
        icon: <Image src={'/static/svg/image.svg'} alt="" width={20} height={20} />,
    },
    {
        key: '5',
        icon: <Image src={'/static/svg/monitor.svg'} alt="" width={20} height={20} />,
        label: (
            <a className={`ml-3 ${styles.dropLabel}`} href="/orders?direction=web">
                Dasturlash xizmatlari
            </a>
        ),
    },
])

const HeaderCatergories = () => {
    const { isMobile } = useResponsive();
    const [open, setOpen] = useState(false)
    const { isLoggedIn } = useSelector(state => state.auth)
    const { push } = useRouter()

    const handleOrder = () => {
        if (isLoggedIn) {
            setOpen(true)
        } else {
            push('/auth/login')
        }
    }

    return (
        <div className={styles.dropBlock}>
            {!isMobile &&
                <Link href={'/order/my-orders'} target="_blank">
                    <p className={`${styles.navLink} my-0`}>Buyurtmalarim</p>
                </Link>}
            <div className={styles.dropBox}>
                <Dropdown menu={{ items: products }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space className={styles.dropLabel}>
                            Mahsulotlar
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                {/* <ul className={styles.dropSubBox}>
                    {options.products.map(item => (
                        <li className={styles.dropSubBoxItem}>
                            <Image
                                src={item.icon}
                                alt="direction"
                                width={isMobile ? 18 : 25}
                                height={isMobile ? 18 : 25}
                            />
                            <Link href={item.link}>{item.label}</Link>
                        </li>
                    ))}
                </ul> */}
            </div>
            <div className={`${styles.orderBox} ${styles.dropBox}`}>
                {/* <p className={styles.dropLabel}>
                    <span className="">Buyurtma berish</span>{' '}
                    <Image
                        src="/static/svg/arrowdown.svg"
                        alt="arrow"
                        width={15}
                        height={8}
                    /> 
                </p> */}
                <Dropdown menu={{ items: templates(handleOrder) }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space className={styles.dropLabel}>
                            Buyurtma berish
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                {/* <ul className={styles.dropSubBox}>
                    <li onClick={handleOrder} style={{ borderBottom: "1px solid rgba(0,0,0,0.2)", paddingBottom: "12px" }} className={styles.dropSubBoxItem}>
                        <div className={styles.add_icon}><i style={{ fontSize: isMobile ? "18px" : "25px", color: "rgba(0,0,0,0.6)" }} className="fa-solid fa-plus"></i></div>
                        <span className={styles.orderAddBtn}>Maxsus buyurtma berish</span>
                    </li>
                    {options.tempates.map(item => (
                        <li className={styles.dropSubBoxItem}>
                            <img
                                src={item.icon}
                                alt="direction"
                                style={{
                                    color: '#534534',
                                    width: isMobile ? "18px" : "25px",
                                    height: isMobile ? "18px" : "25px",
                                }}
                            />
                            <Link href={item.link}>{item.label}</Link>
                        </li>
                    ))}
                </ul> */}
            </div>
            <CreateOrderModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export default HeaderCatergories;
