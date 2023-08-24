import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { useCookies } from 'react-cookie';
import { Modal } from 'antd';

const MiniCart = ({ ecomerce }) => {
    const { products, removeItem, removeItems, getProducts } = useEcomerce();
    const [cookies, setCookie] = useCookies(['cart']);
    const state = useSelector((state) => state.auth.user);
    function handleRemoveItem(e, item) {
        e.preventDefault();
        removeItem(item, ecomerce.cartItems, 'cart');
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz hujjatni savatdan o'chirdingiz`,
        });
        modal.update;
    }
    const amount = calculateAmount(ecomerce.cartItems);
    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }
    const hisob = addPeriodToThousands(amount);

    useEffect(() => {
        getProducts(ecomerce.cartItems, 'cart');
    }, [ecomerce]);
    let cartItemsView;
    if (ecomerce.cartItems && ecomerce.cartItems?.length > 0) {
        const productItems = ecomerce.cartItems?.map((item) => {


            return (
                <ProductOnCart product={item} key={item.id}>
                    <a
                        className="ps-product__remove"
                        onClick={(e) => handleRemoveItem(e, item)}>
                        <i className="icon-cross"></i>
                    </a>
                </ProductOnCart>
            );
        });
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">{productItems}</div>
                <div className="ps-cart__footer">
                    <h3>
                        Jami:
                        <strong>{hisob ? hisob : 0} so'm</strong>


                    </h3>
                    <figure>
                        <Link href="/account/shopping-cart">
                            <a className="ps-btn">Savat</a>
                        </Link>
                        {state !== null ? (
                            <Link href="/account/checkout">
                                <a className="ps-btn">Sotib olish</a>
                            </Link>
                        ) : (
                            <Link href="/account/register">
                                <a className="ps-btn">Sotib olish</a>
                            </Link>
                        )}
                    </figure>
                </div>
            </div>
        );
    } else {
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">
                    <span>Savatda hujjat yo'q</span>
                </div>
            </div>
        );
    }

    return (
        <div className="ps-cart--mini">
            <a className="header__extra" href="#">
                <i className="icon-bag2"></i>
                <span>
                    <i>{ecomerce ? ecomerce.cartItems.length : 0}</i>
                </span>
            </a>
            {cartItemsView}
        </div>
    );
};

export default connect((state) => state)(MiniCart);
