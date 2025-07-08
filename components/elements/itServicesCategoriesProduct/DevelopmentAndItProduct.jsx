import React, { useState } from 'react';
import Link from 'next/link';
import useWishlist from '~/hooks/useWishlist';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import useCart from '~/hooks/useCart';
import useProduct from '~/hooks/useProduct';

const DevelopmentAndItProduct = ({ product }) => {
    const { thumbnailImage, title } = useProduct();

    function handleAddItemToWishlist (e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find(item => item?.id === ModelAndDesignProduct?.id)) {
            removeSavedItemm(ModelAndDesignProduct?.id);
        }
    }

    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const { setCartOneItem, removeCartOneItem } = useCart();
    const [basket, setBasket] = useState(false);

    function handleAddItemToWishlist (e) {
        e.preventDefault();
        addSavedItem(product?.id);
        if (wishlist?.find(item => item?.id === product?.id)) {
            removeSavedItem(product?.id);
        }
    }

    return (
        <div className='DevelopmentAndItCard'>
            <div className='DevelopmentAndItCardImgBox'>
                <Link
                    href='/product/[pid]'
                    as={`/product/${product?.slug}`}
                    className='w-full mx-auto'>
                    <a>
                        {DevelopmentAndItProduct.poster_url ? (
                            thumbnailImage(DevelopmentAndItProduct)
                        ) : (
                            <img
                                src={product?.poster_url}
                                alt='hujjat'
                                className='DevelopmentAndItCardImg'
                            />
                        )}
                    </a>
                </Link>
                <a
                    className='DevelopmentAndItCardheard'
                    href='#'
                    data-toggle='tooltip'
                    data-placement='top'
                    title="Tanlanganlarga qo'shish"
                    onClick={handleAddItemToWishlist}>
                    <img
                        src={`${
                            wishlist?.some(
                                item => Number(item.id) === Number(product?.id)
                            )
                                ? '/static/img/onclickHeard.png'
                                : '/static/img/heard.png'
                        } `}
                        alt=''
                    />
                </a>
            </div>

            <div className='DevelopmentAndItCardBody'>
                <div className='DevelopmentAndItCardSeller'>
                    <img
                        src='https://picsum.photos/200/300'
                        alt=''
                        className='DevelopmentAndItCardSellerAvatar'
                    />
                    <p className='DevelopmentAndItCardSellerName'>
                        {product?.fullname?.slice(0, 15)}
                    </p>
                    <img
                        src='https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=igjjV9w36OW3Z3NUTqAwRyEQpxb3zUFFqBr4MPNpAk3~CgsyhMHcJCB9I3kp2No72a-7FjAnDFdWgcwcpL4kLcn9oe52ONZ1VZ5AMMdXTrJvK2UDA9PIzCTD8IDMZIJx5jOicTceuEGhOvX6QRnwVqcfs1DVVhO9ewTSWEoKCUcBFGCKdsQMOYra~syUmA6FQ85CAwPrjejZ-oPgHUULdlKguaMJeJ64XcTx7OYZ3qFOMWDRdtX6x8Nrkk1j42ZEum3Dupihr7WW~cp2OIDF7uTJdAQ5rRH8-zzO6Gwr89bq5vNS94aOzIhE8Gu9F2OkWRCLbFW4rQIh0fLG3xTUFQ__'
                        alt=''
                        className='DevelopmentAndItCardSellerStatus'
                    />
                </div>
                <Link href='/product/[pid]' as={`/product/${product?.id}`}>
                    <a className='DevelopmentAndItCardTitle'>
                        {product?.title?.slice(0, 45)}
                    </a>
                </Link>
                <div className='DevelopmentAndItCardPriceBox'>
                    {+product?.discount_price === 0 ? (
                        <p className='DevelopmentAndItCardPrice m-0 text-warning'>
                            Bepul
                        </p>
                    ) : product?.discount === 0 ? (
                        <p className='DevelopmentAndItCardPrice m-0'>
                            {addPeriodToThousands(product?.discount_price)} so'm
                        </p>
                    ) : (
                        <>
                            <del>
                                {addPeriodToThousands(product?.price)} so'm
                            </del>
                            <p className='DevelopmentAndItCardPrice m-0'>
                                {addPeriodToThousands(product?.discount_price)}
                                so'm
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DevelopmentAndItProduct;
