import React, { useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import { useSelector } from 'react-redux';
import useWishlist from '~/shared/hooks/useWishlist';
import useCart from '~/shared/hooks/useCart';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import SidebarLayout from '~/widgets/sidebar/SidebarLayout';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Modal } from 'antd';
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import {
    fileIcons,
    fileColors,
} from '~/components/details-components/details-actions/file-actions';
import { FiDownload } from 'react-icons/fi';
import styles from './wishlist.module.scss';
import { downloadFile } from '~/shared/utilities/utils';
// import LegacyWishlist from '~/components/partials/account/Wishlist';

const breadCrumb = [
    {
        text: 'Asosiy sahifa',
        url: '/',
    },
    {
        text: 'Tanlanganlar',
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

function Wishlist() {
    const { wishlist } = useSelector((state) => state.ecomerce);
    const { removeSavedItem, setAllSaved, isSavedItem } = useWishlist();
    const { setCartOneItem } = useCart();
    const hasItems = wishlist && wishlist.length > 0;

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
            title: 'Muvaffaqqiyatli!',
            content: `Siz mahsulotni savatga qo'shdingiz`,
        });
    };

    const handleRemoveWishlistItem = (e, item) => {
        e.preventDefault();
        removeSavedItem(item.id);
    };

    let contentView;
    if (hasItems) {
        contentView = (
            <div className={styles.wishlistContent}>
                <h2 className={styles.wishlistTitle}>
                    Tanlanganlar ({wishlist.length})
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
                                        Savatga qo'shish
                                    </Button>
                                ) : (
                                    <Button
                                        type="default"
                                        variant="outlined"
                                        icon={
                                            <FiDownload
                                                style={{ fontSize: '18px' }}
                                            />
                                        }
                                        onClick={() =>
                                            downloadFile(item.file_url)
                                        }
                                        className={styles.wishlistAddButton}>
                                        Yuklab olish
                                    </Button>
                                )}
                                <Button
                                    danger
                                    variant="outlined"
                                    icon={<CloseOutlined />}
                                    onClick={(e) =>
                                        handleRemoveWishlistItem(e, item)
                                    }
                                    className={styles.wishlistRemoveButton}
                                    aria-label="O'chirish"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        contentView = (
            <div className={styles.wishlistEmpty}>
                <div className={styles.wishlistEmptyContent}>
                    <p>Tanlaganlar yo'q!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="ps-page--simple">
            <BreadCrumb breacrumb={breadCrumb} />
            <div className="ps-wishlist">
                <div className="container my-5">
                    <h1 className="page-title">Tanlanganlar</h1>
                    <SidebarLayout>{contentView}</SidebarLayout>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
