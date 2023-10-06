import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import useProduct from '~/hooks/useProduct';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';

const ModuleProductWideActions = ({ ecomerce, product }) => {
    const { price } = useProduct();
    const { setCartOneItem } = useCart()
    const { addSavedItem } = useWishlist()


    function handleAddItemToCart(e) {
        e.preventDefault();
        setCartOneItem(product)
       
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addSavedItem(product.id);

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
