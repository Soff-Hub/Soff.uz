import Link from 'next/link';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import useWishlist from '~/shared/hooks/useWishlist';
import { useState } from 'react';
import useCart from '~/shared/hooks/useCart';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { fileColors } from '~/components/details-components/details-actions/file-actions';

const RedesignProduct = ({ product }) => {
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
        <div className="scientificResourcesCard">
            <Link href="/product/[pid]" as={`/product/${product?.slug}`}>
                <div className="scientificResourcesCardImgBox">
                    <img
                        src={'/static/img/not-found.png'}
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

            {product?.document?.file_type && (
                <div className="scientificResourcesCardView">
                    <p
                        className="scientificResourcesCardFileType"
                        style={{
                            backgroundColor:
                                fileColors[product?.document?.file_type] ||
                                '#007DFF',
                        }}>
                        {product?.document?.file_type}
                    </p>
                </div>
            )}

            <div className="scientificResourcesCardBody">
                <Link
                    href="/product/[pid]"
                    className="p-0"
                    as={`/product/${product.slug}`}>
                    <p className="scientificResourcesCardTitle">
                        {product.title}
                    </p>
                </Link>
                <div>
                    <div className="scientificResourcesCardOptions">
                        {product?.document?.file_size && (
                            <p>
                                <i className="fas fa-database"></i>
                                {product?.document?.file_size}
                            </p>
                        )}
                        {product?.document?.page_count && (
                            <p>
                                <i className="fas fa-copy"></i>
                                {product?.document?.page_count}
                            </p>
                        )}
                        {product?.views_count !== 0 && (
                            <p>
                                <i className="fa-solid fa-eye"></i>
                                {product?.views_count}
                            </p>
                        )}
                    </div>
                    <div className="scientificResourcesCardPriceBox">
                        <div className="scientificResourcesCardPrice">
                            {+product.discount_price === 0 ? (
                                <p className="free-product-text">Bepul</p>
                            ) : product.discount === 0 ? (
                                <p className="scientificResourcesCardPrice_discount_price">
                                    {addPeriodToThousands(
                                        product.discount_price
                                    )}{' '}
                                    so'm
                                </p>
                            ) : (
                                <>
                                    <del className="scientificResourcesCardPrice_discount_price">
                                        {addPeriodToThousands(product.price)}{' '}
                                        so'm
                                    </del>
                                    <p className="scientificResourcesCardPrice_discount_price">
                                        {addPeriodToThousands(
                                            product.discount_price
                                        )}
                                        so'm
                                    </p>
                                </>
                            )}
                        </div>
                        <a
                            className="scientificBuyIconBox"
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
                                className="cart-img"
                            />
                        </a>
                    </div>
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

export default RedesignProduct;
