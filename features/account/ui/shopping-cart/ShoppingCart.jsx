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
import { useTranslation } from 'next-i18next';

function ShoppingCart() {
    const { t } = useTranslation('account');
    const state = useSelector((state) => state.auth.user);
    const { cartDataItems, status } = useSelector((state) => state.ecomerce);
    const { removeCartOneItem } = useCart();
    const [taxPercentage, setTaxPercentage] = useState(0.1); // Default 10%
    const hasItems = cartDataItems && cartDataItems.length;
    const isLoading = status === 'loading';

    const breadCrumb = [
        {
            text: t('breadcrumbs.home'),
            url: '/',
        },
        {
            text: t('breadcrumbs.cart'),
        },
    ];

    useEffect(() => {
        async function getTaxPercentage() {
            try {
                const responseData =
                    await ProductRepository.getOrderPercentage();
                if (responseData?.data?.percentage) {
                    setTaxPercentage(responseData.data.percentage);
                }
            } catch (error) {
                // Use default 12% if API fails
                console.error('Failed to fetch tax percentage:', error);
            }
        }
        getTaxPercentage();
    }, []);

    // Calculate totals
    const subtotal = hasItems ? calculateAmount(cartDataItems) : 0;
    const tax = Math.floor(subtotal * taxPercentage);
    const total = subtotal + tax;

    const handleRemoveItem = (e, item) => {
        e.preventDefault();
        removeCartOneItem(item.id);
    };

    let contentView;
    if (isLoading) {
        contentView = (
            <div className={styles.shoppingCartContent}>
                <h2 className={styles.pageTitle}>
                    {t('shoppingCart.count', { count: cartDataItems.length })}
                </h2>
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
        contentView = (
            <div className={styles.shoppingCartContent}>
                <h2 className={styles.pageTitle}>
                    {t('shoppingCart.count', { count: cartDataItems.length })}
                </h2>
                <div className={styles.productsList}>
                    {cartDataItems.map((item) => (
                        <div key={item.id} className={styles.productCard}>
                            <div className={styles.productThumbnail}>
                                <Link href={`/product/${item.slug}`}>
                                    <a>
                                        <div className={styles.imageWrapper}>
                                            <Image
                                                src={item.poster_url}
                                                alt={item.title}
                                                width={120}
                                                height={120}
                                                className={styles.productImage}
                                                style={{
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <div
                                                className={styles.fileTypeBadge}
                                                style={{
                                                    backgroundColor:
                                                        fileColors[
                                                            item.file_type
                                                        ] || '#E22C2F',
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
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className={styles.productInfo}>
                                <Link href={`/product/${item.slug}`}>
                                    <a className={styles.productTitle}>
                                        {item.title}
                                    </a>
                                </Link>
                                <div className={styles.productPrice}>
                                    {item.discount_price ? (
                                        `${addPeriodToThousands(
                                            item.discount_price
                                        )} ${t('shoppingCart.currency')}`
                                    ) : (
                                        <p
                                            className="free-product-text"
                                            style={{ width: 'fit-content' }}>
                                            {t('shoppingCart.free')}
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
                                                {addPeriodToThousands(
                                                    item.price
                                                )}{' '}
                                                {t('shoppingCart.currency')}
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
                                    aria-label={t('shoppingCart.delete')}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.stickyBottomCard}>
                    <div className={styles.summaryContent}>
                        <div className={styles.summaryDetails}>
                            <span className={styles.summaryItem}>
                                {t('shoppingCart.totalItems')}{' '}
                                <strong>
                                    {cartDataItems.length}{' '}
                                    {t('shoppingCart.items')}
                                </strong>
                            </span>
                            <span className={styles.summaryItem}>
                                {t('shoppingCart.subtotal')}{' '}
                                <strong>
                                    {addPeriodToThousands(subtotal)}{' '}
                                    {t('shoppingCart.currency')}
                                </strong>
                            </span>
                            <span className={styles.summaryItem}>
                                {t('shoppingCart.serviceFee', {
                                    percentage: Math.round(taxPercentage * 100),
                                })}{' '}
                                <strong>
                                    {addPeriodToThousands(tax)}{' '}
                                    {t('shoppingCart.currency')}
                                </strong>
                            </span>
                            <span className={styles.summaryItem}>
                                {t('shoppingCart.total')}{' '}
                                <strong className={styles.totalAmount}>
                                    {addPeriodToThousands(total)}{' '}
                                    {t('shoppingCart.currency')}
                                </strong>
                            </span>
                        </div>
                        <div className={styles.checkoutButtonWrapper}>
                            <div className={styles.paymentSummaryAmount}>
                                {t('shoppingCart.total')}:
                                <strong className={styles.totalAmount}>
                                    {addPeriodToThousands(total)}{' '}
                                    {t('shoppingCart.currency')}
                                </strong>
                            </div>
                            {state !== null ? (
                                <Link href="/account/checkout">
                                    <a>
                                        <Button
                                            type="primary"
                                            size="large"
                                            className={styles.checkoutButton}>
                                            {t(
                                                'shoppingCart.proceedToCheckout'
                                            )}
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
                                            {t(
                                                'shoppingCart.proceedToCheckout'
                                            )}
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
                        {t('shoppingCart.emptyTitle')}
                    </h3>
                    <p className="mb-4 text-center text-muted">
                        {t('shoppingCart.emptyDescription')}
                    </p>
                    <Link href={'/scientific-resources/all'}>
                        <a>
                            <Button type="primary" size="large">
                                <FaArrowLeft />
                                {t('shoppingCart.startShopping')}
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
                <h1 className="page-title">{t('shoppingCart.title')}</h1>
                <SidebarLayout>{contentView}</SidebarLayout>
            </div>
        </>
    );
}

export default ShoppingCart;
