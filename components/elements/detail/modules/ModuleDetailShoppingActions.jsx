import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import useEcomerce from '~/hooks/useEcomerce';

import PostRepo from '~/repositories/PostRepo';

const ModuleDetailShoppingActions = ({
    ecomerce,
    product,
    extended = false,
}) => {
    const [quantity, setQuantity] = useState(1);
    const [redux, setRedux] = useState(false);
    const Router = useRouter();
    const select = useSelector((state) => state.auth.user?.access);
    // console.log('select', select);
    const { addItem } = useEcomerce();

    function handleAddItemToCart(e) {
        e.preventDefault();
        addItem(product, ecomerce.cartItems, 'cart');
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz hujjatni savatga qo'shdingiz`,
        });
        modal.update;

    }
    const state = useSelector(state => state.auth.user)



    function handleBuynow(e) {
        e.preventDefault();
        addItem(
            product,
            ecomerce.cartItems,
            'cart'
        );
       if(state !== null){
        setTimeout(function () {
            Router.push('/account/checkout');
        }, 1000);
       }else{
        setTimeout(function () {
            Router.push('/account/register');
        }, 1000);
       }
    }

    const handleAddItemToWishlist = async (e) => {
        e.preventDefault();
        addItem(product, ecomerce.wishlistItems, 'wishlist');
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz hujjatni saqlanganlarga qo'shdingiz`,

        });
        modal.update;
    };


    if (select) {
        return (
            <div className="ps-product__shopping">
                <a
                    className="ps-btn ps-btn--black"
                    href="#"
                    onClick={(e) => handleAddItemToCart(e)}>
                    Savatga qo'shish
                </a>
                <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
                    Sotib olish
                </a>
                <div className="ps-product__actions">
                    <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart"></i>
                    </a>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-product__shopping">
                <a
                    className="ps-btn ps-btn--black"
                    href="#"
                    onClick={(e) => handleAddItemToCart(e)}>
                    Savatga qo'shish
                </a>
                <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
                    By now
                </a>
                <div className="ps-product__actions">
                    <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart"></i>
                    </a>
                </div>
            </div>
        );
    }
};

export default connect((state) => state)(ModuleDetailShoppingActions);
