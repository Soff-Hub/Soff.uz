import React, { useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { useCookies } from 'react-cookie';

const ModulePaymentOrderSummary = ({ ecomerce, shipping }) => {
    const { products, getProducts } = useEcomerce();
    const [cookies, setCookie] = useCookies(['cart']);
console.log('..', cookies.cart);

    useEffect(() => {
        if (ecomerce.cartItems) {
            getProducts(ecomerce.cartItems, 'cart');
        }
    }, [ecomerce]);
    let amount = cookies?.cart && calculateAmount(cookies?.cart)
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

    // view
    let listItemsView, shippingView, totalView;
    if (cookies?.cart && cookies?.cart?.length > 0) {
        
        listItemsView = cookies?.cart?.map((item, i) => (
            <Link href="/" key={item.id}>
                <a>
                    <strong>
                      {i+1}.  {item.title}
                    </strong>
                    <small>{addPeriodToThousands(item.price)} so'm </small>
                </a>
            </Link>
        ));
    } else {
        listItemsView = <p>No Product.</p>;
    }
    if (shipping === true) {
        shippingView = (
            <figure>
                <figcaption>
                    <strong>Shipping Fee</strong>
                    <small>$20.00</small>
                </figcaption>
            </figure>
        );
        totalView = (
            <figure className="ps-block__total">
                <h3>
                Umumiy hisob: 
                    <strong>{hisob}.00</strong>
                </h3>
            </figure>
        );
    } else {
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Umumiy hisob: 
                    <strong>{hisob}.00 so'm </strong>
                </h3>
            </figure>
        );
    }
    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Hujjat</strong>
                        <strong>narx</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{listItemsView}</figure>
                <figure>
                    <figcaption>
                        <strong>Jami narx:</strong>
                        <small>{hisob}.00 so'm </small>
                    </figcaption>
                </figure>
                {shippingView}
                {totalView}
            </div>
        </div>
    );
};
export default connect((state) => state)(ModulePaymentOrderSummary);
