import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { OneShopDoc } from '~/store/auth/action';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import { Modal } from 'antd';
import { fileDownloader, fileDownloaderSale } from '~/utilities/common-helpers';

const ModuleDetailShoppingActions = ({ product, document }) => {
    console.log('document => ', document);

    const { setCartOneItem } = useCart();
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const dispatch = useDispatch();
    const Router = useRouter();
    const statee = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
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

    function handleAddItemToCart(e) {
        e.preventDefault();
        setCartOneItem(product.id);
        showModal();
    }

    const state = useSelector((state) => state.auth.user?.access);

    function handleBuynow(e) {
        e.preventDefault();
        if (state) {
            dispatch(OneShopDoc(product));
            Router.push(`/account/checkout-one?id=${product?.id}`);
        } else {
            Router.push(`/account/register-user?id=${product?.id}`);
        }
    }

    const handleAddItemToWishlist = async (e) => {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find((item) => item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    };

    if (true) {
        return (
            <>
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
                <div className="ps-product__shopping">
                    {product.discount_price > 0 ? (
                        <>
                            {document.file_url ? (
                                <a
                                    className="ps-btn ps-btn--black max-class"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        fileDownloaderSale(document);
                                    }}>
                                    Bepul yuklab olish
                                </a>
                            ) : (
                                <>
                                    <a
                                        className="ps-btn ps-btn--black max-class"
                                        href="#"
                                        onClick={(e) => handleAddItemToCart(e)}>
                                        Savatga qo'shish
                                    </a>
                                    <a
                                        className="ps-btn max-class"
                                        href="#"
                                        onClick={(e) => handleBuynow(e)}>
                                        1 klikda sotib oling
                                    </a>
                                </>
                            )}
                        </>
                    ) : (
                        <a
                            className="ps-btn ps-btn--black max-class"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                fileDownloader(product);
                            }}>
                            Bepul yuklab olish
                        </a>
                    )}
                    <div className="ps-product__actions">
                        <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                            <i
                                className={`${
                                    wishlist?.some(
                                        (item) =>
                                            Number(item.id) ===
                                            Number(product.id)
                                    )
                                        ? 'fa-solid fa-heart text-danger'
                                        : 'icon-heart'
                                } `}></i>
                        </a>
                    </div>
                </div>
            </>
        );
    }
};

export default connect((state) => state)(ModuleDetailShoppingActions);
