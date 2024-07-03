import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';

const ProductOnCart = ({ product, children }) => {
    const { thumbnailImage, title } = useProduct();

   

    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.slug}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                {title(product)}
                <p>
                    <small>
                        {+product.discount_price === 0 ? <p className='free-product-text'>Bepul</p> : product.discount === 0 ? (
                            <p>{addPeriodToThousands(product.discount_price)} so'm</p>
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
                    </small>
                </p>{' '}
                {children}
            </div>
        </div>
    );
};

export default ProductOnCart;
