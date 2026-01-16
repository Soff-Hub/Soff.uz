import React, { memo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './style.module.scss';
import { useRouter } from 'next/router';
import useWishlist from '~/shared/hooks/useWishlist';
import useCart from '~/shared/hooks/useCart';
import { Modal } from 'antd';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    const { t } = useTranslation('card');
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
                {/* <a aria-label={t('productCard.viewProduct')}> */}
                <div className={styles.card}>
                    <div className={styles.cardHead}>
                        <div className={styles.cardHeadInfo}>
                            <span className={styles.cardType}>
                                {product?.document?.file_type || '.zip'}
                            </span>
                            <div className={styles.cardActions}>
                                <div
                                    onClick={handleAddItemToWishlist}
                                    className={styles.likeIcon}>
                                    {wishlist?.some(
                                        (item) =>
                                            Number(item.id) ===
                                            Number(product?.id)
                                    ) ? (
                                        <i
                                            style={{ color: '#00a44f' }}
                                            className="fa-solid fa-heart"></i>
                                    ) : (
                                        <i className="fa-regular fa-heart"></i>
                                    )}
                                </div>
                                <div
                                    onClick={handleAddItemToCart}
                                    className={styles.cartIcon}>
                                    {basket ? (
                                        <i
                                            style={{ color: '#00a44f' }}
                                            className="fa-solid fa-cart-shopping"></i>
                                    ) : (
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    )}
                                </div>
                            </div>
                        </div>
                        <img
                            className={styles.cardImg}
                            src={
                                product?.poster_url ||
                                '/static/img/no-document.png'
                            }
                            alt={t('productCard.cardImage')}
                        />
                    </div>
                    <div className={styles.cardBody}>
                        <h2
                            onClick={handleNavigate}
                            className={styles.cardTitle}>
                            {product?.title}
                        </h2>
                        <h3 className={styles.cardPrice}>
                            {product?.price === 0 || !product?.price
                                ? t('productCard.free')
                                : `${formatCurrencyWithSpace(
                                      product?.price
                                  )} ${t('productCard.currency')}`}
                        </h3>
                    </div>
                    <div className={styles.cardInfo}>
                        {product?.document?.file_size && (
                            <div className="d-flex gap-1">
                                <img
                                    src="/static/img/card_icons/driver.svg"
                                    alt={t('productCard.icon')}
                                />
                                <span>{product?.document?.file_size}</span>
                            </div>
                        )}
                        {product?.document?.page_count && (
                            <div className="d-flex gap-1">
                                <img
                                    src="/static/img/card_icons/document-copy.svg"
                                    alt={t('productCard.icon')}
                                />
                                <span>{product?.document?.page_count}</span>
                            </div>
                        )}
                        {product?.views_count !== 0 && (
                            <div className="d-flex gap-1">
                                <img
                                    src="/static/img/card_icons/eye.svg"
                                    alt={t('productCard.icon')}
                                />
                                <span>{product?.views_count}</span>
                            </div>
                        )}
                    </div>
                </div>
                {/* </a> */}
            </Link>
            <Modal
                title={t('productCard.modal.title')}
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
                okText={t('productCard.modal.goToCart')}
                cancelText={t('productCard.modal.continueShopping')}>
                <p></p>
                <p>{t('productCard.modal.message')}</p>
                <p></p>
            </Modal>
        </>
    );
};

export default memo(ProductCard);
