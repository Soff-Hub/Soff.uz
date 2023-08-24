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
    const [redux, setRedux] = useState(false)
    const Router = useRouter();
    const select = useSelector(state => state.auth.user?.access)
    // console.log('select', select);
    const { addItem } = useEcomerce();
    
    function handleAddItemToCart(e) {
        e.preventDefault();
        addItem(
            { id: product.id, quantity: 1 },
            ecomerce.cartItems,
            'cart'
        );
        // console.log(ecomerce.cartItems);
    }



    function handleBuynow(e) {
        e.preventDefault();
        addItem(
            { id: product.id, quantity: quantity },
            ecomerce.cartItems,
            'cart'
        );
        setTimeout(function () {
            Router.push('/account/checkout');
        }, 1000);
    }

    const handleAddItemToWishlist = async (e) => {
        e.preventDefault();
        addItem({ id: product.id }, product, 'wishlist');
        // console.log('wishlistga qoyilgan hujjat', product);
        // let data = {
        //     document: product.id,
        // };
        // const dataItems = await PostRepo.getWishlistPost(data);
        // console.log('wishlistga qoshilganda qaytadigan respons', dataItems);
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This item has been added to your wishlist`,
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
