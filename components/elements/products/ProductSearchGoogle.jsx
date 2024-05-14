import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { formatCurrency } from '~/utilities/product-helper';


const ProductSearchGoogle = ({ product }) => {
    const { title } = useProduct();

    let view;
    if (product.sale_price) {
        view = (
            <p className="">
                {product.discount_price !== 0 ? (
                    <>
                        {formatCurrency(product.sale_price)}
                        <span> so'm</span>
                        <del className="ml-2">
                            {formatCurrency(product.price)}
                            <span> so'm</span>
                        </del>
                    </>
                ) : (
                    <p className="text-warning border  border-warning px-3 rounded-3 m-0 p-0 mt-1" style={{ maxWidth: "60px" }}>
                        Bepul
                    </p>
                )}
            </p>
        );
    } else {
        view = (
            <p className="ps-product__price">
                {product.discount_price === 0 ? (
                    <>
                        <p className="text-warning border  border-warning px-3 rounded-3 m-0 p-0 mt-1" style={{ maxWidth: "60px" }}>
                            Bepul
                        </p>
                    </>
                ) : (
                    <>
                        {formatCurrency(product.price)}{' '}
                        <span> so'm</span>
                    </>
                )}
            </p>
        );
    }


    return (
        <div className='search_products_head'>
         <div className="search_products_box_cards">
            
         </div>
        </div>
    );
};
export default ProductSearchGoogle;
