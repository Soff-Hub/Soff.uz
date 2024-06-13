import React, { useState } from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';


const Product = ({ product }) => {
    const { thumbnailImage, title } = useProduct();
    const [countShow, setCountShow] = useState(false);
    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}`
                : formattedIntegerPart;

        return formattedNumber;

    }


    return (
        <div className="ps-product"
            onMouseEnter={() => setCountShow(true)}
            onMouseLeave={() => setCountShow(false)}

        >
            <div
                className="ps-product__thumbnail"
                style={{
                    margin: '0 auto',
                }}>
                {
                    (product?.views_count || product?.views_count === 0) &&
                    <p className='text-end mb-0 mt-1'
                        style={{
                            fontSize: "12px",
                            opacity: countShow ? "1" : "0",
                            transition: "opacity 0.3s linear"
                        }}
                    ><i className='fa-solid fa-eye '
                        style={{
                            fontSize: "10px",
                        }}></i> {product?.views_count}</p>

                }

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

                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <div className="ps-product__content card-narx-box">
                    {title(product)}
                    {+product.discount_price === 0 ? (
                        <p className="free-product-text">Bepul</p>
                    ) : product.discount === 0 ? (
                        <p>
                            {addPeriodToThousands(product.discount_price)} so'm
                        </p>
                    ) : (
                        <>
                            <del>
                                {addPeriodToThousands(product.price)} so'm
                            </del>
                            <p>
                                {addPeriodToThousands(product.discount_price)}
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
