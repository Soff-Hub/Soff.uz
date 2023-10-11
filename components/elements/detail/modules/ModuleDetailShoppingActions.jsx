import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { OneShopDoc } from '~/store/auth/action';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';

const ModuleDetailShoppingActions = ({
    product
}) => {
    const { setCartOneItem } = useCart();
    const { addSavedItem, wishlist , removeSavedItem} = useWishlist();
    const dispatch = useDispatch();
    const Router = useRouter();

    function handleAddItemToCart(e) {
        e.preventDefault();
        setCartOneItem(product.id);
       
    }

    const state = useSelector((state) => state.auth.user?.access);

    function handleBuynow(e) {
        e.preventDefault();
        if (state) {
            dispatch(OneShopDoc(product));
            Router.push('/account/checkout-one');
        } else {
            Router.push('/account/register-user');
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
                        <i className={`${wishlist?.some(item => Number(item.id) === Number(product.id)) ? 'fa-solid fa-heart text-danger' : 'icon-heart'} `} ></i>
                    </a>
                </div>
            </div>
        );
    }
};

export default connect((state) => state)(ModuleDetailShoppingActions);
