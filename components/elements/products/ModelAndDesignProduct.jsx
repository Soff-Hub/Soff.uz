import React, { useState } from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import useWishlist from '~/hooks/useWishlist';
import useCart from '~/hooks/useCart';
import { useRouter } from 'next/router';
import { Modal } from 'antd';

const ModelAndDesignProduct = ({ product }) => {
    const [countShow, setCountShow] = useState(false);
    const { thumbnailImage, title } = useProduct();

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find(item => item.id === ModelAndDesignProduct?.id)) {
            removeSavedItemm(ModelAndDesignProduct.id);
        }
    }

    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const [open, setOpen] = useState(false);
    const Router = useRouter();
    const { setCartOneItem, removeCartOneItem } = useCart();
    const [basket, setBasket] = useState(false);

    function handleAddItemToCart(e) {
        showModal();
        e.preventDefault();
        if (basket) {
            removeCartOneItem(product.id);
        } else {
            setCartOneItem(product.id);
        }

        setBasket(prev => !prev); // Holatni almashtirish
    }

    function handleAddItemToWishlist(e) {
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
        product?.title?.length > 15
            ? product.title.slice(0, 15) + '...'
            : product.title;

    return (
        <>
            <div
                className='modelAndDesignCard '
                onMouseEnter={() => setCountShow(true)}
                onMouseLeave={() => setCountShow(false)}>
                <div className='modelAndDesignCardImg'>
                    <Link
                        href='/product/[pid]'
                        as={`/product/${product.slug}`}
                        scroll={true}
                        className='w-100'>
                        {ModelAndDesignProduct.poster_url ? (
                            thumbnailImage(ModelAndDesignProduct)
                        ) : (
                            <img
                                src={product.poster_url}
                                alt='hujjat'
                                className='w-100'
                                style={{ borderRadius: '9px 9px 0 0' }}
                            />
                        )}
                    </Link>

                    <div className='modelAndDesignCardTopSide '>
                        {/* <div className='aboutModel d-flex gap-2 w-100'>
                            <p className='aboutModelItem'>stl</p>
                            <p className='aboutModelItem'>ztl</p>
                            <p className='aboutModelItem'>obj</p>
                            <p className='aboutModelItem'>blend</p>
                        </div> */}
                        <div className='modelAndDesignCardPriceBox'>
                            {+product.discount_price === 0 ? (
                                <p
                                    className='modelAndDesignCardPrice'
                                    style={{ whiteSpace: 'nowrap' }}>
                                    Bepul
                                </p>
                            ) : product.discount === 0 ? (
                                <p
                                    className='modelAndDesignCardPrice'
                                    style={{ whiteSpace: 'nowrap' }}>
                                    {addPeriodToThousands(
                                        product.discount_price
                                    )}{' '}
                                    so'm
                                </p>
                            ) : (
                                <>
                                    <del className='modelAndDesignCardPrice mb-2'>
                                        {addPeriodToThousands(product.price)}{' '}
                                        so'm
                                    </del>
                                    <p
                                        className='modelAndDesignCardPrice'
                                        style={{ whiteSpace: 'nowrap' }}>
                                        {addPeriodToThousands(
                                            product.discount_price
                                        )}{' '}
                                        so'm
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className='modelAndDesignCardBody'>
                    <Link href='/product/[pid]' as={`/product/${product.slug}`}>
                        <a className='modelAndDesignCardTitle'>
                            {produvctTitle}
                        </a>
                    </Link>

                    <div className='modelAndDesignCardBtn'>
                        <a
                            className='scientific-resources-card-heard'
                            href='#'
                            data-toggle='tooltip'
                            data-placement='top'
                            title="Tanlanganlarga qo'shish"
                            onClick={handleAddItemToWishlist}>
                            <img
                                src={`${wishlist?.some(
                                    item =>
                                        Number(item.id) ===
                                        Number(product?.id)
                                )
                                        ? '/static/img/onclickHeard.png'
                                        : '/static/img/heard.png'
                                    } `}
                                alt=''
                            />
                        </a>
                        <a
                            href='#'
                            data-toggle='tooltip'
                            data-placement='top'
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
        </>
    );
};

export default ModelAndDesignProduct;
