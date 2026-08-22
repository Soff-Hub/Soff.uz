import React, { memo, useState } from 'react';
import styles from './style.module.scss';
import { useRouter } from 'next/router';
import useWishlist from '~/shared/hooks/useWishlist';
import useCart from '~/shared/hooks/useCart';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import Image from 'next/image';

const ProductCard = ({ product }) => {
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const Router = useRouter();
    const { setCartOneItem, removeCartOneItem } = useCart();
    const [basket, setBasket] = useState(false);

    const handleNavigate = () => {
        Router.push(`/product/${product?.slug}`);
    };

    function handleAddItemToCart(e) {
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

    const isWishlisted = wishlist?.some(
        (item) => Number(item.id) === Number(product?.id)
    );

    const metaText = [
        product?.document?.file_size,
        product?.document?.page_count
            ? `${product.document.page_count} bet`
            : null,
        product?.views_count
            ? `${product.views_count} marta ko‘rildi`
            : null,
    ]
        .filter(Boolean)
        .join(' · ');

    return (
        <Link href={`/product/${product?.slug}`}>
            <div className={styles.card}>
                <div className={styles.cardImgWrapper}>
                    <span className={styles.cardType}>
                        {product?.document?.file_type || '.zip'}
                    </span>
                    <div
                        onClick={handleAddItemToWishlist}
                        className={styles.wishlistBtn}>
                        {isWishlisted ? (
                            <FaHeart color="#00a44f" />
                        ) : (
                            <FaRegHeart />
                        )}
                    </div>
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
                <div className={styles.cardBody}>
                    <h2
                        onClick={handleNavigate}
                        className={styles.cardTitle}>
                        {product?.title}
                    </h2>
                    {metaText && (
                        <p className={styles.cardMeta}>{metaText}</p>
                    )}
                    <div className={styles.cardFooter}>
                        <h3 className={styles.cardPrice}>
                            {product?.price === 0 || !product?.price
                                ? 'Bepul'
                                : `${formatCurrencyWithSpace(
                                    product?.price
                                )} so’m`}
                        </h3>
                        <div
                            onClick={handleAddItemToCart}
                            className={styles.cartBtn}>
                            <FaShoppingCart
                                color={basket ? '#00a44f' : undefined}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default memo(ProductCard);
