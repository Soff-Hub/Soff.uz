import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import useResponsive from '~/shared/utilities/useResponsive';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';
import {
    Dropdown,
    Space,
    Badge,
    Button,
    Modal,
    Select,
    Input,
    Skeleton,
    Empty,
} from 'antd';
import Link from 'next/link';
import useOrdersStatus from '~/components/freeleance/myorders/myorder/api/useOrderStatus';
import { IoSearch } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/repositories/api';
import useDebounce from '~/shared/hooks/useDebounce';
import axiosInstance from '~/shared/api/freeleanceApi';
import searchStyle from '../navbar-search/style.module.scss';
import { FiExternalLink } from 'react-icons/fi';
import { GrBook } from 'react-icons/gr';
import { directionsImg } from '~/shared/constants/directions-img';

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
                className={`ms-3 ${styles.dropLabel}`}
                href="/scientific-resources/all?slug=all">
                Ilmiy ishlar
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a
                className={`ms-3 ${styles.dropLabel}`}
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
                className={`ms-3 ${styles.dropLabel}`}
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
                className={`ms-2 ${styles.dropLabel}`}
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
                className={`ms-3 ${styles.dropLabel}`}
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
                className={`ms-3 ${styles.dropLabel}`}
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
    const { isLoggedIn } = useSelector(state => state.auth);
    const { directions } = useSelector(state => state.profile);
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
                    <Link href="/order/create">
                        <a className={` ${styles.dropLabel}  `}>
                            Maxsus buyurtma berish
                        </a>
                    </Link>
                ),
                onClick: handleOrder,
                style: {
                    borderBottom: '1px solid rgba(0,0,0,0.2)',
                    borderRadius: '0px',
                },
            },
            ...directions.map(dir => ({
                key: dir.value,
                icon: directionsImg[dir.value]
                    ? directionsImg[dir.value]
                    : directionsImg['not_found'],
                label: (
                    <Link href={`/orders?direction=${dir.value}`}>
                        <a className={`${styles.dropLabel}`}>{dir.label}</a>
                    </Link>
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
                            offset={isMobile ? [0, 0] : [6, -5]}>
                            Buyurtmalarim
                        </Badge>
                    </a>
                </Link>
            )}
            <div className={styles.dropBox}>
                <Dropdown menu={{ items: products }}>
                    <Space className={styles.dropLabel}>
                        Mahsulotlar
                        <DownOutlined />
                    </Space>
                </Dropdown>
            </div>
            <div className={`${styles.orderBox} ${styles.dropBox}`}>
                <Link href="/order/create">
                    <a className={styles.dropLabel}>Buyurtma berish</a>
                </Link>
                {/* <Dropdown menu={{ items: templates }}>
                    <Space className={styles.dropLabel}>
                        Buyurtma berish
                        <DownOutlined />
                    </Space>
                </Dropdown> */}
            </div>
        </div>
    );
};

