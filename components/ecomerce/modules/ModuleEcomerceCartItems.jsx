import React from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { Modal, Result } from 'antd';
import ProductCart from '~/components/elements/products/ProductCart';

const ModuleEcomerceCartItems = ({ ecomerce, cartItems }) => {
    const { increaseQty, decreaseQty, removeItem } = useEcomerce();

    function handleRemoveItem(e, productId) {
        e.preventDefault();
        removeItem({ id: productId }, ecomerce.cartItems, 'cart');
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz hujjatni savatdan o'chirdingiz`,
        });
        modal.update;
    }

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
                <td>
                    <ProductCart product={item} />
                </td>
                <td data-label="price" className="price pe-5">
                   <span> {addPeriodToThousands(item.price)} so'm</span>
                </td>
                <td data-label="total">
                    {/* <strong>${(item.price * item.quantity).toFixed(2)}</strong> */}
                </td>
                <td style={{}}>
                    <a href="#" onClick={(e) => handleRemoveItem(e, item.id)}>
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
