import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import useCart from '~/hooks/useCart';

const PanelCartMobile = ({ ecomerce, setMenuDrawer,
    setCartDrawer,
    setCategoriesDrawer,
    setSearchDrawer, }) => {
    const { thumbnailImage } = useProduct();
    const { removeCartOneItem } = useCart()
    const products = useSelector(state => state.ecomerce.cartDataItems)

    function handleRemoveCartItem(e, product) {
        e.preventDefault();
        removeCartOneItem(product.id);
    }

    const handleDrawerClose = () => {
        setMenuDrawer(false);
        setCartDrawer(false);
        setCategoriesDrawer(false);
        setSearchDrawer(false);
    };


    //view
    let cartItemsView, footerView;

    if (products && products.length > 0) {
        const amount = calculateAmount(products);
        const items = products.map((item) => (
            <div className="ps-product--cart-mobile" key={item.id}>
                <div className="ps-product__thumbnail" onClick={handleDrawerClose}>
                    <Link href="/product/[pid]" as={`/product/${item.slug}`}>
                        {
                            item?.slug ?
                                <a>{thumbnailImage(item)}</a>
                                :
                                <>Loading...</>
                        }
                    </Link>
                </div>
                <div className="ps-product__content" onClick={handleDrawerClose}>
                    <a
                        className="ps-product__remove"
                        onClick={(e) => handleRemoveCartItem(e, item)}>
                        <i className="icon-cross"></i>
                    </a>
                    <Link href="/product/[pid]" as={`/product/${item.slug}`} >
                        <a className="ps-product__title">{item.title}</a>
                    </Link>
                    <p>
                        {item.vendor}
                    </p>
                    <small>
                        {item.price} so'm
                    </small>
                </div>
            </div>
        ));
        cartItemsView = <div className="ps-cart__items">{items}</div>;
        footerView = (
            <div className="ps-cart__footer">
                <h3>
                    Umumiy narx :<strong>{amount} so'm </strong>
                </h3>
                <figure onClick={handleDrawerClose}>
                    <Link href="/account/shopping-cart">
                        <a className="ps-btn">Savat</a>
                    </Link>
                    <Link href="/account/checkout">
                        <a className="ps-btn">Sotib olish</a>
                    </Link>
                </figure>
            </div>
        );
    } else {
        cartItemsView = <p>Savat bo'sh!</p>;
    }
    return (
        <div className="ps-cart--mobile">
            <div className="ps-cart__content">
                {cartItemsView}
                {footerView}
            </div>
        </div>
    );
};
export default connect((state) => state)(PanelCartMobile);
