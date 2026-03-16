import React from 'react';
import Link from 'next/link';
import useProduct from '~/shared/hooks/useProduct';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import useCart from '~/shared/hooks/useCart';
import { Button } from 'antd';
import { IoIosClose } from 'react-icons/io';

const ProductOnCart = ({ product }) => {
    const { thumbnailImage, title } = useProduct();
    const { removeCartOneItem, removePlaylistCartOneItem } = useCart();

    function handleRemoveItem(e, item) {
        e.preventDefault();
        if (item.cartType === 'playlist') {
            removePlaylistCartOneItem(item.id);
        } else {
            removeCartOneItem(item.id);
        }
    }

    // Direct image handling if useProduct doesn't support playlists yet
    const renderThumbnail = () => {
        if (product.cartType === 'playlist' && product.image) {
            return (
                <div
                    style={{ overflow: 'hidden' }}
                    className="responsive-image-card text-center">
                    <img
                        src={product.image}
                        width="70px"
                        height="70px"
                        alt={product.title}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            );
        }
        return thumbnailImage(product);
    };

    return (
        <div className="ps-basket__content__items__item">
            <div className="ps-basket__content__items__item__thumbnail">
                <Link
                    href={
                        product.cartType === 'playlist'
                            ? `/video-lessons/playlists/${product.slug || product.id}`
                            : `/product/${product.slug || product.id}`
                    }>
                    <a>{renderThumbnail()}</a>
                </Link>
            </div>
            <div className="ps-basket__content__items__item__content">
                <Link
                    href={
                        product.cartType === 'playlist'
                            ? `/video-lessons/playlists/${product.slug || product.id}`
                            : `/product/${product.slug || product.id}`
                    }>
                    <a style={{ color: 'inherit' }}>
                        <h4 style={{ margin: 0 }}>
                            {product.title}
                            {product.cartType === 'playlist' && (
                                <span
                                    style={{
                                        fontSize: '10px',
                                        color: '#2ecc71',
                                        display: 'block',
                                    }}>
                                    Kurs
                                </span>
                            )}
                        </h4>
                    </a>
                </Link>
                <p>
                    <small>
                        {+product?.discount_price === 0 || !product?.discount_price ? (
                            <p className="free-product-text">Bepul</p>
                        ) : product?.discount === 0 || !product?.discount ? (
                            <p className="price">
                                {addPeriodToThousands(product.discount_price || product.price)}{' '}
                                so'm
                            </p>
                        ) : (
                            <>
                                <del>
                                    {addPeriodToThousands(product?.price)} so'm
                                </del>
                                <p>
                                    {addPeriodToThousands(
                                        product?.discount_price
                                    )}
                                    so'm
                                </p>
                            </>
                        )}
                    </small>
                </p>
            </div>
            <Button
                type="default"
                danger
                size="small"
                icon={<IoIosClose fontSize={30} />}
                onClick={(e) => handleRemoveItem(e, product)}
                aria-label="O'chirish"
            />
        </div>
    );
};

export default ProductOnCart;
