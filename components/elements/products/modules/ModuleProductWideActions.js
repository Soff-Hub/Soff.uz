import React from 'react';
import { connect, useSelector } from 'react-redux';
import useProduct from '~/hooks/useProduct';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';

const ModuleProductWideActions = ({ ecomerce, product }) => {
    const { price } = useProduct();
    const { setCartOneItem } = useCart()
    const { addSavedItem, removeSavedItem } = useWishlist()
    const { wishlist } = useSelector((state) => state.ecomerce);


    function handleAddItemToCart(e) {
        e.preventDefault();
        setCartOneItem(product)
       
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find((item) => item.id === product?.id)) {
            removeSavedItem(product.id);
        }

    }


    return (

        <div className="ps-product__shopping" >
            {price(product)}
            <a
                className="ps-btn"
                href="#"
                onClick={(e) => handleAddItemToCart(e)}>
                Savatga qo'shish
            </a>
            <ul className="ps-product__actions">
                <li>
                    <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart"></i> Saqlash
                    </a>
                </li>

                {/* <li>
                    <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                        <i className="icon-chart-bars"></i> Compare
                    </a>
                </li> */}
            </ul>
        </div>
    );
};

export default connect((state) => state)(ModuleProductWideActions);
