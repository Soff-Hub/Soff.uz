import React from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { Modal, Result } from 'antd';
import ProductCart from '~/components/elements/products/ProductCart';
import { useCookies } from 'react-cookie';
import ProductRepository from '~/repositories/ProductRepository';
import useCart from '~/hooks/useCart';

const ModuleEcomerceCartItems = ({ cartItems }) => {
    const { removeItem } = useEcomerce();
    const [cookies, setCookie] = useCookies(['cart']);
    const { removeCartOneItem } = useCart()

    const handleRemoveItem = async (e, item) => {
        e.preventDefault();
        // removeItem(item, 'cart');
        removeCartOneItem(item.id)
    };

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

    // View
    let cartItemsViews;
    if (cartItems && cartItems.length > 0) {
        const items = cartItems.map((item) => (
            <tr key={item.id}>
                <td className="cart-product">
                    <ProductCart product={item} />
                </td>
                <td data-label="narxi" className="price pe-5">
                    <span>
                        {item.discount === 0 ? (
                            <p>
                                {addPeriodToThousands(item.discount_price)}
                                so'm
                            </p>
                        ) : (
                            <>
                                <del>
                                    {addPeriodToThousands(item.price)} so'm
                                </del>
                                <p>
                                    {addPeriodToThousands(item.discount_price)}
                                    so'm
                                </p>
                            </>
                        )}
                    </span>
                </td>
                <td></td>
                <td>
                    <a href="#" onClick={(e) => handleRemoveItem(e, item)}>
                        <i className="icon-cross"></i>
                    </a>
                </td>
            </tr>
        ));

        cartItemsViews = (
            <>
                <table className="table  ps-table--shopping-cart ps-table--responsive">
                    <thead>
                        <tr>
                            <th>Hujjat</th>
                            <th>Narx</th>

                            {/* <th>Quantity</th> */}
                            <th></th>
                            <th>O'chirish</th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            </>
        );
    } else {
        cartItemsViews = (
            <Result status="warning" title="No product in cart." />
        );
    }
    return <>{cartItemsViews}</>;
};

export default connect((state) => state)(ModuleEcomerceCartItems);
