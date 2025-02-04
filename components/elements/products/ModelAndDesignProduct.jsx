import React, { useState } from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
import useWishlist from '~/hooks/useWishlist';

const ModelAndDesignProduct = ({ product }) => {
    const [countShow, setCountShow] = useState(false);
    const { addSavedItem, wishlist, removeSavedItemm } = useWishlist();
    const { thumbnailImage, title } = useProduct();

    function handleAddItemToWishlist (e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find(item => item.id === ModelAndDesignProduct?.id)) {
            removeSavedItemm(ModelAndDesignProduct.id);
        }
    }

    const produvctTitle =
        product.title.length > 10
            ? product.title.slice(0, 15) + '...'
            : product.title;

    return (
        <div>
            <div
                className='modelAndDesignCard'
                onMouseEnter={() => setCountShow(true)}
                onMouseLeave={() => setCountShow(false)}>
                <div className=''>
                    <Link
                        href="/product/[pid]" 
                        as={`/product/${product.slug}`}
                        className=''>
                        <a>
                            {ModelAndDesignProduct.poster_url ? (
                                thumbnailImage(ModelAndDesignProduct)
                            ) : (
                                <img
                                    src={product.poster_url}
                                    alt='hujjat'
                                    className='modelAndDesignCardImg'
                                />
                            )}
                        </a>
                    </Link>
                </div>

                <div className='modelAndDesignCardBody'>
                    <Link href="/product/[pid]" as={`/product/${product.slug}`}>
                        <a className='modelAndDesignCardTitle'>
                            {produvctTitle}
                        </a>
                    </Link>

                    <div className='modelAndDesignCardPrice'>
                        <div className='ps-product__content card-narx-box  '>
                            {+product.discount_price === 0 ? (
                                <p className='free-product-text'>Bepul</p>
                            ) : product.discount === 0 ? (
                                <p>
                                    {addPeriodToThousands(
                                        product.discount_price
                                    )}{' '}
                                    so'm
                                </p>
                            ) : (
                                <>
                                    <del>
                                        {addPeriodToThousands(product.price)}{' '}
                                        so'm
                                    </del>
                                    <p>
                                        {addPeriodToThousands(
                                            product.discount_price
                                        )}
                                        so'm
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* <div className='modelAndDesignCardIcons'>
                    <div>
                        {(product?.views_count ||
                            product?.views_count === 0) && (
                            <p
                                className='text-center d-flex align-items-center gap-2 mb-0 mt-1'
                                style={{
                                    fontSize: '12px',
                                    opacity: countShow ? '1' : '0',
                                    transition: 'opacity 0.3s linear',
                                }}>
                                <i
                                    className='fa-solid fa-eye text-dark'
                                    style={{
                                        fontSize: '10px',
                                    }}></i>{' '}
                                {product?.views_count}
                            </p>
                        )}
                    </div>

                    <a
                        href='#'
                        data-toggle='tooltip'
                        data-placement='top'
                        title="Tanlanganlarga qo'shish"
                        onClick={handleAddItemToWishlist}>
                        <i
                            className={`${
                                wishlist?.some(
                                    item =>
                                        Number(item.id) === Number(product?.id)
                                )
                                    ? 'fa-solid fa-heart  text-danger d-flex align-items-center'
                                    : 'icon-heart d-flex align-items-center'
                            } `}></i>
                    </a>
                </div> */}
            </div>
        </div>
    );
};

export default ModelAndDesignProduct;
