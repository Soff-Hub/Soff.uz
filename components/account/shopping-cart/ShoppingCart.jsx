import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import SidebarLayout from '~/widgets/sidebar/SidebarLayout';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Skeleton } from 'antd';
import useCart from '~/shared/hooks/useCart';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import { calculateAmount } from '~/shared/utilities/ecomerce-helpers';
import ProductRepository from '~/repositories/ProductRepository';
import {
    fileIcons,
    fileColors,
} from '~/components/details-components/details-actions/file-actions';
import { IoIosClose } from 'react-icons/io';
import styles from './shopping-cart.module.scss';
import { cn } from '~/shared/utilities/cn';

const breadCrumb = [
    {
        text: 'Asosiy sahifa',
        url: '/',
    },
    {
        text: 'Savat',
    },
];

// Extended file colors and icons to include .docx
const extendedFileColors = {
    ...fileColors,
    '.docx': '#007DFF',
};

const extendedFileIcons = {
    ...fileIcons,
    '.docx': 'fa-file-word',
};

function ShoppingCart() {
    const state = useSelector((state) => state.auth.user);
    const { cartDataItems, status } = useSelector((state) => state.ecomerce);
    const { removeCartOneItem } = useCart();
    const [taxPercentage, setTaxPercentage] = useState(0.1); // Default 10%
    const hasItems = cartDataItems && cartDataItems.length;
    const isLoading = status === 'loading';

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
                    Mahsulotlar ({cartDataItems.length})
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
                    Mahsulotlar ({cartDataItems.length})
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
                                                        extendedFileColors[
                                                            item.file_type
                                                        ] || '#E22C2F',
                                                }}>
                                                <i
                                                    className={`fas ${
                                                        extendedFileIcons[
                                                            item.file_type
                                                        ] || 'fa-file-pdf'
                                                    }`}></i>
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
                                        )}
                                    so'm`
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
                                                {addPeriodToThousands(
                                                    item.price
                                                )}{' '}
                                                so'm
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
                                <strong>{cartDataItems.length} ta</strong>
                            </span>
                            <span className={styles.summaryItem}>
                                Oraliq summa:{' '}
                                <strong>
                                    {addPeriodToThousands(subtotal)} so'm
                                </strong>
                            </span>
                            <span className={styles.summaryItem}>
                                Xizmat haqi ({Math.round(taxPercentage * 100)}
                                %):{' '}
                                <strong>
                                    {addPeriodToThousands(tax)} so'm
                                </strong>
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
                                Jami to'lov:
                                <strong className={styles.totalAmount}>
                                    {addPeriodToThousands(total)} so'm
                                </strong>
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
    }

    return (
        <div className="ps-page--simple mb-4">
            <BreadCrumb breacrumb={breadCrumb} />
            <div className="ps-shopping-cart">
                <div className="container my-5">
                    <h1 className="page-title">Savat</h1>
                    <SidebarLayout>{contentView}</SidebarLayout>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
