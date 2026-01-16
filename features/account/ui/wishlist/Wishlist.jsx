import React, { useEffect } from 'react';
import BreadCrumb from '~/shared/ui/breadcrumb';
import { useSelector } from 'react-redux';
import useWishlist from '~/shared/hooks/useWishlist';
import useCart from '~/shared/hooks/useCart';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import SidebarLayout from '~/widgets/sidebar/SidebarLayout';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Modal, Skeleton } from 'antd';
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import {
    fileIcons,
    fileColors,
} from '~/features/product-details/ui/actions/file-actions';
import { FiDownload } from 'react-icons/fi';
import styles from './wishlist.module.scss';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa6';
import FileDownloadLink from '~/shared/ui/file-download-link';
import { useTranslation } from 'next-i18next';

function Wishlist() {
    const { t } = useTranslation('account');
    const { wishlist, status } = useSelector((state) => state.ecomerce);
    const { removeSavedItem, setAllSaved, isSavedItem } = useWishlist();
    const { setCartOneItem } = useCart();
    const hasItems = wishlist && wishlist.length > 0;
    const isLoading = status === 'loading';

    const breadCrumb = [
        {
            text: t('breadcrumbs.home'),
            url: '/',
        },
        {
            text: t('breadcrumbs.wishlist'),
        },
    ];

    useEffect(() => {
        const localWishlist =
            JSON.parse(localStorage.getItem('wishlist')) || [];
        if (localWishlist.length > 0 && (!wishlist || wishlist.length === 0)) {
            setAllSaved();
        }
    }, []);

    const handleAddItemToCart = (e, product) => {
        e.preventDefault();
        setCartOneItem(product.id);

        Modal.success({
            centered: true,
            title: t('wishlist.successTitle'),
            content: t('wishlist.successAddToCart'),
        });
    };

    const handleRemoveWishlistItem = (e, item) => {
        e.preventDefault();
        removeSavedItem(item.id);
    };

    let contentView;
    if (isLoading) {
        contentView = (
            <div className={styles.wishlistContent}>
                <h2 className={styles.wishlistTitle}>
                    {t('wishlist.count', { count: wishlist.length })}
                </h2>
                <div className={styles.wishlistProducts}>
                    {[...Array(4)].map((_, index) => (
                        <Skeleton.Button
                            style={{ height: '80px', width: '100%' }}
                            active
                            key={index}></Skeleton.Button>
                    ))}
                </div>
            </div>
        );
    } else if (hasItems) {
        contentView = (
            <div className={styles.wishlistContent}>
                <h2 className={styles.wishlistTitle}>
                    {t('wishlist.count', { count: wishlist.length })}
                </h2>
                <div className={styles.wishlistProducts}>
                    {wishlist.map((item) => (
                        <div key={item.id} className={styles.wishlistCard}>
                            <div className={styles.wishlistThumbnail}>
                                <Link href={`/product/${item.slug}`}>
                                    <a>
                                        <div
                                            className={
                                                styles.wishlistImageWrapper
                                            }>
                                            <Image
                                                src={item.poster_url}
                                                alt={item.title}
                                                width={120}
                                                height={120}
                                                className={styles.wishlistImage}
                                                style={{
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <div
                                                className={
                                                    styles.wishlistFileBadge
                                                }
                                                style={{
                                                    backgroundColor:
                                                        fileColors[
                                                            item.file_type
                                                        ] || '#E22C2F',
                                                }}>
                                                <i
                                                    className={`fas ${
                                                        fileIcons[
                                                            item.file_type
                                                        ] || 'fa-file-pdf'
                                                    }`}></i>
                                                <span>{item.file_type}</span>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className={styles.wishlistInfo}>
                                <Link href={`/product/${item.slug}`}>
                                    <a className={styles.wishlistTitleLink}>
                                        {item.title}
                                    </a>
                                </Link>
                                <div className={styles.wishlistPrice}>
                                    {item.discount_price ? (
                                        `${addPeriodToThousands(
                                            item.discount_price
                                        )} ${t('wishlist.currency')}`
                                    ) : (
                                        <p
                                            className="free-product-text"
                                            style={{ width: 'fit-content' }}>
                                            {t('wishlist.free')}
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
                                                {t('wishlist.currency')}
                                            </del>
                                        </sup>
                                    ) : null}
                                </div>
                            </div>
                            <div className={styles.wishlistActions}>
                                {item.discount_price ? (
                                    <Button
                                        type="primary"
                                        disabled={isSavedItem(item.id)}
                                        icon={
                                            <ShoppingCartOutlined
                                                style={{ fontSize: '18px' }}
                                            />
                                        }
                                        onClick={(e) =>
                                            handleAddItemToCart(e, item)
                                        }
                                        className={styles.wishlistAddButton}>
                                        {t('wishlist.addToCart')}
                                    </Button>
                                ) : (
                                    <FileDownloadLink
                                        url={item?.file_url}
                                        filename={item.title}>
                                        <Button
                                            type="default"
                                            variant="outlined"
                                            icon={
                                                <FiDownload
                                                    style={{ fontSize: '18px' }}
                                                />
                                            }
                                            className={
                                                styles.wishlistAddButton
                                            }>
                                            {t('wishlist.download')}
                                        </Button>
                                    </FileDownloadLink>
                                )}
                                <Button
                                    danger
                                    variant="outlined"
                                    icon={<CloseOutlined />}
                                    onClick={(e) =>
                                        handleRemoveWishlistItem(e, item)
                                    }
                                    className={styles.wishlistRemoveButton}
                                    aria-label={t('wishlist.remove')}
                                />
                            </div>
                        </div>
                    ))}
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
                        {t('wishlist.emptyTitle')}
                    </h3>
                    <p className="mb-4 text-center text-muted">
                        {t('wishlist.emptyDescription')}
                    </p>
                    <Link href={'/scientific-resources/all'}>
                        <a>
                            <Button type="primary" size="large">
                                <FaArrowLeft />
                                {t('wishlist.selectProducts')}
                            </Button>
                        </a>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="ps-page--simple">
            <BreadCrumb breacrumb={breadCrumb} />
            <div className="ps-wishlist">
                <div className="container my-5">
                    <h1 className="page-title">{t('wishlist.title')}</h1>
                    <SidebarLayout>{contentView}</SidebarLayout>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
