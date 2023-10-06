import React, { useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { calculateAmount } from '~/utilities/ecomerce-helpers';

const ModulePaymentOrderSummary = ({ ecomerce }) => {
    let amount = calculateAmount(ecomerce.cartDataItems);
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
    let listItemsView, totalView;
    if (ecomerce.cartDataItems && ecomerce.cartDataItems.length > 0) {
        listItemsView = ecomerce.cartDataItems?.map((item, i) => (
            <Link href="/" key={item.id}>
                <a>
                    <strong>
                        {i + 1}. {item.title}
                    </strong>
                    <small>
                        {item.discount === 0 ? (
                           <p>{ addPeriodToThousands(item.discount_price)} so'm</p>
                        ) : (
                            <>
                                <del>
                                    {addPeriodToThousands(item.price)} so'm
                                </del>
                                <p>
                                    {addPeriodToThousands(item.discount_price)}{' '}
                                    so'm
                                </p>
                            </>
                        )}
                    </small>
                </a>
            </Link>
        ));
    } else {
        listItemsView = <p>Hujjat yo'q.</p>;
    }
  
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    Umumiy hisob:
                    <strong>{hisob}.00 so'm </strong>
                </h3>
            </figure>
        );
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
                {totalView}
            </div>
        </div>
    );
};
export default connect((state) => state)(ModulePaymentOrderSummary);
