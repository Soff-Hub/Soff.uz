import React, { useEffect, useMemo } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import useResponsive from '~/shared/utilities/useResponsive';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Badge } from 'antd';
import Link from 'next/link';
import useOrdersStatus from '~/components/freeleance/myorders/myorder/api/useOrderStatus';

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

const templateIcons = {
    scientific_work: (
        <Image
            src={'/static/svg/book-saved.svg'}
            alt=""
            width={20}
            height={20}
        />
    ),
    dizayn: (
        <Image src={'/static/svg/image.svg'} alt="" width={20} height={20} />
    ),
    web: (
        <Image src={'/static/svg/monitor.svg'} alt="" width={20} height={20} />
    ),
    three_d: (
        <Image src={'/static/svg/3dcube.svg'} alt="" width={20} height={20} />
    ),
    marketing: (
        <Image
            src={'/static/img/icons/megaphone.png'}
            alt=""
            width={20}
            height={20}
        />
    ),
    seo_traffic: (
        <Image
            src={'/static/img/icons/seo.png'}
            alt=""
            width={20}
            height={20}
        />
    ),
    audio_video: (
        <Image
            src={'/static/img/icons/soundtrack.png'}
            alt=""
            width={20}
            height={20}
        />
    ),
    business: (
        <Image
            src={'/static/img/icons/briefcase.png'}
            alt=""
            width={20}
            height={20}
        />
    ),
    not_found: (
        <Image
            src={'/static/svg/not-found.svg'}
            alt=""
            width={20}
            height={20}
        />
    ),
};

const HeaderCatergories = () => {
    const { isMobile } = useResponsive();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { directions } = useSelector((state) => state.profile);
    [...directions, { label: 'Boshqa', value: 'other' }];
    const { push, query, replace, pathname } = useRouter();
    const { data } = useOrdersStatus();

    const totalOrders = data
        ? (data.pending || 0) + (data.requirement_process || 0)
        : 0;

    const handleOrder = () => {
        if (isLoggedIn) {
            push('/order/create');
        } else {
            push('/auth/login?returnUrl=%2Forder%2Fcreate');
        }
    };

    const templates = useMemo(
        () => [
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
                        onClick={(e) => e.preventDefault()}
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
            ...directions.map((dir) => ({
                key: dir.value,
                icon: templateIcons[dir.value]
                    ? templateIcons[dir.value]
                    : templateIcons['not_found'],
                label: (
                    <a
                        className={`ml-3 ${styles.dropLabel}`}
                        href={`/orders?direction=${dir.value}`}>
                        {dir.label}
                    </a>
                ),
            })),
        ],
        [directions]
    );

    useEffect(() => {
        if (query?.modal === 'open' && isLoggedIn) {
            push('/order/create');
            const newQuery = { ...query };
            replace({ pathname: pathname, query: newQuery }, undefined, {
                shallow: true,
            });
        }
    }, [query.modal]);

    return (
        <div className={styles.dropBlock}>
            {!isMobile && isLoggedIn && (
                <Link href="/order/my-orders">
                    <Badge
                        count={totalOrders}
                        overflowCount={9}
                        offset={[-10, 0]}>
                        <Link href={'/order/my-orders'} target="_blank">
                            <p className={`${styles.navLink} my-0`}>
                                Buyurtmalarim
                            </p>
                        </Link>
                    </Badge>
                </Link>
            )}
            <div className={styles.dropBox}>
                <Dropdown menu={{ items: products }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space className={styles.dropLabel}>
                            Mahsulotlar
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
            <div className={`${styles.orderBox} ${styles.dropBox}`}>
                <Dropdown menu={{ items: templates }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space className={styles.dropLabel}>
                            Buyurtma berish
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
    );
};

export default HeaderCatergories;
