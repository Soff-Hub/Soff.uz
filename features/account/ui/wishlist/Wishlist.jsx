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
    fileReactIcons,
    fileColors,
} from '~/features/product-details/ui/actions/file-actions';
import { FiDownload } from 'react-icons/fi';
import styles from './wishlist.module.scss';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa6';
import FileDownloadLink from '~/shared/ui/file-download-link';
import Icon from '~/shared/ui/Icon';

const breadCrumb = [
    {
        text: 'Asosiy sahifa',
        url: '/',
    },
    {
        text: 'Tanlanganlar',
    },
];

function Wishlist() {
    const { wishlist, status } = useSelector((state) => state.ecomerce);
    const { removeSavedItem, setAllSaved, isSavedItem } = useWishlist();
    const { setCartOneItem } = useCart();
    const hasItems = wishlist && wishlist.length > 0;
    const isLoading = status === 'loading';

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
    if (isLoading) {
        contentView = (
            <div className={styles.wishlistContent}>
                <h2 className={styles.wishlistTitle}>
                    Tanlanganlar ({wishlist.length})
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
                                            Yuklab olish
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
                        Tanlangan mahsulotlar yo'q
                    </h3>
                    <p className="mb-4 text-center text-muted">
                        Mahsulotni tanlash uchun yurakcha belgisini bosing va
                        ularni bu yerda saqlang.
                    </p>
                    <Link href={'/scientific-resources/all'}>
                        <a>
                            <Button type="primary" size="large">
                                <FaArrowLeft />
                                Mahsulotlar tanlash
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
            <div className={styles.wishlistWrapper}>
                <h1 className="page-title">Tanlanganlar</h1>
                <SidebarLayout>{contentView}</SidebarLayout>
            </div>
        </>
    );
}

export default Wishlist;
