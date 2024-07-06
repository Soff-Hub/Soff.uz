import React, { useState } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import Router from 'next/router';

const ModuleProductVideoActions = ({ product }) => {

    const { setCartOneItem } = useCart();
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
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
        showModal();
        e.preventDefault();
        setCartOneItem(product.id);
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find((item) => item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    }

    return (
        <>
            <Modal
                title="Muvaffaqqiyatli"
                open={open}
                onOk={hideModalOk}
                onCancel={hideModal}
                okText="Savatga o'tish"
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
                cancelText="Xaridlarni davom etirish">
                <p></p>
                <p>Mahsulotingizni savatga qo'shdingiz!</p>
                <p></p>
            </Modal>
            <ul className="ps-product__actions d-flex gap-3 align-items-center m-0" style={{listStyle:"none"}}>

                <li>
                    <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Savatga qo'shish"
                        onClick={handleAddItemToCart}>
                        <i className="icon-bag2"></i>
                    </a>
                </li>

                <li>
                    <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Tanlanganlarga qo'shish"
                        onClick={handleAddItemToWishlist}>
                        <i
                            className={`${wishlist?.some(
                                (item) =>
                                    Number(item.id) === Number(product?.id)
                            )
                                ? 'fa-solid fa-heart  text-danger '
                                : 'icon-heart'
                                } `}></i>
                    </a>
                </li>
            </ul>
        </>
    );
};

export default connect((state) => state)(ModuleProductVideoActions);
