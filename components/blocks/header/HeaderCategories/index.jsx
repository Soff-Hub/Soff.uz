import React from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const options = {
    products: [
        {
            icon: '/static/svg/book-saved.svg',
            label: 'Ilmiy ishlar',
            link: '/',
        },
        {
            icon: '/static/svg/3dcube.svg',
            label: '3D moddellar va Interier dizaynlar',
            link: '/',
        },
        {
            icon: '/static/svg/image.svg',
            label: 'Dizayn shablonlari',
            link: '/',
        },
        {
            icon: '/static/svg/monitor.svg',
            label: 'Veb saytlar',
            link: '/',
        },
        {
            icon: '/static/svg/chart.svg',
            label: 'Turli sohalar uchun shablonlar',
            link: '/',
        },
        {
            icon: '/static/svg/video-square.svg',
            label: 'Video darsliklar',
            link: '/',
        },
    ],
    tempates: [
        {
            icon: '/static/svg/book-saved.svg',
            label: 'Ilmiy va Akademik Xizmatlar',
            link: '/',
        },
        {
            icon: '/static/svg/image.svg',
            label: 'Dizayn',
            link: '/',
        },
        {
            icon: '/static/svg/monitor.svg',
            label: 'Veb saytlar',
            link: '/',
        },
        {
            icon: '/static/svg/3dcube.svg',
            label: '3D Dizayn va Vizualizatsiya',
            link: '/',
        },

        {
            icon: '/static/svg/chart.svg',
            label: 'Marketing',
            link: '/',
        },
        {
            icon: '/static/svg/edit.svg',
            label: 'Biznes',
            link: '/',
        },
    ],
};

const HeaderCatergories = () => {
    return (
        <div className={styles.dropBlock}>
            <div className={styles.dropBox}>
                <p className={styles.dropLabel}>
                    Mahsulotlar{' '}
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
                                width={25}
                                height={25}
                            />
                            <Link href={item.link}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.dropBox}>
                <p className={styles.dropLabel}>
                    Buyurtma berish{' '}
                    <Image
                        src="/static/svg/arrowdown.svg"
                        alt="arrow"
                        width={15}
                        height={8}
                    />
                </p>
                <ul className={styles.dropSubBox}>
                    {options.tempates.map(item => (
                        <li className={styles.dropSubBoxItem}>
                            <img
                                src={item.icon}
                                alt="direction"
                                style={{
                                    color: '#534534',
                                    width: '25px',
                                    height: '25px',
                                }}
                            />
                            <Link href={item.link}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HeaderCatergories;
