import React from 'react';
import { connect } from 'react-redux';
import { Result } from 'antd';
import ProductCart from '~/entities/product/ui/ProductCart';
import useCart from '~/shared/hooks/useCart';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import useResponsive from '~/shared/utilities/useResponsive';

const ModuleEcomerceCartItems = ({ cartItems }) => {
    const { removeCartOneItem } = useCart();
    const { isMobile } = useResponsive();

    const handleRemoveItem = async (e, item) => {
        e.preventDefault();
        removeCartOneItem(item.id);
    };

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
                                {addPeriodToThousands(item.discount_price)} so'm
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
                        <i className="fa fa-times"></i>
                    </a>
                </td>
            </tr>
        ));

        cartItemsViews = (
            <>
                <table className="table ps-table--shopping-cart ps-table--responsive">
                    <thead>
                        <tr>
                            <th>Mahsulot</th>
                            <th>Narx</th>
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
