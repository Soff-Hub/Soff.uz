import React, { useState } from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import useWishlist from '~/hooks/useWishlist';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import useCart from '~/hooks/useCart';
import { useRouter } from 'next/router';
import { Modal } from 'antd';

const WebsitesProduct = ({ product }) => {
    const [countShow, setCountShow] = useState(false);
    const { thumbnailImage, title } = useProduct();

    function handleAddItemToWishlist (e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find(item => item.id === WebsitesProduct?.id)) {
            removeSavedItemm(WebsitesProduct.id);
        }
    }

    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const [open, setOpen] = useState(false);
    const Router = useRouter();
    const { setCartOneItem, removeCartOneItem } = useCart();
    const [basket, setBasket] = useState(false);

    function handleAddItemToCart (e) {
        showModal();
        e.preventDefault();
        if (basket) {
            removeCartOneItem(product.id);
        } else {
            setCartOneItem(product.id);
        }

        setBasket(prev => !prev); // Holatni almashtirish
    }

    function handleAddItemToWishlist (e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find(item => item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    }

    // ----------------modals
    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };
    const hideModalOk = () => {
        setOpen(false);
        Router.push('/account/shopping-cart');
    };

    const produvctTitle =
        product.title.length > 10
            ? product.title.slice(0, 45) + '...'
            : product.title;

    return (
        <div
            className='videoLessonsCard'
            onMouseEnter={() => setCountShow(true)}
            onMouseLeave={() => setCountShow(false)}>
            <div className='videoLessonsCardImgBox'>
                <Link href='/product/[pid]' as={`/product/${product.slug}`}>
                    <a>
                        {WebsitesProduct.poster_url ? (
                            thumbnailImage(WebsitesProduct)
                        ) : (
                            <img
                                src={product.poster_url}
                                alt='hujjat'
                                className='videoLessonsCardImg'
                            />
                        )}
                    </a>
                </Link>

                <a
                    className='videoLessonsCardheard'
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

            <div className='videoLessonsCardBody '>
                <Link href='/product/[pid]' as={`/product/${product.slug}`}>
                    <a className='videoLessonsCardTitle'>{produvctTitle}</a>
                </Link>

                <div className='videoLessonsCardPriceBox'>
                    <div className='videoLessonsCardPrice'>
                        {+product.discount_price === 0 ? (
                            <p className='videoLessonsCardPrice m-0'>Bepul</p>
                        ) : product.discount === 0 ? (
                            <p className=' videoLessonsCardPrice m-0'>
                                {addPeriodToThousands(product.discount_price)}{' '}
                                so'm
                            </p>
                        ) : (
                            <>
                                <del className='CardDiscountPrice'>
                                    {addPeriodToThousands(product.price)} so'm
                                </del>
                                <p className='videoLessonsCardPrice  m-0'>
                                    {addPeriodToThousands(
                                        product.discount_price
                                    )}
                                    so'm
                                </p>
                            </>
                        )}
                    </div>
                    <a
                        href='#'
                        data-toggle='tooltip'
                        data-placement='top'
                        className='buyIcon'
                        title="Savatga qo'shish"
                        onClick={handleAddItemToCart}>
                        <img
                            src={
                                basket
                                    ? '/static/img/buyIconHover.png'
                                    : '/static/img/buyIcon.png'
                            }
                            alt=''
                        />
                    </a>
                </div>
            </div>

            <Modal
                title='Muvaffaqqiyatli'
                open={open}
                onOk={hideModalOk}
                onCancel={hideModal}
                cancelButtonProps={{
                    style: {
                        color: '#000',
                    },
                }}
                okButtonProps={{
                    style: {
                        color: '#fff',
                    },
                }}
                okText="Savatga o'tish"
                cancelText='Xaridlarni davom etirish'>
                <p></p>
                <p>Mahsulotingizni savatga qo'shdingiz!</p>
                <p></p>
            </Modal>
        </div>
    );
};

export default WebsitesProduct;

