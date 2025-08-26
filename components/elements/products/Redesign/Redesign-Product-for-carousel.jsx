import Link from 'next/link';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import useWishlist from '~/hooks/useWishlist';
import { useState } from 'react';
import useCart from '~/hooks/useCart';
import { Modal } from 'antd';
import { useRouter } from 'next/router';

const RedesignProductCardForcarousel = ({ product }) => {
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

    return (
        <div className="scientificResourcesCardForcarousel">
            <Link href="/product/[pid]" as={`/product/${product.slug}`}>
                <div className="scientificResourcesCardImgBox">
                    <img
                        src={product.poster_url || '/static/img/not-found.png'}
                        alt=""
                        className="scientificResourcesCardImg"
                    />
                </div>
            </Link>
            <a
                className="scientificResourcesCardHeard"
                href="#"
                data-toggle="tooltip"
                data-placement="top"
                title="Tanlanganlarga qo'shish"
                onClick={handleAddItemToWishlist}>
                <img
                    src={`${
                        wishlist?.some(
                            item => Number(item.id) === Number(product?.id)
                        )
                            ? '/static/img/heart-full.svg'
                            : '/static/img/heart.svg'
                    } `}
                    alt=""
                />
            </a>
            <div className="scientificResourcesCardBody">
                <Link
                    href="/product/[pid]"
                    className="p-0"
                    as={`/product/${product.slug}`}>
                    <p className="scientificResourcesCardTitle">
                        {product.title.slice(0, 35)}
                    </p>
                </Link>
                <div className="scientificResourcesCardPriceBox">
                    <div className="scientificResourcesCardPrice">
                        {+product.discount_price === 0 ? (
                            <p className="free-product-text">Bepul</p>
                        ) : product.discount === 0 ? (
                            <p>
                                {addPeriodToThousands(product.discount_price)}{' '}
                                so'm
                            </p>
                        ) : (
                            <>
                                <del>
                                    {addPeriodToThousands(product.price)} so'm
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
                    <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Savatga qo'shish"
                        onClick={handleAddItemToCart}>
                        <img
                            src={
                                basket
                                    ? '/static/img/cart.svg'
                                    : '/static/img/cart-outlet.svg'
                            }
                            alt=""
                            className="scientificBuyIcon"
                        />
                    </a>
                </div>
            </div>

            <Modal
                title="Muvaffaqqiyatli"
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
                cancelText="Xaridlarni davom etirish">
                <p></p>
                <p>Mahsulotingizni savatga qo'shdingiz!</p>
                <p></p>
            </Modal>
        </div>
    );
};

export default RedesignProductCardForcarousel;
