import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import useResponsive from '~/shared/utilities/useResponsive';
import CreateOrderModal from '~/shared/components/modals/CreateOrderModal';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Link from 'next/link';

const products = [
    {
        key: '1',
        icon: (
            <Image
                src={'/static/svg/book-saved.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
        label: (
            <a
                className={`ml-3 ${styles.dropLabel}`}
                href="/scientific-resources/all?slug=all">
                Ilmiy ishlar
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a
                className={`ml-3 ${styles.dropLabel}`}
                href="/3d-models-and-interior-designs/all?slug=all">
                3D Dizayn va Vizualizatsiya
            </a>
        ),
        icon: (
            <Image
                src={'/static/svg/3dcube.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
    },
    {
        key: '3',
        label: (
            <a
                className={`ml-3 ${styles.dropLabel}`}
                href="/design-developments/all?slug=all">
                Dizayn shablonlari
            </a>
        ),
        icon: (
            <Image
                src={'/static/svg/image.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
    },
    {
        key: '4',
        icon: (
            <Image
                src={'/static/svg/chart.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
        label: (
            <a
                className={`ml-2 ${styles.dropLabel}`}
                href="/templates/all?slug=all">
                Turli sohalar uchun shablonlar
            </a>
        ),
    },
    {
        key: '5',
        icon: (
            <Image
                src={'/static/svg/video-square.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
        label: (
            <a
                className={`ml-3 ${styles.dropLabel}`}
                href="/video-lessons/all?slug=all">
                Video darsliklar
            </a>
        ),
    },
    {
        key: '6',
        icon: (
            <Image
                src={'/static/svg/monitor.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
        label: (
            <a
                className={`ml-3 ${styles.dropLabel}`}
                href="/websites/all?slug=all">
                Dasturlash xizmatlari
            </a>
        ),
    },
];

const templates = handleOrder => [
    {
        key: '1',
        icon: (
            <i
                style={{ fontSize: '20px', color: 'rgba(0,0,0,0.6)' }}
                className="fa-solid fa-plus"></i>
        ),
        label: (
            <a
                href="/order/create"
                onClick={e => e.preventDefault()}
                className={` ${styles.dropLabel}  `}>
                Maxsus buyurtma berish
            </a>
        ),
        onClick: handleOrder,
        style: {
            borderBottom: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '0px',
        },
    },
    {
        key: '2',
        icon: (
            <Image
                src={'/static/svg/book-saved.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
        label: (
            <a
                className={`ml-3 ${styles.dropLabel}`}
                href="/orders?direction=scientific_work">
                Ilmiy va Akademik Xizmatlar
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a
                className={`ml-3 ${styles.dropLabel}`}
                href="/orders?direction=dizayn">
                Dizayn va shablonlar
            </a>
        ),
        icon: (
            <Image
                src={'/static/svg/image.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
    },
    {
        key: '4',
        icon: (
            <Image
                src={'/static/svg/monitor.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
        label: (
            <a
                className={`ml-3 ${styles.dropLabel}`}
                href="/orders?direction=web">
                Dasturlash xizmatlari
            </a>
        ),
    },
    {
        key: '5',
        label: (
            <a
                className={`ml-3 ${styles.dropLabel}`}
                href="/orders?direction=three_d">
                3D Dizayn va Vizualizatsiya
            </a>
        ),
        icon: (
            <Image
                src={'/static/svg/3dcube.svg'}
                alt=""
                width={20}
                height={20}
            />
        ),
    },
    {
        key: '6',
        label: (
            <a
                className={` ${styles.dropLabel}`}
                href="/orders?direction=marketing">
                Marketing va SMM
            </a>
        ),
        icon: (
            <i
                style={{ fontSize: '18px', color: 'rgba(0,0,0,0.4)' }}
                className="fa-solid fa-people-arrows"></i>
        ),
    },
    {
        key: '7',
        label: (
            <a
                className={`ml-1 ${styles.dropLabel}`}
                href="/orders?direction=seo_traffic">
                SEO va Veb trafik
            </a>
        ),
        icon: (
            <i
                style={{ fontSize: '20px', color: 'rgba(0,0,0,0.4)' }}
                className="fa-solid fa-globe"></i>
        ),
    },
    {
        key: '8',
        label: (
            <a
                className={`ml-2 ${styles.dropLabel}`}
                href="/orders?direction=audio_video">
                Audio va Video
            </a>
        ),
        icon: (
            <i
                style={{
                    marginLeft: '3px',
                    fontSize: '18px',
                    color: 'rgba(0,0,0,0.4)',
                }}
                className="fa-solid fa-play"></i>
        ),
    },
    {
        key: '9',
        label: (
            <a
                className={`ml-1 ${styles.dropLabel}`}
                href="/orders?direction=business">
                Biznes
            </a>
        ),
        icon: (
            <i
                style={{ fontSize: '18px', color: 'rgba(0,0,0,0.4)' }}
                className="fa-solid fa-briefcase"></i>
        ),
    },
];

const HeaderCatergories = () => {
    const { isMobile } = useResponsive();
    const [open, setOpen] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { push, query, replace, pathname } = useRouter();

    const handleOrder = () => {
        if (isLoggedIn) {
            // push('/order/create');
            setOpen(true);
        } else {
            push('/auth/login');
        }
    };

    useEffect(() => {
        if (query?.modal === 'open' && isLoggedIn) {
            setOpen(true);
            const newQuery = { ...query };
            delete newQuery.modal;
            replace({ pathname: pathname, query: newQuery }, undefined, {
                shallow: true,
            });
        }
    }, [query.modal]);

    return (
        <div className={styles.dropBlock}>
            {!isMobile && isLoggedIn && (
                <Link href={'/order/my-orders'} target="_blank">
                    <p className={`${styles.navLink} my-0`}>Buyurtmalarim</p>
                </Link>
            )}
            <div className={styles.dropBox}>
                <Dropdown menu={{ items: products }}>
                    <a onClick={e => e.preventDefault()}>
                        <Space className={styles.dropLabel}>
                            Mahsulotlar
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
            <div className={`${styles.orderBox} ${styles.dropBox}`}>
                <Dropdown menu={{ items: templates(handleOrder) }}>
                    <a onClick={e => e.preventDefault()}>
                        <Space className={styles.dropLabel}>
                            Buyurtma berish
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
            <CreateOrderModal open={open} onClose={() => setOpen(false)} />
        </div>
    );
};

export default HeaderCatergories;
