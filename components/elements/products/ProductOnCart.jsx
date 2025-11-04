import React from 'react';
import Link from 'next/link';
import useProduct from '~/shared/hooks/useProduct';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import useCart from '~/shared/hooks/useCart';
import { Button } from 'antd';

const ProductOnCart = ({ product }) => {
    const { thumbnailImage, title } = useProduct();
    const { removeCartOneItem } = useCart();

    function handleRemoveItem(e, item) {
        e.preventDefault();
        removeCartOneItem(item.id);
    }
    return (
        <div className="ps-basket__content__items__item">
            <div className="ps-basket__content__items__item__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product?.slug}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
            </div>
            <div className="ps-basket__content__items__item__content">
                <h4>{title(product)}</h4>
                <p>
                    <small>
                        {+product?.discount_price === 0 ? (
                            <p className="free-product-text">Bepul</p>
                        ) : product?.discount === 0 ? (
                            <p className="price">
                                {addPeriodToThousands(product.discount_price)}{' '}
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
                className="ps-basket__content__items__item__remove"
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleRemoveItem(e, product)}>
                <i className="fa fa-times"></i>
            </Button>
        </div>
    );
};

export default ProductOnCart;
