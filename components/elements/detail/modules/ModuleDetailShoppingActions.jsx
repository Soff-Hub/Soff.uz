import React  from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import useEcomerce from '~/hooks/useEcomerce';

import { OneShopDoc } from '~/store/auth/action';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';

const ModuleDetailShoppingActions = ({
    ecomerce,
    product,
    extended = false,
}) => {
    const { addItem } = useEcomerce();
    const dispatch = useDispatch();
    const Router = useRouter();
    const { pid } = Router.query
    const [cookies, setCookie] = useCookies(['cart', 'wishlist']);

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
        addItem(product, ecomerce.wishlistItems, 'wishlist');
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz hujjatni saqlanganlarga qo'shdingiz`,
        });
        modal.update;
    };

    
console.log(cookies?.wishlist, cookies?.wishlist?.some(item => Number(item.id) === Number(pid)));
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
                    <i  className={`icon-heart   ${cookies?.wishlist?.some(item => Number(item.id) ===  Number(product.id) ) ? 'text-danger' : ''} `} ></i>
                    </a>
                </div>
            </div>
        );
    } 
};

export default connect((state) => state)(ModuleDetailShoppingActions);
