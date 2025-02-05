import React, { useState } from 'react';
import Link from 'next/link';
import useWishlist from '~/hooks/useWishlist';

const WebsitesProduct = ({ product }) => {
    const [countShow, setCountShow] = useState(false);
    const { addSavedItem, wishlist, removeSavedItemm } = useWishlist();

    function handleAddItemToWishlist (e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find(item => item.id === WebsitesProduct?.id)) {
            removeSavedItemm(WebsitesProduct.id);
        }
    }

    const websiteCardTitle =
        product.title.length > 50
            ? product.title.slice(0, 55) + '...'
            : product.title;

    return (
        <div>
            <div
                className='websiteMenuCard card d-flex align-items-center'
                onMouseEnter={() => setCountShow(true)}
                onMouseLeave={() => setCountShow(false)}>
                <div className=''>
                    <Link
                        href='/WebsitesProduct/[pid]'
                        as={`/WebsitesProduct/${WebsitesProduct.slug}`}
                        className='w-full mx-auto'>
                        <a>
                            {WebsitesProduct.poster_url ? (
                                thumbnailImage(WebsitesProduct)
                            ) : (
                                <img
                                    src={product.poster_url}
                                    alt='hujjat'
                                    height={180}
                                    className='mx-auto'
                                    style={{ height: 180 }}
                                />
                            )}
                        </a>
                    </Link>
                </div>

                <div className=''>
                    <div className='px-2 d-flex align-items-baseline websiteCardTitle'>
                        <Link
                            href='/product/[pid]'
                            as={`/product/${product.slug}`}>
                            <a className='text-center text-uppercase'>
                                {websiteCardTitle}
                            </a>
                        </Link>
                    </div>

                    <div className='websiteCardIcons'>
                        <div>
                            {(product?.views_count ||
                                product?.views_count === 0) && (
                                <p
                                    className='text-end mb-0 mt-1'
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
                                            Number(item.id) ===
                                            Number(product?.id)
                                    )
                                        ? 'fa-solid fa-heart  text-danger d-flex align-items-center'
                                        : 'icon-heart d-flex align-items-center'
                                } `}></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebsitesProduct;