import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';

const Product = ({ product }) => {
    const { thumbnailImage, price, title } = useProduct();
    console.log('//', product);
    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }
    return (
        <div className="ps-product">
            <div
                className="ps-product__thumbnail"
                style={{
                    margin: '0 auto',
                }}>
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>
                        {product.poster_url ? (
                            thumbnailImage(product)
                        ) : (
                            <img src="/static/img/docCopy.jpg" alt="hujjat" />
                        )}
                    </a>
                </Link>

                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <div className="ps-product__content card-narx-box">
                    {title(product)}
                    {product.price === product.discount_price ? (
                        addPeriodToThousands(product.price)
                    ) : (
                        <>
                            <del>
                                {addPeriodToThousands(product.price)} so'm
                            </del>
                            <p>
                                {addPeriodToThousands(product.discount_price)}{' '}
                                so'm
                            </p>
                        </>
                    )}
                </div>
                <div className="ps-product__content hover">
                    {title(product)}
                    {product.price === product.discount_price ? (
                        addPeriodToThousands(product.price)
                    ) : (
                        <>
                            <del>
                                {addPeriodToThousands(product.price)} so'm
                            </del>
                            <p>
                                {addPeriodToThousands(product.discount_price)}{' '}
                                so'm
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
