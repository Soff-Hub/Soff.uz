import React, { useState } from 'react';
import Link from 'next/link';
import useProduct from '~/shared/hooks/useProduct';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { useTranslation } from 'next-i18next';

const Product = ({ product }) => {
    const { t } = useTranslation('common');
    const { thumbnailImage, title } = useProduct();
    const [countShow, setCountShow] = useState(false);

    return (
        <div
            className="ps-product"
            onMouseEnter={() => setCountShow(true)}
            onMouseLeave={() => setCountShow(false)}>
            <div
                className="ps-product__thumbnail"
                style={{
                    margin: '0 auto',
                }}>
                {(product?.views_count || product?.views_count === 0) && (
                    <p
                        className="text-end mb-0 mt-1"
                        style={{
                            fontSize: '12px',
                            opacity: countShow ? '1' : '0',
                            transition: 'opacity 0.3s linear',
                        }}>
                        <i
                            className="fa-solid fa-eye "
                            style={{
                                fontSize: '10px',
                            }}></i>{' '}
                        {product?.views_count}
                    </p>
                )}

                <Link href="/product/[pid]" as={`/product/${product.slug}`}>
                    <a
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                        {product.poster_url ? (
                            thumbnailImage(product)
                        ) : (
                            <img src="/static/img/docCopy.png" alt="hujjat" />
                        )}
                    </a>
                </Link>
            </div>
            <div className="ps-product__container">
                <div className="ps-product__content card-narx-box">
                    {title(product)}
                    {+product.discount_price === 0 ? (
                        <p className="free-product-text">Bepul</p>
                    ) : product.discount === 0 ? (
                        <p>
                            {addPeriodToThousands(product.discount_price)}{' '}
                            {t('common.currency')}
                        </p>
                    ) : (
                        <>
                            <del>
                                {addPeriodToThousands(product.price)}{' '}
                                {t('common.currency')}
                            </del>
                            <p>
                                {addPeriodToThousands(product.discount_price)}
                                {t('common.currency')}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
