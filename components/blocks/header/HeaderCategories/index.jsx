import React, { useState } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import useResponsive from '~/utilities/useResponsive';
import CreateOrderModal from '~/components/freeleance/custom/ui/CreateOrderModal';

const options = {
    products: [
        {
            icon: '/static/svg/book-saved.svg',
            label: 'Ilmiy ishlar',
            link: '/scientific-resources/all?slug=all',
        },
        {
            icon: '/static/svg/3dcube.svg',
            label: '3D moddellar va Interier dizaynlar',
            link: '/3d-models-and-interior-designs/all?slug=all',
        },
        {
            icon: '/static/svg/image.svg',
            label: 'Dizayn shablonlari',
            link: '/design-developments/all?slug=all',
        },
        {
            icon: '/static/svg/monitor.svg',
            label: 'Dasturlash xizmatlari',
            link: '/websites/all?slug=all',
        },
        {
            icon: '/static/svg/chart.svg',
            label: 'Turli sohalar uchun shablonlar',
            link: '/templates/all?slug=all',
        },
        {
            icon: '/static/svg/video-square.svg',
            label: 'Video darsliklar',
            link: '/video-lessons/all?slug=all',
        },
    ],
    tempates: [
        {
            icon: '/static/svg/book-saved.svg',
            label: 'Ilmiy va Akademik Xizmatlar',
            link: '/orders?direction=scientific_work',
        },
        {
            icon: '/static/svg/image.svg',
            label: 'Dizayn',
            link: '/orders?direction=dizayn',
        },
        {
            icon: '/static/svg/monitor.svg',
            label: 'Dasturlash xizmatlari',
            link: '/orders?direction=web',
        },
        {
            icon: '/static/svg/3dcube.svg',
            label: '3D Dizayn va Vizualizatsiya',
            link: '/orders?direction=three_d',
        },
    ],
};

const HeaderCatergories = () => {
    const { isMobile } = useResponsive();
    const [open, setOpen] = useState(false)
    return (
        <div className={styles.dropBlock}>
            {/* {!isMobile &&
            } */}
            {/* <div>
            </div> */}
            <div className={styles.dropBox}>
                <p className={styles.dropLabel}>
                    <span className="flex-md-fill"> Mahsulotlar</span>

                    <Image
                        src="/static/svg/arrowdown.svg"
                        alt="arrow"
                        width={15}
                        height={8}
                    />
                </p>
                <ul className={styles.dropSubBox}>
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
                </ul>
            </div>
            <div className={`${styles.orderBox} ${styles.dropBox}`}>
                <p className={styles.dropLabel}>
                    <span className="">Buyurtma berish</span>{' '}
                    <Image
                        src="/static/svg/arrowdown.svg"
                        alt="arrow"
                        width={15}
                        height={8}
                    />
                </p>
                <ul className={styles.dropSubBox}>
                    {/* <li onClick={() => setOpen(true)} style={{ borderBottom: "1px solid rgba(0,0,0,0.2)", paddingBottom: "12px" }} className={styles.dropSubBoxItem}>
                        <div class Name={styles.add_icon}><i style={{ fontSize: isMobile ? "18px" : "25px", color: "rgba(0,0,0,0.6)" }} className="fa-solid fa-plus"></i></div>
                        <span className={styles.orderAddBtn}>Maxsus buyurtma berish</span>
                    </li> */}
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
                </ul>
            </div>
            {isMobile &&
                <div style={{ width: "10px" }}></div>
            }
            <CreateOrderModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export default HeaderCatergories;
