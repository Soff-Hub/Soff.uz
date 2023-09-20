import React, { useEffect } from 'react';
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { useCookies } from 'react-cookie';

const ModulePaymentOrderSummaryOne = ({ ecomerce, shipping }) => {
    const { products, getProducts } = useEcomerce();
    const [cookies, setCookie] = useCookies(['cart']);
    const state = useSelector(state => state?.auth?.shop)

    useEffect(() => {
        if (ecomerce.cartItems) {
            getProducts(ecomerce.cartItems, 'cart');
        }
    }, [ecomerce]);

    // let amount = state && calculateAmount(state)
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
    const hisob = addPeriodToThousands(state.price);

    // view
    let listItemsView, shippingView, totalView;
    if (state ) {
        
        listItemsView = 
            <Link href="/" >
                <a>
                    <strong>
                      {1}.  {state.title}
                    </strong>
                    <small>{hisob} so'm </small>
                </a>
            </Link>
        
    } else {
        listItemsView = <p>Hujjat yo'q.</p>;
    }
    if (shipping === true) {
        // shippingView = (
        //     <figure>
        //         <figcaption>
        //             <strong>Shipping Fee</strong>
        //             <small>$20.00</small>
        //         </figcaption>
        //     </figure>
        // );
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
                {/* {totalView} */}
            </div>
        </div>
    );
};
export default connect((state) => state)(ModulePaymentOrderSummaryOne);
