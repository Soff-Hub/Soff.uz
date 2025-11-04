import React from 'react';
import Link from 'next/link';
import useProduct from '~/shared/hooks/useProduct';
import useCart from '~/shared/hooks/useCart';

const ProductCart = ({ product }) => {
    const { thumbnailImage, title } = useProduct();
    const { removeCartOneItem } = useCart();

    const handleRemoveItem = async (e, item) => {
        e.preventDefault();
        removeCartOneItem(item.id);
    };

    return (
        <div className="cartCardBlock">
            <div className="cartCardBlock">
                <Link href={`/product/[pid]`} as={`/product/${product?.slug}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
            </div>
            <div className="cartCardTitle">{title(product)}</div>
            <div className="cartCardDelete">
                <a href="#" onClick={(e) => handleRemoveItem(e, item)}>
                    <i className="fa fa-times"></i>
                </a>
            </div>
        </div>
    );
};

export default ProductCart;
