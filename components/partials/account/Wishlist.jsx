import React, {useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import ProductCart from '~/components/elements/products/ProductCart';
import { Modal } from 'antd';
import useWishlist from '~/hooks/useWishlist';
import useCart from '~/hooks/useCart';

const Wishlist = ({ ecomerce }) => {

    const { removeSavedItem } = useWishlist()
    const { setCartOneItem } = useCart()

    const { wishlist } = useSelector((state) => state.ecomerce);
    const { setAllSaved } = useWishlist()


    useEffect(() => {
        if (wishlist.length !== JSON.parse(localStorage.getItem('wishlist'))) {
            setAllSaved();
        }
    }, []);

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

    function handleAddItemToCart(e, product) {
        e.preventDefault();
        setCartOneItem(product.id);

        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz hujjatni savatga qo'shdingiz`,
        });
        modal.update;
    }

    async function handleRemoveWishlistItem(e, item) {
        e.preventDefault();
        removeSavedItem(item.id);
    }


    // views
    let wishlistItemsView;
    if (wishlist?.length > 0) {
        wishlistItemsView = (
            <div className="table-responsive">
                <table className="table ps-table--whishlist table-sm table-md table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Hujjat nomi</th>
                            <th>Narxi</th>
                            <th className="d-flex justify-content-center ">
                                Qo'shish
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlist?.length > 0 &&
                            wishlist?.map((product) => (
                                <tr key={product?.id}>
                                    <td>
                                        <a
                                            href="#"
                                            onClick={(e) =>
                                                handleRemoveWishlistItem(
                                                    e,
                                                    product
                                                )
                                            }>
                                            <i className="icon-cross"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <ProductCart product={product} />
                                    </td>
                                    <td>
                                        <span>
                                            {product.discount === 0 ? (
                                                <p>
                                                    {addPeriodToThousands(
                                                        product.discount_price
                                                    )}{' '}
                                                    so'm
                                                </p>
                                            ) : (
                                                <>
                                                    <del>
                                                        {addPeriodToThousands(
                                                            product.price
                                                        )}{' '}
                                                        so'm
                                                    </del>
                                                    <p>
                                                        {addPeriodToThousands(
                                                            product.discount_price
                                                        )}{' '}
                                                        so'm
                                                    </p>
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td style={{ margin: '0 auto' }}>
                                        <a
                                            className="ps-btn d-inline-block"
                                            href=""
                                            onClick={(e) =>
                                                handleAddItemToCart(e, product)
                                            }>
                                            Savatga qo'shish
                                        </a>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    } else if (wishlist?.length <= 0) {
        // if (loading) {
        wishlistItemsView = (
            <div className="alert alert-danger" role="alert">
                Tanlaganlar yo'q!
            </div>
        );

        // }
    }
    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Tanlanganlar</h1>
                </div>
                <div className="ps-section__content">{wishlistItemsView}</div>
            </div>
        </div>
    );
};
export default connect((state) => state)(Wishlist);
