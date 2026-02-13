import React, { memo, useState } from 'react';
import styles from './style.module.scss';
import { useRouter } from 'next/router';
import useWishlist from '~/shared/hooks/useWishlist';
import useCart from '~/shared/hooks/useCart';
import { Modal } from 'antd';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import Image from 'next/image';

const ProductCard = ({ product }) => {
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const [open, setOpen] = useState(false);
    const Router = useRouter();
    const { setCartOneItem, removeCartOneItem } = useCart();
    const [basket, setBasket] = useState(false);

    const handleNavigate = () => {
        Router.push(`/product/${product?.slug}`);
    };

    function handleAddItemToCart(e) {
        showModal();
        e.preventDefault();
        if (basket) {
            removeCartOneItem(product.id);
        } else {
            setCartOneItem(product.id);
        }

        setBasket((prev) => !prev);
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find((item) => item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    }

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };
    const hideModalOk = () => {
        setOpen(false);
        Router.push('/account/shopping-cart');
    };
    return (
        <>
            <Link href={`/product/${product?.slug}`}>
                <div className={styles.card}>
                    <div className={styles.cardHead}>
                        <div className={styles.cardHeadInfo}>
                            <span className={styles.cardType}>
                                {product?.document?.file_type || '.zip'}
                            </span>
                            <div className={styles.cardActions}>
                                <div
                                    onClick={handleAddItemToWishlist}
                                    className={styles.actionIcon}>
                                    {wishlist?.some(
                                        (item) =>
                                            Number(item.id) ===
                                            Number(product?.id)
                                    ) ? (
                                        <FaHeart color="#00a44f" />
                                    ) : (
                                        <FaRegHeart />
                                    )}
                                </div>
                                <div
                                    onClick={handleAddItemToCart}
                                    className={styles.actionIcon}>
                                    {basket ? (
                                        <FaShoppingCart color="#00a44f" />
                                    ) : (
                                        <FaShoppingCart />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardImgWrapper}>
                            <Image
                                src={
                                    product?.poster_url ||
                                    '/static/img/no-document.png'
                                }
                                quality={75}
                                alt={product?.title || 'card img'}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                    <div className={styles.cardBody}>
                        <h2
                            onClick={handleNavigate}
                            className={styles.cardTitle}>
                            {product?.title}
                        </h2>
                        <h3 className={styles.cardPrice}>
                            {product?.price === 0 || !product?.price
                                ? 'Bepul'
                                : `${formatCurrencyWithSpace(
                                    product?.price
                                )} so’m`}
                        </h3>
                    </div>
                    <div className={styles.cardInfo}>
                        {product?.document?.file_size && (
                            <div className={styles.cardInfoItem}>
                                <img
                                    src="/static/img/card_icons/driver.svg"
                                    alt="icon"
                                />
                                <span>{product?.document?.file_size}</span>
                            </div>
                        )}
                        {product?.document?.page_count && (
                            <div className={styles.cardInfoItem}>
                                <img
                                    src="/static/img/card_icons/document-copy.svg"
                                    alt="icon"
                                />
                                <span>{product?.document?.page_count}</span>
                            </div>
                        )}
                        {product?.views_count !== 0 && (
                            <div className={styles.cardInfoItem}>
                                <img
                                    src="/static/img/card_icons/eye.svg"
                                    alt="icon"
                                />
                                <span>{product?.views_count}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
            <Modal
                title="Muvaffaqqiyatli"
                open={open}
                onOk={hideModalOk}
                onCancel={hideModal}
                cancelButtonProps={{
                    style: {
                        color: '#000',
                    },
                }}
                okButtonProps={{
                    style: {
                        color: '#fff',
                    },
                }}
                okText="Savatga o'tish"
                cancelText="Xaridlarni davom etirish">
                <p></p>
                <p>Mahsulotingizni savatga qo'shdingiz!</p>
                <p></p>
            </Modal>
        </>
    );
};

export default memo(ProductCard);
