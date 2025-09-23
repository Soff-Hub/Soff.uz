import React from 'react';
import Link from 'next/link';
import useProduct from '~/shared/hooks/useProduct';

const ProductCart = ({ product }) => {
    const { thumbnailImage, title } = useProduct();
    return (
        <div className="cartCardBlock">
            <div className="cartCardBlock">
                <Link href={`/product/[pid]`} as={`/product/${product?.slug}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
            </div>
            <div className="cartCardTitle">{title(product)}</div>
        </div>
    );
};

export default ProductCart;
