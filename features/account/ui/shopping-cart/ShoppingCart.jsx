import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/shared/ui/breadcrumb';
import SidebarLayout from '~/widgets/sidebar/SidebarLayout';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Skeleton } from 'antd';
import useCart from '~/shared/hooks/useCart';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { calculateAmount } from '~/shared/utilities/ecomerce-helpers';
import ProductRepository from '~/repositories/ProductRepository';
import {
    fileReactIcons,
    fileColors,
} from '~/features/product-details/ui/actions/file-actions';
import { IoIosClose } from 'react-icons/io';
import styles from './shopping-cart.module.scss';
import { cn } from '~/shared/utilities/cn';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa6';
import Icon from '~/shared/ui/Icon';
import { useCountTimeBack } from '~/shared/hooks/useCountDown';
import { useMounted } from '~/shared/hooks/useMounted';
import { FaClock } from 'react-icons/fa';

const breadCrumb = [
    {
        text: 'Asosiy sahifa',
        url: '/',
    },
    {
        text: 'Savat',
    },
];

function ShoppingCart() {
    const state = useSelector((state) => state.auth.user);
    const { cartDataItems, playlistCartDataItems, status } = useSelector(
        (state) => state.ecomerce
    );
    const { removeCartOneItem, removePlaylistCartOneItem } = useCart();
    const [taxPercentage, setTaxPercentage] = useState(0.1); // Default 10%
    const [promotion, setPromotion] = useState({
        discount_percent: 0,
        expires_at: null,
    });
    const isMounted = useMounted();
    const timeLeft = useCountTimeBack(promotion.expires_at);

    // Combine items for calculations
    const allItems = [
        ...(cartDataItems || []).map((item) => ({ ...item, cartType: 'product' })),
        ...(playlistCartDataItems || []).map((item) => ({
            ...item,
            cartType: 'playlist',
        })),
    ];

    const hasItems = allItems.length > 0;
    const isLoading = status === 'loading';

    useEffect(() => {
        async function fetchData() {
            try {
                const [taxResponse, promoResponse] = await Promise.all([
                    ProductRepository.getOrderPercentage(),
                    ProductRepository.getActivePromotion(),
                ]);

                if (taxResponse?.data?.percentage) {
                    setTaxPercentage(taxResponse.data.percentage);
                }
                if (promoResponse) {
                    setPromotion(promoResponse);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchData();
    }, []);

    // Calculate totals
    const subtotal = hasItems ? calculateAmount(allItems) : 0;
    const discountAmount = Math.floor(
        subtotal * (promotion.discount_percent / 100)
    );
    const amountAfterDiscount = subtotal - discountAmount;
    const tax = Math.floor(amountAfterDiscount * taxPercentage);
    const totalWithTax = amountAfterDiscount + tax;
    const total = totalWithTax;

    const handleRemoveItem = (e, item) => {
        e.preventDefault();
        if (item.cartType === 'playlist') {
            removePlaylistCartOneItem(item.id);
        } else {
            removeCartOneItem(item.id);
        }
    };

    let contentView;
    if (isLoading) {
        contentView = (
            <div className={styles.shoppingCartContent}>
                <h2 className={styles.pageTitle}>Mahsulotlar ({allItems.length})</h2>
                <div className={styles.productsList}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton.Button
                            key={index}
                            active
                            style={{
                                width: '100%',
                                height: '150px',
                                marginBottom: '16px',
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    } else if (hasItems) {
        const isExpiring =
            promotion.expires_at &&
            (timeLeft.minutes > 0 || timeLeft.seconds > 0);

        contentView = (
            <div className={styles.shoppingCartContent}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className={styles.pageTitle} style={{ margin: 0 }}>
                        Mahsulotlar ({allItems.length})
                    </h2>
                    {isMounted && promotion.discount_percent > 0 && (
                        <div
                            className={cn(
                                'px-3 py-2 rounded-lg d-flex align-items-center bg-success text-white',
                                styles.promoBadge
                            )}>
                            <div className="mr-2">
                                <strong
                                    className="d-block"
                                    style={{ fontSize: '14px', lineHeight: 1.2 }}>
                                    {promotion.discount_percent}% CHEGIRMA!
                                </strong>
                                <span style={{ fontSize: '11px' }}>
                                    {promotion.expires_at
                                        ? 'Vaqt tugashiga oz qoldi'
                                        : 'Doimiy mijoz chegirmasi'}
                                </span>
                            </div>
                            {isExpiring && (
                                <div
                                    className="ml-2 pl-2 border-left d-flex align-items-center font-bold"
                                    style={{ fontSize: '16px' }}>
                                    <FaClock className="mr-1" size={12} />
                                    {String(timeLeft.minutes).padStart(2, '0')}:
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className={styles.productsList}>
                    {allItems.map((item) => (
                        <div
                            key={`${item.cartType}-${item.id}`}
                            className={styles.productCard}>
                            <div className={styles.productThumbnail}>
                                <Link
                                    href={
                                        item.cartType === 'playlist'
                                            ? `/video-lessons/playlists/${item.slug || item.id}`
                                            : `/product/${item.slug || item.id}`
                                    }>
                                    <a>
                                        <div className={styles.imageWrapper}>
                                            <Image
                                                src={item.poster_url || item.image}
                                                alt={item.title}
                                                width={120}
                                                height={120}
                                                className={styles.productImage}
                                                style={{
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            {item.cartType === 'product' && (
                                                <div
                                                    className={styles.fileTypeBadge}
                                                    style={{
                                                        backgroundColor:
                                                            fileColors[item.file_type] ||
                                                            '#E22C2F',
                                                    }}>
                                                    <Icon
                                                        icon={
                                                            fileReactIcons[
                                                                item.file_type
                                                            ]
                                                        }
                                                    />
                                                    <span>{item.file_type}</span>
                                                </div>
                                            )}
                                            {item.cartType === 'playlist' && (
                                                <div
                                                    className={styles.fileTypeBadge}
                                                    style={{
                                                        backgroundColor: '#2ecc71',
                                                    }}>
                                                    <Icon
                                                        icon={fileReactIcons['VIDEO']}
                                                    />
                                                    <span>PLAYLIST</span>
                                                </div>
                                            )}
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className={styles.productInfo}>
                                <Link
                                    href={
                                        item.cartType === 'playlist'
                                            ? `/video-lessons/playlists/${item.slug}`
                                            : `/product/${item.slug}`
                                    }>
                                    <a className={styles.productTitle}>
                                        {item.title}
                                        {item.cartType === 'playlist' && (
                                            <span
                                                style={{
                                                    fontSize: '12px',
                                                    color: '#2ecc71',
                                                    marginLeft: '8px',
                                                    fontWeight: 'normal',
                                                }}>
                                                (Kurs)
                                            </span>
                                        )}
                                    </a>
                                </Link>
                                <div className={styles.productPrice}>
                                    {item.discount_price ? (
                                        `${addPeriodToThousands(item.discount_price)}
                                    so'm`
                                    ) : item.price ? (
                                        `${addPeriodToThousands(item.price)} so'm`
                                    ) : (
                                        <p
                                            className="free-product-text"
                                            style={{ width: 'fit-content' }}>
                                            Bepul
                                        </p>
                                    )}

                                    {item.discount ? (
                                        <sup>
                                            <del
                                                className={cn(
                                                    'text-gray-400',
                                                    'text-xs',
                                                    'md:text-sm',
                                                    'ml-2'
                                                )}>
                                                {addPeriodToThousands(item.price)} so'm
                                            </del>
                                        </sup>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.productActions}>
                                <Button
                                    type="default"
                                    danger
                                    icon={<IoIosClose fontSize={30} />}
                                    onClick={(e) => handleRemoveItem(e, item)}
                                    className={styles.deleteButton}
                                    aria-label="O'chirish"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.stickyBottomCard}>
                    <div className={styles.summaryContent}>
                        <div className={styles.summaryDetails}>
                            <span className={styles.summaryItem}>
                                Jami mahsulotlar:{' '}
                                <strong>{allItems.length} ta</strong>
                            </span>
                            <span className={styles.summaryItem}>
                                Oraliq summa:{' '}
                                <strong>
                                    {addPeriodToThousands(subtotal)} so'm
                                </strong>
                            </span>
                            {promotion.discount_percent > 0 && (
                                <span className={cn(styles.summaryItem, 'text-success')}>
                                    Chegirma (-{promotion.discount_percent}%):{' '}
                                    <strong className="text-success">
                                        -{addPeriodToThousands(discountAmount)} so'm
                                    </strong>
                                </span>
                            )}
                            <span className={styles.summaryItem}>
                                Xizmat haqi ({Math.round(taxPercentage * 100)}%):{' '}
                                <strong>{addPeriodToThousands(tax)} so'm</strong>
                            </span>
                            <span className={styles.summaryItem}>
                                Jami to'lov:{' '}
                                <strong className={styles.totalAmount}>
                                    {addPeriodToThousands(total)} so'm
                                </strong>
                            </span>
                        </div>
                        <div className={styles.checkoutButtonWrapper}>
                            <div className={styles.paymentSummaryAmount}>
                                {promotion.discount_percent > 0 && (
                                    <div className="d-flex flex-column align-items-end mr-3">
                                        <del className="text-muted" style={{ fontSize: '11px' }}>
                                            {addPeriodToThousands(
                                                subtotal + Math.floor(subtotal * taxPercentage)
                                            )} so'm
                                        </del>
                                        <span className="text-success" style={{ fontSize: '11px', marginTop: '-4px' }}>
                                            Xarid chegirmasi
                                        </span>
                                    </div>
                                )}
                                <div>
                                    Jami:
                                    <strong className={styles.totalAmount}>
                                        {addPeriodToThousands(total)} so'm
                                    </strong>
                                </div>
                            </div>
                            {state !== null ? (
                                <Link href="/account/checkout">
                                    <a>
                                        <Button
                                            type="primary"
                                            size="large"
                                            className={styles.checkoutButton}>
                                            To'lovga o'tish
                                        </Button>
                                    </a>
                                </Link>
                            ) : (
                                <Link href="/auth/login?returnUrl=/account/checkout">
                                    <a>
                                        <Button
                                            type="primary"
                                            size="large"
                                            className={styles.checkoutButton}>
                                            To'lovga o'tish
                                        </Button>
                                    </a>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        contentView = (
            <div className="ps-section__content w-100 h-100">
                <div
                    style={{ height: '100%' }}
                    className="d-flex justify-content-center flex-column align-items-center">
                    <div
                        style={{
                            borderRadius: '50%',
                            background: '#7575751c',
                            width: '130px',
                            height: '130px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}>
                        <FaBoxOpen
                            style={{
                                color: '#00a44f',
                                fontSize: '70px',
                            }}
                        />
                    </div>
                    <h3
                        style={{ fontSize: '30px' }}
                        className="font-bold mb-2 text-gray-800 text-center">
                        Savat bo'sh
                    </h3>
                    <p className="mb-4 text-center text-muted">
                        To'lov qilish uchun biror mahsulot qo'shing.
                    </p>
                    <Link href={'/scientific-resources/all'}>
                        <a>
                            <Button type="primary" size="large">
                                <FaArrowLeft />
                                Xarid qilishni boshlash
                            </Button>
                        </a>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <BreadCrumb breacrumb={breadCrumb} />
            <div className={styles.shoppingCartWrapper}>
                <h1 className="page-title">Savat</h1>
                <SidebarLayout>{contentView}</SidebarLayout>
            </div>
        </>
    );
}

export default ShoppingCart;
