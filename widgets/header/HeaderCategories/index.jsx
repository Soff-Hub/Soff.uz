import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import useResponsive from '~/shared/utilities/useResponsive';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Badge, Button, Empty } from 'antd';
import Link from 'next/link';
import useOrdersStatus from '~/features/freelancers/myorders/myorder/api/useOrderStatus';
import { IoSearch } from 'react-icons/io5';
import SearchModal from '~/shared/components/modals/search-modal/SearchModal';
import { useTranslation } from 'next-i18next';

const getProducts = (t) => [
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
                className={`ms-3 ${styles.dropLabel}`}
                href="/scientific-resources/all?slug=all">
                {t('scientificWorks')}
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a
                className={`ms-3 ${styles.dropLabel}`}
                href="/3d-models-and-interior-designs/all?slug=all">
                {t('design3D')}
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
                className={`ms-3 ${styles.dropLabel}`}
                href="/design-developments/all?slug=all">
                {t('designTemplates')}
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
                className={`ms-2 ${styles.dropLabel}`}
                href="/templates/all?slug=all">
                {t('templatesForVariousFields')}
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
                className={`ms-3 ${styles.dropLabel}`}
                href="/video-lessons/all?slug=all">
                {t('videoLessons')}
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
                className={`ms-3 ${styles.dropLabel}`}
                href="/websites/all?slug=all">
                {t('programmingServices')}
            </a>
        ),
    },
];

export const EmptyTab = ({ description }) => {
    return (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{
                height: '35vh',
                display: 'flex',
                background: '#fafafa',
                borderRadius: '8px',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 0,
            }}
            description={description}
        />
    );
};

const HeaderCatergories = () => {
    const { isMobile, size } = useResponsive();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { push, query, replace, pathname } = useRouter();
    const { data } = useOrdersStatus();
    const { t } = useTranslation('header');

    const totalOrders = data
        ? (data.pending || 0) + (data.requirement_process || 0)
        : 0;

    const products = getProducts(t);

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
            {size > 1025 && pathname !== '/' && <HeaderSearch />}
            {isLoggedIn && !isMobile && (
                <Link href="/order/my-orders">
                    <a>
                        <Badge
                            count={totalOrders}
                            className={`${styles.navLink}`}
                            size={isMobile ? 'small' : 'default'}
                            dot={isMobile ? totalOrders > 0 : false}
                            overflowCount={9}
                            offset={isMobile ? [0, 0] : [2, -3]}>
                            {t('myOrders')}
                        </Badge>
                    </a>
                </Link>
            )}
            <div className={styles.dropBox}>
                <Dropdown menu={{ items: products }}>
                    <Space className={styles.dropLabel}>
                        {t('products')}
                        <DownOutlined />
                    </Space>
                </Dropdown>
            </div>

            <div className={`${styles.orderBox} `}>
                <Link href="/order/create">
                    <a className={styles.dropLabel}>{t('createOrder')}</a>
                </Link>
            </div>
        </div>
    );
};

export const HeaderSearch = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const { t } = useTranslation('header');

    const onClose = () => {
        setOpenSearch(false);
    };

    useEffect(() => {
        const handleOnKeydown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpenSearch((prev) => !prev);
            }
        };
        window.addEventListener('keydown', handleOnKeydown);
        return () => {
            window.removeEventListener('keydown', handleOnKeydown);
        };
    }, [openSearch]);

    return (
        <div
            style={{
                marginInline: 'auto',
                width: '100%',
                maxWidth: '300px',
            }}>
            <Button
                icon={<IoSearch fontSize={18} />}
                onClick={() => setOpenSearch(true)}
                style={{
                    padding: '10px',
                    paddingInline: '12px',
                    marginRight: '15px',
                    width: '90%',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <span
                    style={{
                        flex: 1,
                        textAlign: 'left',
                    }}>
                    {t('searchPlaceholder')}
                </span>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 164, 79, 0.15)', // bg-white/50
                        borderRadius: '0.375rem', // rounded-md
                        padding: '0.25rem 0.5rem', // py-1 px-2
                        gap: '0.25rem', // gap-1
                        fontWeight: '700', // font-bold
                        fontSize: '14px', // text-xs
                        whiteSpace: 'nowrap', // whitespace-nowrap
                        color: 'currentColor',
                    }}>
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 14c-2.206 0-4 1.794-4 4s1.794 4 4 4a4.003 4.003 0 0 0 3.998-3.98H10V16h4v2.039h.004A4.002 4.002 0 0 0 18 22c2.206 0 4-1.794 4-4s-1.794-4-4-4h-2v-4h2c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4v2h-4V5.98h-.002A4.003 4.003 0 0 0 6 2C3.794 2 2 3.794 2 6s1.794 4 4 4h2v4H6zm2 4c0 1.122-.879 2-2 2s-2-.878-2-2 .879-2 2-2h2v2zm10-2c1.121 0 2 .878 2 2s-.879 2-2 2-2-.878-2-2v-2h2zM16 6c0-1.122.879-2 2-2s2 .878 2 2-.879 2-2 2h-2V6zM6 8c-1.121 0-2-.878-2-2s.879-2 2-2 2 .878 2 2v2H6zm4 2h4v4h-4v-4z"></path>
                    </svg>
                    <span>+ K</span>
                </div>
            </Button>
            <SearchModal open={openSearch} onClose={onClose} />
        </div>
    );
};

export default HeaderCatergories;
