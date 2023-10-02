import React from 'react';
import Link from 'next/link';
import { calculateAmount } from '~/utilities/ecomerce-helpers';

const ModuleCartSummary = ({ source }) => {
    const amount = calculateAmount(source);
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
    // View
    let productItemsView;
    if (source && source.length > 0) {
        productItemsView = source.map((item, i) => (
            <li key={item.id}>
                <div
                    className="ps-block__estimate "
                    style={{
                        display: 'flex',
                        aliginContent: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Link style={{width:'70%'}} href="/product/[pid]" as={`/product/${item.id}`}>
                        <a className="ps-product__title">
                            {i + 1}. {item.title}
                        </a>
                    </Link>
                    <Link href="/product/[pid]" as={`/product/${item.id}`}>
                        <a className="ps-product__price">
                            {addPeriodToThousands(item.discount_price)} so'm
                        </a>
                    </Link>
                </div>
            </li>
        ));
    }

    return (
        <>
            <div className="ps-block--shopping-total">
                <div className="ps-block__header">
                    <p>
                        Umumiy hisob <span> {hisob} so'm </span>
                    </p>
                </div>
                <div className="ps-block__content">
                    <ul className="ps-block__product">{productItemsView}</ul>
                    <h3>
                        Jami: <span>{hisob} so'm</span>
                    </h3>
                </div>
            </div>
        </>
    );
};

export default ModuleCartSummary;
