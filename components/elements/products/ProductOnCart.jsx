import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';

const ProductOnCart = ({ product, children }) => {
    const { thumbnailImage, title } = useProduct();

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
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                {title(product)}
                <p>
                    <small>
                         {addPeriodToThousands(product.price)} so'm
                    </small>
                </p>{' '}
                {children}
            </div>
        </div>
    );
};

export default ProductOnCart;