const HeaderSearch = () => {
    const { push } = useRouter();
    const [type, setType] = useState('mahsulotlar');
    const [freezeSearch, setFreezeSearch] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef(null);
    const axios = axiosInstance();

    const debounceSearch = useDebounce(search, 500);

    const { data, isSuccess, isFetching: isDataLoading } = useQuery({
        queryKey: ['searchResults', debounceSearch, type],
        queryFn: async () => {
            const { data } = await api.get(
                `doc-search/?search=${debounceSearch}`
            );
            return data;
        },
        enabled: type === 'mahsulotlar' && !freezeSearch,
        retry: 1,
    });

    const {
        data: freelanceData,
        isSuccess: freelanceSuccess,
        isFetching: isFreelanceDataLoading,
    } = useQuery({
        queryKey: ['freelanceData', debounceSearch, type],
        queryFn: async () => {
            const { data } = await axios.get(
                `customer/search-page?search=${debounceSearch}`
            );
            return data;
        },
        enabled: type !== 'mahsulotlar' && !freezeSearch,
        retry: 1,
    });

    const isLoading = isDataLoading || isFreelanceDataLoading;

    const searchOptions = options => {
        return options?.filter(option => {
            // Ensure option is a string before applying string methods
            if (typeof option !== 'string' || !option) return false;
            return option
                .toLowerCase()
                .trim()
                .includes(debounceSearch.toLowerCase().trim());
        });
    };

    const filteredOptions = useMemo(() => {
        if (type === 'mahsulotlar') {
            return isSuccess ? searchOptions(data) : [];
        } else if (type === 'mutaxasislar') {
            return freelanceSuccess
                ? searchOptions(freelanceData?.position)
                : [];
        } else if (type === 'xizmatlar') {
            return freelanceSuccess
                ? searchOptions(freelanceData?.services)
                : [];
        }
    }, [type, isSuccess, freelanceSuccess, data, freelanceData]);

    const handleSearch = () => {
        if (!search) return;
        setFreezeSearch(true);
        if (type === 'mahsulotlar') {
            push(`/search-page/?keyword=${search}&tab=1&type=file`);
        } else if (type === 'xizmatlar') {
            push(`/search-page/?keyword=${search}&tab=2&type=all`);
        } else if (type === 'mutaxasislar') {
            push(`/search-page/?keyword=${search}&tab=3&type=all`);
        }
    };

    useEffect(() => {
        if (openSearch && searchRef.current) {
            searchRef.current.focus();
        }
        const handleOnKeydown = e => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpenSearch(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleOnKeydown);
        return () => {
            window.removeEventListener('keydown', handleOnKeydown);
            setFreezeSearch(false);
        };
    }, [openSearch]);

    let filteredDataOptions = null;
    if (isLoading) {
        filteredDataOptions = Array(10)
            .fill(null)
            .map((_, i) => (
                <Skeleton
                    key={i}
                    active
                    className="Search_Results_Wrap_skeleton"
                    style={{
                        width: '100% !important',
                        padding: '10px 10px 10px 0',
                    }}
                />
            ));
    } else if (filteredOptions.length) {
        filteredDataOptions = filteredOptions.map((option, index) => (
            <Link
                key={index}
                href={
                    type === 'mahsulotlar'
                        ? `/search-page/?keyword=${option}&tab=1&type=file`
                        : type === 'xizmatlar'
                        ? `/search-page/?keyword=${option}&tab=2&type=all`
                        : `/search-page/?keyword=${option}&tab=3&type=all`
                }>
                <a>
                    <div key={index} className={searchStyle.searchOption}>
                        {option}
                        {/* <FiExternalLink /> */}
                    </div>
                </a>
            </Link>
        ));
    } else {
        filteredDataOptions = (
            <EmptyTab description="So'rov bo'yicha ma'lumotlar topilmadi" />
        );
    }

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
                    Qidiruv...
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
            <Modal
                title={'Qidiruv'}
                open={openSearch}
                width={560}
                footer={null}
                onCancel={() => setOpenSearch(false)}>
                <div>
                    <div
                        className={searchStyle.searchBox}
                        style={{
                            boxShadow: isSearchFocused
                                ? '0 0 0 2px rgba(0, 164, 79, 0.5)'
                                : 'none',
                        }}>
                        <div className="d-flex w-100">
                            <Select
                                value={type}
                                onChange={val => setType(val)}
                                className={searchStyle.select}
                                bordered={false}>
                                <Option value="mahsulotlar">Mahsulotlar</Option>
                                <Option value="xizmatlar">Xizmatlar</Option>
                                <Option value="mutaxasislar">
                                    Mutaxassislar
                                </Option>
                            </Select>

                            <Input
                                ref={searchRef}
                                className={searchStyle.input}
                                placeholder={'izlash...'}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onPressEnter={handleSearch}
                                bordered={false}
                            />
                        </div>

                        <span
                            className={searchStyle.searchIcon}
                            onClick={handleSearch}>
                            <IoSearch />
                        </span>
                    </div>
                    <div
                        style={{
                            marginTop: '10px',
                            maxHeight: '300px',
                            overflowY: 'auto',
                        }}>
                        {filteredDataOptions}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default HeaderCatergories;
