import React from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import useResponsive from '~/utilities/useResponsive';

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
            label: 'Veb saytlar',
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
            label: 'Veb saytlar',
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
    return (
        <div className={styles.dropBlock}>
            <div>
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
                                    width={25}
                                    height={25}
                                />
                                <Link href={item.link}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {!isMobile && (
                <div className={styles.dropBox}>
                    <p className={styles.dropLabel}>
                        <span className="flex-fill">Buyurtma berish</span>{' '}
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
            )}
        </div>
    );
};

export default HeaderCatergories;
